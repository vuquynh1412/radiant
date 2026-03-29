import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";

import "@/app/globals.css";

import {
  localeToOpenGraphLocale,
  type Locale,
} from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { getLanguageAlternates, getLocalizedUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({
    locale,
    namespace: "Metadata.Home",
  });
  const alternateLocales = routing.locales.filter(
    (candidate): candidate is Exclude<Locale, typeof locale> =>
      candidate !== locale,
  );
  const keywords = t.raw("keywords");

  return {
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    title: t("title"),
    description: t("description"),
    keywords: Array.isArray(keywords) ? keywords : [],
    alternates: {
      canonical: getLocalizedUrl(locale),
      languages: getLanguageAlternates(),
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: localeToOpenGraphLocale[locale],
      alternateLocale: alternateLocales.map(
        (candidate) => localeToOpenGraphLocale[candidate],
      ),
      title: t("title"),
      description: t("description"),
      url: getLocalizedUrl(locale),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
