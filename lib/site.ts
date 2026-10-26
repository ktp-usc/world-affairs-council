export const contact = {
    office: "19 Bow Circle, Suite A1, Hilton Head Island, SC 29928",
    mail: "PO Box 22523, Hilton Head Island, SC 29925",
    phone: "843-384-6758",
    email: "execdirector@wachh.org",
};

export const memberLogin = "https://wachh.org/Sys/Login";

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

export const nav: NavItem[] = [
    { label: "Calendar", href: "/calendar" },
    {
        label: "About",
        href: "/about",
        children: [
            { label: "Our Mission", href: "/about#mission" },
            { label: "Leadership", href: "/about#leadership" },
            { label: "Annual Report", href: "/about#annual-report" },
            { label: "World Affairs Councils of America", href: "/about#waca" },
        ],
    },
    {
        label: "Programs",
        href: "/programs",
        children: [
            { label: "Distinguished Speaker Series", href: "/programs#speakers" },
            { label: "Global Speakers Program", href: "/programs#global" },
            { label: "Book Club", href: "/programs#book-club" },
            { label: "Great Decisions", href: "/programs#great-decisions" },
        ],
    },
    {
        label: "Students",
        href: "/students",
        children: [
            { label: "Academic WorldQuest", href: "/students#worldquest" },
            { label: "Model UN", href: "/students#model-un" },
        ],
    },
    {
        label: "Get Involved",
        href: "/get-involved",
        children: [
            { label: "Become a Member", href: "/get-involved#membership" },
            { label: "Be a Guest", href: "/get-involved#guests" },
            { label: "Volunteer", href: "/get-involved#volunteer" },
            { label: "Ways to Give", href: "/get-involved#give" },
            { label: "Sponsor a Speaker", href: "/get-involved#sponsor" },
        ],
    },
];

export type Event = {
    slug: string;
    title: string;
    speaker?: string;
    kind: "Speaker Series" | "Global Speaker" | "Book Club" | "Student";
    date: string; // ISO date, local time
    start: string;
    end: string;
    venue: string;
    address: string;
    blurb: string;
};

const church = { venue: "First Presbyterian Church", address: "540 William Hilton Pkwy, Hilton Head Island" };
const islandRec = { venue: "Island Recreation Center", address: "20 Wilborn Rd, Hilton Head Island" };

export const events: Event[] = [
    {
        slug: "thomas-greenfield",
        title: "Lessons in International Leadership",
        speaker: "Ambassador Linda Thomas-Greenfield",
        kind: "Speaker Series",
        date: "2026-10-02",
        start: "10:00 AM",
        end: "11:30 AM",
        ...church,
        blurb: "A conversation with the former U.S. Ambassador to the United Nations on diplomacy, coalition-building and leading through crisis.",
    },
    {
        slug: "book-club-elements-of-power",
        title: "The Elements of Power",
        speaker: "by Nicolas Niarchos",
        kind: "Book Club",
        date: "2026-10-08",
        start: "4:30 PM",
        end: "6:00 PM",
        ...islandRec,
        blurb: "Our monthly discussion of a book on world affairs. Members and non-members are welcome.",
    },
    {
        slug: "ratney",
        title: "A New Saudi Arabia in a Volatile Region",
        speaker: "Michael Ratney",
        kind: "Speaker Series",
        date: "2026-10-16",
        start: "10:00 AM",
        end: "11:30 AM",
        ...church,
        blurb: "The former U.S. Ambassador to Saudi Arabia on the kingdom's transformation and its role in a shifting Middle East.",
    },
    {
        slug: "ammon",
        title: "A European Perspective on the War in Ukraine and the Future of NATO",
        speaker: "Peter Ammon",
        kind: "Global Speaker",
        date: "2026-10-30",
        start: "10:00 AM",
        end: "11:30 AM",
        ...church,
        blurb: "A veteran German diplomat offers a view from across the Atlantic on the war, European security and the alliance.",
    },
    {
        slug: "book-club-jackal",
        title: "The Jackal",
        speaker: "by Joby Warrick",
        kind: "Book Club",
        date: "2026-11-12",
        start: "4:30 PM",
        end: "6:00 PM",
        ...islandRec,
        blurb: "Read ahead of the author's visit the following morning, then join the discussion.",
    },
    {
        slug: "warrick",
        title: "Twilight of the Jackal",
        speaker: "Joby Warrick",
        kind: "Speaker Series",
        date: "2026-11-13",
        start: "10:00 AM",
        end: "11:30 AM",
        ...church,
        blurb: "The Pulitzer Prize-winning national security reporter on the reporting behind his latest book.",
    },
    {
        slug: "mckay",
        title: "The Future of U.S.-Canada Relations",
        speaker: "John McKay",
        kind: "Speaker Series",
        date: "2026-12-04",
        start: "10:00 AM",
        end: "11:30 AM",
        ...church,
        blurb: "A longtime Canadian parliamentarian on trade, defense and the state of the northern partnership.",
    },
];

export function parseDate(iso: string) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d);
}

export function upcomingEvents(today = new Date()) {
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return events.filter((e) => parseDate(e.date) >= start);
}

export const sponsors = [
    "Sea Pines Real Estate",
    "Ruckno",
    "Seabrook",
    "Community Foundation of the Lowcountry",
    "The Westin",
    "Tidepoint",
    "Jolley Law Group",
];

export const social = [
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
];
