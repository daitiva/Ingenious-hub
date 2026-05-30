"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCw } from "lucide-react";

/**
 * Route-level error boundary. Caught by Next when a server or client error
 * escapes a route. Stays quiet, gives the visitor two clear ways out.
 */
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface to Vercel logs without leaking PII to the client.
    console.error("[route-error]", { digest: error.digest, message: error.message });
  }, [error]);

  return (
    <main className="relative flex min-h-[calc(100svh-64px)] items-center pt-16">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Error · {error.digest ?? "client"}
            </p>
          </div>
          <div className="md:col-span-9">
            <h1 className="text-balance font-display text-d-2 font-light leading-[1.05]">
              Something{" "}
              <span className="text-gradient-brand font-serif">
                went sideways.
              </span>
            </h1>
            <p className="mt-10 max-w-2xl text-body-lg text-muted-foreground">
              The page hit an unexpected error on our side. We&rsquo;ve logged
              it. You can retry the page, or step back to safer ground.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-border pt-8">
              <button
                type="button"
                onClick={() => reset()}
                className="focus-ring group inline-flex h-12 items-center gap-3 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
              >
                <RotateCw className="h-4 w-4" />
                Retry the page
              </button>
              <Link
                href="/"
                className="focus-ring group inline-flex h-12 items-center gap-2 rounded-full border border-border px-5 text-sm font-medium text-muted-foreground hover:border-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
