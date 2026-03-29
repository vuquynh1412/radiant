import { locales, type Locale } from "@/i18n/config";
import { siteConfig } from "@/lib/site";

function normalizePathname(pathname = "") {
  if (!pathname || pathname === "/") {
    return "";
  }

  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function getLocalizedUrl(locale: Locale, pathname = "") {
  return new URL(`/${locale}${normalizePathname(pathname)}`, siteConfig.url).toString();
}

export function getLanguageAlternates(pathname = "") {
  return Object.fromEntries(
    locales.map((locale) => [locale, getLocalizedUrl(locale, pathname)]),
  ) as Record<Locale, string>;
}
