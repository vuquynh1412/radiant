"use client";

import type { RefObject } from "react";

export interface StaggeredSegment {
  end: number;
  index: number;
  start: number;
}

export interface CreateStaggeredSegmentsOptions {
  end?: number;
  overlap?: number;
  start?: number;
}

export interface SharedAnimationOptions {
  delay?: number;
  duration?: number;
  ease?: string;
  end?: string;
  once?: boolean;
  scrub?: boolean | number;
  stagger?: number;
  start?: string;
}

export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function serializePlainObject(value?: object) {
  if (!value) {
    return "[]";
  }

  return JSON.stringify(
    Object.entries(value)
      .filter(([, entryValue]) => entryValue !== undefined)
      .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey))
  );
}

export function parsePlainObject<T extends object>(signature: string) {
  if (signature === "[]") {
    return undefined;
  }

  return Object.fromEntries(JSON.parse(signature) as Array<[string, unknown]>) as T;
}

export function lerp(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

export function segment(
  progress: number,
  start: number,
  end: number,
  ease: (value: number) => number = (value) => value
) {
  if (end <= start) {
    return progress >= end ? 1 : 0;
  }

  return ease(clamp((progress - start) / (end - start)));
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function normalizeProgressPoint(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  if (Math.abs(value) > 1) {
    return clamp(value / 100, 0, 1);
  }

  return clamp(value, 0, 1);
}

export function resolveSceneLabelProgress(
  labels: Record<string, number>,
  label: string
) {
  const value = labels[label];

  if (value === undefined) {
    return null;
  }

  return normalizeProgressPoint(value);
}

function overlapSegmentsByFactor(
  segments: Array<{ start: number; end: number }>,
  overlap: number
) {
  const first = segments[0];
  const last = segments[segments.length - 1];

  if (!first || !last) {
    return [];
  }

  const veryStart = first.start;
  const totalDuration = last.end - veryStart;
  const overlapPerSegment = (totalDuration * overlap) / segments.length;
  const adjustedDuration =
    totalDuration - overlapPerSegment * (segments.length - 1);
  const scaleFactor =
    adjustedDuration > 0 ? totalDuration / adjustedDuration : 1;

  return segments.map((segmentItem, index) => {
    const shiftedStart = segmentItem.start - overlapPerSegment * index;
    const shiftedEnd = segmentItem.end - overlapPerSegment * index;

    return {
      start: clamp(
        veryStart + (shiftedStart - veryStart) * scaleFactor,
        0,
        1
      ),
      end: clamp(
        veryStart + (shiftedEnd - veryStart) * scaleFactor,
        0,
        1
      ),
    };
  });
}

export function createStaggeredSegments(
  count: number,
  {
    end = 1,
    overlap = 0,
    start = 0,
  }: CreateStaggeredSegmentsOptions = {}
): StaggeredSegment[] {
  if (!Number.isFinite(count) || count <= 0) {
    return [];
  }

  if (overlap < 0 || overlap > 1) {
    throw new Error("Overlap must be between 0 and 1.");
  }

  const normalizedStart = normalizeProgressPoint(start);
  const normalizedEnd = normalizeProgressPoint(end);

  if (normalizedEnd <= normalizedStart) {
    return Array.from({ length: count }, (_, index) => ({
      index,
      start: normalizedStart,
      end: normalizedStart,
    }));
  }

  const duration = normalizedEnd - normalizedStart;
  const chunkDuration = duration / count;
  const segments = Array.from({ length: count }, (_, index) => ({
    start: normalizedStart + chunkDuration * index,
    end: normalizedStart + chunkDuration * (index + 1),
  }));
  const overlappedSegments =
    overlap > 0 ? overlapSegmentsByFactor(segments, overlap) : segments;

  return overlappedSegments.map((segmentItem, index) => ({
    index,
    ...segmentItem,
  }));
}

export function resolveScopedTarget(
  root: HTMLElement,
  target?: HTMLElement | RefObject<HTMLElement | null> | null
) {
  if (!target) {
    return root;
  }

  if ("current" in target) {
    return target.current ?? root;
  }

  return target;
}
