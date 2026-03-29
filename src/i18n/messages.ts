import type { Locale } from "@/i18n/config";

import en from "../../messages/en.json";
import vi from "../../messages/vi.json";

export type AppMessages = typeof en;
export type HomePageMessages = AppMessages["HomePage"];

export const messages: Record<Locale, AppMessages> = {
  en,
  vi,
};
