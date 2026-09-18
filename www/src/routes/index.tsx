import { createFileRoute } from "@tanstack/react-router";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
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

const profileLinkedIn = "//www.linkedin.com/in/brianpatrickkemper/";
const profileGitHub = "//github.com/bkemper";

const companies = [
  {
    href: "//www.linkedin.com/company/pieinsurance/",
    label: "Pie Insurance",
    Logo: PieInsuranceLogo,
  },
  {
    href: "//www.linkedin.com/company/visual-lease/",
    label: "Visual Lease",
    Logo: VisualLeaseLogo,
  },
  {
    href: "//www.linkedin.com/company/joinfacet/",
    label: "Facet",
    Logo: FacetLogo,
  },
  {
    href: "//www.linkedin.com/company/sparkpost/",
    label: "SparkPost",
    Logo: SparkpostLogo,
  },
  {
    href: "//www.linkedin.com/company/staq/",
    label: "STAQ",
    Logo: StaqLogo,
  },
] as const;

function Home() {
  return (
    <div className="bg-day text-night dark:bg-night dark:text-day relative min-h-[100dvh] overflow-x-hidden">
      <header className="absolute inset-x-0 top-0 z-20 flex h-16 items-center justify-end gap-3 px-5 md:w-1/2 md:px-10 lg:px-16">
        <Clock />
        <DarkModeToggle />
      </header>

      <main>
        <section className="grid min-h-[100dvh] md:grid-cols-2">
          <div className="relative flex flex-col justify-center px-5 pt-20 pb-14 md:px-10 md:pt-16 md:pb-16 lg:px-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(162_40%_50%_/_0.1),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_bottom_left,hsl(162_40%_40%_/_0.14),transparent_55%)]"
            />
            <div className="relative mx-auto flex w-full max-w-xl flex-col gap-8 md:mx-0 md:gap-10">
              <div className="flex flex-col gap-3">
                <h1 className="reveal text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                  Brian Patrick Kemper
                </h1>
                <p className="reveal reveal-delay-1 text-xl font-medium text-gray md:text-2xl">
                  Senior Software Engineer
                </p>
              </div>

              <div className="reveal reveal-delay-2">
                <h2 className="sr-only">Company Logos</h2>
                <ul className="flex flex-wrap items-center gap-x-0 gap-y-3">
                  {companies.map(({ href, label, Logo }) => (
                    <li key={href}>
                      <LogoLink href={href} label={label}>
                        <Logo />
                      </LogoLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="reveal reveal-delay-3 flex flex-wrap gap-3">
                <a
                  className="inline-flex items-center gap-2 rounded-[var(--radius-control)] bg-accent px-5 py-2.5 text-sm font-medium text-day transition-[transform,filter] duration-200 ease-out hover:brightness-110 active:scale-[0.98]"
                  href={profileLinkedIn}
                  rel="noopener noreferrer"
                >
                  <LinkedInLogoIcon aria-hidden height="1rem" width="1rem" />
                  LinkedIn
                </a>
                <a
                  className="inline-flex items-center gap-2 rounded-[var(--radius-control)] border border-muted bg-transparent px-5 py-2.5 text-sm font-medium text-night transition-colors duration-200 ease-out hover:border-night hover:bg-night hover:text-day active:scale-[0.98] dark:border-muted dark:text-day dark:hover:border-day dark:hover:bg-day dark:hover:text-night"
                  href={profileGitHub}
                  rel="noopener noreferrer"
                >
                  <GitHubLogoIcon aria-hidden height="1rem" width="1rem" />
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <div className="relative min-h-[38vh] md:min-h-full">
            <img
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
              decoding="async"
              fetchPriority="high"
              height={864}
              role="presentation"
              src="/hero.jpg"
              width={1152}
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-night/30 via-transparent to-transparent md:bg-gradient-to-l md:from-transparent md:via-transparent md:to-day/25 dark:md:to-night/35"
            />
          </div>
        </section>
      </main>

      <footer className="border-t border-muted/60">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-5 py-8 text-sm text-gray md:flex-row md:items-center md:justify-between md:px-10 md:py-10">
          <p>
            {new Date().getFullYear()} &copy; Brian Patrick Kemper
          </p>
          <ul className="flex gap-5">
            <li>
              <Link href={profileLinkedIn}>LinkedIn</Link>
            </li>
            <li>
              <Link href={profileGitHub}>bkemper</Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
