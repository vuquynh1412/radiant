import type { CSSProperties } from "react";

import type {
  RadiantExperienceContent,
  RadiantExperienceRefs,
} from "./radiant-experience.types";
import {
  HeroTitleCopy,
  RadiantHeroLogo,
  ServiceCard,
  ServiceCopy,
  ServiceTile,
  VisualSurface,
  serviceVisuals,
} from "./radiant-experience-shared";

type RadiantShowcaseSectionProps = {
  content: RadiantExperienceContent;
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
  serviceHeaderRef: RadiantExperienceRefs["serviceHeaderRef"];
  serviceCardsRef: RadiantExperienceRefs["serviceCardsRef"];
  serviceCopyRefs: RadiantExperienceRefs["serviceCopyRefs"];
  sampleTileRef: RadiantExperienceRefs["sampleTileRef"];
};

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
            <div className="space-y-1.5 text-center text-[#27272A]">
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
        className="relative z-20 h-svh overflow-hidden bg-[#171614]"
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
        <div className="pointer-events-none absolute right-[-20%] top-[8%] h-72 w-56 text-white/8">
          <RadiantHeroLogo className="size-full" />
        </div>
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
}: {
  content: RadiantExperienceContent;
}) {
  return (
    <div className="hidden md:motion-reduce:block">
      <div className="relative overflow-hidden bg-[#171614] text-white">
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
          <div className="mb-10 h-[min(18rem,24vw)] w-[min(13rem,18vw)] text-white/16">
            <RadiantHeroLogo className="size-full" />
          </div>

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
            <span className="text-base font-medium tracking-[0.18em] uppercase">
              {content.hero.marquee}
            </span>
          </div>
        </div>
      </div>

      <div className="site-gutter bg-background py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {content.services.items.map((item, index) => (
              <ServiceCard
                key={`${item.title}-reduced-motion`}
                className="h-full gap-4"
                description={item.description}
                eyebrow={item.eyebrow}
                hideEyebrow
                tileClassName="h-full min-h-56"
                title={item.title}
                variant={serviceVisuals[index % serviceVisuals.length]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function RadiantShowcaseSection({
  content,
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
  serviceHeaderRef,
  serviceCardsRef,
  serviceCopyRefs,
  sampleTileRef,
}: RadiantShowcaseSectionProps) {
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
        className="relative hidden min-h-svh md:block md:h-[660svh] md:motion-reduce:hidden"
        style={{ "--hero-mask-x": "50vw" } as CSSProperties}
      >
        <div className="relative min-h-svh overflow-clip pt-24 md:sticky md:top-0 md:h-svh md:pt-0">
          <div className="absolute inset-0 bg-[#f6f1eb]" />
          <div
            ref={heroMatteRef}
            className="absolute inset-y-0 left-0 bg-[#f6f1eb] will-change-transform"
          />

          <div
            ref={heroMediaRef}
            className="absolute left-0 top-0 z-10 hidden overflow-hidden will-change-transform md:block"
            style={{ transformOrigin: "top center" }}
          >
            <VisualSurface className="size-full rounded-none" variant="vista" />
          </div>

          <div
            ref={heroMonogramRef}
            className="pointer-events-none absolute inset-0 z-20 will-change-transform"
          >
            <div
              className="absolute inset-0"
              style={{
                clipPath: "inset(0 calc(100vw - var(--hero-mask-x, 50vw)) 0 0)",
              }}
            >
              <div className="absolute left-1/2 top-1/2 h-[min(76vh,34rem)] w-[min(52vw,31rem)] -translate-x-1/2 -translate-y-1/2 text-[#d8cec2]">
                <RadiantHeroLogo className="size-full" />
              </div>
            </div>
            <div
              className="absolute inset-0"
              style={{ clipPath: "inset(0 0 0 var(--hero-mask-x, 50vw))" }}
            >
              <div className="absolute left-1/2 top-1/2 h-[min(76vh,34rem)] w-[min(52vw,31rem)] -translate-x-1/2 -translate-y-1/2 text-white/92">
                <RadiantHeroLogo className="size-full drop-shadow-[0_18px_40px_rgba(8,7,6,0.12)]" />
              </div>
            </div>
          </div>

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

          <div
            ref={serviceHeaderRef}
            className="pointer-events-none absolute inset-x-0 top-0 z-30 opacity-0 will-change-transform"
          >
            <div className="site-gutter mx-auto max-w-384 pt-20">
              <div className="max-w-[34rem]">
                <p className="text-base font-medium tracking-[0.24em] text-[#27272A] uppercase">
                  {content.services.eyebrow}
                </p>
                <h2 className="mt-4 font-heading text-[clamp(3rem,5vw,4.75rem)] leading-[0.94] tracking-[-0.06em] text-[#27272A]">
                  {content.services.title}
                </h2>
                <p className="mt-5 max-w-[33rem] text-[1rem] leading-7 text-[#27272A]">
                  {content.services.intro}
                </p>
              </div>
            </div>
          </div>

          <div
            ref={activeServiceCopyShellRef}
            className="pointer-events-none absolute inset-x-0 top-0 z-30 opacity-0 will-change-transform"
          >
            <div className="site-gutter mx-auto max-w-384">
              <div className="relative mx-auto w-[clamp(25.5rem,32vw,31rem)]">
                {content.services.items.map((item, index) => (
                  <div
                    key={`${item.title}-copy`}
                    ref={(node) => {
                      serviceCopyRefs.current[index] = node;
                    }}
                    className="absolute left-0 top-0 w-full opacity-0"
                  >
                    <ServiceCopy
                      className="max-w-[26rem] gap-3"
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

          <div className="pointer-events-none absolute inset-0">
            <div
              ref={sampleTileRef}
              className="absolute left-0 top-0 z-10 aspect-video w-[clamp(25.5rem,32vw,31rem)] overflow-hidden rounded-[2.2rem] border border-white/20 opacity-0 shadow-[0_28px_90px_-42px_rgba(17,12,9,0.35)]"
            >
              <ServiceTile
                className="size-full rounded-[inherit] border-0 shadow-none"
                variant={serviceVisuals[1]}
              />
            </div>

            {content.services.items.slice(1).map((item, index) => (
              <div
                key={item.title}
                ref={(node) => {
                  serviceCardsRef.current[index] = node;
                }}
                className="absolute left-0 top-0 z-20 aspect-video w-[clamp(25.5rem,32vw,31rem)] overflow-hidden rounded-[2.2rem] border border-white/20 opacity-0 shadow-[0_28px_90px_-42px_rgba(17,12,9,0.35)] will-change-transform"
                style={{ transformOrigin: "top center" }}
              >
                <ServiceTile
                  className="size-full rounded-[inherit] border-0 shadow-none"
                  variant={serviceVisuals[(index + 1) % serviceVisuals.length]}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <ReducedMotionDesktopShowcase content={content} />

      <div className="site-gutter py-16 md:hidden">
        <div className="grid grid-cols-2 gap-4">
          {content.services.items.map((item, index) => (
            <ServiceCard
              key={`${item.title}-mobile`}
              className="gap-3"
              description={item.description}
              eyebrow={item.eyebrow}
              hideEyebrow
              tileClassName="rounded-[10px]"
              title={item.title}
              titleClassName="text-[1.2rem] leading-[1.06]"
              variant={serviceVisuals[index % serviceVisuals.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
