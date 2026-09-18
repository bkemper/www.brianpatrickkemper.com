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
    <div className="bg-field relative flex min-h-screen flex-col">
      <header className="flex items-start justify-end gap-4 px-6 py-4 sm:px-8">
        <Clock />
        <DarkModeToggle />
      </header>
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-6 py-10 sm:px-8 motion-safe:animate-[letterIn_0.9s_ease-out_both]">
        <p className="text-lg leading-relaxed text-ink sm:text-xl">
          A software engineer building products that help people.
        </p>
        <h1 className="font-sign mt-8 text-[clamp(2.75rem,12vw,4.25rem)] leading-[1.1] text-ink">
          Brian Patrick Kemper
        </h1>
        <p className="mt-3">
          <a
            className="
              text-accent
              underline decoration-accent/40 underline-offset-4
              transition-[text-decoration-color] duration-300
              hover:decoration-accent
              focus-visible:rounded-sm
            "
            href="//www.linkedin.com/in/brianpatrickkemper/"
            rel="noopener noreferrer"
          >
            Product Software Engineer · Open on LinkedIn
          </a>
        </p>
        <section className="mt-12 border-t border-rule pt-8">
          <h2 className="text-sm tracking-wide text-muted-ink">
            Places I&apos;ve worked
          </h2>
          <ul className="mt-4 flex flex-col gap-3">
            <li>
              <LogoLink href="//www.linkedin.com/company/pieinsurance/" name="Pie Insurance">
                <PieInsuranceLogo className="h-5 w-auto" />
              </LogoLink>
            </li>
            <li>
              <LogoLink href="//www.linkedin.com/company/visual-lease/" name="Visual Lease">
                <VisualLeaseLogo className="h-5 w-auto" />
              </LogoLink>
            </li>
            <li>
              <LogoLink href="//www.linkedin.com/company/joinfacet/" name="Facet">
                <FacetLogo className="h-5 w-auto" />
              </LogoLink>
            </li>
            <li>
              <LogoLink href="//www.linkedin.com/company/sparkpost/" name="SparkPost">
                <SparkpostLogo className="h-5 w-auto" />
              </LogoLink>
            </li>
            <li>
              <LogoLink href="//www.linkedin.com/company/staq/" name="STAQ">
                <StaqLogo className="h-5 w-auto" />
              </LogoLink>
            </li>
          </ul>
        </section>
      </main>
      <footer className="px-6 py-8 sm:px-8">
        <p className="mx-auto max-w-xl text-sm text-muted-ink">
          {new Date().getFullYear()} &copy;{" "}
          <Link href="//github.com/bkemper">bkemper</Link>
        </p>
      </footer>
    </div>
  );
}
