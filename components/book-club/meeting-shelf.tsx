"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BookCover, focusRing } from "./book-cover";
import { formatMeetingShortDate, formatSpacesLeft, splitBookTitle, type BookClubMeetingSummary } from "./meeting-details";

const arrowButtonStyle = `grid size-11 place-items-center bg-[var(--navy)] text-white hover:bg-[var(--teal)] disabled:cursor-default disabled:opacity-30 disabled:hover:bg-[var(--navy)] [transition:background-color_150ms_ease,opacity_150ms_ease,scale_150ms_ease-out] active:scale-[0.94] ${focusRing}`;

/** A sideways-scrolling row of book covers: three books per view on larger screens, two on phones. */
export function MeetingShelf({ meetings, label }: { meetings: BookClubMeetingSummary[]; label: string }) {
    const shelfId = useId();
    const shelfRef = useRef<HTMLUListElement>(null);
    const [canScrollBack, setCanScrollBack] = useState(false);
    const [canScrollForward, setCanScrollForward] = useState(false);

    // the arrows only show when there are more books than fit
    useEffect(() => {
        const shelf = shelfRef.current;
        if (!shelf) return;
        const updateArrows = () => {
            setCanScrollBack(shelf.scrollLeft > 4);
            setCanScrollForward(shelf.scrollLeft + shelf.clientWidth < shelf.scrollWidth - 4);
        };
        updateArrows();
        shelf.addEventListener("scroll", updateArrows, { passive: true });
        const resizeObserver = new ResizeObserver(updateArrows);
        resizeObserver.observe(shelf);
        return () => {
            shelf.removeEventListener("scroll", updateArrows);
            resizeObserver.disconnect();
        };
    }, [meetings.length]);

    /** Scrolls the row by one full view of books. */
    const scrollShelf = (direction: 1 | -1) => {
        const shelf = shelfRef.current;
        if (!shelf) return;
        const shelfStyle = getComputedStyle(shelf);
        const bookGap = parseFloat(shelfStyle.columnGap) || 0;
        const visibleWidth = shelf.clientWidth - parseFloat(shelfStyle.paddingLeft) - parseFloat(shelfStyle.paddingRight);
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        shelf.scrollBy({ left: direction * (visibleWidth + bookGap), behavior: prefersReducedMotion ? "auto" : "smooth" });
    };

    const hasMoreBooksThanFit = canScrollBack || canScrollForward;

    return (
        <div>
            {/* the padding leaves room for the cover shadows inside the scroll area */}
            <ul
                id={shelfId}
                ref={shelfRef}
                aria-label={label}
                className="-mx-2 -my-4 flex snap-x snap-mandatory scroll-px-2 list-none gap-6 overflow-x-auto overscroll-x-contain px-2 pt-4 pb-8 [scrollbar-width:none] md:gap-10 [&::-webkit-scrollbar]:hidden"
            >
                {meetings.map((meeting) => {
                    const { mainTitle, subtitle } = splitBookTitle(meeting.title);
                    const spacesLeft = formatSpacesLeft(meeting.spacesLeft);
                    return (
                        <li className="w-[calc((100%-24px)/2)] shrink-0 snap-start sm:w-[calc((100%-48px)/3)] md:w-[calc((100%-80px)/3)]" key={meeting._id}>
                            <Link className={`group block ${focusRing}`} href={`/programs/book-club/${meeting.slug}`}>
                                <div className="max-w-[240px] transition-[translate] duration-200 ease-out group-hover:-translate-y-1 motion-reduce:transition-none">
                                    <BookCover meeting={meeting} sizes="(min-width: 640px) 240px, 45vw" />
                                </div>
                                <time dateTime={meeting.startsAt} className="mt-5 block font-[family-name:var(--serif)] text-[19px] leading-[1.3] text-[var(--navy)] tabular-nums">{formatMeetingShortDate(meeting.startsAt)}</time>
                                <span className="mt-1 block max-w-[300px] font-bold leading-[1.35] text-balance text-[var(--charcoal)] underline-offset-4 group-hover:underline">{mainTitle}</span>
                                {subtitle && <span className="sr-only">: {subtitle}</span>}
                                {meeting.author && <span className="mt-1 block text-[15px] text-[#5b6168]">{meeting.author}</span>}
                                {spacesLeft && <span className={`mt-2 block text-[15px] tabular-nums ${meeting.spacesLeft === 0 ? "font-bold text-[var(--navy)]" : "text-[var(--teal)]"}`}>{spacesLeft}</span>}
                            </Link>
                        </li>
                    );
                })}
            </ul>

            {hasMoreBooksThanFit && (
                <div className="mt-4 flex justify-end gap-2">
                    <button type="button" aria-controls={shelfId} aria-label="Show earlier books" disabled={!canScrollBack} onClick={() => scrollShelf(-1)} className={arrowButtonStyle}>
                        <ChevronLeft size={20} aria-hidden="true" />
                    </button>
                    <button type="button" aria-controls={shelfId} aria-label="Show more books" disabled={!canScrollForward} onClick={() => scrollShelf(1)} className={arrowButtonStyle}>
                        <ChevronRight size={20} aria-hidden="true" />
                    </button>
                </div>
            )}
        </div>
    );
}
