import type { CSSProperties } from "react";
import { ArrowUpRightIcon } from "lucide-react";

import { heroEditorialImage } from "@/content/showcase-images";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type {
  RadiantExperienceContent,
  RadiantExperienceRefs,
} from "./radiant-experience.types";
import {
  SectionAccent,
  ServiceCard,
  ServiceCopy,
  ServiceTile,
  ViewAllButton,
  VisualSurface,
} from "./radiant-experience-shared";

type RadiantShowcaseSectionProps = {
  content: RadiantExperienceContent;
  desktopShowcaseReady: boolean;
  showcaseSectionRef: RadiantExperienceRefs["showcaseSectionRef"];
  mobileHeroSectionRef: RadiantExperienceRefs["mobileHeroSectionRef"];
  mobileHeroMarqueeRef: RadiantExperienceRefs["mobileHeroMarqueeRef"];
  mobileHeroTopContentRef: RadiantExperienceRefs["mobileHeroTopContentRef"];
  mobileHeroTopOverlayRef: RadiantExperienceRefs["mobileHeroTopOverlayRef"];
  heroMatteRef: RadiantExperienceRefs["heroMatteRef"];
  heroMediaRef: RadiantExperienceRefs["heroMediaRef"];
  heroMediaFrameRef: RadiantExperienceRefs["heroMediaFrameRef"];
  heroFinalImageRef: RadiantExperienceRefs["heroFinalImageRef"];
  heroTitleRef: RadiantExperienceRefs["heroTitleRef"];
  heroMonogramRef: RadiantExperienceRefs["heroMonogramRef"];
  heroTopPatternRef: RadiantExperienceRefs["heroTopPatternRef"];
  heroMarqueeRef: RadiantExperienceRefs["heroMarqueeRef"];
  heroMarqueeTrackRef: RadiantExperienceRefs["heroMarqueeTrackRef"];
  heroFinalMarqueeRef: RadiantExperienceRefs["heroFinalMarqueeRef"];
  heroFinalMarqueeTrackRef: RadiantExperienceRefs["heroFinalMarqueeTrackRef"];
  activeServiceCopyShellRef: RadiantExperienceRefs["activeServiceCopyShellRef"];
  serviceGridShellRef: RadiantExperienceRefs["serviceGridShellRef"];
  serviceHeaderRef: RadiantExperienceRefs["serviceHeaderRef"];
  serviceGridFooterRef: RadiantExperienceRefs["serviceGridFooterRef"];
  serviceGridItemRefs: RadiantExperienceRefs["serviceGridItemRefs"];
  serviceCardsRef: RadiantExperienceRefs["serviceCardsRef"];
  serviceCopyRefs: RadiantExperienceRefs["serviceCopyRefs"];
  sampleTileRef: RadiantExperienceRefs["sampleTileRef"];
};

const desktopShowcaseGridStyle = {
  "--showcase-grid-columns": "4",
  "--showcase-grid-column-gap": "24px",
  "--showcase-grid-footer-margin-top": "20px",
  "--showcase-grid-header-gap": "84px",
  "--showcase-grid-content-height": "32rem",
  "--showcase-grid-item-gap": "10px",
  "--showcase-opening-top": "96px",
  "--showcase-grid-row-gap": "24px",
  "--showcase-grid-slot-width": "15rem",
  "--showcase-grid-title-height": "3.75rem",
} as CSSProperties;

function getOpeningHeroCopy(locale: RadiantExperienceContent["locale"]) {
  if (locale === "vi") {
    return {
      ctaLabel: "Liên hệ",
      lineOne: "Kiến tạo bản sắc,",
      lineTwo: "nâng tầm thương hiệu",
    };
  }

  return {
    ctaLabel: "Contact",
    lineOne: "Shape Identity,",
    lineTwo: "Elevate The Brand",
  };
}

function getTransitionHeroTitle(content: RadiantExperienceContent) {
  return `${content.hero.title.premium} ${content.hero.title.esthetic} ${content.hero.title.dentistry}!`;
}

function getMobileServiceTitle(title: string) {
  switch (title) {
    case "Xây hệ thống thương hiệu":
      return "Xây hệ thống\nthương hiệu";
    case "Bộ nhận diện thương hiệu":
      return "Bộ nhận diện\nthương hiệu";
    case "Truyền thông đa nền tảng":
      return "Truyền thông đa\nnền tảng";
    default:
      return title;
  }
}

function RadiantPatternTicker({
  className,
  direction = "left",
  label,
  mobileVisible = false,
}: {
  className?: string;
  direction?: "left" | "right";
  label: string;
  mobileVisible?: boolean;
}) {
  const items = Array.from({ length: 14 }, (_, index) => `${label}-${index}`);

  return (
    <div
      className={cn(
        "overflow-hidden bg-[#F7ECE2]/96",
        mobileVisible ? "block" : "hidden md:block",
        className,
      )}
    >
      <div
        className={cn(
          "hero-pattern-track",
          direction === "right" && "hero-pattern-track-reverse",
        )}
      >
        {Array.from({ length: 2 }).map((_, groupIndex) => (
          <div
            key={`${label}-group-${groupIndex}`}
            className="flex shrink-0 items-center gap-4 pr-4"
          >
            {items.map((item) => (
              <span
                key={`${item}-${groupIndex}`}
                className="inline-flex items-center gap-4 font-heading text-[0.92rem] font-semibold tracking-[0.02em] whitespace-nowrap text-[#8C5725]/88"
              >
                <span>{label}</span>
                <span className="text-[0.72rem] text-[#B88547]/75">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ShowcaseViewAllButton({ label }: { label: string }) {
  return <ViewAllButton label={label} />;
}

function OpeningHeroButton({ label }: { label: string }) {
  return (
    <a
      className={buttonVariants({
        className:
          "pointer-events-auto relative overflow-hidden rounded-full border-2 border-secondary ring-1 ring-secondary bg-secondary/14 px-6 text-secondary shadow-[0_16px_40px_-24px_rgba(39,24,9,0.35)] backdrop-blur-[8px] hover:border-secondary hover:bg-secondary/14 hover:text-secondary",
        size: "marketing",
        variant: "outline",
      })}
      href="#contact"
      style={{ borderRadius: 9999 }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 translate-y-full rounded-[inherit] bg-secondary transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover/button:translate-y-0"
      />
      <span className="relative z-10 whitespace-nowrap text-sm font-semibold tracking-[-0.02em] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/button:text-secondary-foreground md:text-base">
        {label}
      </span>
      <ArrowUpRightIcon className="relative z-10 size-4.5 transition-[color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/button:translate-x-1 group-hover/button:text-secondary-foreground" />
    </a>
  );
}

function ShowcaseFrameStar({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 0L12.6745 2.5052C13.8328 6.807 17.193 10.1672 21.4948 11.3255L24 12L21.4948 12.6745C17.193 13.8328 13.8328 17.193 12.6745 21.4948L12 24L11.3255 21.4948C10.1672 17.193 6.807 13.8328 2.5052 12.6745L0 12L2.5052 11.3255C6.807 10.1672 10.1672 6.807 11.3255 2.5052L12 0Z"
        fill="#E2B649"
      />
    </svg>
  );
}

function MobileShowcaseHero({
  content,
  mobileHeroMarqueeRef,
  mobileHeroSectionRef,
  mobileHeroTopContentRef,
  mobileHeroTopOverlayRef,
}: {
  content: RadiantExperienceContent;
  mobileHeroMarqueeRef: RadiantExperienceRefs["mobileHeroMarqueeRef"];
  mobileHeroSectionRef: RadiantExperienceRefs["mobileHeroSectionRef"];
  mobileHeroTopContentRef: RadiantExperienceRefs["mobileHeroTopContentRef"];
  mobileHeroTopOverlayRef: RadiantExperienceRefs["mobileHeroTopOverlayRef"];
}) {
  const openingCopy = getOpeningHeroCopy(content.locale);

  return (
    <div className="md:hidden">
      <section className="relative mt-20 h-[calc(100dvh-5rem)] min-h-[34rem] overflow-hidden rounded-t-[16px] bg-[#17120F]">
        <VisualSurface
          className="absolute inset-0 rounded-none"
          image={heroEditorialImage}
          innerClassName="scale-[1.05]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,8,5,0.16)_0%,rgba(13,8,5,0.22)_30%,rgba(13,8,5,0.56)_72%,rgba(13,8,5,0.84)_100%)]" />
        </VisualSurface>
        <div className="site-gutter relative z-10 flex h-full items-center justify-center px-5 pb-[calc(env(safe-area-inset-bottom)+4.75rem)] pt-[calc(env(safe-area-inset-top)+76px)]">
          <div className="flex flex-col items-center space-y-5 text-center">
            <h1 className="font-heading text-[clamp(1rem,8vw,4.5rem)] leading-[1.2] font-bold tracking-[-0.04em] text-[#E2B649] text-shadow-[0_8px_24px_rgba(15,9,4,0.22)]">
              <span className="block">{openingCopy.lineOne}</span>
              <span className="block">{openingCopy.lineTwo}</span>
            </h1>
            <p className="max-w-[18.5rem] text-[0.98rem] leading-6 text-[#F7EFE4]/92">
              {content.hero.promise}
            </p>
            <OpeningHeroButton label={openingCopy.ctaLabel} />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20">
          <RadiantPatternTicker
            className="bg-transparent"
            direction="right"
            label={content.brand.name}
            mobileVisible
          />
        </div>
      </section>

      <div
        ref={mobileHeroSectionRef}
        className="relative min-h-[200svh] overflow-clip"
      >
        <div className="sticky top-0 z-10 h-svh overflow-hidden bg-[#f6f1eb]">
          <div
            ref={mobileHeroTopContentRef}
            className="site-gutter relative z-10 flex h-full items-center justify-center will-change-transform"
          >
            <div className="mx-auto flex max-w-[20rem] items-center justify-center">
              <div className="space-y-3 text-center text-[#8C5725]">
                <p className="hero-title-display">
                  {content.hero.title.premium}
                </p>
                <p className="hero-title-display">
                  {content.hero.title.esthetic}
                </p>
                <p className="hero-title-display">
                  {content.hero.title.dentistry}!
                </p>
              </div>
            </div>
          </div>
          <div
            ref={mobileHeroTopOverlayRef}
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(20,21,29,0)_0%,rgba(20,21,29,0.08)_36%,rgba(20,21,29,0.18)_100%)] opacity-0 backdrop-blur-md"
          />
        </div>

        <div
          data-mobile-hero-media=""
          className="dark-editorial-gradient relative z-20 h-svh overflow-hidden bg-[#171614]"
        >
          <VisualSurface
            className="size-full rounded-none"
            image={content.services.items[0]?.image ?? heroEditorialImage}
            innerClassName="scale-[1.08]"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,8,8,0.06)_0%,rgba(9,8,8,0.12)_32%,rgba(9,8,8,0.28)_56%,rgba(9,8,8,0.62)_100%)]" />
          <div className="absolute left-[-12%] top-[14%] h-40 w-40 rounded-full bg-[#8bc6ff]/12 blur-3xl" />
          <div className="absolute bottom-[-8%] right-[-6%] h-48 w-48 rounded-full bg-[#ffe1c3]/12 blur-3xl" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-30">
          <div className="sticky top-0 h-svh overflow-hidden">
            <div className="absolute left-0 top-[20%] -translate-y-1/2">
              <p
                ref={mobileHeroMarqueeRef}
                data-mobile-hero-marquee=""
                className="hero-marquee-display whitespace-nowrap px-6 text-white text-shadow-soft"
              >
                {content.hero.marquee}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReducedMotionDesktopShowcase({
  content,
  forceVisible = false,
}: {
  content: RadiantExperienceContent;
  forceVisible?: boolean;
}) {
  const openingCopy = getOpeningHeroCopy(content.locale);
  const transitionTitle = getTransitionHeroTitle(content);
  const viewAllLabel = content.locale === "vi" ? "Xem tất cả" : "View all";

  return (
    <div
      className={
        forceVisible ? "hidden md:block" : "hidden md:motion-reduce:block"
      }
    >
      <div className="relative overflow-hidden bg-[#F7ECE2] text-[#27272A]">
        <div
          className="site-gutter relative mx-auto flex min-h-168 max-w-384 flex-col justify-center pb-12"
          style={{ paddingTop: "var(--showcase-opening-top, 96px)" }}
        >
          <div className="relative min-h-[72svh] overflow-hidden rounded-t-[2.5rem]">
            <VisualSurface
              className="size-full rounded-[inherit]"
              image={heroEditorialImage}
              innerClassName="scale-[1.02]"
            >
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,10,4,0.16)_0%,rgba(20,10,4,0.12)_28%,rgba(20,10,4,0.3)_100%)]" />
              <div className="absolute inset-[1.1rem] rounded-[calc(2.5rem-1.1rem)] border border-[#E2B649]/42" />
              <ShowcaseFrameStar className="pointer-events-none absolute left-1/2 top-[1.1rem] h-4 w-4 -translate-x-1/2 -translate-y-1/2" />
            </VisualSurface>

            <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
              <div className="max-w-[54rem]">
                <h1 className="font-heading text-[clamp(4rem,6.1vw,6.85rem)] leading-[0.94] font-bold text-[#E2B649] text-shadow-[0_8px_22px_rgba(15,9,4,0.22)]">
                  <span className="block">{openingCopy.lineOne}</span>
                  <span className="block">{openingCopy.lineTwo}</span>
                </h1>
                <p className="mx-auto mt-5 max-w-[42rem] text-[1.02rem] leading-7 text-[#F7EFE4]/92">
                  {content.hero.promise}
                </p>
                <div className="mt-8 flex justify-center">
                  <OpeningHeroButton label={openingCopy.ctaLabel} />
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-5">
              <RadiantPatternTicker
                className="bg-transparent"
                direction="right"
                label={content.brand.name}
              />
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 px-10 text-center">
            <p className="font-heading text-[clamp(4rem,6vw,6.3rem)] leading-none font-semibold tracking-[-0.04em] text-[#8C5725]">
              {transitionTitle}
            </p>
          </div>
        </div>
      </div>

      <div className="site-gutter bg-[#F9F0E8] py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {content.services.items.map((item) => (
              <ServiceCard
                key={`${item.title}-reduced-motion`}
                className="h-full gap-4"
                description={item.description}
                eyebrow={item.eyebrow}
                hideDescription
                hideEyebrow
                image={item.image}
                tileClassName="h-full min-h-56 rounded-[24px]"
                title={item.title}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <ShowcaseViewAllButton label={viewAllLabel} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function RadiantShowcaseSection({
  content,
  desktopShowcaseReady,
  showcaseSectionRef,
  mobileHeroSectionRef,
  mobileHeroMarqueeRef,
  mobileHeroTopContentRef,
  mobileHeroTopOverlayRef,
  heroMatteRef,
  heroMediaRef,
  heroMediaFrameRef,
  heroFinalImageRef,
  heroTitleRef,
  heroMonogramRef,
  heroTopPatternRef,
  heroMarqueeRef,
  heroMarqueeTrackRef,
  heroFinalMarqueeRef,
  heroFinalMarqueeTrackRef,
  activeServiceCopyShellRef,
  serviceGridShellRef,
  serviceHeaderRef,
  serviceGridFooterRef,
  serviceGridItemRefs,
  serviceCardsRef,
  serviceCopyRefs,
  sampleTileRef,
}: RadiantShowcaseSectionProps) {
  const viewAllLabel = content.locale === "vi" ? "Xem tất cả" : "View all";
  const openingCopy = getOpeningHeroCopy(content.locale);
  const transitionTitle = getTransitionHeroTitle(content);

  return (
    <section id="showcase">
      <MobileShowcaseHero
        content={content}
        mobileHeroMarqueeRef={mobileHeroMarqueeRef}
        mobileHeroSectionRef={mobileHeroSectionRef}
        mobileHeroTopContentRef={mobileHeroTopContentRef}
        mobileHeroTopOverlayRef={mobileHeroTopOverlayRef}
      />

      <div
        ref={showcaseSectionRef}
        className={cn(
          "relative hidden min-h-svh md:block md:h-[660svh] md:motion-reduce:hidden",
          !desktopShowcaseReady && "md:invisible md:pointer-events-none",
        )}
        style={
          {
            "--hero-mask-x": "50vw",
            "--showcase-focus-copy-width": "46rem",
            "--showcase-opening-top": "96px",
          } as CSSProperties
        }
      >
        <div className="relative min-h-svh overflow-clip pt-24 md:sticky md:top-0 md:h-svh md:pt-0">
          <div className="absolute inset-0 bg-[#F9F0E8]" />
          <div
            ref={heroMatteRef}
            className="pointer-events-none absolute left-0 top-0 h-px w-px bg-transparent will-change-transform"
          />

          <div
            ref={heroMonogramRef}
            className="pointer-events-none absolute inset-0 z-20 will-change-transform"
          >
            <div
              ref={heroTopPatternRef}
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-0 overflow-hidden"
            />
            <div className="absolute inset-x-0 bottom-[1.25rem]">
              <RadiantPatternTicker
                className="bg-transparent"
                direction="right"
                label={content.brand.name}
              />
            </div>
          </div>

          <div
            ref={heroTitleRef}
            className="absolute inset-x-0 bottom-0 z-30 will-change-transform"
            style={{ top: "var(--showcase-opening-top, 96px)" }}
          >
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
              <div className="w-full text-center">
                <h1 className="font-heading text-[clamp(4rem,6vw,7rem)] leading-[1.2] font-bold text-[#E2B649] text-shadow-[0_8px_24px_rgba(15,9,4,0.22)]">
                  <span className="block">{openingCopy.lineOne}</span>
                  <span className="block">{openingCopy.lineTwo}</span>
                </h1>
                <p className="mx-auto mt-6 max-w-[43rem] text-[1.02rem] leading-7 text-[#F7EFE4]/92">
                  {content.hero.promise}
                </p>
                <div className="mt-8 flex justify-center">
                  <OpeningHeroButton label={openingCopy.ctaLabel} />
                </div>
              </div>
            </div>
          </div>

          <div
            ref={heroMarqueeRef}
            className="pointer-events-none absolute inset-0 z-[5] opacity-0 will-change-transform"
          >
            <div className="absolute inset-0 bg-[#F9F0E8]" />
            <div className="absolute inset-0 flex items-center justify-center px-8">
              <div
                ref={heroMarqueeTrackRef}
                className="font-heading text-[clamp(4.25rem,7vw,6.6rem)] leading-none font-semibold tracking-[-0.05em] whitespace-nowrap text-[#8C5725]"
              >
                {transitionTitle}
              </div>
            </div>
          </div>

          <div
            ref={heroMediaRef}
            className="group/service absolute left-0 top-0 z-10 hidden overflow-hidden will-change-transform md:block"
            style={{ transformOrigin: "top center" }}
          >
            <div className="absolute inset-0">
              <VisualSurface
                className="size-full rounded-[inherit]"
                image={heroEditorialImage}
                innerClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/service:scale-[1.06]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,10,4,0.18)_0%,rgba(20,10,4,0.12)_30%,rgba(20,10,4,0.34)_100%)]" />
              </VisualSurface>
            </div>
            <div ref={heroFinalImageRef} className="absolute inset-0 opacity-0">
              <VisualSurface
                className="size-full rounded-[inherit]"
                image={content.services.items[0]?.image ?? heroEditorialImage}
                innerClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/service:scale-[1.06]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,10,4,0.18)_0%,rgba(20,10,4,0.12)_30%,rgba(20,10,4,0.34)_100%)]" />
              </VisualSurface>
            </div>
            <div
              ref={heroMediaFrameRef}
              className="pointer-events-none absolute inset-0"
            >
              <div className="absolute inset-x-[1rem] bottom-0 top-[1rem] rounded-t-[calc(var(--radius-4xl)-0.8rem)] border border-b-0 border-[#E2B649]/40" />
              <ShowcaseFrameStar className="absolute left-1/2 top-[1rem] h-5 w-5 -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div
            ref={heroFinalMarqueeRef}
            className="pointer-events-none absolute inset-0 z-40 flex items-center opacity-0"
          >
            <div
              ref={heroFinalMarqueeTrackRef}
              className="hero-marquee-display whitespace-nowrap px-[8vw] text-white text-shadow-soft italic will-change-transform"
            >
              {content.hero.marquee}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 z-30">
            <div className="site-gutter">
              <div
                ref={serviceGridShellRef}
                className="mx-auto opacity-0 will-change-transform"
                style={desktopShowcaseGridStyle}
              >
                <div
                  ref={serviceHeaderRef}
                  className="pt-6 text-center xl:pt-8"
                >
                  <SectionAccent className="mb-4" />
                  <h2 className="font-heading text-[clamp(2.7rem,4.5vw,4.25rem)] leading-none text-[#27272A]">
                    {content.services.title}
                  </h2>
                </div>

                <div
                  className="relative"
                  style={{
                    height: "var(--showcase-grid-content-height)",
                    marginTop: "var(--showcase-grid-header-gap)",
                  }}
                >
                  {content.services.items.map((item, index) => (
                    <article
                      key={`${item.title}-grid-shell`}
                      ref={(node) => {
                        serviceGridItemRefs.current[index] = node;
                      }}
                      className="absolute left-0 top-0 flex flex-col"
                      style={{
                        gap: "var(--showcase-grid-item-gap)",
                        width: "var(--showcase-grid-slot-width)",
                      }}
                    >
                      <div
                        aria-hidden="true"
                        className="aspect-video w-full rounded-[24px] opacity-0"
                      />
                      <h3
                        className="w-full text-center font-inika text-[20px] font-bold leading-[1.05] text-[#27272A]"
                        style={{
                          minHeight: "var(--showcase-grid-title-height)",
                        }}
                      >
                        {item.title}
                      </h3>
                    </article>
                  ))}
                </div>

                <div
                  ref={serviceGridFooterRef}
                  className="relative z-50 flex justify-center pointer-events-auto"
                >
                  <ShowcaseViewAllButton label={viewAllLabel} />
                </div>
              </div>
            </div>
          </div>

          <div
            ref={activeServiceCopyShellRef}
            className="pointer-events-none absolute inset-x-0 top-0 z-40 opacity-0 will-change-transform"
          >
            <div className="site-gutter mx-auto max-w-384">
              <div
                className="relative mx-auto max-w-full"
                style={{
                  width:
                    "min(100%, var(--showcase-focus-copy-width, clamp(38rem,48vw,46rem)))",
                }}
              >
                {content.services.items.map((item, index) => (
                  <div
                    key={`${item.title}-copy`}
                    ref={(node) => {
                      serviceCopyRefs.current[index] = node;
                    }}
                    className="absolute left-0 top-0 w-full opacity-0"
                  >
                    <ServiceCopy
                      centered
                      className="mx-auto w-full gap-3"
                      description={item.description}
                      eyebrow={item.eyebrow}
                      hideEyebrow
                      title={item.title}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute inset-0">
            <div
              ref={sampleTileRef}
              className="group/service absolute left-0 top-0 z-10 aspect-video w-[clamp(38rem,48vw,46rem)] cursor-pointer overflow-hidden rounded-[24px] border border-white/20 opacity-0 shadow-[0_28px_90px_-42px_rgba(17,12,9,0.35)] pointer-events-auto"
            >
              <ServiceTile
                className="size-full rounded-[inherit] border-0 shadow-none"
                image={content.services.items[0]?.image}
                innerClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/service:scale-[1.06]"
              />
            </div>

            {content.services.items.slice(1).map((item, index) => (
              <div
                key={item.title}
                ref={(node) => {
                  serviceCardsRef.current[index] = node;
                }}
                className="group/service absolute left-0 top-0 z-20 aspect-video w-[clamp(38rem,48vw,46rem)] cursor-pointer overflow-hidden rounded-[24px] border border-white/20 opacity-0 shadow-[0_28px_90px_-42px_rgba(17,12,9,0.35)] will-change-transform pointer-events-auto"
                style={{ transformOrigin: "top center" }}
              >
                <ServiceTile
                  className="size-full rounded-[inherit] border-0 shadow-none"
                  image={item.image}
                  innerClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/service:scale-[1.06]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <ReducedMotionDesktopShowcase
        content={content}
        forceVisible={!desktopShowcaseReady}
      />

      <div className="site-gutter pb-16 pt-14 md:hidden">
        <div className="mx-auto max-w-88 text-center">
          <SectionAccent className="mb-5" />
          <h2 className="font-heading text-[2.5rem] leading-[0.96] text-[#27272A]">
            {content.services.title}
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-2">
          {content.services.items.map((item) => (
            <ServiceCard
              key={`${item.title}-mobile`}
              className="gap-3"
              description={item.description}
              eyebrow={item.eyebrow}
              hideDescription
              hideEyebrow
              image={item.image}
              tileClassName="rounded-[10px]"
              title={getMobileServiceTitle(item.title)}
              titleClassName="text-[14px] leading-[1.06] whitespace-pre-line"
            />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <ShowcaseViewAllButton label={viewAllLabel} />
        </div>
      </div>
    </section>
  );
}
