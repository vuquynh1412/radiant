const fallbackSiteUrl = "http://localhost:3000";

export const siteConfig = {
  name: "Radiant",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || fallbackSiteUrl,
} as const;
