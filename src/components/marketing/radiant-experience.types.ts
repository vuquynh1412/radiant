import type { RefObject } from "react";

import type {
  HomePageContent,
  OrderedNewsItem,
  OrderedPlanItem,
  OrderedProjectItem,
  OrderedServiceItem,
} from "@/i18n/get-homepage-content";

export type RadiantExperienceProps = Record<string, never>;

export type LayoutState = {
  opacity: number;
  scale: number;
  x: number;
  y: number;
};

export type RadiantExperienceContent = HomePageContent;
export type RadiantPlanItem = OrderedPlanItem;
export type RadiantProjectItem = OrderedProjectItem;
export type RadiantServiceItem = OrderedServiceItem;
export type RadiantNewsItem = OrderedNewsItem;

export type RadiantExperienceRefs = {
  rootRef: RefObject<HTMLDivElement | null>;
  showcaseSectionRef: RefObject<HTMLDivElement | null>;
  heroMatteRef: RefObject<HTMLDivElement | null>;
  heroMediaRef: RefObject<HTMLDivElement | null>;
  heroMediaFrameRef: RefObject<HTMLDivElement | null>;
  heroFinalImageRef: RefObject<HTMLDivElement | null>;
  heroTitleRef: RefObject<HTMLDivElement | null>;
  heroMonogramRef: RefObject<HTMLDivElement | null>;
  heroTopPatternRef: RefObject<HTMLDivElement | null>;
  heroMarqueeRef: RefObject<HTMLDivElement | null>;
  heroMarqueeTrackRef: RefObject<HTMLDivElement | null>;
  heroFinalMarqueeRef: RefObject<HTMLDivElement | null>;
  heroFinalMarqueeTrackRef: RefObject<HTMLDivElement | null>;
  activeServiceCopyShellRef: RefObject<HTMLDivElement | null>;
  serviceGridShellRef: RefObject<HTMLDivElement | null>;
  serviceHeaderRef: RefObject<HTMLDivElement | null>;
  serviceGridFooterRef: RefObject<HTMLDivElement | null>;
  serviceGridItemRefs: RefObject<Array<HTMLElement | null>>;
  serviceCardsRef: RefObject<Array<HTMLDivElement | null>>;
  serviceCopyRefs: RefObject<Array<HTMLDivElement | null>>;
  sampleTileRef: RefObject<HTMLDivElement | null>;
  aboutSectionRef: RefObject<HTMLDivElement | null>;
  aboutContentRef: RefObject<HTMLDivElement | null>;
  aboutCharRefs: RefObject<Array<HTMLSpanElement | null>>;
  capabilityMatrixSectionRef: RefObject<HTMLElement | null>;
  projectsSectionRef: RefObject<HTMLElement | null>;
  capabilityMatrixContentRef: RefObject<HTMLDivElement | null>;
  capabilityMatrixTopTickerRef: RefObject<HTMLDivElement | null>;
  capabilityMatrixBottomTickerRef: RefObject<HTMLDivElement | null>;
};
