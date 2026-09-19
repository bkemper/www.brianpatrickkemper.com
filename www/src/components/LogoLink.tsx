import { type ReactNode } from "react";

interface LogoLinkProps {
  "aria-label": string;
  children: ReactNode;
  href: string;
}

const LogoLink = ({ "aria-label": ariaLabel, children, href }: LogoLinkProps) => {
  return (
    <a
      aria-label={ariaLabel}
      className="
        block
        border
        border-dashed
        border-night/20
        px-3
        py-2
        text-5xl
        text-muted
        opacity-55
        transition-[color,opacity,border-color]
        duration-500
        ease-out
        hover:border-night/45
        hover:text-night
        hover:opacity-100
        focus-visible:border-night/45
        focus-visible:text-night
        focus-visible:opacity-100
        dark:border-day/20
        dark:hover:border-day/45
        dark:hover:text-day
        dark:focus-visible:border-day/45
        dark:focus-visible:text-day
        md:text-6xl
      "
      href={href}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default LogoLink;
