export const contact = {
    office: "19 Bow Circle, Suite A1, Hilton Head Island, SC 29928",
    mail: "PO Box 22523, Hilton Head Island, SC 29925",
    phone: "843-384-6758",
    email: "execdirector@wachh.org",
};

export const wildApricotBaseUrl = "https://wachh.wildapricot.org";

export const newsletter = {
    widgetSignup: `${wildApricotBaseUrl}/widget/Newsletter-Signup#idGeneralFormContainer`,
};

export const memberLogin = `${wildApricotBaseUrl}/Sys/Login`;

// key is the Sanity id when the header menu comes from Sanity
export type NavLink = { key?: string; label: string; href: string };
export type NavItem = { key?: string; label: string; href: string; children?: NavLink[] };

// Site navigation, shared by the header and footer. Every href is a real page.
// A section's own page (/programs, /get-involved) is linked from the footer's section headings.
export const nav: NavItem[] = [
    { label: "Home", href: "/" },
    {
        label: "About",
        href: "/about",
        children: [
            { label: "About Us", href: "/about" },
            { label: "Our Team", href: "/about/team" },
            { label: "Community", href: "/about/community" },
        ],
    },
    {
        label: "Programs",
        href: "/programs",
        children: [
            { label: "Distinguished Speaker Series", href: "/programs/distinguished-speaker-series" },
            { label: "Global Speakers Program", href: "/programs/global-speakers-program" },
            { label: "Great Decisions", href: "/programs/great-decisions" },
            { label: "Book Club", href: "/programs/book-club" },
            { label: "Student Programs", href: "/programs/student-programs" },
            { label: "Academic WorldQuest", href: "/programs/academic-worldquest" },
            { label: "Model UN", href: "/programs/model-un" },
        ],
    },
    { label: "Events", href: "/get-involved/guests#events" },
    {
        label: "Get Involved",
        href: "/get-involved",
        children: [
            { label: "Become a Member", href: "/get-involved/membership" },
            { label: "Be a Guest", href: "/get-involved/guests" },
            { label: "Volunteer", href: "/get-involved/volunteer" },
            { label: "Opportunities to Give", href: "/get-involved/give" },
            { label: "Online Donation Form", href: "/get-involved/give#donation-form" },
            { label: "Sponsor a Speaker", href: "/get-involved/sponsor" },
            { label: "Members Only", href: "/members" },
        ],
    },
    { label: "News", href: "/news" },
];

// The two actions on the right of the header.
export const memberActions = {
    becomeMember: { label: "Become a Member", href: "/get-involved/membership" },
    donate: { label: "Donate", href: "/get-involved/give" },
};

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
    bio?: string;
    photo?: string; // under public/images/speakers/
    registerUrl?: string; // online registration/payment page for this event
};

const church = { venue: "First Presbyterian Church", address: "540 William Hilton Pkwy, Hilton Head Island, SC" };
const islandRec = { venue: "Island Recreation Center", address: "20 Wilborn Rd, Hilton Head Island, SC" };

export const events: Event[] = [
    {
        slug: "thomas-greenfield",
        registerUrl: "https://wachh.org/event-6682004",
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
        registerUrl: "https://wachh.org/event-6682006",
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
        registerUrl: "https://wachh.org/event-6684338",
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
        registerUrl: "https://wachh.org/event-6685680",
        title: "Twilight of the Jackal: The World's First Super-Terrorist to Syria 2026",
        speaker: "Joby Warrick",
        kind: "Speaker Series",
        date: "2026-11-13",
        start: "10:00 AM",
        end: "11:30 AM",
        ...church,
        blurb: "The Pulitzer Prize-winning national security reporter on the reporting behind his latest book.",
        bio: "Joby Warrick is a best-selling author and a national security correspondent for The Washington Post. A two-time Pulitzer Prize winner, he served for 27 years with the Post’s national and investigative staffs, reporting from Washington and scores of cities around the world. In addition to his latest book, “Red Line,” he is the author of two previous nonfiction books, including “The Triple Agent” (Doubleday, 2011), a New York Times best-seller about a CIA operation in Afghanistan; as well as “Black Flags” (Doubleday, 2015), a narrative account of the personalities and events that gave rise to the Islamic State. “Black Flags” was listed as one of the best books of 2015 by the New York Times, The Washington Post, the San Francisco Chronicle and numerous other publications, and was the recipient of the 2016 Pulitzer Prize for general non-fiction.",
        photo: "/images/speakers/joby-warrick.png",
    },
    {
        slug: "mckay",
        registerUrl: "https://wachh.org/event-6684344",
        title: "The Future of U.S.-Canada Relations",
        speaker: "John McKay",
        kind: "Speaker Series",
        date: "2026-12-04",
        start: "10:00 AM",
        end: "11:30 AM",
        ...church,
        blurb: "A longtime Canadian parliamentarian on trade, defense and the state of the northern partnership.",
    },
    {
        slug: "sangay",
        title: "Tibet: A Failure of China's World Order",
        speaker: "Lobsang Sangay",
        kind: "Speaker Series",
        date: "2027-01-08",
        start: "10:00 AM",
        end: "11:30 AM",
        ...church,
        blurb: "Lobsang Sangay: Tibet: A Failure of China's World Order.",
        registerUrl: "https://wachh.org/event-6684341",
    },
    {
        slug: "papa",
        title: "BRICS: Its Evolution, Impact on Global Finance, and Relationship with the U.S.",
        speaker: "Mihaela Papa",
        kind: "Speaker Series",
        date: "2027-01-22",
        start: "10:00 AM",
        end: "11:30 AM",
        ...church,
        blurb: "Mihaela Papa: BRICS: Its Evolution, Impact on Global Finance, and Relationship with the U.S.",
        registerUrl: "https://wachh.org/event-6685692",
    },
    {
        slug: "segal",
        title: "The AI Race Between the U.S. and China",
        speaker: "Adam Segal",
        kind: "Speaker Series",
        date: "2027-02-05",
        start: "10:00 AM",
        end: "11:30 AM",
        ...church,
        blurb: "Adam Segal: The AI Race Between the U.S. and China.",
        registerUrl: "https://wachh.org/event-6775802",
    },
    {
        slug: "orozco",
        title: "Remittances and Their Implications for Immigration and Displacement Worldwide",
        speaker: "Dr. Manuel Orozco",
        kind: "Speaker Series",
        date: "2027-02-19",
        start: "10:00 AM",
        end: "11:30 AM",
        ...church,
        blurb: "Dr. Manuel Orozco: Remittances and Their Implications for Immigration and Displacement Worldwide.",
        registerUrl: "https://wachh.org/event-6685702",
    },
    {
        slug: "butler",
        title: "Wife, Mother, Spy",
        speaker: "Ann Butler",
        kind: "Speaker Series",
        date: "2027-03-05",
        start: "10:00 AM",
        end: "11:30 AM",
        ...church,
        blurb: "Ann Butler: Wife, Mother, Spy.",
        registerUrl: "https://wachh.org/event-6686840",
    },
    {
        slug: "wieslander",
        title: "Russian Intimidation Actions Affecting the Baltic Region",
        speaker: "Dr. Anna Wieslander",
        kind: "Global Speaker",
        date: "2027-03-19",
        start: "10:00 AM",
        end: "11:30 AM",
        ...church,
        blurb: "Dr. Anna Wieslander: Russian Intimidation Actions Affecting the Baltic Region.",
        registerUrl: "https://wachh.org/event-6686860",
    },
    {
        slug: "goodman",
        title: "Environmental Change and Its Impact on Global Security",
        speaker: "Sherri Goodman",
        kind: "Speaker Series",
        date: "2027-04-02",
        start: "10:00 AM",
        end: "11:30 AM",
        ...church,
        blurb: "Sherri Goodman: Environmental Change and Its Impact on Global Security.",
        registerUrl: "https://wachh.org/event-6686946",
    },
    {
        slug: "blyden",
        title: "How Africa's Growth and Geopolitics Are Reshaping Global Power: Is the U.S. Paying Attention?",
        speaker: "Chidi Blyden",
        kind: "Speaker Series",
        date: "2027-04-23",
        start: "10:00 AM",
        end: "11:30 AM",
        ...church,
        blurb: "Chidi Blyden: How Africa's Growth and Geopolitics Are Reshaping Global Power: Is the U.S. Paying Attention?",
        registerUrl: "https://wachh.org/event-6686970",
    },
    {
        slug: "urben",
        title: "Crisis in Civil-Military Relations",
        speaker: "Heidi Urben",
        kind: "Speaker Series",
        date: "2027-05-07",
        start: "10:00 AM",
        end: "11:30 AM",
        ...church,
        blurb: "Heidi Urben: Crisis in Civil-Military Relations.",
        registerUrl: "https://wachh.org/event-6686980",
    },
];

/** Turns a `YYYY-MM-DD` date into a local-time Date (avoids the UTC shift of `new Date("YYYY-MM-DD")`). */
export function parseDate(iso: string) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d);
}

/** Events happening today or later. */
export function upcomingEvents(today = new Date()) {
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return events.filter((e) => parseDate(e.date) >= start);
}

/** Whether an event is part of the Distinguished Speaker Series or Global Speakers Program. */
export const isSpeakerSeries = (e: Event) => e.kind === "Speaker Series" || e.kind === "Global Speaker";

export const guestPolicy = {
    preRegisterFee: 30,
    walkInFee: 35,
    passCode: "DSS27",
    arrival: "9:30 AM",
    registerFallback: "https://wachh.org/events", // used when an event has no registerUrl
};

/** The last day to pre-register for an event: the Wednesday before it. */
export function preRegisterDeadline(e: Event) {
    const d = parseDate(e.date);
    d.setDate(d.getDate() - ((d.getDay() - 3 + 7) % 7 || 7));
    return d;
}

// Original sponsor marks from the Council's current homepage at wachh.org.
export const sponsors = [
    { name: "Sea Pines Real Estate", logo: "/sponsors/sea-pines-real-estate.jpg" },
    { name: "Brighton Ruckno & Associates", logo: "/sponsors/ruckno.png" },
    { name: "Seabrook", logo: "/sponsors/seabrook.png" },
    { name: "Community Foundation of the Lowcountry", logo: "/sponsors/community-foundation.jpg" },
    { name: "The Westin Hilton Head Island Resort & Spa", logo: "/sponsors/westin.png" },
    { name: "TidePointe", logo: "/sponsors/tidepoint.png" },
    { name: "Jolley Law Group", logo: "/sponsors/jolley-law-group.jpg" },
];

// The Council's social accounts, as linked from the original wachh.org footer.
export const social = [
    { label: "Facebook", href: "https://www.facebook.com/WorldAffairsHHI" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/world-affairs-council-of-hilton-head/" },
    { label: "YouTube", href: "https://www.youtube.com/@worldaffairscouncilofhilto497" },
    { label: "Instagram", href: "https://www.instagram.com/worldaffairshhi/" },
];

// Pages linked from the footer's legal line.
export const legalLinks = [
    { label: "Privacy Notice", href: "/privacy" },
    { label: "Resources and Links", href: "/resources" },
];

export type Post = {
    slug: string;
    title: string;
    category: "Presidential Preview" | "Newsletter" | "Announcement";
    date: string; // ISO date, local time
    time: string;
    author?: string;
    body: string[]; // one entry per paragraph
};

export const posts: Post[] = [
    {
        slug: "presidential-preview-april-2025",
        title: "Presidential Preview - April 2025",
        category: "Presidential Preview",
        date: "2025-04-25",
        time: "12:01 PM",
        body: [
            "In addition to our Newsletter, I'll send periodic updates to you about WACHH. This is Volume 1, Number 1.",
            "Thank you for supporting WACHH and your patience during our leadership transitions (President, Executive Director, and Office Manager). Two weeks ago, Tracie Martucci assumed the role of Interim Executive Director and Trey Ramsey began working part-time in the office. Both are adapting well to our procedures.",
            "With the three of us assuming new roles, there will be some initial challenges. We appreciate your understanding and patience during this transition period.",
        ],
    },
];

/** News posts, newest first. */
export function sortedPosts() {
    return [...posts].sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());
}

/** A post's date written out, for example "April 25, 2025". */
export function formatPostDate(post: Post) {
    return parseDate(post.date).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
}

export const membership = {
    renewalYear: "2026-2027",

    // Opens the signup page in our new website.
    joinOnline: "/join",

    // These stay on Wild Apricot when wachh.org moves to our new website.
    hostedJoin: `${wildApricotBaseUrl}/join`,
    widgetJoin: `${wildApricotBaseUrl}/widget/join`,
    renew: memberLogin,

    printForm: "https://acrobat.adobe.com/id/urn:aaid:sc:VA6C2:15d38b9c-548a-46e0-9f33-daa38532934b",
};

export const memberBenefits: { benefit: string; nonMember: boolean }[] = [
    { benefit: "Attendance to the 14 Distinguished Speaker Series Programs, including 2 international speakers", nonMember: false },
    { benefit: "Receive Speaker and Event Announcement emails", nonMember: true },
    { benefit: "Access to Livestream Distinguished Speaker Series Programs", nonMember: false },
    { benefit: "Access to video archives of the Distinguished Speaker Series Programs", nonMember: false },
    { benefit: "Receive our quarterly newsletter", nonMember: true },
    { benefit: "Receive a daily international newsletter by GlobalPost", nonMember: false },
    { benefit: "Participate in discussion groups like the Fall Book Forum and Great Decisions (a partnership with Foreign Policy Association of America)", nonMember: false },
    { benefit: "Participate in Book Club events", nonMember: true },
    { benefit: "Access to WACA National programs and programs from other WAC chapters", nonMember: false },
];

// Photos live in public/images/gallery/. Slides without a src show a placeholder.
export const gallery: { src?: string; caption: string }[] = [
    { caption: "Distinguished Speaker Series" },
    { caption: "Members at the Fall Forum" },
    { caption: "Academic WorldQuest team" },
    { caption: "Model UN delegates" },
    { caption: "Book Club discussion" },
];

export const volunteerContact = { email: "officemgr@wachh.org", phone: contact.phone };

const volunteerFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdFUrDB2FeJd2yVCaRkLURFuRFiOIDVfUilT8EEyLbfJ3JEeA/viewform";

export const volunteerForm = {
    hosted: volunteerFormUrl,
    embedded: `${volunteerFormUrl}?embedded=true`,
};

export const volunteerRoles = [
    {
        id: "speaker-events",
        title: "Friday Speaker Events",
        body: "Help with set up, greet members and guests, facilitate registrations, book sales, badge identification and clean up.",
    },
    {
        id: "facilitators",
        title: "Discussion Group Facilitators",
        body: "Prepare, guide and manage a discussion group event to ensure that the group stays on subject, has good participation and ensures that everyone has a chance to share their thoughts on the subject.",
    },
    {
        id: "development",
        title: "Development / Fundraising",
        body: "Help identify, develop and execute fundraising programs.",
    },
    {
        id: "membership",
        title: "Membership",
        body: "Help promote the organization and membership by serving as an Ambassador in your neighborhood or community or through various awareness building activities.",
    },
    {
        id: "students",
        title: "Student Outreach",
        body: "Academic WorldQuest & Model UN programs are always looking for people to mentor students, speak about their experiences and assist with their events.",
    },
];

export const volunteerGallery: { src?: string; caption: string }[] = [
    { caption: "Greeting members on speaker day" },
    { caption: "Registration and badge table" },
    { caption: "Book sales" },
    { caption: "Mentoring Academic WorldQuest students" },
    { caption: "Model UN volunteers" },
];

export const giving = {
    donateOnline: "/get-involved/give#donation-form",
    hostedDonate: `${wildApricotBaseUrl}/online-donation-form`,
    widgetDonate: `${wildApricotBaseUrl}/widget/online-donation-form`,
    hostedStudent: `${wildApricotBaseUrl}/student-program-fund`,
    widgetStudent: `${wildApricotBaseUrl}/widget/student-program-fund`,
    hostedMonthly: `${wildApricotBaseUrl}/monthly-giving`,
    widgetMonthly: `${wildApricotBaseUrl}/widget/monthly-giving`,
    globalSpeakerFund: "https://lowcountry.fcsuite.com/erp/donate/create/fund?funit_id=1239",
    heritage: "https://www.heritageclassicfoundation.com/giving-opportunities/",
    birdiesEnd: "April 18, 2027", // Campaign date published on Opportunities to Give.
};

export const sponsorship = {
    email: contact.email,
    hostedForm: `${wildApricotBaseUrl}/sponsor-a-speaker#id_8UQIm9b`,
    widgetForm: `${wildApricotBaseUrl}/widget/sponsor-a-speaker#id_8UQIm9b`,
    levels: [
        {
            id: "ambassador",
            name: "Ambassador Sponsorship",
            amount: 1000,
            limit: 2,
            perks: "Comes with four tickets to the sponsored presentation and two invitations to a small group speaker dinner on the evening before the presentation.",
        },
        {
            id: "diplomat",
            name: "Diplomat Sponsorship",
            amount: 500,
            limit: 4,
            perks: "Comes with two tickets to the sponsored presentation and two invitations to the speaker lunch after the program.",
        },
    ],

};
