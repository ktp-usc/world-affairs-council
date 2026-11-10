import { parseDate } from "@/lib/site";

export type Member = { name: string };

/**
 * Returns the signed-in member, or null if the visitor is not a paid, active member.
 *
 * TODO(Wild Apricot): this is the single place the members-only page checks access.
 * Once Wild Apricot sign-in is implemented, read the session cookie here and return
 * the member only when their Wild Apricot membership status is active.
 *
 * Until then, the page is open to everyone: every visitor is treated as a member.
 */
export async function getCurrentMember(): Promise<Member | null> {
    return { name: "Member" };
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

// Add a videoUrl to each program once its recording is posted. Past programs without one show "Video coming soon".

export const currentSeries = {
    season: "2026-2027",
    programs: [
        { date: "2026-10-02", presenter: "Linda Thomas-Greenfield", topic: "Lessons in International Leadership: A Conversation with Ambassador Linda Thomas-Greenfield" },
        { date: "2026-10-16", presenter: "Michael Ratney", topic: "A New Saudi Arabia in a Volatile Region" },
        { date: "2026-10-30", presenter: "Kurt Volker", topic: "Russia's War on Ukraine: How Will It End?" },
        { date: "2026-11-13", presenter: "Joby Warrick", topic: "Twilight of the Jackal: The World's First Super-Terrorist to Syria 2026" },
        { date: "2026-12-04", presenter: "John McKay", topic: "The Future of U.S.-Canada Relations", globalSpeaker: true },
        { date: "2027-01-08", presenter: "Lobsang Sangay", topic: "Tibet: A Failure of China's World Order" },
        { date: "2027-01-22", presenter: "Mihaela Papa", topic: "BRICS: Its Evolution, Impact on Global Finance, and Relationship with the U.S." },
        { date: "2027-02-05", presenter: "Adam Segal", topic: "The AI Race Between the U.S. and China" },
        { date: "2027-02-19", presenter: "Dr. Manuel Orozco", topic: "Remittances and Their Implications for Immigration and Displacement Worldwide" },
        { date: "2027-03-05", presenter: "Ann Butler", topic: "Wife, Mother, Spy" },
        { date: "2027-03-19", presenter: "Dr. Anna Wieslander", topic: "Russian Intimidation Actions Affecting the Baltic Region", globalSpeaker: true },
        { date: "2027-04-02", presenter: "Sherri Goodman", topic: "Environmental Change and Its Impact on Global Security" },
        { date: "2027-04-23", presenter: "Chidi Blyden", topic: "How Africa's Growth and Geopolitics Are Reshaping Global Power: Is the U.S. Paying Attention?" },
        { date: "2027-05-07", presenter: "Heidi Urben", topic: "Crisis in Civil-Military Relations" },
    ],
} satisfies { season: string; programs: SeriesProgram[] };

// Add an href to each season once its archive page moves over from wachh.org. Seasons without one show "Coming soon".
export const videoArchives: { label: string; href?: string }[] = [
    { label: "2025-2026 Distinguished Speaker Series" },
    { label: "2024-2025 Distinguished Speaker Series" },
    { label: "2023-2024 Distinguished Speaker Series" },
    { label: "2022-2023 Distinguished Speaker Series" },
    { label: "2021-2022 Distinguished Speaker Series" },
    { label: "2020-2021 Speaker Meetings" },
];

export function nextProgram(today = new Date()) {
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return currentSeries.programs.find((p) => parseDate(p.date) >= start);
}
