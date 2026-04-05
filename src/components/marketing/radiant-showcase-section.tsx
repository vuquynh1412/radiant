import { ArrowRightIcon } from "lucide-react";
import type { CSSProperties } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type {
  RadiantExperienceContent,
  RadiantExperienceRefs,
} from "./radiant-experience.types";
import {
  HeroTitleCopy,
  SectionAccent,
  ServiceCard,
  ServiceCopy,
  ServiceHoverOverlay,
  ServiceTile,
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
  heroTitleRef: RadiantExperienceRefs["heroTitleRef"];
  heroMonogramRef: RadiantExperienceRefs["heroMonogramRef"];
  heroMarqueeRef: RadiantExperienceRefs["heroMarqueeRef"];
  heroMarqueeTrackRef: RadiantExperienceRefs["heroMarqueeTrackRef"];
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
  "--showcase-grid-row-gap": "24px",
  "--showcase-grid-slot-width": "15rem",
  "--showcase-grid-title-height": "3.75rem",
} as CSSProperties;

function ShowcaseViewAllButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => {}}
      className={buttonVariants({
        className:
          "border-[#27272A]/38 cursor-pointer bg-transparent text-[#27272A] hover:bg-white hover:text-blue-900",
        size: "marketing",
        variant: "outline",
      })}
    >
      <span>{label}</span>
      <ArrowRightIcon className="size-4" />
    </button>
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
  return (
    <div ref={mobileHeroSectionRef} className="relative md:hidden">
      <div className="sticky top-0 z-10 h-[56.5svh] overflow-hidden bg-[#f6f1eb]">
        <div
          ref={mobileHeroTopContentRef}
          className="site-gutter relative z-10 flex h-full items-center justify-center pt-24 will-change-transform"
        >
          <div className="mx-auto flex max-w-[20rem] items-center justify-center">
            <div className="space-y-3 text-center text-[#27272A]">
              <p className="hero-title-display">{content.hero.title.premium}</p>
              <p className="hero-title-display">
                {content.hero.title.esthetic}
              </p>
              <p className="hero-title-display italic">
                {content.hero.title.dentistry}
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
          innerClassName="scale-[1.08]"
          variant="noir"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,8,8,0.06)_0%,rgba(9,8,8,0.12)_32%,rgba(9,8,8,0.28)_56%,rgba(9,8,8,0.62)_100%)]" />
        <div className="absolute left-[-12%] top-[14%] h-40 w-40 rounded-full bg-[#8bc6ff]/12 blur-3xl" />
        <div className="absolute bottom-[-8%] right-[-6%] h-48 w-48 rounded-full bg-[#ffe1c3]/12 blur-3xl" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-30">
        <div className="sticky top-0 h-svh overflow-hidden">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 overflow-hidden">
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
  );
}

function ReducedMotionDesktopShowcase({
  content,
  forceVisible = false,
}: {
  content: RadiantExperienceContent;
  forceVisible?: boolean;
}) {
  const viewAllLabel = content.locale === "vi" ? "Xem tất cả" : "View all";
  const otherLabel = content.locale === "vi" ? "Khác" : "Other";
  const viewMoreLabel = content.locale === "vi" ? "Xem thêm" : "Learn more";

  return (
    <div className={forceVisible ? "hidden md:block" : "hidden md:motion-reduce:block"}>
      <div className="dark-editorial-gradient relative overflow-hidden bg-[#171614] text-white">
        <div className="absolute inset-0">
          <VisualSurface
            className="size-full rounded-none"
            innerClassName="scale-[1.08]"
            variant="vista"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,8,8,0.2)_0%,rgba(9,8,8,0.42)_42%,rgba(9,8,8,0.74)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(255,255,255,0.08),transparent_38%)]" />
        </div>

        <div className="site-gutter relative mx-auto flex min-h-168 max-w-384 flex-col items-center justify-center py-24 text-center">
          <div className="w-full max-w-6xl text-white">
            <HeroTitleCopy
              className="h-[clamp(12rem,18vw,15.5rem)]"
              dentistry={content.hero.title.dentistry}
              esthetic={content.hero.title.esthetic}
              premium={content.hero.title.premium}
            />
          </div>

          <div className="mt-10 inline-flex max-w-152 items-center gap-3 rounded-full border border-white/14 bg-black/22 px-5 py-3 text-white/78 backdrop-blur-md">
            <span className="size-2 rounded-full bg-[#f4ece4]/88 shadow-[0_0_18px_rgba(244,236,228,0.45)]" />
            <span className="text-base font-medium uppercase">
              {content.hero.marquee}
            </span>
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
                highlights={item.highlights}
                hideDescription
                hideEyebrow
                image={item.image}
                interactive
                otherLabel={otherLabel}
                tileClassName="h-full min-h-56 rounded-[24px]"
                title={item.title}
                viewMoreLabel={viewMoreLabel}
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
  heroTitleRef,
  heroMonogramRef,
  heroMarqueeRef,
  heroMarqueeTrackRef,
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
  const otherLabel = content.locale === "vi" ? "Khác" : "Other";
  const viewMoreLabel = content.locale === "vi" ? "Xem thêm" : "Learn more";

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
          } as CSSProperties
        }
      >
        <div className="relative min-h-svh overflow-clip pt-24 md:sticky md:top-0 md:h-svh md:pt-0">
          <div className="absolute inset-0 bg-[#F9F0E8]" />
          <div
            ref={heroMatteRef}
            className="absolute inset-y-0 left-0 bg-[#F9F0E8] will-change-transform"
          />

          <div
            ref={heroMediaRef}
            className="group/service absolute left-0 top-0 z-10 hidden overflow-hidden will-change-transform md:block"
            style={{ transformOrigin: "top center" }}
          >
            <VisualSurface
              className="size-full rounded-none"
              image={content.services.items[0]?.image}
              innerClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/service:scale-[1.06]"
              variant="vista"
            >
              <ServiceHoverOverlay
                highlights={content.services.items[0]?.highlights}
                otherLabel={otherLabel}
                title={content.services.items[0]?.title ?? ""}
                viewMoreLabel={viewMoreLabel}
              />
            </VisualSurface>
          </div>

          <div
            ref={heroMonogramRef}
            className="pointer-events-none absolute inset-0 z-20 will-change-transform"
          />

          <div
            ref={heroTitleRef}
            className="absolute inset-0 z-30 will-change-transform"
          >
            <div className="relative size-full">
              <div
                className="pointer-events-none absolute left-1/2 top-[49%] -translate-x-1/2 -translate-y-1/2 px-4"
                style={{
                  width:
                    "min(calc(100vw - (var(--site-gutter, 1rem) * 2)), 76rem)",
                }}
              >
                <div className="invisible">
                  <HeroTitleCopy
                    dentistry={content.hero.title.dentistry}
                    esthetic={content.hero.title.esthetic}
                    premium={content.hero.title.premium}
                  />
                </div>
              </div>
              <div
                className="absolute inset-0 text-[#27272A]"
                style={{
                  clipPath:
                    "inset(0 calc(100vw - var(--hero-mask-x, 50vw)) 0 0)",
                }}
              >
                <div
                  className="absolute left-1/2 top-[49%] -translate-x-1/2 -translate-y-1/2 px-4"
                  style={{
                    width:
                      "min(calc(100vw - (var(--site-gutter, 1rem) * 2)), 76rem)",
                  }}
                >
                  <HeroTitleCopy
                    dentistry={content.hero.title.dentistry}
                    esthetic={content.hero.title.esthetic}
                    premium={content.hero.title.premium}
                  />
                </div>
              </div>
              <div
                className="absolute inset-0 text-white"
                style={{ clipPath: "inset(0 0 0 var(--hero-mask-x, 50vw))" }}
              >
                <div
                  className="absolute left-1/2 top-[49%] -translate-x-1/2 -translate-y-1/2 px-4"
                  style={{
                    width:
                      "min(calc(100vw - (var(--site-gutter, 1rem) * 2)), 76rem)",
                  }}
                >
                  <HeroTitleCopy
                    className="text-shadow-soft"
                    dentistry={content.hero.title.dentistry}
                    esthetic={content.hero.title.esthetic}
                    premium={content.hero.title.premium}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            ref={heroMarqueeRef}
            className="pointer-events-none absolute inset-0 z-40 flex items-center opacity-0"
          >
            <div
              ref={heroMarqueeTrackRef}
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
                  <SectionAccent
                    className="mb-4"
                  />
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

                <div ref={serviceGridFooterRef} className="flex justify-center">
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
              className="group/service absolute left-0 top-0 z-10 aspect-video w-[clamp(38rem,48vw,46rem)] overflow-hidden rounded-[24px] border border-white/20 opacity-0 shadow-[0_28px_90px_-42px_rgba(17,12,9,0.35)] pointer-events-auto"
            >
              <ServiceTile
                className="size-full rounded-[inherit] border-0 shadow-none"
                image={content.services.items[0]?.image}
                innerClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/service:scale-[1.06]"
              >
                <ServiceHoverOverlay
                  highlights={content.services.items[0]?.highlights}
                  otherLabel={otherLabel}
                  title={content.services.items[0]?.title ?? ""}
                  viewMoreLabel={viewMoreLabel}
                />
              </ServiceTile>
            </div>

            {content.services.items.slice(1).map((item, index) => (
              <div
                key={item.title}
                ref={(node) => {
                  serviceCardsRef.current[index] = node;
                }}
                className="group/service absolute left-0 top-0 z-20 aspect-video w-[clamp(38rem,48vw,46rem)] overflow-hidden rounded-[24px] border border-white/20 opacity-0 shadow-[0_28px_90px_-42px_rgba(17,12,9,0.35)] will-change-transform pointer-events-auto"
                style={{ transformOrigin: "top center" }}
              >
                <ServiceTile
                  className="size-full rounded-[inherit] border-0 shadow-none"
                  image={item.image}
                  innerClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/service:scale-[1.06]"
                >
                  <ServiceHoverOverlay
                    highlights={item.highlights}
                    otherLabel={otherLabel}
                    title={item.title}
                    viewMoreLabel={viewMoreLabel}
                  />
                </ServiceTile>
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
          <SectionAccent
            className="mb-5"
          />
          <h2 className="font-heading text-[2.5rem] leading-[0.96] text-[#27272A]">
            {content.services.title}
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
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
              title={item.title}
              titleClassName="text-[1.2rem] leading-[1.06]"
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
