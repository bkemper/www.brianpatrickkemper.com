import { type ReactNode } from "react";

interface LogoLinkProps {
  children: ReactNode;
  href: string;
}

const LogoLink = ({ children, href }: LogoLinkProps) => {
  return (
    <a
      className="
        block
        duration-300
        ease-in-out
        px-2
        py-1
        text-4xl
        md:text-5xl
        text-mist
        hover:text-ink
        dark:hover:text-day
        focus-visible:text-ink
        dark:focus-visible:text-day
        transition-colors
      "
      href={href}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default LogoLink;
