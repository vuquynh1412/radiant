import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

type PartnerLogo = {
  icon: ReactNode;
  label: string;
};

function PartnerLogoMark({
  className,
  children,
  label,
}: {
  className?: string;
  children: ReactNode;
  label: string;
}) {
  return (
    <div
      aria-label={label}
      className={cn(
        "flex h-16 w-16 items-center justify-center text-[rgba(201,161,93,0.74)] sm:h-[4.5rem] sm:w-[4.5rem] md:h-20 md:w-20",
        className,
      )}
      role="img"
    >
      <svg
        aria-hidden="true"
        className="h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14"
        fill="none"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
      >
        {children}
      </svg>
    </div>
  );
}

const partnerLogos: PartnerLogo[] = [
  {
    label: "Partner Arc",
    icon: (
      <PartnerLogoMark label="Partner Arc">
        <path
          d="M12 32C12 20.954 20.954 12 32 12C43.046 12 52 20.954 52 32C52 43.046 43.046 52 32 52H24C20.6863 52 18 49.3137 18 46V43.2C18 40.549 20.149 38.4 22.8 38.4H32C35.3137 38.4 38 35.7137 38 32.4V31.6C38 28.2863 35.3137 25.6 32 25.6H12V32Z"
          fill="currentColor"
        />
      </PartnerLogoMark>
    ),
  },
  {
    label: "Partner Twin",
    icon: (
      <PartnerLogoMark label="Partner Twin">
        <rect
          fill="currentColor"
          height="18"
          rx="9"
          width="18"
          x="11"
          y="23"
        />
        <rect
          fill="currentColor"
          height="18"
          opacity="0.86"
          rx="9"
          width="18"
          x="35"
          y="23"
        />
        <path
          d="M27 19C27 15.6863 29.6863 13 33 13H35C38.3137 13 41 15.6863 41 19V23H27V19Z"
          fill="currentColor"
          opacity="0.72"
        />
      </PartnerLogoMark>
    ),
  },
  {
    label: "Partner Fold",
    icon: (
      <PartnerLogoMark label="Partner Fold">
        <path
          d="M15 16C15 13.7909 16.7909 12 19 12H29.5C31.7091 12 33.5 13.7909 33.5 16V48C33.5 50.2091 31.7091 52 29.5 52H19C16.7909 52 15 50.2091 15 48V16Z"
          fill="currentColor"
        />
        <path
          d="M30.5 24.7279C30.5 22.456 31.5215 20.3048 33.2822 18.8711L44.8124 9.48253C46.1162 8.42112 48.0426 9.34883 48.0426 11.0299V47.6292C48.0426 49.281 46.1769 50.2178 44.8646 49.2135L33.3344 40.392C31.5416 39.0203 30.5 36.89 30.5 34.6327V24.7279Z"
          fill="currentColor"
          opacity="0.8"
        />
      </PartnerLogoMark>
    ),
  },
  {
    label: "Partner Loop",
    icon: (
      <PartnerLogoMark label="Partner Loop">
        <path
          d="M21 16C26.5228 16 31 20.4772 31 26V32H21C15.4772 32 11 27.5228 11 22C11 18.6863 13.6863 16 17 16H21Z"
          fill="currentColor"
        />
        <path
          d="M43 48C37.4772 48 33 43.5228 33 38V32H43C48.5228 32 53 36.4772 53 42C53 45.3137 50.3137 48 47 48H43Z"
          fill="currentColor"
        />
        <circle cx="32" cy="32" fill="currentColor" opacity="0.72" r="8" />
      </PartnerLogoMark>
    ),
  },
  {
    label: "Partner Halo",
    icon: (
      <PartnerLogoMark label="Partner Halo">
        <path
          d="M32 11C20.402 11 11 20.402 11 32C11 43.598 20.402 53 32 53C43.598 53 53 43.598 53 32C53 26.527 48.523 22 43 22H36C33.7909 22 32 23.7909 32 26V38C32 40.2091 30.2091 42 28 42H24C20.134 42 17 38.866 17 35V32C17 23.7157 23.7157 17 32 17C40.2843 17 47 23.7157 47 32C47 40.2843 40.2843 47 32 47"
          fill="currentColor"
        />
      </PartnerLogoMark>
    ),
  },
  {
    label: "Partner Grid",
    icon: (
      <PartnerLogoMark label="Partner Grid">
        <rect
          fill="currentColor"
          height="15"
          rx="5"
          width="15"
          x="12"
          y="12"
        />
        <rect
          fill="currentColor"
          height="15"
          opacity="0.84"
          rx="5"
          width="15"
          x="37"
          y="12"
        />
        <rect
          fill="currentColor"
          height="15"
          opacity="0.78"
          rx="5"
          width="15"
          x="12"
          y="37"
        />
        <path
          d="M37 42C37 39.2386 39.2386 37 42 37H47C49.7614 37 52 39.2386 52 42V47C52 49.7614 49.7614 52 47 52H42C39.2386 52 37 49.7614 37 47V42Z"
          fill="currentColor"
        />
      </PartnerLogoMark>
    ),
  },
  {
    label: "Partner Beam",
    icon: (
      <PartnerLogoMark label="Partner Beam">
        <path
          d="M14 46L22.3475 16.7837C22.9625 14.6314 24.9297 13.1484 27.1682 13.1484H36.8318C39.0703 13.1484 41.0375 14.6314 41.6525 16.7837L50 46H39.5784L37.2716 37.6H26.7284L24.4216 46H14Z"
          fill="currentColor"
        />
        <rect
          fill="#171614"
          height="5.6"
          rx="2.8"
          width="13.6"
          x="25.2"
          y="28.8"
        />
      </PartnerLogoMark>
    ),
  },
  {
    label: "Partner Prism",
    icon: (
      <PartnerLogoMark label="Partner Prism">
        <path
          d="M14 32L28 14C30.2091 11.1595 33.7909 11.1595 36 14L50 32L36 50C33.7909 52.8405 30.2091 52.8405 28 50L14 32Z"
          fill="currentColor"
        />
        <path
          d="M24 32L32 21L40 32L32 43L24 32Z"
          fill="#171614"
          opacity="0.9"
        />
      </PartnerLogoMark>
    ),
  },
  {
    label: "Partner Orbit",
    icon: (
      <PartnerLogoMark label="Partner Orbit">
        <circle cx="32" cy="32" fill="currentColor" r="7" />
        <path
          d="M14 29.5C14 22.0442 22.0589 16 32 16C41.9411 16 50 22.0442 50 29.5C50 36.9558 41.9411 43 32 43C22.0589 43 14 49.0442 14 56.5"
          fill="currentColor"
          opacity="0.82"
        />
      </PartnerLogoMark>
    ),
  },
  {
    label: "Partner Pulse",
    icon: (
      <PartnerLogoMark label="Partner Pulse">
        <path
          d="M12 35C12 23.402 21.402 14 33 14H34C45.598 14 55 23.402 55 35V46C55 49.3137 52.3137 52 49 52H45C41.6863 52 39 49.3137 39 46V38C39 34.6863 36.3137 32 33 32H31C27.6863 32 25 34.6863 25 38V46C25 49.3137 22.3137 52 19 52H18C14.6863 52 12 49.3137 12 46V35Z"
          fill="currentColor"
        />
      </PartnerLogoMark>
    ),
  },
];

function LogoMarqueeGroup() {
  return (
    <div className="partner-logos-group">
      {partnerLogos.map((logo) => (
        <div
          key={logo.label}
          className="flex min-w-[5rem] items-center justify-center sm:min-w-[5.5rem] md:min-w-[6rem]"
        >
          {logo.icon}
        </div>
      ))}
    </div>
  );
}

export function RadiantPartnerLogosSection() {
  const sectionStyle = {
    "--partner-logos-bg": "#171614",
    "--partner-logos-fade-width": "clamp(2.25rem, 7vw, 7rem)",
    "--partner-logos-gap": "clamp(1.5rem, 3vw, 3rem)",
    "--partner-logos-safe-block": "clamp(2.2rem, 4vw, 3rem)",
    "--partner-logos-speed": "28s",
  } as CSSProperties;

  return (
    <section
      aria-label="Partner logos"
      className="relative overflow-hidden bg-(--partner-logos-bg) py-0"
      style={sectionStyle}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-18 bg-[linear-gradient(180deg,#171614_0%,rgba(23,22,20,0.94)_38%,rgba(23,22,20,0)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-18 bg-[linear-gradient(0deg,#171614_0%,rgba(23,22,20,0.94)_38%,rgba(23,22,20,0)_100%)]"
      />
      <div className="site-gutter flex min-h-[11.5rem] items-center py-[var(--partner-logos-safe-block)] md:min-h-[12.5rem] lg:min-h-[13rem]">
        <div className="relative w-full overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-(--partner-logos-fade-width) bg-[linear-gradient(90deg,var(--partner-logos-bg)_12%,rgba(23,22,20,0)_100%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-(--partner-logos-fade-width) bg-[linear-gradient(270deg,var(--partner-logos-bg)_12%,rgba(23,22,20,0)_100%)]"
          />

          <div className="partner-logos-track">
            <LogoMarqueeGroup />
            <LogoMarqueeGroup />
          </div>
        </div>
      </div>
    </section>
  );
}
