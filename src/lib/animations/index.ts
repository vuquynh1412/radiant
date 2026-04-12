export { createQuickSetter } from "./setters";
export {
  ensureMotionRuntime,
  getScrollSceneLabelPosition,
  getScrollSceneLabels,
  gsap,
  scheduleScrollRefresh,
  ScrollTrigger,
} from "./runtime";
export {
  useLenisScrollSync,
  type SmoothScrollMode,
  type UseLenisScrollSyncOptions,
} from "./use-lenis-scroll-sync";
export {
  useScrollScene,
  type ScrollSceneConfig,
  type ScrollSceneRenderContext,
} from "./use-scroll-scene";
export { useSectionReveal, type SectionRevealOptions } from "./use-section-reveal";
export { useTickerParallax, type TickerParallaxOptions } from "./use-ticker-parallax";
export {
  clamp,
  createStaggeredSegments,
  lerp,
  normalizeProgressPoint,
  parsePlainObject,
  prefersReducedMotion,
  resolveSceneLabelProgress,
  type SharedAnimationOptions,
  serializePlainObject,
  segment,
} from "./utils";
