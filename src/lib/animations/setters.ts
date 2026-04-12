"use client";

import { ensureMotionRuntime, gsap } from "./runtime";

export function createQuickSetter(
  target: gsap.TweenTarget,
  property: string,
  unit?: string
) {
  ensureMotionRuntime();
  return gsap.quickSetter(target, property, unit);
}
