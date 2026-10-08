export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas text-ink font-sans antialiased">
      <div className="flex flex-col items-center gap-4">
        <div className="relative size-12">
          <svg className="size-full text-coral animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="31.4 31.4" />
          </svg>
        </div>
        <p className="text-muted font-medium">Loading…</p>
      </div>
    </div>
  );
}