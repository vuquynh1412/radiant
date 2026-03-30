"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { getRadiantScrollProfile } from "./radiant-scroll-profiles";
import type { RadiantExperienceRefs } from "./radiant-experience.types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type UseRadiantCapabilityMatrixMotionProps = {
  refs: RadiantExperienceRefs;
};

const capabilityMatrixBackground = "#e9ddd1";
const projectsBackground = "#171614";
const matrixLightDivider = "rgba(212,196,181,0.75)";
const matrixDarkDivider = "rgba(245,241,232,0.14)";
const matrixLightLabel = "rgba(140,87,37,0.2)";
const matrixDarkLabel = "rgba(245,241,232,0.18)";
const matrixLightTicker = "rgba(140,87,37,0.8)";
const matrixDarkTicker = "rgba(245,241,232,0.72)";
const projectsLightEyebrow = "rgba(39,39,42,0.46)";
const projectsDarkEyebrow = "rgba(245,241,232,0.46)";
const projectsLightButtonBorder = "rgba(39,39,42,0.38)";
const projectsDarkButtonBorder = "rgba(245,241,232,0.34)";
const projectsLightButtonHover = "rgba(39,39,42,0.04)";
const projectsDarkButtonHover = "rgba(245,241,232,0.06)";
const projectsLightButtonText = "#27272A";
const projectsDarkButtonText = "#f5f1e8";
const projectsLightCardTitle = "#27272A";
const projectsDarkCardTitle = "#f8f3eb";
const projectsLightFilterActive = "#27272A";
const projectsDarkFilterActive = "#f5f1e8";
const projectsLightFilterHover = "rgba(39,39,42,0.78)";
const projectsDarkFilterHover = "rgba(245,241,232,0.78)";
const projectsLightFilterInactive = "rgba(39,39,42,0.44)";
const projectsDarkFilterInactive = "rgba(245,241,232,0.44)";
const projectsLightIntro = "rgba(39,39,42,0.68)";
const projectsDarkIntro = "rgba(245,241,232,0.58)";
const projectsLightTitle = "#27272A";
const projectsDarkTitle = "#f8f3eb";
const projectsThemeSwitchViewportThreshold = 0.68;

export function useRadiantCapabilityMatrixMotion({
  refs,
}: UseRadiantCapabilityMatrixMotionProps) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (
          !refs.capabilityMatrixSectionRef.current ||
          !refs.projectsSectionRef.current ||
          !refs.capabilityMatrixContentRef.current ||
          !refs.capabilityMatrixTopTickerRef.current ||
          !refs.capabilityMatrixBottomTickerRef.current
        ) {
          return undefined;
        }

        const { defaultScrub: scrubAmount } = getRadiantScrollProfile();

        gsap.set(refs.capabilityMatrixContentRef.current, {
          opacity: 0.36,
          y: 72,
        });

        gsap.set(refs.capabilityMatrixTopTickerRef.current, {
          xPercent: 6,
        });
        gsap.set(refs.capabilityMatrixBottomTickerRef.current, {
          xPercent: -6,
        });
        gsap.set(refs.capabilityMatrixSectionRef.current, {
          backgroundColor: capabilityMatrixBackground,
          "--matrix-divider-color": matrixLightDivider,
          "--matrix-label-color": matrixLightLabel,
          "--matrix-ticker-color": matrixLightTicker,
        });
        gsap.set(refs.projectsSectionRef.current, {
          backgroundColor: capabilityMatrixBackground,
          "--projects-button-border-color": projectsLightButtonBorder,
          "--projects-button-hover-bg": projectsLightButtonHover,
          "--projects-button-text-color": projectsLightButtonText,
          "--projects-card-title-color": projectsLightCardTitle,
          "--projects-eyebrow-color": projectsLightEyebrow,
          "--projects-filter-active-color": projectsLightFilterActive,
          "--projects-filter-hover-color": projectsLightFilterHover,
          "--projects-filter-inactive-color": projectsLightFilterInactive,
          "--projects-intro-color": projectsLightIntro,
          "--projects-title-color": projectsLightTitle,
        });

        const applyBoundaryTheme = (isDark: boolean, animate: boolean) => {
          const apply = animate ? gsap.to : gsap.set;

          apply(refs.capabilityMatrixSectionRef.current, {
            backgroundColor: isDark ? projectsBackground : capabilityMatrixBackground,
            "--matrix-divider-color": isDark ? matrixDarkDivider : matrixLightDivider,
            "--matrix-label-color": isDark ? matrixDarkLabel : matrixLightLabel,
            "--matrix-ticker-color": isDark ? matrixDarkTicker : matrixLightTicker,
            duration: animate ? 0.28 : 0,
            ease: "power1.out",
            overwrite: true,
          });

          apply(refs.projectsSectionRef.current, {
            backgroundColor: isDark ? projectsBackground : capabilityMatrixBackground,
            "--projects-button-border-color": isDark
              ? projectsDarkButtonBorder
              : projectsLightButtonBorder,
            "--projects-button-hover-bg": isDark
              ? projectsDarkButtonHover
              : projectsLightButtonHover,
            "--projects-button-text-color": isDark
              ? projectsDarkButtonText
              : projectsLightButtonText,
            "--projects-card-title-color": isDark
              ? projectsDarkCardTitle
              : projectsLightCardTitle,
            "--projects-eyebrow-color": isDark
              ? projectsDarkEyebrow
              : projectsLightEyebrow,
            "--projects-filter-active-color": isDark
              ? projectsDarkFilterActive
              : projectsLightFilterActive,
            "--projects-filter-hover-color": isDark
              ? projectsDarkFilterHover
              : projectsLightFilterHover,
            "--projects-filter-inactive-color": isDark
              ? projectsDarkFilterInactive
              : projectsLightFilterInactive,
            "--projects-intro-color": isDark
              ? projectsDarkIntro
              : projectsLightIntro,
            "--projects-title-color": isDark
              ? projectsDarkTitle
              : projectsLightTitle,
            duration: animate ? 0.28 : 0,
            ease: "power1.out",
            overwrite: true,
          });
        };

        const syncBoundaryTheme = (animate: boolean) => {
          if (!refs.projectsSectionRef.current) return;

          const projectsTopPosition = ScrollTrigger.positionInViewport(
            refs.projectsSectionRef.current,
            "top",
          );
          applyBoundaryTheme(
            projectsTopPosition <= projectsThemeSwitchViewportThreshold,
            animate,
          );
        };

        const revealTrigger = ScrollTrigger.create({
          trigger: refs.capabilityMatrixSectionRef.current,
          start: "top 88%",
          end: "top 28%",
          scrub: scrubAmount,
          onUpdate: (self) => {
            gsap.set(refs.capabilityMatrixContentRef.current, {
              opacity: gsap.utils.interpolate(0.36, 1, self.progress),
              y: gsap.utils.interpolate(72, 0, self.progress),
            });
          },
        });

        const tickerTrigger = ScrollTrigger.create({
          trigger: refs.capabilityMatrixSectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: scrubAmount,
          onUpdate: (self) => {
            gsap.set(refs.capabilityMatrixTopTickerRef.current, {
              xPercent: gsap.utils.interpolate(6, -18, self.progress),
            });
            gsap.set(refs.capabilityMatrixBottomTickerRef.current, {
              xPercent: gsap.utils.interpolate(-18, 6, self.progress),
            });
          },
        });

        const backgroundTrigger = ScrollTrigger.create({
          trigger: refs.projectsSectionRef.current,
          start: `top ${projectsThemeSwitchViewportThreshold * 100}%`,
          end: "bottom top",
          onRefresh: () => {
            syncBoundaryTheme(false);
          },
          onEnter: () => {
            applyBoundaryTheme(true, true);
          },
          onEnterBack: () => {
            applyBoundaryTheme(true, true);
          },
          onLeaveBack: () => {
            applyBoundaryTheme(false, true);
          },
        });

        syncBoundaryTheme(false);

        return () => {
          revealTrigger.kill();
          tickerTrigger.kill();
          backgroundTrigger.kill();
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: refs.rootRef },
  );
}
