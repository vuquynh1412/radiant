"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { getRadiantScrollProfile } from "./radiant-scroll-profiles";
import type {
  LayoutState,
  RadiantExperienceContent,
  RadiantExperienceRefs,
} from "./radiant-experience.types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function lerp(from: number, to: number, progress: number) {
  return gsap.utils.interpolate(from, to, progress);
}

function morphState(
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

const focusEase = gsap.parseEase("power2.inOut");
const aboutContentEase = gsap.parseEase("power2.out");
const aboutCharEase = gsap.parseEase("power1.out");

function getSmoothFocusValue(progress: number, steps: number) {
  if (steps <= 0) {
    return 0;
  }

  const normalized = gsap.utils.clamp(0, 1, progress);

  if (normalized >= 1) {
    return steps;
  }

  const scaled = normalized * steps;
  const baseStep = Math.floor(scaled);
  const localProgress = scaled - baseStep;
  const easedProgress = focusEase(localProgress);

  return baseStep + easedProgress;
}

function visualLeftToTransformX(left: number, width: number, scale: number) {
  return left + ((scale - 1) * width) / 2;
}

type ShowcaseMetrics = {
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

type HeroRect = {
  borderRadius: number;
  height: number;
  scale: number;
  width: number;
  x: number;
  y: number;
};

type NumericSetter = (value: number) => void;
type StringSetter = (value: string) => void;

type LayoutSetters = {
  opacity: NumericSetter;
  scale: NumericSetter;
  x: NumericSetter;
  y: NumericSetter;
};

type HeroMediaSetters = LayoutSetters & {
  bottomLeftRadius: NumericSetter;
  bottomRightRadius: NumericSetter;
  borderRadius: NumericSetter;
  height: NumericSetter;
  topLeftRadius: NumericSetter;
  topRightRadius: NumericSetter;
  width: NumericSetter;
};

type OpacityYSetters = {
  opacity: NumericSetter;
  y: NumericSetter;
};

type XYSetters = {
  opacity: NumericSetter;
  x: NumericSetter;
  y: NumericSetter;
  yPercent: NumericSetter;
};

type AboutCharSetters = {
  color: StringSetter;
  opacity: NumericSetter;
};

type ShowcaseDerivedLayout = {
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

function createLayoutSetters(node: HTMLElement): LayoutSetters {
  return {
    opacity: gsap.quickSetter(node, "opacity") as NumericSetter,
    scale: createUniformScaleSetter(node),
    x: gsap.quickSetter(node, "x", "px") as NumericSetter,
    y: gsap.quickSetter(node, "y", "px") as NumericSetter,
  };
}

function createUniformScaleSetter(node: HTMLElement): NumericSetter {
  const scaleX = gsap.quickSetter(node, "scaleX") as NumericSetter;
  const scaleY = gsap.quickSetter(node, "scaleY") as NumericSetter;

  return (value: number) => {
    scaleX(value);
    scaleY(value);
  };
}

function createHeroMediaSetters(node: HTMLElement): HeroMediaSetters {
  return {
    ...createLayoutSetters(node),
    bottomLeftRadius: gsap.quickSetter(
      node,
      "borderBottomLeftRadius",
      "px",
    ) as NumericSetter,
    bottomRightRadius: gsap.quickSetter(
      node,
      "borderBottomRightRadius",
      "px",
    ) as NumericSetter,
    borderRadius: gsap.quickSetter(node, "borderRadius", "px") as NumericSetter,
    height: gsap.quickSetter(node, "height", "px") as NumericSetter,
    topLeftRadius: gsap.quickSetter(
      node,
      "borderTopLeftRadius",
      "px",
    ) as NumericSetter,
    topRightRadius: gsap.quickSetter(
      node,
      "borderTopRightRadius",
      "px",
    ) as NumericSetter,
    width: gsap.quickSetter(node, "width", "px") as NumericSetter,
  };
}

function createOpacityYSetters(node: HTMLElement): OpacityYSetters {
  return {
    opacity: gsap.quickSetter(node, "opacity") as NumericSetter,
    y: gsap.quickSetter(node, "y", "px") as NumericSetter,
  };
}

function createXYSetters(node: HTMLElement): XYSetters {
  return {
    opacity: gsap.quickSetter(node, "opacity") as NumericSetter,
    x: gsap.quickSetter(node, "x", "px") as NumericSetter,
    y: gsap.quickSetter(node, "y", "px") as NumericSetter,
    yPercent: gsap.quickSetter(node, "yPercent") as NumericSetter,
  };
}

function createAboutCharSetters(node: HTMLElement): AboutCharSetters {
  return {
    color: gsap.quickSetter(node, "color") as StringSetter,
    opacity: gsap.quickSetter(node, "opacity") as NumericSetter,
  };
}

function applyLayoutState(setters: LayoutSetters, state: LayoutState) {
  setters.opacity(state.opacity);
  setters.scale(state.scale);
  setters.x(state.x);
  setters.y(state.y);
}

function applyHeroRect(setters: HeroMediaSetters, rect: HeroRect) {
  setters.bottomLeftRadius(rect.borderRadius);
  setters.bottomRightRadius(rect.borderRadius);
  setters.borderRadius(rect.borderRadius);
  setters.height(rect.height);
  setters.scale(rect.scale);
  setters.topLeftRadius(rect.borderRadius);
  setters.topRightRadius(rect.borderRadius);
  setters.width(rect.width);
  setters.x(rect.x);
  setters.y(rect.y);
}

type UseRadiantShowcaseMotionProps = {
  content: RadiantExperienceContent;
  onReady?: () => void;
  refs: RadiantExperienceRefs;
};

export function useRadiantShowcaseMotion({
  content,
  onReady,
  refs,
}: UseRadiantShowcaseMotionProps) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 768px)",
        () => {
          if (
            !refs.showcaseSectionRef.current ||
            !refs.heroMatteRef.current ||
            !refs.heroMediaRef.current ||
            !refs.heroMediaFrameRef.current ||
            !refs.heroFinalImageRef.current ||
            !refs.heroTitleRef.current ||
            !refs.heroMonogramRef.current ||
            !refs.heroTopPatternRef.current ||
            !refs.heroMarqueeRef.current ||
            !refs.heroMarqueeTrackRef.current ||
            !refs.heroFinalMarqueeRef.current ||
            !refs.heroFinalMarqueeTrackRef.current ||
            !refs.activeServiceCopyShellRef.current ||
            !refs.serviceGridShellRef.current ||
            !refs.serviceHeaderRef.current ||
            !refs.serviceGridFooterRef.current ||
            !refs.sampleTileRef.current ||
            !refs.aboutSectionRef.current ||
            !refs.aboutContentRef.current
          ) {
            return undefined;
          }

          const serviceItems = content.services.items;
          const serviceCardNodes = refs.serviceCardsRef.current.filter(
            (card): card is HTMLDivElement => card !== null,
          );
          const serviceCopyNodes = refs.serviceCopyRefs.current.filter(
            (copy): copy is HTMLDivElement => copy !== null,
          );
          const serviceGridItemNodes = refs.serviceGridItemRefs.current.filter(
            (item): item is HTMLElement => item !== null,
          );
          const aboutCharNodes = refs.aboutCharRefs.current.filter(
            (char): char is HTMLSpanElement => char !== null,
          );
          const { aboutScrub, showcaseScrub, useTouchProfile } =
            getRadiantScrollProfile();
          const animateAboutChars = aboutCharNodes.length > 0;
          const serviceItemCount = serviceItems.length;
          const getStableViewportHeight = () =>
            refs.heroMediaRef.current?.parentElement?.clientHeight ?? window.innerHeight;

          const heroMatteScaleX = gsap.quickSetter(
            refs.heroMatteRef.current,
            "scaleX",
          ) as NumericSetter;
          const heroMatteWidth = gsap.quickSetter(
            refs.heroMatteRef.current,
            "width",
            "px",
          ) as NumericSetter;
          const heroTitleOpacity = gsap.quickSetter(
            refs.heroTitleRef.current,
            "opacity",
          ) as NumericSetter;
          const heroMediaFrameOpacity = gsap.quickSetter(
            refs.heroMediaFrameRef.current,
            "opacity",
          ) as NumericSetter;
          const heroFinalImageOpacity = gsap.quickSetter(
            refs.heroFinalImageRef.current,
            "opacity",
          ) as NumericSetter;
          const heroTitleY = gsap.quickSetter(
            refs.heroTitleRef.current,
            "y",
            "px",
          ) as NumericSetter;
          const heroTitleScale = createUniformScaleSetter(
            refs.heroTitleRef.current,
          );
          const heroTitleYPercent = gsap.quickSetter(
            refs.heroTitleRef.current,
            "yPercent",
          ) as NumericSetter;
          const heroMonogramOpacity = gsap.quickSetter(
            refs.heroMonogramRef.current,
            "opacity",
          ) as NumericSetter;
          const heroTopPatternTop = gsap.quickSetter(
            refs.heroTopPatternRef.current,
            "top",
            "px",
          ) as NumericSetter;
          const heroMonogramY = gsap.quickSetter(
            refs.heroMonogramRef.current,
            "y",
            "px",
          ) as NumericSetter;
          const heroMonogramScale = createUniformScaleSetter(
            refs.heroMonogramRef.current,
          );
          const heroMarqueeOpacity = gsap.quickSetter(
            refs.heroMarqueeRef.current,
            "opacity",
          ) as NumericSetter;
          const heroMarqueeX = gsap.quickSetter(
            refs.heroMarqueeRef.current,
            "x",
            "px",
          ) as NumericSetter;
          const heroMarqueeTrackXPercent = gsap.quickSetter(
            refs.heroMarqueeTrackRef.current,
            "xPercent",
          ) as NumericSetter;
          const heroFinalMarqueeOpacity = gsap.quickSetter(
            refs.heroFinalMarqueeRef.current,
            "opacity",
          ) as NumericSetter;
          const heroFinalMarqueeTrackXPercent = gsap.quickSetter(
            refs.heroFinalMarqueeTrackRef.current,
            "xPercent",
          ) as NumericSetter;
          const activeServiceCopyShellSetters = createOpacityYSetters(
            refs.activeServiceCopyShellRef.current,
          );
          const serviceGridShellSetters = createOpacityYSetters(
            refs.serviceGridShellRef.current,
          );
          const heroMediaSetters = createHeroMediaSetters(refs.heroMediaRef.current);
          const serviceGridItemSetters = serviceGridItemNodes.map(createXYSetters);
          const serviceCopySetters = serviceCopyNodes.map(createOpacityYSetters);
          const serviceCardSetters = serviceCardNodes.map(createLayoutSetters);
          const aboutContentSetters = createOpacityYSetters(
            refs.aboutContentRef.current,
          );
          const aboutCharSetters = aboutCharNodes.map(createAboutCharSetters);
          const aboutRevealSpan = aboutCharNodes.length + 10;

          gsap.set(refs.heroMatteRef.current, {
            transformOrigin: "left center",
          });

          const getMetrics = (): ShowcaseMetrics => {
            const viewportWidth = window.innerWidth;
            const viewportHeight = getStableViewportHeight();
            const headerShell = document.querySelector<HTMLElement>(
              "[data-radiant-header-shell]",
            );
            const headerHeight = headerShell?.offsetHeight ?? 80;
            const cardWidth =
              refs.sampleTileRef.current?.offsetWidth ??
              Math.min(Math.max(viewportWidth * 0.48, 608), 736);
            const mediaHeight =
              refs.sampleTileRef.current?.offsetHeight ?? cardWidth * (9 / 16);
            const cardAspectRatio = cardWidth / mediaHeight;
            const focusScale =
              viewportWidth >= 1720 ? 1.02 : viewportWidth >= 1440 ? 1.05 : 1.08;
            const previewScale =
              viewportWidth >= 1720 ? 0.52 : viewportWidth >= 1440 ? 0.48 : 0.44;
            const farScale = viewportWidth >= 1440 ? 0.2 : 0.18;
            const focusLeftX =
              viewportWidth / 2 - (cardWidth * focusScale) / 2;
            const previewGap =
              viewportWidth >= 1720 ? 36 : viewportWidth >= 1440 ? 24 : 20;
            const rowTop = Math.max(viewportHeight * 0.17, 132);
            const gridColumnGap =
              viewportWidth >= 1600 ? 24 : viewportWidth >= 1200 ? 20 : 16;
            const gridRowGap =
              viewportWidth >= 1400 ? 24 : viewportWidth >= 1024 ? 20 : 18;
            const gridItemGap =
              viewportWidth >= 1400 ? 12 : viewportWidth >= 1024 ? 10 : 8;
            const gridTitleHeight =
              viewportWidth >= 1400 ? 60 : viewportWidth >= 1024 ? 56 : 52;
            const gridFooterMarginTop =
              viewportWidth >= 1400 ? 24 : viewportWidth >= 1024 ? 22 : 20;
            const gridHeaderGap =
              viewportWidth >= 1400 ? 24 : viewportWidth >= 1024 ? 20 : 18;
            const gridTopPadding =
              viewportWidth >= 1400 ? 42 : viewportWidth >= 1024 ? 38 : 34;
            const gridBottomPadding =
              viewportWidth >= 1400 ? 30 : viewportWidth >= 1024 ? 26 : 22;
            const gridShellRect =
              refs.serviceGridShellRef.current?.getBoundingClientRect();
            const gridShellWidth = Math.max(gridShellRect?.width ?? 0, 220);
            const gridShellLeft =
              gridShellRect?.left ?? (viewportWidth - gridShellWidth) / 2;
            const gridHeaderHeight =
              refs.serviceHeaderRef.current?.offsetHeight ??
              (viewportWidth >= 1400 ? 188 : viewportWidth >= 1024 ? 176 : 164);
            const gridFooterHeight =
              refs.serviceGridFooterRef.current?.offsetHeight ?? 48;
            const gridMaxColumns = Math.min(4, serviceItemCount);
            const minimumCellWidth =
              viewportWidth >= 1600 ? 248 : viewportWidth >= 1280 ? 220 : 192;
            const availableGridWidth = Math.max(gridShellWidth, 220);
            const availableGridContentHeight = Math.max(
              viewportHeight -
              gridTopPadding -
              gridBottomPadding -
              gridHeaderHeight -
              gridHeaderGap,
              220,
            ) -
              gridFooterHeight -
              gridFooterMarginTop;
            const clampedGridContentHeight = Math.max(
              availableGridContentHeight,
              220,
            );
            let gridColumns = Math.min(
              viewportWidth >= 1500 ? 4 : viewportWidth >= 1120 ? 3 : 2,
              gridMaxColumns,
            );
            let gridCellWidth = 0;
            let gridRows = 0;

            for (let columns = gridMaxColumns; columns >= 1; columns -= 1) {
              const rows = Math.ceil(serviceItemCount / columns);
              const widthBasedCellWidth =
                (availableGridWidth - gridColumnGap * (columns - 1)) / columns;
              const maxImageHeight = Math.max(
                120,
                (clampedGridContentHeight - gridRowGap * (rows - 1)) / rows -
                gridItemGap -
                gridTitleHeight,
              );
              const cellWidth = Math.min(
                widthBasedCellWidth,
                maxImageHeight * cardAspectRatio,
              );

              if (cellWidth >= minimumCellWidth) {
                gridColumns = columns;
                gridCellWidth = cellWidth;
                gridRows = rows;
                break;
              }

              if (cellWidth > gridCellWidth) {
                gridColumns = columns;
                gridCellWidth = cellWidth;
                gridRows = rows;
              }
            }

            const gridImageHeight = gridCellWidth / cardAspectRatio;
            const gridItemHeight =
              gridImageHeight + gridItemGap + gridTitleHeight;
            const gridContentHeight =
              gridRows * gridItemHeight + gridRowGap * (gridRows - 1);
            const gridClusterHeight =
              gridHeaderHeight +
              gridHeaderGap +
              gridContentHeight +
              gridFooterMarginTop +
              gridFooterHeight;
            const maxClusterTop = Math.max(
              gridTopPadding,
              viewportHeight - gridBottomPadding - gridClusterHeight,
            );
            const gridClusterTop = gsap.utils.clamp(
              gridTopPadding,
              maxClusterTop,
              (viewportHeight - gridClusterHeight) / 2,
            );
            const copyOffset = Math.max(24, viewportHeight * 0.028);

            return {
              cardWidth,
              copyOffset,
              farScale,
              focusScale,
              focusLeftX,
              gridCellWidth,
              gridColumns,
              gridColumnGap,
              gridContentHeight,
              gridFooterMarginTop,
              gridHeaderGap,
              gridImageHeight,
              gridItemGap,
              gridItemHeight,
              gridRowGap,
              gridShellLeft,
              gridShellTop: gridClusterTop,
              gridShellWidth,
              gridTop: gridClusterTop + gridHeaderHeight + gridHeaderGap,
              gridTitleHeight,
              headerHeight,
              mediaHeight,
              previewGap,
              previewScale,
              rowTop,
              viewportHeight,
              viewportWidth,
            };
          };

          const getRowState = (
            index: number,
            focus: number,
            metrics: ShowcaseMetrics,
          ): LayoutState => {
            const distance = index - focus;
            const absoluteDistance = Math.abs(distance);
            const previewProgress = gsap.utils.clamp(0, 1, absoluteDistance);
            const offscreenProgress = gsap.utils.clamp(
              0,
              1,
              absoluteDistance - 1,
            );
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
                : lerp(
                  metrics.previewScale,
                  metrics.farScale,
                  offscreenProgress,
                );
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
                : lerp(
                  metrics.rowTop + 26,
                  metrics.rowTop + 62,
                  offscreenProgress,
                );
            const visualX =
              absoluteDistance <= 1
                ? lerp(metrics.focusLeftX, previewVisualLeft, previewProgress)
                : lerp(
                  previewVisualLeft,
                  offscreenVisualLeft,
                  offscreenProgress,
                );

            return {
              opacity,
              scale,
              x: visualLeftToTransformX(visualX, metrics.cardWidth, scale),
              y,
            };
          };

          const getGridState = (
            index: number,
            metrics: ShowcaseMetrics,
          ): LayoutState => {
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
          };

          const getGridShellItemPosition = (
            index: number,
            metrics: ShowcaseMetrics,
          ) => {
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
          };

          const getDerivedLayout = (
            metrics: ShowcaseMetrics,
          ): ShowcaseDerivedLayout => {
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
            const rowZeroState = getRowState(0, 0, metrics);
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
              (_, index) => getRowState(index, serviceItemCount - 1, metrics),
            );
            const gridStates = Array.from(
              { length: serviceItemCount },
              (_, index) => getGridState(index, metrics),
            );
            const enterStates = serviceCardNodes.map((_, nodeIndex) => ({
              opacity: 0,
              scale: metrics.farScale,
              x: metrics.viewportWidth + nodeIndex * 100,
              y: rowZeroState.y + 42,
            }));

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
          };

          let cachedMetrics = getMetrics();
          let derivedLayout = getDerivedLayout(cachedMetrics);

          const updateMetrics = () => {
            cachedMetrics = getMetrics();
            derivedLayout = getDerivedLayout(cachedMetrics);
            return cachedMetrics;
          };

          const applyMetricBoundLayout = (metrics: ShowcaseMetrics) => {
            const openingTop = metrics.headerHeight + 6;

            heroTopPatternTop(openingTop);
            heroMatteScaleX(0.5);
            heroMatteWidth(metrics.viewportWidth);
            refs.showcaseSectionRef.current?.style.setProperty(
              "--showcase-focus-copy-width",
              `${metrics.cardWidth * metrics.focusScale}px`,
            );
            refs.showcaseSectionRef.current?.style.setProperty(
              "--showcase-opening-top",
              `${openingTop}px`,
            );
            refs.serviceGridShellRef.current?.style.setProperty(
              "--showcase-grid-columns",
              `${metrics.gridColumns}`,
            );
            refs.serviceGridShellRef.current?.style.setProperty(
              "--showcase-grid-column-gap",
              `${metrics.gridColumnGap}px`,
            );
            refs.serviceGridShellRef.current?.style.setProperty(
              "--showcase-grid-footer-margin-top",
              `${metrics.gridFooterMarginTop}px`,
            );
            refs.serviceGridShellRef.current?.style.setProperty(
              "--showcase-grid-header-gap",
              `${metrics.gridHeaderGap}px`,
            );
            refs.serviceGridShellRef.current?.style.setProperty(
              "--showcase-grid-content-height",
              `${metrics.gridContentHeight}px`,
            );
            refs.serviceGridShellRef.current?.style.setProperty(
              "--showcase-grid-item-gap",
              `${metrics.gridItemGap}px`,
            );
            refs.serviceGridShellRef.current?.style.setProperty(
              "--showcase-grid-row-gap",
              `${metrics.gridRowGap}px`,
            );
            refs.serviceGridShellRef.current?.style.setProperty(
              "--showcase-grid-slot-width",
              `${metrics.gridCellWidth}px`,
            );
            refs.serviceGridShellRef.current?.style.setProperty(
              "--showcase-grid-title-height",
              `${metrics.gridTitleHeight}px`,
            );
            serviceGridItemSetters.forEach((setters, index) => {
              const position = getGridShellItemPosition(index, metrics);

              setters.x(position.x);
              setters.y(position.y);
            });
          };

          const initialMetrics = updateMetrics();
          applyMetricBoundLayout(initialMetrics);
          onReady?.();

          applyHeroRect(heroMediaSetters, derivedLayout.introRect);
          heroTitleOpacity(1);
          heroTitleY(0);
          heroTitleScale(1);
          heroTitleYPercent(0);
          heroMonogramOpacity(1);
          heroMonogramY(0);
          heroMonogramScale(1);
          heroMediaFrameOpacity(1);
          heroFinalImageOpacity(0);
          heroMarqueeOpacity(0);
          heroMarqueeX(0);
          heroMarqueeTrackXPercent(0);
          heroFinalMarqueeOpacity(0);
          heroFinalMarqueeTrackXPercent(100);
          activeServiceCopyShellSetters.opacity(0);
          activeServiceCopyShellSetters.y(0);
          serviceGridShellSetters.opacity(0);
          serviceGridShellSetters.y(initialMetrics.gridShellTop + 28);
          serviceGridItemSetters.forEach((setters) => {
            setters.opacity(0);
            setters.yPercent(18);
          });
          serviceCopySetters.forEach((setters) => {
            setters.opacity(0);
            setters.y(0);
          });
          serviceCardSetters.forEach((setters) => {
            setters.opacity(0);
          });
          aboutContentSetters.opacity(0.38);
          aboutContentSetters.y(72);

          aboutCharSetters.forEach((setters) => {
            setters.opacity(animateAboutChars ? 0.22 : 1);
            setters.color(animateAboutChars ? "#bdb7b0" : "var(--foreground)");
          });

          const renderShowcase = (
            progress: number,
            metrics: ShowcaseMetrics = cachedMetrics,
          ) => {
            const {
              dropRect,
              enterStates,
              fullRect,
              gridStates,
              introRect,
              rowZeroRect,
              rowZeroState,
              slideRect,
              terminalRowStates,
            } = derivedLayout;
            const introMediaProgress = gsap.utils.clamp(0, 1, progress / 0.24);
            const patternFadeProgress = gsap.utils.clamp(0, 1, progress / 0.08);
            const openingFadeProgress = gsap.utils.clamp(
              0,
              1,
              (progress - 0.14) / 0.1,
            );
            const shineSlideProgress = gsap.utils.clamp(
              0,
              1,
              (progress - 0.24) / 0.18,
            );
            const finalMarqueeRevealProgress = gsap.utils.clamp(
              0,
              1,
              (progress - 0.42) / 0.06,
            );
            const finalMarqueeRunProgress = gsap.utils.clamp(
              0,
              1,
              (progress - 0.42) / 0.3,
            );
            const shrinkProgress = gsap.utils.clamp(
              0,
              1,
              (progress - 0.72) / 0.12,
            );
            const rowRevealProgress = gsap.utils.clamp(
              0,
              1,
              (progress - 0.84) / 0.06,
            );
            const holdProgress = gsap.utils.clamp(
              0,
              1,
              (progress - 0.9) / 0.03,
            );
            const focusPhaseProgress = gsap.utils.clamp(
              0,
              1,
              (progress - 0.93) / 0.04,
            );
            const gridProgress = gsap.utils.clamp(
              0,
              1,
              (progress - 0.97) / 0.03,
            );
            const focusIndex = getSmoothFocusValue(
              focusPhaseProgress,
              serviceItemCount - 1,
            );
            const activeCopyIndex =
              progress < 0.93 ? 0 : Math.round(focusIndex);
            const rowStates = new Array<LayoutState>(serviceItemCount);

            for (let index = 0; index < serviceItemCount; index += 1) {
              rowStates[index] = getRowState(index, focusIndex, metrics);
            }

            const introTravelDistance = dropRect.y - introRect.y;
            const openingLayerY = introTravelDistance * introMediaProgress;
            const openingVisibility =
              progress <= 0.14 ? 1 : 1 - aboutContentEase(openingFadeProgress);
            const patternOpacity = 1 - aboutContentEase(patternFadeProgress);
            const makeBrandOpacity = progress <= 0.42 ? 1 : 0;
            const finalImageRevealProgress = gsap.utils.clamp(
              0,
              1,
              (progress - 0.22) / 0.04,
            );

            heroMatteScaleX(0);
            heroMediaFrameOpacity(1 - finalImageRevealProgress);
            heroFinalImageOpacity(finalImageRevealProgress);
            heroTitleOpacity(openingVisibility);
            heroTitleY(openingLayerY);
            heroTitleScale(1);
            heroTitleYPercent(0);
            heroMonogramOpacity(patternOpacity);
            heroMonogramY(0);
            heroMonogramScale(1);
            heroMarqueeOpacity(makeBrandOpacity);
            heroMarqueeX(
              progress < 0.24
                ? 0
                : lerp(0, -metrics.viewportWidth, shineSlideProgress),
            );
            heroMarqueeTrackXPercent(0);
            heroFinalMarqueeOpacity(
              progress < 0.42
                ? 0
                : progress < 0.48
                  ? aboutContentEase(finalMarqueeRevealProgress)
                  : progress < 0.84
                    ? 1
                    : 1 - gsap.utils.clamp(0, 1, (progress - 0.84) / 0.08),
            );
            heroFinalMarqueeTrackXPercent(
              progress < 0.42
                ? 100
                : progress < 0.72
                  ? lerp(100, -110, finalMarqueeRunProgress)
                  : -110,
            );

            const activeFocusState =
              progress < 0.93 ? rowZeroState : rowStates[activeCopyIndex];
            const currentHeroRowState =
              gridProgress > 0
                ? morphState(
                  terminalRowStates[0],
                  gridStates[0],
                  gridProgress,
                )
                : rowStates[0];

            if (progress <= 0.24) {
              const introTopRadius = lerp(introRect.borderRadius, 0, introMediaProgress);

              heroMediaSetters.borderRadius(0);
              heroMediaSetters.topLeftRadius(introTopRadius);
              heroMediaSetters.topRightRadius(introTopRadius);
              heroMediaSetters.bottomLeftRadius(0);
              heroMediaSetters.bottomRightRadius(0);
              heroMediaSetters.height(
                lerp(introRect.height, dropRect.height, introMediaProgress),
              );
              heroMediaSetters.scale(1);
              heroMediaSetters.width(
                lerp(introRect.width, dropRect.width, introMediaProgress),
              );
              heroMediaSetters.x(lerp(introRect.x, dropRect.x, introMediaProgress));
              heroMediaSetters.y(lerp(introRect.y, dropRect.y, introMediaProgress));
            } else if (progress <= 0.42) {
              applyHeroRect(heroMediaSetters, {
                borderRadius: 0,
                height: fullRect.height,
                scale: 1,
                width: fullRect.width,
                x: lerp(slideRect.x, fullRect.x, shineSlideProgress),
                y: 0,
              });
            } else if (progress <= 0.94) {
              heroMediaSetters.borderRadius(
                lerp(fullRect.borderRadius, rowZeroRect.borderRadius, shrinkProgress),
              );
              heroMediaSetters.height(
                lerp(fullRect.height, rowZeroRect.height, shrinkProgress),
              );
              heroMediaSetters.scale(lerp(1, rowZeroRect.scale, shrinkProgress));
              heroMediaSetters.width(
                lerp(fullRect.width, rowZeroRect.width, shrinkProgress),
              );
              heroMediaSetters.x(lerp(fullRect.x, rowZeroRect.x, shrinkProgress));
              heroMediaSetters.y(lerp(fullRect.y, rowZeroRect.y, shrinkProgress));
            } else {
              applyHeroRect(heroMediaSetters, {
                borderRadius: 24,
                height: metrics.mediaHeight,
                scale: currentHeroRowState.scale,
                width: metrics.cardWidth,
                x: currentHeroRowState.x,
                y: currentHeroRowState.y,
              });
            }

            const copyShellOpacity =
              progress < 0.84
                ? 0
                : progress < 0.93
                  ? rowRevealProgress
                  : 1 - gsap.utils.clamp(0, 1, gridProgress * 1.24);

            activeServiceCopyShellSetters.opacity(copyShellOpacity);
            activeServiceCopyShellSetters.y(
              activeFocusState.y +
              metrics.mediaHeight * activeFocusState.scale +
              metrics.copyOffset +
              holdProgress * 8,
            );

            serviceCopySetters.forEach((setters, index) => {
              const revealStrength =
                progress < 0.93
                  ? index === 0
                    ? rowRevealProgress
                    : 0
                  : index === activeCopyIndex
                    ? 1
                    : 0;

              const clampedRevealStrength = gsap.utils.clamp(0, 1, revealStrength);

              setters.opacity(
                progress < 0.84 ? 0 : (1 - gridProgress) * clampedRevealStrength,
              );
              setters.y(18 - clampedRevealStrength * 18);
            });

            const gridShellReveal = aboutContentEase(gridProgress);
            const gridTitleReveal = gsap.utils.clamp(
              0,
              1,
              (gridProgress - 0.56) / 0.22,
            );
            const easedGridTitleReveal = aboutContentEase(gridTitleReveal);
            serviceGridShellSetters.opacity(gridShellReveal);
            serviceGridShellSetters.y(
              metrics.gridShellTop + 28 - gridShellReveal * 28,
            );
            serviceGridItemSetters.forEach((setters) => {
              setters.opacity(easedGridTitleReveal);
              setters.yPercent(18 - easedGridTitleReveal * 18);
            });

            serviceCardSetters.forEach((setters, nodeIndex) => {
              const itemIndex = nodeIndex + 1;
              const rowState =
                gridProgress > 0
                  ? morphState(
                    terminalRowStates[itemIndex],
                    gridStates[itemIndex],
                    gridProgress,
                  )
                  : rowStates[itemIndex];

              const currentState =
                progress < 0.93
                  ? morphState(enterStates[nodeIndex], rowState, rowRevealProgress)
                  : rowState;

              applyLayoutState(setters, currentState);
            });
          };

          const showcaseTrigger = ScrollTrigger.create({
            trigger: refs.showcaseSectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: showcaseScrub,
            onRefresh: (self) => {
              const refreshedMetrics = updateMetrics();
              applyMetricBoundLayout(refreshedMetrics);
              renderShowcase(self.progress, refreshedMetrics);
            },
            onUpdate: (self) => {
              renderShowcase(self.progress);
            },
          });

          renderShowcase(showcaseTrigger.progress, cachedMetrics);

          const renderAbout = (progress: number) => {
            const contentProgress = gsap.utils.clamp(0, 1, progress / 0.28);
            const charProgress = gsap.utils.clamp(0, 1, (progress - 0.12) / 0.72);
            const easedContentProgress = aboutContentEase(contentProgress);
            const easedCharProgress = aboutCharEase(charProgress);
            const revealPosition = easedCharProgress * aboutRevealSpan;

            aboutContentSetters.opacity(lerp(0.38, 1, easedContentProgress));
            aboutContentSetters.y(lerp(72, 0, easedContentProgress));

            if (!animateAboutChars) {
              return;
            }

            aboutCharSetters.forEach((setters, index) => {
              const localProgress = gsap.utils.clamp(
                0,
                1,
                revealPosition - index,
              );

              setters.opacity(0.22 + localProgress * 0.78);
              setters.color(
                localProgress > 0.52 ? "var(--foreground)" : "#bdb7b0",
              );
            });
          };

          const getAboutRevealDistance = () => {
            const aboutContentHeight =
              refs.aboutContentRef.current?.offsetHeight ?? 0;

            return Math.max(getStableViewportHeight(), aboutContentHeight * 0.9);
          };

          const aboutTrigger = ScrollTrigger.create({
            trigger: refs.aboutContentRef.current,
            start: "top 66%",
            end: () => `+=${getAboutRevealDistance()}`,
            scrub: aboutScrub,
            invalidateOnRefresh: true,
            onRefresh: (self) => {
              renderAbout(self.progress);
            },
            onUpdate: (self) => {
              renderAbout(self.progress);
            },
          });

          renderAbout(aboutTrigger.progress);

          let resizeFrame = 0;
          let lastViewportWidth = window.innerWidth;
          let lastViewportHeight = window.innerHeight;

          const handleResize = () => {
            cancelAnimationFrame(resizeFrame);
            resizeFrame = requestAnimationFrame(() => {
              const nextViewportWidth = window.innerWidth;
              const nextViewportHeight = window.innerHeight;
              const widthDelta = Math.abs(nextViewportWidth - lastViewportWidth);
              const heightDelta = Math.abs(nextViewportHeight - lastViewportHeight);

              lastViewportWidth = nextViewportWidth;
              lastViewportHeight = nextViewportHeight;

              // Ignore iOS browser chrome height changes so sticky scroll scenes
              // do not refresh mid-scroll and snap backward.
              if (useTouchProfile && widthDelta < 2 && heightDelta < 160) {
                return;
              }

              ScrollTrigger.refresh();
            });
          };

          window.addEventListener("resize", handleResize);

          return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(resizeFrame);
            showcaseTrigger.kill();
            aboutTrigger.kill();
          };
        },
      );

      mm.add(
        "(prefers-reduced-motion: no-preference) and (max-width: 767px)",
        () => {
          if (
            !refs.mobileHeroSectionRef.current ||
            !refs.mobileHeroMarqueeRef.current ||
            !refs.mobileHeroTopContentRef.current ||
            !refs.mobileHeroTopOverlayRef.current ||
            !refs.aboutContentRef.current
          ) {
            return undefined;
          }

          const { aboutScrub, showcaseScrub } = getRadiantScrollProfile();
          const aboutCharNodes = refs.aboutCharRefs.current.filter(
            (char): char is HTMLSpanElement => char !== null,
          );
          const animateAboutChars = aboutCharNodes.length > 0;
          const marqueeX = gsap.quickSetter(
            refs.mobileHeroMarqueeRef.current,
            "x",
            "px",
          ) as NumericSetter;
          const marqueeOpacity = gsap.quickSetter(
            refs.mobileHeroMarqueeRef.current,
            "opacity",
          ) as NumericSetter;
          const topContentOpacity = gsap.quickSetter(
            refs.mobileHeroTopContentRef.current,
            "opacity",
          ) as NumericSetter;
          const topContentY = gsap.quickSetter(
            refs.mobileHeroTopContentRef.current,
            "y",
            "px",
          ) as NumericSetter;
          const topContentFilter = gsap.quickSetter(
            refs.mobileHeroTopContentRef.current,
            "filter",
          ) as StringSetter;
          const topOverlayOpacity = gsap.quickSetter(
            refs.mobileHeroTopOverlayRef.current,
            "opacity",
          ) as NumericSetter;
          const aboutContentSetters = createOpacityYSetters(
            refs.aboutContentRef.current,
          );
          const aboutCharSetters = aboutCharNodes.map(createAboutCharSetters);
          const aboutRevealSpan = aboutCharNodes.length + 10;

          const getMetrics = () => {
            const viewportWidth = window.innerWidth;
            const marqueeWidth =
              refs.mobileHeroMarqueeRef.current?.offsetWidth ?? viewportWidth;
            const endInset = Math.max(24, viewportWidth * 0.06);

            return {
              endX: Math.min(0, viewportWidth - marqueeWidth - endInset),
              startX: viewportWidth,
            };
          };

          let metrics = getMetrics();

          aboutContentSetters.opacity(0.38);
          aboutContentSetters.y(48);
          aboutCharSetters.forEach((setters) => {
            setters.opacity(animateAboutChars ? 0.18 : 1);
            setters.color(animateAboutChars ? "#bdb7b0" : "var(--foreground)");
          });

          const renderMobileHero = (progress: number) => {
            const blurProgress = gsap.utils.clamp(
              0,
              1,
              (progress - 0.05) / 0.28,
            );
            const travelProgress = gsap.utils.clamp(
              0,
              1,
              progress / 0.55,
            );

            topContentOpacity(1 - blurProgress * 0.55);
            topContentY(-blurProgress * 10);
            topContentFilter(`blur(${blurProgress * 6}px)`);
            topOverlayOpacity(blurProgress * 0.38);
            marqueeOpacity(1);
            marqueeX(lerp(metrics.startX, metrics.endX, travelProgress));
          };

          const renderAbout = (progress: number) => {
            const contentProgress = gsap.utils.clamp(0, 1, progress / 0.24);
            const charProgress = gsap.utils.clamp(0, 1, (progress - 0.08) / 0.78);
            const easedContentProgress = aboutContentEase(contentProgress);
            const easedCharProgress = aboutCharEase(charProgress);
            const revealPosition = easedCharProgress * aboutRevealSpan;

            aboutContentSetters.opacity(lerp(0.38, 1, easedContentProgress));
            aboutContentSetters.y(lerp(48, 0, easedContentProgress));

            if (!animateAboutChars) {
              return;
            }

            aboutCharSetters.forEach((setters, index) => {
              const localProgress = gsap.utils.clamp(
                0,
                1,
                revealPosition - index,
              );

              setters.opacity(0.18 + localProgress * 0.82);
              setters.color(
                localProgress > 0.5 ? "var(--foreground)" : "#bdb7b0",
              );
            });
          };

          const getAboutRevealDistance = () => {
            const aboutContentHeight =
              refs.aboutContentRef.current?.offsetHeight ?? 0;

            return Math.max(window.innerHeight * 0.9, aboutContentHeight * 1.1);
          };

          const mobileHeroTrigger = ScrollTrigger.create({
            trigger: refs.mobileHeroSectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: Math.max(showcaseScrub, 1.1),
            onRefresh: (self) => {
              metrics = getMetrics();
              renderMobileHero(self.progress);
            },
            onUpdate: (self) => {
              renderMobileHero(self.progress);
            },
          });

          const aboutTrigger = ScrollTrigger.create({
            trigger: refs.aboutContentRef.current,
            start: "top 78%",
            end: () => `+=${getAboutRevealDistance()}`,
            scrub: Math.max(aboutScrub, 0.8),
            invalidateOnRefresh: true,
            onRefresh: (self) => {
              renderAbout(self.progress);
            },
            onUpdate: (self) => {
              renderAbout(self.progress);
            },
          });

          renderMobileHero(mobileHeroTrigger.progress);
          renderAbout(aboutTrigger.progress);

          return () => {
            mobileHeroTrigger.kill();
            aboutTrigger.kill();
          };
        },
      );

      return () => {
        mm.revert();
      };
    },
    { scope: refs.rootRef },
  );
}
