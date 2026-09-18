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
        duration-300
        ease-out
        px-1
        py-1
        focus-visible:scale-105 hover:scale-105
        text-5xl md:text-6xl
        text-muted focus-visible:text-ink dark:focus-visible:text-cream hover:text-ink dark:hover:text-cream
        transition-[transform,color]
      "
      href={href}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default LogoLink;
