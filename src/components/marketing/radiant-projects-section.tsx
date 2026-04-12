"use client";

import Image from "next/image";
import {
  startTransition,
  useState,
  type CSSProperties,
} from "react";

import { projectGalleryImages } from "@/content/project-gallery-images";
import { useBatchReveal } from "@/lib/animations";
import { cn } from "@/lib/utils";

import type {
  RadiantExperienceContent,
  RadiantExperienceRefs,
} from "./radiant-experience.types";
import { SectionAccent, ViewAllButton } from "./radiant-experience-shared";

type RadiantProjectsSectionProps = {
  content: RadiantExperienceContent;
  refs: RadiantExperienceRefs;
};

export function RadiantProjectsSection({
  content,
  refs,
}: RadiantProjectsSectionProps) {
  const { projectsSectionRef } = refs;
  const { projects } = content;
  const viewAllLabel = content.locale === "vi" ? "Xem tất cả" : "View all";
  const projectsThemeStyle = {
    "--projects-bg": "#e9ddd1",
    "--projects-accent-line": "rgba(201,161,93,0.32)",
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

  useBatchReveal({
    duration: 0.72,
    refreshKey: activeFilter,
    scope: projectsSectionRef,
    selector: "[data-project-reveal]",
    stagger: 0.12,
    start: "top 90%",
    y: 36,
  });

  return (
    <section
      id="projects"
      ref={projectsSectionRef}
      className="site-gutter relative overflow-hidden bg-(--projects-bg) py-16 sm:py-20 lg:py-24"
      style={projectsThemeStyle}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 hidden h-66 w-[min(112vw,92rem)] -translate-x-1/2 rounded-b-full border-b border-(--projects-accent-line) opacity-72 [mask-image:linear-gradient(90deg,transparent,black_16%,black_84%,transparent)] md:block"
      />
      <div className="mx-auto max-w-336">
        <div className="mx-auto max-w-4xl text-center">
          <SectionAccent className="mb-5" />
          <h2 className="title-display-inika mt-4 text-(--projects-title-color)">
            {projects.title}
          </h2>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-base sm:mt-10 ">
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

        <div className="mt-8 columns-2 gap-4 md:mt-10 xl:columns-3">
          {visibleItems.map((item) => {
            const image = projectGalleryImages[item.key];
            const titleWords = item.title.split(" ");
            const displayAspectRatio = `${image.width} / ${image.height}`;

            return (
              <article
                key={item.key}
                className="group mb-4 cursor-pointer break-inside-avoid will-change-transform"
                data-project-reveal
              >
                <div
                  className="relative w-full overflow-hidden rounded-[10px]"
                  style={{ aspectRatio: displayAspectRatio }}
                >
                  <Image
                    alt={item.title}
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    fill
                    sizes="(min-width: 1280px) 28vw, (min-width: 768px) 46vw, 48vw"
                    src={image.src}
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/58 via-black/18 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <h3 className="max-w-[80%] overflow-hidden text-pretty text-base font-medium leading-[1.16] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.32)] md:text-[1.125rem]">
                      {titleWords.map((word, index) => (
                        <span
                          key={`${item.key}-${word}-${index}`}
                          className="mr-[0.28em] inline-block translate-y-5 opacity-0 transition-all duration-500 ease-out motion-reduce:translate-y-0 motion-reduce:transition-none group-hover:translate-y-0 group-hover:opacity-100"
                          style={{
                            transitionDelay: `${index * 55}ms`,
                          }}
                        >
                          {word}
                        </span>
                      ))}
                    </h3>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center">
          <ViewAllButton
            label={viewAllLabel}
            onClick={() => {
              startTransition(() => {
                setActiveFilter("all");
              });
            }}
          />
        </div>
      </div>
    </section>
  );
}
