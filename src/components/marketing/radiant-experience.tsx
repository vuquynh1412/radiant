"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ArrowUpToLineIcon, PhoneCallIcon } from "lucide-react";
import { useLocale, useMessages } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Locale } from "@/i18n/config";
import { getHomePageContent } from "@/i18n/get-homepage-content";
import type { AppMessages } from "@/i18n/messages";

import { cn } from "@/lib/utils";
import { radiantSocialLinks, radiantSupportLinks } from "./radiant-social-links";
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
import { RadiantNewsSection } from "./radiant-news-section";
import { RadiantPartnerLogosSection } from "./radiant-partner-logos-section";
import { RadiantProjectsSection } from "./radiant-projects-section";
import { ZaloLogoIcon } from "./radiant-experience-shared";
import { RadiantShowcaseSection } from "./radiant-showcase-section";
import { useRadiantCapabilityMatrixMotion } from "./use-radiant-capability-matrix-motion";
import { useRadiantShowcaseMotion } from "./use-radiant-showcase-motion";

gsap.registerPlugin(ScrollTrigger);

function MessengerLogoIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 3.75c-4.83 0-8.75 3.57-8.75 7.98 0 2.52 1.28 4.77 3.28 6.24v3.78l3.63-2c.59.16 1.2.24 1.84.24 4.83 0 8.75-3.57 8.75-7.98S16.83 3.75 12 3.75Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="m8.72 13.56 2.53-2.69 2.1 1.77 2.08-2.21"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function RadiantStickySupportButtons({
  isScrolling,
  hotlineHref,
  hotlineLabel,
  messengerHref,
  messengerLabel,
  zaloHref,
  zaloLabel,
}: {
  isScrolling: boolean;
  hotlineHref: string;
  hotlineLabel: string;
  messengerHref: string;
  messengerLabel: string;
  zaloHref: string;
  zaloLabel: string;
}) {
  const items = [
    {
      href: hotlineHref,
      icon: <PhoneCallIcon className="size-4.5 stroke-[2]" />,
      label: hotlineLabel,
    },
    {
      href: messengerHref,
      icon: <MessengerLogoIcon className="size-4.5" />,
      label: messengerLabel,
    },
    {
      href: zaloHref,
      icon: <ZaloLogoIcon className="size-4.5" />,
      label: zaloLabel,
    },
  ];

  return (
    <div
      className={cn(
        "fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-[max(1rem,env(safe-area-inset-left))] z-40 flex flex-col items-start gap-2.5 transition-opacity duration-250 ease-out sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))] sm:left-[max(1.5rem,env(safe-area-inset-left))]",
        isScrolling ? "opacity-50" : "opacity-100",
      )}
    >
      {items.map((item) => (
        <a
          key={item.label}
          aria-label={item.label}
          className="group flex h-11 items-center overflow-hidden rounded-full border border-secondary/70 bg-secondary/14 text-secondary shadow-[0_16px_40px_-24px_rgba(39,24,9,0.35)] backdrop-blur-[8px] transition-[background-color,border-color,box-shadow,color] duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-primary hover:bg-primary hover:text-secondary hover:shadow-[0_18px_44px_-20px_rgba(140,87,37,0.55)] focus-visible:border-primary focus-visible:bg-primary focus-visible:text-secondary focus-visible:ring-3 focus-visible:ring-ring/50"
          href={item.href}
          rel={item.href.startsWith("http") ? "noreferrer" : undefined}
          target={item.href.startsWith("http") ? "_blank" : undefined}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center">
            {item.icon}
          </span>
          <span className="pointer-events-none max-w-0 overflow-hidden pr-0 text-sm font-medium tracking-[0.02em] whitespace-nowrap opacity-0 translate-x-2 transition-[max-width,padding,opacity,transform] duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-w-28 group-hover:pr-4 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:max-w-28 group-focus-visible:pr-4 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
            {item.label}
          </span>
        </a>
      ))}
    </div>
  );
}

function RadiantBackToTopButton({
  isScrolling,
  label,
  onPress,
}: {
  isScrolling: boolean;
  label: string;
  onPress: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > 320);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateVisibility);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onPress}
      className={cn(
        "fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 flex size-12 items-center justify-center rounded-full border border-secondary/70 bg-secondary/14 text-secondary shadow-[0_16px_40px_-24px_rgba(39,24,9,0.35)] backdrop-blur-[8px] transition-all duration-300 ease-out hover:border-primary hover:bg-primary hover:text-secondary hover:shadow-[0_18px_44px_-20px_rgba(140,87,37,0.55)] focus-visible:border-primary focus-visible:bg-primary focus-visible:text-secondary focus-visible:ring-3 focus-visible:ring-ring/50 sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))] sm:right-[max(1.5rem,env(safe-area-inset-right))]",
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
        isVisible && isScrolling ? "opacity-50" : undefined,
      )}
    >
      <ArrowUpToLineIcon className="size-5 stroke-[2.25]" />
    </button>
  );
}

export function RadiantExperience({ }: RadiantExperienceProps) {
  const locale = useLocale() as Locale;
  const messages = useMessages() as AppMessages;
  const content = getHomePageContent(locale, messages);
  const [isBooting, setIsBooting] = useState(true);
  const [matrixRevealComplete, setMatrixRevealComplete] = useState(false);
  const [showcaseDesktopReady, setShowcaseDesktopReady] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const onMatrixRevealComplete = useCallback(() => {
    setMatrixRevealComplete(true);
  }, []);
  const onShowcaseDesktopReady = useCallback(() => {
    setShowcaseDesktopReady(true);
  }, []);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const showcaseSectionRef = useRef<HTMLDivElement | null>(null);
  const mobileHeroSectionRef = useRef<HTMLDivElement | null>(null);
  const mobileHeroMarqueeRef = useRef<HTMLParagraphElement | null>(null);
  const mobileHeroTopContentRef = useRef<HTMLDivElement | null>(null);
  const mobileHeroTopOverlayRef = useRef<HTMLDivElement | null>(null);
  const heroMatteRef = useRef<HTMLDivElement | null>(null);
  const heroMediaRef = useRef<HTMLDivElement | null>(null);
  const heroMediaFrameRef = useRef<HTMLDivElement | null>(null);
  const heroFinalImageRef = useRef<HTMLDivElement | null>(null);
  const heroTitleRef = useRef<HTMLDivElement | null>(null);
  const heroMonogramRef = useRef<HTMLDivElement | null>(null);
  const heroTopPatternRef = useRef<HTMLDivElement | null>(null);
  const heroMarqueeRef = useRef<HTMLDivElement | null>(null);
  const heroMarqueeTrackRef = useRef<HTMLDivElement | null>(null);
  const heroFinalMarqueeRef = useRef<HTMLDivElement | null>(null);
  const heroFinalMarqueeTrackRef = useRef<HTMLDivElement | null>(null);
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
    lenisRef.current = lenis;

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
      lenisRef.current = null;
      gsap.ticker.remove(advanceLenis);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.off("scroll", onScroll);
      lenis.destroy();
    };
  }, [isBooting]);

  useEffect(() => {
    let scrollStopTimer = 0;

    const handleScrollActivity = () => {
      setIsScrolling(true);
      window.clearTimeout(scrollStopTimer);
      scrollStopTimer = window.setTimeout(() => {
        setIsScrolling(false);
      }, 140);
    };

    window.addEventListener("scroll", handleScrollActivity, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScrollActivity);
      window.clearTimeout(scrollStopTimer);
    };
  }, []);

  useRadiantShowcaseMotion({
    content,
    onReady: onShowcaseDesktopReady,
    refs: motionRefs,
  });
  useRadiantCapabilityMatrixMotion({ refs: motionRefs, onRevealComplete: onMatrixRevealComplete });

  const handleBackToTop = useCallback(() => {
    lenisRef.current?.scrollTo(0, { duration: 1 });

    if (!lenisRef.current) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const backToTopLabel =
    locale === "vi" ? "Cuộn lên đầu trang" : "Back to top";
  const hotlineHref = `tel:${content.footer.contact.phone.replace(/\s+/g, "")}`;
  const messengerHref = radiantSocialLinks.messenger || "#contact";
  const zaloHref = radiantSupportLinks.zalo || "#contact";
  const hotlineLabel = locale === "vi" ? "Hotline" : "Hotline";
  const messengerLabel = "Messenger";
  const zaloLabel = "Zalo";

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
            desktopShowcaseReady={showcaseDesktopReady}
            mobileHeroMarqueeRef={mobileHeroMarqueeRef}
            mobileHeroSectionRef={mobileHeroSectionRef}
            mobileHeroTopContentRef={mobileHeroTopContentRef}
            mobileHeroTopOverlayRef={mobileHeroTopOverlayRef}
            heroMediaFrameRef={heroMediaFrameRef}
            heroFinalImageRef={heroFinalImageRef}
            heroMarqueeRef={heroMarqueeRef}
            heroMarqueeTrackRef={heroMarqueeTrackRef}
            heroFinalMarqueeRef={heroFinalMarqueeRef}
            heroFinalMarqueeTrackRef={heroFinalMarqueeTrackRef}
            heroMatteRef={heroMatteRef}
            heroMediaRef={heroMediaRef}
            heroMonogramRef={heroMonogramRef}
            heroTopPatternRef={heroTopPatternRef}
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
          <RadiantNewsSection content={content} />
          <RadiantCallToActionSection content={content} />
          <RadiantFooterSection content={content} />
        </main>
      </div>

      <RadiantExperienceSplash isVisible={isBooting} />
      <RadiantStickySupportButtons
        isScrolling={isScrolling}
        hotlineHref={hotlineHref}
        hotlineLabel={hotlineLabel}
        messengerHref={messengerHref}
        messengerLabel={messengerLabel}
        zaloHref={zaloHref}
        zaloLabel={zaloLabel}
      />
      <RadiantBackToTopButton
        isScrolling={isScrolling}
        label={backToTopLabel}
        onPress={handleBackToTop}
      />
    </div>
  );
}
