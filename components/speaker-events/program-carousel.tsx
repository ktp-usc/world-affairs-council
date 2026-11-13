"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { focusRing } from "@/components/book-club/book-cover";
import { splitBookTitle } from "@/components/book-club/meeting-details";
import type { Event } from "@/lib/site";
import { formatProgramShortDate, programHref } from "./program-details";
import { SpeakerPortrait } from "./speaker-portrait";

// arrows and dots laid out like the home page carousel, in gold on the white section
const controlButtonStyle = `inline-flex size-11 shrink-0 items-center justify-center text-[var(--gold)] transition-[background-color,color] duration-150 hover:bg-[var(--gold)]/10 hover:text-[var(--navy)] max-[600px]:w-10 ${focusRing}`;
const dotStyle = "size-[9px] rounded-full border border-[var(--gold)] transition-[background-color,box-shadow] duration-250 group-hover:bg-[var(--gold)]/40 motion-reduce:transition-none";
const activeDotStyle = "bg-[var(--gold)] shadow-[0_0_0_3px_white,0_0_0_4px_var(--gold)]";

/** Book Club style speaker cards, three at a time (two on phones), that people step through with home page style arrows and dots. */
export function ProgramCarousel({ events, label }: { events: Event[]; label: string }) {
    const [perView, setPerView] = useState(3);
    const [page, setPage] = useState(0);
    const touchStart = useRef<{ x: number; y: number } | null>(null);

    const pages = Array.from({ length: Math.ceil(events.length / perView) }, (_, index) => events.slice(index * perView, index * perView + perView));
    const currentPage = Math.min(page, pages.length - 1);

    // two cards on phones, three on larger screens
    useEffect(() => {
        const phone = window.matchMedia("(max-width: 639px)");
        const update = () => setPerView(phone.matches ? 2 : 3);
        update();
        phone.addEventListener("change", update);
        return () => phone.removeEventListener("change", update);
    }, []);

    /** Shows a group of speakers, wrapping around at either end like the home page carousel. */
    const goTo = (next: number) => setPage((next + pages.length) % pages.length);

    return (
        <section
            aria-roledescription="carousel"
            aria-label={label}
            className="touch-pan-y"
            onKeyDown={(event) => {
                if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                    event.preventDefault();
                    goTo(currentPage + (event.key === "ArrowLeft" ? -1 : 1));
                }
            }}
            onTouchStart={(event) => { touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
            onTouchCancel={() => { touchStart.current = null; }}
            onTouchEnd={(event) => {
                const start = touchStart.current;
                touchStart.current = null;
                if (!start) return;
                const dx = event.changedTouches[0].clientX - start.x;
                const dy = event.changedTouches[0].clientY - start.y;
                if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) goTo(currentPage + (dx < 0 ? 1 : -1));
            }}
        >
            {/* every group sits in the same spot and fades in, like the home page slides */}
            <div className="grid" aria-live="polite">
                {pages.map((group, position) => (
                    <ul
                        key={group[0].slug}
                        aria-roledescription="slide"
                        aria-label={`${position + 1} of ${pages.length}`}
                        aria-hidden={position !== currentPage}
                        inert={position !== currentPage}
                        className={`[grid-area:1/1] grid list-none grid-cols-2 gap-6 pt-2 pb-4 transition-[opacity,visibility] duration-[800ms] ease-in-out sm:grid-cols-3 md:gap-10 motion-reduce:transition-none ${position === currentPage ? "visible z-[1] opacity-100" : "invisible opacity-0"}`}
                    >
                        {group.map((event) => {
                            const { mainTitle, subtitle } = splitBookTitle(event.title);
                            return (
                                <li className="text-center" key={event.slug}>
                                    <Link className={`group block ${focusRing}`} href={programHref(event)}>
                                        <div className="mx-auto max-w-[240px] transition-[translate] duration-200 ease-out group-hover:-translate-y-1 motion-reduce:transition-none">
                                            <SpeakerPortrait event={event} sizes="(min-width: 640px) 240px, 45vw" />
                                        </div>
                                        <time dateTime={event.date} className="mt-5 block font-[family-name:var(--serif)] text-[19px] leading-[1.3] text-[var(--navy)] tabular-nums">{formatProgramShortDate(event)}</time>
                                        <span className="mx-auto mt-1 block max-w-[300px] font-bold leading-[1.35] text-balance text-[var(--charcoal)] underline-offset-4 group-hover:underline">{mainTitle}</span>
                                        {subtitle && <span className="sr-only">: {subtitle}</span>}
                                        {event.speaker && <span className="mt-1 block text-[15px] text-[#5b6168]">{event.speaker}</span>}
                                        {event.kind === "Global Speaker" && <span className="mt-2 block text-[15px] text-[var(--teal)]">Global Speakers Program</span>}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                ))}
            </div>

            {pages.length > 1 && (
                <div className="mx-auto mt-8 flex w-fit items-center gap-1">
                    <button type="button" aria-label="Previous speakers" onClick={() => goTo(currentPage - 1)} className={controlButtonStyle}>
                        <ArrowLeft size={19} aria-hidden="true" />
                    </button>
                    <div className="flex" aria-label="Choose a group of speakers">
                        {pages.map((group, position) => (
                            <button
                                key={group[0].slug}
                                type="button"
                                aria-label={`Show speakers ${position + 1} of ${pages.length}`}
                                aria-current={position === currentPage ? "true" : undefined}
                                onClick={() => goTo(position)}
                                className={`group inline-flex h-11 w-[30px] items-center justify-center max-[600px]:w-7 ${focusRing}`}
                            >
                                <span className={`${dotStyle} ${position === currentPage ? activeDotStyle : ""}`} />
                            </button>
                        ))}
                    </div>
                    <button type="button" aria-label="Next speakers" onClick={() => goTo(currentPage + 1)} className={controlButtonStyle}>
                        <ArrowRight size={19} aria-hidden="true" />
                    </button>
                </div>
            )}
        </section>
    );
}
