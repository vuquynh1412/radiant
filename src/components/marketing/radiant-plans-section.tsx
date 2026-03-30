"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRightIcon,
  CheckIcon,
  GemIcon,
  TargetIcon,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type {
  RadiantExperienceContent,
  RadiantPlanItem,
} from "./radiant-experience.types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RadiantPlansSectionProps = {
  content: RadiantExperienceContent;
};

function PlansBackdrop() {
  return (
    <svg
      aria-hidden="true"
      className="absolute left-1/2 top-1/2 h-[84rem] w-[84rem] -translate-x-1/2 -translate-y-1/2 text-[#412004]/[0.045]"
      fill="none"
      viewBox="0 0 1400 1400"
    >
      <path
        d="M700 24L860 540L1376 700L860 860L700 1376L540 860L24 700L540 540L700 24Z"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M700 180L812 588L1220 700L812 812L700 1220L588 812L180 700L588 588L700 180Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function PlanIcon({ icon }: { icon: string }) {
  if (icon === "gem") {
    return <GemIcon className="size-6 stroke-[1.8]" />;
  }

  return <TargetIcon className="size-6 stroke-[1.8]" />;
}

function PlanCard({
  item,
  refCallback,
}: {
  item: RadiantPlanItem;
  refCallback: (node: HTMLElement | null) => void;
}) {
  const isFeatured = "featured" in item ? Boolean(item.featured) : false;
  const badge = "badge" in item ? item.badge : undefined;

  return (
    <article
      ref={refCallback}
      className={cn(
        "relative mx-auto flex h-full w-full max-w-[29.5rem] min-h-[39.75rem] flex-col overflow-hidden rounded-[1.65rem] border p-5 shadow-[0_26px_40px_rgba(188,202,255,0.13)] sm:p-6",
        isFeatured
          ? "border-[#eac09e] bg-[linear-gradient(180deg,#f3d9c0_0%,#f2e3d6_100%)]"
          : "border-[#eac09e] bg-white",
      )}
    >
      {isFeatured ? (
        <div className="pointer-events-none absolute inset-y-[-14%] right-[-22%] w-[72%] rounded-full border border-[#e0bc9b]/85" />
      ) : null}
      {isFeatured ? (
        <div className="pointer-events-none absolute inset-y-[-10%] right-[-6%] w-[55%] rounded-full border border-[#efc7a7]/65" />
      ) : null}

      <div className="relative flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div
            className={cn(
              "relative flex size-[3.25rem] items-center justify-center overflow-hidden rounded-[0.9rem]",
              isFeatured ? "bg-white text-[#412004]" : "bg-[#c6a486] text-white",
            )}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_30%,rgba(255,255,255,0.45),transparent_38%)]" />
            <PlanIcon icon={item.icon} />
          </div>

          {badge ? (
            <span className="inline-flex items-center rounded-[0.55rem] border border-white/80 bg-white/20 px-3 py-1.5 text-[0.96rem] font-medium text-[#412004] backdrop-blur-sm">
              {badge}
            </span>
          ) : null}
        </div>

        <div className="mt-5">
          <h3 className="font-sans text-[clamp(1.88rem,2.28vw,2.32rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#412004]">
            {item.title}
          </h3>
          <p className="mt-2 max-w-[22rem] text-[0.88rem] leading-[1.55] text-[#6f655b]">
            {item.description}
          </p>
        </div>

        <div className="mt-5">
          <p className="font-sans text-[clamp(2.8rem,3.55vw,3.55rem)] font-semibold leading-none tracking-[-0.085em] text-[#412004]">
            {item.price}
          </p>
          <p className="mt-1.5 text-[1.18rem] tracking-[-0.04em] text-[#c6a486] line-through">
            {item.originalPrice}
          </p>
        </div>

        <div className="mt-5 h-px bg-[#dfc7b1]" />

        <div className="mt-5 flex flex-1 flex-col">
          <ul className="space-y-2">
            {item.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3.5 text-[0.94rem] leading-[1.4] text-[#412004]"
              >
                <CheckIcon className="size-4 shrink-0 stroke-[2.2]" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <a
            className={cn(
              buttonVariants({
                className:
                  "mt-5 h-14 w-full rounded-full text-[0.96rem] font-normal shadow-none",
                size: "lg",
                variant: isFeatured ? "default" : "outline",
              }),
              isFeatured
                ? "bg-[#412004] text-white hover:bg-[#412004]/90"
                : "border-[#412004] text-[#412004] hover:bg-[#412004]/[0.03]",
            )}
            href={`mailto:hello@radiant.studio?subject=${encodeURIComponent(item.title)}`}
          >
            <span>{item.buttonLabel}</span>
            <ArrowUpRightIcon className="size-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

export function RadiantPlansSection({
  content,
}: RadiantPlansSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const backdropRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!sectionRef.current || !headerRef.current) {
          return undefined;
        }

        const useTouchProfile =
          ScrollTrigger.isTouch !== 0 || window.matchMedia("(pointer: coarse)").matches;
        const backdropScrub = useTouchProfile ? 0.22 : 1;

        const cards = cardRefs.current.filter(
          (card): card is HTMLElement => Boolean(card),
        );

        gsap.set([headerRef.current, ...cards], {
          opacity: 0,
          y: 52,
        });

        const revealTimeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        });

        revealTimeline
          .to(headerRef.current, {
            duration: 0.9,
            opacity: 1,
            y: 0,
          })
          .to(
            cards,
            {
              duration: 0.95,
              opacity: 1,
              stagger: 0.16,
              y: 0,
            },
            "-=0.4",
          );

        let backdropTrigger: ScrollTrigger | undefined;

        if (backdropRef.current) {
          backdropTrigger = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: backdropScrub,
            onUpdate: (self) => {
              gsap.set(backdropRef.current, {
                rotate: gsap.utils.interpolate(-3, 3, self.progress),
                scale: gsap.utils.interpolate(0.96, 1.04, self.progress),
                yPercent: gsap.utils.interpolate(-3, 3, self.progress),
              });
            },
          });
        }

        return () => {
          revealTimeline.scrollTrigger?.kill();
          revealTimeline.kill();
          backdropTrigger?.kill();
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="plans"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#e8ddd3] px-4 pt-12 pb-[16svh] scroll-mt-32 sm:px-6 sm:pt-14 sm:pb-[18svh] sm:scroll-mt-36 lg:px-8 lg:pt-16 lg:pb-[19svh]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#171614]/12 via-[#171614]/6 to-transparent" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div ref={backdropRef} className="absolute inset-0">
          <PlansBackdrop />
        </div>
      </div>

      <div className="relative mx-auto max-w-[90rem]">
        <div ref={headerRef} className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-[clamp(3.15rem,4.9vw,5.35rem)] leading-[0.94] tracking-[-0.055em] text-[#111111]">
            {content.plans.title}
          </h2>
        </div>

        <div className="mx-auto mt-7 grid max-w-[69rem] gap-5 md:mt-8 lg:grid-cols-2 lg:justify-center lg:gap-x-10 lg:gap-y-7 xl:gap-x-14">
          {content.plans.items.map((item, index) => (
            <PlanCard
              key={item.key}
              item={item}
              refCallback={(node) => {
                cardRefs.current[index] = node;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
