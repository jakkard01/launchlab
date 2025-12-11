import type { MetadataRoute } from 'next';

const baseUrl = 'https://www.poweredbyia.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
    },
    {
      url: `${baseUrl}/prompts`,
      lastModified,
    },
    {
      url: `${baseUrl}/cursos`,
      lastModified,
    },
    {
      url: `${baseUrl}/bot`,
      lastModified,
    },
  ];
}