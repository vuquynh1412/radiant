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
        className="size-4.5"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "instagram") {
    return (
      <svg
        aria-hidden="true"
        className="size-4.5"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          d="M17.5 6.5H17.51M7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7C2 4.23858 4.23858 2 7 2ZM16 11.3701C16.1234 12.2023 15.9812 13.0523 15.5937 13.7991C15.2062 14.5459 14.5931 15.1515 13.8416 15.5297C13.0901 15.908 12.2384 16.0397 11.4077 15.906C10.5771 15.7723 9.80971 15.3801 9.21479 14.7852C8.61987 14.1903 8.22768 13.4229 8.09402 12.5923C7.96035 11.7616 8.09202 10.91 8.47028 10.1584C8.84854 9.40691 9.45414 8.7938 10.2009 8.4063C10.9477 8.0188 11.7977 7.87665 12.63 8.00006C13.4789 8.12594 14.2648 8.52152 14.8716 9.12836C15.4785 9.73521 15.8741 10.5211 16 11.3701Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "tiktok") {
    return (
      <svg
        aria-hidden="true"
        className="size-4.5"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          clipRule="evenodd"
          d="M17.0098 1.00012C17.0092 2.26873 17.4699 3.49411 18.3047 4.44934C19.0047 5.25566 19.9331 5.8295 20.9639 6.09583L21.1709 6.14465L21.4404 6.19543C21.7119 6.239 21.9904 6.26184 22.2744 6.26184V10.0441C20.3862 10.0463 18.5447 9.45405 17.0117 8.35168V16.0382C17.0117 19.8764 13.8886 23.0001 10.0498 23.0001C9.09407 23.0003 8.1485 22.8032 7.27246 22.421C6.39629 22.0387 5.60801 21.4793 4.95801 20.7784L4.74609 20.5402C3.71334 19.3253 3.08789 17.7538 3.08789 16.0382C3.0881 12.2547 6.12148 9.16923 9.88379 9.0802L10.0479 9.07629C10.3617 9.07778 10.6756 9.10065 10.9863 9.14465V13.006C10.6898 12.9129 10.3754 12.8585 10.0479 12.8585C9.20493 12.8595 8.39681 13.1951 7.80078 13.7911C7.20483 14.3872 6.86909 15.1954 6.86816 16.0382C6.86821 16.7032 7.0779 17.352 7.46777 17.8907L7.47168 17.8927C7.76527 18.3022 8.1525 18.6359 8.60059 18.8663C9.04863 19.0967 9.54502 19.2173 10.0488 19.2179C11.7614 19.2179 13.1588 17.8556 13.2227 16.1583L13.2285 1.00012H17.0098Z"
          fillRule="evenodd"
          stroke="currentColor"
        />
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg
        aria-hidden="true"
        className="size-4.5"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 9H2V21H6V9Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="size-4.5"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M2.5005 17C1.80192 13.7033 1.80192 10.2967 2.5005 7C2.59228 6.66521 2.76963 6.36007 3.0151 6.11461C3.26057 5.86914 3.5657 5.69179 3.9005 5.6C9.26394 4.71146 14.737 4.71146 20.1005 5.6C20.4353 5.69179 20.7404 5.86914 20.9859 6.11461C21.2314 6.36007 21.4087 6.66521 21.5005 7C22.1991 10.2967 22.1991 13.7033 21.5005 17C21.4087 17.3348 21.2314 17.6399 20.9859 17.8854C20.7404 18.1309 20.4353 18.3082 20.1005 18.4C14.7371 19.2887 9.26393 19.2887 3.9005 18.4C3.5657 18.3082 3.26057 18.1309 3.0151 17.8854C2.76963 17.6399 2.59228 17.3348 2.5005 17Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0005 15L15.0005 12L10.0005 9V15Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
      className="site-gutter relative z-10 overflow-visible bg-[#1b1a18] pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-14 text-white sm:pt-14 md:h-svh md:overflow-hidden md:pb-[calc(env(safe-area-inset-bottom)+clamp(1rem,2vh,5rem))] md:pt-[60px]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/24 via-black/8 to-transparent" />

      <div className="relative mx-auto flex max-w-352 flex-col md:h-full md:justify-between">
        <div className="flex flex-col items-center text-center">
          <div className="text-primary">
            <RadiantBrandLogo className="h-20 w-auto sm:h-14" />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 md:mt-[clamp(1rem,2.25vh,1.5rem)]">
            {footerActions.map((item) => {
              const actionClassName =
                "flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/4 text-white/70 transition-all duration-100 ease-linear hover:border-white/20 hover:bg-white/8 hover:text-white sm:size-11";

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

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5 md:hidden">
          {mainColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-[1.05rem] font-medium text-white/94">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3.5">
                {column.items.map((item) => (
                  <li key={`${column.title}-${item.label}`}>
                    <a
                      className="text-[1rem] text-white/68 underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-100 ease-linear hover:decoration-current"
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
                        className="text-[1rem] text-white/68 underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-100 ease-linear hover:decoration-current"
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
            <h3 className="text-[1.05rem] font-medium text-white/94">
              {content.footer.contact.title}
            </h3>
            <div className="mt-5 space-y-5">
              <a
                className="flex items-start gap-3 text-white/84 underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-100 ease-linear hover:decoration-current"
                href={`tel:${sanitizePhoneNumber(content.footer.contact.phone)}`}
              >
                <PhoneCallIcon className="mt-1 size-4.5 shrink-0 stroke-[1.8]" />
                <span className="text-[1.05rem] leading-7">
                  {content.footer.contact.phone}
                </span>
              </a>

              <a
                className="flex items-start gap-3 text-white/84 underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-100 ease-linear hover:decoration-current"
                href={`mailto:${content.footer.contact.email}`}
              >
                <MailIcon className="mt-1 size-4.5 shrink-0 stroke-[1.8]" />
                <span className="text-[1.05rem] leading-7">
                  {content.footer.contact.email}
                </span>
              </a>

              <a
                className="flex items-start gap-3 text-white/66 underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-100 ease-linear hover:decoration-current"
                href={`https://maps.google.com/?q=${encodeURIComponent(content.footer.contact.address)}`}
                rel="noreferrer"
                target="_blank"
              >
                <MapPinIcon className="mt-1 size-4.5 shrink-0 stroke-[1.8]" />
                <span className="text-[1.05rem] leading-7">
                  {content.footer.contact.address}
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 hidden gap-10 md:grid md:mt-[clamp(1rem,2.25vh,4rem)] md:grid-cols-[0.9fr_0.9fr_0.9fr_1.2fr] md:gap-8 lg:gap-2">
          {[...mainColumns, ...supportColumns].map((column) => (
            <div key={column.title}>
              <h3 className="text-[1.05rem] font-medium text-white/94">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3.5">
                {column.items.map((item) => (
                  <li key={`${column.title}-${item.label}`}>
                    <a
                      className="text-[1rem] text-white/68 underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-100 ease-linear hover:decoration-current"
                      href={item.href}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="">
            <h3 className="text-[1.05rem] font-medium text-white/94">
              {content.footer.contact.title}
            </h3>
            <div className="mt-5 space-y-5">
              <a
                className="flex items-start gap-3 text-white/84 underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-100 ease-linear hover:decoration-current"
                href={`tel:${sanitizePhoneNumber(content.footer.contact.phone)}`}
              >
                <PhoneCallIcon className="mt-1 size-4.5 shrink-0 stroke-[1.8]" />
                <span className="text-[1.05rem] leading-7">
                  {content.footer.contact.phone}
                </span>
              </a>

              <a
                className="flex items-start gap-3 text-white/84 underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-100 ease-linear hover:decoration-current"
                href={`mailto:${content.footer.contact.email}`}
              >
                <MailIcon className="mt-1 size-4.5 shrink-0 stroke-[1.8]" />
                <span className="text-[1.05rem] leading-7">
                  {content.footer.contact.email}
                </span>
              </a>

              <a
                className="flex items-start gap-3 text-white/66 underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-100 ease-linear hover:decoration-current"
                href={`https://maps.google.com/?q=${encodeURIComponent(content.footer.contact.address)}`}
                rel="noreferrer"
                target="_blank"
              >
                <MapPinIcon className="mt-1 size-4.5 shrink-0 stroke-[1.8]" />
                <span className="text-[1.05rem] leading-7">
                  {content.footer.contact.address}
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-4 border-t border-white/10 py-[clamp(0.5rem,1vh,1.25rem)] text-center text-sm text-white/52">
          {content.footer.copyright}
        </div>

        <div className="pointer-events-none mt-4 overflow-hidden md:mt-0">
          <div className="flex whitespace-nowrap mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="animate-[radiant-footer-ticker_26s_linear_infinite]">
              {Array.from({ length: footerTickerRepeats }).map((_, index) => (
                <span
                  key={`footer-track-a-${index}`}
                  className="mr-8 inline-flex items-center gap-8 font-heading text-[4.5rem] leading-none text-white/13 sm:text-[6rem] md:mr-10 md:gap-10 md:text-[clamp(7rem,20vh,15rem)]"
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
                  className="mr-8 inline-flex items-center gap-8 font-heading text-[4.5rem] leading-none text-white/13 sm:text-[6rem] md:mr-10 md:gap-10 md:text-[clamp(7rem,20vh,15rem)]"
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
