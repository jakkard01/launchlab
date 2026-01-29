export const siteConfig = {
  brand: "Powered by IA",
  domain: "poweredbyia.com",
  email: "poweredbyiaoficial@gmail.com",
  whatsapp: {
    phone: "911 52 87 53",
    url: "https://wa.me/34911528753",
    label: "WhatsApp",
  },
  socials: {
    instagram: "https://www.instagram.com/poweredbyiaoficial",
    tiktok: "https://www.tiktok.com/@poweredbyia0",
    youtube: "https://www.youtube.com/@poweredbyiaoficial",
    x: "https://x.com/poweredbyiao",
    facebook: "https://www.facebook.com/search/top?q=powered%20by%20ia%20oficial",
  },
  ogImage: "/og.png",
  ogAlt: "Powered by IA",
};

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  `https://${siteConfig.domain}`;

export const siteUrl = rawSiteUrl.replace(/\/$/, "");

const defaultWhatsappMessage =
  "Hola, vengo desde poweredbyia.com. Quiero info de servicios y una demo.";

export const buildWhatsappLink = (source: string, message?: string) => {
  const text = `${message ?? defaultWhatsappMessage} Fuente: ${source}.`;
  return `${siteConfig.whatsapp.url}?text=${encodeURIComponent(text)}`;
};

export const buildContactLink = (
  source: string,
  extraParams: Record<string, string> = {}
) => {
  const params = new URLSearchParams({
    source,
    utm_source: source,
    ...extraParams,
  });
  return `/contact?${params.toString()}`;
};

const withSource = (href: string, source: string) => {
  const separator = href.includes("?") ? "&" : "?";
  return `${href}${separator}utm_source=${source}`;
};

export const getSocialLinks = (source: string) => [
  {
    label: siteConfig.whatsapp.label,
    href: buildWhatsappLink(source),
  },
  { label: "Instagram", href: withSource(siteConfig.socials.instagram, source) },
  { label: "TikTok", href: withSource(siteConfig.socials.tiktok, source) },
  { label: "YouTube", href: withSource(siteConfig.socials.youtube, source) },
  { label: "X", href: withSource(siteConfig.socials.x, source) },
  { label: "Facebook", href: withSource(siteConfig.socials.facebook, source) },
];
