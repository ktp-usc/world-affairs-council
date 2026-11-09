import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/page-hero";
import ProgramGallery from "./program-gallery";
import BookClubMeetings from "@/components/book-club/book-club-meetings";
import type { ProgramFact, ProgramPageData } from "./programs-data";

const bookCoverColors = ["bg-[var(--navy)]", "bg-[#4e6b72]", "bg-[#764837]", "bg-[#4d546b]"];

function Fact({ fact }: { fact: ProgramFact }) {
    return (
        <div className="grid gap-1 border-b border-[#d9d7d1] py-4 last:border-0 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6">
            <dt className="font-bold text-[var(--navy)]">{fact.label}</dt>
            <dd className="m-0 text-[#4f4f4f]">{fact.value}</dd>
        </div>
    );
}

export default function ProgramPage({ program }: { program: ProgramPageData }) {
    const booksByYear = program.books?.reduce<Record<string, typeof program.books>>((years, book) => {
        const year = book.date.match(/\d{4}$/)?.[0] ?? "Archive";
        (years[year] ??= []).push(book);
        return years;
    }, {});

    return (
        <div className="min-h-screen bg-white font-[var(--sans)] text-[17px] leading-[1.6] text-[var(--charcoal)] md:text-[18px]">
            <main>
                <PageHero breadcrumbs={[{ label: "Home", href: "/" }, { label: "Programs", href: "/programs" }, { label: program.title }]} title={program.title}>
                    {program.deck}
                </PageHero>

                <div className="mx-auto w-[min(1040px,calc(100%-48px))] py-12 md:py-18">
                    <section className="max-w-[820px]">
                        <h2 className="font-[family-name:var(--serif)] text-[30px] font-medium text-[var(--navy)] md:text-[36px]">About the program</h2>
                        <p className="mt-4 text-lg text-[#444] md:text-xl">{program.overview}</p>
                    </section>

                    <section className="my-10 max-w-[820px] border-t border-[#d9d7d1] pt-8 md:my-14">
                        <h2 className="font-[family-name:var(--serif)] text-[26px] font-medium text-[var(--navy)] md:text-[30px]">Program details</h2>
                        <dl className="mt-4 border-y border-[#d9d7d1]">{program.facts.map((fact) => <Fact fact={fact} key={fact.label} />)}</dl>
                    </section>

                    {program.logoImage && (
                        <div className="mb-12 max-w-[440px] border border-[#d9d7d1] bg-white px-7 py-6">
                            <Image className="h-auto w-full" src={program.logoImage} alt={`${program.title} logo`} width={960} height={360} />
                        </div>
                    )}

                    {program.sections.map((section) => (
                        <section className="mb-12 max-w-[820px] border-t border-[#d9d7d1] pt-8" key={section.title}>
                            <h2 className="mb-4 font-[family-name:var(--serif)] text-[28px] leading-[1.2] font-medium text-[var(--navy)] md:text-[32px]">{section.title}</h2>
                            <div className="space-y-4">{section.paragraphs?.map((paragraph) => <p className="m-0 text-[#444]" key={paragraph}>{paragraph}</p>)}</div>
                            {section.bullets && <ul className="mt-5 list-disc space-y-2 pl-6 text-[#444]">{section.bullets.map((bullet) => <li className="pl-1" key={bullet}>{bullet}</li>)}</ul>}
                        </section>
                    ))}

                    {program.slug === "great-decisions" && (
                        <section className="mb-14 grid items-start gap-6 border border-[#d9d7d1] px-6 py-7 sm:grid-cols-[105px_minmax(0,1fr)] md:grid-cols-[190px_minmax(0,1fr)] md:items-center md:gap-10 md:p-8">
                            <div className="flex justify-center">
                                <Image className="max-h-[180px] w-full object-contain md:max-h-[260px]" src="/programs/great-decisions/briefing-book.png" alt="2027 Great Decisions Briefing Book" width={962} height={1280} />
                            </div>
                            <div>
                                <h2 className="font-[family-name:var(--serif)] text-[27px] leading-[1.2] font-medium text-[var(--navy)] md:text-[31px]">2027 Great Decisions Briefing Book</h2>
                                <p className="mt-4 text-[#484848]">Each participant will need a 2027 Great Decisions Briefing Book for the program. Print and electronic editions can be purchased from the Foreign Policy Association beginning in December 2026, with print copies expected in early January.</p>
                                <a className="mt-5 inline-flex min-h-11 items-center font-bold text-[var(--teal)] underline underline-offset-4" href="https://www.fpa.org/">Visit the Foreign Policy Association</a>
                            </div>
                        </section>
                    )}

                    {program.events && (
                        <section className="mt-14 border-t border-[#d9d7d1] pt-10 md:mt-18">
                            <h2 className="mb-6 font-[family-name:var(--serif)] text-[30px] font-medium text-[var(--navy)] md:text-[34px]">2026–2027 speaker schedule</h2>
                            <div className="overflow-x-auto border-y border-[#d9d7d1]">
                                <table className="w-full min-w-[680px] border-collapse text-left">
                                    <thead className="bg-[var(--off-white)] text-sm text-[var(--navy)]"><tr><th className="w-28 px-4 py-3">Date</th><th className="w-52 px-4 py-3">Presenter</th><th className="px-4 py-3">Topic</th></tr></thead>
                                    <tbody>{program.events.map((event) => (
                                        <tr className="border-t border-[#d9d7d1] align-top" key={event.name}>
                                            <td className="px-4 py-4 font-bold text-[var(--teal)]">{event.date}</td>
                                            <td className="px-4 py-4 font-bold text-[var(--navy)]">{event.name}</td>
                                            <td className="px-4 py-4 text-[#444]">{event.detail}{event.note ? <span className="mt-1 block text-sm text-[#666]">{event.note}</span> : null}</td>
                                        </tr>
                                    ))}</tbody>
                                </table>
                            </div>
                        </section>
                    )}

                    {program.topics && (
                        <section className="mt-14 border-t border-[#d9d7d1] pt-10 md:mt-18">
                            <h2 className="mb-6 font-[family-name:var(--serif)] text-[30px] font-medium text-[var(--navy)] md:text-[34px]">2027 discussion topics</h2>
                            <div className="border-y border-[#d9d7d1]">
                                {program.topics.map((topic, index) => {
                                    const title = typeof topic === "string" ? topic : topic.title;
                                    return <article className="grid gap-2 border-b border-[#d9d7d1] px-1 py-5 last:border-0 sm:grid-cols-[44px_minmax(0,1fr)]" key={title}><span className="font-bold text-[var(--teal)]">{String(index + 1).padStart(2, "0")}</span><div><h3 className="font-[family-name:var(--serif)] text-[23px] leading-[1.25] font-medium text-[var(--navy)]">{title}</h3>{typeof topic !== "string" && <p className="mt-2 text-base text-[#555]">{topic.description}</p>}</div></article>;
                                })}
                            </div>
                        </section>
                    )}

                    {/* Book Club meetings are edited in Sanity (Studio → Book Club Meeting) */}
                    {program.slug === "book-club" && <BookClubMeetings />}

                    {program.featuredBooks && (
                        <section className="mt-14 border-t border-[#d9d7d1] pt-10 md:mt-18">
                            <h2 className="mb-6 font-[family-name:var(--serif)] text-[30px] font-medium text-[var(--navy)] md:text-[34px]">2026–2027 Book Club selections</h2>
                            <div className="border-t border-[#d9d7d1]">
                                {program.featuredBooks.map((book) => (
                                    <article className="grid grid-cols-[105px_minmax(0,1fr)] gap-5 border-b border-[#d9d7d1] py-8 md:grid-cols-[210px_minmax(0,1fr)] md:gap-10 md:py-11" key={book.title}>
                                        <div className="flex min-h-[170px] justify-center md:min-h-[310px]"><Image className="max-h-[190px] w-full object-contain drop-shadow-xl md:max-h-[330px]" src={book.image} alt={`Cover of ${book.title} by ${book.author}`} width={520} height={800} /></div>
                                        <div><p className="mb-4 text-[13px] font-bold tracking-[.08em] text-[var(--teal)] uppercase">{book.date}</p><h3 className="font-[family-name:var(--serif)] text-[27px] leading-[1.15] font-medium text-[var(--navy)] md:text-[32px]">{book.title}</h3><p className="mt-1 mb-4 font-bold text-[var(--teal)]">by {book.author}</p><p className="text-[#484848]">{book.description}</p><span className="mt-2 inline-block text-sm font-bold tracking-[.04em] text-[var(--navy)] uppercase">Registration opens one month in advance</span></div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    )}

                    {program.speakerArchive && (
                        <section className="mt-14 border-t border-[#d9d7d1] pt-10 md:mt-18">
                            <h2 className="mb-7 font-[family-name:var(--serif)] text-[30px] font-medium text-[var(--navy)] md:text-[34px]">Past global speakers</h2>
                            <div className="flex flex-col gap-10">
                                {program.speakerArchive.map((season) => (
                                    <section key={season.season}>
                                        <h3 className="mb-4 border-b border-[#d9d7d1] pb-2 font-[family-name:var(--serif)] text-[26px] font-medium text-[var(--navy)]">{season.season}</h3>
                                        <div className="divide-y divide-[#d9d7d1]">
                                            {season.speakers.map((speaker) => (
                                                <article className="grid gap-5 py-5 sm:grid-cols-[90px_minmax(0,1fr)]" key={`${speaker.date}-${speaker.name}`}>
                                                    {speaker.image ? <Image className="h-[112px] w-[90px] object-cover object-top" src={speaker.image} alt={`Portrait of ${speaker.name}`} width={300} height={400} /> : <div className="hidden sm:block" />}
                                                    <div><p className="mb-1 text-sm font-bold text-[var(--teal)]">{speaker.date}</p><h4 className="font-[family-name:var(--serif)] text-[22px] leading-[1.2] font-medium text-[var(--navy)]">{speaker.name}</h4><p className="mt-1 text-[15px] text-[#555]">{speaker.role}</p><p className="mt-2 text-[15px]"><strong>Topic:</strong> {speaker.topic}</p></div>
                                                </article>
                                            ))}
                                        </div>
                                    </section>
                                ))}
                            </div>
                        </section>
                    )}

                    {program.discussionGroups && (
                        <section className="mt-14 border-t border-[#d9d7d1] pt-10 md:mt-18">
                            <h2 className="mb-4 font-[family-name:var(--serif)] text-[30px] font-medium text-[var(--navy)] md:text-[34px]">Discussion groups</h2>
                            <p className="mb-6 max-w-[760px] text-[#555]">The 2027 schedule will be announced later. These 2026 groups show the program&apos;s meeting format and locations.</p>
                            <div className="divide-y divide-[#d9d7d1] border-y border-[#d9d7d1]">
                                {program.discussionGroups.map((group) => <article className="grid gap-2 py-5 md:grid-cols-[220px_minmax(0,1fr)] md:gap-8" key={group.name}><div><h3 className="font-[family-name:var(--serif)] text-[23px] font-medium text-[var(--navy)]">{group.name}</h3><strong className="text-[15px] text-[var(--teal)]">{group.time}</strong></div><div><p className="m-0 text-base">{group.location}</p><small className="mt-1 block leading-[1.5] text-[#5d5d5d]">{group.dates}</small></div></article>)}
                            </div>
                        </section>
                    )}

                    {program.cards && (
                        <section className="mt-14 border-t border-[#d9d7d1] pt-10 md:mt-18">
                            <h2 className="mb-6 font-[family-name:var(--serif)] text-[30px] font-medium text-[var(--navy)] md:text-[34px]">{program.slug === "student-programs" ? "Student programs" : program.slug === "book-club" ? "Recent selections" : "Featured speakers"}</h2>
                            <div className="divide-y divide-[#d9d7d1] border-y border-[#d9d7d1]">
                                {program.cards.map((card) => (
                                    <article className={`grid gap-5 py-6 ${card.image ? "sm:grid-cols-[180px_minmax(0,1fr)]" : ""}`} key={card.title}>
                                        {card.image && <div className="min-h-36 bg-cover bg-center" style={{ backgroundImage: `url(${card.image})` }} role="img" aria-label="" />}
                                        <div><h3 className="font-[family-name:var(--serif)] text-[24px] leading-[1.2] font-medium text-[var(--navy)]">{card.title}</h3><p className="mt-2 text-[#505050]">{card.text}</p>{card.href && <Link className="mt-3 inline-block font-bold text-[var(--teal)] underline-offset-4 hover:underline" href={card.href}>View program</Link>}</div>
                                    </article>
                                ))}
                            </div>
                            {program.slug === "book-club" && <Link className="mt-7 inline-flex min-h-[50px] items-center border-2 border-[var(--navy)] px-5 py-3 font-bold text-[var(--navy)]" href="/programs/past-book-club-selections">Browse all past selections</Link>}
                        </section>
                    )}

                    {program.books && (
                        <section className="mt-16 md:mt-20">
                            {program.slug === "past-book-club-selections" ? (
                                <div className="flex flex-col gap-11 md:gap-14">
                                    {Object.entries(booksByYear ?? {}).map(([year, books]) => <section className="grid gap-3 md:grid-cols-[120px_minmax(0,1fr)] md:gap-8" key={year}><h2 className="self-start font-[family-name:var(--serif)] text-[38px] font-medium text-[var(--teal)] md:sticky md:top-6">{year}</h2><div className="border-t-2 border-[var(--gold)]">{books?.map((book) => <article className="grid min-h-[106px] grid-cols-[82px_minmax(0,1fr)] items-start gap-3.5 border-b border-[#d9d7d1] py-5 md:grid-cols-[112px_minmax(0,1fr)] md:gap-6" key={`${book.date}-${book.title}`}><time className="text-sm font-bold text-[var(--teal)] uppercase">{book.date.replace(`, ${year}`, "")}</time><div><h3 className="font-[family-name:var(--serif)] text-[21px] leading-[1.3] font-medium text-[var(--navy)]">{book.title}</h3><p className="mt-1 text-[15px] text-[#626262]">by {book.author}</p></div></article>)}</div></section>)}
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-x-3.5 gap-y-8 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
                                    {program.books.map((book, index) => (
                                        <article key={`${book.date}-${book.title}`}>
                                            <div className={`flex aspect-[2/3] flex-col justify-between p-3.5 text-white shadow-xl md:p-5 ${bookCoverColors[index % 4]}`}><span className="text-[11px] font-bold tracking-[.1em] uppercase">WACHH Book Club</span><strong className="font-[family-name:var(--serif)] text-[17px] leading-[1.12] font-semibold md:text-[23px]">{book.title}</strong><small>{book.author}</small></div>
                                            <p className="mt-4 mb-1 text-xs font-bold tracking-[.06em] text-[var(--teal)] uppercase">{book.date}</p><h3 className="font-[family-name:var(--serif)] text-xl leading-[1.25] font-medium text-[var(--navy)]">{book.title}</h3><span className="text-[15px] text-[#555]">{book.author}</span>
                                        </article>
                                    ))}
                                </div>
                            )}
                        </section>
                    )}

                    {program.gallery && <ProgramGallery images={program.gallery} title={program.galleryTitle ?? `${program.title} photo gallery`} />}

                    {program.video && (
                        <section className="mt-14 border-t border-[#d9d7d1] pt-10 md:mt-18">
                            <h2 className="mb-6 font-[family-name:var(--serif)] text-[30px] font-medium text-[var(--navy)] md:text-[34px]">{program.video.title}</h2>
                            <div className="aspect-video overflow-hidden bg-black"><iframe className="h-full w-full border-0" src={program.video.embedUrl} title={program.video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>
                            <p className="mt-4 max-w-[780px] text-[#555]">{program.video.caption}</p>
                        </section>
                    )}

                    {program.sponsors && (
                        <section className="mt-14 border-t border-[#d9d7d1] pt-10 md:mt-18">
                            <h2 className="mb-6 font-[family-name:var(--serif)] text-[30px] font-medium text-[var(--navy)] md:text-[34px]">2026–2027 sponsors</h2>
                            <div className="grid gap-8 md:grid-cols-[2fr_1fr]">{program.sponsors.map((group) => <section key={group.level}><h3 className="border-b border-[#d9d7d1] pb-2 font-[family-name:var(--serif)] text-[23px] font-medium text-[var(--navy)]">{group.level}</h3><ul className="mt-3 columns-1 list-none p-0 first:md:columns-2">{group.names.map((name) => <li className="break-inside-avoid py-1 text-base" key={name}>{name}</li>)}</ul></section>)}</div>
                        </section>
                    )}

                    <aside className="mt-14 max-w-[820px] border-t border-[#d9d7d1] bg-[var(--off-white)] p-6 md:mt-18 md:p-7">
                        <h2 className="font-[family-name:var(--serif)] text-[26px] font-medium text-[var(--navy)]">{program.callout.title}</h2>
                        <p className="mt-2">{program.callout.text}</p>
                    </aside>

                    <Link className="mt-12 inline-flex min-h-11 items-center font-bold text-[var(--teal)] underline underline-offset-4" href="/programs">Back to all programs</Link>
                </div>
            </main>
        </div>
    );
}
