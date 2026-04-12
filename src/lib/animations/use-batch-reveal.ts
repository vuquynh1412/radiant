"use client";

import { useEffect, type RefObject } from "react";

import {
  ensureMotionRuntime,
  gsap,
  scheduleScrollRefresh,
  ScrollTrigger,
} from "./runtime";
import { prefersReducedMotion } from "./utils";

export interface BatchRevealOptions {
  delay?: number;
  duration?: number;
  ease?: string;
  once?: boolean;
  refreshKey?: boolean | number | string | null;
  scope: RefObject<HTMLElement | null>;
  selector: string;
  stagger?: number;
  start?: string;
  y?: number;
}

export function useBatchReveal({
  delay = 0,
  duration = 0.8,
  ease = "power3.out",
  once = true,
  refreshKey = null,
  scope,
  selector,
  stagger = 0.1,
  start = "top 88%",
  y = 32,
}: BatchRevealOptions) {
  useEffect(() => {
    const root = scope.current;
    if (!root) {
      return;
    }

    ensureMotionRuntime();

    if (prefersReducedMotion()) {
      return;
    }

    const targets = Array.from(root.querySelectorAll<HTMLElement>(selector));
    if (targets.length === 0) {
      return;
    }

    let batchedTriggers: ReturnType<typeof ScrollTrigger.batch> = [];

    const ctx = gsap.context(() => {
      gsap.set(targets, {
        autoAlpha: 0,
        y,
      });

      const animateBatch = (elements: gsap.TweenTarget) => {
        gsap.to(elements, {
          autoAlpha: 1,
          delay,
          duration,
          ease,
          overwrite: "auto",
          stagger,
          y: 0,
        });
      };

      batchedTriggers = ScrollTrigger.batch(targets, {
        once,
        onEnter: animateBatch,
        onEnterBack: once ? undefined : animateBatch,
        onLeaveBack: once
          ? undefined
          : (elements) => {
              gsap.set(elements, {
                autoAlpha: 0,
                overwrite: "auto",
                y,
              });
            },
        start,
      });
    }, root);

    scheduleScrollRefresh();

    return () => {
      batchedTriggers.forEach((scrollTrigger) => {
        scrollTrigger.kill();
      });
      ctx.revert();
    };
  }, [
    delay,
    duration,
    ease,
    once,
    refreshKey,
    scope,
    selector,
    stagger,
    start,
    y,
  ]);
}
