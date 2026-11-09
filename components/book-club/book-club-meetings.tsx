import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { UPCOMING_BOOK_CLUB_MEETINGS_QUERY } from "@/sanity/lib/queries";
import { formatMeetingDate, formatMeetingTime, formatSpacesLeft, type BookClubMeetingSummary } from "./meeting-details";

// Same teal focus ring as the site header.
export const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--teal)]";
// Text links ease to navy on hover; only the colour moves.
export const textLinkHover = "transition-[color] duration-150 ease-[var(--ease-color)] hover:text-[var(--navy)]";

/** Fetches upcoming meetings from Sanity; a Sanity outage shows the empty message instead of breaking the whole Book Club page. */
async function fetchUpcomingMeetings() {
    try {
        // refetch at most once a minute so new meetings show up without a redeploy
        return await client.fetch<BookClubMeetingSummary[]>(UPCOMING_BOOK_CLUB_MEETINGS_QUERY, {}, { next: { revalidate: 60 } });
    } catch (error) {
        console.error("Could not load Book Club meetings from Sanity", error);
        return [];
    }
}

/** The book's cover from Sanity, or a plain navy cover with the title when editors haven't uploaded one. */
export function BookCover({ meeting, sizes, className = "" }: { meeting: Pick<BookClubMeetingSummary, "title" | "author" | "coverImage">; sizes: string; className?: string }) {
    if (meeting.coverImage) {
        return (
            <Image
                className={`h-auto w-full object-contain drop-shadow-xl ${className}`}
                src={urlFor(meeting.coverImage).width(520).fit("max").auto("format").url()}
                alt={`Cover of ${meeting.title}${meeting.author ? ` by ${meeting.author}` : ""}`}
                width={520}
                height={780}
                sizes={sizes}
            />
        );
    }
    return (
        // sized by its own width, not the viewport, so the narrow list cover and the wide page cover both fit their text
        <div className={`@container aspect-[2/3] w-full bg-[var(--navy)] text-white shadow-xl ${className}`} aria-hidden="true">
            <div className="flex h-full flex-col justify-between gap-2 p-3 @[9rem]:p-3.5 @[13rem]:p-5">
                <span className="hidden text-[11px] font-bold tracking-[.1em] uppercase @[9rem]:block">WACHH Book Club</span>
                <strong className="font-[family-name:var(--serif)] text-[15px] leading-[1.12] font-semibold text-balance @[9rem]:text-[17px] @[13rem]:text-[23px]">{meeting.title}</strong>
                <small className="text-[12px] leading-[1.3] @[9rem]:text-[13px]">{meeting.author}</small>
            </div>
        </div>
    );
}

/** The Book Club page's list of upcoming discussions, edited in Sanity as "Book Club Meeting" documents. */
export default async function BookClubMeetings() {
    const meetings = await fetchUpcomingMeetings();

    return (
        <section className="mt-14 border-t border-[#d9d7d1] pt-10 md:mt-18" aria-labelledby="upcoming-discussions">
            <h2 id="upcoming-discussions" className="mb-6 font-[family-name:var(--serif)] text-[30px] font-medium text-[var(--navy)] md:text-[34px]">Upcoming discussions</h2>
            {meetings.length === 0 ? (
                <p className="max-w-[760px] border-y border-[#d9d7d1] py-6 text-[#555]">The next discussions will be posted here soon. Registration for each one opens a month in advance.</p>
            ) : (
                <div className="border-t border-[#d9d7d1]">
                    {meetings.map((meeting) => {
                        const meetingHref = `/programs/book-club/${meeting.slug}`;
                        const spacesLeft = formatSpacesLeft(meeting.spacesLeft);
                        return (
                            <article className="grid grid-cols-[105px_minmax(0,1fr)] gap-5 border-b border-[#d9d7d1] py-8 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10 md:py-10" key={meeting._id}>
                                <Link href={meetingHref} tabIndex={-1} aria-hidden="true" className="self-start">
                                    <BookCover meeting={meeting} sizes="(min-width: 768px) 180px, 105px" className="max-h-[170px] md:max-h-[280px]" />
                                </Link>
                                <div>
                                    <time dateTime={meeting.startsAt} className="mb-3 block text-[13px] font-bold tracking-[.08em] text-balance text-[var(--teal)] uppercase">{formatMeetingDate(meeting.startsAt)}</time>
                                    <h3 className="font-[family-name:var(--serif)] text-[25px] leading-[1.15] font-medium text-balance text-[var(--navy)] md:text-[31px]">
                                        <Link href={meetingHref} className={`underline-offset-4 hover:underline ${focusRing}`}>{meeting.title}</Link>
                                    </h3>
                                    {meeting.author && <p className="mt-1 font-bold text-[var(--teal)]">by {meeting.author}</p>}
                                    <p className="mt-3 text-[#484848] tabular-nums">
                                        {formatMeetingTime(meeting.startsAt, meeting.endsAt)}
                                        {spacesLeft && <> · <span className={meeting.spacesLeft === 0 ? "font-bold text-[var(--navy)]" : ""}>{spacesLeft}</span></>}
                                    </p>
                                    <Link href={meetingHref} className={`mt-3 inline-flex min-h-11 items-center font-bold text-[var(--teal)] underline underline-offset-4 ${textLinkHover} ${focusRing}`}>
                                        Details and registration<span className="sr-only"> for {meeting.title}</span>
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </section>
    );
}
