import Link from "next/link";
import Image from "next/image";
import { Award, BookOpen, CalendarDays, Globe2, MapPin, Users } from "lucide-react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ProgramGallery from "./program-gallery";
import type { ProgramFact, ProgramPageData } from "./programs-data";

const icons = {
    calendar: CalendarDays,
    location: MapPin,
    users: Users,
    book: BookOpen,
    globe: Globe2,
    award: Award,
};

const bookCoverColors = ["bg-[var(--navy)]", "bg-[#4e6b72]", "bg-[#764837]", "bg-[#4d546b]"];

function Fact({ fact }: { fact: ProgramFact }) {
    const Icon = icons[fact.icon];
    return (
        <div className="flex min-h-[100px] items-center gap-4 border-b border-[#d9d7d1] p-6 last:border-0 md:min-h-[132px] md:border-r md:border-b-0 md:last:border-r-0">
            <Icon className="h-8 w-8 shrink-0 stroke-[1.7] text-[var(--teal)]" aria-hidden="true" />
            <span className="flex flex-col text-base"><strong className="text-[13px] tracking-[.08em] text-[var(--navy)] uppercase">{fact.label}</strong>{fact.value}</span>
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
            <Header />
            <main>
                <section className="bg-[var(--navy)]">
                    <div
                        className="h-[260px] bg-cover bg-center md:h-[370px]"
                        style={{ backgroundImage: `url(${program.heroImage})` }}
                        role="img"
                        aria-label={program.heroAlt}
                    />
                    <div className="bg-[var(--navy)] py-10 text-white md:py-14">
                        <div className="mx-auto w-[min(1200px,calc(100%-48px))]">
                            <nav className="mb-7 flex flex-wrap gap-2 text-sm text-slate-300" aria-label="Breadcrumb"><Link className="text-white underline underline-offset-4" href="/">Home</Link><span>/</span><Link className="text-white underline underline-offset-4" href="/programs">Programs</Link><span>/</span><span>{program.title}</span></nav>
                            <p className="mb-3 text-[13px] font-bold tracking-[.14em] text-[#d9b87d] uppercase">{program.eyebrow}</p>
                            <h1 className="max-w-[900px] font-[family-name:var(--serif)] text-[42px] leading-[1.08] font-medium tracking-[-.02em] text-white md:text-[68px]">{program.title}</h1>
                            <p className="mt-4 max-w-[760px] text-lg text-slate-200 md:text-[21px]">{program.deck}</p>
                        </div>
                    </div>
                </section>

                <div className="mx-auto w-[min(1200px,calc(100%-48px))] py-14 md:py-22">
                    <section className="max-w-[850px]">
                        <p className="mb-3 text-[13px] font-bold tracking-[.14em] text-[var(--teal)] uppercase">Program overview</p>
                        <h2 className="font-[family-name:var(--serif)] text-[34px] leading-[1.15] font-medium tracking-[-.02em] text-[var(--navy)] md:text-[42px]">{program.overviewTitle}</h2>
                        <p className="mt-5 text-lg md:text-[21px]">{program.overview}</p>
                    </section>

                    {program.quote && (
                        <figure className="mt-12 max-w-[850px] border-t-4 border-[var(--gold)] bg-[var(--off-white)] p-7 md:px-9 md:py-8">
                            <blockquote className="m-0 font-[family-name:var(--serif)] text-[23px] leading-[1.45] font-medium text-[var(--navy)] md:text-[27px]">“{program.quote.text}”</blockquote>
                            <figcaption className="mt-4 font-bold text-[var(--teal)]">{program.quote.attribution}</figcaption>
                        </figure>
                    )}

                    <div className="my-12 grid border-y border-[#d9d7d1] md:my-20 md:grid-cols-3">
                        {program.facts.map((fact) => <Fact fact={fact} key={fact.label} />)}
                    </div>

                    {program.logoImage && (
                        <div className="-mt-5 mb-16 max-w-[520px] border border-[#d9d7d1] bg-white px-8 py-7 md:-mt-8 md:mb-20">
                            <Image className="h-auto w-full" src={program.logoImage} alt={`${program.title} logo`} width={960} height={360} />
                        </div>
                    )}

                    {program.sections.map((section) => (
                        <section className="mb-16 max-w-[840px] md:mb-20" key={section.title}>
                            {section.eyebrow && <p className="mb-3 text-[13px] font-bold tracking-[.14em] text-[var(--teal)] uppercase">{section.eyebrow}</p>}
                            <h2 className="mb-5 font-[family-name:var(--serif)] text-[34px] leading-[1.15] font-medium tracking-[-.02em] text-[var(--navy)] md:text-[42px]">{section.title}</h2>
                            {section.paragraphs?.map((paragraph) => <p className="text-[#444]" key={paragraph}>{paragraph}</p>)}
                            {section.bullets && <ul className="mt-7 grid list-none gap-x-8 gap-y-3 p-0 md:grid-cols-2">{section.bullets.map((bullet) => <li className="relative border-t border-[#d9d7d1] py-3.5 pr-3 pl-7 before:absolute before:left-1 before:text-[10px] before:text-[var(--gold)] before:content-['◆']" key={bullet}>{bullet}</li>)}</ul>}
                        </section>
                    ))}

                    {program.slug === "great-decisions" && (
                        <section className="mb-16 grid items-start gap-5 border-t-4 border-[var(--gold)] bg-[var(--off-white)] px-6 py-8 sm:grid-cols-[105px_minmax(0,1fr)] md:mb-24 md:grid-cols-[260px_minmax(0,1fr)] md:items-center md:gap-14 md:p-11">
                            <div className="flex justify-center">
                                <Image className="max-h-[190px] w-full object-contain drop-shadow-xl md:max-h-[350px]" src="/programs/great-decisions/briefing-book.png" alt="2027 Great Decisions Briefing Book" width={962} height={1280} />
                            </div>
                            <div>
                                <p className="mb-3 text-[13px] font-bold tracking-[.14em] text-[var(--teal)] uppercase">Program reading</p>
                                <h2 className="font-[family-name:var(--serif)] text-[28px] leading-[1.15] font-medium text-[var(--navy)] md:text-[36px]">2027 Great Decisions Briefing Book</h2>
                                <p className="mt-4 text-[#484848]">Each participant will need a 2027 Great Decisions Briefing Book for the program. Print and electronic editions can be purchased from the Foreign Policy Association beginning in December 2026, with print copies expected in early January.</p>
                                <a className="mt-7 inline-flex min-h-[50px] items-center border-2 border-[var(--navy)] px-5 py-3 font-bold text-[var(--navy)]" href="https://www.fpa.org/">Visit the Foreign Policy Association</a>
                            </div>
                        </section>
                    )}

                    {program.events && (
                        <section className="mt-16 md:mt-20">
                            <p className="mb-3 text-[13px] font-bold tracking-[.14em] text-[var(--teal)] uppercase">2026–2027 season</p>
                            <h2 className="mb-7 font-[family-name:var(--serif)] text-[34px] leading-[1.15] font-medium tracking-[-.02em] text-[var(--navy)] md:text-[42px]">Upcoming speakers</h2>
                            <div className="border-t border-[#d9d7d1]">
                                {program.events.map((event) => {
                                    const [month, day] = event.date.split(" ");
                                    return (
                                        <article className="grid min-h-40 border-b border-[#d9d7d1] sm:grid-cols-[112px_1fr]" key={event.name}>
                                            <div className="flex items-center justify-start gap-2 bg-[var(--navy)] px-5 py-3 text-white sm:flex-col sm:justify-center sm:p-4"><span className="text-[14px] font-bold tracking-[.12em]">{month}</span><strong className="font-[family-name:var(--serif)] text-[34px] leading-none font-semibold sm:text-[52px]">{day}</strong></div>
                                            <div className="px-0 py-6 sm:px-8"><h3 className="font-[family-name:var(--serif)] text-[25px] font-medium text-[var(--navy)]">{event.name}</h3><p className="my-1.5">{event.detail}</p><span className="text-[15px] text-[#646464]">10:00 AM · First Presbyterian Church{event.note ? ` · ${event.note}` : ""}</span></div>
                                        </article>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                    {program.topics && (
                        <section className="mt-16 md:mt-20">
                            <p className="mb-3 text-[13px] font-bold tracking-[.14em] text-[var(--teal)] uppercase">The year ahead</p>
                            <h2 className="mb-7 font-[family-name:var(--serif)] text-[34px] leading-[1.15] font-medium tracking-[-.02em] text-[var(--navy)] md:text-[42px]">2027 discussion topics</h2>
                            <div className="grid border-t border-l border-[#d9d7d1] md:grid-cols-2">
                                {program.topics.map((topic, index) => {
                                    const title = typeof topic === "string" ? topic : topic.title;
                                    return <article className="min-h-40 border-r border-b border-[#d9d7d1] p-7" key={title}><span className="text-[13px] font-bold tracking-[.12em] text-[var(--gold)]">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-3.5 font-[family-name:var(--serif)] text-2xl leading-[1.25] font-medium text-[var(--navy)]">{title}</h3>{typeof topic !== "string" && <p className="mt-3 text-base leading-[1.55] text-[#555]">{topic.description}</p>}</article>;
                                })}
                            </div>
                        </section>
                    )}

                    {program.featuredBooks && (
                        <section className="mt-16 md:mt-20">
                            <p className="mb-3 text-[13px] font-bold tracking-[.14em] text-[var(--teal)] uppercase">Upcoming discussions</p>
                            <h2 className="mb-7 font-[family-name:var(--serif)] text-[34px] leading-[1.15] font-medium tracking-[-.02em] text-[var(--navy)] md:text-[42px]">2026–2027 Book Club selections</h2>
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
                        <section className="mt-16 md:mt-20">
                            <p className="mb-3 text-[13px] font-bold tracking-[.14em] text-[var(--teal)] uppercase">Program archive</p>
                            <h2 className="mb-7 font-[family-name:var(--serif)] text-[34px] leading-[1.15] font-medium tracking-[-.02em] text-[var(--navy)] md:text-[42px]">Global speakers through the years</h2>
                            <div className="flex flex-col gap-14">
                                {program.speakerArchive.map((season) => (
                                    <section key={season.season}>
                                        <h3 className="mb-5 border-b-2 border-[var(--gold)] pb-2.5 font-[family-name:var(--serif)] text-[28px] font-medium text-[var(--teal)]">{season.season}</h3>
                                        <div className="grid gap-5 md:grid-cols-2">
                                            {season.speakers.map((speaker) => (
                                                <article className="grid min-h-[220px] grid-cols-[108px_minmax(0,1fr)] overflow-hidden border border-[#d9d7d1] bg-[var(--off-white)] md:min-h-[250px] md:grid-cols-[145px_minmax(0,1fr)]" key={`${speaker.date}-${speaker.name}`}>
                                                    {speaker.image && <Image className="h-full min-h-[220px] w-[108px] object-cover object-top md:min-h-[250px] md:w-[145px]" src={speaker.image} alt={`Portrait of ${speaker.name}`} width={300} height={400} />}
                                                    <div className="p-4.5 md:p-6"><p className="mb-4 text-[13px] font-bold tracking-[.08em] text-[var(--teal)] uppercase">{speaker.date}</p><h4 className="font-[family-name:var(--serif)] text-[21px] leading-[1.2] font-medium text-[var(--navy)] md:text-2xl">{speaker.name}</h4><p className="mt-2.5 text-[15px] leading-[1.45] text-[#555]">{speaker.role}</p><p className="mt-2.5 text-[15px] leading-[1.45]"><strong>Topic:</strong> {speaker.topic}</p></div>
                                                </article>
                                            ))}
                                        </div>
                                    </section>
                                ))}
                            </div>
                        </section>
                    )}

                    {program.discussionGroups && (
                        <section className="mt-16 md:mt-20">
                            <p className="mb-3 text-[13px] font-bold tracking-[.14em] text-[var(--teal)] uppercase">2026 schedule reference</p>
                            <h2 className="mb-7 font-[family-name:var(--serif)] text-[34px] leading-[1.15] font-medium tracking-[-.02em] text-[var(--navy)] md:text-[42px]">Discussion groups</h2>
                            <p className="-mt-3 mb-7 max-w-[760px] text-[#555]">The 2027 schedule will be announced later. These 2026 groups show the program&apos;s meeting format and locations.</p>
                            <div className="grid gap-4.5 md:grid-cols-3">
                                {program.discussionGroups.map((group) => <article className="border-t-4 border-[var(--teal)] bg-[var(--off-white)] p-7" key={group.name}><h3 className="mb-3 font-[family-name:var(--serif)] text-[25px] font-medium text-[var(--navy)]">{group.name}</h3><strong className="text-[15px] text-[var(--teal)]">{group.time}</strong><p className="my-3 text-base">{group.location}</p><small className="leading-[1.5] text-[#5d5d5d]">{group.dates}</small></article>)}
                            </div>
                        </section>
                    )}

                    {program.testimonial && (
                        <figure className="mb-16 grid grid-cols-[86px_minmax(0,1fr)] items-center gap-5 border-t-4 border-[var(--gold)] bg-[var(--off-white)] p-6 md:mb-20 md:grid-cols-[145px_minmax(0,1fr)] md:gap-8 md:p-8">
                            {program.testimonial.image && <Image className="h-[86px] w-[86px] rounded-full object-cover md:h-[145px] md:w-[145px]" src={program.testimonial.image} alt={program.testimonial.attribution} width={438} height={418} />}
                            <div><blockquote className="m-0 font-[family-name:var(--serif)] text-[21px] leading-[1.45] font-medium text-[var(--navy)] md:text-[26px]">“{program.testimonial.text}”</blockquote><figcaption className="mt-4 font-bold text-[var(--teal)]">{program.testimonial.attribution}</figcaption></div>
                        </figure>
                    )}

                    {program.cards && (
                        <section className="mt-16 md:mt-20">
                            <p className="mb-3 text-[13px] font-bold tracking-[.14em] text-[var(--teal)] uppercase">Explore</p>
                            <h2 className="mb-7 font-[family-name:var(--serif)] text-[34px] leading-[1.15] font-medium tracking-[-.02em] text-[var(--navy)] md:text-[42px]">{program.slug === "student-programs" ? "Programs for students" : program.slug === "book-club" ? "Recent selections" : "Featured global voices"}</h2>
                            <div className={`grid gap-4.5 ${program.cards.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
                                {program.cards.map((card) => (
                                    <article className={`flex min-h-60 flex-col items-start overflow-hidden border-t-4 border-[var(--gold)] bg-[var(--off-white)] ${card.image ? "pb-7" : "p-7"}`} key={card.title}>
                                        {card.image && <div className="mb-6 h-[190px] w-full bg-cover bg-center" style={{ backgroundImage: `url(${card.image})` }} role="img" aria-label="" />}
                                        {card.kicker && <p className={`mb-4 text-[13px] font-bold tracking-[.08em] text-[var(--teal)] uppercase ${card.image ? "mx-7" : ""}`}>{card.kicker}</p>}
                                        <h3 className={`font-[family-name:var(--serif)] text-[25px] leading-[1.2] font-medium text-[var(--navy)] ${card.image ? "mx-7" : ""}`}>{card.title}</h3>
                                        <p className={`text-[#505050] ${card.image ? "mx-7" : ""}`}>{card.text}</p>
                                        {card.href && <Link className={`mt-auto font-bold text-[var(--teal)] ${card.image ? "mx-7" : ""}`} href={card.href}>Explore the program <span aria-hidden="true">→</span></Link>}
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
                        <section className="mt-16 md:mt-20">
                            <p className="mb-3 text-[13px] font-bold tracking-[.14em] text-[var(--teal)] uppercase">Watch</p><h2 className="mb-7 font-[family-name:var(--serif)] text-[34px] leading-[1.15] font-medium tracking-[-.02em] text-[var(--navy)] md:text-[42px]">{program.video.title}</h2>
                            <div className="aspect-video overflow-hidden bg-black"><iframe className="h-full w-full border-0" src={program.video.embedUrl} title={program.video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>
                            <p className="mt-4 max-w-[780px] text-[#555]">{program.video.caption}</p>
                        </section>
                    )}

                    {program.sponsors && (
                        <section className="mt-16 md:mt-20">
                            <p className="mb-3 text-[13px] font-bold tracking-[.14em] text-[var(--teal)] uppercase">With gratitude</p><h2 className="mb-7 font-[family-name:var(--serif)] text-[34px] leading-[1.15] font-medium tracking-[-.02em] text-[var(--navy)] md:text-[42px]">2026–2027 sponsors</h2>
                            <div className="grid gap-6 md:grid-cols-[2fr_1fr]">{program.sponsors.map((group) => <section className="border-t-4 border-[var(--gold)] bg-[var(--off-white)] p-7" key={group.level}><h3 className="font-[family-name:var(--serif)] text-[25px] font-medium text-[var(--navy)]">{group.level}</h3><ul className="mt-5 columns-1 list-none p-0 first:md:columns-2">{group.names.map((name) => <li className="break-inside-avoid border-b border-[rgba(27,42,65,.08)] py-1 text-base" key={name}>{name}</li>)}</ul></section>)}</div>
                        </section>
                    )}

                    <aside className="mt-16 grid gap-6 border-l-[6px] border-[var(--gold)] bg-[var(--off-white)] p-7 md:mt-24 md:grid-cols-[1fr_auto] md:items-center md:p-8">
                        <div><p className="mb-3 text-[13px] font-bold tracking-[.14em] text-[var(--teal)] uppercase">{program.callout.eyebrow}</p><h2 className="font-[family-name:var(--serif)] text-[29px] font-medium text-[var(--navy)]">{program.callout.title}</h2><p className="mt-2 max-w-[750px]">{program.callout.text}</p></div>
                        <span className="hidden text-[35px] text-[var(--teal)] md:block" aria-hidden="true">→</span>
                    </aside>
                </div>

                <section className="bg-[var(--navy)] py-14 text-white md:py-16">
                    <div className="mx-auto grid w-[min(1200px,calc(100%-48px))] items-end gap-10 md:grid-cols-[1fr_auto]">
                        <div><p className="mb-3 text-[13px] font-bold tracking-[.14em] text-[#d9b87d] uppercase">Join the conversation</p><h2 className="max-w-[690px] font-[family-name:var(--serif)] text-[34px] leading-[1.16] font-medium text-white md:text-[39px]">Become part of a community that thinks globally.</h2></div>
                        <div className="flex flex-col gap-3 sm:flex-row"><span className="inline-flex min-h-[50px] items-center justify-center bg-[var(--gold)] px-5 py-3 font-bold text-[var(--navy)]">Become a Member</span><Link className="inline-flex min-h-[50px] items-center justify-center border-2 border-white px-5 py-3 font-bold text-white hover:bg-white hover:text-[var(--navy)]" href="/programs">Explore Programs</Link></div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
