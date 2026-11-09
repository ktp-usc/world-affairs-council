import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PortableText, type PortableTextBlock } from "next-sanity";
import { BookCover, MeetingShelf, RegisterButton, fetchUpcomingMeetings, focusRing, textLinkHover } from "@/components/book-club/book-club-meetings";
import { formatMeetingDate, formatMeetingTime, formatSpacesLeft, hasMeetingEnded, splitBookTitle, type BookClubMeeting } from "@/components/book-club/meeting-details";
import { client } from "@/sanity/lib/client";
import { BOOK_CLUB_MEETING_QUERY, BOOK_CLUB_MEETING_SLUGS_QUERY } from "@/sanity/lib/queries";

type PageProps = { params: Promise<{ meetingSlug: string }> };

const contentWidth = "mx-auto w-[min(1040px,calc(100%-48px))]";
// desktop layout: text on the left, cover and details on the right
const twoColumnLayout = "md:grid-cols-[minmax(0,1fr)_270px] md:gap-16";

/** Loads one meeting by its slug, checking Sanity for changes at most once a minute. */
function fetchMeeting(meetingSlug: string) {
    return client.fetch<BookClubMeeting | null>(BOOK_CLUB_MEETING_QUERY, { slug: meetingSlug }, { next: { revalidate: 60 } });
}

/** Builds a page for each meeting at build time; meetings added later are built on first visit. */
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
        title: `${splitBookTitle(meeting.title).mainTitle} | WACHH Book Club`,
        description: `WACHH Book Club discussion of ${meeting.title}${meeting.author ? ` by ${meeting.author}` : ""}, ${formatMeetingDate(meeting.startsAt)}.`,
    };
}

/** One row of the When / Where / Spaces left list beside the cover. */
function MeetingFact({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="border-b border-[var(--line)] py-4">
            <dt className="text-[15px] font-bold text-[var(--navy)]">{label}</dt>
            <dd className="m-0 mt-1 text-[16px] leading-[1.5] tabular-nums">{children}</dd>
        </div>
    );
}

/** A rich-text section (Abstract, About the Author) written by editors in Sanity. */
function RichTextSection({ id, title, body }: { id: string; title: string; body?: PortableTextBlock[] }) {
    if (!body?.length) return null;
    return (
        <section className="mt-14 first:mt-0" aria-labelledby={id}>
            <h2 id={id} className="mb-5 font-[family-name:var(--serif)] text-[30px] leading-[1.2] font-normal text-[var(--navy)] md:text-[36px]">{title}</h2>
            <div className="max-w-[68ch] [&_a]:font-bold [&_a]:text-[var(--teal)] [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-[color] [&_a]:duration-150 [&_a:hover]:text-[var(--navy)] [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-5 [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&>*:last-child]:mb-0">
                <PortableText value={body} />
            </div>
        </section>
    );
}

/** One Book Club meeting: title and cover, the meeting details and registration, then the Abstract and About the Author. */
export default async function BookClubMeetingPage({ params }: PageProps) {
    const { meetingSlug } = await params;
    const [meeting, upcomingMeetings] = await Promise.all([fetchMeeting(meetingSlug), fetchUpcomingMeetings()]);

    // unknown or deleted meetings show the 404 page
    if (!meeting) notFound();

    const { mainTitle, subtitle } = splitBookTitle(meeting.title);
    const spacesLeft = formatSpacesLeft(meeting.spacesLeft);
    const isFull = meeting.spacesLeft === 0;
    const hasEnded = hasMeetingEnded(meeting);
    const otherMeetings = upcomingMeetings.filter((upcomingMeeting) => upcomingMeeting.slug !== meetingSlug);

    return (
        <div className="min-h-svh bg-white font-[var(--sans)] text-[17px] leading-[1.65] text-[var(--charcoal)] md:text-[18px]">
            <main>
                <section className="bg-[var(--navy)] text-white">
                    <div className={`${contentWidth} grid py-12 md:py-16 md:pb-20 ${twoColumnLayout}`}>
                        <div>
                            <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-300" aria-label="Breadcrumb">
                                {[{ label: "Home", href: "/" }, { label: "Programs", href: "/programs" }, { label: "Book Club", href: "/programs/book-club" }].map((breadcrumb) => (
                                    <React.Fragment key={breadcrumb.label}>
                                        <Link className="underline underline-offset-4 hover:text-white" href={breadcrumb.href}>{breadcrumb.label}</Link>
                                        <span aria-hidden="true">/</span>
                                    </React.Fragment>
                                ))}
                                <span aria-current="page">{mainTitle}</span>
                            </nav>
                            <h1 className="font-[family-name:var(--serif)] text-[44px] leading-[1.05] font-normal text-balance text-white md:text-[62px]">{mainTitle}</h1>
                            {subtitle && <p className="mt-4 max-w-[620px] text-[19px] leading-[1.45] text-balance text-slate-200 md:text-[21px]">{subtitle}</p>}
                            {meeting.author && <p className="mt-5 font-bold text-[var(--header-gold)]">by {meeting.author}</p>}
                        </div>
                    </div>
                </section>

                <div className={`${contentWidth} grid gap-12 pb-16 md:pb-24 ${twoColumnLayout}`}>
                    {/* on phones the details come first; on desktop the cover overlaps the banner */}
                    <aside className="pt-10 md:order-2 md:-mt-[260px] md:pt-0" aria-label="Meeting details">
                        <div className="w-[160px] md:w-auto">
                            <BookCover meeting={meeting} sizes="(min-width: 768px) 270px, 160px" />
                        </div>
                        <dl className="mt-8 border-t-2 border-[var(--gold)]">
                            <MeetingFact label="When">
                                <time dateTime={meeting.startsAt}>{formatMeetingDate(meeting.startsAt)}</time>
                                <span className="block">{formatMeetingTime(meeting.startsAt, meeting.endsAt)}</span>
                            </MeetingFact>
                            {meeting.location && <MeetingFact label="Where">{meeting.location}</MeetingFact>}
                            {spacesLeft && !hasEnded && (
                                <MeetingFact label="Spaces left">
                                    <span className={isFull ? "font-bold text-[var(--navy)]" : ""}>{isFull ? "Full: this discussion has no spaces left" : spacesLeft}</span>
                                </MeetingFact>
                            )}
                        </dl>
                        <div className="mt-6">
                            {hasEnded ? (
                                <p className="m-0 font-bold text-[var(--navy)]">This discussion has taken place.</p>
                            ) : (
                                <>
                                    {!isFull && <RegisterButton meeting={meeting} className="w-full" />}
                                    {!isFull && !meeting.registerUrl && <p className="m-0 font-bold text-[var(--navy)]">Registration opens one month before</p>}
                                    <p className="mt-3 mb-0 text-[15px] leading-[1.5] text-[#5b6168]">Free for members and the public. Limited to 30 participants.</p>
                                </>
                            )}
                        </div>
                    </aside>

                    <div className="md:order-1 md:pt-16">
                        <RichTextSection id="abstract" title="Abstract" body={meeting.abstract} />
                        <RichTextSection id="about-the-author" title="About the Author" body={meeting.aboutTheAuthor} />
                    </div>
                </div>

                {otherMeetings.length > 0 && (
                    <section className="border-t border-[var(--line)] bg-[var(--off-white)]" aria-labelledby="more-upcoming-discussions">
                        <div className={`${contentWidth} py-16 md:py-20`}>
                            <h2 id="more-upcoming-discussions" className="mb-10 font-[family-name:var(--serif)] text-[32px] leading-[1.15] font-normal text-[var(--navy)] md:text-[40px]">More Upcoming Discussions</h2>
                            <MeetingShelf meetings={otherMeetings} label="More upcoming Book Club discussions" />
                        </div>
                    </section>
                )}

                <div className={`${contentWidth} border-t border-[var(--line)] py-10`}>
                    <Link className={`inline-flex min-h-11 items-center gap-2 font-bold text-[var(--teal)] underline underline-offset-4 ${textLinkHover} ${focusRing}`} href="/programs/book-club">
                        <ArrowLeft size={17} aria-hidden="true" /> Back to the Book Club
                    </Link>
                </div>
            </main>
        </div>
    );
}
