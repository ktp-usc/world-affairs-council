import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import HomeCarousel, { type HomeSlide } from "@/components/home-carousel";
import NewsletterSignup from "@/components/newsletter-signup";
import { isSpeakerSeries, parseDate } from "@/lib/site";
import { fetchAbout } from "@/sanity/lib/about";
import { fetchUpcomingEvents } from "@/sanity/lib/events";
import { fetchLandingPage } from "@/sanity/lib/landing-page";
import "./home.css";

// Refresh published content every minute, using the Council's time zone.
export const revalidate = 60;

export default async function Home() {
    const [events, about, content] = await Promise.all([fetchUpcomingEvents(), fetchAbout(), fetchLandingPage()]);
    const upcoming = events.slice(0, content.events.limit);
    const featureSlides: HomeSlide[] = content.hero.slides.map((slide, index) => ({
        image: slide.imagePath, alt: slide.alt, label: slide.label,
        content: <>
            {index === 0 ? <h1>{slide.title}</h1> : <h2>{slide.title}</h2>}
            <p>{slide.body}</p>
            <Link className="home-button home-button--gold" href={slide.link.href}>{slide.link.label} <ArrowRight size={18} aria-hidden="true" /></Link>
        </>,
    }));

    return (
        <main className="home-page">
            <HomeCarousel id="home-features" label={content.hero.label} slides={featureSlides} variant="hero" interval={content.hero.interval * 1000} />

            <section className="home-programs" id="programs" aria-labelledby="home-programs-title">
                <div className="content-width home-programs-grid">
                    <div className="home-programs-copy">
                        <h2 id="home-programs-title">{content.programs.title.split("\n").map((line, index) => <span key={index}>{index > 0 && <br />}{line}</span>)}</h2>
                        <p>{content.programs.body}</p>
                        <div className="home-program-links">
                            {content.programs.links.map((program) => (
                                <Link key={program._key} href={program.href}>{program.label}<ArrowRight size={18} aria-hidden="true" /></Link>
                            ))}
                        </div>
                        <Link className="text-link" href={content.programs.allLink.href}>{content.programs.allLink.label} <ArrowRight size={17} aria-hidden="true" /></Link>
                    </div>
                    <HomeCarousel id="program-photos" label={content.programs.galleryLabel} slides={content.programs.photos.map(photo => ({image: photo.imagePath, alt: photo.alt, label: photo.label}))} />
                </div>
            </section>

            <section className="home-events" id="calendar" aria-labelledby="home-events-title">
                <div className="content-width">
                    <div className="home-section-heading">
                        <div>
                            <h2 id="home-events-title">{content.events.title}</h2>
                        </div>
                        <a className="text-link" href={content.events.calendarLink.href}><CalendarDays size={18} aria-hidden="true" /> {content.events.calendarLink.label}</a>
                    </div>
                    {upcoming.length ? (
                        <div className="home-event-grid">
                            {upcoming.map((event) => (
                                <article className="home-event" key={event.slug}>
                                    <time dateTime={event.date}>{parseDate(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
                                    <h3><Link href={isSpeakerSeries(event) ? `/get-involved/guests/${event.slug}` : event.kind === "Book Club" ? "/programs/book-club" : "/programs/student-programs"}>{event.title}</Link></h3>
                                    <p>{event.start} · {event.venue}</p>
                                    <Link className="text-link" href={isSpeakerSeries(event) ? `/get-involved/guests/${event.slug}` : event.kind === "Book Club" ? "/programs/book-club" : "/programs/student-programs"}>{content.events.detailsLabel} <ArrowRight size={17} aria-hidden="true" /></Link>
                                </article>
                            ))}
                        </div>
                    ) : <p className="home-events-empty">{content.events.emptyText} <a className="text-link" href={content.events.emptyLink.href}>{content.events.emptyLink.label} <ArrowRight size={17} aria-hidden="true" /></a></p>}
                </div>
            </section>

            <section className="home-about" id="about" aria-labelledby="home-about-title">
                <div className="content-width home-about-grid">
                    <div className="home-about-visual">
                        <div className="home-about-photo">
                            <Image src={content.about.imagePath} alt={content.about.alt} fill sizes="(min-width: 901px) 420px, 100vw" />
                        </div>
                        <p className="home-about-mission">{content.about.mission}</p>
                    </div>
                    <div className="home-about-copy">
                        <h2 id="home-about-title">{content.about.title}</h2>
                        {content.about.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                        <div className="home-about-links">
                            {content.about.links.map(link => {
                                const href = link.source === "annualReport" ? about.reports[0]?.href ?? link.href
                                    : link.source === "nationalNetwork" ? about.wacaHref : link.href;
                                return <Link key={link._key} className="text-link" href={href} target={link.newTab ? "_blank" : undefined} rel={link.newTab ? "noreferrer" : undefined}>{link.label} <ArrowRight size={17} aria-hidden="true" /></Link>;
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <NewsletterSignup content={content.newsletter} />

            <section className="home-sponsors" aria-labelledby="home-sponsors-title">
                <div className="content-width">
                    <h2 id="home-sponsors-title">{content.sponsors.title}</h2>
                    <p>{content.sponsors.body}</p>
                    <ul className="home-sponsor-list">
                        {content.sponsors.sponsors.map((sponsor) => (
                            <li key={sponsor._key}>
                                {sponsor.href ? (
                                    <a href={sponsor.href}>
                                        <Image className="home-sponsor-logo" src={sponsor.imagePath} alt={sponsor.alt} width={200} height={120} sizes="200px" />
                                    </a>
                                ) : <Image className="home-sponsor-logo" src={sponsor.imagePath} alt={sponsor.alt} width={200} height={120} sizes="200px" />}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            {content.memberShortcut.enabled && (
                <div className="flex justify-end px-4 py-2">
                    <Link href={content.memberShortcut.href} className="text-xs text-primary opacity-10 hover:opacity-100 focus:opacity-100">
                        {content.memberShortcut.label}
                    </Link>
                </div>
            )}
        </main>
    );
}
