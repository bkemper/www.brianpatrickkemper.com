import { createFileRoute } from "@tanstack/react-router";
import Clock from "../components/Clock";
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
    <div className="bg-day text-night dark:bg-night dark:text-day relative min-h-[100dvh] min-w-screen">
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
          <h1 className="reveal font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95] font-medium tracking-tight text-balance">
            Brian Patrick Kemper
          </h1>
          <p className="reveal reveal-delay-1 max-w-xl text-lg leading-relaxed text-gray dark:text-muted">
            A{" "}
            <span className="font-bold italic text-night dark:text-day">
              Product Software Engineer
            </span>{" "}
            who builds digital products that make your work life easier by
            understanding your domain and leading teams to deliver a thoughtful
            user experience.
          </p>
          <p className="reveal reveal-delay-2">
            <a
              className="inline-flex border border-night bg-transparent px-7 py-3 text-sm font-medium tracking-wide text-night transition-colors duration-500 ease-out hover:bg-night hover:text-day focus-visible:bg-night focus-visible:text-day dark:border-day dark:text-day dark:hover:bg-day dark:hover:text-night dark:focus-visible:bg-day dark:focus-visible:text-night"
              href="//www.linkedin.com/in/brianpatrickkemper/"
              rel="noopener noreferrer"
            >
              Connect
            </a>
          </p>
        </section>

        <section className="border-t border-night/15 px-6 py-16 md:px-12 md:py-20 lg:px-20 dark:border-day/15">
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

      <footer className="relative z-10 border-t border-night/15 px-6 py-12 md:px-12 lg:px-20 dark:border-day/15">
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
