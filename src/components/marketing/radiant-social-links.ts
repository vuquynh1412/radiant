export type RadiantSocialKey =
  | "facebook"
  | "instagram"
  | "tiktok"
  | "linkedin"
  | "messenger"
  | "x"
  | "youtube";

export const radiantSocialLinks: Partial<Record<RadiantSocialKey, string>> = {
  // Populate official profile URLs here when they are available.
  messenger: "",
  // Add official Zalo contact URL here when available.
  // Example: https://zalo.me/<your-id>
  // We intentionally keep this outside the strict social key union because it
  // powers a floating support CTA rather than a footer social profile.
};

export const radiantSupportLinks = {
  zalo: "",
} as const;
