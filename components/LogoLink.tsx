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
        duration-500
        ease-in-out
        outline-0
        px-4
        py-1
        focus:scale-110 hover:scale-110
        text-7xl
        text-muted focus:text-night dark:focus:text-day hover:text-night dark:hover:text-day
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
