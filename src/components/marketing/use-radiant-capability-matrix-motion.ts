"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { RadiantExperienceRefs } from "./radiant-experience.types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type UseRadiantCapabilityMatrixMotionProps = {
  refs: RadiantExperienceRefs;
};

export function useRadiantCapabilityMatrixMotion({
  refs,
}: UseRadiantCapabilityMatrixMotionProps) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (
          !refs.capabilityMatrixSectionRef.current ||
          !refs.capabilityMatrixContentRef.current ||
          !refs.capabilityMatrixTopTickerRef.current ||
          !refs.capabilityMatrixBottomTickerRef.current
        ) {
          return undefined;
        }

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

        const revealTrigger = ScrollTrigger.create({
          trigger: refs.capabilityMatrixSectionRef.current,
          start: "top 88%",
          end: "top 28%",
          scrub: 1,
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
          scrub: 1,
          onUpdate: (self) => {
            gsap.set(refs.capabilityMatrixTopTickerRef.current, {
              xPercent: gsap.utils.interpolate(6, -18, self.progress),
            });
            gsap.set(refs.capabilityMatrixBottomTickerRef.current, {
              xPercent: gsap.utils.interpolate(-18, 6, self.progress),
            });
          },
        });

        return () => {
          revealTrigger.kill();
          tickerTrigger.kill();
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: refs.rootRef },
  );
}
