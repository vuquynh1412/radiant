"use client";

import { ScrollTrigger } from "@/lib/animations";

export type RadiantScrollProfile = {
  aboutScrub: number;
  defaultScrub: number;
  showcaseScrub: number;
  useTouchProfile: boolean;
};

export function getRadiantScrollProfile(): RadiantScrollProfile {
  const useTouchProfile =
    ScrollTrigger.isTouch !== 0 ||
    window.matchMedia("(pointer: coarse)").matches;

  return {
    aboutScrub: useTouchProfile ? 0.3 : 1.35,
    defaultScrub: useTouchProfile ? 0.22 : 1,
    showcaseScrub: useTouchProfile ? 0.22 : 1,
    useTouchProfile,
  };
}
