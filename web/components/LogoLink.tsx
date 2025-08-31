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
        px-4
        py-1
        focus:scale-110 hover:scale-110
        text-6xl
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
