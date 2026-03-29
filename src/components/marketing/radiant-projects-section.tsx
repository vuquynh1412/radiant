"use client";

import { startTransition, useState } from "react";

import { cn } from "@/lib/utils";

import type {
  RadiantExperienceContent,
  RadiantProjectItem,
} from "./radiant-experience.types";

type RadiantProjectsSectionProps = {
  content: RadiantExperienceContent;
};

const mediaHeightClasses = {
  compact: "h-[12rem]",
  standard: "h-[14.5rem]",
  tall: "h-[18rem]",
} as const;

type ProjectMediaHeight = keyof typeof mediaHeightClasses;

function MiniBadge({
  className,
  label,
}: {
  className?: string;
  label: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[0.68rem] font-semibold tracking-[0.08em] text-white uppercase shadow-[0_10px_22px_-14px_rgba(0,0,0,0.4)]",
        className,
      )}
    >
      {label}
    </div>
  );
}

function ProjectVisual({ item }: { item: RadiantProjectItem }) {
  switch (item.visual) {
    case "signage-grid":
      return (
        <div className="relative h-full w-full overflow-hidden bg-[#53cc89]">
          <div className="absolute inset-x-5 top-7 grid grid-cols-3 gap-4">
            <MiniBadge className="bg-[#ef2f9a]" label="WALL'S" />
            <MiniBadge className="bg-[#7d4cd9]" label="FRISKO" />
            <MiniBadge className="bg-[#f3b423]" label="ALGIDA" />
            <MiniBadge className="bg-[#2197dd]" label="HOLANDA" />
            <MiniBadge className="bg-[#ff6b1d]" label="GOOD HUMOR" />
            <MiniBadge className="bg-[#1c4f9d]" label="LANGNESE" />
          </div>
          <div className="absolute inset-x-8 bottom-7 flex items-center justify-between text-[0.62rem] font-medium tracking-[0.2em] text-black/55 uppercase">
            <span>System</span>
            <span>Global</span>
            <span>Rollout</span>
          </div>
        </div>
      );
    case "stacked-boards":
      return (
        <div className="relative h-full w-full overflow-hidden bg-[linear-gradient(180deg,#c8f5ef_0%,#fff17e_100%)]">
          {[
            "rotate-[14deg] bg-[#efef80]",
            "-rotate-[6deg] bg-[#f3b6d7]",
            "-rotate-[22deg] bg-[#6f84b8]",
            "-rotate-[36deg] bg-[#c7d2ee]",
          ].map((panel, index) => (
            <div
              key={panel}
              className={cn(
                "absolute left-1/2 top-[42%] h-[7.6rem] w-[5.6rem] rounded-[0.8rem] border border-white/45 shadow-[0_18px_32px_-18px_rgba(33,28,20,0.45)]",
                panel,
              )}
              style={{
                transformOrigin: "top center",
                translate: `${index * 0.45}rem ${index * 0.95}rem`,
              }}
            />
          ))}
        </div>
      );
    case "spectrum-ribbon":
      return (
        <div className="relative h-full w-full overflow-hidden bg-[#fcfcfb]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_78%,#000_0,#000_18%,transparent_19%),radial-gradient(circle_at_82%_20%,#000_0,#000_18%,transparent_19%)] opacity-95" />
          {[
            "#ef202a",
            "#f38f19",
            "#ffd400",
            "#2f9c46",
            "#2457d5",
            "#6226cf",
          ].map((color, index) => (
            <div
              key={color}
              className="absolute left-[-14%] top-1/2 h-[1.9rem] w-[128%] -translate-y-1/2 rounded-full"
              style={{
                backgroundColor: color,
                rotate: `${-30 + index * 8}deg`,
                translate: `0 ${-3.4 + index * 1.1}rem`,
              }}
            />
          ))}
        </div>
      );
    case "editorial-cover":
      return (
        <div className="relative h-full w-full overflow-hidden bg-[#060606]">
          <div className="absolute left-[12%] top-[16%] h-[68%] w-[44%] rotate-[-10deg] rounded-[0.9rem] bg-[linear-gradient(155deg,#171717_0%,#f3f0e6_78%)] shadow-[0_24px_42px_-24px_rgba(0,0,0,0.7)]" />
          <div className="absolute left-[18%] top-[24%] h-[40%] w-[30%] rotate-[-10deg] border border-white/12" />
          <div className="absolute left-[18%] top-[24%] rotate-[-10deg] text-[2.1rem] font-semibold tracking-[-0.08em] text-[#ff6d33]">
            ION.
          </div>
          <div className="absolute bottom-[20%] left-[18%] max-w-[34%] rotate-[-10deg] text-[0.72rem] font-medium tracking-[0.14em] text-white/78 uppercase">
            Brand Systems & Visuals
          </div>
        </div>
      );
    case "numeric-column":
      return (
        <div className="relative h-full w-full overflow-hidden bg-[#fb3f2f]">
          <div className="absolute inset-y-0 left-1/2 w-[22%] -translate-x-1/2 bg-white" />
          {Array.from({ length: 5 }).map((_, column) => (
            <div
              key={column}
              className="absolute inset-y-0 flex flex-col justify-between py-4 text-[4.6rem] font-semibold leading-none tracking-[-0.12em] text-black"
              style={{ left: `${7 + column * 19}%` }}
            >
              <span>{column === 2 ? "25" : "30"}</span>
              <span>{column === 2 ? "25" : "01"}</span>
              <span>{column === 2 ? "25" : "02"}</span>
            </div>
          ))}
        </div>
      );
    case "blue-orbit":
      return (
        <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(circle_at_52%_42%,#12184c_0%,#050505_68%)]">
          <div className="absolute right-[18%] top-[20%] h-[9.75rem] w-[9.75rem] rounded-full bg-[radial-gradient(circle_at_35%_35%,#7ec2ff_0%,#3256d8_32%,#13163c_70%,#050506_100%)] shadow-[0_12px_50px_-20px_rgba(28,76,245,0.75)]" />
          <div className="absolute right-[23%] top-[26%] h-[7rem] w-[7rem] rounded-full border border-white/10" />
        </div>
      );
    case "signal-columns":
      return (
        <div className="relative h-full w-full overflow-hidden bg-[linear-gradient(180deg,#f4efe4_0%,#d8ccb9_100%)]">
          <div className="absolute inset-x-6 top-6 grid grid-cols-6 gap-3">
            {[
              ["#ff6d33", "8.5rem"],
              ["#101010", "11rem"],
              ["#ffb347", "6.75rem"],
              ["#5775ff", "9.25rem"],
              ["#0b8f6b", "12rem"],
              ["#fefefe", "7.5rem"],
            ].map(([color, height]) => (
                <div
                  key={color}
                  className="rounded-[1rem] shadow-[0_12px_24px_-14px_rgba(21,15,11,0.4)]"
                  style={{ backgroundColor: color, height }}
                />
              ))}
          </div>
        </div>
      );
    case "glass-gallery":
      return (
        <div className="relative h-full w-full overflow-hidden bg-[linear-gradient(135deg,#f5d7bc_0%,#f0f0e9_48%,#cff6e7_100%)]">
          <div className="absolute inset-x-[22%] top-[18%] bottom-[18%] rounded-[1.6rem] border border-white/28 bg-white/22 backdrop-blur-sm" />
          <div className="absolute left-[12%] top-[16%] h-[32%] w-[28%] rounded-[1.2rem] bg-white/15" />
          <div className="absolute right-[14%] bottom-[16%] h-[36%] w-[32%] rounded-[1.4rem] bg-white/16" />
        </div>
      );
    case "blueprint-sheets":
      return (
        <div className="relative h-full w-full overflow-hidden bg-[linear-gradient(180deg,#1732d3_0%,#4974ff_100%)]">
          {["-rotate-[12deg]", "rotate-[4deg]", "rotate-[15deg]"].map((rotation, index) => (
            <div
              key={rotation}
              className={cn(
                "absolute bottom-[14%] left-[18%] h-[62%] w-[56%] rounded-[1rem] border border-white/20 bg-white/10 shadow-[0_20px_40px_-26px_rgba(0,0,0,0.55)] backdrop-blur-[1px]",
                rotation,
              )}
              style={{ translate: `${index * 1.35}rem ${index * 0.35}rem` }}
            >
              <div className="absolute inset-4 border border-white/22" />
            </div>
          ))}
        </div>
      );
    case "monochrome-curve":
      return (
        <div className="relative h-full w-full overflow-hidden bg-[#f7f3eb]">
          <div className="absolute -left-[8%] top-[18%] h-[74%] w-[52%] rounded-full bg-black" />
          <div className="absolute right-[-10%] bottom-[12%] h-[70%] w-[54%] rounded-full bg-black" />
          <div className="absolute left-[18%] top-[18%] h-[68%] w-[64%] rounded-[45%] border-[1.5rem] border-[#f7f3eb]" />
        </div>
      );
    case "gradient-board":
      return (
        <div className="relative h-full w-full overflow-hidden bg-[linear-gradient(135deg,#f4efe2_0%,#ece7df_42%,#f7d1c8_100%)]">
          <div className="absolute left-[10%] top-[18%] h-[62%] w-[80%] rounded-[1.2rem] bg-[linear-gradient(180deg,#101010_0%,#352f2c_100%)] shadow-[0_18px_36px_-22px_rgba(18,14,11,0.55)]" />
          <div className="absolute left-[18%] top-[24%] h-[46%] w-[64%] rounded-[0.9rem] bg-[radial-gradient(circle_at_30%_28%,#6bc4ff_0%,transparent_24%),radial-gradient(circle_at_78%_38%,#ff7c87_0%,transparent_22%),linear-gradient(180deg,#152739_0%,#060709_100%)]" />
        </div>
      );
    case "kinetic-type":
    default:
      return (
        <div className="relative h-full w-full overflow-hidden bg-[linear-gradient(180deg,#f5efe5_0%,#d9d1c4_100%)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,111,76,0.14),transparent_24%),radial-gradient(circle_at_78%_24%,rgba(57,186,255,0.2),transparent_22%)]" />
          <div className="absolute inset-x-5 top-5 grid gap-2 text-[2.8rem] font-semibold leading-none tracking-[-0.12em] text-black/88">
            <div className="flex justify-between">
              <span>BR</span>
              <span>ND</span>
              <span>OS</span>
            </div>
            <div className="flex justify-between text-black/72">
              <span>LA</span>
              <span>UN</span>
              <span>CH</span>
            </div>
            <div className="flex justify-between text-black/54">
              <span>GRID</span>
              <span>TYPE</span>
            </div>
          </div>
        </div>
      );
  }
}

export function RadiantProjectsSection({
  content,
}: RadiantProjectsSectionProps) {
  const { projects } = content;
  const [activeFilter, setActiveFilter] =
    useState<(typeof projects.filters)[number]["key"]>("all");

  const visibleItems =
    activeFilter === "all"
      ? projects.items
      : projects.items.filter((item) => item.filter === activeFilter);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#171614] px-4 py-16 text-[#f5f1e8] sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-[84rem]">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[0.72rem] font-medium tracking-[0.22em] text-white/46 uppercase">
            {projects.eyebrow}
          </p>
          <h2 className="mt-4 font-heading text-[clamp(3rem,6vw,5.4rem)] leading-[0.92] tracking-[-0.065em] text-[#f8f3eb]">
            {projects.title}
          </h2>
          <p className="mt-5 text-base leading-7 text-white/58 sm:text-lg">
            {projects.intro}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-sm sm:mt-10 sm:justify-start">
          {projects.filters.map((filter) => {
            const isActive = filter.key === activeFilter;

            return (
              <button
                key={filter.key}
                type="button"
                onClick={() => {
                  startTransition(() => {
                    setActiveFilter(filter.key);
                  });
                }}
                className={cn(
                  "transition-colors duration-200",
                  isActive
                    ? "font-semibold text-white"
                    : "text-white/44 hover:text-white/78",
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 columns-1 gap-6 md:mt-10 md:columns-2 xl:columns-3">
          {visibleItems.map((item) => (
            <article
              key={item.key}
              className="mb-6 break-inside-avoid overflow-hidden rounded-[1.75rem] bg-[#f3efe8] text-[#111111] shadow-[0_28px_70px_-38px_rgba(0,0,0,0.45)]"
            >
              <div
                className={cn(
                  "relative",
                  mediaHeightClasses[item.mediaHeight as ProjectMediaHeight],
                )}
              >
                <ProjectVisual item={item} />
              </div>
              <div className="space-y-3 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                <p className="text-[0.72rem] font-medium tracking-[0.08em] text-black/54 uppercase">
                  {item.date}
                </p>
                <h3 className="font-sans text-[clamp(1.7rem,2.25vw,2.45rem)] font-semibold leading-[0.92] tracking-[-0.06em]">
                  {item.title}
                </h3>
                <p className="text-[0.78rem] font-medium tracking-[0.12em] text-black/56 uppercase">
                  {projects.filterLabels[item.filter]}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
