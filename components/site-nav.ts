// One list of every page on the site. The header menu and the footer columns are both built from it,
// so a link added or renamed here changes in both places. Grouping follows the menu on wachh.org.
//
// Pages that don't exist yet point to the home page section that covers them (same as the old header did).
// When a teammate builds a page, change its href here. TODO: update hrefs as pages are built.

export type NavLink = { label: string; href: string; external?: boolean };
export type NavSection = { label: string; href: string; blurb: string; links: NavLink[] };

export const navSections: NavSection[] = [
    {
        label: "About",
        href: "/about",
        blurb: "Who we are, who runs the Council, and where we came from.",
        links: [
            { label: "About Us", href: "/about" },
            { label: "Our Team", href: "/about/team" },
            { label: "Community", href: "/about/community" },
            { label: "Annual Reports", href: "/about#annual-reports" },
        ],
    },
    {
        label: "Events",
        href: "/#events",
        blurb: "Upcoming speakers and programs.",
        links: [{ label: "Event Calendar", href: "/#events" }],
    },
    {
        label: "Programs",
        href: "/#programs",
        blurb: "Speakers, discussion groups, and reading together.",
        links: [
            { label: "Distinguished Speaker Series", href: "/#programs" },
            { label: "Global Speakers Program", href: "/#programs" },
            { label: "Great Decisions", href: "/#programs" },
            { label: "Book Club", href: "/#programs" },
            { label: "Past Book Club Selections", href: "/#programs" },
        ],
    },
    {
        label: "Students",
        href: "/#programs",
        blurb: "Programs for Beaufort County students.",
        links: [
            { label: "Academic WorldQuest", href: "/#programs" },
            { label: "Model UN", href: "/#programs" },
        ],
    },
    {
        label: "Get Involved",
        href: "/#membership",
        blurb: "Join, attend as a guest, volunteer, or give.",
        links: [
            { label: "Become a Member", href: "/#membership" },
            { label: "Be a Guest", href: "/#membership" },
            { label: "Volunteer", href: "/#membership" },
            { label: "Ways to Give", href: "/#support" },
            { label: "Sponsor a Speaker", href: "/#support" },
        ],
    },
    {
        label: "News",
        href: "/#news",
        blurb: "Updates from the Council and reading on world affairs.",
        links: [
            { label: "News and Updates", href: "/#news" },
            { label: "Resources and Links", href: "/#news" },
        ],
    },
];

// The three actions on the right of the header. Log in and Donate go to the live wachh.org pages for now.
export const memberActions = {
    login: { label: "Log in", href: "https://wachh.org/Sys/Login", external: true },
    donate: { label: "Donate", href: "https://wachh.org/online-donation-form", external: true },
    join: { label: "Join", href: "/#membership" },
};

export const contact = {
    office: "19 Bow Circle, Suite A1, Hilton Head Island, SC 29928",
    mail: "PO Box 22523, Hilton Head Island, SC 29925",
    phone: "843-384-6758",
    email: "execdirector@wachh.org",
};

export const renewNotice = { text: "It's time to renew your membership for 2026–2027.", linkLabel: "Renew now", href: "/#membership" };
