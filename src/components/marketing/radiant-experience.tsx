"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useLocale, useMessages } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Locale } from "@/i18n/config";
import { getHomePageContent } from "@/i18n/get-homepage-content";
import type { AppMessages } from "@/i18n/messages";

import { cn } from "@/lib/utils";
import { RadiantAboutSection } from "./radiant-about-section";
import { RadiantCapabilityMatrixSection } from "./radiant-capability-matrix-section";
import { RadiantCallToActionSection } from "./radiant-cta-section";
import { RadiantExperienceHeader } from "./radiant-experience-header";
import { RadiantExperienceSplash } from "./radiant-experience-splash";
import type {
  RadiantExperienceProps,
  RadiantExperienceRefs,
} from "./radiant-experience.types";
import { RadiantFooterSection } from "./radiant-footer-section";
import { RadiantPartnerLogosSection } from "./radiant-partner-logos-section";
import { RadiantProjectsSection } from "./radiant-projects-section";
import { RadiantShowcaseSection } from "./radiant-showcase-section";
import { useRadiantCapabilityMatrixMotion } from "./use-radiant-capability-matrix-motion";
import { useRadiantShowcaseMotion } from "./use-radiant-showcase-motion";

gsap.registerPlugin(ScrollTrigger);

export function RadiantExperience({ }: RadiantExperienceProps) {
  const locale = useLocale() as Locale;
  const messages = useMessages() as AppMessages;
  const content = getHomePageContent(locale, messages);
  const [isBooting, setIsBooting] = useState(true);
  const [matrixRevealComplete, setMatrixRevealComplete] = useState(false);
  const onMatrixRevealComplete = useCallback(() => {
    setMatrixRevealComplete(true);
  }, []);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const showcaseSectionRef = useRef<HTMLDivElement | null>(null);
  const mobileHeroSectionRef = useRef<HTMLDivElement | null>(null);
  const mobileHeroMarqueeRef = useRef<HTMLParagraphElement | null>(null);
  const mobileHeroTopContentRef = useRef<HTMLDivElement | null>(null);
  const mobileHeroTopOverlayRef = useRef<HTMLDivElement | null>(null);
  const heroMatteRef = useRef<HTMLDivElement | null>(null);
  const heroMediaRef = useRef<HTMLDivElement | null>(null);
  const heroTitleRef = useRef<HTMLDivElement | null>(null);
  const heroMonogramRef = useRef<HTMLDivElement | null>(null);
  const heroMarqueeRef = useRef<HTMLDivElement | null>(null);
  const heroMarqueeTrackRef = useRef<HTMLDivElement | null>(null);
  const activeServiceCopyShellRef = useRef<HTMLDivElement | null>(null);
  const serviceGridShellRef = useRef<HTMLDivElement | null>(null);
  const serviceHeaderRef = useRef<HTMLDivElement | null>(null);
  const serviceGridFooterRef = useRef<HTMLDivElement | null>(null);
  const serviceGridItemRefs = useRef<Array<HTMLElement | null>>([]);
  const serviceCardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const serviceCopyRefs = useRef<Array<HTMLDivElement | null>>([]);
  const sampleTileRef = useRef<HTMLDivElement | null>(null);
  const aboutSectionRef = useRef<HTMLDivElement | null>(null);
  const aboutContentRef = useRef<HTMLDivElement | null>(null);
  const aboutCharRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const capabilityMatrixSectionRef = useRef<HTMLElement | null>(null);
  const projectsSectionRef = useRef<HTMLElement | null>(null);
  const capabilityMatrixContentRef = useRef<HTMLDivElement | null>(null);
  const capabilityMatrixTopTickerRef = useRef<HTMLDivElement | null>(null);
  const capabilityMatrixBottomTickerRef = useRef<HTMLDivElement | null>(null);

  const motionRefs: RadiantExperienceRefs = {
    rootRef,
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
    aboutSectionRef,
    aboutContentRef,
    aboutCharRefs,
    capabilityMatrixSectionRef,
    projectsSectionRef,
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

  useEffect(() => {
    if (
      isBooting ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const useTouchSync =
      ScrollTrigger.isTouch !== 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    const lenis = new Lenis({
      anchors: true,
      duration: useTouchSync ? 1.05 : 1.15,
      smoothWheel: true,
      syncTouch: useTouchSync,
      syncTouchLerp: 0.12,
      touchMultiplier: useTouchSync ? 0.85 : 1,
      wheelMultiplier: useTouchSync ? 0.85 : 1,
    });

    const onScroll = () => {
      ScrollTrigger.update();
    };

    // Keep Lenis on the same clock as GSAP so scroll inertia and scrubbed
    // animations stay visually aligned.
    const advanceLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", onScroll);
    // Lenis recommends disabling GSAP's lag smoothing so ScrollTrigger
    // doesn't visually "catch up" after a dropped frame.
    gsap.ticker.lagSmoothing(0);
    gsap.ticker.add(advanceLenis);

    return () => {
      gsap.ticker.remove(advanceLenis);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.off("scroll", onScroll);
      lenis.destroy();
    };
  }, [isBooting]);

  useRadiantShowcaseMotion({ content, refs: motionRefs });
  useRadiantCapabilityMatrixMotion({ refs: motionRefs, onRevealComplete: onMatrixRevealComplete });

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
            mobileHeroMarqueeRef={mobileHeroMarqueeRef}
            mobileHeroSectionRef={mobileHeroSectionRef}
            mobileHeroTopContentRef={mobileHeroTopContentRef}
            mobileHeroTopOverlayRef={mobileHeroTopOverlayRef}
            heroMarqueeRef={heroMarqueeRef}
            heroMarqueeTrackRef={heroMarqueeTrackRef}
            heroMatteRef={heroMatteRef}
            heroMediaRef={heroMediaRef}
            heroMonogramRef={heroMonogramRef}
            heroTitleRef={heroTitleRef}
            sampleTileRef={sampleTileRef}
            serviceCardsRef={serviceCardsRef}
            serviceCopyRefs={serviceCopyRefs}
            serviceGridFooterRef={serviceGridFooterRef}
            serviceGridItemRefs={serviceGridItemRefs}
            serviceGridShellRef={serviceGridShellRef}
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
            bubblesEnabled={matrixRevealComplete}
            capabilityMatrixBottomTickerRef={capabilityMatrixBottomTickerRef}
            capabilityMatrixContentRef={capabilityMatrixContentRef}
            capabilityMatrixSectionRef={capabilityMatrixSectionRef}
            capabilityMatrixTopTickerRef={capabilityMatrixTopTickerRef}
            content={content}
          />
          <RadiantProjectsSection
            content={content}
            projectsSectionRef={projectsSectionRef}
          />
          <RadiantPartnerLogosSection />
          <RadiantCallToActionSection content={content} />
          <RadiantFooterSection content={content} />
        </main>
      </div>

      <RadiantExperienceSplash isVisible={isBooting} />
    </div>
  );
}
