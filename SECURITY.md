# Security architecture

This document describes how `ingenious-hub.vercel.app` (production) is hardened.
Operational owner: studio engineering lead.

## 1. Threat model

The marketing site is static-content-by-default with one form. The realistic attack surface is:

1. **Form spam / abuse** — bots flooding `/api/contact` to waste Resend quota, generate noise, or DoS the studio inbox.
2. **XSS / content injection** — third-party scripts attempting to run in our origin (CSP closes this).
3. **Clickjacking** — embedding the site in a malicious iframe (X-Frame-Options + CSP frame-ancestors).
4. **Credential / secret leak** — keys committed to git or surfaced via misconfigured pages.
5. **Supply chain** — compromised npm dependency.

There is **no user authentication** and **no PII storage** beyond what a user voluntarily submits to the contact form (then forwarded to email and not persisted).

## 2. HTTP security headers

Set globally in `next.config.mjs > headers()`. Applies to every route:

- **Content-Security-Policy** — currently in *report-only* mode while we settle violations. Will flip to enforcing after two clean weeks. Allows: self, fonts (data: + self), images (https: + self), Cloudflare Turnstile, Upstash REST, Resend, Vercel Insights. Disallows: inline `<script>` (Tailwind inline styles are permitted; we have no inline scripts).
- **Strict-Transport-Security** — `max-age=63072000; includeSubDomains; preload`. Submit to `hstspreload.org` after Phase A.
- **X-Frame-Options: DENY** — defence-in-depth with CSP `frame-ancestors 'none'`.
- **X-Content-Type-Options: nosniff** — disables MIME sniffing.
- **Referrer-Policy: strict-origin-when-cross-origin** — leaks origin only on same-protocol downgrade.
- **Permissions-Policy** — locks down camera, mic, geolocation, payments, FLoC.
- **X-Powered-By** removed (`poweredByHeader: false`).

## 3. Contact form hardening — `/api/contact`

Edge runtime endpoint. Order of checks:

1. **Method** — only `POST`. Anything else: 405.
2. **Content-Type** — must be `application/json`. Anything else: 415.
3. **Zod schema** — `name` (1-120 chars), `email` (RFC-shaped, max 254), `company` (optional, 0-160), `budget` (optional, enum), `message` (10-4000 chars), `hp` (honeypot, must be empty), `t` (client-render timestamp, ms).
4. **Honeypot** — if the hidden `hp` field is non-empty, return 200 silently (don't tell the bot it lost).
5. **Time-on-page guard** — reject submissions where `Date.now() - t < 3000ms` (3-second human floor). Silent 200.
6. **Cloudflare Turnstile** — verify the client token server-side with `TURNSTILE_SECRET_KEY` against `https://challenges.cloudflare.com/turnstile/v0/siteverify`. Failure: 400.
7. **Rate limit** — `@upstash/ratelimit` sliding window of 5 submissions / hour / IP. Failure: 429.
8. **Resend** — send notification + confirmation in parallel via `resend.emails.send`. Failure on either: log, return 502.
9. **Logging** — structured JSON to Vercel logs. We log the request ID, IP (already attached by Vercel), and submission fingerprint (`sha256(email + message)` first 12 chars). We do *not* log raw email/message content beyond the fingerprint.

## 4. Secrets management

All secrets live in Vercel environment variables. Never committed.

| Key | Scope | Used by |
| --- | --- | --- |
| `RESEND_API_KEY` | Server | `/api/contact` |
| `RESEND_FROM_EMAIL` | Server | `/api/contact` |
| `CONTACT_NOTIFY_EMAIL` | Server | `/api/contact` |
| `UPSTASH_REDIS_REST_URL` | Server | `/api/contact` |
| `UPSTASH_REDIS_REST_TOKEN` | Server | `/api/contact` |
| `TURNSTILE_SECRET_KEY` | Server | `/api/contact` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Client | contact form mount |

`NEXT_PUBLIC_*` is the only family safe to expose in the bundle.

## 5. Supply chain

- `npm audit` runs on `npm install` in CI.
- Dependabot enabled on the repo for security-only updates.
- Next.js pinned to a patched version (re-pin quarterly).
- No `unsafe-eval`, no dynamic `require`, no `dangerouslySetInnerHTML` outside the JSON-LD blocks (audited — all inputs are typed and stringified).

## 6. Vercel hardening

- Production branch protection (`main`).
- Preview deployments restricted to repo collaborators.
- 2FA enforced on the Vercel team.
- DNS via Cloudflare with DNSSEC + a strict CAA record (`letsencrypt.org`, `digicert.com`).
- Vercel Speed Insights enabled, no third-party analytics cookies.

## 7. Incident playbook (short)

1. Rotate the affected secret in Vercel → trigger a redeploy.
2. Audit Vercel logs for the time window.
3. If a form-spam incident: tighten rate limit to 1/hr, evaluate Turnstile in managed mode for the affected IPs.
4. Post-incident note added to this file's changelog.

## 8. Open hardening items (post-Phase A)

- Strict CSP (no `'unsafe-eval'`) via nonce middleware.
- `report-uri` sink to a small Vercel function that logs CSP violations.
- Subresource Integrity (SRI) once any third-party `<script src>` is added (none currently).
- `Trusted-Types` policy.

## 9. Changelog

| Date | Change |
| --- | --- |
| Phase A | Initial: report-only CSP, all other headers enforced, contact API hardened. |
