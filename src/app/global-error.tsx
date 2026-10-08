"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <head>
        <title>Error — Aloha Social</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
      </head>
      <body className="flex min-h-screen flex-col items-center justify-center bg-canvas text-ink font-sans antialiased px-4">
        <main className="max-w-md w-full text-center">
          <div className="mx-auto mt-16 size-16 rounded-full bg-coral-soft flex items-center justify-center">
            <RefreshCw className="size-8 text-coral" strokeWidth={1.5} />
          </div>
          <h1 className="mt-8 text-2xl font-brand font-medium tracking-tight text-ink-strong">
            Something went wrong
          </h1>
          <p className="mt-4 text-muted">
            We encountered an unexpected error. Please try refreshing the page or
            returning to the homepage.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={reset}
              className="btn btn-primary"
            >
              <RefreshCw className="size-4" />
              Try again
            </button>
            <Link href="/" className="btn btn-outline">
              <Home className="size-4" />
              Go home
            </Link>
          </div>
          {error.digest && (
            <p className="mt-8 text-[11px] font-mono text-muted">
              Error reference: {error.digest}
            </p>
          )}
        </main>
      </body>
    </html>
  );
}