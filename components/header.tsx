"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { memberActions, navSections, renewNotice, type NavLink } from "@/components/site-nav";
import styles from "./header.module.css";

// Site header: one slim translucent row with every item spread evenly,
// one shared dropdown that fades in with the section you hover, and a blurred page behind it.
// Log in, Join and Donate sit on the right. Links live in components/site-nav.ts.

function LogoMark() {
    return (
        <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true" className={styles.mark}>
            <circle cx="16" cy="16" r="14.5" />
            <circle cx="16" cy="16" r="9.5" />
            <circle cx="16" cy="16" r="5" />
        </svg>
    );
}

function NavAnchor({ link, className, onClick }: { link: NavLink; className?: string; onClick?: () => void }) {
    return link.external ? (
        <a className={className} href={link.href} onClick={onClick}>{link.label}</a>
    ) : (
        <Link className={className} href={link.href} onClick={onClick}>{link.label}</Link>
    );
}

export default function Header() {
    const pathname = usePathname();
    const [openSectionIndex, setOpenSectionIndex] = useState<number | null>(null);
    // The section whose links are drawn. It stays set while the dropdown fades out.
    const [displayedSectionIndex, setDisplayedSectionIndex] = useState<number | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mobileSectionIndex, setMobileSectionIndex] = useState<number | null>(null);
    const closeTimer = useRef<number | undefined>(undefined);
    const dropdownPanelRef = useRef<HTMLDivElement>(null);
    const menuButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const openSection = (sectionIndex: number) => {
        window.clearTimeout(closeTimer.current);
        setOpenSectionIndex(sectionIndex);
        setDisplayedSectionIndex(sectionIndex);
    };
    const closeSectionSoon = (delayMs = 120) => {
        window.clearTimeout(closeTimer.current);
        closeTimer.current = window.setTimeout(() => setOpenSectionIndex(null), delayMs);
    };

    // Close everything when the page changes (React's recommended pattern for resetting on a prop change).
    const [previousPathname, setPreviousPathname] = useState(pathname);
    if (pathname !== previousPathname) {
        setPreviousPathname(pathname);
        setOpenSectionIndex(null);
        setIsMobileMenuOpen(false);
        setMobileSectionIndex(null);
    }

    useEffect(() => {
        const handleEscapeKey = (keyboardEvent: KeyboardEvent) => {
            if (keyboardEvent.key !== "Escape") return;
            if (openSectionIndex !== null) menuButtonRefs.current[openSectionIndex]?.focus();
            setOpenSectionIndex(null);
            setIsMobileMenuOpen(false);
        };
        window.addEventListener("keydown", handleEscapeKey);
        return () => window.removeEventListener("keydown", handleEscapeKey);
    }, [openSectionIndex]);

    // Keyboard users open a section with its small menu button; focus then moves into the dropdown.
    const openFromKeyboard = (sectionIndex: number) => {
        if (openSectionIndex === sectionIndex) return setOpenSectionIndex(null);
        openSection(sectionIndex);
        window.setTimeout(() => dropdownPanelRef.current?.querySelector<HTMLElement>("a")?.focus(), 30);
    };

    const isDropdownOpen = openSectionIndex !== null;
    const displayedSection = displayedSectionIndex !== null ? navSections[displayedSectionIndex] : null;
    const isCurrentPage = (href: string) => !href.startsWith("/#") && href !== "/" && pathname.startsWith(href.split("#")[0]);

    return (
        <>
            <header className={`${styles.nav} ${isDropdownOpen ? styles.navOpen : ""}`} onMouseLeave={() => closeSectionSoon()}>
                <div className={styles.bar}>
                    <ul className={styles.list}>
                        <li onMouseEnter={() => closeSectionSoon(0)}>
                            <Link href="/" className={styles.logo} aria-label="WACHH home">
                                <LogoMark />
                                <span>WACHH</span>
                            </Link>
                        </li>
                        <li className={styles.sections}>
                            <ul>
                                {navSections.map((navSection, sectionIndex) => (
                                    <li key={navSection.label} className={styles.sectionItem} onMouseEnter={() => openSection(sectionIndex)}>
                                        <Link href={navSection.href} className={`${styles.link} ${openSectionIndex === sectionIndex ? styles.linkActive : ""} ${isCurrentPage(navSection.href) ? styles.linkCurrent : ""}`}>
                                            {navSection.label}
                                        </Link>
                                        <button
                                            type="button"
                                            ref={(buttonElement) => { menuButtonRefs.current[sectionIndex] = buttonElement; }}
                                            className={styles.menuButton}
                                            aria-label={`${navSection.label} menu`}
                                            aria-expanded={openSectionIndex === sectionIndex}
                                            aria-controls="nav-flyout"
                                            onClick={() => openFromKeyboard(sectionIndex)}
                                        >
                                            <ChevronDown size={12} aria-hidden="true" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li className={styles.actions} onMouseEnter={() => closeSectionSoon(0)}>
                            <NavAnchor link={memberActions.login} className={styles.login} />
                            <NavAnchor link={memberActions.join} className={styles.join} />
                            <NavAnchor link={memberActions.donate} className={styles.donate} />
                        </li>
                        <li className={styles.mobileOnly}>
                            <button
                                type="button"
                                className={styles.burger}
                                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                                aria-expanded={isMobileMenuOpen}
                                onClick={() => { setIsMobileMenuOpen(!isMobileMenuOpen); setMobileSectionIndex(null); }}
                            >
                                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </li>
                    </ul>
                </div>

                <div
                    id="nav-flyout"
                    className={`${styles.flyout} ${isDropdownOpen ? styles.flyoutOpen : ""}`}
                    onMouseEnter={() => openSectionIndex !== null && openSection(openSectionIndex)}
                    inert={!isDropdownOpen}
                >
                    <div ref={dropdownPanelRef} className={styles.flyoutInner}>
                        {displayedSection && (
                            <>
                                <div className={styles.group}>
                                    <p className={styles.groupLabel}>{displayedSection.label}</p>
                                    <ul className={styles.links}>
                                        {displayedSection.links.map((navLink) => (
                                            <li key={navLink.label}>
                                                <NavAnchor link={navLink} onClick={() => setOpenSectionIndex(null)} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                </div>

            </header>

            {/* Outside <header>: the header's backdrop blur would otherwise trap this fixed sheet inside the 48px bar. */}
            {isMobileMenuOpen && (
                <nav className={styles.sheet} aria-label="Mobile">
                    {mobileSectionIndex === null ? (
                        <div className={styles.sheetPage}>
                            <ul className={styles.sheetBig}>
                                {navSections.map((navSection, sectionIndex) => (
                                    <li key={navSection.label}>
                                        <button type="button" onClick={() => setMobileSectionIndex(sectionIndex)}>
                                            {navSection.label}
                                            <ChevronRight size={20} aria-hidden="true" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <ul className={styles.sheetSmall}>
                                <li><NavAnchor link={memberActions.login} /></li>
                                <li><NavAnchor link={memberActions.join} /></li>
                                <li><NavAnchor link={memberActions.donate} /></li>
                                <li><NavAnchor link={{ label: "Renew membership", href: renewNotice.href }} /></li>
                            </ul>
                        </div>
                    ) : (
                        <div className={`${styles.sheetPage} ${styles.sheetSub}`}>
                            <button type="button" className={styles.back} onClick={() => setMobileSectionIndex(null)}>
                                <ChevronLeft size={18} aria-hidden="true" /> All sections
                            </button>
                            <p className={styles.groupLabel}>{navSections[mobileSectionIndex].label}</p>
                            <ul className={styles.sheetBig}>
                                {navSections[mobileSectionIndex].links.map((navLink) => (
                                    <li key={navLink.label}>
                                        <NavAnchor link={navLink} onClick={() => setIsMobileMenuOpen(false)} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </nav>
            )}

            <div className={styles.ribbon}>
                {renewNotice.text} <Link href={renewNotice.href}>{renewNotice.linkLabel} <ChevronRight size={14} aria-hidden="true" /></Link>
            </div>

            <div className={`${styles.curtain} ${isDropdownOpen ? styles.curtainOn : ""}`} aria-hidden="true" />
        </>
    );
}
