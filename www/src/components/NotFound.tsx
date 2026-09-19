import Clock from "./Clock";
import DarkModeToggle from "./DarkModeToggle";
import Link from "./Link";

export default function NotFound() {
  return (
    <div className="bg-day text-night dark:bg-night dark:text-day relative min-h-[100dvh] min-w-screen">
      <div
        aria-hidden="true"
        className="atmosphere-wash pointer-events-none fixed inset-0 z-0"
      />
      <div
        aria-hidden="true"
        className="paper-grain pointer-events-none fixed inset-0 z-50"
      />

      <header className="relative z-10 flex items-center justify-end gap-4 px-6 py-5 md:px-12 lg:px-20">
        <Clock />
        <DarkModeToggle />
      </header>

      <main className="relative z-10">
        <section className="flex flex-col gap-8 px-6 pb-16 pt-6 md:px-12 md:pb-24 md:pt-10 lg:max-w-4xl lg:px-20">
          <h1 className="reveal font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95] font-normal tracking-tight text-balance">
            Page not found
          </h1>
          <p className="reveal reveal-delay-1 max-w-xl text-lg leading-relaxed text-gray dark:text-muted">
            Nothing lives at this address. Head home and pick up from there.
          </p>
          <p className="reveal reveal-delay-2">
            <a
              className="inline-flex border border-night bg-transparent px-7 py-3 text-sm font-medium tracking-wide text-night transition-colors duration-500 ease-out hover:bg-night hover:text-day focus-visible:bg-night focus-visible:text-day active:scale-[0.98] dark:border-day dark:text-day dark:hover:bg-day dark:hover:text-night dark:focus-visible:bg-day dark:focus-visible:text-night"
              href="/"
            >
              Go home
            </a>
          </p>
        </section>
      </main>

      <footer className="relative z-10 px-6 py-12 md:px-12 lg:px-20">
        <ul className="flex gap-4 text-sm text-gray">
          <li>
            {new Date().getFullYear()} &copy;{" "}
            <Link href="//github.com/bkemper">bkemper</Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}
