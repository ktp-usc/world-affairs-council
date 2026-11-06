"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import logo from "./ui/images/WACHH-Banner-Logo2022.png";

type MenuItem = {
    label: string;
    href: string;
};

type NavItem = {
    label: string;
    href?: string;
    menu?: MenuItem[];
};

const navItems: NavItem[] = [
    { label: "About", href: "/about" },
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
    { label: "Get Involved",
        menu: [
            { label: "Become a member", href: "#membership" },
            { label: "Be a guest", href: "#guest" },
            { label: "Volunteer", href: "#volunteer" },
            { label: "Opportunities to give", href: "#support" },
            { label: "Donation form", href: "#donate" },
            { label: "Sponsor a speaker", href: "#sponsor" },
        ]
     },
    { label: "Support Us", href: "#support" },
    { label: "News", href: "#news" },
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    return (
        <header className="site-header">
            {/*
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
            */}
            <div className="main-nav">
                <div className="nav-inner">
                    <Link href="/" aria-label="World Affairs Council of Hilton Head home">
                        <Image src={logo} alt="WACHH banner logo" className="w-80" />
                    </Link>
                    <nav className={mobileOpen ? "nav-links mobile-open" : "nav-links"} aria-label="Main navigation">
                        {navItems.map((item) => (
                            <div className="nav-item" key={item.label}>
                                {item.menu ? (
                                    <button className="nav-parent" type="button" onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)} aria-expanded={openMenu === item.label}>
                                        {item.label}<ChevronDown size={13} />
                                    </button>
                                ) : <a href={item.href}>{item.label}</a>}
                                {item.menu && openMenu === item.label && (
                                    <div className="program-menu">
                                        {item.menu.map((entry) => (
                                            <Link href={entry.href} key={entry.label} onClick={() => { setOpenMenu(null); setMobileOpen(false); }}>
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
