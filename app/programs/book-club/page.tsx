import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/page-hero";
import RichText from "@/components/rich-text";
import { BookCover, MeetingShelf, RegisterButton, fetchPastMeetings, fetchUpcomingMeetings, focusRing, textLinkHover } from "@/components/book-club/book-club-meetings";
import { formatArchiveDate, formatMeetingDate, formatMeetingTime, formatSpacesLeft, splitBookTitle, type BookClubMeetingSummary } from "@/components/book-club/meeting-details";
import { fetchProgram } from "@/components/programs/fetch-programs";
import { hasItems, hasRichText } from "@/components/programs/program-types";

// the program document in Sanity that holds this page's header, overview and details
const bookClubSlug = "book-club";

export async function generateMetadata(): Promise<Metadata> {
    const bookClub = await fetchProgram(bookClubSlug);
    if (!bookClub) return {};
    return {
        title: `${bookClub.title} | WACHH Programs`,
        description: bookClub.overviewText || bookClub.deck || undefined,
    };
}

const contentWidth = "mx-auto w-[min(1040px,calc(100%-48px))]";
const sectionHeadingStyle = "font-[family-name:var(--serif)] text-[32px] leading-[1.15] font-normal text-[var(--navy)] md:text-[40px]";

/** The next discussion with its cover, time, place, spaces left and Register button. */
function NextDiscussion({ meeting }: { meeting: BookClubMeetingSummary }) {
    const { mainTitle, subtitle } = splitBookTitle(meeting.title);
    const meetingHref = `/programs/book-club/${meeting.slug}`;
    const spacesLeft = formatSpacesLeft(meeting.spacesLeft);
    const isFull = meeting.spacesLeft === 0;

    return (
        <div className="grid items-center gap-8 md:grid-cols-[250px_minmax(0,1fr)] md:gap-16">
            <Link href={meetingHref} tabIndex={-1} aria-hidden="true" className="w-[170px] md:w-auto">
                <BookCover meeting={meeting} sizes="(min-width: 768px) 250px, 170px" />
            </Link>
            <div>
                <h2 id="next-discussion" className="font-[family-name:var(--serif)] text-[22px] leading-[1.3] font-normal text-[var(--teal)] tabular-nums md:text-[25px]">
                    Next Discussion, <time dateTime={meeting.startsAt}>{formatMeetingDate(meeting.startsAt)}</time>
                </h2>
                <h3 className="mt-4 font-[family-name:var(--serif)] text-[38px] leading-[1.06] font-normal text-balance text-[var(--navy)] md:text-[54px]">
                    <Link className={`underline-offset-[6px] hover:underline ${focusRing}`} href={meetingHref}>{mainTitle}</Link>
                </h3>
                {subtitle && <p className="mt-3 max-w-[560px] text-[19px] leading-[1.45] text-balance text-[#3e4650]">{subtitle}</p>}
                {meeting.author && <p className="mt-3 font-bold text-[var(--charcoal)]">by {meeting.author}</p>}

                <dl className="mt-7 grid gap-x-10 gap-y-4 border-t border-[var(--line)] pt-6 sm:grid-cols-[auto_minmax(0,1fr)_auto]">
                    <div>
                        <dt className="text-[15px] font-bold text-[var(--navy)]">Time</dt>
                        <dd className="m-0 tabular-nums">{formatMeetingTime(meeting.startsAt, meeting.endsAt)}</dd>
                    </div>
                    {meeting.location && (
                        <div>
                            <dt className="text-[15px] font-bold text-[var(--navy)]">Place</dt>
                            <dd className="m-0">{meeting.location}</dd>
                        </div>
                    )}
                    {spacesLeft && (
                        <div>
                            <dt className="text-[15px] font-bold text-[var(--navy)]">Spaces left</dt>
                            <dd className={`m-0 tabular-nums ${isFull ? "font-bold text-[var(--navy)]" : ""}`}>{isFull ? "Full" : spacesLeft}</dd>
                        </div>
                    )}
                </dl>

                <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                    {!isFull && <RegisterButton meeting={meeting} />}
                    {!isFull && !meeting.registerUrl && <p className="m-0 font-bold text-[var(--navy)]">Registration opens one month before</p>}
                    <Link className={`inline-flex min-h-11 items-center gap-2 font-bold text-[var(--teal)] underline underline-offset-4 ${textLinkHover} ${focusRing}`} href={meetingHref}>
                        About this book <ArrowRight size={17} aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

/** The Book Club page: the program details, the upcoming discussions from Sanity, and the most recent past books. */
export default async function BookClubPage() {
    const [bookClub, upcomingMeetings, pastMeetings] = await Promise.all([fetchProgram(bookClubSlug), fetchUpcomingMeetings(), fetchPastMeetings()]);
    if (!bookClub) notFound();
    const [nextMeeting, ...laterMeetings] = upcomingMeetings;

    return (
        <div className="min-h-svh bg-white font-[var(--sans)] text-[17px] leading-[1.65] text-[var(--charcoal)] md:text-[18px]">
            <main>
                <PageHero
                    breadcrumbs={[{ label: "Home", href: "/" }, { label: "Programs", href: "/programs" }, { label: bookClub.title }]}
                    title={bookClub.title}
                    image={bookClub.heroImage ? { src: bookClub.heroImage, alt: bookClub.heroAlt ?? "", position: bookClub.heroPosition ?? undefined } : undefined}
                >
                    {bookClub.deck}
                </PageHero>

                <section className={`${contentWidth} grid gap-12 py-16 md:grid-cols-[minmax(0,1fr)_330px] md:gap-16 md:py-20`} aria-label="About the Book Club">
                    <div className="max-w-[620px]">
                        {hasRichText(bookClub.overview) && <RichText value={bookClub.overview} className="space-y-4 font-[family-name:var(--serif)] text-[22px] leading-[1.45] text-[var(--navy)] md:text-[25px]" />}
                        <p className="mt-6 mb-0">Read the month&apos;s book at your own pace, then join the conversation. Each discussion has 30 seats, so register once registration opens a month ahead.</p>
                    </div>
                    {hasItems(bookClub.facts) && (
                        <dl className="m-0 self-start border-t-2 border-[var(--gold)]">
                            {bookClub.facts.map((fact) => (
                                <div className="border-b border-[var(--line)] py-4" key={fact._key}>
                                    <dt className="text-[15px] font-bold text-[var(--navy)]">{fact.label}</dt>
                                    <dd className="m-0 mt-1 text-[16px] leading-[1.5]">{fact.value}</dd>
                                </div>
                            ))}
                        </dl>
                    )}
                </section>

                <section className="border-y border-[var(--line)] bg-[var(--off-white)]" aria-labelledby={nextMeeting ? "next-discussion" : "upcoming-discussions"}>
                    <div className={`${contentWidth} py-14 md:py-20`}>
                        {nextMeeting ? (
                            <NextDiscussion meeting={nextMeeting} />
                        ) : (
                            <>
                                <h2 id="upcoming-discussions" className={sectionHeadingStyle}>Upcoming Discussions</h2>
                                <p className="mt-4 max-w-[640px]">The next discussions will be posted here soon. Registration for each one opens a month in advance.</p>
                            </>
                        )}
                    </div>
                </section>

                {laterMeetings.length > 0 && (
                    <section className={`${contentWidth} py-16 md:py-20`} aria-labelledby="coming-up">
                        <h2 id="coming-up" className={`${sectionHeadingStyle} mb-10`}>Coming Up</h2>
                        <MeetingShelf meetings={laterMeetings} label="Upcoming Book Club discussions" />
                    </section>
                )}

                {pastMeetings.length > 0 && (
                    <section className="border-t border-[var(--line)] bg-[var(--off-white)]" aria-labelledby="recent-books">
                        <div className={`${contentWidth} py-16 md:py-20`}>
                            <h2 id="recent-books" className={sectionHeadingStyle}>Recent Books</h2>
                            <ol className="mt-8 max-w-[820px] list-none border-t border-[var(--line)] p-0">
                                {pastMeetings.slice(0, 5).map((meeting) => {
                                    const { monthDay, year } = formatArchiveDate(meeting.startsAt);
                                    return (
                                        <li className="grid gap-1 border-b border-[var(--line)] py-5 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6" key={meeting._id}>
                                            <time className="font-[family-name:var(--serif)] text-[19px] text-[var(--navy)] tabular-nums" dateTime={meeting.startsAt}>{`${monthDay}, ${year}`}</time>
                                            <span>
                                                <span className="block font-bold leading-[1.4] text-[var(--charcoal)]">{meeting.title}</span>
                                                {meeting.author && <span className="text-[15px] text-[#5b6168]">by {meeting.author}</span>}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ol>
                            <Link className={`mt-8 inline-flex min-h-11 items-center gap-2 font-bold text-[var(--teal)] underline underline-offset-4 ${textLinkHover} ${focusRing}`} href="/programs/past-book-club-selections">
                                All {pastMeetings.length} past selections <ArrowRight size={17} aria-hidden="true" />
                            </Link>
                        </div>
                    </section>
                )}

                <div className={`${contentWidth} border-t border-[var(--line)] py-10`}>
                    <Link className={`inline-flex min-h-11 items-center font-bold text-[var(--teal)] underline underline-offset-4 ${textLinkHover} ${focusRing}`} href="/programs">Back to all programs</Link>
                </div>
            </main>
        </div>
    );
}
