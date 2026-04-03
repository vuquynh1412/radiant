"use client";

import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import {
  startTransition,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";

import { projectGalleryImages } from "@/content/project-gallery-images";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { RadiantExperienceContent } from "./radiant-experience.types";

type RadiantProjectsSectionProps = {
  content: RadiantExperienceContent;
  projectsSectionRef: RefObject<HTMLElement | null>;
};

export function RadiantProjectsSection({
  content,
  projectsSectionRef,
}: RadiantProjectsSectionProps) {
  const { projects } = content;
  const viewAllLabel = content.locale === "vi" ? "Xem tất cả" : "View all";
  const projectsThemeStyle = {
    "--projects-bg": "#e9ddd1",
    "--projects-button-border-color": "rgba(39,39,42,0.38)",
    "--projects-button-hover-bg": "rgba(39,39,42,0.04)",
    "--projects-button-text-color": "#27272A",
    "--projects-card-title-color": "#27272A",
    "--projects-eyebrow-color": "rgba(39,39,42,0.46)",
    "--projects-filter-active-color": "#27272A",
    "--projects-filter-hover-color": "rgba(39,39,42,0.78)",
    "--projects-filter-inactive-color": "rgba(39,39,42,0.44)",
    "--projects-intro-color": "rgba(39,39,42,0.68)",
    "--projects-title-color": "#27272A",
  } as CSSProperties;
  const [activeFilter, setActiveFilter] =
    useState<(typeof projects.filters)[number]["key"]>("all");

  const visibleItems =
    activeFilter === "all"
      ? projects.items
      : projects.items.filter((item) => item.filter === activeFilter);

  return (
    <section
      id="projects"
      ref={projectsSectionRef}
      className="site-gutter relative overflow-hidden bg-(--projects-bg) py-16 sm:py-20 lg:py-24"
      style={projectsThemeStyle}
    >
      <div className="mx-auto max-w-336">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="title-display-inika mt-4 text-(--projects-title-color)">
            {projects.title}
          </h2>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-base sm:mt-10 sm:justify-start">
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
                    ? "font-semibold text-(--projects-filter-active-color)"
                    : "text-(--projects-filter-inactive-color) hover:text-(--projects-filter-hover-color)",
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 columns-2 gap-1 md:mt-10 md:gap-4 xl:columns-3">
          {visibleItems.map((item) => {
            const image = projectGalleryImages[item.key];

            return (
              <article
                key={item.key}
                className="mb-1 break-inside-avoid md:mb-4"
              >
                <div
                  className="relative w-full overflow-hidden rounded-[1rem] md:rounded-[1.4rem]"
                  style={{ aspectRatio: `${image.width} / ${image.height}` }}
                >
                  <Image
                    alt={item.title}
                    className="object-cover"
                    fill
                    sizes="(min-width: 1280px) 28vw, (min-width: 768px) 46vw, 48vw"
                    src={image.src}
                  />
                </div>
                <h3 className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap text-base font-medium leading-[1.12] text-(--projects-card-title-color) md:text-[1.125rem]">
                  {item.title}
                </h3>
              </article>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => {
              startTransition(() => {
                setActiveFilter("all");
              });
            }}
            className={buttonVariants({
              className:
                "border-(--projects-button-border-color) bg-transparent text-(--projects-button-text-color) hover:bg-(--projects-button-hover-bg)",
              size: "marketing",
              variant: "outline",
            })}
          >
            <span>{viewAllLabel}</span>
            <ArrowRightIcon className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
