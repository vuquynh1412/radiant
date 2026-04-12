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

type RevealTarget =
  | string
  | HTMLElement[]
  | NodeListOf<HTMLElement>
  | (() => HTMLElement[]);

export interface SectionRevealOptions {
  scope: RefObject<HTMLElement | null>;
  trigger?: RefObject<HTMLElement | null> | HTMLElement | null;
  targets?: RevealTarget;
  y?: number;
  options?: SharedAnimationOptions;
}

function resolveTargets(root: HTMLElement, targets?: RevealTarget) {
  if (!targets) {
    return [root];
  }

  if (typeof targets === "function") {
    return targets();
  }

  if (typeof targets === "string") {
    return Array.from(root.querySelectorAll<HTMLElement>(targets));
  }

  return Array.from(targets);
}

/**
 * Lightweight reveal helper for sections that only need enter-on-scroll
 * animation without custom scene math.
 *
 * Prefer this over `useScrollScene` when the section can be modeled as a
 * simple `gsap.from(...)` with optional stagger.
 */
export function useSectionReveal({
  options,
  scope,
  targets,
  trigger,
  y = 32,
}: SectionRevealOptions) {
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

    ensureMotionRuntime();

    if (prefersReducedMotion()) {
      return;
    }

    const revealTargets = resolveTargets(root, targets);
    if (revealTargets.length === 0) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(revealTargets, {
        autoAlpha: 0,
        duration: resolvedOptions?.duration ?? 0.8,
        delay: resolvedOptions?.delay ?? 0,
        ease: resolvedOptions?.ease ?? "power3.out",
        stagger: resolvedOptions?.stagger ?? 0.1,
        y,
        scrollTrigger: {
          trigger: resolveScopedTarget(root, trigger),
          start: resolvedOptions?.start ?? "top 80%",
          end: resolvedOptions?.end,
          once: resolvedOptions?.once ?? true,
          toggleActions:
            resolvedOptions?.once === false ? "play none none reverse" : undefined,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [optionsSignature, resolvedOptions, scope, targets, trigger, y]);
}
