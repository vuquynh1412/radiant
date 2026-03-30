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
          className="flex min-h-[max(36rem,calc(100svh-5rem))] w-full flex-col items-center justify-center py-8 text-center md:py-20 lg:py-24"
        >
          <p className="text-[0.9rem] md:text-[1.2rem] font-bold tracking-[0.14em] text-muted-foreground uppercase">
            {content.about.eyebrow}
          </p>

          <div className="mt-8">
            <CharacterRevealText
              charRefs={aboutCharRefs}
              className="w-full font-inika text-[1.5rem] font-bold leading-[1.14] tracking-[-0.045em] text-foreground/90 md:text-[40px] md:leading-[1.08] lg:text-[44px]"
              text={content.about.body}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
