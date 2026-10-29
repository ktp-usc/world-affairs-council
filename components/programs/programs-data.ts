export type ProgramFact = {
    label: string;
    value: string;
    icon: "calendar" | "location" | "users" | "book" | "globe" | "award";
};

export type ProgramSection = {
    eyebrow?: string;
    title: string;
    paragraphs?: string[];
    bullets?: string[];
};

export type ProgramEvent = {
    date: string;
    name: string;
    detail: string;
};

export type ProgramPageData = {
    slug: string;
    title: string;
    eyebrow: string;
    deck: string;
    overviewTitle: string;
    overview: string;
    heroImage: string;
    heroAlt: string;
    facts: ProgramFact[];
    sections: ProgramSection[];
    events?: ProgramEvent[];
    topics?: string[];
    cards?: { title: string; text: string; href?: string; kicker?: string }[];
    books?: { date: string; title: string; author: string }[];
    callout: { eyebrow: string; title: string; text: string };
};

export const programCards = [
    {
        title: "Distinguished Speaker Series",
        text: "Leading voices from diplomacy, journalism, academia, business, and public service.",
        href: "/programs/distinguished-speaker-series",
        image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=1200&q=82",
    },
    {
        title: "Global Speakers Program",
        text: "International perspectives that help the Lowcountry see the world beyond an American point of view.",
        href: "/programs/global-speakers-program",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=82",
    },
    {
        title: "Great Decisions",
        text: "Small-group discussion of the most consequential foreign-policy questions facing the United States.",
        href: "/programs/great-decisions",
        image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=82",
    },
    {
        title: "Book Club",
        text: "Read broadly, think deeply, and discuss world affairs and domestic politics with the community.",
        href: "/programs/book-club",
        image: "https://images.unsplash.com/photo-1604297992396-5df2499ba816?auto=format&fit=crop&w=1200&q=82",
    },
    {
        title: "Student Programs",
        text: "Academic WorldQuest and Model UN prepare Beaufort County students to become informed global citizens.",
        href: "/programs/student-programs",
        image: "https://images.unsplash.com/photo-1709054172839-17880c040f22?auto=format&fit=crop&w=1200&q=82",
    },
];

const sharedSpeakerImage = "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=1800&q=85";
const discussionImage = "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1800&q=85";
const studentImage = "https://images.unsplash.com/photo-1660796046943-ae52067e019f?auto=format&fit=crop&w=1800&q=85";

export const programPages: Record<string, ProgramPageData> = {
    "distinguished-speaker-series": {
        slug: "distinguished-speaker-series",
        title: "Distinguished Speaker Series",
        eyebrow: "WACHH programs",
        deck: "Leading voices. Essential global insight.",
        overviewTitle: "The world, brought closer",
        overview: "WACHH’s principal program brings respected experts from around the globe to Hilton Head for timely, nonpartisan conversations. Each program includes a featured address followed by audience questions.",
        heroImage: sharedSpeakerImage,
        heroAlt: "A speaker addressing an audience",
        facts: [
            { label: "Season", value: "October through May", icon: "calendar" },
            { label: "Venue", value: "First Presbyterian Church", icon: "location" },
            { label: "Attendance", value: "Members and registered guests", icon: "users" },
        ],
        sections: [
            {
                eyebrow: "The experience",
                title: "Fourteen conversations each season",
                paragraphs: [
                    "Programs usually take place on the first and third Fridays of the month at 10:00 AM. Featured speakers address the audience for approximately 50 minutes before a moderated question-and-answer session.",
                    "Speakers are selected for their international experience in government, business, military affairs, journalism, and academia. WACHH is a nonpartisan educational organization and takes no political position on the topics presented.",
                ],
            },
        ],
        events: [
            { date: "OCT 30", name: "Kurt Volker", detail: "Russia’s War on Ukraine: How Will It End?" },
            { date: "NOV 13", name: "Joby Warrick", detail: "Twilight of the Jackal" },
            { date: "DEC 04", name: "John McKay", detail: "The Future of U.S.–Canada Relations" },
            { date: "JAN 08", name: "Lobsang Sangay", detail: "Tibet: A Failure of China’s World Order" },
        ],
        callout: {
            eyebrow: "Member access",
            title: "Watch from anywhere",
            text: "Members can access program livestreams and the video archive through the members-only area.",
        },
    },
    "global-speakers-program": {
        slug: "global-speakers-program",
        title: "Global Speakers Program",
        eyebrow: "WACHH programs",
        deck: "Hear what the world is thinking and feeling—firsthand.",
        overviewTitle: "A truly global point of view",
        overview: "Twice each year, the Robert & Lynn Burt Global Speakers Program brings an international voice to the Distinguished Speaker Series—one in the fall and one in the spring.",
        heroImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=85",
        heroAlt: "An international conference audience",
        facts: [
            { label: "Established", value: "2016", icon: "calendar" },
            { label: "Speakers", value: "Two international guests yearly", icon: "globe" },
            { label: "Part of", value: "Distinguished Speaker Series", icon: "users" },
        ],
        sections: [
            {
                eyebrow: "Why it matters",
                title: "Beyond a single national perspective",
                paragraphs: [
                    "Global events reach across borders and shape life in every community. International speakers offer perspectives formed outside the United States and help members understand a more interconnected, complicated world.",
                    "The program began with a generous gift from Council members Robert and Lynn Burt. A dedicated fund continues to cover the expenses of bringing two international speakers to Hilton Head each year.",
                ],
            },
        ],
        cards: [
            { kicker: "October 2025", title: "Marwan Muasher", text: "Shifting Political Dynamics in the Middle East" },
            { kicker: "March 2026", title: "Juan Cruz Díaz", text: "Argentina–U.S. Relations under Presidents Javier Milei and Donald Trump" },
            { kicker: "November 2024", title: "Jennifer Rasamimanana", text: "The U.S. and Morocco: 200 Years of Peace and Friendship" },
        ],
        callout: {
            eyebrow: "Support the program",
            title: "Keep global perspectives in the conversation",
            text: "Gifts to the Global Speakers Fund help WACHH bring international voices directly to the Lowcountry.",
        },
    },
    "great-decisions": {
        slug: "great-decisions",
        title: "Great Decisions",
        eyebrow: "Discussion programs",
        deck: "Read. Discuss. Reconsider the world together.",
        overviewTitle: "America’s largest grassroots world-affairs discussion program",
        overview: "Created by the Foreign Policy Association in 1954, Great Decisions combines a briefing book with facilitated small-group conversations about the most critical global issues facing the United States.",
        heroImage: discussionImage,
        heroAlt: "A map and travel journal representing global discussion",
        facts: [
            { label: "Season", value: "February and March", icon: "calendar" },
            { label: "Format", value: "Eight weekly discussions", icon: "book" },
            { label: "Experience", value: "Reading and civil dialogue", icon: "users" },
        ],
        sections: [
            {
                eyebrow: "Join the discussion",
                title: "Different viewpoints make better understanding",
                paragraphs: [
                    "Participants read the Great Decisions Briefing Book, then meet in a group setting to explore each issue. Every participant benefits from hearing the knowledge, experience, and point of view of others.",
                    "Dates and locations for the 2027 groups will be announced by WACHH. Participants purchase the annual briefing book directly from the Foreign Policy Association.",
                ],
                bullets: ["Keep up with current events", "Meet thoughtful neighbors", "Stretch your point of view and expertise"],
            },
        ],
        topics: [
            "American Foreign Policy and the Future of Multilateralism",
            "American Options in the Middle East",
            "The Future of Germany in Europe and the Atlantic World",
            "U.S.–China: The Case for Engagement",
            "Brazil and the Global South",
            "AI and American Choices",
            "Energy Security and American Foreign Policy",
        ],
        callout: {
            eyebrow: "2027 program",
            title: "Come for current events. Stay for the conversation.",
            text: "Group schedules and registration information will be published when the 2027 season is finalized.",
        },
    },
    "book-club": {
        slug: "book-club",
        title: "Book Club",
        eyebrow: "Discussion programs",
        deck: "Read widely. Think deeply. Make new friendships.",
        overviewTitle: "A monthly conversation about our changing world",
        overview: "The WACHH Book Club gives members and the public an opportunity to learn more broadly about world affairs and domestic politics through stimulating, welcoming discussion.",
        heroImage: "https://images.unsplash.com/photo-1604297992396-5df2499ba816?auto=format&fit=crop&w=1800&q=85",
        heroAlt: "Books arranged for a group discussion",
        facts: [
            { label: "When", value: "Second Thursday, 4:30–6:00 PM", icon: "calendar" },
            { label: "Where", value: "Island Recreation Center", icon: "location" },
            { label: "Cost", value: "Free; advance registration required", icon: "users" },
        ],
        sections: [
            {
                eyebrow: "How it works",
                title: "One book. Thirty readers. A world of ideas.",
                paragraphs: [
                    "Registration opens one month before each discussion and is limited to 30 participants. Meetings take place in the Island Recreation Center Board Room at 20 Wilborn Road on Hilton Head Island.",
                    "Selections range from geopolitics and diplomacy to economics, technology, democracy, intelligence, and conflict.",
                ],
            },
        ],
        cards: [
            { kicker: "November 12, 2026", title: "The Jackal", text: "Joby Warrick · The rise and fall of Carlos, the world’s first super-terrorist." },
            { kicker: "December 10, 2026", title: "The Coming Storm", text: "Odd Arne Westad · Power, conflict, and warnings from history." },
            { kicker: "January 14, 2027", title: "The Nord Stream Conspiracy", text: "Bojan Pancevski · The inside story of the explosions that shook the world." },
        ],
        callout: {
            eyebrow: "Continue exploring",
            title: "Browse the Book Club archive",
            text: "See the books that have shaped WACHH conversations since 2021.",
        },
    },
    "past-book-club-selections": {
        slug: "past-book-club-selections",
        title: "Past Book Club Selections",
        eyebrow: "Book Club archive",
        deck: "A growing library of ideas that informed our conversations.",
        overviewTitle: "Explore the reading list",
        overview: "The archive reflects the breadth of WACHH Book Club conversations—from global power and political economy to diplomacy, technology, conflict, and democratic life.",
        heroImage: "https://images.unsplash.com/photo-1604297992396-5df2499ba816?auto=format&fit=crop&w=1800&q=85",
        heroAlt: "A collection of books on shelves",
        facts: [
            { label: "Archive", value: "2021–2026", icon: "calendar" },
            { label: "Cadence", value: "One selection each month", icon: "book" },
            { label: "Topics", value: "World affairs and public life", icon: "globe" },
        ],
        sections: [
            {
                eyebrow: "Recent reading",
                title: "2026 selections",
                paragraphs: ["The most recent books selected by the WACHH Book Club are presented below as a mockup archive."],
            },
        ],
        books: [
            { date: "Oct 8, 2026", title: "The Element of Power", author: "Nicolas Niarchos" },
            { date: "Sep 10, 2026", title: "The Great Global Transformation", author: "Branko Milanovic" },
            { date: "Aug 13, 2026", title: "Abundance", author: "Ezra Klein & Derek Thompson" },
            { date: "Jul 9, 2026", title: "How Economics Explains the World", author: "Andrew Leigh" },
            { date: "Jun 11, 2026", title: "Russia’s World Order", author: "Paul Robinson" },
            { date: "May 14, 2026", title: "The Sisterhood", author: "Liza Mundy" },
            { date: "Apr 9, 2026", title: "America in the Arctic", author: "Mary Thompson-Jones" },
            { date: "Mar 19, 2026", title: "The New Rules of War", author: "Sean McFate" },
            { date: "Feb 12, 2026", title: "Enduring Hostility", author: "Dalia Dassa Kaye" },
            { date: "Jan 8, 2026", title: "Breaking the Engagement", author: "David Shambaugh" },
            { date: "Dec 11, 2025", title: "End of Ambition", author: "Steven Cook" },
            { date: "Nov 13, 2025", title: "The Bomb", author: "Fred Kaplan" },
        ],
        callout: {
            eyebrow: "Join the discussion",
            title: "Find your next great read",
            text: "The Book Club is open to WACHH members and the public with advance registration.",
        },
    },
    "student-programs": {
        slug: "student-programs",
        title: "Student Programs",
        eyebrow: "Programs for future leaders",
        deck: "Global knowledge, confidence, and citizenship for Lowcountry students.",
        overviewTitle: "An investment in the future",
        overview: "WACHH helps Beaufort County students understand issues of global importance. In a changing world, developing informed, curious citizens is more important than ever.",
        heroImage: studentImage,
        heroAlt: "Students collaborating in a classroom",
        facts: [
            { label: "Programs", value: "Academic WorldQuest & Model UN", icon: "award" },
            { label: "Community", value: "Beaufort County high schools", icon: "location" },
            { label: "Supported by", value: "WACHH members and volunteers", icon: "users" },
        ],
        sections: [
            {
                eyebrow: "Learning by doing",
                title: "Two paths to global understanding",
                paragraphs: [
                    "Academic WorldQuest turns international knowledge into a fast-paced team competition. Model United Nations places students in the role of diplomats, where research, public speaking, negotiation, and respectful disagreement come alive.",
                    "Council members strengthen both programs by mentoring students, sharing country expertise, volunteering at events, and helping fund participation.",
                ],
            },
        ],
        cards: [
            { kicker: "Knowledge competition", title: "Academic WorldQuest", text: "High-school teams test their knowledge of international affairs, geography, history, and culture.", href: "/programs/academic-worldquest" },
            { kicker: "Diplomacy simulation", title: "Model United Nations", text: "Students represent nations, negotiate global challenges, and practice civil international dialogue.", href: "/programs/model-un" },
        ],
        callout: {
            eyebrow: "Make an impact",
            title: "Help students find their global voice",
            text: "Volunteers, educators, mentors, and donors make these experiences possible across the Lowcountry.",
        },
    },
    "academic-worldquest": {
        slug: "academic-worldquest",
        title: "Academic WorldQuest",
        eyebrow: "Student programs",
        deck: "Training future leaders on the importance of global issues.",
        overviewTitle: "Global learning becomes a team sport",
        overview: "Academic WorldQuest is the World Affairs Councils of America’s flagship education program, engaging more than 3,000 high-school students nationally each year in a test of global knowledge and foreign policy.",
        heroImage: studentImage,
        heroAlt: "Students preparing together for an academic competition",
        facts: [
            { label: "Local partner", value: "Beaufort County School District", icon: "users" },
            { label: "County final", value: "February", icon: "calendar" },
            { label: "National final", value: "Washington, D.C. in April", icon: "award" },
        ],
        sections: [
            {
                eyebrow: "The competition",
                title: "Knowledge, teamwork, and a national stage",
                paragraphs: [
                    "Teams prepare outside their regular curriculum to answer questions about international affairs, geography, history, and culture. WACHH works with all six county high schools to host the local competition.",
                    "The winning team represents its school, community, and Council at the national competition in Washington, D.C. WACHH covers the team’s travel expenses, giving students the opportunity to compete and visit important civic institutions.",
                ],
                bullets: ["More than 40 local councils participate nationwide", "Over 225 students attend the national final", "Students build global knowledge beyond the classroom"],
            },
        ],
        callout: {
            eyebrow: "Support a team",
            title: "Coach, mentor, volunteer, or give",
            text: "Community support helps Beaufort County students prepare, compete, and represent the Lowcountry nationally.",
        },
    },
    "model-un": {
        slug: "model-un",
        title: "Model United Nations",
        eyebrow: "Student programs",
        deck: "Diplomacy comes alive for Beaufort County students.",
        overviewTitle: "Step into the role of a world diplomat",
        overview: "Model United Nations is an academic global-learning experience in which students represent countries, debate international challenges, negotiate resolutions, and discover the responsibilities of world citizenship.",
        heroImage: studentImage,
        heroAlt: "Students working together in a diplomacy program",
        facts: [
            { label: "Participants", value: "Local public and private high schools", icon: "users" },
            { label: "Conferences", value: "Two regional events", icon: "calendar" },
            { label: "Skills", value: "Research, speaking & negotiation", icon: "award" },
        ],
        sections: [
            {
                eyebrow: "Why Model UN",
                title: "Confidence, curiosity, and civil dialogue",
                paragraphs: [
                    "Students research an assigned country and carry its perspective into a regional conference. The experience builds an appreciation for differing viewpoints and asks participants to solve problems through respectful negotiation.",
                    "WACHH sponsors students from Beaufort County high schools to attend regional conferences and connects teams with Council members who can share knowledge of countries and regions.",
                ],
                bullets: [
                    "Practice public speaking and conflict resolution",
                    "Learn diplomacy, international relations, and the United Nations",
                    "Represent a nation as a conference delegate",
                    "Interact with peers in an atmosphere of respect and civility",
                ],
            },
        ],
        callout: {
            eyebrow: "Share your expertise",
            title: "Mentor the next generation of global thinkers",
            text: "Volunteers can help students understand the country or region they have been assigned to represent.",
        },
    },
};

export const programNavigation = [
    { label: "Programs Overview", href: "/programs" },
    { label: "Distinguished Speaker Series", href: "/programs/distinguished-speaker-series" },
    { label: "Global Speakers Program", href: "/programs/global-speakers-program" },
    { label: "Great Decisions", href: "/programs/great-decisions" },
    { label: "Book Club", href: "/programs/book-club" },
    { label: "Past Book Club Selections", href: "/programs/past-book-club-selections" },
    { label: "Student Programs", href: "/programs/student-programs" },
    { label: "Academic WorldQuest", href: "/programs/academic-worldquest" },
    { label: "Model UN", href: "/programs/model-un" },
];
