export const capabilityMatrixSlotKeys = [
  "slotA",
  "slotB",
  "slotC",
  "slotD",
  "slotE",
] as const;

export type CapabilityMatrixSlotKey = (typeof capabilityMatrixSlotKeys)[number];

const imgBrandingPackaging = "/capability-matrix/branding-packaging.png";
const imgMarketingBrochure = "/capability-matrix/marketing-brochure.png";
const imgSocialMobileIcons = "/capability-matrix/social-mobile-icons.png";
const imgStorytellingWorkbench = "/capability-matrix/storytelling-workbench.png";
const imgSocialCommerceGrid = "/capability-matrix/social-commerce-grid.png";

export const capabilityMatrixImageSlots: Record<
  CapabilityMatrixSlotKey,
  string[]
> = {
  slotA: [imgBrandingPackaging, imgStorytellingWorkbench, imgMarketingBrochure],
  slotB: [imgMarketingBrochure, imgSocialCommerceGrid, imgBrandingPackaging],
  slotC: [imgSocialMobileIcons, imgSocialCommerceGrid, imgMarketingBrochure],
  slotD: [imgStorytellingWorkbench, imgBrandingPackaging, imgSocialMobileIcons],
  slotE: [imgSocialCommerceGrid, imgMarketingBrochure, imgStorytellingWorkbench],
};
