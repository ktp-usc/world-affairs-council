"use client";

import { CalendarDays, ChevronDown, LogIn, Menu, RefreshCw, X } from "lucide-react";
import { useState } from "react";

const navItems = [
    { label: "About", href: "#about" },
    { label: "Events", href: "#events" },
    {
        label: "Programs",
        href: "#programs",
        menu: [
            "Distinguished Speaker Series",
            "Global Speakers Program",
            "Great Decisions",
            "Book Club",
            "Past Book Club Selections",
            "Student Programs",
            "Academic WorldQuest",
            "Model UN",
        ],
    },
    { label: "Membership", href: "#membership" },
    { label: "Support Us", href: "#support" },
    { label: "News", href: "#news" },
];

function Logo({ compact = false }: { compact?: boolean }) {
    return (
        <a className="brand" href="#" aria-label="WACHH home">
            <span className="brand-mark" aria-hidden="true">
                <span />
            </span>
            <span className="brand-copy">
                <strong>WACHH</strong>
                {!compact && <small>WORLD AFFAIRS COUNCIL<br />OF HILTON HEAD</small>}
            </span>
        </a>
    );
}

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [programsOpen, setProgramsOpen] = useState(false);

    return (
        <header className="site-header">
            <div className="renew-banner">
                It&apos;s time to renew your membership for 2026–2027. <a href="#membership">Renew now <span aria-hidden="true">→</span></a>
            </div>
            <div className="utility-bar">
                <div className="utility-inner">
                    <a href="#events"><CalendarDays size={17} /> Event Calendar</a>
                    <a href="#login"><LogIn size={17} /> Member Log In</a>
                    <a href="#membership"><RefreshCw size={17} /> Renew Membership</a>
                    <a className="donate-link" href="#support">Donate</a>
                </div>
            </div>
            <div className="main-nav">
                <div className="nav-inner">
                    <Logo />
                    <nav className={mobileOpen ? "nav-links mobile-open" : "nav-links"} aria-label="Main navigation">
                        {navItems.map((item) => (
                            <div className="nav-item" key={item.label}>
                                <a href={item.href} onClick={() => item.menu && setProgramsOpen(!programsOpen)}>
                                    {item.label}{item.menu && <ChevronDown size={13} />}
                                </a>
                                {item.menu && programsOpen && (
                                    <div className="program-menu">
                                        {item.menu.map((entry, index) => (
                                            <a href="#programs" key={entry}>
                                                {entry}
                                                {index === 0 && <span className="preview-tag">Preview</span>}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <a className="member-button" href="#membership">Become a Member</a>
                    </nav>
                    <button className="mobile-toggle" aria-label={mobileOpen ? "Close menu" : "Open menu"} onClick={() => setMobileOpen(!mobileOpen)}>
                        {mobileOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>
        </header>
    );
}
