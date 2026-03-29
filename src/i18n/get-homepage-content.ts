import type { Locale } from "@/i18n/config";
import type { AppMessages, HomePageMessages } from "@/i18n/messages";
import {
  capabilityMatrixImageSlots,
  type CapabilityMatrixSlotKey,
} from "@/content/capability-matrix-images";

type ServiceKey = keyof HomePageMessages["Services"]["items"] & string;
type ProjectKey = keyof HomePageMessages["Projects"]["items"] & string;
type ProjectFilterKey = keyof HomePageMessages["Projects"]["filters"] & string;
type PlanKey = keyof HomePageMessages["Plans"]["items"] & string;

export type OrderedServiceItem = HomePageMessages["Services"]["items"][ServiceKey] & {
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
  const items = serviceOrder.map((key) => ({
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
    plans: {
      items: planItems,
      title: home.Plans.title,
    },
    projects: {
      eyebrow: home.Projects.eyebrow,
      filterLabels: home.Projects.filters,
      filters: projectFilters,
      intro: home.Projects.intro,
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
