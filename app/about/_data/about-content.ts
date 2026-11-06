// All About-section content lives here. Edit this file to update names, dates, or links —
// the pages only display what's in it. Source: wachh.org (checked Oct 2026).

export type Stat = { value: string; label: string };
export type Milestone = { year: string; text: string; photo?: Photo };
export type Person = { name: string; role?: string };
export type Report = { year: string; label: string; href: string };
export type FinancialHighlight = { label: string; value: string };

// A photo slot. Leave `src` empty and the page shows a labeled placeholder.
// To add a photo: put the image in the project's /public/about/ folder, set src to "/about/<file name>",
// and describe the photo in `alt` for screen readers.
export type Photo = { src: string; alt: string; placeholder: string };

export const photos = {
    aboutHero: { src: "", alt: "", placeholder: "Wide shot of a full house at a Council program" },
    origins: { src: "", alt: "", placeholder: "Early Council gathering, or the Hilton Head Public Library" },
    network: { src: "", alt: "", placeholder: "A speaker taking questions from the audience" },
    closeA: { src: "", alt: "", placeholder: "Audience member asking a question" },
    closeB: { src: "", alt: "", placeholder: "Speaker at the podium" },
    closeC: { src: "", alt: "", placeholder: "Students at Academic WorldQuest" },
    teamHero: { src: "", alt: "", placeholder: "Board and volunteers together at an event" },
    communityHero: { src: "", alt: "", placeholder: "Members talking after a program" },
    gallery: [
        { src: "", alt: "", placeholder: "Program audience" },
        { src: "", alt: "", placeholder: "Speaker portrait" },
        { src: "", alt: "", placeholder: "Academic WorldQuest" },
        { src: "", alt: "", placeholder: "Model UN" },
        { src: "", alt: "", placeholder: "Great Decisions group" },
        { src: "", alt: "", placeholder: "Volunteers at check-in" },
    ],
} satisfies Record<string, Photo | Photo[]>;

// One sentence shown centered under the hero.
export const tagline =
    "The World Affairs Council of Hilton Head is a nonpartisan nonprofit that brings diplomats, scholars, and journalists to the Lowcountry.";

export const origins = {
    title: "From a library seminar to a regional forum",
    paragraphs: [
        "The Council began in 1981 as the Foreign Affairs Seminar, a small group meeting at the Hilton Head Public Library.",
        "In 2005 it took the name World Affairs Council of Hilton Head, incorporated as a 501(c)(3), and joined the World Affairs Councils of America. Membership has grown past 1,100.",
    ],
};

export const mission = "To educate, engage, and inspire our community regarding world affairs.";

export const whoWeAre = [
    "Our members include academics, diplomats, business executives, authors, and government service personnel. Most live on Hilton Head Island and in surrounding Beaufort County.",
    "Programs are open to members, guests, and students. We take no political positions — we bring informed voices to the Lowcountry and trust our audience to weigh what they hear.",
];

export const stats: Stat[] = [
    { value: "1981", label: "Founded" },
    { value: "1,100+", label: "Members" },
    { value: "2005", label: "Joined WACA" },
    { value: "501(c)(3)", label: "Nonprofit" },
];

export const milestones: Milestone[] = [
    { year: "1981", text: "The Foreign Affairs Seminar is founded and meets at the Hilton Head Public Library." },
    { year: "1985", text: "Moves to the Palmetto Electric Community Room." },
    { year: "1991", text: "Membership passes 100; the group moves to Congregation Beth Yam." },
    { year: "2002", text: "Membership reaches 400; the group moves to Main Street Theater." },
    { year: "2005", text: "Affiliates with the World Affairs Councils of America, becomes the World Affairs Council of Hilton Head, and incorporates as a 501(c)(3)." },
    { year: "2007", text: "Summer Forums are established." },
    { year: "2010", text: "Moves to First Presbyterian Church; membership reaches 800." },
    { year: "2012", text: "Academic WorldQuest launches with the Beaufort County School District." },
    { year: "2014", text: "The Evening Speaker Series and Model UN program launch." },
    { year: "2021", text: "The Council celebrates its 40th anniversary." },
];

export const waca = {
    title: "Part of a national network",
    paragraphs: [
        "The World Affairs Councils of America is a nonpartisan national network of local councils that inform the public about global issues.",
        "As a member council, WACHH draws on programs and resources developed by the WACA national office, and connects our community with partner councils across the country.",
    ],
    href: "https://www.worldaffairscouncils.org/",
};

export const reports: Report[] = [
    { year: "2024–25", label: "Annual Report", href: "https://wachh.org/resources/Annual%20Reports/24-25%20WACHH%20Annual%20Report.pdf" },
    { year: "2023–24", label: "Annual Report", href: "https://wachh.org/resources/Annual%20Reports/23-24%20WACHH%20Annual%20Report.pdf" },
    { year: "2022–23", label: "Annual Report", href: "https://wachh.org/resources/Annual%20Reports/22-23%20WACHH%20Annual%20Report.pdf" },
    // The space before ".pdf" is in the real URL.
    { year: "2021–22", label: "Annual Report", href: "https://wachh.org/resources/Annual%20Reports/21-22%20WACHH%20Annual%20Report%20.pdf" },
];

// TODO: financial highlights — fill from the latest annual report PDF. The section hides while this is empty.
export const financialHighlights: FinancialHighlight[] = [];

export const officers: Person[] = [
    { name: "Richard Moniuszko", role: "President" },
    { name: "Mark O'Neill", role: "Vice President" },
    { name: "John Lang", role: "Treasurer" },
    { name: "Cindy Petitt", role: "Secretary" },
];

export const directors: Person[] = [
    { name: "Ben Kinnas", role: "Program Chair" },
    { name: "Peter Cooper" },
    { name: "Clair Goddard" },
    { name: "Jennie Johnson" },
    { name: "Paul Moeri" },
    { name: "John Strother" },
    { name: "Elaine Tholen" },
];

export const staff: Person[] = [{ name: "Tracie Martucci", role: "Executive Director" }];

export const programCommittee = {
    purpose: "The Program Committee finds and recruits expert speakers for the Distinguished Speaker Series, seeking a range of viewpoints on current issues without political bias.",
    members: [
        { name: "Ben Kinnas", role: "Chair" },
        { name: "John Gilbert" },
        { name: "Paul Albers" },
        { name: "Maria Berliner" },
        { name: "Peter Cooper" },
        { name: "Jim Irwin" },
        { name: "Les Janka" },
        { name: "Mark O'Neill" },
        { name: "Bill Patterson" },
        { name: "Cindy Petitt" },
        { name: "Eric Thompson" },
        { name: "Lee Wilwerding" },
    ] as Person[],
};

export const contact = {
    office: "19 Bow Circle, Suite A1, Hilton Head Island, SC 29928",
    mail: "PO Box 22523, Hilton Head Island, SC 29925",
    phone: "843-384-6758",
    email: "execdirector@wachh.org",
};

export const teamTitle = "Meet the volunteers and staff behind the Council";

// TODO: community content — this tab is a placeholder until the team decides what goes here.
export const community = {
    heading: "Bringing the world to the Lowcountry",
    intro: "This page will share stories from our members, partners, and student programs across the Lowcountry. It is coming soon.",
    stat: { value: "1,100+", text: "Members across Hilton Head Island and Beaufort County." },
};
