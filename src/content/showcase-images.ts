import type { HomePageMessages } from "@/i18n/messages";

export type ShowcaseImage = {
  fallbackSrc: string;
  position?: string;
  src: string;
};

type ServiceKey = keyof HomePageMessages["Services"]["items"] & string;

const makeUnsplashImage = ({
  fallbackSrc,
  id,
  position = "50% 50%",
}: {
  fallbackSrc: string;
  id: string;
  position?: string;
}): ShowcaseImage => ({
  fallbackSrc,
  position,
  src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`,
});

export const showcaseVariantImages = {
  clinic: makeUnsplashImage({
    fallbackSrc: "/project-gallery/apple-architecture.jpg",
    id: "photo-1524758631624-e2822e304c36",
    position: "50% 40%",
  }),
  emerald: makeUnsplashImage({
    fallbackSrc: "/project-gallery/mono-curve.jpg",
    id: "photo-1520607162513-77705c0f0d4a",
    position: "50% 44%",
  }),
  noir: makeUnsplashImage({
    fallbackSrc: "/project-gallery/kinetic-type.jpg",
    id: "photo-1504384308090-c894fdcc538d",
    position: "50% 42%",
  }),
  portrait: makeUnsplashImage({
    fallbackSrc: "/project-gallery/north-south-market.jpg",
    id: "photo-1487412720507-e7ab37603c6f",
    position: "50% 28%",
  }),
  rose: makeUnsplashImage({
    fallbackSrc: "/project-gallery/signal-25-launch.jpg",
    id: "photo-1516321318423-f06f85e504b3",
    position: "50% 48%",
  }),
  sand: makeUnsplashImage({
    fallbackSrc: "/project-gallery/atlas-blueprint.jpg",
    id: "photo-1517248135467-4c7edcad34c4",
    position: "50% 42%",
  }),
  studio: makeUnsplashImage({
    fallbackSrc: "/project-gallery/nocturne-orbit.jpg",
    id: "photo-1500530855697-b586d89ba3ee",
    position: "50% 42%",
  }),
  vista: makeUnsplashImage({
    fallbackSrc: "/project-gallery/global-brand-systems.jpg",
    id: "photo-1497366754035-f200968a6e72",
    position: "50% 45%",
  }),
} as const;

export const serviceImages: Record<ServiceKey, ShowcaseImage> = {
  digital: makeUnsplashImage({
    fallbackSrc: "/project-gallery/gradient-campaign.jpg",
    id: "photo-FSF_QaPoImo",
    position: "50% 42%",
  }),
  guidelines: makeUnsplashImage({
    fallbackSrc: "/project-gallery/meridian-columns.jpg",
    id: "photo-1551288049-bebda4e38f71",
    position: "50% 42%",
  }),
  identity: makeUnsplashImage({
    fallbackSrc: "/project-gallery/mono-curve.jpg",
    id: "photo-AtzuwAG8qfY",
    position: "50% 46%",
  }),
  messaging: makeUnsplashImage({
    fallbackSrc: "/project-gallery/atlas-blueprint.jpg",
    id: "photo-nAC-dcdeINE",
    position: "50% 48%",
  }),
  naming: makeUnsplashImage({
    fallbackSrc: "/project-gallery/luma-gallery.jpg",
    id: "photo-4Yk9jteo7KQ",
    position: "50% 50%",
  }),
  positioning: makeUnsplashImage({
    fallbackSrc: "/project-gallery/global-brand-systems.jpg",
    id: "photo-OC767IXSmMs",
    position: "50% 48%",
  }),
  rollout: makeUnsplashImage({
    fallbackSrc: "/project-gallery/signal-25-launch.jpg",
    id: "photo-8jJ-Bw7c_d4",
    position: "50% 48%",
  }),
  strategy: makeUnsplashImage({
    fallbackSrc: "/project-gallery/apple-architecture.jpg",
    id: "photo-fQOyF0D0cDU",
    position: "50% 44%",
  }),
};
