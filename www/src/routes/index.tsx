import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
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

const employers = [
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
    label: "Staq",
    Logo: StaqLogo,
  },
] as const;

function Home() {
  const logoWallRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const wall = logoWallRef.current;
    if (!wall) {
      return;
    }

    const items = wall.querySelectorAll<HTMLElement>(".logo-stagger");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      items.forEach((item) => item.classList.add("is-inview"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-cream text-ink dark:bg-surface dark:text-cream relative min-h-[100dvh] min-w-screen">
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-4 md:px-10">
        <a
          className="inline-flex items-center gap-3 rounded-full"
          href="/"
          aria-label="Brian Patrick Kemper home"
        >
          <img
            src="/logo.svg"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-[14px] shadow-[0_0_0_1px_hsl(40_33%_96%/0.12)]"
          />
          <span className="sr-only">Brian Patrick Kemper</span>
        </a>
        <DarkModeToggle />
      </header>

      <main>
        <section className="relative isolate flex min-h-[100dvh] flex-col justify-end overflow-hidden">
          <img
            src="https://picsum.photos/seed/brian-kemper-cobalt-night/1920/1080"
            alt=""
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            width={1920}
            height={1080}
            decoding="async"
            fetchPriority="high"
          />
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/95 via-ink/70 to-ink/35 dark:from-surface/95 dark:via-surface/75 dark:to-surface/40"
            aria-hidden="true"
          />

          <div className="flex w-full max-w-3xl flex-col items-start gap-5 px-5 pb-16 pt-28 md:px-10 md:pb-20">
            <p className="hero-enter hero-enter-delay-1 text-sm font-medium tracking-[0.18em] text-cream/70 uppercase">
              Product Software Engineer
            </p>
            <h1 className="hero-enter hero-enter-delay-2 text-4xl font-semibold leading-[1.05] tracking-tight text-cream sm:text-6xl md:text-7xl">
              Brian Patrick Kemper
            </h1>
            <p className="hero-enter hero-enter-delay-3 max-w-md text-base leading-relaxed text-cream/85 sm:text-lg">
              Shipping careful product software for teams that care about craft.
            </p>
            <div className="hero-enter hero-enter-delay-4">
              <a
                className="cta-physics inline-flex items-center rounded-full bg-cobalt px-7 py-3 text-sm font-semibold text-cream"
                href="//www.linkedin.com/in/brianpatrickkemper/"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        <section className="bg-cream px-5 py-16 md:px-10 md:py-20 dark:bg-surface-elevated">
          <h2 className="sr-only">Company Logos</h2>
          <ul
            ref={logoWallRef}
            className="mx-auto flex max-w-5xl flex-wrap items-center justify-start gap-x-8 gap-y-6 md:gap-x-12"
          >
            {employers.map(({ href, label, Logo }) => (
              <li key={href} className="logo-stagger">
                <LogoLink aria-label={label} href={href}>
                  <Logo className="h-8 w-auto max-w-[9rem] md:h-10 md:max-w-[11rem]" />
                </LogoLink>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-ink/10 bg-cream px-5 py-20 md:px-10 dark:border-cream/10 dark:bg-surface">
          <p className="mx-auto max-w-xl text-left text-2xl font-medium leading-snug tracking-tight text-ink md:text-3xl dark:text-cream">
            Builds products that help people.
          </p>
        </section>
      </main>

      <footer>
        <ul className="flex justify-start gap-4 px-5 py-10 text-sm text-gray md:px-10">
          <li>
            {new Date().getFullYear()} &copy;{" "}
            <Link href="//github.com/bkemper">bkemper</Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}
