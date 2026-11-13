import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { focusRing, textLinkHover } from "@/components/book-club/book-cover";
import { splitBookTitle } from "@/components/book-club/meeting-details";
import { type Event, guestPolicy, wildApricotBaseUrl } from "@/lib/site";
import { ProgramCarousel } from "./program-carousel";
import { formatProgramDate, formatProgramTime, programHref, registrationHref } from "./program-details";
import { SpeakerPortrait } from "./speaker-portrait";

// same widths, headings and button as the Book Club page
const contentWidth = "mx-auto w-[min(1040px,calc(100%-48px))]";
const sectionHeadingStyle = "font-[family-name:var(--serif)] text-[32px] leading-[1.15] font-normal text-[var(--navy)] md:text-[40px]";
const registerButtonTransition = "[transition:background-color_150ms_var(--ease-color),scale_150ms_var(--ease-out-strong)] active:scale-[0.97]";

/** The next speaker program with photo, time, place, guest fee and Register button. */
function NextProgram({ event }: { event: Event }) {
    const { mainTitle, subtitle } = splitBookTitle(event.title);
    const detailsHref = programHref(event);

    return (
        <div className="grid items-center gap-8 md:grid-cols-[250px_minmax(0,1fr)] md:gap-16">
            <Link href={detailsHref} tabIndex={-1} aria-hidden="true" className="w-[170px] md:w-auto">
                <SpeakerPortrait event={event} sizes="(min-width: 768px) 250px, 170px" />
            </Link>
            <div>
                <h2 id="next-program" className="font-[family-name:var(--serif)] text-[22px] leading-[1.3] font-normal text-[var(--teal)] tabular-nums md:text-[25px]">
                    Next Program, <time dateTime={event.date}>{formatProgramDate(event)}</time>
                </h2>
                <h3 className="mt-4 font-[family-name:var(--serif)] text-[38px] leading-[1.06] font-normal text-balance text-[var(--navy)] md:text-[54px]">
                    <Link className={`underline-offset-[6px] hover:underline ${focusRing}`} href={detailsHref}>{mainTitle}</Link>
                </h3>
                {subtitle && <p className="mt-3 max-w-[560px] text-[19px] leading-[1.45] text-balance text-[#3e4650]">{subtitle}</p>}
                {event.speaker && <p className="mt-3 font-bold text-[var(--charcoal)]">with {event.speaker}</p>}

                <dl className="mt-7 grid gap-x-10 gap-y-4 border-t border-[var(--line)] pt-6 sm:grid-cols-[auto_minmax(0,1fr)_auto]">
                    <div>
                        <dt className="text-[15px] font-bold text-[var(--navy)]">Time</dt>
                        <dd className="m-0 tabular-nums">{formatProgramTime(event)}</dd>
                    </div>
                    {event.venue && (
                        <div>
                            <dt className="text-[15px] font-bold text-[var(--navy)]">Place</dt>
                            <dd className="m-0">{event.venue}</dd>
                        </div>
                    )}
                    <div>
                        <dt className="text-[15px] font-bold text-[var(--navy)]">Guests</dt>
                        <dd className="m-0 tabular-nums">${guestPolicy.preRegisterFee} in advance</dd>
                    </div>
                </dl>

                <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                    <a className={`inline-flex min-h-12 items-center justify-center bg-[var(--gold)] px-7 font-bold text-[var(--navy)] hover:bg-[var(--header-gold)] ${registerButtonTransition} ${focusRing}`} href={registrationHref(event)}>
                        Register<span className="sr-only"> as a guest for {event.speaker ?? event.title}</span>
                    </a>
                    <Link className={`inline-flex min-h-11 items-center gap-2 font-bold text-[var(--teal)] underline underline-offset-4 ${textLinkHover} ${focusRing}`} href={detailsHref}>
                        About this program <ArrowRight size={17} aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

/** The next program on an off-white band like Book Club, then the rest of the season three at a time with home page controls. */
export default function UpcomingPrograms({ events }: { events: Event[] }) {
    const [nextProgram, ...laterPrograms] = events;

    return (
        <>
            {/* the header's Events tab links to #events */}
            <section id="events" className="border-y border-[var(--line)] bg-[var(--off-white)]" aria-labelledby={nextProgram ? "next-program" : "upcoming-programs"}>
                <div className={`${contentWidth} py-14 md:py-20`}>
                    {nextProgram ? (
                        <NextProgram event={nextProgram} />
                    ) : (
                        <>
                            <h2 id="upcoming-programs" className={sectionHeadingStyle}>Upcoming Programs</h2>
                            <p className="mt-4 max-w-[640px]">
                                The next speaker programs will be posted here soon.{" "}
                                <a href={wildApricotBaseUrl + "/guest-policy"} target="_blank" rel="noopener noreferrer" className={`font-bold text-[var(--teal)] underline underline-offset-4 ${textLinkHover} ${focusRing}`}>See current events and guest registration</a>.
                            </p>
                        </>
                    )}
                </div>
            </section>

            {laterPrograms.length > 0 && (
                <section className="bg-white" aria-labelledby="coming-up">
                    <div className={`${contentWidth} py-16 md:py-20`}>
                        <h2 id="coming-up" className={`${sectionHeadingStyle} mb-10`}>Coming Up</h2>
                        <ProgramCarousel events={laterPrograms} label="Upcoming Distinguished Speaker Series programs" />
                    </div>
                </section>
            )}
        </>
    );
}
