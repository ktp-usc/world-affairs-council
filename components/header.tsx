"use client";

import { CalendarDays, ChevronDown, LogIn, Menu, RefreshCw, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navItems = [
    { label: "About", href: "#about" },
    { label: "Events", href: "#events" },
    {
        label: "Programs",
        href: "/programs",
        menu: [
            { label: "Programs Overview", href: "/programs" },
            { label: "Distinguished Speaker Series", href: "/programs/distinguished-speaker-series" },
            { label: "Global Speakers Program", href: "/programs/global-speakers-program" },
            { label: "Great Decisions", href: "/programs/great-decisions" },
            { label: "Book Club", href: "/programs/book-club" },
            { label: "Past Book Club Selections", href: "/programs/past-book-club-selections" },
            { label: "Student Programs", href: "/programs/student-programs" },
            { label: "Academic WorldQuest", href: "/programs/academic-worldquest" },
            { label: "Model UN", href: "/programs/model-un" },
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
                                {item.menu ? (
                                    <button className="nav-parent" type="button" onClick={() => setProgramsOpen(!programsOpen)} aria-expanded={programsOpen}>
                                        {item.label}<ChevronDown size={13} />
                                    </button>
                                ) : <a href={item.href}>{item.label}</a>}
                                {item.menu && programsOpen && (
                                    <div className="program-menu">
                                        {item.menu.map((entry) => (
                                            <Link href={entry.href} key={entry.label} onClick={() => { setProgramsOpen(false); setMobileOpen(false); }}>
                                                {entry.label}
                                            </Link>
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
