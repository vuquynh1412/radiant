export const capabilityMatrixSlotKeys = [
  "slotA",
  "slotB",
  "slotC",
  "slotD",
  "slotE",
] as const;

export type CapabilityMatrixSlotKey = (typeof capabilityMatrixSlotKeys)[number];

const imgBrandingAbstract =
  "https://www.figma.com/api/mcp/asset/fcf22329-422a-4813-980a-5a9772da83ad";
const imgBrandObjects =
  "https://www.figma.com/api/mcp/asset/1eedf665-b916-4696-9ca0-70af67f40944";
const imgMarketingIcons =
  "https://www.figma.com/api/mcp/asset/98476951-7dfa-4c8f-bff6-a14dde8d3b33";
const imgStoryPrint =
  "https://www.figma.com/api/mcp/asset/5cfcdad7-231a-424a-9c32-877e465d9db2";
const imgProductTeal =
  "https://www.figma.com/api/mcp/asset/cd900972-f010-4d0f-a91d-dbf1b3fe572c";

export const capabilityMatrixImageSlots: Record<
  CapabilityMatrixSlotKey,
  string[]
> = {
  slotA: [imgBrandingAbstract, imgStoryPrint, imgMarketingIcons],
  slotB: [imgBrandObjects, imgProductTeal, imgBrandingAbstract],
  slotC: [imgMarketingIcons, imgBrandObjects, imgStoryPrint],
  slotD: [imgStoryPrint, imgBrandingAbstract, imgProductTeal],
  slotE: [imgProductTeal, imgMarketingIcons, imgBrandObjects],
};
