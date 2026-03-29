"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

type UseRadiantShowcaseMotionProps = {
  content: RadiantExperienceContent;
  refs: RadiantExperienceRefs;
};

export function useRadiantShowcaseMotion({
  content,
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
            !refs.heroTitleRef.current ||
            !refs.heroMonogramRef.current ||
            !refs.heroLocationsRef.current ||
            !refs.heroMarqueeRef.current ||
            !refs.heroMarqueeTrackRef.current ||
            !refs.activeServiceCopyShellRef.current ||
            !refs.serviceHeaderRef.current ||
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
          const aboutCharNodes = refs.aboutCharRefs.current.filter(
            (char): char is HTMLSpanElement => char !== null,
          );

          const getMetrics = () => {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const cardWidth =
              refs.sampleTileRef.current?.offsetWidth ??
              Math.min(Math.max(viewportWidth * 0.32, 408), 512);
            const mediaHeight =
              refs.sampleTileRef.current?.offsetHeight ?? cardWidth / 1.24;
            const cardAspectRatio = cardWidth / mediaHeight;
            const focusScale =
              viewportWidth >= 1720 ? 1.04 : viewportWidth >= 1440 ? 1.07 : 1.1;
            const previewScale =
              viewportWidth >= 1720 ? 0.64 : viewportWidth >= 1320 ? 0.58 : 0.54;
            const farScale = viewportWidth >= 1320 ? 0.28 : 0.24;
            const focusLeftX =
              viewportWidth / 2 - (cardWidth * focusScale) / 2;
            const previewGap =
              viewportWidth >= 1720 ? 56 : viewportWidth >= 1320 ? 44 : 34;
            const rowTop = Math.max(viewportHeight * 0.205, 154);
            const gridGap =
              viewportWidth >= 1600 ? 24 : viewportWidth >= 1200 ? 20 : 16;
            const gridHorizontalPadding = Math.max(34, viewportWidth * 0.04);
            const gridHeaderHeight =
              viewportWidth >= 1400 ? 90 : viewportWidth >= 1024 ? 80 : 70;
            const gridHeaderGap =
              viewportWidth >= 1400 ? 40 : viewportWidth >= 1024 ? 32 : 24;
            const gridTopPadding =
              viewportWidth >= 1400 ? 96 : viewportWidth >= 1024 ? 82 : 70;
            const gridBottomPadding =
              viewportWidth >= 1400 ? 72 : viewportWidth >= 1024 ? 60 : 48;
            const gridMaxColumns = Math.min(4, serviceItems.length);
            const minimumCellWidth =
              viewportWidth >= 1600 ? 248 : viewportWidth >= 1280 ? 220 : 186;
            const availableGridWidth = Math.max(
              viewportWidth - gridHorizontalPadding * 2,
              220,
            );
            const availableGridTileHeight = Math.max(
              viewportHeight -
              gridTopPadding -
              gridBottomPadding -
              gridHeaderHeight -
              gridHeaderGap,
              220,
            );
            let gridColumns = Math.min(
              viewportWidth >= 1500 ? 4 : viewportWidth >= 1120 ? 3 : 2,
              gridMaxColumns,
            );
            let gridCellWidth = 0;
            let gridRows = 0;

            for (let columns = gridMaxColumns; columns >= 1; columns -= 1) {
              const rows = Math.ceil(serviceItems.length / columns);
              const widthBasedCellWidth =
                (availableGridWidth - gridGap * (columns - 1)) / columns;
              const rowHeight =
                (availableGridTileHeight - gridGap * (rows - 1)) / rows;
              const cellWidth = Math.min(
                widthBasedCellWidth,
                rowHeight * cardAspectRatio,
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

            const gridRowHeight = gridCellWidth / cardAspectRatio;
            const gridContentHeight =
              gridRows * gridRowHeight + gridGap * (gridRows - 1);
            const gridClusterHeight =
              gridHeaderHeight + gridHeaderGap + gridContentHeight;
            const maxClusterTop = Math.max(
              gridTopPadding,
              viewportHeight - gridBottomPadding - gridClusterHeight,
            );
            const gridClusterTop = gsap.utils.clamp(
              gridTopPadding,
              maxClusterTop,
              (viewportHeight - gridClusterHeight) / 2,
            );
            const copyOffset = Math.max(18, viewportHeight * 0.022);

            return {
              cardWidth,
              copyOffset,
              farScale,
              focusScale,
              focusLeftX,
              gridCellWidth,
              gridColumns,
              gridGap,
              gridRowHeight,
              gridTop: gridClusterTop + gridHeaderHeight + gridHeaderGap,
              headerY: gridClusterTop,
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
            metrics: ReturnType<typeof getMetrics>,
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
            metrics: ReturnType<typeof getMetrics>,
          ): LayoutState => {
            const scale = metrics.gridCellWidth / metrics.cardWidth;
            const column = index % metrics.gridColumns;
            const row = Math.floor(index / metrics.gridColumns);
            const itemsInRow = Math.min(
              metrics.gridColumns,
              serviceItems.length - row * metrics.gridColumns,
            );
            const rowWidth =
              itemsInRow * metrics.gridCellWidth +
              Math.max(0, itemsInRow - 1) * metrics.gridGap;
            const visualX =
              (metrics.viewportWidth - rowWidth) / 2 +
              column * (metrics.gridCellWidth + metrics.gridGap);
            const y =
              metrics.gridTop + row * (metrics.gridRowHeight + metrics.gridGap);

            return {
              opacity: 1,
              scale,
              x: visualLeftToTransformX(visualX, metrics.cardWidth, scale),
              y,
            };
          };

          const initialMetrics = getMetrics();

          gsap.set(refs.showcaseSectionRef.current, {
            "--hero-mask-x": `${initialMetrics.viewportWidth / 2}px`,
          });
          gsap.set(refs.heroMediaRef.current, {
            borderRadius: 0,
            height: initialMetrics.viewportHeight,
            scale: 1,
            width: initialMetrics.viewportWidth / 2,
            x: initialMetrics.viewportWidth / 2,
            y: 0,
          });
          gsap.set(refs.heroTitleRef.current, { opacity: 1, yPercent: 0 });
          gsap.set(refs.heroMonogramRef.current, { opacity: 1, scale: 1 });
          gsap.set(refs.heroMarqueeRef.current, { opacity: 0 });
          gsap.set(refs.heroMarqueeTrackRef.current, { xPercent: 20 });
          gsap.set(refs.activeServiceCopyShellRef.current, { opacity: 0, y: 0 });
          gsap.set(serviceCopyNodes, { opacity: 0, y: 0 });
          gsap.set(refs.serviceHeaderRef.current, {
            opacity: 0,
            scale: 0.96,
            y: initialMetrics.headerY + 28,
          });
          gsap.set(serviceCardNodes, { opacity: 0 });
          gsap.set(refs.aboutContentRef.current, { opacity: 0.38, y: 72 });

          aboutCharNodes.forEach((char) => {
            char.style.opacity = "0.22";
            char.style.color = "#bdb7b0";
          });

          const renderShowcase = (progress: number) => {
            const metrics = getMetrics();
            const expandProgress = gsap.utils.clamp(0, 1, progress / 0.18);
            const titleFadeProgress = gsap.utils.clamp(
              0,
              1,
              (progress - 0.08) / 0.12,
            );
            const marqueeProgress = gsap.utils.clamp(
              0,
              1,
              (progress - 0.18) / 0.18,
            );
            const shrinkProgress = gsap.utils.clamp(
              0,
              1,
              (progress - 0.4) / 0.16,
            );
            const rowRevealProgress = gsap.utils.clamp(
              0,
              1,
              (progress - 0.52) / 0.1,
            );
            const holdProgress = gsap.utils.clamp(
              0,
              1,
              (progress - 0.62) / 0.1,
            );
            const focusPhaseProgress = gsap.utils.clamp(
              0,
              1,
              (progress - 0.69) / 0.13,
            );
            const gridProgress = gsap.utils.clamp(
              0,
              1,
              (progress - 0.86) / 0.1,
            );
            const focusIndex = getSmoothFocusValue(
              focusPhaseProgress,
              serviceItems.length - 1,
            );

            const maskX =
              progress <= 0.4
                ? lerp(metrics.viewportWidth / 2, 0, expandProgress)
                : 0;

            gsap.set(refs.showcaseSectionRef.current, {
              "--hero-mask-x": `${maskX}px`,
            });
            gsap.set(refs.heroMatteRef.current, { width: maskX });
            gsap.set(refs.heroTitleRef.current, {
              filter: `blur(${titleFadeProgress * 12}px)`,
              opacity: 1 - titleFadeProgress,
              yPercent: -titleFadeProgress * 8,
            });
            gsap.set(refs.heroMonogramRef.current, {
              opacity: 1 - titleFadeProgress,
              scale: 1 - titleFadeProgress * 0.08,
            });
            gsap.set(refs.heroLocationsRef.current, {
              opacity: 1 - gsap.utils.clamp(0, 1, (progress - 0.42) / 0.12),
            });

            const marqueeOpacity =
              progress < 0.18 || progress > 0.4
                ? 0
                : Math.sin(marqueeProgress * Math.PI);

            gsap.set(refs.heroMarqueeRef.current, { opacity: marqueeOpacity });
            gsap.set(refs.heroMarqueeTrackRef.current, {
              xPercent: lerp(20, -80, marqueeProgress),
            });

            const splitRect = {
              borderRadius: 0,
              height: metrics.viewportHeight,
              width: metrics.viewportWidth / 2,
              x: metrics.viewportWidth / 2,
              y: 0,
            };
            const fullRect = {
              borderRadius: 0,
              height: metrics.viewportHeight,
              width: metrics.viewportWidth,
              x: 0,
              y: 0,
            };
            const rowZeroState = getRowState(0, 0, metrics);
            const activeFocusState =
              progress < 0.69
                ? getRowState(0, 0, metrics)
                : getRowState(focusIndex, focusIndex, metrics);
            const rowZeroRect = {
              borderRadius: 36,
              height: metrics.mediaHeight,
              scale: rowZeroState.scale,
              width: metrics.cardWidth,
              x: rowZeroState.x,
              y: rowZeroState.y,
            };
            const currentHeroRowState =
              gridProgress > 0
                ? morphState(
                  getRowState(0, serviceItems.length - 1, metrics),
                  getGridState(0, metrics),
                  gridProgress,
                )
                : getRowState(0, focusIndex, metrics);

            if (progress <= 0.4) {
              const heroExpandRect = {
                borderRadius: lerp(
                  splitRect.borderRadius,
                  fullRect.borderRadius,
                  expandProgress,
                ),
                height: lerp(splitRect.height, fullRect.height, expandProgress),
                width: lerp(splitRect.width, fullRect.width, expandProgress),
                x: lerp(splitRect.x, fullRect.x, expandProgress),
                y: lerp(splitRect.y, fullRect.y, expandProgress),
              };

              gsap.set(refs.heroMediaRef.current, {
                borderRadius: heroExpandRect.borderRadius,
                height: heroExpandRect.height,
                scale: 1,
                width: heroExpandRect.width,
                x: heroExpandRect.x,
                y: heroExpandRect.y,
              });
            } else if (progress <= 0.69) {
              const heroShrinkRect = {
                borderRadius: lerp(
                  fullRect.borderRadius,
                  rowZeroRect.borderRadius,
                  shrinkProgress,
                ),
                height: lerp(fullRect.height, rowZeroRect.height, shrinkProgress),
                scale: lerp(1, rowZeroRect.scale, shrinkProgress),
                width: lerp(fullRect.width, rowZeroRect.width, shrinkProgress),
                x: lerp(fullRect.x, rowZeroRect.x, shrinkProgress),
                y: lerp(fullRect.y, rowZeroRect.y, shrinkProgress),
              };

              gsap.set(refs.heroMediaRef.current, {
                borderRadius: heroShrinkRect.borderRadius,
                height: heroShrinkRect.height,
                scale: heroShrinkRect.scale,
                width: heroShrinkRect.width,
                x: heroShrinkRect.x,
                y: heroShrinkRect.y,
              });
            } else {
              gsap.set(refs.heroMediaRef.current, {
                borderRadius: 36,
                height: metrics.mediaHeight,
                scale: currentHeroRowState.scale,
                width: metrics.cardWidth,
                x: currentHeroRowState.x,
                y: currentHeroRowState.y,
              });
            }

            const copyShellOpacity =
              progress < 0.48
                ? 0
                : progress < 0.69
                  ? rowRevealProgress
                  : 1 - gsap.utils.clamp(0, 1, gridProgress * 1.24);

            gsap.set(refs.activeServiceCopyShellRef.current, {
              opacity: copyShellOpacity,
              y:
                activeFocusState.y +
                metrics.mediaHeight * activeFocusState.scale +
                metrics.copyOffset +
                holdProgress * 8,
            });

            const activeCopyIndex = progress < 0.69 ? 0 : Math.round(focusIndex);

            serviceCopyNodes.forEach((copyNode, index) => {
              const revealStrength =
                progress < 0.69
                  ? index === 0
                    ? rowRevealProgress
                    : 0
                  : index === activeCopyIndex
                    ? 1
                    : 0;

              gsap.set(copyNode, {
                opacity:
                  progress < 0.52
                    ? 0
                    : (1 - gridProgress) *
                    gsap.utils.clamp(0, 1, revealStrength),
                y: 18 - gsap.utils.clamp(0, 1, revealStrength) * 18,
              });
            });

            const headerReveal = gsap.utils.clamp(
              0,
              1,
              (progress - 0.89) / 0.06,
            );
            gsap.set(refs.serviceHeaderRef.current, {
              opacity: headerReveal,
              scale: 0.96 + headerReveal * 0.04,
              y: metrics.headerY + 28 - headerReveal * 28,
            });

            serviceCardNodes.forEach((card, nodeIndex) => {
              const itemIndex = nodeIndex + 1;
              const rowState =
                gridProgress > 0
                  ? morphState(
                    getRowState(itemIndex, serviceItems.length - 1, metrics),
                    getGridState(itemIndex, metrics),
                    gridProgress,
                  )
                  : getRowState(itemIndex, focusIndex, metrics);

              const enterState: LayoutState = {
                opacity: 0,
                scale: metrics.farScale,
                x: metrics.viewportWidth + nodeIndex * 100,
                y: rowZeroState.y + 42,
              };

              const currentState =
                progress < 0.69
                  ? morphState(enterState, rowState, rowRevealProgress)
                  : rowState;

              gsap.set(card, {
                opacity: currentState.opacity,
                scale: currentState.scale,
                x: currentState.x,
                y: currentState.y,
              });
            });
          };

          const showcaseTrigger = ScrollTrigger.create({
            trigger: refs.showcaseSectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onRefresh: (self) => {
              renderShowcase(self.progress);
            },
            onUpdate: (self) => {
              renderShowcase(self.progress);
            },
          });

          renderShowcase(showcaseTrigger.progress);

          const renderAbout = (progress: number) => {
            const contentProgress = gsap.utils.clamp(0, 1, progress / 0.28);
            const charProgress = gsap.utils.clamp(0, 1, (progress - 0.12) / 0.72);
            const easedContentProgress = aboutContentEase(contentProgress);
            const easedCharProgress = aboutCharEase(charProgress);
            const revealPosition =
              easedCharProgress * (aboutCharNodes.length + 10);

            gsap.set(refs.aboutContentRef.current, {
              opacity: lerp(0.38, 1, easedContentProgress),
              y: lerp(72, 0, easedContentProgress),
            });

            aboutCharNodes.forEach((char, index) => {
              const localProgress = gsap.utils.clamp(
                0,
                1,
                revealPosition - index,
              );

              char.style.opacity = `${0.22 + localProgress * 0.78}`;
              char.style.color =
                localProgress > 0.52 ? "var(--foreground)" : "#bdb7b0";
            });
          };

          const getAboutRevealDistance = () => {
            const aboutContentHeight =
              refs.aboutContentRef.current?.offsetHeight ?? 0;

            return Math.max(window.innerHeight, aboutContentHeight * 0.9);
          };

          const aboutTrigger = ScrollTrigger.create({
            trigger: refs.aboutContentRef.current,
            start: "top 66%",
            end: () => `+=${getAboutRevealDistance()}`,
            scrub: 1.35,
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
          const handleResize = () => {
            cancelAnimationFrame(resizeFrame);
            resizeFrame = requestAnimationFrame(() => {
              ScrollTrigger.refresh();
              renderShowcase(showcaseTrigger.progress);
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

      return () => {
        mm.revert();
      };
    },
    { scope: refs.rootRef },
  );
}
