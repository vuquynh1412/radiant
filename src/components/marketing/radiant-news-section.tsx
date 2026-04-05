"use client";

import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { RadiantExperienceContent } from "./radiant-experience.types";
import type { RadiantNewsItem } from "./radiant-experience.types";
import { SectionAccent } from "./radiant-experience-shared";

type RadiantNewsSectionProps = {
  content: RadiantExperienceContent;
};

const newsGridLayouts = {
  "brand-pattern-language":
    "aspect-[1.16/1] md:col-span-1 md:col-start-1 md:row-span-2 md:row-start-1 md:h-full md:aspect-auto",
  "cover-story":
    "aspect-[1.16/1] max-md:hidden md:col-span-1 md:col-start-1 md:row-start-3 md:h-full md:aspect-auto",
  "launch-shelves":
    "aspect-[1.16/1] md:col-start-2 md:row-start-1 md:h-full md:aspect-auto",
  "packaging-editorial":
    "aspect-[1.16/1] max-md:hidden md:col-span-2 md:col-start-2 md:row-span-2 md:row-start-2 md:h-full md:aspect-auto",
  "palette-codes":
    "aspect-[1.16/1] md:col-start-3 md:row-start-1 md:h-full md:aspect-auto",
} as const;

function lineClampClass(lines: 1 | 2) {
  return lines === 1
    ? "[display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] overflow-hidden"
    : "[display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden";
}

function NewsCard({
  className,
  item,
  mobile = false,
}: {
  className: string;
  item: RadiantNewsItem;
  mobile?: boolean;
}) {
  return (
    <article
      key={item.key}
      className={cn(
        "group relative overflow-hidden rounded-[10px] border border-(--news-card-border) bg-white/2",
        !mobile && "h-full",
        className,
      )}
    >
      <Image
        alt={item.title}
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        fill
        sizes={mobile ? "100vw" : "(min-width: 1280px) 24vw, (min-width: 768px) 30vw, 100vw"}
        src={item.image.src}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,11,0.04)_0%,rgba(10,10,11,0.14)_24%,rgba(10,10,11,0.56)_68%,rgba(10,10,11,0.93)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_110%,rgba(201,161,93,0.18),transparent_48%)] opacity-80" />
      <div className="absolute inset-0 bg-black/8 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-x-5 bottom-0 h-px bg-[linear-gradient(90deg,rgba(201,161,93,0.7),rgba(201,161,93,0))] opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100" />

      <div className={cn("absolute inset-x-0 bottom-0", mobile ? "p-4" : "p-4 sm:p-5")}>
        <div className={cn("relative overflow-hidden", mobile ? "min-h-[6.7rem]" : "min-h-[6.8rem] sm:min-h-[7.2rem]")}>
          <h3
            className={cn(
              "absolute inset-x-0 bottom-0 max-w-[92%] font-medium tracking-[-0.01em] text-white text-shadow-soft transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              mobile
                ? "text-[1.02rem] leading-[1.14] group-hover:-translate-y-[3.2rem]"
                : "text-[1.05rem] leading-[1.14] group-hover:-translate-y-[3.2rem] sm:text-[1.12rem]",
              lineClampClass(1),
            )}
          >
            {item.title}
          </h3>
          <p
            className={cn(
              "pointer-events-none absolute inset-x-0 bottom-0 max-w-[88%] translate-y-[102%] text-white/78 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100",
              mobile ? "text-[0.92rem] leading-6" : "text-sm leading-6",
              lineClampClass(2),
            )}
          >
            {item.description}
          </p>
        </div>
      </div>
    </article>
  );
}

export function RadiantNewsSection({
  content,
}: RadiantNewsSectionProps) {
  const viewAllLabel = content.locale === "vi" ? "Xem tất cả" : "View all";
  const mobileVisibleNewsItems = content.news.items.slice(0, 3);
  const sectionEyebrow = content.locale === "vi" ? "Nhật ký thương hiệu" : "Brand Journal";
  const themeStyle = {
    "--news-bg": "#171614",
    "--news-card-border": "rgba(255,255,255,0.08)",
    "--news-button-border": "rgba(255,255,255,0.2)",
    "--news-button-hover-bg": "rgba(255,255,255,0.06)",
    "--news-title": "#F7EFE4",
    "--news-accent": "#C9A15D",
    "--news-accent-line": "rgba(201,161,93,0.42)",
    "--news-accent-soft": "rgba(214,188,144,0.84)",
  } as CSSProperties;

  return (
    <section
      id="news"
      className="site-gutter relative overflow-hidden bg-(--news-bg) pb-16 pt-0 text-white scroll-mt-28 sm:scroll-mt-32 sm:pb-20 lg:scroll-mt-36 lg:pb-24"
      style={themeStyle}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,#171614_0%,rgba(23,22,20,0.94)_42%,rgba(23,22,20,0)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(0deg,#171614_0%,rgba(23,22,20,0.94)_42%,rgba(23,22,20,0)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 hidden h-66 w-[min(112vw,92rem)] -translate-x-1/2 rounded-t-full border-t border-(--news-accent-line) opacity-72 [mask-image:linear-gradient(90deg,transparent,black_16%,black_84%,transparent)] md:block"
      />
      <div className="mx-auto max-w-336">
        <div className="mx-auto max-w-4xl pt-12 text-center sm:pt-14 md:pt-16">
          <SectionAccent
            className="mb-5"
            label={sectionEyebrow}
            tone="light"
          />
          <h2 className="title-display-inika text-(--news-title) text-shadow-soft">
            {content.news.title}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:hidden">
          {mobileVisibleNewsItems.map((item) => (
            <NewsCard
              key={item.key}
              className="aspect-[1.16/1]"
              item={item}
              mobile
            />
          ))}
        </div>

        <div className="mt-10 hidden gap-4 md:grid md:h-[clamp(28rem,68vw,36rem)] md:grid-cols-[1.7fr_0.86fr_0.86fr] md:grid-rows-[1fr_1fr_0.92fr] md:gap-4 xl:h-[clamp(34rem,45vw,44rem)]">
          {content.news.items.map((item) => (
            <NewsCard
              key={item.key}
              className={newsGridLayouts[item.key]}
              item={item}
            />
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => {}}
            className={buttonVariants({
              className:
                "border-(--news-button-border) bg-transparent text-white shadow-[0_18px_40px_-34px_rgba(0,0,0,0.9)] hover:bg-(--news-button-hover-bg) hover:border-(--news-accent-line)",
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
