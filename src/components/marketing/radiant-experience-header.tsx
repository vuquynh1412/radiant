"use client";

import Image from "next/image";
import {
  ArrowUpRightIcon,
  ChevronDownIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import { useLocale } from "next-intl";
import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

import { buttonVariants } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import type { RadiantExperienceContent } from "./radiant-experience.types";
import { radiantSocialLinks } from "./radiant-social-links";

type RadiantExperienceHeaderProps = {
  content: RadiantExperienceContent;
};

type MenuLink = {
  href: string;
  label: string;
};

type SocialLink = {
  href: string;
  icon: ReactNode;
  label: string;
};

const bookCallHref =
  "mailto:hello@radiant.studio?subject=Radiant%20strategy%20call";
const requestDeckHref =
  "mailto:hello@radiant.studio?subject=Radiant%20capability%20deck";
const menuPanelId = "radiant-header-menu-panel";
const servicesPanelId = "radiant-header-services-panel";
const menuTransitionDurationMs = 500;
const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(focusableSelector),
  ).filter((element) => element.getClientRects().length > 0);
}

function getLinkLabel(
  links: Array<{ href: string; label: string }>,
  href: string,
  fallback: string,
) {
  return links.find((link) => link.href === href)?.label ?? fallback;
}

function RadiantHeaderLogo({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 57 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M47.1651 3.34176C44.3416 0.806526 39.734 0 34.3759 0H28.5005V2.04117L28.7946 16.7098C28.8707 20.503 31.3809 23.6043 35.0098 23.7088C35.0098 23.7088 36.1649 23.7159 36.5504 23.7109C36.9124 23.7058 37.6457 23.6804 37.9997 23.6612C39.7634 23.5648 42.7776 23.1356 44.8111 21.7823C48.1946 19.5301 50.2139 15.393 50.2139 11.3522C50.2139 7.66454 49.1226 5.07148 47.1651 3.34176ZM36.4368 21.6291C34.6882 22.3403 33.2501 21.3572 33.2501 19.4692V2.1903C33.2501 1.80581 33.5645 1.49841 33.9489 1.49841C36.3647 1.50044 38.0057 2.47944 39.0991 4.09147C40.308 5.93583 40.7411 8.44266 40.7411 11.3238C40.7411 18.1646 38.5504 20.7688 36.4357 21.6291H36.4368Z"
        fill="currentColor"
      />
      <path
        d="M21.2986 0V0.0862324C21.475 0.0862324 22.7803 0.372321 23.4254 2.76349C23.6252 3.50408 23.754 4.44756 23.754 5.6467V13.1357C23.754 15.0714 23.7499 17.5965 23.7499 19.5321C23.7499 20.6024 23.2002 21.4739 22.5075 21.6748C21.3868 21.9984 19.9598 20.7911 19.1342 18.3137C17.6545 13.8733 16.337 10.1257 14.8045 5.7025C13.7102 2.36277 12.7883 0 7.66139 0H0V0.115653C0.460454 0.115653 3.29113 1.54812 5.55892 7.57831C6.19889 9.27962 8.18676 14.3582 8.18676 14.3582C8.18676 14.3582 9.20402 17.1197 10.1401 18.5359C11.2943 20.2829 12.2203 21.0904 13.8613 22.1354C14.7599 22.7075 16.7052 23.3964 18.0723 23.5252C19.0571 23.6175 20.0663 23.6967 22.0237 23.6967C25.4122 23.6967 28.1232 20.7232 28.2064 16.7098L28.5005 2.04117V0H21.2986Z"
        fill="currentColor"
      />
      <path
        d="M9.83487 44.6583C12.6584 47.1935 17.266 48 22.6241 48H28.4995V45.9589L28.2054 31.2902C28.1293 27.497 25.6191 24.3957 21.9903 24.2912C21.9903 24.2912 20.8351 24.2841 20.4497 24.2892C20.0876 24.2942 19.3543 24.3196 19.0003 24.3389C17.2366 24.4353 14.2224 24.8644 12.1889 26.2177C8.80544 28.4699 6.78613 32.607 6.78613 36.6478C6.78613 40.3355 7.87743 42.9286 9.83487 44.6583ZM20.5633 26.3709C22.3118 25.6598 23.7499 26.6428 23.7499 28.5308V45.8097C23.7499 46.1942 23.4355 46.5016 23.0511 46.5016C20.6353 46.4996 18.9943 45.5206 17.9009 43.9086C16.692 42.0642 16.2589 39.5574 16.2589 36.6762C16.2589 29.8354 18.4496 27.2312 20.5643 26.3709H20.5633Z"
        fill="currentColor"
      />
      <path
        d="M35.7015 48V47.9138C35.525 47.9138 34.2197 47.6277 33.5746 45.2365C33.3748 44.4959 33.246 43.5524 33.246 42.3533V34.8643C33.246 32.9286 33.2501 30.4035 33.2501 28.4679C33.2501 27.3976 33.7998 26.5261 34.4925 26.3252C35.6132 26.0016 37.0402 27.2089 37.8658 29.6863C39.3455 34.1267 40.663 37.8743 42.1955 42.2975C43.2898 45.6393 44.2117 48.002 49.3386 48.002H57V47.8864C56.5395 47.8864 53.7089 46.4539 51.4411 40.4237C50.8011 38.7224 48.8132 33.6438 48.8132 33.6438C48.8132 33.6438 47.796 30.8824 46.8599 29.4661C45.7057 27.7192 44.7797 26.9116 43.1387 25.8667C42.2401 25.2945 40.2948 24.6057 38.9277 24.4768C37.9429 24.3845 36.9337 24.3054 34.9763 24.3054C31.5878 24.3054 28.8768 27.2789 28.7936 31.2922L28.4995 45.9609V48.002H35.7004L35.7015 48Z"
        fill="currentColor"
      />
    </svg>
  );
}

function HeaderPrimaryLink({
  className,
  href,
  label,
  showChevron = false,
}: {
  className?: string;
  href: string;
  label: string;
  showChevron?: boolean;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center gap-2 text-[1.02rem] font-medium text-[#F7F2EB] transition-colors duration-200 hover:text-secondary",
        className,
      )}
    >
      <span>{label}</span>
      {showChevron ? (
        <ChevronDownIcon className="size-4.5 shrink-0 stroke-[1.9]" />
      ) : null}
    </a>
  );
}

function HeaderServicesDropdown({
  items,
  label,
}: {
  items: MenuLink[];
  label: string;
}) {
  return (
    <div className="group/services relative hidden self-stretch lg:flex lg:items-center">
      <button
        type="button"
        aria-haspopup="menu"
        className="inline-flex h-full items-center gap-2 text-[1.02rem] font-medium text-[#F7F2EB] transition-colors duration-200 hover:text-secondary focus-visible:outline-none focus-visible:text-secondary"
      >
        <span>{label}</span>
        <ChevronDownIcon className="size-4.5 shrink-0 stroke-[1.9] transition-transform duration-200 group-hover/services:rotate-180 group-focus-within/services:rotate-180" />
      </button>

      <div
        className={cn(
          "pointer-events-none absolute left-1/2 top-full z-60 w-max max-w-[calc(100vw-2rem)] -translate-x-[34%] translate-y-[4px] opacity-0 transition-all duration-220 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "group-hover/services:pointer-events-auto group-hover/services:opacity-100",
          "group-focus-within/services:pointer-events-auto group-focus-within/services:opacity-100",
        )}
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-1 h-1"
        />
        <div className="inline-block overflow-hidden rounded-[16px] bg-[#1C1107] shadow-[0_26px_56px_-30px_rgba(0,0,0,0.62)]">
          <div className="p-1">
            {items.map((item, index) => (
              <div key={item.label}>
                {index !== 0 ? (
                  <div className="px-4">
                    <div className="border-t border-secondary/10" />
                  </div>
                ) : null}
                <a
                  href={item.href}
                  role="menuitem"
                  className="block h-10 rounded-[99px] px-4 text-[1.02rem] leading-10 font-medium whitespace-nowrap text-[#F7F2EB] transition-[color,background-color] duration-200 hover:bg-white/4 hover:text-secondary focus-visible:outline-none focus-visible:bg-white/4 focus-visible:text-secondary"
                >
                  {item.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function RadiantExperienceHeader({
  content,
}: RadiantExperienceHeaderProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const nextLocale = locale === "vi" ? "en" : "vi";
  const nextLocaleFlag = nextLocale === "vi" ? "VN" : "EN";
  const nextLocaleFlagSrc =
    nextLocale === "vi" ? "/locale/vi.svg" : "/locale/en.svg";
  const [isAtTop, setIsAtTop] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuRendered, setIsMenuRendered] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);
  const isAtTopRef = useRef(true);
  const isVisibleRef = useRef(true);
  const menuCloseTimeoutRef = useRef<number | null>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const menuPortalRef = useRef<HTMLDivElement | null>(null);
  const menuDialogRef = useRef<HTMLDivElement | null>(null);
  const menuCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuToggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const isHydrated = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const canRenderMenuPortal = isHydrated && isMenuRendered;

  const studioLinks = content.footer.columns.studio.items;
  const aboutLink = {
    href: "#about",
    label: getLinkLabel(studioLinks, "#about", content.about.eyebrow),
  };
  const projectsLink = {
    href: "#projects",
    label: getLinkLabel(studioLinks, "#projects", content.projects.title),
  };
  const plansLink = {
    href: "#plans",
    label: getLinkLabel(studioLinks, "#plans", content.plans.title),
  };
  const contactLink = {
    href: "#contact",
    label: getLinkLabel(studioLinks, "#contact", content.cta.buttonLabel),
  };
  const newsLink = {
    href: "#news",
    label: getLinkLabel(
      studioLinks,
      "#news",
      locale === "vi" ? "Tin tức" : "News",
    ),
  };
  const aboutHeaderLabel = locale === "vi" ? "Về Radiant" : "About Radiant";
  const headerPrimaryLinks = [
    {
      href: "#about",
      label: aboutHeaderLabel,
    },
    {
      href: "#showcase",
      label: content.brand.navigation.services,
    },
    {
      href: "#projects",
      label: projectsLink.label,
    },
    {
      href: "#news",
      label: newsLink.label,
    },
  ] as const;
  const desktopServiceDropdownLinks: MenuLink[] =
    locale === "vi"
      ? [
          { href: "#showcase", label: "Total Branding" },
          { href: "#showcase", label: "Tư vấn thương hiệu" },
          { href: "#showcase", label: "Thiết kế thương hiệu" },
          { href: "#showcase", label: "Thiết kế nhận diện số" },
          { href: "#showcase", label: "Thiết kế Ấn phẩm Marketing" },
          { href: "#showcase", label: "Thiết kế bao bì nhãn mác" },
        ]
      : [
          { href: "#showcase", label: "Total Branding" },
          { href: "#showcase", label: "Brand Consulting" },
          { href: "#showcase", label: "Brand Design" },
          { href: "#showcase", label: "Digital Identity Design" },
          { href: "#showcase", label: "Marketing Collateral Design" },
          { href: "#showcase", label: "Packaging Design" },
        ];
  const mobileMenuLinks: MenuLink[] = [
    projectsLink,
    newsLink,
    plansLink,
    contactLink,
  ];
  const desktopMenuLinks: MenuLink[] = [
    aboutLink,
    projectsLink,
    newsLink,
    plansLink,
    contactLink,
  ];
  const serviceLinks = content.services.items.slice(0, 4).map((item) => ({
    eyebrow: item.eyebrow,
    href: "#showcase",
    label: item.title,
  }));
  const utilityLinks: MenuLink[] = [
    {
      href: requestDeckHref,
      label: content.common.actions.requestDeck,
    },
  ];
  const socialLinks: SocialLink[] = [
    {
      href: radiantSocialLinks.instagram,
      icon: <span className="text-base font-semibold uppercase">ig</span>,
      label: content.footer.socials.instagram,
    },
    {
      href: radiantSocialLinks.linkedin,
      icon: <span className="text-base font-semibold lowercase">in</span>,
      label: content.footer.socials.linkedin,
    },
  ].flatMap((item) => (item.href ? [{ ...item, href: item.href }] : []));

  useEffect(() => {
    let previousY = window.scrollY;
    let frame = 0;

    const commitIsAtTop = (nextIsAtTop: boolean) => {
      if (isAtTopRef.current === nextIsAtTop) {
        return;
      }

      isAtTopRef.current = nextIsAtTop;
      setIsAtTop(nextIsAtTop);
    };

    const commitIsVisible = (nextIsVisible: boolean) => {
      if (isVisibleRef.current === nextIsVisible) {
        return;
      }

      isVisibleRef.current = nextIsVisible;
      setIsVisible(nextIsVisible);
    };

    const syncHeaderState = () => {
      const currentY = window.scrollY;
      const delta = currentY - previousY;
      const nextIsAtTop = currentY <= 12;

      commitIsAtTop(nextIsAtTop);

      if (nextIsAtTop) {
        commitIsVisible(true);
        previousY = currentY;
        return;
      }

      if (Math.abs(delta) < 4) {
        previousY = currentY;
        return;
      }

      if (delta > 0 && currentY > 96) {
        commitIsVisible(false);
      } else if (delta < 0) {
        commitIsVisible(true);
      }

      previousY = currentY;
    };

    const handleScroll = () => {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        syncHeaderState();
      });
    };

    syncHeaderState();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const clearMenuCloseTimeout = () => {
    if (menuCloseTimeoutRef.current === null) {
      return;
    }

    window.clearTimeout(menuCloseTimeoutRef.current);
    menuCloseTimeoutRef.current = null;
  };

  const closeMenu = () => {
    clearMenuCloseTimeout();
    setIsMenuOpen(false);
    setIsServicesExpanded(false);
    menuCloseTimeoutRef.current = window.setTimeout(() => {
      setIsMenuRendered(false);
      menuCloseTimeoutRef.current = null;
    }, menuTransitionDurationMs);
  };

  const openMenu = () => {
    clearMenuCloseTimeout();
    lastFocusedElementRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setIsServicesExpanded(false);
    setIsMenuRendered(true);
    window.requestAnimationFrame(() => {
      setIsMenuOpen(true);
    });
  };

  const closeMenuFromEffect = useEffectEvent(() => {
    closeMenu();
  });

  useEffect(() => {
    if (!isMenuRendered) {
      return;
    }

    const portal = menuPortalRef.current;
    const dialog = menuDialogRef.current;

    if (!portal || !dialog) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const siblings = Array.from(document.body.children).filter(
      (element) => element !== portal,
    );
    const previousSiblingState = siblings.map((element) => {
      const htmlElement = element as HTMLElement;

      return {
        ariaHidden: element.getAttribute("aria-hidden"),
        element: htmlElement,
        inert: htmlElement.inert,
      };
    });

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    previousSiblingState.forEach(({ element }) => {
      element.inert = true;
      element.setAttribute("aria-hidden", "true");
    });
    const menuToggleButton = menuToggleButtonRef.current;

    const focusFrame = window.requestAnimationFrame(() => {
      const focusTarget =
        menuCloseButtonRef.current ?? getFocusableElements(dialog)[0] ?? dialog;
      focusTarget.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenuFromEffect();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = getFocusableElements(dialog);

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (!dialog.contains(activeElement)) {
        event.preventDefault();
        (event.shiftKey ? lastElement : firstElement).focus();
        return;
      }

      if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      } else if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousSiblingState.forEach(({ ariaHidden, element, inert }) => {
        element.inert = inert;

        if (ariaHidden === null) {
          element.removeAttribute("aria-hidden");
        } else {
          element.setAttribute("aria-hidden", ariaHidden);
        }
      });

      const focusTarget = lastFocusedElementRef.current ?? menuToggleButton;

      if (focusTarget?.isConnected) {
        focusTarget.focus();
      }
    };
  }, [isMenuRendered]);

  useEffect(
    () => () => {
      if (menuCloseTimeoutRef.current !== null) {
        window.clearTimeout(menuCloseTimeoutRef.current);
      }
    },
    [],
  );

  const handleMenuToggle = () => {
    if (isMenuRendered) {
      closeMenu();
      return;
    }

    openMenu();
  };

  const handleLocaleSwitch = () => {
    const hash = window.location.hash;

    closeMenu();
    router.replace(`${pathname}${hash}`, { locale: nextLocale });
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isVisible || isMenuRendered
            ? "translate-y-0"
            : "-translate-y-[calc(100%+1rem)]",
        )}
      >
        <div className="px-0 pt-0">
          <div
            className={cn(
              "mx-auto w-full bg-[#1C1107] text-[#F7F2EB] transition-all duration-300",
              "flex items-center justify-between gap-3 rounded-[16px] rounded-t-none px-4 py-2.5",
              "md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-5 md:rounded-[24px] md:rounded-t-none md:px-6 md:py-3",
              "lg:rounded-[40px] lg:rounded-t-none lg:px-10 lg:py-3",
              isAtTop
                ? "shadow-[0_20px_50px_-34px_rgba(0,0,0,0.55)]"
                : "shadow-[0_24px_58px_-32px_rgba(0,0,0,0.68)]",
            )}
          >
            <a
              href="#showcase"
              className="flex size-10 shrink-0 items-center justify-start text-secondary transition-opacity hover:opacity-85 md:hidden"
            >
              <RadiantHeaderLogo className="h-auto w-10" />
            </a>

            <div className="hidden min-w-0 items-center gap-7 md:flex lg:gap-10">
              <HeaderPrimaryLink
                href={headerPrimaryLinks[0].href}
                label={headerPrimaryLinks[0].label}
              />
              <HeaderServicesDropdown
                items={desktopServiceDropdownLinks}
                label={headerPrimaryLinks[1].label}
              />
              <HeaderPrimaryLink
                href={headerPrimaryLinks[1].href}
                label={headerPrimaryLinks[1].label}
                className="md:inline-flex lg:hidden"
              />
              <HeaderPrimaryLink
                href={headerPrimaryLinks[2].href}
                label={headerPrimaryLinks[2].label}
              />
              <HeaderPrimaryLink
                href={headerPrimaryLinks[3].href}
                label={headerPrimaryLinks[3].label}
                className="hidden lg:inline-flex"
              />
            </div>

            <a
              href="#showcase"
              className="hidden items-center justify-center text-secondary transition-opacity hover:opacity-85 md:flex"
            >
              <RadiantHeaderLogo className="h-10 w-auto" />
            </a>

            <div className="flex min-w-0 items-center justify-end gap-2 md:gap-3">
              <button
                type="button"
                onClick={handleLocaleSwitch}
                aria-label={`Switch language to ${nextLocaleFlag}`}
                className="inline-flex size-5 items-center justify-center overflow-hidden rounded-[4px] bg-transparent transition-transform duration-200 hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30"
              >
                <Image
                  src={nextLocaleFlagSrc}
                  alt=""
                  width={20}
                  height={20}
                  className="size-5 object-cover"
                />
              </button>

              <a
                href={contactLink.href}
                aria-label={contactLink.label}
                className={cn(
                  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-white/18 text-[#F7F2EB] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30",
                  "px-5 py-3 text-[1.02rem] font-medium",
                  "md:px-7 md:py-3.5 md:text-[1.05rem]",
                )}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 translate-y-full rounded-full bg-secondary transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover:translate-y-0"
                />
                <span className="relative z-10 whitespace-nowrap transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-[#1C1107]">
                  {contactLink.label}
                </span>
                <ArrowUpRightIcon className="relative z-10 size-4.5 shrink-0 stroke-[2.05] transition-[color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:text-[#1C1107]" />
              </a>

              <button
                type="button"
                ref={menuToggleButtonRef}
                onClick={handleMenuToggle}
                aria-controls={menuPanelId}
                aria-expanded={isMenuOpen}
                aria-label={content.brand.menu}
                className={cn(
                  "inline-flex items-center justify-center rounded-full border border-white/18 text-[#F7F2EB] transition-colors duration-200 hover:border-secondary/40 hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30 lg:hidden",
                  "size-12 md:size-[3.5rem]",
                  isMenuRendered && "border-secondary/50 text-secondary",
                )}
              >
                {isMenuRendered ? (
                  <XIcon className="size-5 stroke-[1.9]" />
                ) : (
                  <MenuIcon className="size-5 stroke-[1.9]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {canRenderMenuPortal
        ? createPortal(
            <div
              ref={menuPortalRef}
              className={cn(
                "fixed inset-0 z-60",
                isMenuRendered ? "pointer-events-auto" : "pointer-events-none",
              )}
              aria-hidden={!isMenuOpen}
            >
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu overlay"
                className={cn(
                  "absolute inset-0 bg-[#05060b]/50 backdrop-blur-sm transition-opacity duration-300",
                  isMenuOpen ? "opacity-100" : "opacity-0",
                )}
              />

              <div
                className={cn(
                  "absolute inset-0 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0",
                )}
              >
                <div
                  id={menuPanelId}
                  ref={menuDialogRef}
                  role="dialog"
                  aria-modal="true"
                  aria-label={`${content.brand.name} navigation`}
                  tabIndex={-1}
                  className="relative h-full overflow-y-auto bg-[#111218] text-[#f5f1eb]"
                >
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.06),transparent_22%),radial-gradient(circle_at_82%_24%,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_46%_72%,rgba(255,255,255,0.05),transparent_28%),linear-gradient(180deg,#14151d_0%,#101119_100%)]" />
                    <div className="absolute inset-0 surface-grain opacity-35" />
                  </div>

                  <div className="relative mx-auto flex min-h-full max-w-384 flex-col px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 lg:px-8">
                    <div className="flex items-start justify-between gap-4">
                      <a
                        href="#showcase"
                        onClick={closeMenu}
                        className="min-w-0 shrink-0 transition-opacity hover:opacity-85"
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="shrink-0 text-secondary">
                            <RadiantHeaderLogo className="block h-9 w-auto sm:h-12" />
                          </div>
                          <div className="min-w-0 leading-none text-white">
                            <p className="truncate font-heading text-[1.15rem] leading-none sm:text-[1.65rem]">
                              {content.brand.name}
                            </p>
                          </div>
                        </div>
                      </a>

                      <button
                        type="button"
                        ref={menuCloseButtonRef}
                        onClick={closeMenu}
                        aria-label="Close navigation menu"
                        className="flex size-10 items-center justify-center rounded-full bg-[#f1ece8] text-[#27272A] shadow-[0_18px_34px_-28px_rgba(0,0,0,0.7)] transition-transform hover:-translate-y-0.5 sm:size-14"
                      >
                        <XIcon className="size-4.5 sm:size-5" />
                      </button>
                    </div>

                    <div className="mt-12 flex flex-1 flex-col gap-10 lg:mt-16 lg:grid lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-16">
                      <div className="hidden lg:flex lg:flex-col lg:justify-between lg:pb-3">
                        <div className="max-w-[18rem]">
                          <p className="text-base font-medium text-white/42 uppercase">
                            {content.services.title}
                          </p>
                          <div className="mt-6 grid gap-3">
                            {serviceLinks.map((item) => (
                              <a
                                key={item.label}
                                href={item.href}
                                onClick={closeMenu}
                                className="rounded-[1.5rem] border border-white/8 bg-white/3 px-4 py-3 transition-colors hover:border-white/16 hover:bg-white/6"
                              >
                                <p className="text-base text-white/42 uppercase">
                                  {item.eyebrow}
                                </p>
                                <p className="mt-2 text-[1.05rem] leading-6 text-white/92">
                                  {item.label}
                                </p>
                              </a>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-8">
                          {socialLinks.length > 0 ? (
                            <div className="flex items-center gap-3">
                              {socialLinks.map((item) => (
                                <a
                                  key={item.label}
                                  href={item.href}
                                  aria-label={item.label}
                                  className="flex size-16 items-center justify-center rounded-full bg-white/8 text-white/88 transition-all hover:bg-white/12 hover:text-white"
                                >
                                  {item.icon}
                                </a>
                              ))}
                            </div>
                          ) : null}

                          <div className="flex items-center justify-between gap-8 border-t border-white/10 pt-5 text-base">
                            {utilityLinks.map((item) => (
                              <a
                                key={item.label}
                                href={item.href}
                                onClick={closeMenu}
                                className="font-medium text-white/84 underline underline-offset-4 transition-colors hover:text-white"
                              >
                                {item.label}
                              </a>
                            ))}
                          </div>

                          <button
                            type="button"
                            onClick={handleLocaleSwitch}
                            aria-label={`Switch language to ${nextLocaleFlag}`}
                            className={cn(
                              buttonVariants({
                                className:
                                  "min-w-12 border-white/14 bg-transparent px-0 text-xl text-white hover:bg-white/8",
                                size: "marketing",
                                variant: "outline",
                              }),
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className="flex items-center justify-center leading-none"
                            >
                              <Image
                                src={nextLocaleFlagSrc}
                                alt=""
                                width={20}
                                height={20}
                                className="size-5 rounded-full object-cover"
                              />
                            </span>
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col lg:justify-end">
                        <div className="mx-auto w-full max-w-[18rem] lg:mx-0 lg:ml-auto lg:max-w-152">
                          <nav className="space-y-1 lg:hidden">
                            <a
                              href={aboutLink.href}
                              onClick={closeMenu}
                              className="block font-heading text-[clamp(3.5rem,14vw,5rem)] leading-[0.84] text-white"
                            >
                              {aboutLink.label}
                            </a>

                            <button
                              type="button"
                              onClick={() =>
                                setIsServicesExpanded((previous) => !previous)
                              }
                              aria-controls={servicesPanelId}
                              aria-expanded={isServicesExpanded}
                              className="inline-flex w-full items-center gap-3 text-left font-heading text-[clamp(3.5rem,14vw,5rem)] leading-[0.84] text-white"
                            >
                              <span>{content.brand.navigation.services}</span>
                              <ChevronDownIcon
                                className={cn(
                                  "mt-1 size-5 shrink-0 transition-transform duration-300",
                                  isServicesExpanded && "rotate-180",
                                )}
                              />
                            </button>

                            <div
                              id={servicesPanelId}
                              className={cn(
                                "overflow-hidden pl-1 transition-all duration-300",
                                isServicesExpanded
                                  ? "mt-4 max-h-52 opacity-100"
                                  : "max-h-0 opacity-0",
                              )}
                            >
                              <div className="grid gap-2 pb-3">
                                {serviceLinks.map((item) => (
                                  <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={closeMenu}
                                    className="rounded-[1.15rem] border border-white/10 px-3 py-2.5"
                                  >
                                    <p className="text-base text-white/42 uppercase">
                                      {item.eyebrow}
                                    </p>
                                    <p className="mt-1.5 text-base leading-6 text-white/84">
                                      {item.label}
                                    </p>
                                  </a>
                                ))}
                              </div>
                            </div>

                            {mobileMenuLinks.map((item) => (
                              <a
                                key={item.label}
                                href={item.href}
                                onClick={closeMenu}
                                className="block font-heading text-[clamp(3.5rem,14vw,5rem)] leading-[0.84] text-white"
                              >
                                {item.label}
                              </a>
                            ))}
                          </nav>

                          <div className="hidden lg:block">
                            <nav className="space-y-1 text-right">
                              {desktopMenuLinks.map((item) => (
                                <a
                                  key={item.label}
                                  href={item.href}
                                  onClick={closeMenu}
                                  className="block font-heading text-[clamp(4.5rem,7vw,6.7rem)] leading-[0.84] text-white"
                                >
                                  {item.label}
                                </a>
                              ))}
                            </nav>
                          </div>

                          <a
                            href={bookCallHref}
                            onClick={closeMenu}
                            className="mt-8 inline-flex h-12 w-full max-w-67 items-center justify-center gap-2 rounded-full bg-[#f1ece8] px-5 text-center text-base font-medium text-[#27272A] shadow-[0_24px_56px_-36px_rgba(0,0,0,0.8)] transition-transform hover:-translate-y-0.5 lg:mt-10"
                          >
                            <span>{content.common.actions.bookCall}</span>
                            <ArrowUpRightIcon className="size-4.5" />
                          </a>
                        </div>

                        <div className="mt-auto pt-12 lg:hidden">
                          <div className="flex items-center justify-between gap-4 text-base">
                            {utilityLinks.map((item, index) => (
                              <a
                                key={item.label}
                                href={item.href}
                                onClick={closeMenu}
                                className={cn(
                                  "font-medium text-white/86 underline underline-offset-4 transition-colors hover:text-white",
                                  index === 0 ? "text-left" : "text-right",
                                )}
                              >
                                {item.label}
                              </a>
                            ))}
                          </div>

                          {socialLinks.length > 0 ? (
                            <div className="mt-8 flex items-center justify-center gap-3">
                              {socialLinks.map((item) => (
                                <a
                                  key={item.label}
                                  href={item.href}
                                  aria-label={item.label}
                                  className="flex size-16 items-center justify-center rounded-full bg-white/8 text-white/88 transition-all hover:bg-white/12 hover:text-white"
                                >
                                  {item.icon}
                                </a>
                              ))}
                            </div>
                          ) : null}

                          <div className="mt-8 flex justify-center">
                            <button
                              type="button"
                              onClick={handleLocaleSwitch}
                              aria-label={`Switch language to ${nextLocaleFlag}`}
                              className={cn(
                                buttonVariants({
                                  className:
                                    "min-w-12 border-white/14 bg-transparent px-0 text-xl text-white hover:bg-white/8",
                                  size: "marketing",
                                  variant: "outline",
                                }),
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className="flex items-center justify-center leading-none"
                              >
                                <Image
                                  src={nextLocaleFlagSrc}
                                  alt=""
                                  width={20}
                                  height={20}
                                  className="size-5 rounded-full object-cover"
                                />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
