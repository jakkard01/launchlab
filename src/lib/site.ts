export const site = {
  name: "Powered by IA",
  domain: "poweredbyia.com",
  url: "https://www.poweredbyia.com",
  email: "poweredbyiaoficial@gmail.com",
  whatsappNumber: "911 52 87 53",
  whatsappId: "34911528753",
  ogImage: "/og.png",
  ogAlt: "Powered by IA",
};

const defaultWhatsappMessage =
  "Hola, vengo desde poweredbyia.com. Quiero info de servicios y una demo.";

export const buildWhatsappLink = (source: string, message?: string) => {
  const text = `${message ?? defaultWhatsappMessage} Fuente: ${source}.`;
  return `https://wa.me/${site.whatsappId}?text=${encodeURIComponent(text)}`;
};

type SocialProfile = {
  label: string;
  handle?: string;
  url?: string;
  base?: string;
};

const socialProfiles: SocialProfile[] = [
  { label: "Instagram", handle: "poweredbyiaoficial", base: "https://www.instagram.com/" },
  { label: "TikTok", handle: "poweredbyia0", base: "https://www.tiktok.com/@" },
  { label: "YouTube", url: "https://www.youtube.com/@poweredbyiaoficial" },
  { label: "X", url: "https://x.com/poweredbyiao" },
  { label: "Facebook", handle: "poweredbyia0ficial", base: "https://www.facebook.com/" },
];

const withSource = (href: string, source: string) => {
  const separator = href.includes("?") ? "&" : "?";
  return `${href}${separator}utm_source=${source}`;
};

export const getSocialLinks = (source: string) => [
  {
    label: "WhatsApp",
    href: buildWhatsappLink(source),
  },
  ...socialProfiles.map((profile) => {
    const base = profile.url ?? `${profile.base}${profile.handle}/`;
    return {
      label: profile.label,
      href: withSource(base, source),
    };
  }),
];
