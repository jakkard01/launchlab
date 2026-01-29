import { MetadataRoute } from 'next';
import { siteUrl } from '../lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/cursos`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/web`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/video`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/ops`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/bots`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/alcance`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tienda`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/bots`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/demos`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
  ];
}
