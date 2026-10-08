import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas text-ink font-sans antialiased px-4">
      <main className="max-w-md w-full text-center">
        <div className="mx-auto mt-16 size-16 rounded-full bg-coral-soft flex items-center justify-center">
          <Search className="size-8 text-coral" strokeWidth={1.5} />
        </div>
        <h1 className="mt-8 text-3xl font-brand font-medium tracking-tight text-ink-strong">
          Page not found
        </h1>
        <p className="mt-4 text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. You can
          try searching for it or return to the homepage.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/" className="btn btn-primary">
            <Home className="size-4" />
            Go home
          </Link>
          <Link href="/features" className="btn btn-outline">
            Browse features
          </Link>
        </div>
      </main>
    </div>
  );
}