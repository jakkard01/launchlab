export const site = {
  name: "Powered by IA",
  domain: "poweredbyia.com",
  url: "https://www.poweredbyia.com",
  email: "poweredbyiaoficial@gmail.com",
  whatsappNumber: "911 52 87 53",
  whatsappId: "34911528753",
};

const defaultWhatsappMessage =
  "Hola, vengo desde poweredbyia.com. Quiero info de servicios y una demo.";

export const buildWhatsappLink = (source: string, message?: string) => {
  const text = `${message ?? defaultWhatsappMessage} Fuente: ${source}.`;
  return `https://wa.me/${site.whatsappId}?text=${encodeURIComponent(text)}`;
};

export const socialProfiles = {
  linkedin: "https://www.linkedin.com/company/poweredbyia",
  instagram: "https://www.instagram.com/poweredbyia",
};

export const getSocialLinks = (source: string) => [
  {
    label: "WhatsApp",
    href: buildWhatsappLink(source),
  },
  {
    label: "LinkedIn",
    href: `${socialProfiles.linkedin}?utm_source=${source}`,
  },
  {
    label: "Instagram",
    href: `${socialProfiles.instagram}?utm_source=${source}`,
  },
];
