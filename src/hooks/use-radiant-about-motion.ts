"use client";

import {
  clamp,
  createQuickSetter,
  gsap,
  lerp,
  segment,
  useScrollScene,
} from "@/lib/animations";
import { getRadiantScrollProfile } from "@/lib/motion/radiant-scroll-profiles";
import type { RadiantExperienceRefs } from "@/components/marketing/radiant-experience.types";

type NumericSetter = (value: number) => void;
type StringSetter = (value: string) => void;

type AboutCharSetters = {
  color: StringSetter;
  opacity: NumericSetter;
};

const aboutContentEase = gsap.parseEase("power2.out");
const aboutCharEase = gsap.parseEase("power1.out");

function createAboutCharSetters(node: HTMLElement): AboutCharSetters {
  return {
    color: createQuickSetter(node, "color") as StringSetter,
    opacity: createQuickSetter(node, "opacity") as NumericSetter,
  };
}

type UseRadiantAboutMotionProps = {
  refs: RadiantExperienceRefs;
};

export function useRadiantAboutMotion({ refs }: UseRadiantAboutMotionProps) {
  // Desktop about reveal
  useScrollScene({
    scope: refs.rootRef,
    trigger: refs.aboutContentRef,
    resizeTarget: refs.aboutContentRef,
    mediaQuery: "(prefers-reduced-motion: no-preference) and (min-width: 768px)",
    start: "top 66%",
    end: () => {
      const aboutContentHeight =
        refs.aboutContentRef.current?.offsetHeight ?? 0;
      const viewportHeight =
        refs.heroMediaRef.current?.parentElement?.clientHeight ??
        window.innerHeight;
      return `+=${Math.max(viewportHeight, aboutContentHeight * 0.9)}`;
    },
    scrub: getRadiantScrollProfile().aboutScrub,
    reducedMotionProgress: false,
    setup: () => {
      const contentNode = refs.aboutContentRef.current;
      const charNodes = refs.aboutCharRefs.current.filter(
        (char): char is HTMLSpanElement => char !== null,
      );
      const animateChars = charNodes.length > 0;

      return {
        animateChars,
        chars: charNodes.map(createAboutCharSetters),
        contentOpacity: contentNode
          ? (createQuickSetter(contentNode, "opacity") as NumericSetter)
          : null,
        contentY: contentNode
          ? (createQuickSetter(contentNode, "y", "px") as NumericSetter)
          : null,
        revealSpan: charNodes.length + 10,
      };
    },
    render: (progress, { setup }) => {
      const contentProgress = segment(progress, 0, 0.28, aboutContentEase);
      const charProgress = segment(progress, 0.12, 0.84, aboutCharEase);

      setup.contentOpacity?.(lerp(0.38, 1, contentProgress));
      setup.contentY?.(lerp(72, 0, contentProgress));

      if (!setup.animateChars) {
        return;
      }

      const revealPosition = charProgress * setup.revealSpan;

      setup.chars.forEach((setters, index) => {
        const localProgress = clamp(revealPosition - index);

        setters.opacity(0.22 + localProgress * 0.78);
        setters.color(
          localProgress > 0.52 ? "var(--foreground)" : "#bdb7b0",
        );
      });
    },
  });

  // Mobile about reveal
  useScrollScene({
    scope: refs.rootRef,
    trigger: refs.aboutContentRef,
    resizeTarget: refs.aboutContentRef,
    mediaQuery: "(prefers-reduced-motion: no-preference) and (max-width: 767px)",
    start: "top 78%",
    end: () => {
      const aboutContentHeight =
        refs.aboutContentRef.current?.offsetHeight ?? 0;
      return `+=${Math.max(window.innerHeight * 0.9, aboutContentHeight * 1.1)}`;
    },
    scrub: Math.max(getRadiantScrollProfile().aboutScrub, 0.8),
    reducedMotionProgress: false,
    setup: () => {
      const contentNode = refs.aboutContentRef.current;
      const charNodes = refs.aboutCharRefs.current.filter(
        (char): char is HTMLSpanElement => char !== null,
      );
      const animateChars = charNodes.length > 0;

      return {
        animateChars,
        chars: charNodes.map(createAboutCharSetters),
        contentOpacity: contentNode
          ? (createQuickSetter(contentNode, "opacity") as NumericSetter)
          : null,
        contentY: contentNode
          ? (createQuickSetter(contentNode, "y", "px") as NumericSetter)
          : null,
        revealSpan: charNodes.length + 10,
      };
    },
    render: (progress, { setup }) => {
      const contentProgress = segment(progress, 0, 0.24, aboutContentEase);
      const charProgress = segment(progress, 0.08, 0.86, aboutCharEase);

      setup.contentOpacity?.(lerp(0.38, 1, contentProgress));
      setup.contentY?.(lerp(48, 0, contentProgress));

      if (!setup.animateChars) {
        return;
      }

      const revealPosition = charProgress * setup.revealSpan;

      setup.chars.forEach((setters, index) => {
        const localProgress = clamp(revealPosition - index);

        setters.opacity(0.18 + localProgress * 0.82);
        setters.color(
          localProgress > 0.5 ? "var(--foreground)" : "#bdb7b0",
        );
      });
    },
  });
}
