import type {
  RadiantExperienceContent,
  RadiantExperienceRefs,
} from "./radiant-experience.types";
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
  const aboutBodyText = content.about.body.replace(/\s*[—–-]\s*/g, ", ");

  return (
    <section id="about" className="relative isolate z-40 bg-[#F9F0E8]">
      <div
        ref={aboutSectionRef}
        className="site-gutter flex w-full justify-center py-4 md:py-6 lg:p-10"
      >
        <div
          ref={aboutContentRef}
          className="flex min-h-[max(36rem,calc(100svh-5rem))] w-full flex-col items-center justify-center py-8 text-center md:py-20 lg:py-24"
        >
          <div className="w-full h-full rounded-[24px] border border-secondary md:rounded-[32px] md:p-30 lg:rounded-[40px] justify-center items-center flex">
            <CharacterRevealText
              charRefs={aboutCharRefs}
              className="w-full text-[1.5rem] font-bold leading-[1.14] text-[#27272A] md:text-[40px] md:leading-[1.08] lg:text-[44px]"
              text={aboutBodyText}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
