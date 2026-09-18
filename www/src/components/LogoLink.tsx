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
        px-4
        py-2
        rounded-site
        text-5xl md:text-6xl
        text-muted focus-visible:text-night dark:focus-visible:text-day hover:text-night dark:hover:text-day
        transition-[color,transform] duration-300 ease-out
        focus-visible:scale-105 hover:scale-105
      "
      href={href}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default LogoLink;
