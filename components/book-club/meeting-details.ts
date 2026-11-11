import type { PortableTextBlock } from "next-sanity";
import type { SanityImage } from "@/sanity/lib/image";

// the meeting fields returned by the queries in sanity/lib/queries.ts
export type BookClubMeetingSummary = {
    _id: string;
    slug: string;
    title: string;
    author?: string;
    coverImage?: SanityImage;
    startsAt: string;
    endsAt?: string;
    location?: string;
    spacesLeft?: number;
    registerUrl?: string;
};

// a meeting that has already happened, as listed in the Book Club archive
export type PastBookClubMeeting = Pick<BookClubMeetingSummary, "_id" | "slug" | "title" | "author" | "startsAt">;

export type BookClubMeeting = Omit<BookClubMeetingSummary, "_id" | "slug"> & {
    abstract?: PortableTextBlock[];
    aboutTheAuthor?: PortableTextBlock[];
};

// meetings are on Hilton Head, so always show Eastern time
const meetingTimeZone = "America/New_York";

/** The meeting's date written out, for example "Thursday, November 12, 2026". */
export function formatMeetingDate(startsAt: string) {
    return new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: meetingTimeZone }).format(new Date(startsAt));
}

/** The meeting's date without the weekday, for example "December 10, 2026". */
export function formatMeetingShortDate(startsAt: string) {
    return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: meetingTimeZone }).format(new Date(startsAt));
}

/** The meeting's date in the archive's short form: { monthDay: "Oct 8", year: "2026" }. */
export function formatArchiveDate(startsAt: string) {
    const parts = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: meetingTimeZone }).formatToParts(new Date(startsAt));
    const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((datePart) => datePart.type === type)?.value ?? "";
    return { monthDay: `${part("month")} ${part("day")}`, year: part("year") };
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
    return start.dayPeriod === end.dayPeriod ? `${start.clock}–${end.clock} ${end.dayPeriod}` : `${start.clock} ${start.dayPeriod}–${end.clock} ${end.dayPeriod}`;
}

/** "Full", "1 space left" or "12 spaces left"; nothing when editors left the field empty. */
export function formatSpacesLeft(spacesLeft?: number) {
    if (spacesLeft === undefined || spacesLeft === null) return undefined;
    if (spacesLeft <= 0) return "Full";
    return `${spacesLeft} ${spacesLeft === 1 ? "space" : "spaces"} left`;
}

/** Splits a title like "The Jackal: The Rise and Fall of Carlos" into the title and the subtitle after the colon. */
export function splitBookTitle(title: string) {
    const colonIndex = title.indexOf(": ");
    if (colonIndex === -1) return { mainTitle: title, subtitle: undefined };
    return { mainTitle: title.slice(0, colonIndex), subtitle: title.slice(colonIndex + 2) };
}

/** Whether the meeting is over, using its end time when there is one. */
export function hasMeetingEnded(meeting: Pick<BookClubMeetingSummary, "startsAt" | "endsAt">) {
    return new Date(meeting.endsAt ?? meeting.startsAt) < new Date();
}
