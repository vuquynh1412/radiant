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

    const scrollTriggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      gsap.set(targets, {
        autoAlpha: 0,
        y,
      });

      targets.forEach((target, index) => {
        const revealTween = gsap.to(target, {
          autoAlpha: 1,
          delay: delay + index * stagger,
          duration,
          ease,
          overwrite: "auto",
          y: 0,
          paused: true,
        });

        const syncToTriggerState = (self: ScrollTrigger) => {
          if (self.progress > 0 || self.isActive) {
            revealTween.progress(1).pause();
            return;
          }

          if (!once) {
            revealTween.progress(0).pause();
          }
        };

        const scrollTrigger = ScrollTrigger.create({
          trigger: target,
          start,
          once,
          invalidateOnRefresh: true,
          onEnter: () => {
            revealTween.play();
          },
          onEnterBack: () => {
            revealTween.play();
          },
          onLeaveBack: () => {
            if (!once) {
              revealTween.reverse();
            }
          },
          onRefresh: syncToTriggerState,
        });

        scrollTriggers.push(scrollTrigger);
      });
    }, root);

    scheduleScrollRefresh();

    return () => {
      scrollTriggers.forEach((scrollTrigger) => {
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
