import {
  useId,
  type RefObject,
  type ReactNode,
} from "react";

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
  innerClassName,
  variant,
}: {
  children?: ReactNode;
  className?: string;
  innerClassName?: string;
  variant: VisualVariant;
}) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-black/[0.03] shadow-[0_28px_90px_-42px_rgba(17,12,9,0.35)]",
        className,
      )}
    >
      <div className={cn("absolute inset-0 ambient-pan", innerClassName)}>
        {variant === "vista" ? (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#afc0d0_0%,#93abc0_24%,#768f77_51%,#495e39_100%)]" />
            <div className="absolute inset-x-[10%] bottom-[26%] h-[18%] rounded-[50%] bg-[#5f6774]/80 blur-[52px]" />
            <div className="absolute inset-x-[2%] bottom-[6%] h-[42%] rounded-[45%] bg-[#314225]/70 blur-[20px]" />
            <div className="absolute left-[36%] top-[44%] size-[36%] rounded-full bg-[#cfdbe4]/38 blur-[90px]" />
            <div className="absolute left-[49%] top-[52%] h-[34%] w-[18%] rounded-[50%] bg-[#202814]/26 blur-[38px]" />
          </>
        ) : null}
        {variant === "portrait" ? (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#b8aea8_0%,#8a7f77_35%,#514640_72%,#28211f_100%)]" />
            <div className="absolute right-[-10%] top-[-8%] h-[90%] w-[62%] rounded-full bg-[#d9c5ba]/35 blur-[64px]" />
            <div className="absolute left-[6%] top-[24%] h-[50%] w-[26%] rounded-full bg-[#efe1d4]/30 blur-[34px]" />
            <div className="absolute right-[8%] top-[18%] h-[54%] w-[32%] rounded-full bg-[#241f1c]/62 blur-[10px]" />
          </>
        ) : null}
        {variant === "studio" ? (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#041224_0%,#02101c_35%,#02131d_100%)]" />
            <div className="absolute left-1/2 top-1/2 size-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#34d6ff]/80 blur-[72px]" />
            <div className="absolute left-[18%] top-[20%] h-[54%] w-[16%] rounded-full bg-[#0d2744]/88 blur-[36px]" />
            <div className="absolute right-[14%] top-[24%] h-[46%] w-[18%] rounded-full bg-[#6b112d]/60 blur-[28px]" />
            <div className="absolute bottom-[10%] left-[32%] h-[34%] w-[12%] rounded-full bg-[#05141e]/90 blur-[10px]" />
          </>
        ) : null}
        {variant === "clinic" ? (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#fbfaf6_0%,#eff1f0_36%,#e0e8e9_100%)]" />
            <div className="absolute inset-y-[10%] left-[6%] w-[22%] rounded-[1.75rem] bg-[linear-gradient(180deg,#ffd2c0_0%,rgba(255,210,192,0.08)_100%)] blur-[10px]" />
            <div className="absolute inset-y-[10%] right-[6%] w-[22%] rounded-[1.75rem] bg-[linear-gradient(180deg,#e1ffe8_0%,rgba(225,255,232,0.08)_100%)] blur-[10px]" />
            <div className="absolute inset-x-[23%] inset-y-[22%] rounded-[2rem] border border-white/70 bg-white/32 backdrop-blur-sm" />
          </>
        ) : null}
        {variant === "emerald" ? (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#0d1915_0%,#16302c_40%,#295147_100%)]" />
            <div className="absolute left-[18%] top-[18%] size-[40%] rounded-full bg-[#98f6ce]/28 blur-[72px]" />
            <div className="absolute right-[12%] bottom-[12%] size-[32%] rounded-full bg-[#b4fff6]/20 blur-[60px]" />
            <div className="absolute left-[40%] top-[26%] h-[44%] w-[18%] rounded-full bg-[#03120e]/65 blur-[18px]" />
          </>
        ) : null}
        {variant === "rose" ? (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#f7f0ea_0%,#ede8e3_38%,#d9dce3_100%)]" />
            <div className="absolute left-[8%] top-[14%] h-[64%] w-[30%] rounded-full bg-[#ffd3df]/35 blur-[48px]" />
            <div className="absolute right-[12%] bottom-[14%] h-[52%] w-[32%] rounded-full bg-[#fff3c8]/30 blur-[42px]" />
            <div className="absolute inset-x-[22%] inset-y-[18%] rounded-[1.8rem] border border-white/70 bg-white/35 backdrop-blur-sm" />
          </>
        ) : null}
        {variant === "sand" ? (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#e8ddd1_0%,#d4cabd_34%,#bcae9c_100%)]" />
            <div className="absolute left-[10%] top-[16%] h-[48%] w-[28%] rounded-full bg-[#fff5eb]/45 blur-[48px]" />
            <div className="absolute right-[16%] bottom-[12%] h-[38%] w-[24%] rounded-full bg-[#866c57]/34 blur-[34px]" />
            <div className="absolute inset-x-[18%] bottom-[10%] h-[24%] rounded-[42%] bg-[#8d7866]/36 blur-[24px]" />
          </>
        ) : null}
        {variant === "noir" ? (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#10141a_0%,#131c27_40%,#1c2530_100%)]" />
            <div className="absolute left-[14%] top-[18%] h-[54%] w-[22%] rounded-full bg-[#3ec2ff]/16 blur-[54px]" />
            <div className="absolute right-[10%] top-[14%] h-[42%] w-[26%] rounded-full bg-[#ffc0d6]/15 blur-[46px]" />
            <div className="absolute left-[34%] bottom-[10%] h-[28%] w-[18%] rounded-full bg-[#02060a]/90 blur-[10px]" />
          </>
        ) : null}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_46%),linear-gradient(180deg,transparent_0%,rgba(7,6,6,0.08)_100%)]" />
      <div className="absolute inset-0 surface-grain opacity-55" />
      <div className="relative z-10 size-full">{children}</div>
    </div>
  );
}

export function ServiceTile({
  className,
  variant,
}: {
  className?: string;
  variant: VisualVariant;
}) {
  return (
    <VisualSurface
      className={cn(
        "aspect-[1.24/1] rounded-[2.2rem] border border-white/20",
        className,
      )}
      variant={variant}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-white/8" />
    </VisualSurface>
  );
}

export function ServiceCopy({
  className,
  description,
  eyebrow,
  title,
}: {
  className?: string;
  description: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <p className="text-[0.68rem] font-medium tracking-[0.22em] text-muted-foreground uppercase">
        {eyebrow}
      </p>
      <h3 className="font-heading text-[clamp(2rem,3vw,3.75rem)] leading-none tracking-[-0.05em] text-foreground">
        {title}
      </h3>
      <p className="max-w-lg text-sm leading-7 text-muted-foreground sm:text-[0.98rem]">
        {description}
      </p>
    </div>
  );
}

export function ServiceCard({
  className,
  description,
  eyebrow,
  title,
  variant,
}: {
  className?: string;
  description: string;
  eyebrow: string;
  title: string;
  variant: VisualVariant;
}) {
  return (
    <article className={cn("flex flex-col gap-4", className)}>
      <ServiceTile variant={variant} />
      <ServiceCopy
        description={description}
        eyebrow={eyebrow}
        title={title}
      />
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
      className={cn(
        "relative mx-auto h-[clamp(11.5rem,18vw,15rem)] w-full",
        className,
      )}
    >
      <p className="absolute left-1/2 top-[4%] -translate-x-1/2 font-heading text-[clamp(4rem,8vw,7.4rem)] leading-[0.9] tracking-[-0.065em]">
        {premium}
      </p>
      <div className="absolute inset-x-0 top-[50%] flex items-end justify-center gap-[clamp(0.75rem,1.5vw,1.4rem)]">
        <p className="font-heading text-[clamp(4.2rem,8.7vw,7.95rem)] leading-[0.88] tracking-[-0.075em]">
          {esthetic}
        </p>
        <p className="font-heading text-[clamp(4.35rem,8.9vw,8.2rem)] leading-[0.82] tracking-[-0.085em] italic">
          {dentistry}
        </p>
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
