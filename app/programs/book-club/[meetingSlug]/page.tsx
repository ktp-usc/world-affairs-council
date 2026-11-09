import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextBlock } from "next-sanity";
import PageHero from "@/components/page-hero";
import { BookCover, focusRing, textLinkHover } from "@/components/book-club/book-club-meetings";
import { formatMeetingDate, formatMeetingTime, formatSpacesLeft, type BookClubMeeting } from "@/components/book-club/meeting-details";
import { client } from "@/sanity/lib/client";
import { BOOK_CLUB_MEETING_QUERY, BOOK_CLUB_MEETING_SLUGS_QUERY } from "@/sanity/lib/queries";

type PageProps = { params: Promise<{ meetingSlug: string }> };

/** Loads one meeting by the slug in the url; refetched at most once a minute so Sanity edits show up without a redeploy. */
function fetchMeeting(meetingSlug: string) {
    return client.fetch<BookClubMeeting | null>(BOOK_CLUB_MEETING_QUERY, { slug: meetingSlug }, { next: { revalidate: 60 } });
}

/** Pre-renders a page for every meeting that exists at build time; meetings added later still work since Next renders unknown slugs on demand. */
export async function generateStaticParams() {
    const slugs = await client.fetch<{ slug: string }[]>(BOOK_CLUB_MEETING_SLUGS_QUERY);
    return slugs.map(({ slug }) => ({ meetingSlug: slug }));
}

/** The browser title and search description for one meeting. */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { meetingSlug } = await params;
    const meeting = await fetchMeeting(meetingSlug);
    if (!meeting) return {};
    return {
        title: `${meeting.title} | WACHH Book Club`,
        description: `WACHH Book Club discussion of ${meeting.title}${meeting.author ? ` by ${meeting.author}` : ""}, ${formatMeetingDate(meeting.startsAt)}.`,
    };
}

// The header's press: the fill eases on hover, the press answers at once on the strong ease-out.
const registerPress = "[transition:background-color_150ms_var(--ease-color),scale_150ms_var(--ease-out-strong)] active:scale-[0.97]";

/** One row of the When / Location / Spaces left list, laid out like the Program details on other program pages. */
function MeetingFact({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="grid gap-1 border-b border-[#d9d7d1] py-4 last:border-0 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6">
            <dt className="font-bold text-[var(--navy)]">{label}</dt>
            <dd className="m-0 text-[#4f4f4f] tabular-nums">{children}</dd>
        </div>
    );
}

/** A rich-text section (Abstract, About the Author) written by editors in Sanity. */
function RichTextSection({ title, body }: { title: string; body?: PortableTextBlock[] }) {
    if (!body?.length) return null;
    return (
        <section className="mt-12 border-t border-[#d9d7d1] pt-8">
            <h2 className="mb-4 font-[family-name:var(--serif)] text-[28px] leading-[1.2] font-medium text-[var(--navy)] md:text-[32px]">{title}</h2>
            {/* portable text turns sanity rich text blocks into html */}
            <div className="text-[#444] [&_a]:font-bold [&_a]:transition-[color] [&_a]:duration-150 [&_a]:ease-[var(--ease-color)] [&_a:hover]:text-[var(--navy)] [&_a]:text-[var(--teal)] [&_a]:underline [&_a]:underline-offset-4 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&>*:last-child]:mb-0">
                <PortableText value={body} />
            </div>
        </section>
    );
}

/** One Book Club meeting: cover, When / Location / Spaces left, registration, then the Abstract and About the Author. */
export default async function BookClubMeetingPage({ params }: PageProps) {
    const { meetingSlug } = await params;
    const meeting = await fetchMeeting(meetingSlug);

    // a typo'd or deleted slug gets a real 404 instead of a crash
    if (!meeting) notFound();

    const spacesLeft = formatSpacesLeft(meeting.spacesLeft);
    const isFull = meeting.spacesLeft === 0;
    const hasEnded = new Date(meeting.endsAt ?? meeting.startsAt) < new Date();

    return (
        <div className="min-h-svh bg-white font-[var(--sans)] text-[17px] leading-[1.6] text-[var(--charcoal)] md:text-[18px]">
            <main>
                <PageHero
                    breadcrumbs={[{ label: "Home", href: "/" }, { label: "Programs", href: "/programs" }, { label: "Book Club", href: "/programs/book-club" }, { label: meeting.title }]}
                    title={meeting.title}
                >
                    {meeting.author && <>by {meeting.author}</>}
                </PageHero>

                <div className="mx-auto w-[min(1040px,calc(100%-48px))] py-12 md:py-18">
                    <div className="grid gap-8 md:grid-cols-[220px_minmax(0,1fr)] md:gap-14">
                        <div className="w-[150px] md:sticky md:top-8 md:w-auto md:self-start">
                            <BookCover meeting={meeting} sizes="(min-width: 768px) 220px, 150px" />
                        </div>

                        <div className="max-w-[720px]">
                            <dl className="border-y border-[#d9d7d1]">
                                <MeetingFact label="When">
                                    {formatMeetingDate(meeting.startsAt)}
                                    <span className="block">{formatMeetingTime(meeting.startsAt, meeting.endsAt)}</span>
                                </MeetingFact>
                                {meeting.location && <MeetingFact label="Location">{meeting.location}</MeetingFact>}
                                {spacesLeft && !hasEnded && (
                                    <MeetingFact label="Spaces left">
                                        <span className={isFull ? "font-bold text-[var(--navy)]" : ""}>{isFull ? "Full: this discussion has no spaces left" : spacesLeft}</span>
                                    </MeetingFact>
                                )}
                            </dl>

                            <div className="mt-6">
                                {hasEnded ? (
                                    <p className="text-[#555]">This discussion has taken place.</p>
                                ) : meeting.registerUrl && !isFull ? (
                                    <a
                                        className={`inline-flex min-h-12 items-center bg-[var(--gold)] px-6 font-bold text-[var(--navy)] hover:bg-[var(--header-gold)] ${registerPress} ${focusRing}`}
                                        href={meeting.registerUrl}
                                    >
                                        Register<span className="sr-only"> for the {meeting.title} discussion</span>
                                    </a>
                                ) : (
                                    !isFull && <p className="text-sm font-bold tracking-[.04em] text-[var(--navy)] uppercase">Registration opens one month in advance</p>
                                )}
                                {!hasEnded && <p className="mt-3 text-[15px] text-[#5d5d5d]">Free for members and the public. Limited to 30 participants.</p>}
                            </div>

                            <RichTextSection title="Abstract" body={meeting.abstract} />
                            <RichTextSection title="About the Author" body={meeting.aboutTheAuthor} />

                            <Link className={`mt-12 inline-flex min-h-11 items-center font-bold text-[var(--teal)] underline underline-offset-4 ${textLinkHover} ${focusRing}`} href="/programs/book-club">
                                Back to the Book Club
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
