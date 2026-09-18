import { createFileRoute } from "@tanstack/react-router";
import DarkModeToggle from "../components/DarkModeToggle";
import Link from "../components/Link";
import LogoLink from "../components/LogoLink";
import FacetLogo from "../components/logos/FacetLogo";
import PieInsuranceLogo from "../components/logos/PieInsuranceLogo";
import SparkpostLogo from "../components/logos/SparkpostLogo";
import StaqLogo from "../components/logos/StaqLogo";
import VisualLeaseLogo from "../components/logos/VisualLeaseLogo";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="bg-day text-forest dark:bg-night dark:text-bone relative min-h-[100dvh] min-w-screen">
      <div
        aria-hidden="true"
        className="paper-grain pointer-events-none fixed inset-0 z-50"
      />

      <header className="relative z-10 flex items-center justify-end px-6 py-5 md:px-12 lg:px-20">
        <DarkModeToggle />
      </header>

      <main className="relative z-10">
        <section className="grid gap-10 px-6 pb-16 pt-6 md:px-12 md:pb-24 md:pt-10 lg:grid-cols-12 lg:gap-8 lg:px-20">
          <div className="flex flex-col gap-8 lg:col-span-7 lg:pr-8">
            <p className="reveal text-sm font-medium tracking-[0.18em] text-forest-mist uppercase dark:text-muted">
              Product Software Engineer
            </p>
            <h1 className="reveal reveal-delay-1 font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95] font-semibold tracking-tight text-balance">
              Brian Patrick Kemper
            </h1>
            <p className="reveal reveal-delay-2 max-w-md text-lg leading-relaxed text-forest-mist dark:text-muted">
              Building calm, durable product software for teams that ship.
            </p>
            <p className="reveal reveal-delay-3">
              <a
                className="inline-flex border border-amber bg-transparent px-7 py-3 text-sm font-medium tracking-wide text-forest transition-colors duration-500 ease-out hover:bg-amber hover:text-night focus-visible:bg-amber focus-visible:text-night dark:text-bone dark:hover:text-night dark:focus-visible:text-night"
                href="//www.linkedin.com/in/brianpatrickkemper/"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </p>
          </div>

          <div className="reveal reveal-delay-2 relative lg:col-span-5 lg:col-start-8 lg:mt-24">
            <div className="absolute -inset-x-6 -inset-y-4 bg-forest/8 dark:bg-forest-mid/40 lg:-inset-x-10" />
            <img
              alt="Editorial landscape photograph"
              className="relative z-10 aspect-[9/5] h-auto w-full object-cover"
              height={1000}
              src="https://picsum.photos/seed/brian-kemper-forest-editorial/1800/1000"
              width={1800}
            />
          </div>
        </section>

        <section className="border-t border-forest/15 px-6 py-16 md:px-12 md:py-20 lg:px-20 dark:border-bone/15">
          <h2 className="sr-only">Company Logos</h2>
          <ul className="reveal-on-scroll flex flex-wrap items-center gap-x-10 gap-y-8 md:justify-between">
            <li>
              <LogoLink
                aria-label="Pie Insurance on LinkedIn"
                href="//www.linkedin.com/company/pieinsurance/"
              >
                <PieInsuranceLogo />
              </LogoLink>
            </li>
            <li>
              <LogoLink
                aria-label="Visual Lease on LinkedIn"
                href="//www.linkedin.com/company/visual-lease/"
              >
                <VisualLeaseLogo />
              </LogoLink>
            </li>
            <li>
              <LogoLink
                aria-label="Facet on LinkedIn"
                href="//www.linkedin.com/company/joinfacet/"
              >
                <FacetLogo />
              </LogoLink>
            </li>
            <li>
              <LogoLink
                aria-label="SparkPost on LinkedIn"
                href="//www.linkedin.com/company/sparkpost/"
              >
                <SparkpostLogo />
              </LogoLink>
            </li>
            <li>
              <LogoLink
                aria-label="Staq on LinkedIn"
                href="//www.linkedin.com/company/staq/"
              >
                <StaqLogo />
              </LogoLink>
            </li>
          </ul>
        </section>
      </main>

      <footer className="relative z-10 border-t border-forest/15 px-6 py-12 md:px-12 lg:px-20 dark:border-bone/15">
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
