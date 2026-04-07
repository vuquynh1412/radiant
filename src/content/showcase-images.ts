import type { HomePageMessages } from "@/i18n/messages";
import { clientGalleryImages } from "@/content/client-gallery-images";

export type ShowcaseImage = {
  fallbackSrc: string;
  position?: string;
  src: string;
};

type ServiceKey = keyof HomePageMessages["Services"]["items"] & string;

const makeLocalImage = ({
  src,
  position = "50% 50%",
}: {
  src: string;
  position?: string;
}): ShowcaseImage => ({
  fallbackSrc: src,
  position,
  src,
});

export const showcaseVariantImages = {
  clinic: makeLocalImage({
    src: clientGalleryImages["2053011-full"].src,
    position: "50% 40%",
  }),
  emerald: makeLocalImage({
    src: clientGalleryImages["4-style-guide"].src,
    position: "50% 44%",
  }),
  noir: makeLocalImage({
    src: clientGalleryImages["brand-bloom"].src,
    position: "50% 42%",
  }),
  portrait: makeLocalImage({
    src: clientGalleryImages["2333724-full"].src,
    position: "50% 28%",
  }),
  rose: makeLocalImage({
    src: clientGalleryImages["brand-guidelines-template"].src,
    position: "50% 48%",
  }),
  sand: makeLocalImage({
    src: clientGalleryImages["5-white-stationery"].src,
    position: "50% 42%",
  }),
  studio: makeLocalImage({
    src: clientGalleryImages["yellow-mockup"].src,
    position: "50% 42%",
  }),
  vista: makeLocalImage({
    src: clientGalleryImages["01-fe14bd1f"].src,
    position: "50% 45%",
  }),
} as const;

export const serviceImages: Record<ServiceKey, ShowcaseImage> = {
  digital: makeLocalImage({
    src: clientGalleryImages["5-white-stationery"].src,
    position: "50% 42%",
  }),
  guidelines: makeLocalImage({
    src: clientGalleryImages["yellow-mockup"].src,
    position: "50% 42%",
  }),
  identity: makeLocalImage({
    src: clientGalleryImages["brand-guidelines-template"].src,
    position: "50% 46%",
  }),
  messaging: makeLocalImage({
    src: clientGalleryImages["2333724-full"].src,
    position: "50% 48%",
  }),
  naming: makeLocalImage({
    src: clientGalleryImages["brand-bloom"].src,
    position: "50% 50%",
  }),
  positioning: makeLocalImage({
    src: clientGalleryImages["4-style-guide"].src,
    position: "50% 48%",
  }),
  rollout: makeLocalImage({
    src: clientGalleryImages["01-fe14bd1f"].src,
    position: "50% 48%",
  }),
  strategy: makeLocalImage({
    src: clientGalleryImages["2053011-full"].src,
    position: "50% 44%",
  }),
};
