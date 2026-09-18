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
    <div className="bg-day dark:bg-night min-h-screen min-w-screen relative text-ink dark:text-day">
      <header className="flex items-center justify-end px-5 py-3 md:px-10">
        <DarkModeToggle />
      </header>
      <main className="flex flex-col gap-16 px-5 pb-10 md:px-16 lg:px-24">
        <section className="flex flex-col gap-8 pt-6 md:pt-16 md:max-w-3xl">
          <Clock />
          <div className="flex flex-col gap-4">
            <h1 className="font-sign text-4xl text-ink text-wrap md:text-6xl dark:text-day">
              Brian Patrick Kemper
            </h1>
            <p className="text-mist text-base">Product Software Engineer</p>
            <p>
              <a
                className="
                  inline-flex
                  items-center
                  border-b
                  border-signal
                  pb-0.5
                  text-signal
                  transition-colors
                  duration-300
                  ease-in-out
                  hover:border-ink hover:text-ink
                  dark:hover:border-day dark:hover:text-day
                  focus-visible:rounded-sm
                "
                href="//www.linkedin.com/in/brianpatrickkemper/"
                rel="noopener noreferrer"
              >
                Open LinkedIn
              </a>
            </p>
          </div>
        </section>
        <section className="border-t border-muted/40 pt-10">
          <h2 className="mb-6 text-sm text-mist">Places I&apos;ve worked</h2>
          <ul className="flex flex-wrap gap-2 md:gap-4">
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
        <ul className="flex gap-4 justify-start px-5 py-10 text-sm text-mist md:px-16 lg:px-24">
          <li>
            {new Date().getFullYear()} &copy;{" "}
            <Link href="//github.com/bkemper">bkemper</Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}
