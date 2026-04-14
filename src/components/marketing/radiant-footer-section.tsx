"use client";

import { MailIcon, MapPinIcon, PhoneCallIcon } from "lucide-react";

import { sanitizePhoneNumber } from "@/lib/utils";

import type { RadiantExperienceContent } from "./radiant-experience.types";
import { RadiantBrandLogo, ZaloLogoIcon } from "./radiant-experience-shared";
import {
  radiantSocialLinks,
  radiantSupportLinks,
} from "./radiant-social-links";

type RadiantFooterSectionProps = {
  content: RadiantExperienceContent;
};

const footerTickerRepeats = 10;

function SocialGlyph({
  type,
}: {
  type: "facebook" | "instagram" | "tiktok" | "linkedin" | "youtube" | "zalo";
}) {
  if (type === "zalo") {
    return <ZaloLogoIcon className="size-4.5" />;
  }

  if (type === "facebook") {
    return (
      <svg
        aria-hidden="true"
        className="size-4"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M13.6 24v-10.2h3.4l.5-4h-3.9V7.2c0-1.2.3-2 2-2H17.7V1.6c-.4 0-1.7-.1-3.1-.1-3.1 0-5.2 1.9-5.2 5.4v3H6v4h3.4V24z" />
      </svg>
    );
  }

  if (type === "instagram") {
    return (
      <svg
        aria-hidden="true"
        className="size-4"
        fill="none"
        viewBox="0 0 24 24"
      >
        <rect
          x="3.5"
          y="3.5"
          width="17"
          height="17"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.3" cy="6.8" r="1.1" fill="currentColor" />
      </svg>
    );
  }

  if (type === "tiktok") {
    return (
      <svg
        aria-hidden="true"
        className="size-4"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M14.8 3c.3 2.1 1.5 3.8 3.5 4.8v2.6a8.1 8.1 0 0 1-3.4-1v5.2a5.7 5.7 0 1 1-5.7-5.7c.4 0 .8 0 1.2.1v2.7a3.3 3.3 0 1 0 2.1 3.1V3z" />
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg
        aria-hidden="true"
        className="size-4"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M6.2 8.6H3.3V20h2.9zM4.8 7.3a1.7 1.7 0 1 0 0-3.3 1.7 1.7 0 0 0 0 3.3M20.7 20v-6.2c0-3.3-1.8-4.8-4.1-4.8-1.9 0-2.7 1-3.2 1.8V8.6h-2.9V20h2.9v-6.3c0-1.7.3-3.4 2.4-3.4 2 0 2.1 1.9 2.1 3.5V20z" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M23 7s-.2-1.7-.9-2.4c-.9-.9-2-1-2.5-1C16.1 3.3 12 3.3 12 3.3s-4.1 0-7.6.3c-.5 0-1.6.1-2.5 1C1.2 5.3 1 7 1 7S.7 9 .7 11v2c0 2 .3 4 .3 4s.2 1.7.9 2.4c.9.9 2.1.9 2.7 1 2 .2 7.4.3 7.4.3s4.1 0 7.6-.3c.5 0 1.6-.1 2.5-1 .7-.7.9-2.4.9-2.4s.3-2 .3-4v-2c0-2-.3-4-.3-4M9.3 15.2V8.8l6.2 3.2z" />
    </svg>
  );
}

export function RadiantFooterSection({ content }: RadiantFooterSectionProps) {
  const mainColumns = [
    content.footer.columns.studio,
    content.footer.columns.services,
  ];
  const supportColumns = [content.footer.columns.legal];
  const utilityItems = [
    {
      key: "map",
      href: `https://maps.google.com/?q=${encodeURIComponent(content.footer.contact.address)}`,
      icon: <MapPinIcon className="size-4 stroke-[1.85]" />,
      label: content.footer.contact.address,
    },
  ];
  const socialItems = [
    {
      key: "linkedin",
      href: radiantSocialLinks.linkedin,
      icon: <SocialGlyph type="linkedin" />,
      label: content.footer.socials.linkedin,
    },
    {
      key: "zalo",
      href: radiantSupportLinks.zalo,
      icon: <SocialGlyph type="zalo" />,
      label: "Zalo",
    },
    {
      key: "facebook",
      href: radiantSocialLinks.facebook,
      icon: <SocialGlyph type="facebook" />,
      label: content.footer.socials.facebook,
    },
    {
      key: "instagram",
      href: radiantSocialLinks.instagram,
      icon: <SocialGlyph type="instagram" />,
      label: content.footer.socials.instagram,
    },
    {
      key: "youtube",
      href: radiantSocialLinks.youtube,
      icon: <SocialGlyph type="youtube" />,
      label: content.footer.socials.youtube,
    },
    {
      key: "tiktok",
      href: radiantSocialLinks.tiktok,
      icon: <SocialGlyph type="tiktok" />,
      label: content.footer.socials.tiktok,
    },
  ];
  const footerActions = [...utilityItems, ...socialItems];

  return (
    <footer
      id="site-footer"
      className="site-gutter relative z-10 overflow-visible bg-[#1b1a18] pb-[calc(env(safe-area-inset-bottom)+5rem)] pt-14 text-white sm:pt-14 lg:pt-20"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/24 via-black/8 to-transparent" />

      <div className="relative mx-auto flex max-w-352 flex-col">
        <div className="flex flex-col items-center text-center">
          <div className="text-primary">
            <RadiantBrandLogo className="h-12 w-auto sm:h-14" />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {footerActions.map((item) => {
              const actionClassName =
                "flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/4 text-white/70 transition-all hover:border-white/20 hover:bg-white/8 hover:text-white sm:size-11";

              if (!item.href) {
                return (
                  <span
                    key={item.key}
                    aria-label={item.label}
                    className={actionClassName}
                    title={item.label}
                  >
                    {item.icon}
                  </span>
                );
              }

              return (
                <a
                  key={item.key}
                  aria-label={item.label}
                  className={actionClassName}
                  href={item.href}
                  rel="noreferrer"
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  title={item.label}
                >
                  {item.icon}
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 md:hidden">
          {mainColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-[1.05rem] font-medium text-white/94">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3.5">
                {column.items.map((item) => (
                  <li key={`${column.title}-${item.label}`}>
                    <a
                      className="text-[1rem] text-white/68 transition-colors hover:text-white"
                      href={item.href}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2">
            {supportColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-[1.05rem] font-medium text-white/94">
                  {column.title}
                </h3>
                <ul className="mt-5 space-y-3.5">
                  {column.items.map((item) => (
                    <li key={`${column.title}-${item.label}`}>
                      <a
                        className="text-[1rem] text-white/68 transition-colors hover:text-white"
                        href={item.href}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="col-span-2">
            <div className="space-y-5">
              <a
                className="flex items-start gap-3 text-white/84 transition-colors hover:text-white"
                href={`tel:${sanitizePhoneNumber(content.footer.contact.phone)}`}
              >
                <PhoneCallIcon className="mt-1 size-4.5 shrink-0 stroke-[1.8]" />
                <span className="text-[1.05rem] leading-7">
                  {content.footer.contact.phone}
                </span>
              </a>

              <a
                className="flex items-start gap-3 text-white/84 transition-colors hover:text-white"
                href={`mailto:${content.footer.contact.email}`}
              >
                <MailIcon className="mt-1 size-4.5 shrink-0 stroke-[1.8]" />
                <span className="text-[1.05rem] leading-7">
                  {content.footer.contact.email}
                </span>
              </a>

              <div className="flex items-start gap-3 text-white/66">
                <MapPinIcon className="mt-1 size-4.5 shrink-0 stroke-[1.8]" />
                <span className="text-[1.05rem] leading-7">
                  {content.footer.contact.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 hidden gap-10 md:grid md:grid-cols-[0.9fr_0.9fr_0.9fr_1.2fr] md:gap-8 lg:mt-16 lg:gap-12">
          {[...mainColumns, ...supportColumns].map((column) => (
            <div key={column.title}>
              <h3 className="text-[1.05rem] font-medium text-white/94">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3.5">
                {column.items.map((item) => (
                  <li key={`${column.title}-${item.label}`}>
                    <a
                      className="text-[1rem] text-white/68 transition-colors hover:text-white"
                      href={item.href}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:pl-4">
            <div className="space-y-5">
              <a
                className="flex items-start gap-3 text-white/84 transition-colors hover:text-white"
                href={`tel:${sanitizePhoneNumber(content.footer.contact.phone)}`}
              >
                <PhoneCallIcon className="mt-1 size-4.5 shrink-0 stroke-[1.8]" />
                <span className="text-[1.05rem] leading-7">
                  {content.footer.contact.phone}
                </span>
              </a>

              <a
                className="flex items-start gap-3 text-white/84 transition-colors hover:text-white"
                href={`mailto:${content.footer.contact.email}`}
              >
                <MailIcon className="mt-1 size-4.5 shrink-0 stroke-[1.8]" />
                <span className="text-[1.05rem] leading-7">
                  {content.footer.contact.email}
                </span>
              </a>

              <div className="flex items-start gap-3 text-white/66">
                <MapPinIcon className="mt-1 size-4.5 shrink-0 stroke-[1.8]" />
                <span className="max-w-88 text-[1.05rem] leading-7">
                  {content.footer.contact.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-4 border-t border-white/10 py-5 text-center text-sm text-white/52">
          {content.footer.copyright}
        </div>

        <div className="pointer-events-none mt-10 overflow-hidden pt-6">
          <div className="flex whitespace-nowrap mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="animate-[radiant-footer-ticker_26s_linear_infinite]">
              {Array.from({ length: footerTickerRepeats }).map((_, index) => (
                <span
                  key={`footer-track-a-${index}`}
                  className="mr-8 inline-flex items-center gap-8 font-heading text-[4.5rem] leading-none text-white/13 sm:text-[6rem] md:mr-10 md:gap-10 md:text-[8.5rem] lg:text-[12rem] xl:text-[15rem]"
                >
                  <span>{content.footer.patternLabel}</span>
                  <span className="text-[0.44em]">✦</span>
                </span>
              ))}
            </div>
            <div
              aria-hidden="true"
              className="animate-[radiant-footer-ticker_26s_linear_infinite] whitespace-nowrap"
            >
              {Array.from({ length: footerTickerRepeats }).map((_, index) => (
                <span
                  key={`footer-track-b-${index}`}
                  className="mr-8 inline-flex items-center gap-8 font-heading text-[4.5rem] leading-none text-white/13 sm:text-[6rem] md:mr-10 md:gap-10 md:text-[8.5rem] lg:text-[12rem] xl:text-[15rem]"
                >
                  <span>{content.footer.patternLabel}</span>
                  <span className="text-[0.44em]">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
