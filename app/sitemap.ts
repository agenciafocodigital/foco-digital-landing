import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configuredUrl) {
    return [];
  }

  let baseUrl: URL;
  try {
    baseUrl = new URL(configuredUrl);
  } catch {
    return [];
  }

  return [
    {
      url: new URL("/", baseUrl).toString(),
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: new URL("/aviso-de-privacidad", baseUrl).toString(),
      changeFrequency: "yearly",
      priority: 0.3
    },
    {
      url: new URL("/terminos-y-condiciones", baseUrl).toString(),
      changeFrequency: "yearly",
      priority: 0.3
    }
  ];
}
