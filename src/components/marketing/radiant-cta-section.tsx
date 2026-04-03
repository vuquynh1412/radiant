"use client";

import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRightIcon, MailIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { getRadiantScrollProfile } from "./radiant-scroll-profiles";
import type { RadiantExperienceContent } from "./radiant-experience.types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RadiantCallToActionSectionProps = {
  content: RadiantExperienceContent;
};

const ctaStarPath =
  "M756.5 436L767.296 476.098C768.82 481.758 773.242 486.179 778.902 487.703L819 498.5L778.902 509.296C773.242 510.82 768.82 515.241 767.296 520.902L756.5 561L745.704 520.902C744.18 515.241 739.758 510.82 734.098 509.296L694 498.5L734.098 487.703C739.758 486.179 744.18 481.758 745.704 476.098L756.5 436Z";
const ctaStarMaskId = "radiant-cta-star-mask";

type CallToActionBodyProps = {
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
  return (
    <div className={cn("max-w-296", containerClassName)}>
      <p
        ref={eyebrowRef}
        className={cn(
          "text-base font-medium text-[#27272A] uppercase",
          eyebrowClassName,
        )}
      >
        {content.cta.eyebrow}
      </p>
      <h2
        ref={titleRef}
        className={cn(
          "title-display-inika mx-auto mt-4 max-w-[13ch] text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.96] text-[#27272A]",
          titleClassName,
        )}
      >
        {content.cta.title}
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
                "border-[#171614]/16 bg-[#171614] text-white hover:bg-[#171614]/92",
              size: "marketing",
              variant: "default",
            }),
          )}
          href="mailto:hello@radiant.studio?subject=Radiant%20strategy%20call"
        >
          <span className="inline-flex items-center justify-center gap-2">
            <span>{content.cta.buttonLabel}</span>
            <ArrowUpRightIcon data-icon="inline-end" />
          </span>
        </a>

        <a
          className="inline-flex items-center gap-2 text-base text-[#27272A] transition-colors hover:text-[#27272A]"
          href="mailto:hello@radiant.studio?subject=Radiant%20capability%20review"
        >
          <MailIcon className="size-4" />
          {content.cta.secondary}
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
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const bodyRef = useRef<HTMLParagraphElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!sectionRef.current || !stageRef.current || !surfaceRef.current) {
          return undefined;
        }

        const { useTouchProfile } = getRadiantScrollProfile();
        const easeOut = gsap.parseEase("power3.out");
        const easeInOut = gsap.parseEase("power2.inOut");
        const riseScaleCurve = gsap.parseEase("power2.in");
        const copyNodes = [
          eyebrowRef.current,
          titleRef.current,
          bodyRef.current,
          actionsRef.current,
        ].filter(Boolean);

        if (maskedRevealRef.current) {
          maskedRevealRef.current.style.filter = useTouchProfile ? "none" : "";
        }

        const renderStage = (progress: number) => {
          const riseStart = 0.05;
          const riseEnd = 0.38;
          const bloomEnd = 0.78;
          const riseProgress = gsap.utils.clamp(
            0,
            1,
            (progress - riseStart) / (riseEnd - riseStart),
          );
          const copyProgress = gsap.utils.clamp(0, 1, (progress - 0.46) / 0.18);
          const panelProgress = gsap.utils.clamp(
            0,
            1,
            (progress - 0.78) / 0.12,
          );
          const riseEase = easeOut(riseProgress);
          const totalStarProgress = gsap.utils.clamp(
            0,
            1,
            (progress - riseStart) / (bloomEnd - riseStart),
          );
          const midStarProgress =
            (riseEnd - riseStart) / (bloomEnd - riseStart);
          const riseScaleProgress = gsap.utils.clamp(
            0,
            1,
            totalStarProgress / midStarProgress,
          );
          const bloomScaleProgress = gsap.utils.clamp(
            0,
            1,
            (totalStarProgress - midStarProgress) / (1 - midStarProgress),
          );
          const copyEase = easeOut(copyProgress);
          const panelEase = easeInOut(panelProgress);
          const panelVisible = panelProgress > 0;

          const riseScale = gsap.utils.interpolate(
            0.0014,
            9.5,
            riseScaleCurve(riseScaleProgress),
          );
          const bloomScale = gsap.utils.interpolate(
            9.5,
            76,
            bloomScaleProgress,
          );
          const starScale =
            totalStarProgress <= midStarProgress ? riseScale : bloomScale;
          const starY = gsap.utils.interpolate(760, 0, riseEase);
          const starRotation = gsap.utils.interpolate(
            -18,
            342,
            totalStarProgress,
          );

          const starTransform = `translate(756.5 498.5) rotate(${starRotation}) scale(${starScale}) translate(-756.5 -498.5)`;
          const starTranslate = `translate(0 ${starY})`;

          gsap.set(maskedRevealRef.current, {
            opacity: panelVisible ? 1 - panelEase : 1,
          });
          gsap.set(fullPanelRef.current, {
            opacity: panelVisible ? panelEase : 0,
            scaleX: 1,
            scaleY: 1,
          });
          gsap.set(starMaskTranslateRef.current, {
            attr: { transform: starTranslate },
          });
          gsap.set(starMaskTransformRef.current, {
            attr: { transform: starTransform },
          });

          gsap.set(surfaceRef.current, {
            borderRadius: 0,
            opacity: 1,
            scaleX: 1,
            scaleY: 1,
            transformOrigin: "center top",
            y: 0,
          });

          gsap.set(copyNodes, {
            opacity: panelVisible
              ? gsap.utils.interpolate(copyEase, 0.94, panelEase)
              : copyEase,
            y: gsap.utils.interpolate(64, 0, copyEase),
          });
        };

        renderStage(0);

        const trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            renderStage(self.progress);
          },
        });

        return () => {
          trigger.kill();
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef },
  );

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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(255,255,255,0.04),transparent_36%)]" />

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
