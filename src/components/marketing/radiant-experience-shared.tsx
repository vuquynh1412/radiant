"use client";
import { ArrowRightIcon } from "lucide-react";
import { useId, type RefObject, type ReactNode } from "react";

import type { ShowcaseImage } from "@/content/showcase-images";
import { showcaseVariantImages } from "@/content/showcase-images";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const serviceVisuals = [
  "vista",
  "portrait",
  "studio",
  "clinic",
  "emerald",
  "rose",
  "sand",
  "noir",
] as const;

export type VisualVariant = (typeof serviceVisuals)[number];
const serviceOverlayPreviewLimit = 4;

export function getOverlayHighlights(highlights: string[], otherLabel: string) {
  if (highlights.length <= serviceOverlayPreviewLimit) {
    return highlights;
  }

  return [
    ...highlights.slice(0, serviceOverlayPreviewLimit - 1),
    otherLabel,
  ];
}

export function ServiceHoverOverlay({
  highlights,
  linkHref = "#contact",
  otherLabel = "Other",
  title,
  viewMoreLabel = "Learn more",
}: {
  highlights?: string[];
  linkHref?: string;
  otherLabel?: string;
  title: string;
  viewMoreLabel?: string;
}) {
  const overlayHighlights = highlights?.length
    ? getOverlayHighlights(highlights, otherLabel)
    : [];

  if (!overlayHighlights.length) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,16,23,0.04)_0%,rgba(14,16,23,0.16)_28%,rgba(14,16,23,0.52)_62%,rgba(14,16,23,0.88)_100%)] opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/service:opacity-100" />
      <div className="absolute inset-0 bg-black/8 opacity-0 backdrop-blur-[1.5px] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/service:opacity-100 group-hover/service:backdrop-blur-[3px]" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-4 sm:p-5">
        <ul className="space-y-1.5">
          {overlayHighlights.map((item, index) => (
            <li
              key={`${title}-${item}`}
              className="flex items-center gap-2 text-sm font-medium tracking-[0.01em] text-white/92 opacity-0 translate-y-3 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/service:translate-y-0 group-hover/service:opacity-100"
              style={{ transitionDelay: `${110 + index * 45}ms` }}
            >
              <span className="size-1.5 shrink-0 rounded-full bg-[#F7EFE4]/90" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <a
          className={buttonVariants({
            className:
              "pointer-events-auto w-fit rounded-full border-white/20 bg-white/10 px-3.5 text-sm text-white shadow-none backdrop-blur-sm opacity-0 translate-y-3 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/service:translate-y-0 group-hover/service:opacity-100 hover:border-white/34 hover:bg-white/16 hover:text-white",
            size: "sm",
            variant: "outline",
          })}
          href={linkHref}
          style={{
            transitionDelay: `${110 + overlayHighlights.length * 45}ms`,
          }}
        >
          <span>{viewMoreLabel}</span>
          <ArrowRightIcon className="size-3.5" />
        </a>
      </div>
    </div>
  );
}

function StaticImageBackground({
  image,
}: {
  image: ShowcaseImage;
}) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url("${image.src}"), url("${image.fallbackSrc}")`,
        backgroundPosition: `${image.position ?? "50% 50%"}, ${image.position ?? "50% 50%"}`,
      }}
    />
  );
}

export function BrandMonogram({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const id = useId();
  const leftClipId = `${id}-left`;
  const rightClipId = `${id}-right`;
  const fontSize = compact ? 480 : 660;
  const strokeWidth = compact ? 12 : 8;

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 560 760"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={leftClipId}>
          <rect height="760" width="280" x="0" y="0" />
        </clipPath>
        <clipPath id={rightClipId}>
          <rect height="760" width="280" x="280" y="0" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${leftClipId})`}>
        <text
          dominantBaseline="middle"
          fill="currentColor"
          fontFamily="var(--font-heading)"
          fontSize={fontSize}
          fontWeight="500"
          opacity={compact ? 1 : 0.78}
          textAnchor="middle"
          x="50%"
          y="55%"
        >
          R
        </text>
      </g>
      <g clipPath={`url(#${rightClipId})`}>
        <text
          dominantBaseline="middle"
          fill="none"
          fontFamily="var(--font-heading)"
          fontSize={fontSize}
          fontWeight="500"
          opacity={compact ? 0.95 : 0.4}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          textAnchor="middle"
          x="50%"
          y="55%"
        >
          R
        </text>
      </g>
    </svg>
  );
}

export function SectionAccent({
  className,
  label,
  tone = "dark",
}: {
  className?: string;
  label?: string;
  tone?: "dark" | "gold" | "light";
}) {
  const starClassName =
    tone === "light"
      ? "text-[#C9A15D]"
      : tone === "gold"
        ? "text-[#B88547]"
        : "text-[rgba(140,87,37,0.78)]";
  const labelClassName =
    tone === "light"
      ? "text-[rgba(214,188,144,0.86)]"
      : tone === "gold"
        ? "text-[rgba(151,102,48,0.82)]"
        : "text-[rgba(120,86,44,0.62)]";
  const lineClassName =
    tone === "light"
      ? "bg-[rgba(201,161,93,0.34)]"
      : tone === "gold"
        ? "bg-[rgba(184,133,71,0.38)]"
        : "bg-[rgba(120,86,44,0.24)]";

  return (
    <div className={cn("flex flex-col items-center gap-2.5", className)}>
      <span className={cn("inline-block text-[0.98rem] sm:text-[1.06rem]", starClassName)}>
        ✦
      </span>
      <div className="flex items-center justify-center gap-3">
        <span className={cn("h-px w-12 sm:w-16", lineClassName)} />
        {label ? (
          <p className={cn("text-[0.68rem] font-medium uppercase tracking-[0.32em] sm:text-[0.74rem]", labelClassName)}>
            {label}
          </p>
        ) : null}
        <span className={cn("h-px w-12 sm:w-16", lineClassName)} />
      </div>
    </div>
  );
}

export function ViewAllButton({
  className,
  label,
  onClick,
  tone = "dark",
}: {
  className?: string;
  label: string;
  onClick?: () => void;
  tone?: "dark" | "light";
}) {
  const borderClassName =
    tone === "light"
      ? "border-white/44"
      : "border-[rgba(39,39,42,0.28)]";
  const textClassName = tone === "light" ? "text-white" : "text-[#27272A]";
  const fillClassName =
    tone === "light"
      ? "bg-white"
      : "bg-[#27272A]";
  const hoverTextClassName =
    tone === "light"
      ? "group-hover:text-[#171614]"
      : "group-hover:text-[#F7EFE4]";
  const ringClassName =
    tone === "light"
      ? "focus-visible:ring-white/30"
      : "focus-visible:ring-ring/40";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center gap-4 overflow-hidden rounded-full border bg-transparent px-6 py-3.5 text-left transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 md:gap-5 md:px-7 md:py-4",
        borderClassName,
        textClassName,
        ringClassName,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 translate-y-full rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover:translate-y-0",
          fillClassName,
        )}
      />
      <span
        className={cn(
          "relative z-10 whitespace-nowrap text-[1.02rem] font-semibold tracking-[-0.02em] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:text-[1.08rem]",
          hoverTextClassName,
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "relative z-10 flex shrink-0 items-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover:translate-x-1",
          hoverTextClassName,
        )}
      >
        <ArrowRightIcon className="size-5 md:size-6" strokeWidth={2.15} />
      </span>
    </button>
  );
}

export function RadiantBrandLogo({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 563 474"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M465.04 32.94C437.2 7.95 391.77 0 338.94 0H281.01V20.12L283.91 164.71C284.66 202.1 309.41 232.67 345.19 233.7C345.19 233.7 356.58 233.77 360.38 233.72C363.95 233.67 371.18 233.42 374.67 233.23C392.06 232.28 421.78 228.05 441.83 214.71C475.19 192.51 495.1 151.73 495.1 111.9C495.1 75.55 484.34 49.99 465.04 32.94ZM359.26 213.2C342.02 220.21 327.84 210.52 327.84 191.91V21.59C327.84 17.8 330.94 14.77 334.73 14.77C358.55 14.79 374.73 24.44 385.51 40.33C397.43 58.51 401.7 83.22 401.7 111.62C401.7 179.05 380.1 204.72 359.25 213.2H359.26Z"
        fill="currentColor"
      />
      <path
        d="M210 0V0.85C211.74 0.85 224.61 3.67 230.97 27.24C232.94 34.54 234.21 43.84 234.21 55.66V129.48C234.21 148.56 234.17 173.45 234.17 192.53C234.17 203.08 228.75 211.67 221.92 213.65C210.87 216.84 196.8 204.94 188.66 180.52C174.07 136.75 161.08 99.81 145.97 56.21C135.18 23.29 126.09 0 75.54 0H0V1.14C4.54 1.14 32.45 15.26 54.81 74.7C61.12 91.47 80.72 141.53 80.72 141.53C80.72 141.53 90.75 168.75 99.98 182.71C111.36 199.93 120.49 207.89 136.67 218.19C145.53 223.83 164.71 230.62 178.19 231.89C187.9 232.8 197.85 233.58 217.15 233.58C250.56 233.58 277.29 204.27 278.11 164.71L281.01 20.12V0H210.01H210Z"
        fill="currentColor"
      />
      <path
        d="M96.9702 440.2C124.81 465.19 170.24 473.14 223.07 473.14H281V453.02L278.1 308.43C277.35 271.04 252.6 240.47 216.82 239.44C216.82 239.44 205.43 239.37 201.63 239.42C198.06 239.47 190.83 239.72 187.34 239.91C169.95 240.86 140.23 245.09 120.18 258.43C86.8202 280.63 66.9102 321.41 66.9102 361.24C66.9102 397.59 77.6702 423.15 96.9702 440.2ZM202.75 259.94C219.99 252.93 234.17 262.62 234.17 281.23V451.55C234.17 455.34 231.07 458.37 227.28 458.37C203.46 458.35 187.28 448.7 176.5 432.81C164.58 414.63 160.31 389.92 160.31 361.52C160.31 294.09 181.91 268.42 202.76 259.94H202.75Z"
        fill="currentColor"
      />
      <path
        d="M352.01 473.14V472.29C350.27 472.29 337.4 469.47 331.04 445.9C329.07 438.6 327.8 429.3 327.8 417.48V343.66C327.8 324.58 327.84 299.69 327.84 280.61C327.84 270.06 333.26 261.47 340.09 259.49C351.14 256.3 365.21 268.2 373.35 292.62C387.94 336.39 400.93 373.33 416.04 416.93C426.83 449.87 435.92 473.16 486.47 473.16H562.01V472.02C557.47 472.02 529.56 457.9 507.2 398.46C500.89 381.69 481.29 331.63 481.29 331.63C481.29 331.63 471.26 304.41 462.03 290.45C450.65 273.23 441.52 265.27 425.34 254.97C416.48 249.33 397.3 242.54 383.82 241.27C374.11 240.36 364.16 239.58 344.86 239.58C311.45 239.58 284.72 268.89 283.9 308.45L281 453.04V473.16H352L352.01 473.14Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function RadiantHeroLogo({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 634 535"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.18">
        <path
          d="M236.115 1.5V2.4557C238.071 2.4557 252.541 5.62638 259.692 32.1274C261.907 40.3352 263.335 50.7917 263.335 64.0816V147.082C263.335 168.534 263.29 196.519 263.29 217.972C263.29 229.834 257.196 239.492 249.517 241.719C237.093 245.305 221.273 231.925 212.121 204.469C195.717 155.256 181.111 113.722 164.122 64.7C151.99 27.6862 141.77 1.5 84.9338 1.5H0V2.78177C5.10457 2.78177 36.4853 18.6577 61.6259 85.4893C68.7206 104.345 90.758 160.63 90.758 160.63C90.758 160.63 102.035 191.235 112.413 206.931C125.208 226.292 135.474 235.242 153.666 246.823C163.627 253.164 185.193 260.799 200.349 262.227C211.266 263.25 222.454 264.127 244.154 264.127C281.718 264.127 311.772 231.172 312.694 186.693L315.955 24.122V1.5H236.126H236.115Z"
          fill="currentColor"
        />
        <path
          d="M109.029 496.441C140.331 524.539 191.41 533.477 250.81 533.477H315.944V510.855L312.683 348.285C311.84 306.245 284.012 271.874 243.783 270.716C243.783 270.716 230.976 270.637 226.704 270.693C222.69 270.749 214.561 271.03 210.637 271.244C191.084 272.312 157.668 277.068 135.125 292.067C97.6166 317.028 75.2307 362.879 75.2307 407.662C75.2307 448.532 87.3287 477.271 109.029 496.441ZM227.963 293.765C247.347 285.883 263.29 296.778 263.29 317.702V509.203C263.29 513.464 259.805 516.871 255.544 516.871C228.761 516.848 210.569 505.998 198.449 488.132C185.046 467.691 180.245 439.909 180.245 407.977C180.245 332.162 204.532 303.299 227.974 293.765H227.963Z"
          fill="currentColor"
        />
      </g>
      <g opacity="0.18">
        <path
          d="M522.9 38.5363C491.594 10.4386 440.507 1.5 381.099 1.5H315.956V24.122L319.217 186.693C320.06 228.732 347.892 263.104 388.127 264.262C388.127 264.262 400.935 264.341 405.209 264.284C409.223 264.228 417.353 263.947 421.278 263.733C440.833 262.665 474.254 257.909 496.8 242.91C534.314 217.95 556.703 172.098 556.703 127.315C556.703 86.445 544.603 57.7065 522.9 38.5363ZM403.949 241.213C384.562 249.094 368.617 238.199 368.617 217.275V25.7748C368.617 21.5135 372.103 18.1067 376.365 18.1067C403.151 18.1292 421.345 28.9792 433.468 46.8453C446.872 67.286 451.674 95.0689 451.674 127.001C451.674 202.816 427.384 231.678 403.938 241.213H403.949Z"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          d="M395.796 533.478V532.522C393.84 532.522 379.367 529.351 372.215 502.85C370 494.642 368.572 484.186 368.572 470.896V387.896C368.572 366.443 368.617 338.458 368.617 317.005C368.617 305.143 374.712 295.485 382.392 293.259C394.818 289.672 410.64 303.052 419.793 330.509C436.2 379.722 450.808 421.256 467.799 470.278C479.933 507.314 490.154 533.5 546.999 533.5H631.944V532.218C626.839 532.218 595.454 516.342 570.31 449.511C563.214 430.655 541.174 374.37 541.174 374.37C541.174 374.37 529.895 343.765 519.515 328.069C506.718 308.708 496.452 299.758 478.257 288.177C468.294 281.836 446.726 274.201 431.567 272.773C420.648 271.75 409.459 270.873 387.756 270.873C350.186 270.873 320.128 303.828 319.206 348.307L315.944 510.878V533.5H395.785L395.796 533.478Z"
          stroke="currentColor"
          strokeWidth="3"
        />
      </g>
    </svg>
  );
}

export function VisualSurface({
  children,
  className,
  image,
  innerClassName,
  variant,
}: {
  children?: ReactNode;
  className?: string;
  image?: ShowcaseImage;
  innerClassName?: string;
  variant?: VisualVariant;
}) {
  const resolvedImage =
    image ?? (variant ? showcaseVariantImages[variant] : undefined);

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-transparent shadow-[0_28px_90px_-42px_rgba(17,12,9,0.35)]",
        className,
      )}
    >
      {resolvedImage ? (
        <div className={cn("absolute inset-0 bg-transparent", innerClassName)}>
          <StaticImageBackground image={resolvedImage} />
        </div>
      ) : null}
      <div className="relative z-10 size-full">{children}</div>
    </div>
  );
}

export function ServiceTile({
  children,
  className,
  image,
  innerClassName,
  variant,
}: {
  children?: ReactNode;
  className?: string;
  image?: ShowcaseImage;
  innerClassName?: string;
  variant?: VisualVariant;
}) {
  return (
    <VisualSurface
      className={cn(
        "aspect-video rounded-[2.2rem] border border-white/20",
        className,
      )}
      innerClassName={innerClassName}
      image={image}
      variant={variant}
    >
      {children}
    </VisualSurface>
  );
}

export function ServiceCopy({
  centered = false,
  className,
  description,
  eyebrow,
  hideDescription = false,
  hideEyebrow = false,
  title,
}: {
  centered?: boolean;
  className?: string;
  description: string;
  eyebrow: string;
  hideDescription?: boolean;
  hideEyebrow?: boolean;
  title: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        centered && "items-center text-center",
        className,
      )}
    >
      {hideEyebrow ? null : (
        <p className="text-base font-medium text-muted-foreground uppercase">
          {eyebrow}
        </p>
      )}
      <h3 className="font-heading text-[clamp(2rem,3vw,3.75rem)] leading-none text-foreground">
        {title}
      </h3>
      {hideDescription ? null : (
        <p
          className={cn(
            "max-w-lg text-base leading-7 text-muted-foreground sm:text-base",
            centered && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function ServiceCard({
  className,
  description,
  eyebrow,
  highlights,
  hideDescription = false,
  hideEyebrow = false,
  image,
  interactive = false,
  linkHref = "#contact",
  otherLabel = "Other",
  tileClassName,
  titleClassName,
  title,
  variant,
  viewMoreLabel = "Learn more",
}: {
  className?: string;
  description: string;
  eyebrow: string;
  highlights?: string[];
  hideDescription?: boolean;
  hideEyebrow?: boolean;
  image?: ShowcaseImage;
  interactive?: boolean;
  linkHref?: string;
  otherLabel?: string;
  tileClassName?: string;
  titleClassName?: string;
  title: string;
  variant?: VisualVariant;
  viewMoreLabel?: string;
}) {
  return (
    <article
      className={cn(
        "group/service flex flex-col gap-3",
        className,
      )}
    >
      <ServiceTile
        className={tileClassName}
        image={image}
        innerClassName={cn(
          interactive &&
            "md:transition-transform md:duration-700 md:ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover/service:scale-[1.04]",
        )}
        variant={variant}
      >
        {interactive ? (
          <ServiceHoverOverlay
            highlights={highlights}
            linkHref={linkHref}
            otherLabel={otherLabel}
            title={title}
            viewMoreLabel={viewMoreLabel}
          />
        ) : null}
      </ServiceTile>
      <div className="flex flex-col gap-2">
        <h3
          className={cn(
            "font-inika text-[1.5rem] font-bold leading-[1.08] text-[#27272A] text-center",
            titleClassName,
          )}
        >
          {title}
        </h3>
        {hideEyebrow ? null : (
          <p className="text-base font-medium text-muted-foreground uppercase">
            {eyebrow}
          </p>
        )}
        {hideDescription ? null : (
          <p className="max-w-lg text-base leading-7 text-muted-foreground sm:text-base">
            {description}
          </p>
        )}
      </div>
    </article>
  );
}

export function HeroTitleCopy({
  className,
  dentistry,
  esthetic,
  premium,
}: {
  className?: string;
  dentistry: string;
  esthetic: string;
  premium: string;
}) {
  return (
    <div
      className={cn("relative mx-auto h-36 w-full md:h-48 lg:h-74", className)}
    >
      <p className="hero-title-display absolute left-1/2 top-[4%] -translate-x-1/2 whitespace-nowrap">
        {premium}
      </p>
      <div className="absolute inset-x-0 top-[48%] flex items-end justify-center gap-2 md:gap-3 lg:gap-5">
        <p className="hero-title-display">{esthetic}</p>
        <p className="hero-title-display italic">{dentistry}</p>
      </div>
    </div>
  );
}

export function CharacterRevealText({
  charRefs,
  className,
  text,
}: {
  charRefs: RefObject<Array<HTMLSpanElement | null>>;
  className?: string;
  text: string;
}) {
  return (
    <p className={cn("whitespace-pre-wrap", className)}>
      {Array.from(text).map((character, index) => (
        <span
          key={`${character}-${index}`}
          ref={(node) => {
            charRefs.current[index] = node;
          }}
          className="about-char"
        >
          {character}
        </span>
      ))}
    </p>
  );
}
