"use client";

import { trackEvent } from "../../lib/analytics";
import { getSocialLinks } from "../../lib/site";

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
      {links.map((link) => {
        const safeHref = link.href.startsWith("http")
          ? link.href
          : `https://${link.href}`;
        return (
          <a
            key={link.label}
            href={safeHref}
            className={linkClassName}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            onClick={() => {
              if (link.label === "WhatsApp") {
                trackEvent("click_whatsapp", { source });
              }
            }}
          >
            {link.label}
          </a>
        );
      })}
    </div>
  );
}
