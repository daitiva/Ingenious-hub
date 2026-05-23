import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

export const runtime = "edge";

/* — Schema — */
const InquirySchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(160).optional().default(""),
  budget: z
    .enum(["under-1l", "1-3l", "3-8l", "8-20l", "20l-plus", "not-sure"])
    .optional(),
  scope: z.enum(["branding", "web", "marketing", "pr", "not-sure"]).optional(),
  message: z.string().trim().min(10).max(4000),
  hp: z.string().max(0, "honeypot").default(""),
  t: z.number().int().nonnegative(), // client render time (ms epoch)
  turnstileToken: z.string().min(1).max(2048),
});

const TURNSTILE_VERIFY =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const MIN_DWELL_MS = 3000;

/* — Helpers — */

async function verifyTurnstile(token: string, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Fail open in dev / preview when no key is configured, fail closed in prod.
    if (process.env.NODE_ENV === "production") return false;
    return true;
  }
  try {
    const body = new URLSearchParams();
    body.set("secret", secret);
    body.set("response", token);
    if (ip) body.set("remoteip", ip);
    const res = await fetch(TURNSTILE_VERIFY, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

async function checkRateLimit(ip: string): Promise<{ ok: boolean }> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return { ok: true }; // open in dev

  // Cheap sliding window via Redis INCR + EXPIRE. Avoids the @upstash/ratelimit
  // dep cost (we keep that dep available; this is the lighter inline check).
  const key = `rl:contact:${ip}:${Math.floor(Date.now() / (60 * 60 * 1000))}`;
  try {
    const res = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, 3600],
      ]),
    });
    if (!res.ok) return { ok: true }; // fail open on Upstash outage
    const data = (await res.json()) as Array<{ result?: number }>;
    const count = Number(data?.[0]?.result ?? 0);
    return { ok: count <= 5 };
  } catch {
    return { ok: true };
  }
}

async function sendEmails(payload: z.infer<typeof InquirySchema>) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL ?? "hello@ingenioushub.com";
  const notify = process.env.CONTACT_NOTIFY_EMAIL ?? from;
  if (!apiKey) {
    // Don't fail the user submission if email isn't wired yet — log and proceed.
    console.log("[contact] no RESEND_API_KEY, brief received", {
      name: payload.name,
      email: payload.email,
      scope: payload.scope,
    });
    return { delivered: false };
  }

  const subject = `New inquiry — ${payload.scope ?? "general"} — ${payload.name}`;
  const lines = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.company ? `Company: ${payload.company}` : null,
    payload.scope ? `Scope: ${payload.scope}` : null,
    payload.budget ? `Budget: ${payload.budget}` : null,
    "",
    payload.message,
  ]
    .filter(Boolean)
    .join("\n");

  const send = async (to: string, body: string, subj: string) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: payload.email,
        subject: subj,
        text: body,
      }),
    });

  const confirmBody = `Thanks ${payload.name.split(" ")[0]} — we have your brief and will be back within four working hours.\n\nFor reference, this is what we received:\n\n${payload.message}\n\nIf anything urgent, reply to this email.\n— Ingenious Hub`;

  const [notifyRes, confirmRes] = await Promise.all([
    send(notify, lines, subject),
    send(payload.email, confirmBody, "We have your brief — Ingenious Hub"),
  ]);

  return { delivered: notifyRes.ok && confirmRes.ok };
}

/* — Route — */

export async function POST(req: NextRequest) {
  if (req.headers.get("content-type")?.includes("application/json") !== true) {
    return NextResponse.json({ ok: false, error: "Expected JSON." }, { status: 415 });
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad JSON." }, { status: 400 });
  }

  const parsed = InquirySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid submission." },
      { status: 400 }
    );
  }
  const data = parsed.data;

  // Honeypot — return 200 silently so bots don't learn.
  if (data.hp && data.hp.length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Time-on-page floor.
  const dwell = Date.now() - data.t;
  if (dwell < MIN_DWELL_MS) {
    return NextResponse.json({ ok: true });
  }

  // Identify caller IP via Vercel's forwarded headers.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "0.0.0.0";

  // Anti-bot
  const turnstileOk = await verifyTurnstile(data.turnstileToken, ip);
  if (!turnstileOk) {
    return NextResponse.json(
      { ok: false, error: "Verification failed. Refresh and try again." },
      { status: 400 }
    );
  }

  // Rate limit
  const rl = await checkRateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Try again in an hour." },
      { status: 429 }
    );
  }

  // Email
  const { delivered } = await sendEmails(data);

  // Structured log (no PII beyond fingerprint).
  // Edge runtime: console.log -> Vercel logs.
  const fingerprint = await sha256(`${data.email}|${data.message}`);
  console.log(
    JSON.stringify({
      evt: "contact",
      ts: new Date().toISOString(),
      ip,
      delivered,
      fp: fingerprint.slice(0, 12),
      scope: data.scope,
      budget: data.budget,
    })
  );

  return NextResponse.json({ ok: true });
}

async function sha256(input: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input)
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
