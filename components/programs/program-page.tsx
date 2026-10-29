import Link from "next/link";
import { Award, BookOpen, CalendarDays, Globe2, MapPin, Users } from "lucide-react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import type { ProgramFact, ProgramPageData } from "./programs-data";

const icons = {
    calendar: CalendarDays,
    location: MapPin,
    users: Users,
    book: BookOpen,
    globe: Globe2,
    award: Award,
};

function Fact({ fact }: { fact: ProgramFact }) {
    const Icon = icons[fact.icon];
    return (
        <div className="programs-fact">
            <Icon aria-hidden="true" />
            <span><strong>{fact.label}</strong>{fact.value}</span>
        </div>
    );
}

export default function ProgramPage({ program }: { program: ProgramPageData }) {
    return (
        <div className="programs-mockup">
            <Header />
            <main>
                <section className="programs-hero">
                    <div
                        className="programs-hero-image"
                        style={{ backgroundImage: `url(${program.heroImage})` }}
                        role="img"
                        aria-label={program.heroAlt}
                    />
                    <div className="programs-hero-title">
                        <div className="programs-width">
                            <nav aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/programs">Programs</Link><span>/</span><span>{program.title}</span></nav>
                            <p className="programs-eyebrow programs-gold">{program.eyebrow}</p>
                            <h1>{program.title}</h1>
                            <p>{program.deck}</p>
                        </div>
                    </div>
                </section>

                <div className="programs-main programs-width">
                    <section className="programs-overview">
                        <p className="programs-eyebrow">Program overview</p>
                        <h2>{program.overviewTitle}</h2>
                        <p>{program.overview}</p>
                    </section>

                    <div className="programs-facts">
                        {program.facts.map((fact) => <Fact fact={fact} key={fact.label} />)}
                    </div>

                    {program.sections.map((section) => (
                        <section className="programs-copy-section" key={section.title}>
                            {section.eyebrow && <p className="programs-eyebrow">{section.eyebrow}</p>}
                            <h2>{section.title}</h2>
                            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                            {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                        </section>
                    ))}

                    {program.events && (
                        <section className="programs-list-section">
                            <p className="programs-eyebrow">2026–2027 season</p>
                            <h2>Upcoming speakers</h2>
                            <div className="programs-event-list">
                                {program.events.map((event) => {
                                    const [month, day] = event.date.split(" ");
                                    return (
                                        <article key={event.name}>
                                            <div className="programs-date"><span>{month}</span><strong>{day}</strong></div>
                                            <div><h3>{event.name}</h3><p>{event.detail}</p><span>10:00 AM · First Presbyterian Church</span></div>
                                        </article>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                    {program.topics && (
                        <section className="programs-list-section">
                            <p className="programs-eyebrow">The year ahead</p>
                            <h2>2027 discussion topics</h2>
                            <div className="programs-topic-grid">
                                {program.topics.map((topic, index) => <article key={topic}><span>{String(index + 1).padStart(2, "0")}</span><h3>{topic}</h3></article>)}
                            </div>
                        </section>
                    )}

                    {program.cards && (
                        <section className="programs-list-section">
                            <p className="programs-eyebrow">Explore</p>
                            <h2>{program.slug === "student-programs" ? "Programs for students" : program.slug === "book-club" ? "Recent selections" : "Featured global voices"}</h2>
                            <div className="programs-feature-grid">
                                {program.cards.map((card) => (
                                    <article key={card.title}>
                                        {card.kicker && <p className="programs-card-kicker">{card.kicker}</p>}
                                        <h3>{card.title}</h3>
                                        <p>{card.text}</p>
                                        {card.href && <Link href={card.href}>Explore the program <span aria-hidden="true">→</span></Link>}
                                    </article>
                                ))}
                            </div>
                            {program.slug === "book-club" && <Link className="programs-outline-button" href="/programs/past-book-club-selections">Browse all past selections</Link>}
                        </section>
                    )}

                    {program.books && (
                        <section className="programs-list-section">
                            <div className="programs-book-grid">
                                {program.books.map((book, index) => (
                                    <article key={`${book.date}-${book.title}`}>
                                        <div className={`programs-book-cover cover-${index % 4}`}><span>WACHH Book Club</span><strong>{book.title}</strong><small>{book.author}</small></div>
                                        <p>{book.date}</p><h3>{book.title}</h3><span>{book.author}</span>
                                    </article>
                                ))}
                            </div>
                        </section>
                    )}

                    <aside className="programs-callout">
                        <div><p className="programs-eyebrow">{program.callout.eyebrow}</p><h2>{program.callout.title}</h2><p>{program.callout.text}</p></div>
                        <span aria-hidden="true">→</span>
                    </aside>
                </div>

                <section className="programs-cta">
                    <div className="programs-width">
                        <div><p className="programs-eyebrow programs-gold">Join the conversation</p><h2>Become part of a community that thinks globally.</h2></div>
                        <div><span className="programs-button programs-button-gold">Become a Member</span><Link className="programs-button programs-button-light" href="/programs">Explore Programs</Link></div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
