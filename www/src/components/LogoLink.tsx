import { type ReactNode } from "react";

interface LogoLinkProps {
  children: ReactNode;
  href: string;
  name: string;
}

const LogoLink = ({ children, href, name }: LogoLinkProps) => {
  return (
    <a
      className="
        group
        inline-flex
        max-w-full
        items-center
        gap-3
        text-ink
        transition-opacity
        duration-300
        hover:opacity-70
        focus-visible:rounded-sm
      "
      href={href}
      rel="noopener noreferrer"
    >
      <span aria-hidden="true" className="inline-flex h-5 shrink-0 items-center text-[1.25rem]">
        {children}
      </span>
      <span className="text-base underline decoration-rule underline-offset-4 group-hover:decoration-ink">
        {name}
      </span>
    </a>
  );
};

export default LogoLink;
