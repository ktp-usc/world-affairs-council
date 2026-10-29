"use client";

import { CalendarDays, ChevronDown, LogIn, Menu, RefreshCw, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image"
import logo from "./ui/images/WACHH-Banner-Logo2022.png"

const navItems = [
    {
        label: "About Us",
        menu: [
            "Annual Report",
            "Board of Directors",
            "Administration",
            "Program Committee",
            "WACA"
        ]
    },
    {
        label: "Events",
        menu: [

        ]
    },
    {
        label: "Programs",
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
    { label: "Get Involved",
        menu: [
            "Become a member",
            "Be a guest",
            "Volunteer",
            "Opportunities to give",
            "Donation form",
            "Sponsor a speaker",
        ]
     },
    { label: "Support Us", },
    { label: "News",  },
];

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
                    <Image src={logo} alt="WACHH banned logo" className="w-80" />
                    <nav className={mobileOpen ? "nav-links mobile-open" : "nav-links"} aria-label="Main navigation">
                        {navItems.map((item) => (
                            <div className="nav-item" key={item.label}>
                                <a onClick={() => item.menu && setProgramsOpen(!programsOpen)}>
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
