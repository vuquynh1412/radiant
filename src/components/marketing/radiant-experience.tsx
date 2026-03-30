"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useMessages } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { Locale } from "@/i18n/config";
import { getHomePageContent } from "@/i18n/get-homepage-content";
import type { AppMessages } from "@/i18n/messages";

import { RadiantAboutSection } from "./radiant-about-section";
import { RadiantCapabilityMatrixSection } from "./radiant-capability-matrix-section";
import { RadiantCallToActionSection } from "./radiant-cta-section";
import { RadiantExperienceHeader } from "./radiant-experience-header";
import { RadiantExperienceSplash } from "./radiant-experience-splash";
import { RadiantFooterSection } from "./radiant-footer-section";
import { RadiantPlansSection } from "./radiant-plans-section";
import { RadiantProjectsSection } from "./radiant-projects-section";
import { RadiantShowcaseSection } from "./radiant-showcase-section";
import type {
  RadiantExperienceProps,
  RadiantExperienceRefs,
} from "./radiant-experience.types";
import { useRadiantCapabilityMatrixMotion } from "./use-radiant-capability-matrix-motion";
import { useRadiantShowcaseMotion } from "./use-radiant-showcase-motion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function RadiantExperience({ }: RadiantExperienceProps) {
  const locale = useLocale() as Locale;
  const messages = useMessages() as AppMessages;
  const content = getHomePageContent(locale, messages);
  const [isBooting, setIsBooting] = useState(true);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const showcaseSectionRef = useRef<HTMLElement | null>(null);
  const heroMatteRef = useRef<HTMLDivElement | null>(null);
  const heroMediaRef = useRef<HTMLDivElement | null>(null);
  const heroTitleRef = useRef<HTMLDivElement | null>(null);
  const heroMonogramRef = useRef<HTMLDivElement | null>(null);
  const heroLocationsRef = useRef<HTMLDivElement | null>(null);
  const heroMarqueeRef = useRef<HTMLDivElement | null>(null);
  const heroMarqueeTrackRef = useRef<HTMLDivElement | null>(null);
  const activeServiceCopyShellRef = useRef<HTMLDivElement | null>(null);
  const serviceHeaderRef = useRef<HTMLDivElement | null>(null);
  const serviceCardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const serviceCopyRefs = useRef<Array<HTMLDivElement | null>>([]);
  const sampleTileRef = useRef<HTMLDivElement | null>(null);
  const aboutSectionRef = useRef<HTMLDivElement | null>(null);
  const aboutContentRef = useRef<HTMLDivElement | null>(null);
  const aboutCharRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const capabilityMatrixSectionRef = useRef<HTMLElement | null>(null);
  const capabilityMatrixContentRef = useRef<HTMLDivElement | null>(null);
  const capabilityMatrixTopTickerRef = useRef<HTMLDivElement | null>(null);
  const capabilityMatrixBottomTickerRef = useRef<HTMLDivElement | null>(null);

  const motionRefs: RadiantExperienceRefs = {
    rootRef,
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
    aboutSectionRef,
    aboutContentRef,
    aboutCharRefs,
    capabilityMatrixSectionRef,
    capabilityMatrixContentRef,
    capabilityMatrixTopTickerRef,
    capabilityMatrixBottomTickerRef,
  };

  useEffect(() => {
    ScrollTrigger.config({
      ignoreMobileResize: true,
      limitCallbacks: true,
    });
  }, []);

  useEffect(() => {
    let isCancelled = false;
    let hasRevealed = false;
    let firstFrame = 0;
    let secondFrame = 0;

    const reveal = () => {
      if (hasRevealed) {
        return;
      }

      hasRevealed = true;
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          if (!isCancelled) {
            setIsBooting(false);
          }
        });
      });
    };

    if ("fonts" in document) {
      void document.fonts.ready.finally(() => {
        reveal();
      });
    } else {
      reveal();
    }

    return () => {
      isCancelled = true;
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, []);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    if (isBooting) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isBooting]);

  useRadiantShowcaseMotion({ content, refs: motionRefs });
  useRadiantCapabilityMatrixMotion({ refs: motionRefs });

  return (
    <div ref={rootRef} className="bg-background text-foreground">
      <div
        aria-hidden={isBooting}
        className={cn(
          "transition-opacity duration-500",
          isBooting ? "opacity-0" : "opacity-100",
        )}
      >
        <RadiantExperienceHeader content={content} />

        <main className="overflow-clip">
          <RadiantShowcaseSection
            activeServiceCopyShellRef={activeServiceCopyShellRef}
            content={content}
            heroLocationsRef={heroLocationsRef}
            heroMarqueeRef={heroMarqueeRef}
            heroMarqueeTrackRef={heroMarqueeTrackRef}
            heroMatteRef={heroMatteRef}
            heroMediaRef={heroMediaRef}
            heroMonogramRef={heroMonogramRef}
            heroTitleRef={heroTitleRef}
            sampleTileRef={sampleTileRef}
            serviceCardsRef={serviceCardsRef}
            serviceCopyRefs={serviceCopyRefs}
            serviceHeaderRef={serviceHeaderRef}
            showcaseSectionRef={showcaseSectionRef}
          />
          <RadiantAboutSection
            aboutCharRefs={aboutCharRefs}
            aboutContentRef={aboutContentRef}
            aboutSectionRef={aboutSectionRef}
            content={content}
          />
          <RadiantCapabilityMatrixSection
            capabilityMatrixBottomTickerRef={capabilityMatrixBottomTickerRef}
            capabilityMatrixContentRef={capabilityMatrixContentRef}
            capabilityMatrixSectionRef={capabilityMatrixSectionRef}
            capabilityMatrixTopTickerRef={capabilityMatrixTopTickerRef}
            content={content}
          />
          <RadiantProjectsSection content={content} />
          <RadiantPlansSection content={content} />
          <RadiantCallToActionSection content={content} />
          <RadiantFooterSection content={content} />
        </main>
      </div>

      <RadiantExperienceSplash isVisible={isBooting} />
    </div>
  );
}
