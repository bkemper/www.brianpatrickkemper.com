import Link from "./Link";

export default function NotFound() {
  return (
    <div className="bg-day text-night dark:bg-night dark:text-day relative flex min-h-[100dvh] min-w-screen flex-col">
      <div
        aria-hidden="true"
        className="atmosphere-wash pointer-events-none fixed inset-0 z-0"
      />
      <div
        aria-hidden="true"
        className="paper-grain pointer-events-none fixed inset-0 z-50"
      />

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center md:px-12 lg:px-20">
        <h1 className="reveal font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-tight font-normal tracking-tight text-balance">
          Where you going?
        </h1>
        <p className="reveal reveal-delay-1 max-w-md text-lg leading-relaxed text-gray dark:text-muted">
          This page does not exist. Return{" "}
          <Link href="/">home</Link> when ready.
        </p>
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
