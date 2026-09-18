import { type ReactNode } from "react";

interface LogoLinkProps {
  children: ReactNode;
  href: string;
  label: string;
}

const LogoLink = ({ children, href, label }: LogoLinkProps) => {
  return (
    <a
      aria-label={label}
      className="
        block
        px-2
        py-1
        text-4xl
        text-muted
        transition-colors
        duration-300
        ease-out
        focus:text-night
        hover:text-night
        dark:focus:text-day
        dark:hover:text-day
        sm:px-3
        sm:text-5xl
      "
      href={href}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default LogoLink;
