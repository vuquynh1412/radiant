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

type OrbitMarker = {
  angle: number;
  className: string;
  glowClassName?: string;
};

type CallToActionBodyProps = {
  actionsClassName?: string;
  actionsRef?: RefObject<HTMLDivElement | null>;
  bodyClassName?: string;
  bodyRef?: RefObject<HTMLParagraphElement | null>;
  containerClassName?: string;
  content: RadiantExperienceContent;
  eyebrowClassName?: string;
  eyebrowRef?: RefObject<HTMLParagraphElement | null>;
  titleClassName?: string;
  titleRef?: RefObject<HTMLHeadingElement | null>;
};

function OrbitRing({
  className,
  dotted = false,
  ringRef,
  markers = [],
}: {
  className?: string;
  dotted?: boolean;
  ringRef?: RefObject<HTMLDivElement | null>;
  markers?: OrbitMarker[];
}) {
  return (
    <div
      aria-hidden="true"
      ref={ringRef}
      className={cn(
        "pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-white/18 [will-change:transform,opacity]",
        dotted ? "border-[1.5px] border-dashed border-white/24" : "",
        className,
      )}
    >
      {markers.map((marker, index) => (
        <div
          key={`${marker.angle}-${index}`}
          className="absolute inset-0"
          style={{ transform: `rotate(${marker.angle}deg)` }}
        >
          {marker.glowClassName ? (
            <span
              className={cn(
                "absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[10px]",
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
  );
}

function CallToActionBody({
  actionsClassName,
  actionsRef,
  bodyClassName,
  bodyRef,
  containerClassName,
  content,
  eyebrowClassName,
  eyebrowRef,
  titleClassName,
  titleRef,
}: CallToActionBodyProps) {
  return (
    <div className={cn("max-w-[74rem]", containerClassName)}>
      <p
        ref={eyebrowRef}
        className={cn(
          "text-[0.72rem] font-medium tracking-[0.26em] text-[#201d1a]/58 uppercase",
          eyebrowClassName,
        )}
      >
        {content.cta.eyebrow}
      </p>
      <h2
        ref={titleRef}
        className={cn(
          "title-display-inika mx-auto mt-4 max-w-[13ch] text-[#171614]",
          titleClassName,
        )}
      >
        {content.cta.title}
      </h2>
      <p
        ref={bodyRef}
        className={cn(
          "mx-auto mt-5 max-w-[42rem] text-[1rem] leading-7 text-[#201d1a]/68 sm:text-[1.08rem]",
          bodyClassName,
        )}
      >
        {content.cta.body}
      </p>

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
                "h-[3.25rem] rounded-full border-[#171614]/16 bg-[#171614] px-7 text-white hover:bg-[#171614]/92",
              size: "lg",
              variant: "default",
            }),
          )}
          href="mailto:hello@radiant.studio?subject=Radiant%20strategy%20call"
        >
          {content.cta.buttonLabel}
          <ArrowUpRightIcon data-icon="inline-end" />
        </a>

        <a
          className="inline-flex items-center gap-2 text-sm text-[#201d1a]/72 transition-colors hover:text-[#171614]"
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
    <div className="site-gutter hidden bg-[#1b1a18] py-16 text-white motion-reduce:block sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.6rem] border border-white/10 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0.07),transparent_36%),linear-gradient(180deg,#1b1a18_0%,#111111_100%)] p-3 shadow-[0_36px_120px_-56px_rgba(0,0,0,0.75)]">
        <div className="pointer-events-none absolute left-1/2 top-[-10rem] h-[24rem] w-[24rem] -translate-x-1/2 rounded-full border border-white/10 opacity-40" />
        <div className="pointer-events-none absolute left-1/2 top-[-3rem] h-[10rem] w-[10rem] -translate-x-1/2 rounded-full border border-white/14 opacity-60" />

        <div className="relative rounded-[2rem] bg-[#E8DDD3] px-6 py-14 text-center sm:px-10 sm:py-16 lg:px-14">
          <CallToActionBody
            bodyClassName="opacity-100"
            containerClassName="mx-auto"
            content={content}
            eyebrowClassName="opacity-100"
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
  const orbitOuterRef = useRef<HTMLDivElement | null>(null);
  const orbitInnerRef = useRef<HTMLDivElement | null>(null);
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
          const launchProgress = gsap.utils.clamp(0, 1, (progress - 0.04) / 0.2);
          const bloomProgress = gsap.utils.clamp(0, 1, (progress - 0.18) / 0.48);
          const copyProgress = gsap.utils.clamp(0, 1, (progress - 0.42) / 0.18);
          const footerProgress = gsap.utils.clamp(0, 1, (progress - 0.79) / 0.12);
          const orbitProgress = gsap.utils.clamp(0, 1, (progress - 0.06) / 0.72);
          const launchEase = easeOut(launchProgress);
          const bloomEase = easeInOut(bloomProgress);
          const copyEase = easeOut(copyProgress);
          const footerEase = easeInOut(footerProgress);
          const orbitEase = easeInOut(orbitProgress);
          const cardProgress = gsap.utils.clamp(0, 1, footerProgress / 0.62);
          const cardEase = easeInOut(cardProgress);
          const panelVisible = progress >= 0.64;
          const outerRotation =
            progress < 0.82
              ? gsap.utils.interpolate(-24, 168, orbitEase)
              : gsap.utils.interpolate(168, 214, footerEase);
          const innerRotation =
            progress < 0.82
              ? gsap.utils.interpolate(22, -146, orbitEase)
              : gsap.utils.interpolate(-146, -182, footerEase);

          gsap.set(orbitOuterRef.current, {
            opacity:
              progress < 0.72
                ? gsap.utils.interpolate(0.38, 0.56, launchEase)
                : gsap.utils.interpolate(0.56, 0.18, gsap.utils.clamp(0, 1, (progress - 0.72) / 0.12)),
            rotation: outerRotation,
            scale:
              progress < 0.84
                ? gsap.utils.interpolate(0.94, 1.06, bloomEase)
                : gsap.utils.interpolate(1.06, 0.98, footerEase),
            transformOrigin: "center center",
          });
          gsap.set(orbitInnerRef.current, {
            opacity:
              progress < 0.68
                ? gsap.utils.interpolate(0.22, 0.34, launchEase)
                : gsap.utils.interpolate(0.34, 0.1, gsap.utils.clamp(0, 1, (progress - 0.68) / 0.12)),
            rotation: innerRotation,
            scale:
              progress < 0.84
                ? gsap.utils.interpolate(0.98, 1.04, bloomEase)
                : gsap.utils.interpolate(1.04, 0.985, footerEase),
            transformOrigin: "center center",
          });

          const preFooterScale =
            progress < 0.24
              ? gsap.utils.interpolate(0.0014, 0.48, launchEase)
              : gsap.utils.interpolate(0.48, 64, bloomEase);
          const preFooterY =
            progress < 0.24
              ? gsap.utils.interpolate(680, 288, launchEase)
              : gsap.utils.interpolate(288, -8, bloomEase);
          const preFooterRotation =
            progress < 0.24
              ? gsap.utils.interpolate(-18, 20, launchEase)
              : gsap.utils.interpolate(20, 0, gsap.utils.clamp(0, 1, (progress - 0.24) / 0.24));

          const starScale =
            progress < 0.79
              ? preFooterScale
              : gsap.utils.interpolate(64, 44, cardEase);
          const starY =
            progress < 0.79
              ? preFooterY
              : gsap.utils.interpolate(-8, -16, cardEase);
          const starRotation =
            progress < 0.79
              ? preFooterRotation
              : gsap.utils.interpolate(0, -6, cardEase);

          const starTransform = `translate(756.5 498.5) rotate(${starRotation}) scale(${starScale}) translate(-756.5 -498.5)`;
          const starTranslate = `translate(0 ${starY})`;

          gsap.set(maskedRevealRef.current, {
            opacity: panelVisible ? 0 : 1,
          });
          gsap.set(fullPanelRef.current, {
            opacity: panelVisible ? 1 : 0,
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
            opacity:
              progress < 0.79
                ? copyEase
                : gsap.utils.interpolate(1, 0.92, cardEase),
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
        className="relative h-[212svh] bg-[#1b1a18] motion-reduce:hidden md:h-[224svh]"
      >
        <div
          ref={stageRef}
          className="sticky top-0 h-svh overflow-hidden bg-[#1b1a18]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(255,255,255,0.04),transparent_36%)]" />

          <OrbitRing
            dotted
            ringRef={orbitOuterRef}
            markers={[
              {
                angle: 28,
                className: "size-2.5 bg-[#f4ece4]/88 shadow-[0_0_0_1px_rgba(255,255,255,0.24)]",
                glowClassName: "size-8 bg-[#f4ece4]/22",
              },
              {
                angle: 214,
                className: "size-2 bg-white/54",
                glowClassName: "size-6 bg-white/14",
              },
            ]}
            className="top-1/2 size-[62rem] -translate-x-1/2 -translate-y-1/2 sm:size-[72rem]"
          />
          <OrbitRing
            ringRef={orbitInnerRef}
            markers={[
              {
                angle: -52,
                className: "size-2.5 bg-[#f6efe8] shadow-[0_0_0_1px_rgba(255,255,255,0.22)]",
                glowClassName: "size-7 bg-[#f6efe8]/18",
              },
            ]}
            className="top-1/2 size-[28rem] -translate-x-1/2 -translate-y-1/2 sm:size-[36rem]"
          />

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
              className="pointer-events-none absolute inset-0 z-10 size-full [filter:drop-shadow(0_0_26px_rgba(232,221,211,0.08))]"
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

            <div className="site-gutter relative z-20 flex h-full items-center justify-center pt-[5rem] text-center">
              <CallToActionBody
                actionsClassName="opacity-0"
                actionsRef={actionsRef}
                bodyClassName="opacity-0"
                bodyRef={bodyRef}
                containerClassName="mx-auto"
                content={content}
                eyebrowClassName="opacity-0"
                eyebrowRef={eyebrowRef}
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
