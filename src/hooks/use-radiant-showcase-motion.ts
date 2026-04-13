"use client";

import { useEffect } from "react";

import {
  createQuickSetter,
  ensureMotionRuntime,
  gsap,
  ScrollTrigger,
} from "@/lib/animations";
import { clamp, lerp } from "@/lib/animations/utils";
import { getRadiantScrollProfile } from "@/lib/motion/radiant-scroll-profiles";
import {
  getGridShellItemPosition,
  getShowcaseDerivedLayout,
  getShowcaseRowState,
  morphState,
  type HeroRect,
  type ShowcaseMetrics,
} from "@/lib/motion/showcase-scene";
import type {
  LayoutState,
  RadiantExperienceContent,
  RadiantExperienceRefs,
} from "@/components/marketing/radiant-experience.types";

type NumericSetter = (value: number) => void;
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

const aboutContentEase = gsap.parseEase("power2.out");
const INTRO_SCROLL_SHARE = 3.45;
const ROW_REVEAL_DURATION = 0.55;
const SERVICE_STEP_DURATION = 1;
const FINAL_SERVICE_HOLD_DURATION = 1;
const GRID_OUTRO_DURATION = 2.25;
const SERVICE_SCRUB = 0.42;
const SERVICE_SNAP_DELAY = 0.08;
const SERVICE_COPY_FADE_DURATION = 0.32;
const GRID_SNAP_DURATION = { max: 0.78, min: 0.34 } as const;

type ShowcaseMasterState = {
  finalMarqueeRevealProgress: number;
  finalMarqueeRunProgress: number;
  gridProgress: number;
  introMediaProgress: number;
  openingFadeProgress: number;
  patternFadeProgress: number;
  rowRevealProgress: number;
  serviceFocus: number;
  shineSlideProgress: number;
  shrinkProgress: number;
};

function createUniformScaleSetter(node: HTMLElement): NumericSetter {
  const scaleX = createQuickSetter(node, "scaleX") as NumericSetter;
  const scaleY = createQuickSetter(node, "scaleY") as NumericSetter;

  return (value: number) => {
    scaleX(value);
    scaleY(value);
  };
}

function createLayoutSetters(node: HTMLElement): LayoutSetters {
  return {
    opacity: createQuickSetter(node, "opacity") as NumericSetter,
    scale: createUniformScaleSetter(node),
    x: createQuickSetter(node, "x", "px") as NumericSetter,
    y: createQuickSetter(node, "y", "px") as NumericSetter,
  };
}

function createHeroMediaSetters(node: HTMLElement): HeroMediaSetters {
  return {
    ...createLayoutSetters(node),
    bottomLeftRadius: createQuickSetter(
      node,
      "borderBottomLeftRadius",
      "px",
    ) as NumericSetter,
    bottomRightRadius: createQuickSetter(
      node,
      "borderBottomRightRadius",
      "px",
    ) as NumericSetter,
    borderRadius: createQuickSetter(node, "borderRadius", "px") as NumericSetter,
    height: createQuickSetter(node, "height", "px") as NumericSetter,
    topLeftRadius: createQuickSetter(
      node,
      "borderTopLeftRadius",
      "px",
    ) as NumericSetter,
    topRightRadius: createQuickSetter(
      node,
      "borderTopRightRadius",
      "px",
    ) as NumericSetter,
    width: createQuickSetter(node, "width", "px") as NumericSetter,
  };
}

function createOpacityYSetters(node: HTMLElement): OpacityYSetters {
  return {
    opacity: createQuickSetter(node, "opacity") as NumericSetter,
    y: createQuickSetter(node, "y", "px") as NumericSetter,
  };
}

function createXYSetters(node: HTMLElement): XYSetters {
  return {
    opacity: createQuickSetter(node, "opacity") as NumericSetter,
    x: createQuickSetter(node, "x", "px") as NumericSetter,
    y: createQuickSetter(node, "y", "px") as NumericSetter,
    yPercent: createQuickSetter(node, "yPercent") as NumericSetter,
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
  useEffect(
    () => {
      ensureMotionRuntime();

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
          const { useTouchProfile } = getRadiantScrollProfile();
          const serviceItemCount = serviceItems.length;
          const getStableViewportHeight = () =>
            refs.heroMediaRef.current?.parentElement?.clientHeight ?? window.innerHeight;

          const heroMatteScaleX = createQuickSetter(
            refs.heroMatteRef.current,
            "scaleX",
          ) as NumericSetter;
          const heroMatteWidth = createQuickSetter(
            refs.heroMatteRef.current,
            "width",
            "px",
          ) as NumericSetter;
          const heroTitleOpacity = createQuickSetter(
            refs.heroTitleRef.current,
            "opacity",
          ) as NumericSetter;
          const heroMediaFrameOpacity = createQuickSetter(
            refs.heroMediaFrameRef.current,
            "opacity",
          ) as NumericSetter;
          const heroFinalImageOpacity = createQuickSetter(
            refs.heroFinalImageRef.current,
            "opacity",
          ) as NumericSetter;
          const heroTitleY = createQuickSetter(
            refs.heroTitleRef.current,
            "y",
            "px",
          ) as NumericSetter;
          const heroTitleScale = createUniformScaleSetter(
            refs.heroTitleRef.current,
          );
          const heroTitleYPercent = createQuickSetter(
            refs.heroTitleRef.current,
            "yPercent",
          ) as NumericSetter;
          const heroMonogramOpacity = createQuickSetter(
            refs.heroMonogramRef.current,
            "opacity",
          ) as NumericSetter;
          const heroTopPatternTop = createQuickSetter(
            refs.heroTopPatternRef.current,
            "top",
            "px",
          ) as NumericSetter;
          const heroMonogramY = createQuickSetter(
            refs.heroMonogramRef.current,
            "y",
            "px",
          ) as NumericSetter;
          const heroMonogramScale = createUniformScaleSetter(
            refs.heroMonogramRef.current,
          );
          const heroMarqueeOpacity = createQuickSetter(
            refs.heroMarqueeRef.current,
            "opacity",
          ) as NumericSetter;
          const heroMarqueeX = createQuickSetter(
            refs.heroMarqueeRef.current,
            "x",
            "px",
          ) as NumericSetter;
          const heroMarqueeTrackXPercent = createQuickSetter(
            refs.heroMarqueeTrackRef.current,
            "xPercent",
          ) as NumericSetter;
          const heroFinalMarqueeOpacity = createQuickSetter(
            refs.heroFinalMarqueeRef.current,
            "opacity",
          ) as NumericSetter;
          const heroFinalMarqueeTrackXPercent = createQuickSetter(
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
            const gridClusterTop = clamp(
              (viewportHeight - gridClusterHeight) / 2,
              gridTopPadding,
              maxClusterTop,
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

          let cachedMetrics = getMetrics();
          let derivedLayout = getShowcaseDerivedLayout(
            cachedMetrics,
            serviceItemCount,
            serviceCardNodes.length,
          );

          const updateMetrics = () => {
            cachedMetrics = getMetrics();
            derivedLayout = getShowcaseDerivedLayout(
              cachedMetrics,
              serviceItemCount,
              serviceCardNodes.length,
            );
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
              const position = getGridShellItemPosition(
                index,
                metrics,
                serviceItemCount,
              );

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

          const showcaseState: ShowcaseMasterState = {
            finalMarqueeRevealProgress: 0,
            finalMarqueeRunProgress: 0,
            gridProgress: 0,
            introMediaProgress: 0,
            openingFadeProgress: 0,
            patternFadeProgress: 0,
            rowRevealProgress: 0,
            serviceFocus: 0,
            shineSlideProgress: 0,
            shrinkProgress: 0,
          };

          const renderShowcase = (
            state: ShowcaseMasterState,
            metrics: ShowcaseMetrics = cachedMetrics,
          ) => {
            const {
              dropRect,
              enterStates,
              fullRect,
              gridStates,
              introRect,
              rowZeroRect,
              slideRect,
            } = derivedLayout;
            const {
              finalMarqueeRevealProgress,
              finalMarqueeRunProgress,
              gridProgress,
              introMediaProgress,
              openingFadeProgress,
              patternFadeProgress,
              rowRevealProgress,
              serviceFocus,
              shineSlideProgress,
              shrinkProgress,
            } = state;
            const activeCopyIndex = Math.round(serviceFocus);
            const rowStates = new Array<LayoutState>(serviceItemCount);

            for (let index = 0; index < serviceItemCount; index += 1) {
              rowStates[index] = getShowcaseRowState(index, serviceFocus, metrics);
            }

            const introTravelDistance = dropRect.y - introRect.y;
            const openingLayerY = introTravelDistance * introMediaProgress;
            const openingVisibility = 1 - aboutContentEase(openingFadeProgress);
            const patternOpacity = 1 - aboutContentEase(patternFadeProgress);
            const finalImageRevealProgress = clamp(
              introMediaProgress * 2.75 - 1.75,
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
            heroMarqueeOpacity(1 - clamp(finalMarqueeRevealProgress * 1.35));
            heroMarqueeX(
              lerp(0, -metrics.viewportWidth, shineSlideProgress),
            );
            heroMarqueeTrackXPercent(0);
            heroFinalMarqueeOpacity(
              rowRevealProgress > 0
                ? 1 - clamp(rowRevealProgress)
                : aboutContentEase(finalMarqueeRevealProgress),
            );
            heroFinalMarqueeTrackXPercent(lerp(100, -110, finalMarqueeRunProgress));

            const activeFocusState = rowStates[activeCopyIndex] ?? rowStates[0];
            const currentHeroRowState =
              gridProgress > 0
                ? morphState(
                  rowStates[0],
                  gridStates[0],
                  gridProgress,
                )
                : rowStates[0];

            if (introMediaProgress < 1) {
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
            } else if (shineSlideProgress < 1) {
              applyHeroRect(heroMediaSetters, {
                borderRadius: 0,
                height: fullRect.height,
                scale: 1,
                width: fullRect.width,
                x: lerp(slideRect.x, fullRect.x, shineSlideProgress),
                y: 0,
              });
            } else if (shrinkProgress < 1) {
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
              rowRevealProgress < 1
                ? rowRevealProgress
                : 1 - clamp(gridProgress * 1.24);

            activeServiceCopyShellSetters.opacity(copyShellOpacity);
            activeServiceCopyShellSetters.y(
              activeFocusState.y +
              metrics.mediaHeight * activeFocusState.scale +
              metrics.copyOffset,
            );

            serviceCopySetters.forEach((setters, index) => {
              const revealStrength =
                rowRevealProgress < 1
                  ? index === 0
                    ? rowRevealProgress
                    : 0
                  : clamp(
                    1 -
                      Math.abs(index - serviceFocus) / SERVICE_COPY_FADE_DURATION,
                  );

              const clampedRevealStrength = aboutContentEase(
                clamp(revealStrength),
              );

              setters.opacity((1 - gridProgress) * clampedRevealStrength);
              setters.y(18 - clampedRevealStrength * 18);
            });

            const gridShellReveal = aboutContentEase(gridProgress);
            const gridTitleReveal = clamp((gridProgress - 0.56) / 0.22);
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
                    rowStates[itemIndex],
                    gridStates[itemIndex],
                    gridProgress,
                  )
                  : rowStates[itemIndex];

              const currentState =
                rowRevealProgress < 1
                  ? morphState(enterStates[nodeIndex], rowState, rowRevealProgress)
                  : rowState;

              applyLayoutState(setters, currentState);
            });
          };

          const showcaseTimeline = gsap.timeline({
            defaults: { ease: "none" },
            paused: true,
            onUpdate: () => {
              renderShowcase(showcaseState);
            },
          });
          const serviceScrub = useTouchProfile ? 0.28 : SERVICE_SCRUB;

          showcaseTimeline
            .to(showcaseState, {
              duration: 1.15,
              introMediaProgress: 1,
            })
            .to(showcaseState, {
              duration: 0.42,
              openingFadeProgress: 1,
            }, 0.56)
            .to(showcaseState, {
              duration: 0.5,
              patternFadeProgress: 1,
            }, 0)
            .to(showcaseState, {
              duration: 0.92,
              shineSlideProgress: 1,
            }, 1.15)
            .to(showcaseState, {
              duration: 0.24,
              finalMarqueeRevealProgress: 1,
            }, 1.68)
            .to(showcaseState, {
              duration: 1.18,
              finalMarqueeRunProgress: 1,
            }, 1.68)
            .to(showcaseState, {
              duration: 0.72,
              shrinkProgress: 1,
            }, 2.35)
            .to(showcaseState, {
              duration: ROW_REVEAL_DURATION,
              rowRevealProgress: 1,
            }, INTRO_SCROLL_SHARE)
            .addLabel("service-0");

          for (let index = 1; index < serviceItemCount; index += 1) {
            showcaseTimeline.to(showcaseState, {
              duration: SERVICE_STEP_DURATION,
              ease: "power2.inOut",
              serviceFocus: index,
            });
            showcaseTimeline.addLabel(`service-${index}`);
          }

          showcaseTimeline
            .to({}, {
              duration: FINAL_SERVICE_HOLD_DURATION,
            })
            .addLabel("grid")
            .to(showcaseState, {
              duration: GRID_OUTRO_DURATION,
              ease: "power2.inOut",
              gridProgress: 1,
            });

          const snapLabelNames = [
            ...Array.from(
              { length: serviceItemCount },
              (_, index) => `service-${index}`,
            ),
            "grid",
          ];
          const snapPoints = snapLabelNames.map(
            (label) => showcaseTimeline.labels[label] / showcaseTimeline.duration(),
          );

          const snapToDirectionalPoint = (value: number, direction: number) => {
            if (value < snapPoints[0]) {
              return value;
            }

            if (direction >= 0) {
              return (
                snapPoints.find((point) => point >= value - 0.0001) ??
                snapPoints[snapPoints.length - 1]
              );
            }

            for (let index = snapPoints.length - 1; index >= 0; index -= 1) {
              if (snapPoints[index] <= value + 0.0001) {
                return snapPoints[index];
              }
            }

            return snapPoints[0];
          };

          const showcaseTrigger = ScrollTrigger.create({
            animation: showcaseTimeline,
            trigger: refs.showcaseSectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: serviceScrub,
            snap: {
              delay: SERVICE_SNAP_DELAY,
              duration: GRID_SNAP_DURATION,
              ease: "power1.inOut",
              snapTo: (value, self) =>
                snapToDirectionalPoint(value, self?.direction ?? 1),
            },
            onRefresh: (self) => {
              const refreshedMetrics = updateMetrics();
              applyMetricBoundLayout(refreshedMetrics);
              showcaseTimeline.progress(self.progress);
              renderShowcase(showcaseState, refreshedMetrics);
            },
          });

          showcaseTimeline.progress(showcaseTrigger.progress);
          renderShowcase(showcaseState, cachedMetrics);

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
            showcaseTimeline.kill();
            showcaseTrigger.kill();
          };
        },
      );

      return () => {
        mm.revert();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
}
