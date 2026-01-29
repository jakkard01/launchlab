"use client";

import { getSocialLinks } from "../content/site";

type SocialLinksProps = {
  source: string;
  className?: string;
  linkClassName?: string;
};

export default function SocialLinks({
  source,
  className = "",
  linkClassName = "",
}: SocialLinksProps) {
  const links = getSocialLinks(source);

  return (
    <div className={className}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className={linkClassName}
          target="_blank"
          rel="noreferrer"
          aria-label={link.label}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
