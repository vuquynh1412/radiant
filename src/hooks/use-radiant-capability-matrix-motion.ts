"use client";

import { useEffect } from "react";

import {
  ensureMotionRuntime,
  gsap,
  lerp,
  ScrollTrigger,
} from "@/lib/animations";
import { getRadiantScrollProfile } from "@/lib/motion/radiant-scroll-profiles";
import type { RadiantExperienceRefs } from "@/components/marketing/radiant-experience.types";

type UseRadiantCapabilityMatrixMotionProps = {
  refs: RadiantExperienceRefs;
  onRevealComplete?: () => void;
};

const capabilityMatrixBackground = "var(--background)";
const projectsBackground = "#171614";
const matrixLightDivider = "rgba(0,0,0,0.1)";
const matrixDarkDivider = "rgba(245,241,232,0.14)";
const matrixLightWord = "rgba(180,168,143,0.7)";
const matrixDarkWord = "rgba(245,241,232,0.18)";
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

// Clip-path directions for multi-directional letter reveal
type ClipDirection = "bottom-up" | "top-down" | "center-out";

const clipDirections: ClipDirection[] = ["bottom-up", "top-down", "center-out"];

// Deterministic "random" direction per letter index to avoid Math.random in render
function getLetterClipDirection(index: number): ClipDirection {
  return clipDirections[index % clipDirections.length];
}

function getLetterInitialClip(dir: ClipDirection): string {
  switch (dir) {
    case "bottom-up":
      return "inset(0 0 100% 0)";
    case "top-down":
      return "inset(100% 0 0 0)";
    case "center-out":
      return "inset(50% 0 50% 0)";
  }
}

function getImageInitialClip(position: string): string {
  switch (position) {
    case "left":
      return "inset(0 100% 0 0)";
    case "right":
      return "inset(0 0 0 100%)";
    default:
      return "inset(0 50% 0 50%)";
  }
}

export function useRadiantCapabilityMatrixMotion({
  refs,
  onRevealComplete,
}: UseRadiantCapabilityMatrixMotionProps) {
  useEffect(
    () => {
      ensureMotionRuntime();

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop:
            "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          isMobile:
            "(max-width: 767.98px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { isDesktop } = context.conditions!;

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
          const contentEl = refs.capabilityMatrixContentRef.current;

          const layoutSelector = isDesktop
            ? '[data-matrix-layout="desktop"]'
            : '[data-matrix-layout="mobile"]';
          const layout = contentEl.querySelector<HTMLElement>(layoutSelector);

          const rowNodes = layout
            ? Array.from(
                layout.querySelectorAll<HTMLElement>("[data-matrix-row]"),
              )
            : [];

          // --- Build reveal timeline ---
          const tl = gsap.timeline({ paused: true });
          let globalLetterIndex = 0;

          for (const [rowIndex, row] of rowNodes.entries()) {
            const letters = Array.from(
              row.querySelectorAll<HTMLElement>("[data-matrix-letter]"),
            );
            const images = Array.from(
              row.querySelectorAll<HTMLElement>("[data-matrix-image]"),
            );

            const rowStart = rowIndex * 0.2;

            // Set initial states: multi-directional clip per letter
            for (const letter of letters) {
              const dir = getLetterClipDirection(globalLetterIndex);
              gsap.set(letter, { clipPath: getLetterInitialClip(dir) });
              letter.setAttribute("data-clip-dir", dir);
              globalLetterIndex++;
            }

            // Set initial states: directional clip per image
            for (const image of images) {
              const pos = image.getAttribute("data-matrix-image") || "center";
              gsap.set(image, {
                clipPath: getImageInitialClip(pos),
                scale: 1.05,
              });
            }

            // Animate letters with individual tweens per direction group
            const bottomUp = letters.filter(
              (l) => l.getAttribute("data-clip-dir") === "bottom-up",
            );
            const topDown = letters.filter(
              (l) => l.getAttribute("data-clip-dir") === "top-down",
            );
            const centerOut = letters.filter(
              (l) => l.getAttribute("data-clip-dir") === "center-out",
            );

            // Negative inset values expand clip beyond the element box,
            // preventing glyph edges from being cut off at the end.
            if (bottomUp.length) {
              tl.to(
                bottomUp,
                {
                  clipPath: "inset(0 0 -5% 0)",
                  duration: 0.8,
                  ease: "power3.out",
                  stagger: 0.03,
                },
                rowStart,
              );
            }
            if (topDown.length) {
              tl.to(
                topDown,
                {
                  clipPath: "inset(-5% 0 0 0)",
                  duration: 0.8,
                  ease: "power3.out",
                  stagger: 0.03,
                },
                rowStart + 0.04,
              );
            }
            if (centerOut.length) {
              tl.to(
                centerOut,
                {
                  clipPath: "inset(-5% 0 -5% 0)",
                  duration: 0.8,
                  ease: "power3.out",
                  stagger: 0.03,
                },
                rowStart + 0.08,
              );
            }

            // Images: expand from their edge, slightly after letters
            for (const image of images) {
              const pos = image.getAttribute("data-matrix-image") || "center";
              let targetClip: string;
              switch (pos) {
                case "left":
                  targetClip = "inset(0 0% 0 0)";
                  break;
                case "right":
                  targetClip = "inset(0 0 0 0%)";
                  break;
                default:
                  targetClip = "inset(0 0% 0 0%)";
                  break;
              }

              tl.to(
                image,
                {
                  clipPath: targetClip,
                  scale: 1,
                  duration: 1,
                  ease: "power2.out",
                },
                rowStart + 0.15,
              );
            }
          }

          // When timeline completes, remove clip-path entirely so glyphs
          // aren't clipped, and fire the reveal callback.
          const allLetters = layout
            ? Array.from(layout.querySelectorAll<HTMLElement>("[data-matrix-letter]"))
            : [];
          const allImages = layout
            ? Array.from(layout.querySelectorAll<HTMLElement>("[data-matrix-image]"))
            : [];

          tl.eventCallback("onComplete", () => {
            if (allLetters.length) {
              gsap.set(allLetters, { clearProps: "clipPath" });
            }
            if (allImages.length) {
              gsap.set(allImages, { clearProps: "clipPath,scale" });
            }
            onRevealComplete?.();
          });

          // ScrollTrigger: play once when section enters viewport
          const revealTrigger = ScrollTrigger.create({
            trigger: refs.capabilityMatrixSectionRef.current,
            start: "top+=100 65%",
            once: true,
            onEnter: () => {
              tl.play();
            },
          });

          // --- Ticker parallax (scroll-linked) ---
          gsap.set(refs.capabilityMatrixTopTickerRef.current, { xPercent: 6 });
          gsap.set(refs.capabilityMatrixBottomTickerRef.current, {
            xPercent: -6,
          });

          const tickerTrigger = ScrollTrigger.create({
            trigger: refs.capabilityMatrixSectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: scrubAmount,
            onUpdate: (self) => {
              gsap.set(refs.capabilityMatrixTopTickerRef.current, {
                xPercent: lerp(6, -18, self.progress),
              });
              gsap.set(refs.capabilityMatrixBottomTickerRef.current, {
                xPercent: lerp(-18, 6, self.progress),
              });
            },
          });

          // --- Theme switching ---
          gsap.set(refs.capabilityMatrixSectionRef.current, {
            backgroundColor: capabilityMatrixBackground,
            "--matrix-divider-color": matrixLightDivider,
            "--matrix-word-color": matrixLightWord,
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
              backgroundColor: isDark
                ? projectsBackground
                : capabilityMatrixBackground,
              "--matrix-divider-color": isDark
                ? matrixDarkDivider
                : matrixLightDivider,
              "--matrix-word-color": isDark ? matrixDarkWord : matrixLightWord,
              "--matrix-ticker-color": isDark
                ? matrixDarkTicker
                : matrixLightTicker,
              duration: animate ? 0.28 : 0,
              ease: "power1.out",
              overwrite: true,
            });

            apply(refs.projectsSectionRef.current, {
              backgroundColor: isDark
                ? projectsBackground
                : capabilityMatrixBackground,
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
            tl.kill();
            revealTrigger.kill();
            tickerTrigger.kill();
            backgroundTrigger.kill();
          };
        },
      );

      return () => {
        mm.revert();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
}
