import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageHero from "@/components/page-hero";
import { focusRing, textLinkHover } from "@/components/book-club/book-club-meetings";
import { programPages } from "@/components/programs/programs-data";

const pastSelections = programPages["past-book-club-selections"];

export const metadata: Metadata = {
    title: `${pastSelections.title} | WACHH Programs`,
    description: pastSelections.deck,
};

const contentWidth = "mx-auto w-[min(1040px,calc(100%-48px))]";

/** The Book Club archive: every past selection, grouped by year, newest first. */
export default function PastBookClubSelectionsPage() {
    // dates look like "Oct 8, 2026", so the year is the last four digits
    const booksByYear = (pastSelections.books ?? []).reduce<Record<string, NonNullable<typeof pastSelections.books>>>((booksGroupedByYear, book) => {
        const year = book.date.match(/\d{4}$/)?.[0] ?? "Earlier";
        (booksGroupedByYear[year] ??= []).push(book);
        return booksGroupedByYear;
    }, {});
    // newest year first
    const years = Object.keys(booksByYear).sort((earlierYear, laterYear) => laterYear.localeCompare(earlierYear));

    return (
        <div className="min-h-svh bg-white font-[var(--sans)] text-[17px] leading-[1.65] text-[var(--charcoal)] md:text-[18px]">
            <main>
                <PageHero
                    breadcrumbs={[{ label: "Home", href: "/" }, { label: "Programs", href: "/programs" }, { label: "Book Club", href: "/programs/book-club" }, { label: pastSelections.title }]}
                    title={pastSelections.title}
                >
                    {pastSelections.deck}
                </PageHero>

                <div className={`${contentWidth} flex flex-col gap-12 py-16 md:gap-16 md:py-20`}>
                    {years.map((year) => (
                        <section className="grid gap-4 md:grid-cols-[140px_minmax(0,1fr)] md:gap-10" key={year} aria-labelledby={`year-${year}`}>
                            <h2 id={`year-${year}`} className="self-start font-[family-name:var(--serif)] text-[40px] leading-none font-normal text-[var(--navy)] tabular-nums md:sticky md:top-8 md:text-[48px]">{year}</h2>
                            <ol className="m-0 list-none border-t-2 border-[var(--gold)] p-0">
                                {booksByYear[year].map((book) => (
                                    <li className="grid gap-1 border-b border-[var(--line)] py-5 sm:grid-cols-[110px_minmax(0,1fr)] sm:gap-6" key={`${book.date}-${book.title}`}>
                                        <span className="font-[family-name:var(--serif)] text-[19px] text-[var(--navy)] tabular-nums">{book.date.replace(`, ${year}`, "")}</span>
                                        <span>
                                            <span className="block font-bold leading-[1.4] text-[var(--charcoal)]">{book.title}</span>
                                            <span className="text-[15px] text-[#5b6168]">by {book.author}</span>
                                        </span>
                                    </li>
                                ))}
                            </ol>
                        </section>
                    ))}
                </div>

                <div className={`${contentWidth} border-t border-[var(--line)] py-10`}>
                    <Link className={`inline-flex min-h-11 items-center gap-2 font-bold text-[var(--teal)] underline underline-offset-4 ${textLinkHover} ${focusRing}`} href="/programs/book-club">
                        <ArrowLeft size={17} aria-hidden="true" /> Back to the Book Club
                    </Link>
                </div>
            </main>
        </div>
    );
}
