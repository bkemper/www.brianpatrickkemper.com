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
        text-5xl
        text-muted
        opacity-55
        transition-[color,opacity,transform]
        duration-500
        ease-out
        hover:text-night
        hover:opacity-100
        hover:-translate-y-0.5
        focus-visible:text-night
        focus-visible:opacity-100
        dark:hover:text-day
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
