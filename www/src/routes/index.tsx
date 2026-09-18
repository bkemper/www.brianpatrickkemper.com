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
    <div className="bg-site text-night dark:text-day relative flex min-h-[100dvh] min-w-full flex-col">
      <header className="absolute top-0 right-0 z-10 flex items-center justify-end px-5 py-4 md:px-8">
        <DarkModeToggle />
      </header>

      <main className="flex flex-1 flex-col">
        <section className="grid flex-1 items-center gap-10 px-6 pt-20 pb-12 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-14 md:px-12 md:pt-16 lg:gap-20 lg:px-20">
          <div className="animate-hero-enter flex max-w-xl flex-col gap-6 md:gap-7">
            <h1 className="text-[clamp(2.75rem,7vw,5.25rem)] leading-[0.95] font-semibold tracking-[-0.03em] text-balance">
              Brian Patrick Kemper
            </h1>
            <p className="animate-hero-enter-delay max-w-md text-base leading-relaxed text-gray md:text-lg">
              Product Software Engineer building products that help people.
            </p>
            <p className="animate-hero-enter-delay-2">
              <a
                className="
                  bg-cobalt hover:bg-cobalt-soft focus-visible:bg-cobalt-soft
                  inline-flex items-center
                  px-7 py-2.5
                  rounded-site
                  text-sm font-medium tracking-wide text-day
                  transition-[background-color,transform] duration-300 ease-out
                  hover:scale-[1.02] focus-visible:scale-[1.02]
                "
                href="https://www.linkedin.com/in/brianpatrickkemper/"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </p>
          </div>

          <div className="animate-hero-enter-delay relative min-h-[280px] md:min-h-[420px]">
            <img
              alt="Desk workspace with laptop and soft daylight"
              className="h-full max-h-[min(70vh,640px)] w-full rounded-site object-cover shadow-[0_24px_60px_-28px_hsl(220_18%_12%/0.35)] dark:shadow-[0_24px_60px_-28px_hsl(0_0%_0%/0.55)]"
              height={1200}
              src="https://picsum.photos/seed/brian-patrick-kemper-desk/1600/1200"
              width={1600}
            />
          </div>
        </section>

        <section className="border-t border-smoke/80 px-6 py-12 md:px-12 lg:px-20 dark:border-white/10">
          <h2 className="sr-only">Company Logos</h2>
          <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4 md:gap-x-4">
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
                aria-label="Sparkpost on LinkedIn"
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

      <footer>
        <ul className="flex justify-center gap-4 px-6 py-10 text-sm text-gray">
          <li>
            {new Date().getFullYear()} &copy;{" "}
            <Link href="//github.com/bkemper">bkemper</Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}
