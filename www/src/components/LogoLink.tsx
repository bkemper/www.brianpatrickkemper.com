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
        sm:px-3
        motion-safe:focus:scale-105 motion-safe:hover:scale-105
        text-[clamp(2.25rem,8vw,3.75rem)]
        text-ink-soft dark:text-day/80 focus:text-night dark:focus:text-day hover:text-night dark:hover:text-day
        transition-all
      "
      href={href}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default LogoLink;
