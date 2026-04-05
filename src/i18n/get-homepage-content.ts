import type { Locale } from "@/i18n/config";
import type { AppMessages, HomePageMessages } from "@/i18n/messages";
import {
  capabilityMatrixImageSlots,
  type CapabilityMatrixSlotKey,
} from "@/content/capability-matrix-images";
import {
  serviceImages,
  type ShowcaseImage,
} from "@/content/showcase-images";
import { newsGalleryImages } from "@/content/news-gallery-images";

type ServiceKey = keyof HomePageMessages["Services"]["items"] & string;
type ProjectKey = keyof HomePageMessages["Projects"]["items"] & string;
type ProjectFilterKey = keyof HomePageMessages["Projects"]["filters"] & string;
type PlanKey = keyof HomePageMessages["Plans"]["items"] & string;
type NewsKey = keyof HomePageMessages["News"]["items"] & string;

export type OrderedServiceItem = HomePageMessages["Services"]["items"][ServiceKey] & {
  image: ShowcaseImage;
  key: ServiceKey;
};

export type OrderedProjectItem =
  HomePageMessages["Projects"]["items"][ProjectKey] & {
    key: ProjectKey;
    filter: ProjectFilterKey;
  };

export type OrderedProjectFilter = {
  key: ProjectFilterKey;
  label: HomePageMessages["Projects"]["filters"][ProjectFilterKey];
};

export type OrderedPlanItem = HomePageMessages["Plans"]["items"][PlanKey] & {
  key: PlanKey;
};

export type OrderedNewsItem = HomePageMessages["News"]["items"][NewsKey] & {
  image: (typeof newsGalleryImages)[keyof typeof newsGalleryImages];
  key: NewsKey;
};

export type HomePageContent = {
  common: AppMessages["Common"];
  locale: Locale;
  brand: HomePageMessages["Brand"];
  hero: HomePageMessages["Hero"];
  services: Omit<HomePageMessages["Services"], "items" | "order"> & {
    items: OrderedServiceItem[];
  };
  capabilityMatrix: HomePageMessages["CapabilityMatrix"] & {
    imageSlots: Record<CapabilityMatrixSlotKey, string[]>;
  };
  plans: Pick<HomePageMessages["Plans"], "title"> & {
    items: OrderedPlanItem[];
  };
  news: Pick<HomePageMessages["News"], "title"> & {
    items: OrderedNewsItem[];
  };
  projects: Omit<
    HomePageMessages["Projects"],
    "filters" | "filterOrder" | "items" | "order"
  > & {
    filterLabels: HomePageMessages["Projects"]["filters"];
    filters: OrderedProjectFilter[];
    items: OrderedProjectItem[];
  };
  about: HomePageMessages["About"];
  cta: HomePageMessages["CTA"];
  footer: HomePageMessages["Footer"];
};

export function getHomePageContent(
  locale: Locale,
  messages: AppMessages,
): HomePageContent {
  const home = messages.HomePage;
  const serviceOrder = home.Services.order as ServiceKey[];
  const projectOrder = home.Projects.order as ProjectKey[];
  const projectFilterOrder = home.Projects.filterOrder as ProjectFilterKey[];
  const planOrder = home.Plans.order as PlanKey[];
  const newsOrder = home.News.order as NewsKey[];
  const items = serviceOrder.map((key) => ({
    image: serviceImages[key],
    key,
    ...home.Services.items[key],
  }));
  const projectItems = projectOrder.map((key) => ({
    key,
    ...home.Projects.items[key],
    filter: home.Projects.items[key].filter as ProjectFilterKey,
  }));
  const projectFilters = projectFilterOrder.map((key) => ({
    key,
    label: home.Projects.filters[key],
  }));
  const planItems = planOrder.map((key) => ({
    key,
    ...home.Plans.items[key],
  }));
  const newsItems = newsOrder.map((key) => ({
    image: newsGalleryImages[key],
    key,
    ...home.News.items[key],
  }));

  return {
    about: home.About,
    brand: home.Brand,
    capabilityMatrix: {
      ...home.CapabilityMatrix,
      imageSlots: capabilityMatrixImageSlots,
    },
    common: messages.Common,
    cta: home.CTA,
    footer: home.Footer,
    hero: home.Hero,
    locale,
    news: {
      items: newsItems,
      title: home.News.title,
    },
    plans: {
      items: planItems,
      title: home.Plans.title,
    },
    projects: {
      filterLabels: home.Projects.filters,
      filters: projectFilters,
      items: projectItems,
      title: home.Projects.title,
    },
    services: {
      eyebrow: home.Services.eyebrow,
      intro: home.Services.intro,
      items,
      title: home.Services.title,
    },
  };
}
