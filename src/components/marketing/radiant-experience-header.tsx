"use client";

import {
  ArrowUpRightIcon,
  ChevronDownIcon,
  LanguagesIcon,
  MailIcon,
  MenuIcon,
  PhoneCallIcon,
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
import { RadiantBrandLogo } from "./radiant-experience-shared";
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

export function RadiantExperienceHeader({
  content,
}: RadiantExperienceHeaderProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const nextLocale = locale === "vi" ? "en" : "vi";
  const [isAtTop, setIsAtTop] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuRendered, setIsMenuRendered] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);
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
  const phoneHref = `tel:${content.footer.contact.phone.replace(/\s+/g, "")}`;
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
  const mobileMenuLinks: MenuLink[] = [
    projectsLink,
    plansLink,
    contactLink,
  ];
  const desktopMenuLinks: MenuLink[] = [
    aboutLink,
    projectsLink,
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
      icon: <span className="text-[0.82rem] font-semibold uppercase">ig</span>,
      label: content.footer.socials.instagram,
    },
    {
      href: radiantSocialLinks.linkedin,
      icon: <span className="text-[0.88rem] font-semibold lowercase">in</span>,
      label: content.footer.socials.linkedin,
    },
  ].flatMap((item) =>
    item.href ? [{ ...item, href: item.href }] : [],
  );

  useEffect(() => {
    let previousY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - previousY;
      const nextIsAtTop = currentY <= 12;

      setIsAtTop(nextIsAtTop);

      if (nextIsAtTop) {
        setIsVisible(true);
        previousY = currentY;
        return;
      }

      if (Math.abs(delta) < 4) {
        previousY = currentY;
        return;
      }

      if (delta > 0 && currentY > 96) {
        setIsVisible(false);
      } else if (delta < 0) {
        setIsVisible(true);
      }

      previousY = currentY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
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

      const focusTarget =
        lastFocusedElementRef.current ?? menuToggleButton;

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
        <div className="px-3 pt-3 sm:px-4 sm:pt-4">
          <div
            className={cn(
              "mx-auto flex max-w-[min(100%,96rem)] items-center justify-between gap-3 rounded-[2rem] border px-4 py-3.5 transition-all duration-300 sm:px-5",
              isAtTop
                ? "border-white/55 bg-[#f8f4ee]/82 text-[#1e1b1a] shadow-[0_18px_44px_-34px_rgba(15,11,9,0.26)] backdrop-blur-md"
                : "border-[#ddd4cb]/80 bg-[#fffaf6] text-[#1e1b1a] shadow-[0_22px_54px_-36px_rgba(15,11,9,0.28)]",
            )}
          >
            <a
              href="#showcase"
              className="min-w-0 shrink-0 transition-opacity hover:opacity-85"
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="text-primary">
                  <RadiantBrandLogo className="h-8 w-auto sm:h-9" />
                </div>
                <div className="min-w-0 leading-[0.92]">
                  <p className="truncate text-[1.02rem] font-medium tracking-[-0.04em] sm:text-[1.08rem]">
                    {content.brand.name}
                  </p>
                  <p className="max-w-[11rem] truncate text-[0.68rem] text-current/58 sm:text-[0.72rem]">
                    {content.brand.descriptor}
                  </p>
                </div>
              </div>
            </a>

            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <a
                href={phoneHref}
                className="flex size-14 items-center justify-center rounded-full bg-[#ece7e2] text-[#16161d] shadow-[0_16px_34px_-28px_rgba(17,15,14,0.5)] transition-transform hover:-translate-y-0.5 md:hidden"
                aria-label={content.footer.contact.phone}
              >
                <PhoneCallIcon className="size-5 stroke-[2.15]" />
              </a>

              <a
                href="mailto:hello@radiant.studio"
                className="hidden min-w-0 items-center gap-2 rounded-full px-3.5 py-2.5 text-right transition-colors hover:bg-muted/55 xl:flex"
              >
                <MailIcon className="size-3.5 shrink-0 text-current/55" />
                <div className="min-w-0 leading-tight">
                  <p className="truncate text-[0.7rem] tracking-[0.08em] text-current/52 uppercase">
                    {content.brand.advisoryLabel}
                  </p>
                  <p className="truncate text-sm font-medium text-current">
                    {content.brand.advisoryValue}
                  </p>
                </div>
              </a>

              <button
                type="button"
                onClick={handleLocaleSwitch}
                className={cn(
                  buttonVariants({
                    className:
                      "hidden h-11 rounded-full border-[#d5ccc2] bg-white/92 px-4 text-[#1e1b1a] hover:bg-white md:inline-flex",
                    size: "sm",
                    variant: "outline",
                  }),
                )}
              >
                <LanguagesIcon data-icon="inline-start" />
                {nextLocale.toUpperCase()}
              </button>

              <a
                className={cn(
                  buttonVariants({
                    className:
                      "hidden h-11 rounded-full bg-[#17171d] px-4 text-[#f7f2eb] hover:bg-[#17171d]/92 md:inline-flex lg:px-5",
                    size: "sm",
                  }),
                )}
                href={bookCallHref}
                aria-label={content.common.actions.bookCall}
              >
                <span className="hidden lg:inline">
                  {content.common.actions.bookCall}
                </span>
                <ArrowUpRightIcon data-icon="inline-end" />
              </a>

              <button
                type="button"
                ref={menuToggleButtonRef}
                onClick={handleMenuToggle}
                aria-controls={menuPanelId}
                aria-expanded={isMenuOpen}
                aria-label={content.brand.menu}
                className={cn(
                  "flex size-14 items-center justify-center rounded-full bg-[#17171d] text-white shadow-[0_18px_36px_-28px_rgba(17,15,14,0.6)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17171d]/25 hover:-translate-y-0.5 md:h-11 md:w-auto md:min-w-[7rem] md:gap-2 md:px-4",
                  isMenuRendered && "bg-[#111218]",
                )}
              >
                <span className="hidden text-sm font-medium tracking-[-0.02em] md:inline">
                  {content.brand.menu}
                </span>
                {isMenuRendered ? (
                  <XIcon className="size-5" />
                ) : (
                  <MenuIcon className="size-5" />
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
                "fixed inset-0 z-[60]",
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

                <div className="relative mx-auto flex min-h-full max-w-[96rem] flex-col px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 lg:px-8">
                  <div className="flex items-start justify-between gap-4">
                    <a
                      href="#showcase"
                      onClick={closeMenu}
                      className="min-w-0 shrink-0 transition-opacity hover:opacity-85"
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="text-primary">
                          <RadiantBrandLogo className="h-7 w-auto sm:h-8" />
                        </div>
                        <div className="min-w-0 leading-[0.92] text-white">
                          <p className="truncate text-[1.02rem] font-medium tracking-[-0.04em] sm:text-[1.08rem]">
                            {content.brand.name}
                          </p>
                          <p className="max-w-[11rem] truncate text-[0.7rem] text-white/62 sm:text-[0.72rem]">
                            {content.brand.descriptor}
                          </p>
                        </div>
                      </div>
                    </a>

                    <button
                      type="button"
                      ref={menuCloseButtonRef}
                      onClick={closeMenu}
                      aria-label="Close navigation menu"
                      className="flex size-14 items-center justify-center rounded-full bg-[#f1ece8] text-[#15161d] shadow-[0_18px_34px_-28px_rgba(0,0,0,0.7)] transition-transform hover:-translate-y-0.5"
                    >
                      <XIcon className="size-5" />
                    </button>
                  </div>

                <div className="mt-12 flex flex-1 flex-col gap-10 lg:mt-16 lg:grid lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-16">
                  <div className="hidden lg:flex lg:flex-col lg:justify-between lg:pb-3">
                    <div className="max-w-[18rem]">
                      <p className="text-[0.72rem] font-medium tracking-[0.24em] text-white/42 uppercase">
                        {content.services.title}
                      </p>
                      <div className="mt-6 grid gap-3">
                        {serviceLinks.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            onClick={closeMenu}
                            className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] px-4 py-3 transition-colors hover:border-white/16 hover:bg-white/[0.06]"
                          >
                            <p className="text-[0.68rem] tracking-[0.2em] text-white/42 uppercase">
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

                        <div className="flex items-center justify-between gap-8 border-t border-white/10 pt-5 text-sm">
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
                          className={cn(
                            buttonVariants({
                              className:
                                "h-11 rounded-full border-white/14 bg-transparent px-4 text-white hover:bg-white/8",
                              size: "sm",
                              variant: "outline",
                            }),
                          )}
                        >
                          <LanguagesIcon data-icon="inline-start" />
                          {nextLocale.toUpperCase()}
                        </button>
                      </div>
                    </div>

                  <div className="flex flex-1 flex-col lg:justify-end">
                    <div className="mx-auto w-full max-w-[18rem] lg:mx-0 lg:ml-auto lg:max-w-[38rem]">
                      <nav className="space-y-1 lg:hidden">
                        <a
                          href={aboutLink.href}
                          onClick={closeMenu}
                          className="block font-heading text-[clamp(3.5rem,14vw,5rem)] leading-[0.84] tracking-[-0.075em] text-white"
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
                          className="inline-flex w-full items-center gap-3 text-left font-heading text-[clamp(3.5rem,14vw,5rem)] leading-[0.84] tracking-[-0.075em] text-white"
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
                                <p className="text-[0.64rem] tracking-[0.18em] text-white/42 uppercase">
                                  {item.eyebrow}
                                </p>
                                <p className="mt-1.5 text-[0.94rem] leading-5 text-white/84">
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
                            className="block font-heading text-[clamp(3.5rem,14vw,5rem)] leading-[0.84] tracking-[-0.075em] text-white"
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
                              className="block font-heading text-[clamp(4.5rem,7vw,6.7rem)] leading-[0.84] tracking-[-0.085em] text-white"
                            >
                              {item.label}
                            </a>
                          ))}
                        </nav>
                      </div>

                      <a
                        href={bookCallHref}
                        onClick={closeMenu}
                        className="mt-8 inline-flex w-full max-w-[16.75rem] items-center justify-between gap-4 rounded-full bg-[#f1ece8] px-6 py-4 text-[1rem] font-semibold tracking-[-0.02em] text-[#1b1c22] shadow-[0_24px_56px_-36px_rgba(0,0,0,0.8)] transition-transform hover:-translate-y-0.5 lg:mt-10"
                      >
                        <span>{content.common.actions.bookCall}</span>
                        <ArrowUpRightIcon className="size-4.5" />
                      </a>
                    </div>

                    <div className="mt-auto pt-12 lg:hidden">
                      <div className="flex items-center justify-between gap-4 text-[0.95rem]">
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
                          className={cn(
                            buttonVariants({
                              className:
                                "h-11 rounded-full border-white/14 bg-transparent px-4 text-white hover:bg-white/8",
                              size: "sm",
                              variant: "outline",
                            }),
                          )}
                        >
                          <LanguagesIcon data-icon="inline-start" />
                          {nextLocale.toUpperCase()}
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
