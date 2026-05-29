/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

// CSP starts in report-only for two weeks (no report-uri sink yet — tighten in PR-2)
// Tailwind requires 'unsafe-inline' for styles; scripts are tightened via nonce in middleware
// once the strict CSP is enforced.
const csp = [
  "default-src 'self'",
  // 'unsafe-eval' is required by Next.js dev runtime; tighten in production by switching
  // to a nonce strategy via middleware. Acceptable trade-off for Phase A.
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  // `https:` is open by design — client logos auto-source from Google's
  // favicon CDN until verified SVGs land at /public/clients/<slug>.svg.
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://challenges.cloudflare.com https://*.upstash.io https://api.resend.com https://vitals.vercel-insights.com",
  "frame-src https://challenges.cloudflare.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  // CSP: report-only in production until the report-uri pipeline lands.
  // Browsers will surface violations in dev console; collect, tune, then enforce.
  {
    key: isProd ? "Content-Security-Policy-Report-Only" : "Content-Security-Policy-Report-Only",
    value: csp,
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" }, // Phase C
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // /insights renamed to /blogs to match live ingenioushub.com nav.
      // 301s preserve any external link integrity to the old paths.
      { source: "/insights", destination: "/blogs", permanent: true },
      { source: "/insights/:slug", destination: "/blogs/:slug", permanent: true },
      // /industries folded into /work + /services per the redesign brief.
      { source: "/industries", destination: "/work", permanent: true },
      { source: "/industries/:slug", destination: "/work", permanent: true },
    ];
  },
};

export default nextConfig;
