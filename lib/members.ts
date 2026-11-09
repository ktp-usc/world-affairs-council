import { parseDate } from "@/lib/site";

export type Member = { name: string };

/**
 * Returns the signed-in member, or null if the visitor is not a paid, active member.
 *
 * TODO(Wild Apricot): this is the single place the members-only page checks access.
 * Once Wild Apricot sign-in is implemented, read the session cookie here and return
 * the member only when their Wild Apricot membership status is active.
 *
 * Until then, the page stays locked for everyone. For local development, set
 * MEMBERS_PREVIEW="true" in .env.local to see the unlocked page. The preview flag
 * is ignored in production builds so it can never leak member content.
 */
export async function getCurrentMember(): Promise<Member | null> {
    if (process.env.NODE_ENV !== "production" && process.env.MEMBERS_PREVIEW === "true") {
        return { name: "Preview Member" };
    }
    return null;
}

export const livestream = {
    // Embed URL for the live player (e.g. a YouTube or Vimeo embed link). Leave empty to show the schedule notice instead.
    embedUrl: "",
    opensMinutesBefore: 15,
};

export type SeriesProgram = {
    date: string; // ISO date, local time
    presenter: string;
    topic: string;
    globalSpeaker?: boolean; // made possible by the Global Speakers Program
    videoUrl?: string; // recording, once posted
};

// TODO: swap each VIDEO_PLACEHOLDER for the real recording URL once it is posted.
// A "Watch" link only appears after the program date, so upcoming placeholders stay hidden.
const VIDEO_PLACEHOLDER = "#";

export const currentSeries = {
    season: "2026-2027",
    programs: [
        { date: "2026-10-02", presenter: "Linda Thomas-Greenfield", topic: "Lessons in International Leadership: A Conversation with Ambassador Linda Thomas-Greenfield", videoUrl: VIDEO_PLACEHOLDER },
        { date: "2026-10-16", presenter: "Michael Ratney", topic: "A New Saudi Arabia in a Volatile Region", videoUrl: VIDEO_PLACEHOLDER },
        { date: "2026-10-30", presenter: "Kurt Volker", topic: "Russia's War on Ukraine: How Will It End?", videoUrl: VIDEO_PLACEHOLDER },
        { date: "2026-11-13", presenter: "Joby Warrick", topic: "Twilight of the Jackal: The World's First Super-Terrorist to Syria 2026", videoUrl: VIDEO_PLACEHOLDER },
        { date: "2026-12-04", presenter: "John McKay", topic: "The Future of U.S.-Canada Relations", globalSpeaker: true, videoUrl: VIDEO_PLACEHOLDER },
        { date: "2027-01-08", presenter: "Lobsang Sangay", topic: "Tibet: A Failure of China's World Order", videoUrl: VIDEO_PLACEHOLDER },
        { date: "2027-01-22", presenter: "Mihaela Papa", topic: "BRICS: Its Evolution, Impact on Global Finance, and Relationship with the U.S.", videoUrl: VIDEO_PLACEHOLDER },
        { date: "2027-02-05", presenter: "Adam Segal", topic: "The AI Race Between the U.S. and China", videoUrl: VIDEO_PLACEHOLDER },
        { date: "2027-02-19", presenter: "Dr. Manuel Orozco", topic: "Remittances and Their Implications for Immigration and Displacement Worldwide", videoUrl: VIDEO_PLACEHOLDER },
        { date: "2027-03-05", presenter: "Ann Butler", topic: "Wife, Mother, Spy", videoUrl: VIDEO_PLACEHOLDER },
        { date: "2027-03-19", presenter: "Dr. Anna Wieslander", topic: "Russian Intimidation Actions Affecting the Baltic Region", globalSpeaker: true, videoUrl: VIDEO_PLACEHOLDER },
        { date: "2027-04-02", presenter: "Sherri Goodman", topic: "Environmental Change and Its Impact on Global Security", videoUrl: VIDEO_PLACEHOLDER },
        { date: "2027-04-23", presenter: "Chidi Blyden", topic: "How Africa's Growth and Geopolitics Are Reshaping Global Power: Is the U.S. Paying Attention?", videoUrl: VIDEO_PLACEHOLDER },
        { date: "2027-05-07", presenter: "Heidi Urben", topic: "Crisis in Civil-Military Relations", videoUrl: VIDEO_PLACEHOLDER },
    ],
} satisfies { season: string; programs: SeriesProgram[] };

// Replace each VIDEO_PLACEHOLDER with that season's archive page URL as it moves over from wachh.org.
export const videoArchives: { label: string; href?: string }[] = [
    { label: "2025-2026 Distinguished Speaker Series", href: VIDEO_PLACEHOLDER },
    { label: "2024-2025 Distinguished Speaker Series", href: VIDEO_PLACEHOLDER },
    { label: "2023-2024 Distinguished Speaker Series", href: VIDEO_PLACEHOLDER },
    { label: "2022-2023 Distinguished Speaker Series", href: VIDEO_PLACEHOLDER },
    { label: "2021-2022 Distinguished Speaker Series", href: VIDEO_PLACEHOLDER },
    { label: "2020-2021 Speaker Meetings", href: VIDEO_PLACEHOLDER },
];

export function nextProgram(today = new Date()) {
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return currentSeries.programs.find((p) => parseDate(p.date) >= start);
}
