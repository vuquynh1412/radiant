"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let runtimeConfigured = false;
let scheduledRefreshFrame = 0;

export type SceneLabels = Record<string, number>;

type SceneRegistration = {
  getLabelScroll: (label: string) => number | null;
  labels: SceneLabels;
};

const sceneRegistry = new Map<string, SceneRegistration>();

export function ensureMotionRuntime() {
  gsap.registerPlugin(ScrollTrigger);

  if (runtimeConfigured || typeof window === "undefined") {
    return;
  }

  ScrollTrigger.config({
    ignoreMobileResize: true,
    limitCallbacks: true,
  });

  runtimeConfigured = true;
}

export function scheduleScrollRefresh() {
  if (typeof window === "undefined") {
    return;
  }

  window.cancelAnimationFrame(scheduledRefreshFrame);
  scheduledRefreshFrame = window.requestAnimationFrame(() => {
    scheduledRefreshFrame = 0;
    ScrollTrigger.refresh();
  });
}

export function registerScrollScene(
  id: string,
  registration: SceneRegistration
) {
  sceneRegistry.set(id, registration);
}

export function unregisterScrollScene(id: string) {
  sceneRegistry.delete(id);
}

export function getScrollSceneLabelPosition(sceneId: string, label: string) {
  return sceneRegistry.get(sceneId)?.getLabelScroll(label) ?? null;
}

export function getScrollSceneLabels(sceneId: string) {
  return sceneRegistry.get(sceneId)?.labels ?? null;
}

export { gsap, ScrollTrigger };
