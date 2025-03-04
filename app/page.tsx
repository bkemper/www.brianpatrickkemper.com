import DarkModeToggle from "@/components/DarkModeToggle";
import LogoLink from "@/components/LogoLink";
import FacetLogo from "@/components/logos/FacetLogo";
import SparkpostLogo from "@/components/logos/SparkpostLogo";
import StaqLogo from "@/components/logos/StaqLogo";
import VisualLeaseLogo from "@/components/logos/VisualLeaseLogo";
import Clock from "@/components/Clock";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

export default function HomePage() {
  return (
    <div className="bg-day dark:bg-night min-h-screen min-w-screen relative">
      <header className="flex gap-4 items-center justify-end px-6 py-2">
        <div>
          <Clock />
        </div>
        <div>
          <DarkModeToggle />
        </div>
      </header>
      <main className="flex flex-col gap-6 h-[65vh] justify-center px-16 md:px-32 py-8">
        <h1 className="font-sign h-[1em] overflow-hidden text-8xl text-night text-wrap dark:text-day">
          Brian Patrick Kemper
        </h1>
        <p>
          <a
            className="
              focus:bg-night dark:focus:bg-day hover:bg-night dark:hover:bg-day
              border border-muted focus:border-night dark:focus:border-day hover:border-night dark:hover:border-day
              duration-700
              ease-in-out
              gap-1
              inline-flex
              px-6
              py-1
              rounded-full
              text-night dark:text-day focus:text-day dark:focus:text-night hover:text-day dark:hover:text-night
              text-sm
              transition-color
            "
            href="//www.linkedin.com/in/brianpatrickkemper/"
            rel="noopener noreferrer"
          >
            Software Engineer <ArrowTopRightIcon height="1rem" width="1rem" />
          </a>
        </p>
      </main>
      <footer>
        <section>
          <h2 className="sr-only">Company Logos</h2>
          <ul className="flex flex-wrap-reverse gap-16 justify-center p-16">
            <li>
              <LogoLink href="//www.linkedin.com/company/staq/">
                <StaqLogo />
              </LogoLink>
            </li>
            <li>
              <LogoLink href="//www.linkedin.com/company/sparkpost/">
                <SparkpostLogo />
              </LogoLink>
            </li>
            <li>
              <LogoLink href="//www.linkedin.com/company/joinfacet/">
                <FacetLogo />
              </LogoLink>
            </li>
            <li>
              <LogoLink href="//www.linkedin.com/company/visual-lease/">
                <VisualLeaseLogo />
              </LogoLink>
            </li>
          </ul>
        </section>
      </footer>
    </div>
  );
}
