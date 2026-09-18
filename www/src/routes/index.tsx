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
    <div className="bg-day dark:bg-night min-h-screen relative">
      <header className="flex gap-4 items-start justify-end px-6 py-3 sm:px-10">
        <Clock />
        <DarkModeToggle />
      </header>
      <main>
        <section className="flex flex-col gap-6 justify-center min-h-[50vh] px-6 sm:px-10 md:px-16 lg:px-32">
          <h1 className="font-sign text-[clamp(2.75rem,12vw,6rem)] leading-[1.05] text-night text-balance dark:text-day">
            Brian Patrick Kemper
          </h1>
          <p>
            <a
              className="
                focus-visible:bg-night dark:focus-visible:bg-day hover:bg-night dark:hover:bg-day
                border-b-2 border-night/40 dark:border-day/40 focus-visible:border-night dark:focus-visible:border-day hover:border-night dark:hover:border-day
                duration-500
                ease-in-out
                inline-flex
                px-1
                pb-1
                pt-0.5
                text-night dark:text-day focus-visible:text-day dark:focus-visible:text-night hover:text-day dark:hover:text-night
                text-base
                transition-colors
              "
              href="//www.linkedin.com/in/brianpatrickkemper/"
              rel="noopener noreferrer"
            >
              Product Software Engineer
            </a>
          </p>
        </section>
        <section className="px-6 py-12 sm:px-10 md:px-16 lg:px-32">
          <h2 className="sr-only">Company Logos</h2>
          <ul className="flex flex-row-reverse flex-wrap gap-x-2 gap-y-4 justify-center items-center">
            <li>
              <LogoLink href="//www.linkedin.com/company/pieinsurance/">
                <PieInsuranceLogo />
              </LogoLink>
            </li>
            <li>
              <LogoLink href="//www.linkedin.com/company/visual-lease/">
                <VisualLeaseLogo />
              </LogoLink>
            </li>
            <li>
              <LogoLink href="//www.linkedin.com/company/joinfacet/">
                <FacetLogo />
              </LogoLink>
            </li>
            <li>
              <LogoLink href="//www.linkedin.com/company/sparkpost/">
                <SparkpostLogo />
              </LogoLink>
            </li>
            <li>
              <LogoLink href="//www.linkedin.com/company/staq/">
                <StaqLogo />
              </LogoLink>
            </li>
          </ul>
        </section>
      </main>
      <footer>
        <ul className="flex gap-4 justify-center p-10 text-sm text-gray sm:p-16">
          <li>
            {new Date().getFullYear()} &copy;{" "}
            <Link href="//github.com/bkemper">bkemper</Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}
