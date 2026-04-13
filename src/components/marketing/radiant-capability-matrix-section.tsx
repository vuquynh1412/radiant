"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";

import { cn } from "@/lib/utils";

import type { CapabilityMatrixSlotKey } from "@/content/capability-matrix-images";

import type {
  RadiantExperienceContent,
  RadiantExperienceRefs,
} from "./radiant-experience.types";

type RadiantCapabilityMatrixSectionProps = {
  bubblesEnabled: boolean;
  content: RadiantExperienceContent;
  refs: RadiantExperienceRefs;
};

type RotatingImageSlotProps = {
  altLabel: string;
  className?: string;
  delayMs?: number;
  imagePosition?: "left" | "center" | "right";
  images: string[];
  isActive?: boolean;
  priority?: boolean;
};

const tickerRepeatCount = 8;
const desktopMediaQuery = "(min-width: 768px)";
const supportsIntersectionObserver =
  typeof IntersectionObserver !== "undefined";

const bubbleColors = [
  "#F7ECE2",
  "#F9F0DB",
  "#FFFFFF",
  "#EED392",
];
const bubblePlacementAttempts = 24;
const bubblePlacementGap = 10;

type BubbleBounds = {
  height: number;
  left: number;
  top: number;
  width: number;
};

function subscribeToDesktopBreakpoint(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(desktopMediaQuery);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => {
    mediaQuery.removeEventListener("change", onStoreChange);
  };
}

function getDesktopBreakpointSnapshot() {
  return window.matchMedia(desktopMediaQuery).matches;
}

function RadiantSparkIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 0L22.8 15.2L38 19L22.8 22.8L19 38L15.2 22.8L0 19L15.2 15.2L19 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

function overlapsBubble(a: BubbleBounds, b: BubbleBounds) {
  return !(
    a.left + a.width + bubblePlacementGap < b.left ||
    b.left + b.width + bubblePlacementGap < a.left ||
    a.top + a.height + bubblePlacementGap < b.top ||
    b.top + b.height + bubblePlacementGap < a.top
  );
}

function getBubbleBounds(bubble: Element): BubbleBounds {
  const element = bubble as HTMLElement;

  return {
    height: element.offsetHeight,
    left: element.offsetLeft,
    top: element.offsetTop,
    width: element.offsetWidth,
  };
}

function getBubblePosition(
  container: HTMLDivElement,
  bubble: HTMLDivElement,
) {
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  const bubbleWidth = bubble.offsetWidth;
  const bubbleHeight = bubble.offsetHeight;
  const maxLeft = Math.max(0, containerWidth - bubbleWidth);
  const maxTop = Math.max(0, containerHeight - bubbleHeight);
  const minLeft = Math.min(maxLeft, containerWidth * 0.18);
  const minTop = Math.min(maxTop, containerHeight * 0.08);
  const existingBubbles = Array.from(
    container.querySelectorAll(".matrix-bubble"),
  ).filter((item) => item !== bubble);
  const existingBounds = existingBubbles.map(getBubbleBounds);

  for (let attempt = 0; attempt < bubblePlacementAttempts; attempt += 1) {
    const left = minLeft + Math.random() * Math.max(0, maxLeft - minLeft);
    const top = minTop + Math.random() * Math.max(0, maxTop - minTop);
    const candidate = {
      height: bubbleHeight,
      left,
      top,
      width: bubbleWidth,
    };

    if (!existingBounds.some((bounds) => overlapsBubble(candidate, bounds))) {
      return { left, top };
    }
  }

  const oldestBubble = existingBubbles[0];
  if (oldestBubble) {
    oldestBubble.remove();
    const remainingBounds = existingBubbles.slice(1).map(getBubbleBounds);

    for (let attempt = 0; attempt < bubblePlacementAttempts; attempt += 1) {
      const left = minLeft + Math.random() * Math.max(0, maxLeft - minLeft);
      const top = minTop + Math.random() * Math.max(0, maxTop - minTop);
      const candidate = {
        height: bubbleHeight,
        left,
        top,
        width: bubbleWidth,
      };

      if (!remainingBounds.some((bounds) => overlapsBubble(candidate, bounds))) {
        return { left, top };
      }
    }
  }

  const fallbackSlot = existingBounds.length % 4;
  return {
    left: Math.min(maxLeft, minLeft + fallbackSlot * (bubbleWidth + 8)),
    top: Math.min(maxTop, minTop + fallbackSlot * (bubbleHeight + 8)),
  };
}

function PatternTicker({
  label,
  trackRef,
}: {
  label: string;
  trackRef: RadiantExperienceRefs["capabilityMatrixTopTickerRef"];
}) {
  return (
    <div className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex w-max items-center gap-3 whitespace-nowrap will-change-transform md:gap-4"
      >
        {Array.from({ length: tickerRepeatCount * 2 }).map((_, index) => (
          <div
            key={`${label}-${index}`}
            className="flex items-center gap-3 md:gap-4"
          >
            <span className="font-heading text-[clamp(2.5rem,5vw,4.8rem)] leading-none text-(--matrix-ticker-color)">
              {label}
            </span>
            <RadiantSparkIcon className="size-5 text-(--matrix-ticker-color) md:size-6 lg:size-[2.8rem]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function RotatingImageSlot({
  altLabel,
  className,
  delayMs = 0,
  imagePosition,
  images,
  isActive = true,
  priority = false,
}: RotatingImageSlotProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isActive || images.length <= 1) {
      return undefined;
    }

    const advance = () => {
      setActiveIndex((current) => (current + 1) % images.length);
    };

    let intervalId: number | undefined;
    const timeoutId = window.setTimeout(() => {
      advance();
      intervalId = window.setInterval(advance, 3000);
    }, 3000 + delayMs);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [delayMs, images, isActive]);

  return (
    <div
      data-matrix-image={imagePosition || "center"}
      className={cn("relative overflow-hidden rounded-[1rem]", className)}
    >
      {images.map((image, index) => (
        <Image
          key={`${image}-${index}`}
          alt={`${altLabel} ${index + 1}`}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out",
            index === activeIndex
              ? "scale-100 opacity-100"
              : "scale-[1.035] opacity-0",
          )}
          fill
          loading={
            (priority && index === 0) ||
            image === "/capability-matrix/branding-packaging.png"
              ? "eager"
              : "lazy"
          }
          priority={priority && index === 0}
          sizes="(min-width: 1280px) 272px, (min-width: 768px) 24vw, 100vw"
          src={image}
          unoptimized
        />
      ))}
    </div>
  );
}

// --- Bubble System ---

function useBubbleSystem(
  pills: string[],
  wordRefs: React.RefObject<Array<HTMLDivElement | null>>,
  isActive: boolean,
) {
  const contentIndexRef = useRef(0);
  const colorIndexRef = useRef(0);
  const parentIndexRef = useRef(0);

  const createBubble = useCallback(() => {
    const words = wordRefs.current;
    if (!words || !pills.length) return;

    const validParents = words.filter(Boolean);
    if (!validParents.length) return;

    // Cycle through parents
    const parentIndex = parentIndexRef.current % validParents.length;
    parentIndexRef.current = parentIndex + 1;
    const parent = validParents[parentIndex];
    if (!parent) return;

    // Find the bubbles container inside this word
    const bubblesContainer = parent.querySelector(
      "[data-bubbles]",
    ) as HTMLDivElement | null;
    if (!bubblesContainer) return;

    // Cycle through content
    const text = pills[contentIndexRef.current % pills.length];
    contentIndexRef.current += 1;

    // Cycle through colors (advance by 1 or 2 randomly)
    const colorAdvance = Math.random() > 0.5 ? 1 : 2;
    colorIndexRef.current =
      (colorIndexRef.current + colorAdvance) % bubbleColors.length;
    const bgColor = bubbleColors[colorIndexRef.current];

    // Create DOM element
    const bubble = document.createElement("div");
    bubble.className = "matrix-bubble";
    bubble.textContent = text;
    bubble.style.backgroundColor = bgColor;
    bubble.style.fontSize = "clamp(0.75rem, 1vw, 0.875rem)";
    bubble.style.padding = "0.5rem 1rem";
    bubble.style.color = "rgb(0, 0, 0)";
    bubble.style.zIndex = "10";

    bubblesContainer.appendChild(bubble);
    const bubblePosition = getBubblePosition(bubblesContainer, bubble);
    bubble.style.left = `${bubblePosition.left}px`;
    bubble.style.top = `${bubblePosition.top}px`;

    // Appear after 100ms
    const appearTimeout = window.setTimeout(() => {
      bubble.classList.add("matrix-bubble-visible");
    }, 100);

    // Disappear after 5-10s
    const lifetime = 5000 + 5000 * Math.random();
    const disappearTimeout = window.setTimeout(() => {
      bubble.classList.remove("matrix-bubble-visible");

      // Remove from DOM after transition
      const removeTimeout = window.setTimeout(() => {
        if (bubble.parentNode) {
          bubble.parentNode.removeChild(bubble);
        }
      }, 1000);

      bubble.setAttribute("data-remove-timeout", String(removeTimeout));
    }, lifetime);

    bubble.setAttribute("data-appear-timeout", String(appearTimeout));
    bubble.setAttribute("data-disappear-timeout", String(disappearTimeout));
  }, [pills, wordRefs]);

  useEffect(() => {
    if (!isActive) return undefined;

    let timeoutId: number | undefined;

    const scheduleNext = () => {
      const delay = 500 + 1200 * Math.random();
      timeoutId = window.setTimeout(() => {
        createBubble();
        scheduleNext();
      }, delay);
    };

    scheduleNext();

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      // Clean up all bubbles
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const words = wordRefs.current;
      if (words) {
        for (const word of words) {
          if (!word) continue;
          const container = word.querySelector("[data-bubbles]");
          if (container) {
            const bubbles = container.querySelectorAll(".matrix-bubble");
            for (const b of bubbles) {
              const at = b.getAttribute("data-appear-timeout");
              const dt = b.getAttribute("data-disappear-timeout");
              const rt = b.getAttribute("data-remove-timeout");
              if (at) window.clearTimeout(Number(at));
              if (dt) window.clearTimeout(Number(dt));
              if (rt) window.clearTimeout(Number(rt));
              b.remove();
            }
          }
        }
      }
    };
  }, [isActive, createBubble, wordRefs]);
}

// --- BackgroundWord ---
const matrixFontSize = "clamp(3.5rem,9.5vw,9.2rem)";

function BackgroundWord({
  text,
  wordRef,
  className,
}: {
  text: string;
  wordRef: (el: HTMLDivElement | null) => void;
  className?: string;
}) {
  return (
    <div ref={wordRef} className={cn("relative z-[2]", className)}>
      <span
        className="font-anton inline-block uppercase leading-[0.85] tracking-[0.02em] text-(--matrix-word-color) whitespace-nowrap"
        style={{ fontSize: matrixFontSize }}
      >
        {Array.from(text).map((char, i) => (
          <span
            key={`${char}-${i}`}
            data-matrix-letter=""
            className="inline-block"
          >
            {char}
          </span>
        ))}
      </span>
      <div data-bubbles className="absolute inset-0 overflow-visible" />
    </div>
  );
}

// --- Desktop Matrix ---

function DesktopMatrix({
  altLabel,
  bubblesEnabled,
  imageSlots,
  isActive,
  pills,
  rows,
}: {
  altLabel: string;
  bubblesEnabled: boolean;
  imageSlots: RadiantExperienceContent["capabilityMatrix"]["imageSlots"];
  isActive: boolean;
  pills: string[];
  rows: RadiantExperienceContent["capabilityMatrix"]["rows"];
}) {
  const wordRefs = useRef<Array<HTMLDivElement | null>>([]);

  const setWordRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      wordRefs.current[index] = el;
    },
    [],
  );

  useBubbleSystem(pills, wordRefs, isActive && bubblesEnabled);

  const rowClassName =
    "relative grid items-center gap-6 pt-[2.2rem] pb-[3.4rem] after:absolute after:bottom-0 after:left-0 after:h-px after:w-full";
  const imageClassName = "h-[clamp(5.5rem,11vw,10.7rem)] min-w-0";

  return (
    <div data-matrix-layout="desktop" className="hidden md:flex md:flex-col">
      {/* Row 1: [image] [BRANDING] [image] */}
      <div
        data-matrix-row=""
        className={rowClassName}
        style={{ gridTemplateColumns: "1fr auto 1fr" }}
      >
        <RotatingImageSlot
          altLabel={altLabel}
          className={imageClassName}
          delayMs={0}
          imagePosition="left"
          images={imageSlots.slotA}
          isActive={isActive}
          priority
        />
        <BackgroundWord text={rows.branding} wordRef={setWordRef(0)} />
        <RotatingImageSlot
          altLabel={altLabel}
          className={imageClassName}
          delayMs={180}
          imagePosition="right"
          images={imageSlots.slotB}
          isActive={isActive}
        />
      </div>

      {/* Row 2: [MARKETING] [image] [SOCIALS] */}
      <div
        data-matrix-row=""
        className={rowClassName}
        style={{ gridTemplateColumns: "auto 1fr auto" }}
      >
        <BackgroundWord text={rows.marketing} wordRef={setWordRef(1)} />
        <RotatingImageSlot
          altLabel={altLabel}
          className={imageClassName}
          delayMs={360}
          imagePosition="center"
          images={imageSlots.slotC}
          isActive={isActive}
        />
        <BackgroundWord text={rows.socials} wordRef={setWordRef(2)} />
      </div>

      {/* Row 3: [image] [STORYTELLING] [image] */}
      <div
        data-matrix-row=""
        className={rowClassName}
        style={{ gridTemplateColumns: "1fr auto 1fr" }}
      >
        <RotatingImageSlot
          altLabel={altLabel}
          className={imageClassName}
          delayMs={540}
          imagePosition="left"
          images={imageSlots.slotD}
          isActive={isActive}
        />
        <BackgroundWord text={rows.storytelling} wordRef={setWordRef(3)} />{" "}
        <RotatingImageSlot
          altLabel={altLabel}
          className={imageClassName}
          delayMs={720}
          imagePosition="right"
          images={imageSlots.slotE}
          isActive={isActive}
        />
      </div>
    </div>
  );
}

// --- Mobile Matrix ---

function MobileMatrix({
  altLabel,
  bubblesEnabled,
  imageSlots,
  isActive,
  pills,
  rows,
}: {
  altLabel: string;
  bubblesEnabled: boolean;
  imageSlots: RadiantExperienceContent["capabilityMatrix"]["imageSlots"];
  isActive: boolean;
  pills: string[];
  rows: RadiantExperienceContent["capabilityMatrix"]["rows"];
}) {
  const wordRefs = useRef<Array<HTMLDivElement | null>>([]);

  const setWordRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      wordRefs.current[index] = el;
    },
    [],
  );

  useBubbleSystem(pills, wordRefs, isActive && bubblesEnabled);

  const mobileRows: Array<{
    key: string;
    label: string;
    slots: CapabilityMatrixSlotKey[];
  }> = [
    { key: "branding", label: rows.branding, slots: ["slotA", "slotB"] },
    { key: "digital", label: rows.marketing, slots: ["slotC"] },
    { key: "socials", label: rows.socials, slots: ["slotC"] },
    {
      key: "storytelling",
      label: rows.storytelling,
      slots: ["slotD", "slotE"],
    },
  ];

  return (
    <div data-matrix-layout="mobile" className="grid gap-6 md:hidden">
      {mobileRows.map((row, rowIndex) => (
        <div
          key={row.key}
          data-matrix-row=""
          className="relative border-t border-black/10 pt-5 first:border-t-0 first:pt-0"
        >
          <BackgroundWord text={row.label} wordRef={setWordRef(rowIndex)} />
          <div
            className={cn(
              "mt-3 grid gap-3",
              row.slots.length > 1 ? "grid-cols-2" : "grid-cols-1",
            )}
          >
            {row.slots.map((slotKey, slotIndex) => (
              <RotatingImageSlot
                key={slotKey + slotIndex}
                altLabel={altLabel}
                className="h-[7.75rem] min-w-0 w-full max-w-full"
                delayMs={rowIndex * 240 + slotIndex * 180}
                images={imageSlots[slotKey]}
                isActive={isActive}
                priority={rowIndex === 0 && slotIndex === 0}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// --- Main Section ---

export function RadiantCapabilityMatrixSection({
  bubblesEnabled,
  content,
  refs,
}: RadiantCapabilityMatrixSectionProps) {
  const {
    capabilityMatrixBottomTickerRef,
    capabilityMatrixContentRef,
    capabilityMatrixSectionRef,
    capabilityMatrixTopTickerRef,
  } = refs;
  const matrix = content.capabilityMatrix;
  const pills = matrix.pills ?? [];
  const matrixThemeStyle = {
    "--matrix-bg": "#e9e4d9",
    "--matrix-divider-color": "rgba(0,0,0,0.1)",
    "--matrix-word-color": "#D7BFA9",
    "--matrix-ticker-color": "rgba(140,87,37,0.8)",
  } as CSSProperties;

  const isDesktop = useSyncExternalStore(
    subscribeToDesktopBreakpoint,
    getDesktopBreakpointSnapshot,
    () => false,
  );

  const [isSectionActive, setIsSectionActive] = useState(
    !supportsIntersectionObserver,
  );

  useEffect(() => {
    const section = capabilityMatrixSectionRef.current;

    if (!section || !supportsIntersectionObserver) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionActive(entry.isIntersecting);
      },
      {
        rootMargin: "0px 0px -99% 0px",
        threshold: 0,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [capabilityMatrixSectionRef]);

  return (
    <section
      ref={capabilityMatrixSectionRef}
      className="relative z-20 min-h-svh overflow-hidden bg-background py-6 md:py-8 lg:py-10"
      style={matrixThemeStyle}
    >
      <div className="relative z-10 flex min-h-[calc(100svh-3rem)] flex-col items-stretch justify-center gap-8">
        <PatternTicker
          label={matrix.topTickerLabel}
          trackRef={capabilityMatrixTopTickerRef}
        />

        <div
          ref={capabilityMatrixContentRef}
          className="site-gutter mx-auto flex w-full max-w-384 items-center"
        >
          <div className="flex w-full flex-col gap-3">
            <DesktopMatrix
              altLabel={matrix.slotAltLabel}
              bubblesEnabled={bubblesEnabled}
              imageSlots={matrix.imageSlots}
              isActive={isSectionActive && isDesktop}
              pills={pills}
              rows={matrix.rows}
            />
            <MobileMatrix
              altLabel={matrix.slotAltLabel}
              bubblesEnabled={bubblesEnabled}
              imageSlots={matrix.imageSlots}
              isActive={isSectionActive && !isDesktop}
              pills={pills}
              rows={matrix.rows}
            />
          </div>
        </div>

        <PatternTicker
          label={matrix.bottomTickerLabel}
          trackRef={capabilityMatrixBottomTickerRef}
        />
      </div>
    </section>
  );
}
