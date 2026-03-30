import type { RadiantExperienceContent, RadiantExperienceRefs } from "./radiant-experience.types";
import { CharacterRevealText } from "./radiant-experience-shared";

type RadiantAboutSectionProps = {
  content: RadiantExperienceContent;
  aboutSectionRef: RadiantExperienceRefs["aboutSectionRef"];
  aboutContentRef: RadiantExperienceRefs["aboutContentRef"];
  aboutCharRefs: RadiantExperienceRefs["aboutCharRefs"];
};

export function RadiantAboutSection({
  content,
  aboutSectionRef,
  aboutContentRef,
  aboutCharRefs,
}: RadiantAboutSectionProps) {
  return (
    <section id="about" className="relative isolate z-40 bg-background">
      <div
        ref={aboutSectionRef}
        className="site-gutter w-full"
      >
        <div
          ref={aboutContentRef}
          className="flex min-h-[max(36rem,calc(100svh-5rem))] w-full flex-col items-center justify-center py-16 text-center md:py-20 lg:py-24"
        >
          <p className="text-[20px] font-bold tracking-[0.14em] text-muted-foreground uppercase">
            {content.about.eyebrow}
          </p>

          <div className="mt-8 md:hidden">
            <p className="w-full font-inika text-[2rem] font-bold leading-[1.14] tracking-[-0.045em] text-foreground/90 sm:text-[2.35rem]">
              {content.about.body}
            </p>
          </div>

          <div className="mt-8 hidden md:block">
            <CharacterRevealText
              charRefs={aboutCharRefs}
              className="w-full font-inika text-[40px] font-bold leading-[1.08] tracking-[-0.045em] lg:text-[44px]"
              text={content.about.body}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
