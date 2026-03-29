import type { MetadataRoute } from "next";

import { locales } from "@/i18n/config";
import { getLanguageAlternates, getLocalizedUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.map((locale) => ({
    url: getLocalizedUrl(locale),
    lastModified,
    alternates: {
      languages: getLanguageAlternates(),
    },
  }));
}
