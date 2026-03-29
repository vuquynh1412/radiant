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
      <div ref={aboutSectionRef} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          ref={aboutContentRef}
          className="w-full py-14 sm:py-16 md:py-20 lg:py-24"
        >
          <p className="text-[0.72rem] font-medium tracking-[0.18em] text-muted-foreground uppercase">
            {content.about.eyebrow}
          </p>
          <h2 className="mt-6 max-w-5xl font-heading text-[clamp(2.7rem,5vw,5.6rem)] leading-[0.92] tracking-[-0.07em]">
            {content.about.title}
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-[1.3rem]">
            {content.about.intro}
          </p>

          <div className="mt-10 md:hidden">
            <p className="max-w-5xl font-heading text-[1.8rem] leading-[1.12] tracking-[-0.04em] text-foreground/90">
              {content.about.body}
            </p>
          </div>

          <div className="mt-12 hidden md:block">
            <CharacterRevealText
              charRefs={aboutCharRefs}
              className="max-w-5xl font-heading text-[clamp(2rem,3.1vw,3rem)] leading-[1.08] tracking-[-0.04em]"
              text={content.about.body}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
