import { routing } from "@/i18n/routing";

export const locales = routing.locales;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = routing.defaultLocale;

export const localeLabels: Record<Locale, string> = {
  en: "English",
  vi: "Tiếng Việt",
};

export const localeToOpenGraphLocale: Record<Locale, string> = {
  en: "en_US",
  vi: "vi_VN",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
