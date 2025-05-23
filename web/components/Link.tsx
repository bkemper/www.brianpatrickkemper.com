import NextLink from "next/link";
import { ComponentPropsWithRef } from "react";

interface LinkProps {
  children: React.ReactNode;
  href: ComponentPropsWithRef<typeof NextLink>["href"];
}

const Link = ({ children, href }: LinkProps) => {
  return (
    <NextLink
      className="decoration-dotted underline focus:decoration-solid hover:decoration-solid"
      href={href}
      rel={
        typeof href === "string" && /^(https?:)?\/\//.test(href) ? "noopener noreferrer" : undefined
      }
    >
      {children}
    </NextLink>
  );
};

export default Link;
