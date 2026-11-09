import { client } from "@/sanity/lib/client";
import { UPCOMING_BOOK_CLUB_MEETINGS_QUERY } from "@/sanity/lib/queries";
import { focusRing } from "./book-cover";
import type { BookClubMeetingSummary } from "./meeting-details";

export { BookCover, focusRing, textLinkHover } from "./book-cover";
export { MeetingShelf } from "./meeting-shelf";

// hover and press feedback for the Register button
const registerButtonTransition = "[transition:background-color_150ms_var(--ease-color),scale_150ms_var(--ease-out-strong)] active:scale-[0.97]";

/** Fetches upcoming meetings from Sanity, or an empty list if Sanity can't be reached. */
export async function fetchUpcomingMeetings() {
    try {
        // check Sanity for changes at most once a minute
        return await client.fetch<BookClubMeetingSummary[]>(UPCOMING_BOOK_CLUB_MEETINGS_QUERY, {}, { next: { revalidate: 60 } });
    } catch (error) {
        console.error("Could not load Book Club meetings from Sanity", error);
        return [];
    }
}

/** The Register button, linking to the meeting's registration form. */
export function RegisterButton({ meeting, className = "" }: { meeting: Pick<BookClubMeetingSummary, "title" | "registerUrl">; className?: string }) {
    if (!meeting.registerUrl) return null;
    return (
        <a
            className={`inline-flex min-h-12 items-center justify-center bg-[var(--gold)] px-7 font-bold text-[var(--navy)] hover:bg-[var(--header-gold)] ${registerButtonTransition} ${focusRing} ${className}`}
            href={meeting.registerUrl}
        >
            Register<span className="sr-only"> for the {meeting.title} discussion</span>
        </a>
    );
}
