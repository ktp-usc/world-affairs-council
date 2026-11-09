import type { PortableTextBlock } from "next-sanity";
import type { SanityImage } from "@/sanity/lib/image";

// Shapes of the Book Club meetings the Sanity queries return (see sanity/lib/queries.ts).
export type BookClubMeetingSummary = {
    _id: string;
    slug: string;
    title: string;
    author?: string;
    coverImage?: SanityImage;
    startsAt: string;
    endsAt?: string;
    spacesLeft?: number;
};

export type BookClubMeeting = Omit<BookClubMeetingSummary, "_id" | "slug"> & {
    location?: string;
    registerUrl?: string;
    abstract?: PortableTextBlock[];
    aboutTheAuthor?: PortableTextBlock[];
};

// Meetings happen on Hilton Head, so times are always shown in Eastern time, whatever the server's clock says.
const meetingTimeZone = "America/New_York";

/** The meeting's date written out, for example "Thursday, November 12, 2026". */
export function formatMeetingDate(startsAt: string) {
    return new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: meetingTimeZone }).format(new Date(startsAt));
}

/** The meeting's time range, for example "4:30–6:00 PM", or just the start time when there is no end time. */
export function formatMeetingTime(startsAt: string, endsAt?: string) {
    const timeParts = (isoTime: string) => {
        const parts = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: meetingTimeZone }).formatToParts(new Date(isoTime));
        const clock = parts.filter((part) => part.type !== "dayPeriod").map((part) => part.value).join("").trim();
        const dayPeriod = parts.find((part) => part.type === "dayPeriod")?.value ?? "";
        return { clock, dayPeriod };
    };
    const start = timeParts(startsAt);
    if (!endsAt) return `${start.clock} ${start.dayPeriod}`;
    const end = timeParts(endsAt);
    // "4:30–6:00 PM" when both are in the afternoon; "11:30 AM–1:00 PM" when they are not
    return start.dayPeriod === end.dayPeriod ? `${start.clock}–${end.clock} ${end.dayPeriod}` : `${start.clock} ${start.dayPeriod}–${end.clock} ${end.dayPeriod}`;
}

/** "Full", "1 space left" or "12 spaces left"; nothing when editors left the field empty. */
export function formatSpacesLeft(spacesLeft?: number) {
    if (spacesLeft === undefined || spacesLeft === null) return undefined;
    if (spacesLeft <= 0) return "Full";
    return `${spacesLeft} ${spacesLeft === 1 ? "space" : "spaces"} left`;
}
