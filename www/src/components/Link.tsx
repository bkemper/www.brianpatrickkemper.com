import type { ReactNode } from "react";

interface LinkProps {
  children: ReactNode;
  href: string;
}

const Link = ({ children, href }: LinkProps) => {
  return (
    <a
      className="decoration-dotted underline focus:decoration-solid hover:decoration-solid"
      href={href}
      rel={/^(https?:)?\/\//.test(href) ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
};

export default Link;
