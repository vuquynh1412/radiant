"use client";

import type { RefObject } from "react";

import {
  clamp,
  createQuickSetter,
  gsap,
  lerp,
  segment,
  useScrollScene,
} from "@/lib/animations";
import { getRadiantScrollProfile } from "@/lib/motion/radiant-scroll-profiles";

type NumericSetter = (value: number) => void;

type OpacityYSetters = {
  opacity: NumericSetter;
  y: NumericSetter;
};

export type RadiantCtaMotionRefs = {
  actionsRef: RefObject<HTMLDivElement | null>;
  accentRef: RefObject<HTMLDivElement | null>;
  bodyRef: RefObject<HTMLParagraphElement | null>;
  eyebrowRef: RefObject<HTMLParagraphElement | null>;
  fullPanelRef: RefObject<HTMLDivElement | null>;
  maskedRevealRef: RefObject<SVGSVGElement | null>;
  sectionRef: RefObject<HTMLDivElement | null>;
  starMaskTransformRef: RefObject<SVGGElement | null>;
  starMaskTranslateRef: RefObject<SVGGElement | null>;
  surfaceRef: RefObject<HTMLDivElement | null>;
  titleRef: RefObject<HTMLHeadingElement | null>;
};

type UseRadiantCtaMotionProps = {
  refs: RadiantCtaMotionRefs;
};

const riseEase = gsap.parseEase("power3.out");
const panelEase = gsap.parseEase("power2.inOut");
const riseScaleCurve = gsap.parseEase("power2.in");

function createOpacityYSetters(node: HTMLElement): OpacityYSetters {
  return {
    opacity: createQuickSetter(node, "opacity") as NumericSetter,
    y: createQuickSetter(node, "y", "px") as NumericSetter,
  };
}

export function useRadiantCtaMotion({ refs }: UseRadiantCtaMotionProps) {
  useScrollScene({
    scope: refs.sectionRef,
    trigger: refs.sectionRef,
    start: "top bottom",
    end: "bottom top",
    mediaQuery: "(prefers-reduced-motion: no-preference)",
    reducedMotionProgress: false,
    setup: () => {
      const maskedRevealNode = refs.maskedRevealRef.current;
      const fullPanelNode = refs.fullPanelRef.current;
      const surfaceNode = refs.surfaceRef.current;
      const copyNodes = [
        refs.accentRef.current,
        refs.eyebrowRef.current,
        refs.titleRef.current,
        refs.bodyRef.current,
        refs.actionsRef.current,
      ] as Array<HTMLElement | null>;
      const resolvedCopyNodes = copyNodes.filter(
        (node): node is HTMLElement => node !== null,
      );
      const copySetters = resolvedCopyNodes.map(createOpacityYSetters);

      if (maskedRevealNode) {
        gsap.set(maskedRevealNode, {
          filter: getRadiantScrollProfile().useTouchProfile ? "none" : "",
        });
      }

      if (surfaceNode) {
        gsap.set(surfaceNode, {
          borderRadius: 0,
          opacity: 1,
          scaleX: 1,
          scaleY: 1,
          transformOrigin: "center top",
          y: 0,
        });
      }

      if (fullPanelNode) {
        gsap.set(fullPanelNode, {
          opacity: 0,
          scaleX: 1,
          scaleY: 1,
        });
      }

      return {
        copySetters,
        fullPanelOpacity: fullPanelNode
          ? (createQuickSetter(fullPanelNode, "opacity") as NumericSetter)
          : null,
        maskedRevealOpacity: maskedRevealNode
          ? (createQuickSetter(maskedRevealNode, "opacity") as NumericSetter)
          : null,
      };
    },
    render: (progress, { setup }) => {
      const totalStarProgress = segment(progress, 0.05, 0.78);
      const copyProgress = segment(progress, 0.46, 0.64, riseEase);
      const panelProgress = segment(progress, 0.78, 0.9, panelEase);
      const midStarProgress = (0.38 - 0.05) / (0.78 - 0.05);
      const riseScaleProgress = clamp(totalStarProgress / midStarProgress);
      const bloomScaleProgress = clamp(
        (totalStarProgress - midStarProgress) / (1 - midStarProgress),
      );

      const riseScale = lerp(0.0014, 9.5, riseScaleCurve(riseScaleProgress));
      const bloomScale = lerp(9.5, 76, bloomScaleProgress);
      const starScale =
        totalStarProgress <= midStarProgress ? riseScale : bloomScale;
      const starY = lerp(760, 0, riseEase(segment(progress, 0.05, 0.38)));
      const starRotation = lerp(-18, 342, totalStarProgress);
      const starTransform = `translate(756.5 498.5) rotate(${starRotation}) scale(${starScale}) translate(-756.5 -498.5)`;
      const starTranslate = `translate(0 ${starY})`;

      refs.starMaskTranslateRef.current?.setAttribute(
        "transform",
        starTranslate,
      );
      refs.starMaskTransformRef.current?.setAttribute(
        "transform",
        starTransform,
      );

      setup.maskedRevealOpacity?.(1 - panelProgress);
      setup.fullPanelOpacity?.(panelProgress);

      setup.copySetters.forEach((setters) => {
        setters.opacity(
          panelProgress > 0
            ? lerp(copyProgress, 0.94, panelProgress)
            : copyProgress,
        );
        setters.y(lerp(64, 0, copyProgress));
      });
    },
  });
}
