"use client";

import {
  MailIcon,
  MapPinIcon,
  PhoneCallIcon,
} from "lucide-react";

import type { RadiantExperienceContent } from "./radiant-experience.types";
import { RadiantBrandLogo } from "./radiant-experience-shared";
import { radiantSocialLinks } from "./radiant-social-links";

type RadiantFooterSectionProps = {
  content: RadiantExperienceContent;
};

const footerTickerRepeats = 10;

export function RadiantFooterSection({
  content,
}: RadiantFooterSectionProps) {
  const footerColumns = [
    content.footer.columns.studio,
    content.footer.columns.services,
    content.footer.columns.industries,
  ];
  const socialItems = [
    {
      key: "facebook",
      href: radiantSocialLinks.facebook,
      label: content.footer.socials.facebook,
      icon: <span className="text-sm font-medium">f</span>,
    },
    {
      key: "instagram",
      href: radiantSocialLinks.instagram,
      label: content.footer.socials.instagram,
      icon: <span className="text-[0.8rem] font-medium uppercase">ig</span>,
    },
    {
      key: "linkedin",
      href: radiantSocialLinks.linkedin,
      label: content.footer.socials.linkedin,
      icon: <span className="text-[0.78rem] font-semibold lowercase">in</span>,
    },
    {
      key: "x",
      href: radiantSocialLinks.x,
      label: content.footer.socials.x,
      icon: <span className="text-base font-medium tracking-[-0.04em]">X</span>,
    },
    {
      key: "youtube",
      href: radiantSocialLinks.youtube,
      label: content.footer.socials.youtube,
      icon: <span className="text-[0.78rem] font-medium uppercase">yt</span>,
    },
  ].flatMap((item) =>
    item.href ? [{ ...item, href: item.href }] : [],
  );

  return (
    <footer className="site-gutter relative z-10 -mt-[1svh] min-h-svh overflow-hidden bg-[#1b1a18] pb-24 pt-[10svh] text-white sm:pt-[9svh] lg:pt-[8svh]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/24 via-black/8 to-transparent" />

      <div className="relative mx-auto flex min-h-[calc(100svh-7rem)] max-w-[88rem] flex-col">
        <div className="flex flex-col items-center text-center">
          <div className="text-primary">
            <RadiantBrandLogo className="h-[5.65rem] w-auto sm:h-[6.25rem]" />
          </div>

          {socialItems.length > 0 ? (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {socialItems.map((item) => (
                <a
                  key={item.key}
                  aria-label={item.label}
                  className="flex size-11 items-center justify-center rounded-full border border-white/12 bg-white/4 text-white/68 transition-all hover:border-white/20 hover:bg-white/8 hover:text-white"
                  href={item.href}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-14 grid gap-10 pb-[8.5rem] md:grid-cols-[0.9fr_0.9fr_0.9fr_1.2fr] md:gap-8 lg:mt-16 lg:gap-12">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-[1.15rem] font-medium tracking-[-0.03em] text-white/94">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3.5">
                {column.items.map((item) => (
                  <li key={`${column.title}-${item.label}`}>
                    <a
                      className="text-[1.02rem] text-white/68 transition-colors hover:text-white"
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
                href={`tel:${content.footer.contact.phone.replace(/\s+/g, "")}`}
              >
                <PhoneCallIcon className="mt-1 size-[1.125rem] shrink-0 stroke-[1.8]" />
                <span className="text-[1.05rem] leading-7">
                  {content.footer.contact.phone}
                </span>
              </a>

              <a
                className="flex items-start gap-3 text-white/84 transition-colors hover:text-white"
                href={`mailto:${content.footer.contact.email}`}
              >
                <MailIcon className="mt-1 size-[1.125rem] shrink-0 stroke-[1.8]" />
                <span className="text-[1.05rem] leading-7">
                  {content.footer.contact.email}
                </span>
              </a>

              <div className="flex items-start gap-3 text-white/66">
                <MapPinIcon className="mt-1 size-[1.125rem] shrink-0 stroke-[1.8]" />
                <span className="max-w-[22rem] text-[1.05rem] leading-7">
                  {content.footer.contact.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-[-0.8rem] overflow-hidden">
          <div className="flex whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="animate-[radiant-footer-ticker_26s_linear_infinite]">
              {Array.from({ length: footerTickerRepeats }).map((_, index) => (
                <span
                  key={`footer-track-a-${index}`}
                  className="mr-10 inline-flex items-center gap-10 font-heading text-[clamp(5rem,14vw,13rem)] leading-none tracking-[0.02em] text-white/[0.13]"
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
                  className="mr-10 inline-flex items-center gap-10 font-heading text-[clamp(5rem,14vw,13rem)] leading-none tracking-[0.02em] text-white/[0.13]"
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
