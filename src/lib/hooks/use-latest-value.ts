"use client";

import { useInsertionEffect, useRef } from "react";

/**
 * Keeps a ref synchronized with the latest committed value without changing
 * the ref identity.
 *
 * Read `ref.current` inside event handlers, observers, timers, animation
 * callbacks, or other non-render paths when you need the latest value without
 * recreating the callback that consumes it.
 */
export function useLatestValue<T>(value: T) {
  const ref = useRef(value);

  useInsertionEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
}
