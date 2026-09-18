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
        px-1
        py-1
        text-4xl
        text-muted
        transition-colors
        duration-500
        ease-out
        hover:text-night
        focus-visible:text-night
        dark:hover:text-day
        dark:focus-visible:text-day
        md:text-5xl
      "
      href={href}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default LogoLink;
