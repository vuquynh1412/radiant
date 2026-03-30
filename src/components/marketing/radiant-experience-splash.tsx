import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

const splashStarPath =
  "M756.5 436L767.296 476.098C768.82 481.758 773.242 486.179 778.902 487.703L819 498.5L778.902 509.296C773.242 510.82 768.82 515.241 767.296 520.902L756.5 561L745.704 520.902C744.18 515.241 739.758 510.82 734.098 509.296L694 498.5L734.098 487.703C739.758 486.179 744.18 481.758 745.704 476.098L756.5 436Z";

type OrbitMarker = {
  angle: number;
  className: string;
  glowClassName?: string;
};

const outerOrbitAnimationStyle: CSSProperties = {
  animation: "radiant-loader-orbit-outer 5.4s linear infinite",
  transformOrigin: "center",
  willChange: "transform",
};

const innerOrbitAnimationStyle: CSSProperties = {
  animation: "radiant-loader-orbit-inner 4.1s linear infinite",
  transformOrigin: "center",
  willChange: "transform",
};

const starAnimationStyle: CSSProperties = {
  animation: "radiant-loader-star 2.9s ease-in-out infinite",
  transformOrigin: "center",
  willChange: "transform",
};

const pulseAnimationStyle: CSSProperties = {
  animation: "radiant-loader-pulse 2.4s ease-in-out infinite",
};

function SplashOrbit({
  animationStyle,
  className,
  dotted = false,
  markers = [],
}: {
  animationStyle: CSSProperties;
  className: string;
  dotted?: boolean;
  markers?: OrbitMarker[];
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className={cn(
          "relative origin-center transform-gpu",
          className,
        )}
        style={animationStyle}
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full border border-white/18",
            dotted ? "border-[1.5px] border-dashed border-white/24" : "",
          )}
        />
        {markers.map((marker, index) => (
          <div
            key={`${marker.angle}-${index}`}
            className="absolute inset-0"
            style={{ transform: `rotate(${marker.angle}deg)` }}
          >
            {marker.glowClassName ? (
              <span
                className={cn(
                  "absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[12px]",
                  marker.glowClassName,
                )}
              />
            ) : null}
            <span
              className={cn(
                "absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full",
                marker.className,
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

type RadiantExperienceSplashProps = {
  className?: string;
  isVisible?: boolean;
};

export function RadiantExperienceSplash({
  className,
  isVisible = true,
}: RadiantExperienceSplashProps) {
  return (
    <div
      aria-hidden={!isVisible}
      className={cn(
        "fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-[#111218] transition-opacity duration-500",
        isVisible ? "opacity-100" : "pointer-events-none opacity-0",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(244,236,228,0.14),transparent_38%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(232,221,211,0.12),transparent_20%)]" />
      <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 blur-2xl" />

      <div className="relative flex h-[17rem] w-[17rem] items-center justify-center sm:h-[19.5rem] sm:w-[19.5rem]">
        <SplashOrbit
          animationStyle={outerOrbitAnimationStyle}
          className="h-[14.8rem] w-[14.8rem] sm:h-[17.2rem] sm:w-[17.2rem]"
          dotted
          markers={[
            {
              angle: 26,
              className: "size-3 bg-[#f4ece4]/92 shadow-[0_0_0_1px_rgba(255,255,255,0.26)]",
              glowClassName: "size-10 bg-[#f4ece4]/24",
            },
            {
              angle: 212,
              className: "size-2.5 bg-white/62",
              glowClassName: "size-7 bg-white/18",
            },
          ]}
        />

        <SplashOrbit
          animationStyle={innerOrbitAnimationStyle}
          className="h-[8.6rem] w-[8.6rem] sm:h-[9.8rem] sm:w-[9.8rem]"
          markers={[
            {
              angle: -52,
              className: "size-3 bg-[#f6efe8] shadow-[0_0_0_1px_rgba(255,255,255,0.24)]",
              glowClassName: "size-8 bg-[#f6efe8]/20",
            },
            {
              angle: 142,
              className: "size-2 bg-white/48",
              glowClassName: "size-5 bg-white/12",
            },
          ]}
        />

        <div
          className="absolute h-24 w-24 rounded-full bg-[#f4ece4]/10 blur-3xl"
          style={pulseAnimationStyle}
        />

        <div className="relative z-10 flex flex-col items-center gap-5">
          <svg
            aria-hidden="true"
            className="h-20 w-20 text-[#f6efe8] drop-shadow-[0_0_34px_rgba(244,236,228,0.22)]"
            fill="currentColor"
            style={starAnimationStyle}
            viewBox="694 436 125 125"
          >
            <path d={splashStarPath} />
          </svg>
        </div>
      </div>
    </div>
  );
}
