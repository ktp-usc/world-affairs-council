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
            { label: "Become a Member", href: "/get-involved/membership" },
            { label: "Be a Guest", href: "/get-involved/guests" },
            { label: "Volunteer", href: "/get-involved/volunteer" },
            { label: "Ways to Give", href: "/get-involved/give" },
            { label: "Sponsor a Speaker", href: "/get-involved/sponsor" },
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
    bio?: string;
    photo?: string; // under public/images/speakers/
    registerUrl?: string; // online registration/payment page for this event
};

const church = { venue: "First Presbyterian Church", address: "540 William Hilton Pkwy, Hilton Head Island, SC" };
const islandRec = { venue: "Island Recreation Center", address: "20 Wilborn Rd, Hilton Head Island, SC" };

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

export const isSpeakerSeries = (e: Event) => e.kind === "Speaker Series" || e.kind === "Global Speaker";

export const guestPolicy = {
    preRegisterFee: 30,
    walkInFee: 35,
    passCode: "DSS27",
    arrival: "9:30 AM",
    registerFallback: "https://wachh.org/events", // used when an event has no registerUrl
};

// Pre-registration closes the Wednesday before the event.
export function preRegisterDeadline(e: Event) {
    const d = parseDate(e.date);
    d.setDate(d.getDate() - ((d.getDay() - 3 + 7) % 7 || 7));
    return d;
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

export function sortedPosts() {
    return [...posts].sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());
}

export function formatPostDate(post: Post) {
    return parseDate(post.date).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
}

export const membership = {
    renewalYear: "2026-2027",
    joinOnline: "https://wachh.org/join",
    renew: memberLogin,
    printForm: "/membership-form.pdf", // drop the PDF into public/
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
    donateOnline: "https://wachh.org/online-donation-form",
    heritage: "https://www.heritageclassicfoundation.com/giving-opportunities/",
    birdiesEnd: "April 19, 2026", // last day of the RBC Heritage
};

export const sponsorship = {
    season: "2025-2026",
    email: contact.email,
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
        {
            id: "attache",
            name: "Attaché Sponsorship",
            amount: 250,
            limit: 4,
            perks: "Comes with one ticket to the sponsored presentation and one invitation to speaker lunch after the program.",
        },
    ],
    presentations: [
        { date: "2026-01-09", presenter: "David Satterfield", topic: "The Trump Foreign Policy: A First Year Assessment" },
        { date: "2026-01-23", presenter: "Ajay Chhibber", topic: "India’s Rise in a Changing World" },
        { date: "2026-02-06", presenter: "Barbara Slavin", topic: "Risks and Opportunities in Iran-US Relations" },
        { date: "2026-02-20", presenter: "Feisal al-Istrabadi", topic: "Iraq-Two Decades After the War" },
        { date: "2026-03-06", presenter: "Juan Cruz Diaz", topic: "Argentina-US Relations under presidents Javier Milei and Donald Trump" },
        { date: "2026-03-20", presenter: "Sean McFate", topic: "Sneaky War and the Dark Arts" },
        { date: "2026-04-10", presenter: "Mary Thompson-Jones", topic: "The Arctic: Competition in the Melting North" },
        { date: "2026-04-24", presenter: "Joby Warrick", topic: "Twilight of the Jackal – From the World’s First Super-Terrorist to Syria 2026" },
        { date: "2026-05-08", presenter: "Linda Weissgold", topic: "Seeing the World Through an Intelligence Lens" },
    ],
};
