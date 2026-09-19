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
        className="atmosphere-wash pointer-events-none fixed inset-0 z-0"
      />
      <div
        aria-hidden="true"
        className="paper-grain pointer-events-none fixed inset-0 z-50"
      />

      <header className="relative z-10 flex items-center justify-end gap-4 px-6 py-5 md:px-12 lg:px-24">
        <Clock />
        <DarkModeToggle />
      </header>

      <main className="relative z-10">
        <section className="flex min-h-[68dvh] flex-col justify-end gap-10 px-6 pb-20 pt-6 md:px-12 md:pb-28 md:pt-8 lg:max-w-6xl lg:px-24">
          <h1 className="reveal font-display max-w-[14ch] text-[clamp(3.25rem,10vw,6.75rem)] leading-[0.92] font-medium tracking-tighter text-balance">
            Brian Patrick{" "}
            <span className="relative inline-block pb-1 after:absolute after:inset-x-0 after:bottom-0 after:h-1.5 after:bg-accent">
              Kemper
            </span>
          </h1>
          <p className="reveal reveal-delay-1 max-w-[36ch] text-xl leading-relaxed text-gray md:text-2xl dark:text-muted">
            I'm a{" "}
            <span className="font-bold text-night dark:text-day">
              Product Software Engineer
            </span>{" "}
            building digital products that make work life easier by
            understanding your domain and leading teams to deliver a thoughtful
            user experience.
          </p>
          <p className="reveal reveal-delay-2">
            <a
              className="inline-flex border border-night bg-transparent px-9 py-4 text-base font-medium tracking-wide text-night transition-[color,background-color,border-color,transform] duration-300 ease-out hover:border-accent hover:bg-accent hover:text-accent-ink focus-visible:border-accent focus-visible:bg-accent focus-visible:text-accent-ink active:scale-[0.98] dark:border-day dark:text-day dark:hover:border-accent dark:hover:bg-accent dark:hover:text-accent-ink dark:focus-visible:border-accent dark:focus-visible:bg-accent dark:focus-visible:text-accent-ink"
              href="//www.linkedin.com/in/brianpatrickkemper/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Connect
            </a>
          </p>
        </section>

        <section className="border-t border-night/15 px-6 py-16 md:px-12 md:py-20 lg:px-24 dark:border-day/15">
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

      <footer className="relative z-10 border-t border-night/15 px-6 py-12 md:px-12 lg:px-24 dark:border-day/15">
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
