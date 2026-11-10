"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FocusEvent, type MouseEvent, type PointerEvent } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { memberActions, nav, type NavItem, type NavLink } from "@/lib/site";
import logo from "./ui/images/WACHH-Banner-Logo2022.png";

// Site header. Desktop (1024px and up): logo on the left; the sections, Become a Member, and Donate together on the right.
// Sections with pages open a small one-column dropdown of evenly spaced links, centred under the link, on hover or click.
// Below 1024px the menu drops down under the bar and each section expands in place.
// Links come from `nav` in lib/site.ts, which the footer shares.

// Same bar width as the rest of the site's header: 1280px, with 32px gutters (20px on phones).
const pageWidth = "mx-auto w-[min(1280px,calc(100%-40px))] sm:w-[min(1280px,calc(100%-64px))]";
const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal";
// Colours ease gently on hover; the press scales down on the strong ease-out so it answers at once.
const pressable = "[transition:background-color_150ms_var(--ease-color),color_150ms_var(--ease-color),scale_150ms_var(--ease-out-strong)] active:scale-[0.97]";
// Only text and fill colours ease; the focus ring appears at once.
const hoverColor = "transition-[color,background-color] duration-150 ease-color";
// Become a Member is the one gold, solid action (navy on gold is 4.6:1, lighter on hover); Donate is a quiet stone fill.
const primaryButton = `shrink-0 items-center bg-gold px-3.5 text-[15px] xl:px-5 font-bold whitespace-nowrap text-primary hover:bg-header-gold ${pressable} ${focusRing}`;
const secondaryButton = `shrink-0 items-center bg-muted px-3 text-[15px] xl:px-4 font-semibold whitespace-nowrap text-primary hover:bg-line ${pressable} ${focusRing}`;

// Panels fade and settle 4px into place. Visibility flips after the fade so a closing panel can't be clicked.
const panelOpen = "visible translate-y-0 scale-100 opacity-100";
// Opening takes 160ms; closing is quicker at 120ms, on the same curve.
const panelClosed = "invisible -translate-y-1 scale-[0.97] opacity-0";
const panelOpenTransition = "[transition:opacity_160ms_var(--ease-out-strong),translate_160ms_var(--ease-out-strong),scale_160ms_var(--ease-out-strong),visibility_0s]";
const panelCloseTransition = "[transition:opacity_120ms_var(--ease-out-strong),translate_120ms_var(--ease-out-strong),scale_120ms_var(--ease-out-strong),visibility_0s_linear_120ms]";

// The small-screen menu settles 8px into place in 200ms and leaves in 150ms.
const mobileMenuOpen = "visible translate-y-0 opacity-100";
const mobileMenuClosed = "invisible -translate-y-2 opacity-0";
const mobileMenuOpenTransition = "[transition:opacity_200ms_var(--ease-out-strong),translate_200ms_var(--ease-out-strong),visibility_0s]";
const mobileMenuCloseTransition = "[transition:opacity_150ms_var(--ease-out-strong),translate_150ms_var(--ease-out-strong),visibility_0s_linear_150ms]";
/** Transition classes for a small-screen section: opens in 240ms, folds away in 180ms; with reduced motion the height snaps but still fades. */
const accordionMotion = (isOpen: boolean) =>
    `transition-[grid-template-rows,opacity] ease-out-strong motion-reduce:transition-opacity ${isOpen ? "duration-240" : "duration-180"}`;

/** Whether a link leaves this site. */
const isExternal = (href: string) => href.startsWith("http");
/** The page part of a link, without any `#section` anchor. */
const pathOf = (href: string) => href.split("#")[0];

/** Renders a nav link: a plain `<a>` for other sites, a Next.js `Link` (marked as the current page when it is) for pages on this site. */
function NavAnchor({ link, className, onClick, isCurrent }: { link: NavLink; className?: string; onClick?: () => void; isCurrent?: boolean }) {
    if (isExternal(link.href)) return <a className={className} href={link.href} onClick={onClick}>{link.label}</a>;
    return <Link className={className} href={link.href} onClick={onClick} aria-current={isCurrent ? "page" : undefined}>{link.label}</Link>;
}

/** The site header: logo, section dropdowns, Become a Member, and Donate, collapsing to a drop-down accordion menu under 1024px. */
export default function Header() {
    const pathname = usePathname();
    const [openMenuLabel, setOpenMenuLabel] = useState<string | null>(null);
    // True when the panel should appear without a fade: switching between menus, or opening from the keyboard.
    const [isInstant, setIsInstant] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // True when the small-screen menu and its sections should change without motion (keyboard use).
    const [isMobileInstant, setIsMobileInstant] = useState(false);
    const [openAccordionLabel, setOpenAccordionLabel] = useState<string | null>(null);
    const closeTimer = useRef<number | undefined>(undefined);
    const openTimer = useRef<number | undefined>(undefined);
    const wasOpenedByHover = useRef(false);
    // Whether the last input was a key press, so closes caused by the keyboard skip the fade too.
    const isUsingKeyboard = useRef(false);
    const headerRef = useRef<HTMLElement>(null);
    const mobileToggleRef = useRef<HTMLButtonElement>(null);
    const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

    // Close everything when the page changes (React's pattern for resetting state on a prop change).
    const [previousPathname, setPreviousPathname] = useState(pathname);
    if (pathname !== previousPathname) {
        setPreviousPathname(pathname);
        setOpenMenuLabel(null);
        setIsMobileMenuOpen(false);
        // An animated close collapses the sections once the menu has faded (see onTransitionEnd below).
        if (isMobileInstant) setOpenAccordionLabel(null);
    }

    /** Opens a section's dropdown; switching from another open menu, or `skipFade`, shows it without the fade. */
    const openMenu = (menuLabel: string, skipFade: boolean) => {
        window.clearTimeout(closeTimer.current);
        window.clearTimeout(openTimer.current);
        setIsInstant(skipFade || (openMenuLabel !== null && openMenuLabel !== menuLabel));
        setOpenMenuLabel(menuLabel);
    };
    /** Closes any open dropdown, cancelling pending opens and closes. */
    const closeMenu = (skipFade = false) => {
        window.clearTimeout(closeTimer.current);
        window.clearTimeout(openTimer.current);
        setIsInstant(skipFade);
        setOpenMenuLabel(null);
    };
    /**
     * Closes the small-screen menu. Open sections stay as they are while it fades, so nothing collapses inside
     * a moving panel; they fold away once it is hidden (or at once when `skipMotion` is true).
     */
    const closeMobileMenu = (skipMotion: boolean) => {
        setIsMobileInstant(skipMotion);
        setIsMobileMenuOpen(false);
        if (skipMotion) setOpenAccordionLabel(null);
    };
    /** Closes the dropdown after 150ms, so the pointer can cross from the link into its panel. */
    const closeMenuSoon = () => {
        window.clearTimeout(closeTimer.current);
        window.clearTimeout(openTimer.current);
        closeTimer.current = window.setTimeout(() => closeMenu(), 150);
    };

    /** Opens a section's dropdown when a mouse pointer reaches its link (touch is handled by click). */
    const handleTriggerPointerEnter = (pointerEvent: PointerEvent, menuLabel: string) => {
        if (pointerEvent.pointerType !== "mouse") return;
        wasOpenedByHover.current = true;
        // Once a menu is open, moving to another swaps right away. The first open waits 80ms
        // so sweeping the pointer across the bar on the way to Donate doesn't flash every menu.
        if (openMenuLabel !== null) return openMenu(menuLabel, false);
        window.clearTimeout(openTimer.current);
        openTimer.current = window.setTimeout(() => openMenu(menuLabel, false), 80);
    };
    /** Closes the dropdown when keyboard focus moves outside its section, such as tabbing past the last link. */
    const closeMenuWhenFocusLeaves = (focusEvent: FocusEvent<HTMLLIElement>) => {
        if (!focusEvent.currentTarget.contains(focusEvent.relatedTarget as Node)) closeMenu(isUsingKeyboard.current);
    };
    /** Toggles a section's dropdown on click or Enter; a click right after hovering keeps it open. */
    const handleTriggerClick = (clickEvent: MouseEvent, menuLabel: string) => {
        const isOpenedFromKeyboard = clickEvent.detail === 0;
        // A click right after hovering keeps the menu open instead of closing it.
        if (openMenuLabel === menuLabel && !wasOpenedByHover.current) return closeMenu(isOpenedFromKeyboard);
        wasOpenedByHover.current = false;
        openMenu(menuLabel, isOpenedFromKeyboard);
    };

    useEffect(() => {
        /** Escape closes whichever menu is open and returns focus to the button that opened it. */
        const handleKeyDown = (keyboardEvent: KeyboardEvent) => {
            isUsingKeyboard.current = true;
            if (keyboardEvent.key !== "Escape") return;
            if (openMenuLabel) {
                triggerRefs.current[openMenuLabel]?.focus();
                closeMenu(true);
            }
            if (isMobileMenuOpen) {
                closeMobileMenu(true);
                mobileToggleRef.current?.focus();
            }
        };
        /** A click or tap outside the header closes any open menu. */
        const handlePointerDown = (pointerEvent: globalThis.PointerEvent) => {
            isUsingKeyboard.current = false;
            if (headerRef.current?.contains(pointerEvent.target as Node)) return;
            closeMenu();
            if (isMobileMenuOpen) closeMobileMenu(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("pointerdown", handlePointerDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("pointerdown", handlePointerDown);
        };
    }, [openMenuLabel, isMobileMenuOpen]);

    /** Whether a link points at the page being viewed. */
    const isCurrentLink = (href: string) => !isExternal(href) && pathname === pathOf(href);
    /** Whether the page being viewed belongs to a top-level section; links to an anchor (Events) never count. */
    const isCurrentSection = (navItem: NavItem) =>
        !navItem.href.includes("#") && (pathname === pathOf(navItem.href) || pathname.startsWith(`${pathOf(navItem.href)}/`) || (navItem.children ?? []).some((child) => isCurrentLink(child.href)));

    /** Classes for a top-level link or button; its gold underline grows from the left, or fades in place with reduced motion. */
    const topLinkClass = (isHighlighted: boolean) =>
        `relative flex h-full cursor-pointer items-center gap-1 text-[15px] font-semibold whitespace-nowrap text-primary ${hoverColor} hover:text-teal ${focusRing} ` +
        `after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:origin-left after:bg-gold after:transition-[scale,opacity] motion-reduce:after:scale-x-100 ` +
        (isInstant ? "after:transition-none " : `after:ease-out-strong ${isHighlighted ? "after:duration-160" : "after:duration-120"} `) +
        (isHighlighted ? "after:scale-x-100" : "after:scale-x-0 motion-reduce:after:opacity-0");
    /** Classes for a link inside a desktop dropdown; the current page is shown in teal. */
    const panelLinkClass = (isCurrent: boolean) =>
        `-mx-3 block px-3 py-[7px] text-[15px] leading-snug font-medium whitespace-nowrap ${hoverColor} hover:bg-muted ${focusRing} ${isCurrent ? "text-teal" : "text-primary hover:text-teal"}`;

    return (
        <header ref={headerRef} className="relative z-50 border-b border-line bg-white">
            {/* Logo at the left edge; the sections and the two buttons sit together on the right, evenly spaced. */}
            <div className={`${pageWidth} flex h-[82px] items-center justify-between gap-6 lg:h-[104px]`}>
                <Link href="/" aria-label="World Affairs Council of Hilton Head home" className={`shrink-0 ${focusRing}`}>
                    <Image src={logo} alt="" priority className="h-auto w-[176px] min-[400px]:w-[240px] lg:w-[176px] xl:w-80" />
                </Link>

                <div className="flex h-full items-center gap-5 xl:gap-7">
                <nav aria-label="Main" className="hidden h-full lg:block" onPointerLeave={(pointerEvent) => pointerEvent.pointerType === "mouse" && closeMenuSoon()}>
                    <ul className="flex h-full items-center gap-5 xl:gap-7">
                        {nav.map((navItem) => {
                            const isMenuOpen = openMenuLabel === navItem.label;
                            const isHighlighted = openMenuLabel ? false : isCurrentSection(navItem);
                            if (!navItem.children) {
                                return (
                                    <li key={navItem.label} className="h-full" onPointerEnter={() => closeMenuSoon()}>
                                        <Link href={navItem.href} className={topLinkClass(isHighlighted)}>{navItem.label}</Link>
                                    </li>
                                );
                            }
                            const panelId = `nav-panel-${navItem.label.toLowerCase().replace(/\s+/g, "-")}`;
                            return (
                                <li
                                    key={navItem.label}
                                    className="relative h-full"
                                    onPointerEnter={(pointerEvent) => handleTriggerPointerEnter(pointerEvent, navItem.label)}
                                    onBlur={closeMenuWhenFocusLeaves}
                                >
                                    <button
                                        type="button"
                                        ref={(buttonElement) => { triggerRefs.current[navItem.label] = buttonElement; }}
                                        className={topLinkClass(isHighlighted)}
                                        aria-expanded={isMenuOpen}
                                        aria-controls={panelId}
                                        onClick={(clickEvent) => handleTriggerClick(clickEvent, navItem.label)}
                                    >
                                        {navItem.label}
                                        <ChevronDown size={17} strokeWidth={2.75} aria-hidden="true" className="-mr-0.5 text-teal" />
                                    </button>
                                    {/* Centred under its link, with a gold edge across its whole top. It covers the bar's bottom line, so it reads as part of the bar. */}
                                    <div
                                        id={panelId}
                                        inert={!isMenuOpen}
                                        className={`absolute top-full left-1/2 w-max min-w-[220px] -translate-x-1/2 origin-top border-t-[3px] border-gold bg-white px-6 py-4 shadow-[0_18px_36px_-14px_rgba(27,42,65,0.28)] motion-reduce:translate-y-0 motion-reduce:scale-100 ${isMenuOpen ? panelOpen : panelClosed} ${isInstant ? "" : isMenuOpen ? panelOpenTransition : panelCloseTransition}`}
                                    >
                                        <ul>
                                            {navItem.children.map((childLink) => (
                                                <li key={childLink.href}>
                                                    <Link href={childLink.href} className={panelLinkClass(isCurrentLink(childLink.href))} aria-current={isCurrentLink(childLink.href) ? "page" : undefined} onClick={() => closeMenu()}>
                                                        {childLink.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="flex shrink-0 items-center gap-3" onPointerEnter={() => closeMenuSoon()}>
                    <NavAnchor link={memberActions.donate} className={`hidden h-10 lg:inline-flex ${secondaryButton}`} />
                    <NavAnchor link={memberActions.becomeMember} className={`hidden h-10 lg:inline-flex ${primaryButton}`} />
                    <button
                        type="button"
                        ref={mobileToggleRef}
                        className={`-mr-2 grid size-11 cursor-pointer place-items-center text-primary transition-[scale] duration-150 ease-out-strong active:scale-[0.97] lg:hidden ${focusRing}`}
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                        onClick={(clickEvent) => {
                            const isFromKeyboard = clickEvent.detail === 0;
                            if (isMobileMenuOpen) return closeMobileMenu(isFromKeyboard);
                            setIsMobileInstant(isFromKeyboard);
                            setIsMobileMenuOpen(true);
                        }}
                    >
                        {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
                    </button>
                </div>
                </div>
            </div>

            {/* Small screens: the menu drops down under the bar; each section expands in place. */}
            <div
                id="mobile-menu"
                inert={!isMobileMenuOpen}
                className={`absolute inset-x-0 top-full border-t-[3px] border-gold max-h-[calc(100svh-82px)] overflow-y-auto bg-white shadow-[0_18px_36px_-14px_rgba(27,42,65,0.28)] lg:hidden motion-reduce:translate-y-0 ${isMobileMenuOpen ? mobileMenuOpen : mobileMenuClosed} ${isMobileInstant ? "" : isMobileMenuOpen ? mobileMenuOpenTransition : mobileMenuCloseTransition}`}
                onTransitionEnd={(transitionEvent) => {
                    // Once the menu has faded out, fold its sections away so it reopens collapsed.
                    if (transitionEvent.target === transitionEvent.currentTarget && transitionEvent.propertyName === "opacity" && !isMobileMenuOpen) setOpenAccordionLabel(null);
                }}
            >
                <nav aria-label="Mobile" className={`${pageWidth} pt-1 pb-6`}>
                    <ul>
                        {nav.map((navItem) => {
                            if (!navItem.children) {
                                return (
                                    <li key={navItem.label} className="border-b border-line">
                                        <Link href={navItem.href} onClick={() => closeMobileMenu(false)} className={`flex min-h-14 items-center text-[17px] font-semibold text-primary ${focusRing}`}>{navItem.label}</Link>
                                    </li>
                                );
                            }
                            const isAccordionOpen = openAccordionLabel === navItem.label;
                            const accordionId = `mobile-section-${navItem.label.toLowerCase().replace(/\s+/g, "-")}`;
                            return (
                                <li key={navItem.label} className="border-b border-line">
                                    <button
                                        type="button"
                                        className={`flex min-h-14 w-full cursor-pointer items-center justify-between text-left text-[17px] font-semibold ${isAccordionOpen ? "text-teal" : "text-primary"} ${focusRing}`}
                                        aria-expanded={isAccordionOpen}
                                        aria-controls={accordionId}
                                        onClick={(clickEvent) => {
                                            setIsMobileInstant(clickEvent.detail === 0);
                                            setOpenAccordionLabel(isAccordionOpen ? null : navItem.label);
                                        }}
                                    >
                                        {navItem.label}
                                        <ChevronDown size={20} aria-hidden="true" className="text-teal" />
                                    </button>
                                    {/* Animating grid rows from 0fr to 1fr opens the section to its natural height. */}
                                    <div
                                        id={accordionId}
                                        inert={!isAccordionOpen}
                                        className={`grid ${isMobileInstant ? "" : accordionMotion(isAccordionOpen)} ${isAccordionOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="pb-4 pl-4">
                                                <ul>
                                                    {navItem.children.map((childLink) => (
                                                        <li key={childLink.href}>
                                                            <NavAnchor
                                                                link={childLink}
                                                                onClick={() => closeMobileMenu(false)}
                                                                isCurrent={isCurrentLink(childLink.href)}
                                                                className={`flex min-h-11 items-center text-base font-medium ${isCurrentLink(childLink.href) ? "text-teal" : "text-primary"} focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-teal`}
                                                            />
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <NavAnchor link={memberActions.becomeMember} onClick={() => closeMobileMenu(false)} className={`flex h-11 justify-center ${primaryButton}`} />
                        <NavAnchor link={memberActions.donate} onClick={() => closeMobileMenu(false)} className={`flex h-11 justify-center ${secondaryButton}`} />
                    </div>
                </nav>
            </div>
        </header>
    );
}
