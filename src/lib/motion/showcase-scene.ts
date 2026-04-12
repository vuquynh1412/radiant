import { gsap } from "@/lib/animations/runtime";
import { clamp, lerp } from "@/lib/animations/utils";

import type { LayoutState } from "@/components/marketing/radiant-experience.types";

export type ShowcaseMetrics = {
  cardWidth: number;
  copyOffset: number;
  farScale: number;
  focusScale: number;
  focusLeftX: number;
  gridCellWidth: number;
  gridColumns: number;
  gridColumnGap: number;
  gridContentHeight: number;
  gridFooterMarginTop: number;
  gridHeaderGap: number;
  gridImageHeight: number;
  gridItemGap: number;
  gridItemHeight: number;
  gridRowGap: number;
  gridShellLeft: number;
  gridShellTop: number;
  gridShellWidth: number;
  gridTop: number;
  gridTitleHeight: number;
  headerHeight: number;
  mediaHeight: number;
  previewGap: number;
  previewScale: number;
  rowTop: number;
  viewportHeight: number;
  viewportWidth: number;
};

export type HeroRect = {
  borderRadius: number;
  height: number;
  scale: number;
  width: number;
  x: number;
  y: number;
};

export type ShowcaseDerivedLayout = {
  dropRect: HeroRect;
  enterStates: LayoutState[];
  fullRect: HeroRect;
  gridStates: LayoutState[];
  introRect: HeroRect;
  rowZeroRect: HeroRect;
  rowZeroState: LayoutState;
  slideRect: HeroRect;
  terminalRowStates: LayoutState[];
};

const focusEase = gsap.parseEase("power2.inOut");

/**
 * Morphs between two layout states without touching DOM directly.
 */
export function morphState(
  from: LayoutState,
  to: LayoutState,
  progress: number,
): LayoutState {
  return {
    opacity: lerp(from.opacity, to.opacity, progress),
    scale: lerp(from.scale, to.scale, progress),
    x: lerp(from.x, to.x, progress),
    y: lerp(from.y, to.y, progress),
  };
}

/**
 * Converts a normalized phase progress into a float focus index with per-step
 * easing so the resting positions feel decisive while the transition is smooth.
 */
export function getSmoothFocusValue(progress: number, steps: number) {
  if (steps <= 0) {
    return 0;
  }

  const normalized = clamp(progress);

  if (normalized >= 1) {
    return steps;
  }

  const scaled = normalized * steps;
  const baseStep = Math.floor(scaled);
  const localProgress = scaled - baseStep;
  const easedProgress = focusEase(localProgress);

  return baseStep + easedProgress;
}

export function visualLeftToTransformX(
  left: number,
  width: number,
  scale: number,
) {
  return left + ((scale - 1) * width) / 2;
}

/**
 * Computes the row-phase layout state for a service card at the given index
 * relative to the current continuous focus value.
 */
export function getShowcaseRowState(
  index: number,
  focus: number,
  metrics: ShowcaseMetrics,
): LayoutState {
  const distance = index - focus;
  const absoluteDistance = Math.abs(distance);
  const previewProgress = clamp(absoluteDistance);
  const offscreenProgress = clamp(absoluteDistance - 1);
  const focusWidth = metrics.cardWidth * metrics.focusScale;
  const previewWidth = metrics.cardWidth * metrics.previewScale;
  const farWidth = metrics.cardWidth * metrics.farScale;
  const previewVisualLeft =
    distance < 0
      ? metrics.focusLeftX - metrics.previewGap - previewWidth
      : metrics.focusLeftX + focusWidth + metrics.previewGap;
  const offscreenVisualLeft =
    distance < 0
      ? -farWidth - metrics.previewGap
      : metrics.viewportWidth + metrics.previewGap;
  const previewScale = lerp(
    metrics.focusScale,
    metrics.previewScale,
    previewProgress,
  );
  const scale =
    absoluteDistance <= 1
      ? previewScale
      : lerp(metrics.previewScale, metrics.farScale, offscreenProgress);
  const previewOpacity = lerp(1, 0.8, previewProgress);
  const opacity =
    absoluteDistance <= 1
      ? previewOpacity
      : lerp(0.8, 0.16, offscreenProgress);
  const previewY = lerp(
    metrics.rowTop,
    metrics.rowTop + 26,
    previewProgress,
  );
  const y =
    absoluteDistance <= 1
      ? previewY
      : lerp(metrics.rowTop + 26, metrics.rowTop + 62, offscreenProgress);
  const visualX =
    absoluteDistance <= 1
      ? lerp(metrics.focusLeftX, previewVisualLeft, previewProgress)
      : lerp(previewVisualLeft, offscreenVisualLeft, offscreenProgress);

  return {
    opacity,
    scale,
    x: visualLeftToTransformX(visualX, metrics.cardWidth, scale),
    y,
  };
}

/**
 * Maps a service tile into its final grid position.
 */
export function getShowcaseGridState(
  index: number,
  metrics: ShowcaseMetrics,
  serviceItemCount: number,
): LayoutState {
  const scale = metrics.gridCellWidth / metrics.cardWidth;
  const column = index % metrics.gridColumns;
  const row = Math.floor(index / metrics.gridColumns);
  const itemsInRow = Math.min(
    metrics.gridColumns,
    serviceItemCount - row * metrics.gridColumns,
  );
  const rowWidth =
    itemsInRow * metrics.gridCellWidth +
    Math.max(0, itemsInRow - 1) * metrics.gridColumnGap;
  const relativeX =
    (metrics.gridShellWidth - rowWidth) / 2 +
    column * (metrics.gridCellWidth + metrics.gridColumnGap);
  const relativeY =
    row * (metrics.gridItemHeight + metrics.gridRowGap);
  const visualX = metrics.gridShellLeft + relativeX;
  const y = metrics.gridTop + relativeY;

  return {
    opacity: 1,
    scale,
    x: visualLeftToTransformX(visualX, metrics.cardWidth, scale),
    y,
  };
}

/**
 * Computes the relative position of a grid item inside the grid shell.
 */
export function getGridShellItemPosition(
  index: number,
  metrics: ShowcaseMetrics,
  serviceItemCount: number,
) {
  const column = index % metrics.gridColumns;
  const row = Math.floor(index / metrics.gridColumns);
  const itemsInRow = Math.min(
    metrics.gridColumns,
    serviceItemCount - row * metrics.gridColumns,
  );
  const rowWidth =
    itemsInRow * metrics.gridCellWidth +
    Math.max(0, itemsInRow - 1) * metrics.gridColumnGap;

  return {
    x:
      (metrics.gridShellWidth - rowWidth) / 2 +
      column * (metrics.gridCellWidth + metrics.gridColumnGap),
    y: row * (metrics.gridItemHeight + metrics.gridRowGap),
  };
}

/**
 * Precomputes the static layout states for the showcase scene after each
 * refresh/resize.
 */
export function getShowcaseDerivedLayout(
  metrics: ShowcaseMetrics,
  serviceItemCount: number,
  serviceCardCount: number,
): ShowcaseDerivedLayout {
  const introTop = metrics.headerHeight + 6;
  const introRect: HeroRect = {
    borderRadius: 40,
    height: Math.max(360, metrics.viewportHeight - introTop),
    scale: 1,
    width: metrics.viewportWidth,
    x: 0,
    y: introTop,
  };
  const fullRect: HeroRect = {
    borderRadius: 0,
    height: metrics.viewportHeight,
    scale: 1,
    width: metrics.viewportWidth,
    x: 0,
    y: 0,
  };
  const dropRect: HeroRect = {
    ...introRect,
    y: metrics.viewportHeight,
  };
  const slideRect: HeroRect = {
    borderRadius: 0,
    height: metrics.viewportHeight,
    scale: 1,
    width: metrics.viewportWidth,
    x: metrics.viewportWidth,
    y: 0,
  };
  const rowZeroState = getShowcaseRowState(0, 0, metrics);
  const rowZeroRect: HeroRect = {
    borderRadius: 24,
    height: metrics.mediaHeight,
    scale: rowZeroState.scale,
    width: metrics.cardWidth,
    x: rowZeroState.x,
    y: rowZeroState.y,
  };
  const terminalRowStates = Array.from(
    { length: serviceItemCount },
    (_, index) => getShowcaseRowState(index, serviceItemCount - 1, metrics),
  );
  const gridStates = Array.from(
    { length: serviceItemCount },
    (_, index) => getShowcaseGridState(index, metrics, serviceItemCount),
  );
  const enterStates = Array.from(
    { length: serviceCardCount },
    (_, nodeIndex) => ({
      opacity: 0,
      scale: metrics.farScale,
      x: metrics.viewportWidth + nodeIndex * 100,
      y: rowZeroState.y + 42,
    }),
  );

  return {
    dropRect,
    enterStates,
    fullRect,
    gridStates,
    introRect,
    rowZeroRect,
    rowZeroState,
    slideRect,
    terminalRowStates,
  };
}
