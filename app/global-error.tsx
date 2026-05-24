"use client";

/**
 * Last-resort boundary — catches errors that escape the root layout.
 * Renders its own <html>/<body>, so no design system available.
 * Keep this minimal, accessible, and never the page anyone actually sees.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "2rem",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
          background: "#18161A",
          color: "#E5E1D9",
        }}
      >
        <div style={{ maxWidth: 560, textAlign: "center" }}>
          <p
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              opacity: 0.6,
            }}
          >
            Application error
          </p>
          <h1
            style={{
              fontWeight: 300,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: 1.1,
              margin: "1rem 0",
            }}
          >
            Something went sideways at the root.
          </h1>
          <p style={{ opacity: 0.7, lineHeight: 1.6 }}>
            We&rsquo;ve logged it. You can retry, or visit{" "}
            <a href="/" style={{ color: "#5EEAD4", textDecoration: "underline" }}>
              the home page
            </a>
            .
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: "1.5rem",
              padding: "0.75rem 1.25rem",
              borderRadius: 999,
              border: "1px solid rgba(229,225,217,0.3)",
              background: "transparent",
              color: "#E5E1D9",
              cursor: "pointer",
              font: "inherit",
            }}
          >
            Retry
          </button>
          {error.digest && (
            <p
              style={{
                marginTop: "2rem",
                fontFamily: "ui-monospace, monospace",
                fontSize: 11,
                opacity: 0.4,
              }}
            >
              ref · {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
