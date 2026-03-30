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
  heroMatteRef: RadiantExperienceRefs["heroMatteRef"];
  heroMediaRef: RadiantExperienceRefs["heroMediaRef"];
  heroTitleRef: RadiantExperienceRefs["heroTitleRef"];
  heroMonogramRef: RadiantExperienceRefs["heroMonogramRef"];
  heroLocationsRef: RadiantExperienceRefs["heroLocationsRef"];
  heroMarqueeRef: RadiantExperienceRefs["heroMarqueeRef"];
  heroMarqueeTrackRef: RadiantExperienceRefs["heroMarqueeTrackRef"];
  activeServiceCopyShellRef: RadiantExperienceRefs["activeServiceCopyShellRef"];
  serviceHeaderRef: RadiantExperienceRefs["serviceHeaderRef"];
  serviceCardsRef: RadiantExperienceRefs["serviceCardsRef"];
  serviceCopyRefs: RadiantExperienceRefs["serviceCopyRefs"];
  sampleTileRef: RadiantExperienceRefs["sampleTileRef"];
};

export function RadiantShowcaseSection({
  content,
  showcaseSectionRef,
  heroMatteRef,
  heroMediaRef,
  heroTitleRef,
  heroMonogramRef,
  heroLocationsRef,
  heroMarqueeRef,
  heroMarqueeTrackRef,
  activeServiceCopyShellRef,
  serviceHeaderRef,
  serviceCardsRef,
  serviceCopyRefs,
  sampleTileRef,
}: RadiantShowcaseSectionProps) {
  return (
    <>
      <section
        id="showcase"
        ref={showcaseSectionRef}
        className="relative min-h-svh md:h-[660svh]"
        style={{ "--hero-mask-x": "50vw" } as CSSProperties}
      >
        <div className="relative min-h-svh overflow-clip pt-24 md:sticky md:top-0 md:h-svh md:pt-0">
          <div className="absolute inset-0 hidden bg-[#f6f1eb] md:block" />
          <div className="absolute inset-0 md:hidden">
            <VisualSurface
              className="size-full rounded-none"
              innerClassName="scale-[1.12]"
              variant="noir"
            />
            <div className="absolute inset-0 bg-black/46" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,8,0.22)_0%,rgba(7,7,8,0.42)_38%,rgba(7,7,8,0.74)_100%)]" />
            <div className="absolute left-[-12%] top-[12%] h-44 w-44 rounded-full bg-[#e6ecef]/12 blur-3xl" />
            <div className="absolute bottom-[-4rem] right-[-8%] h-52 w-52 rounded-full bg-[#9dc9ff]/12 blur-3xl" />
            <div className="absolute inset-x-0 bottom-0 h-[44%] bg-gradient-to-t from-black/76 via-black/42 to-transparent" />
          </div>
          <div
            ref={heroMatteRef}
            className="absolute inset-y-0 left-0 hidden bg-[#f6f1eb] will-change-transform md:block"
          />

          <div
            ref={heroMediaRef}
            className="absolute left-0 top-0 z-10 hidden overflow-hidden will-change-transform md:block"
            style={{ transformOrigin: "top center" }}
          >
            <VisualSurface className="size-full rounded-none" variant="vista" />
          </div>

          <div className="pointer-events-none absolute inset-0 z-20 md:hidden">
            <div className="absolute right-[-24%] top-[10%] h-[21rem] w-[17rem] text-white/12">
              <RadiantHeroLogo className="size-full" />
            </div>
          </div>

          <div
            ref={heroMonogramRef}
            className="pointer-events-none absolute inset-0 z-20 hidden will-change-transform md:block"
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
                className="pointer-events-none absolute left-1/2 top-[49%] hidden -translate-x-1/2 -translate-y-1/2 px-4 md:block"
                style={{ width: "min(calc(100vw - 4rem), 76rem)" }}
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
                className="absolute inset-0 hidden text-[#4c4846] md:block"
                style={{
                  clipPath: "inset(0 calc(100vw - var(--hero-mask-x, 50vw)) 0 0)",
                }}
              >
                <div
                  className="absolute left-1/2 top-[49%] -translate-x-1/2 -translate-y-1/2 px-4"
                  style={{ width: "min(calc(100vw - 4rem), 76rem)" }}
                >
                  <HeroTitleCopy
                    dentistry={content.hero.title.dentistry}
                    esthetic={content.hero.title.esthetic}
                    premium={content.hero.title.premium}
                  />
                </div>
              </div>
              <div
                className="absolute inset-0 hidden text-white md:block"
                style={{ clipPath: "inset(0 0 0 var(--hero-mask-x, 50vw))" }}
              >
                <div
                  className="absolute left-1/2 top-[49%] -translate-x-1/2 -translate-y-1/2 px-4"
                  style={{ width: "min(calc(100vw - 4rem), 76rem)" }}
                >
                  <HeroTitleCopy
                    className="text-shadow-soft"
                    dentistry={content.hero.title.dentistry}
                    esthetic={content.hero.title.esthetic}
                    premium={content.hero.title.premium}
                  />
                </div>
              </div>
              <div className="absolute inset-0 flex flex-col justify-end px-5 pb-8 pt-28 text-white md:hidden sm:px-6">
                <div className="flex max-w-[22rem] flex-col gap-5">
                  <div className="space-y-1.5">
                    <p className="font-heading text-[clamp(3.35rem,14vw,4.75rem)] leading-[0.88] tracking-[-0.065em] text-shadow-soft">
                      {content.hero.title.premium}
                    </p>
                    <p className="font-heading text-[clamp(3.45rem,14.4vw,4.95rem)] leading-[0.84] tracking-[-0.07em] text-shadow-soft">
                      {content.hero.title.esthetic}
                    </p>
                    <p className="font-heading text-[clamp(3.55rem,14.8vw,5.1rem)] leading-[0.8] tracking-[-0.08em] italic text-shadow-soft">
                      {content.hero.title.dentistry}
                    </p>
                  </div>

                  <p className="max-w-[21rem] text-[0.98rem] leading-7 text-white/88">
                    {content.hero.promise}
                  </p>

                  <div className="h-px w-16 bg-white/22" />

                  <div className="space-y-3">
                    <p className="text-[0.72rem] font-medium tracking-[0.2em] text-white/58 uppercase">
                      {content.brand.focusLabel}
                    </p>
                    <div className="space-y-1 text-[1rem] font-medium leading-6 text-white">
                      {content.brand.focusItems.map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </div>
                  </div>

                  <p className="max-w-[21rem] text-sm leading-6 text-white/70">
                    {content.hero.supporting}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={heroLocationsRef}
            className="absolute bottom-6 left-4 z-30 hidden max-w-[16rem] text-xs tracking-tight text-foreground sm:left-6 lg:left-8 md:bottom-8 md:block"
          >
            <p className="mb-2 text-muted-foreground">
              {content.brand.focusLabel}
            </p>
            <div className="font-medium leading-4">
              {content.brand.focusItems.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-foreground/88">
              {content.hero.promise}
            </p>
            <p className="mt-3 text-[0.72rem] leading-5 text-muted-foreground">
              {content.hero.supporting}
            </p>
          </div>

          <div
            ref={heroMarqueeRef}
            className="pointer-events-none absolute inset-0 z-40 hidden items-center opacity-0 md:flex"
          >
            <div
              ref={heroMarqueeTrackRef}
              className="font-heading whitespace-nowrap px-[8vw] text-[clamp(6rem,10vw,10rem)] leading-none tracking-[-0.08em] text-white text-shadow-soft italic will-change-transform"
            >
              {content.hero.marquee}
            </div>
          </div>

          <div
            ref={serviceHeaderRef}
            className="pointer-events-none absolute inset-x-0 top-0 z-30 hidden opacity-0 will-change-transform md:block"
          >
            <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
              <h2 className="font-heading text-[clamp(2.45rem,4vw,4.15rem)] leading-none tracking-[-0.07em]">
                {content.services.title}
              </h2>
            </div>
          </div>

          <div
            ref={activeServiceCopyShellRef}
            className="pointer-events-none absolute inset-x-0 top-0 z-30 hidden opacity-0 will-change-transform md:block"
          >
            <div className="relative mx-auto h-[16rem] w-[min(92vw,42rem)]">
              {content.services.items.map((item, index) => (
                <div
                  key={`${item.title}-desktop-copy`}
                  ref={(node) => {
                    serviceCopyRefs.current[index] = node;
                  }}
                  className="absolute inset-0 text-center opacity-0 will-change-transform"
                >
                  <ServiceCopy
                    className="items-center"
                    description={item.description}
                    eyebrow={item.eyebrow}
                    title={item.title}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 hidden md:block">
            <div
              ref={sampleTileRef}
              className="absolute left-0 top-0 z-10 aspect-[1.24/1] w-[clamp(25.5rem,32vw,31rem)] overflow-hidden rounded-[2.2rem] border border-white/20 opacity-0 shadow-[0_28px_90px_-42px_rgba(17,12,9,0.35)]"
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
                className="absolute left-0 top-0 z-20 aspect-[1.24/1] w-[clamp(25.5rem,32vw,31rem)] overflow-hidden rounded-[2.2rem] border border-white/20 opacity-0 shadow-[0_28px_90px_-42px_rgba(17,12,9,0.35)] will-change-transform"
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
      </section>

      <section className="px-4 py-16 md:hidden">
        <div className="flex flex-col gap-5">
          <p className="text-[0.72rem] font-medium tracking-[0.18em] text-muted-foreground uppercase">
            {content.services.eyebrow}
          </p>
          <h2 className="font-heading text-[3rem] leading-none tracking-[-0.07em]">
            {content.services.title}
          </h2>
          <p className="text-sm leading-7 text-muted-foreground">
            {content.services.intro}
          </p>
        </div>
        <div className="mt-10 grid gap-6">
          {content.services.items.map((item, index) => (
            <ServiceCard
              key={`${item.title}-mobile`}
              description={item.description}
              eyebrow={item.eyebrow}
              title={item.title}
              variant={serviceVisuals[index % serviceVisuals.length]}
            />
          ))}
        </div>
      </section>
    </>
  );
}
