"use client";

import { useRef, type RefObject } from "react";
import { ArrowUpRightIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { useRadiantCtaMotion } from "@/hooks/use-radiant-cta-motion";
import { cn } from "@/lib/utils";

import { SectionAccent } from "./radiant-experience-shared";
import type { RadiantExperienceContent } from "./radiant-experience.types";

type RadiantCallToActionSectionProps = {
  content: RadiantExperienceContent;
};

const ctaStarPath =
  "M756.5 436L767.296 476.098C768.82 481.758 773.242 486.179 778.902 487.703L819 498.5L778.902 509.296C773.242 510.82 768.82 515.241 767.296 520.902L756.5 561L745.704 520.902C744.18 515.241 739.758 510.82 734.098 509.296L694 498.5L734.098 487.703C739.758 486.179 744.18 481.758 745.704 476.098L756.5 436Z";
const ctaStarMaskId = "radiant-cta-star-mask";

type CallToActionBodyProps = {
  accentClassName?: string;
  accentRef?: RefObject<HTMLDivElement | null>;
  actionsClassName?: string;
  actionsRef?: RefObject<HTMLDivElement | null>;
  bodyClassName?: string;
  bodyRef?: RefObject<HTMLParagraphElement | null>;
  containerClassName?: string;
  content: RadiantExperienceContent;
  eyebrowClassName?: string;
  eyebrowRef?: RefObject<HTMLParagraphElement | null>;
  hideBody?: boolean;
  titleClassName?: string;
  titleRef?: RefObject<HTMLHeadingElement | null>;
};

function CallToActionBody({
  accentClassName,
  accentRef,
  actionsClassName,
  actionsRef,
  bodyClassName,
  bodyRef,
  containerClassName,
  content,
  eyebrowClassName,
  eyebrowRef,
  hideBody = false,
  titleClassName,
  titleRef,
}: CallToActionBodyProps) {
  const titleLines = content.cta.title
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className={cn("w-full", containerClassName)}>
      <div ref={accentRef} className={accentClassName}>
        <SectionAccent
          className="mb-4"
          label={content.cta.eyebrow}
          tone="gold"
        />
      </div>
      <p
        ref={eyebrowRef}
        className={cn(
          "sr-only text-base font-medium text-[#27272A] uppercase",
          eyebrowClassName,
        )}
      >
        {content.cta.eyebrow}
      </p>
      <h2
        ref={titleRef}
        className={cn(
          "title-display-inika mx-auto flex w-full flex-col items-center text-center text-[clamp(2rem,8.2vw,4.5rem)] leading-[0.92] tracking-[-0.02em] text-[#27272A] sm:text-[clamp(2.5rem,6vw,4.5rem)]",
          titleClassName,
        )}
      >
        {titleLines.map((line, index) => (
          <span key={`${line}-${index}`} className="block whitespace-nowrap">
            {line}
          </span>
        ))}
      </h2>
      {hideBody ? null : (
        <p
          ref={bodyRef}
          className={cn(
            "mx-auto mt-5 max-w-2xl text-[1rem] leading-7 text-[#27272A] sm:text-[1.08rem]",
            bodyClassName,
          )}
        >
          {content.cta.body}
        </p>
      )}

      <div
        ref={actionsRef}
        className={cn(
          "mt-8 flex flex-col items-center gap-4",
          actionsClassName,
        )}
      >
        <a
          className={cn(
            buttonVariants({
              className:
                "group relative overflow-hidden border-[#171614]/16 bg-[#171614] text-white shadow-[0_24px_56px_-36px_rgba(0,0,0,0.28)] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-secondary/40 hover:bg-[#171614] focus-visible:ring-secondary/30",
              size: "marketing",
              variant: "default",
            }),
          )}
          href="mailto:hello@radiant.com?subject=Radiant%20strategy%20call"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 translate-y-full rounded-full bg-secondary transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover:translate-y-0"
          />
          <span className="relative z-10 inline-flex items-center justify-center gap-2">
            <span className="whitespace-nowrap transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-[#1C1107]">
              {content.cta.buttonLabel}
            </span>
            <ArrowUpRightIcon
              data-icon="inline-end"
              className="transition-[color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:text-[#1C1107]"
            />
          </span>
        </a>
      </div>
    </div>
  );
}

function ReducedMotionCallToAction({
  content,
}: {
  content: RadiantExperienceContent;
}) {
  return (
    <div className="site-gutter hidden bg-[#171614] py-16 text-white motion-reduce:block sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.6rem] border border-white/10 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0.07),transparent_36%),linear-gradient(180deg,#1b1a18_0%,#111111_100%)] p-3 shadow-[0_36px_120px_-56px_rgba(0,0,0,0.75)]">
        <div className="pointer-events-none absolute left-1/2 -top-40 h-96 w-[24rem] -translate-x-1/2 rounded-full border border-white/10 opacity-40" />
        <div className="pointer-events-none absolute left-1/2 -top-12 h-40 w-40 -translate-x-1/2 rounded-full border border-white/14 opacity-60" />

        <div className="relative rounded-[2rem] bg-[#E8DDD3] px-6 py-14 text-center sm:px-10 sm:py-16 lg:px-14">
          <CallToActionBody
            accentClassName="opacity-100"
            bodyClassName="opacity-100"
            containerClassName="mx-auto"
            content={content}
            eyebrowClassName="opacity-100"
            hideBody
            titleClassName="opacity-100"
          />
        </div>
      </div>
    </div>
  );
}

export function RadiantCallToActionSection({
  content,
}: RadiantCallToActionSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const maskedRevealRef = useRef<SVGSVGElement | null>(null);
  const fullPanelRef = useRef<HTMLDivElement | null>(null);
  const starMaskTranslateRef = useRef<SVGGElement | null>(null);
  const starMaskTransformRef = useRef<SVGGElement | null>(null);
  const accentRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const bodyRef = useRef<HTMLParagraphElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);

  useRadiantCtaMotion({
    refs: {
      accentRef,
      actionsRef,
      bodyRef,
      eyebrowRef,
      fullPanelRef,
      maskedRevealRef,
      sectionRef,
      starMaskTransformRef,
      starMaskTranslateRef,
      surfaceRef,
      titleRef,
    },
  });

  return (
    <section id="contact" className="relative z-20">
      <div
        ref={sectionRef}
        className="relative h-[212svh] bg-[#171614] motion-reduce:hidden md:h-[224svh]"
      >
        <div
          ref={stageRef}
          className="sticky top-0 h-svh overflow-hidden bg-[#171614]"
        >
          <div
            ref={surfaceRef}
            className="absolute inset-0 z-20 overflow-hidden will-change-transform"
          >
            <div
              ref={fullPanelRef}
              className="absolute inset-0 z-0 bg-[#E8DDD3] opacity-0 will-change-transform"
            />

            <svg
              ref={maskedRevealRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 size-full filter-[drop-shadow(0_0_26px_rgba(232,221,211,0.08))]"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
              viewBox="0 0 1512 996"
            >
              <defs>
                <mask
                  id={ctaStarMaskId}
                  maskContentUnits="userSpaceOnUse"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="1512"
                  height="996"
                >
                  <rect width="1512" height="996" fill="black" />
                  <g ref={starMaskTranslateRef}>
                    <g ref={starMaskTransformRef}>
                      <path d={ctaStarPath} fill="white" />
                    </g>
                  </g>
                </mask>
              </defs>
              <rect
                width="1512"
                height="996"
                fill="#E8DDD3"
                mask={`url(#${ctaStarMaskId})`}
              />
            </svg>

            <div className="site-gutter relative z-20 flex h-full items-center justify-center pt-20 text-center">
              <CallToActionBody
                accentClassName="opacity-0"
                accentRef={accentRef}
                actionsClassName="opacity-0"
                actionsRef={actionsRef}
                bodyClassName="opacity-0"
                bodyRef={bodyRef}
                containerClassName="mx-auto"
                content={content}
                eyebrowClassName="opacity-0"
                eyebrowRef={eyebrowRef}
                hideBody
                titleClassName="opacity-0"
                titleRef={titleRef}
              />
            </div>
          </div>
        </div>
      </div>

      <ReducedMotionCallToAction content={content} />
    </section>
  );
}
