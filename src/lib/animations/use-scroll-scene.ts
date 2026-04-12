"use client";

import { useEffect, useEffectEvent, useMemo, type RefObject } from "react";

import {
  ensureMotionRuntime,
  gsap,
  registerScrollScene,
  scheduleScrollRefresh,
  ScrollTrigger,
  type SceneLabels,
  unregisterScrollScene,
} from "./runtime";
import {
  prefersReducedMotion,
  resolveSceneLabelProgress,
  resolveScopedTarget,
} from "./utils";

type TargetRef = RefObject<HTMLElement | null> | HTMLElement | null | undefined;

type ScrollSceneBaseContext = {
  root: HTMLElement;
  trigger: HTMLElement;
};

export type ScrollSceneRenderContext<TMetrics, TSetup> = ScrollSceneBaseContext & {
  metrics: TMetrics;
  setup: TSetup;
};

type ScrollSceneBoundary = string | number | (() => string | number);

export interface ScrollSceneConfig<TMetrics = void, TSetup = void> {
  id?: string;
  labels?: SceneLabels;
  scope: RefObject<HTMLElement | null>;
  trigger?: TargetRef;
  resizeTarget?: TargetRef;
  mediaQuery?: string;
  start?: ScrollSceneBoundary;
  end?: ScrollSceneBoundary;
  scrub?: boolean | number;
  pin?: boolean | Element;
  once?: boolean;
  enabled?: boolean;
  refreshOnResize?: boolean;
  reducedMotionProgress?: number | false;
  measure?: (context: ScrollSceneBaseContext) => TMetrics;
  setup?: (context: ScrollSceneBaseContext) => TSetup;
  render: (
    progress: number,
    context: ScrollSceneRenderContext<TMetrics, TSetup>
  ) => void;
}

/**
 * Shared driver for scroll-linked cinematic scenes.
 *
 * Use this when a section can be expressed as:
 * 1. measure DOM/layout once per refresh
 * 2. build cached setters/setup once
 * 3. render from a normalized `progress` value on each ScrollTrigger update
 *
 * Recommended for:
 * - scrubbed reveals
 * - pinned narrative sections
 * - parallax or theme transitions tied to a single scroll axis
 *
 * Keep bespoke multi-phase math in project-local scene modules and use this
 * hook as the DOM/ScrollTrigger bridge.
 */
export function useScrollScene<TMetrics = void, TSetup = void>({
  enabled = true,
  end = "bottom top",
  id,
  labels,
  mediaQuery = "all",
  pin = false,
  reducedMotionProgress = 1,
  refreshOnResize = true,
  scope,
  scrub = true,
  start = "top bottom",
  measure,
  once,
  render,
  resizeTarget,
  setup,
  trigger,
}: ScrollSceneConfig<TMetrics, TSetup>) {
  const labelEntries = labels
    ? Object.entries(labels)
        .sort(([leftLabel], [rightLabel]) => leftLabel.localeCompare(rightLabel))
    : [];
  const labelsSignature = JSON.stringify(labelEntries);
  const sceneLabels = useMemo(() => {
    if (labelsSignature === "[]") {
      return undefined;
    }

    return Object.fromEntries(
      JSON.parse(labelsSignature) as Array<[string, number]>
    ) as SceneLabels;
  }, [labelsSignature]);
  const runMeasure = useEffectEvent((context: ScrollSceneBaseContext) =>
    measure ? measure(context) : (undefined as TMetrics)
  );
  const runRender = useEffectEvent(
    (
      progress: number,
      context: ScrollSceneRenderContext<TMetrics, TSetup>
    ) => render(progress, context)
  );
  const runSetup = useEffectEvent((context: ScrollSceneBaseContext) =>
    setup ? setup(context) : (undefined as TSetup)
  );

  useEffect(() => {
    if (!enabled || !scope.current) {
      return;
    }

    ensureMotionRuntime();

    const media = gsap.matchMedia();
    media.add(mediaQuery, () => {
      const root = scope.current;
      if (!root) {
        return;
      }

      const resolvedTrigger = resolveScopedTarget(root, trigger);
      const baseContext = { root, trigger: resolvedTrigger };
      const setupValue = runSetup(baseContext);
      let metrics = runMeasure(baseContext);

      const render = (progress: number) =>
        runRender(progress, {
          ...baseContext,
          metrics,
          setup: setupValue,
        });

      if (prefersReducedMotion()) {
        render(reducedMotionProgress === false ? 0 : reducedMotionProgress);
        return;
      }

      render(0);

      const scrollTrigger = ScrollTrigger.create({
        trigger: resolvedTrigger,
        start,
        end,
        scrub,
        pin,
        once,
        invalidateOnRefresh: true,
        onRefreshInit: () => {
          metrics = runMeasure(baseContext);
        },
        onRefresh: (self) => {
          render(self.progress);
        },
        onUpdate: (self) => {
          render(self.progress);
        },
      });

      if (id && sceneLabels && Object.keys(sceneLabels).length > 0) {
        registerScrollScene(id, {
          labels: sceneLabels,
          getLabelScroll: (labelName) => {
            const labelProgress = resolveSceneLabelProgress(
              sceneLabels,
              labelName
            );

            if (labelProgress === null) {
              return null;
            }

            return (
              scrollTrigger.start +
              (scrollTrigger.end - scrollTrigger.start) * labelProgress
            );
          },
        });
      }

      let resizeObserver: ResizeObserver | undefined;

      if (refreshOnResize && typeof ResizeObserver !== "undefined") {
        const resolvedResizeTarget = resolveScopedTarget(root, resizeTarget);
        resizeObserver = new ResizeObserver(() => {
          scheduleScrollRefresh();
        });
        resizeObserver.observe(resolvedResizeTarget);
      }

      return () => {
        resizeObserver?.disconnect();
        if (id) {
          unregisterScrollScene(id);
        }
        scrollTrigger.kill();
      };
    });

    return () => {
      media.revert();
    };
  }, [
    enabled,
    end,
    id,
    labelsSignature,
    mediaQuery,
    once,
    pin,
    reducedMotionProgress,
    refreshOnResize,
    resizeTarget,
    scope,
    scrub,
    start,
    trigger,
    sceneLabels,
  ]);
}
