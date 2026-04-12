"use client";

import { useEffect, useMemo, type RefObject } from "react";

import { ensureMotionRuntime, gsap } from "./runtime";
import {
  parsePlainObject,
  prefersReducedMotion,
  resolveScopedTarget,
  type SharedAnimationOptions,
  serializePlainObject,
} from "./utils";

export interface TickerParallaxOptions {
  scope: RefObject<HTMLElement | null>;
  target?: RefObject<HTMLElement | null> | HTMLElement | null;
  trigger?: RefObject<HTMLElement | null> | HTMLElement | null;
  from?: number;
  to?: number;
  axis?: "x" | "y";
  options?: SharedAnimationOptions;
}

/**
 * Scroll-linked parallax helper for a single x/y drifting target.
 *
 * Use this for marquees, rails, background drift, or small supporting motion
 * where a full custom scene would be overkill.
 */
export function useTickerParallax({
  axis = "x",
  from = 0,
  options,
  scope,
  target,
  to = -80,
  trigger,
}: TickerParallaxOptions) {
  const optionsSignature = serializePlainObject(options);
  const resolvedOptions = useMemo(
    () => parsePlainObject<SharedAnimationOptions>(optionsSignature),
    [optionsSignature]
  );

  useEffect(() => {
    const root = scope.current;
    if (!root) {
      return;
    }

    const animatedTarget = resolveScopedTarget(root, target);

    ensureMotionRuntime();

    if (prefersReducedMotion()) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        animatedTarget,
        { [axis]: from },
        {
          [axis]: to,
          ease: resolvedOptions?.ease ?? "none",
          scrollTrigger: {
            trigger: resolveScopedTarget(root, trigger),
            start: resolvedOptions?.start ?? "top bottom",
            end: resolvedOptions?.end ?? "bottom top",
            scrub: resolvedOptions?.scrub ?? true,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [axis, from, optionsSignature, resolvedOptions, scope, target, to, trigger]);
}
