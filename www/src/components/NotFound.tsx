export default function NotFound() {
  return (
    <div className="bg-day text-night dark:bg-night dark:text-day relative min-h-[100dvh] min-w-screen">
      <div
        aria-hidden="true"
        className="paper-grain pointer-events-none fixed inset-0 z-50"
      />

      <main className="relative z-10 flex flex-col gap-8 px-6 pb-16 pt-24 md:px-12 md:pb-24 md:pt-32 lg:max-w-4xl lg:px-20">
        <p className="text-sm tracking-wide text-gray dark:text-muted">404</p>
        <h1 className="font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95] font-normal tracking-tight text-balance">
          Page not found
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-gray dark:text-muted">
          That path doesn&apos;t exist on this Site. Head home and try again.
        </p>
        <p>
          <a
            className="inline-flex border border-night bg-transparent px-7 py-3 text-sm font-medium tracking-wide text-night transition-colors duration-500 ease-out hover:bg-night hover:text-day focus-visible:bg-night focus-visible:text-day dark:border-day dark:text-day dark:hover:bg-day dark:hover:text-night dark:focus-visible:bg-day dark:focus-visible:text-night"
            href="/"
          >
            Go home
          </a>
        </p>
      </main>
    </div>
  );
}
