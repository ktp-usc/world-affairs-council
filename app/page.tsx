import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import HomeCarousel, { type HomeSlide } from "@/components/home-carousel";
import ImageGallery from "@/components/ImageGallery";
import NewsletterSignup from "@/components/newsletter-signup";
import { events, parseDate } from "@/lib/site";
import { getSpeakerEvents } from "@/lib/sanity-speakers";
import { getHomePage, type HomeLink } from "@/lib/sanity-home";
import "./home.css";

// Refresh the upcoming list hourly, using the Council's time zone.
export const revalidate = 3600;

function EditableLink({ link, className }: { link: HomeLink; className?: string }) {
    const content = <>{link.label}<ArrowRight size={17} aria-hidden="true" /></>;
    return link.href.startsWith("http")
        ? <a className={className} href={link.href} target="_blank" rel="noreferrer">{content}</a>
        : <Link className={className} href={link.href}>{content}</Link>;
}

export default async function Home() {
    const landingPage = await getHomePage();
    const today = new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });
    const speakerEvents = await getSpeakerEvents();
    const nonSpeakerEvents = events.filter((event) => event.kind === "Book Club" || event.kind === "Student");
    const upcoming = [...nonSpeakerEvents, ...speakerEvents].filter((event) => event.date >= today).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);
    const featureSlides: HomeSlide[] = landingPage.heroSlides.map((slide, index) => ({
        image: slide.image,
        alt: slide.imageAlt,
        label: slide.label,
        content: <>
            {index === 0 ? <h1>{slide.heading}</h1> : <h2>{slide.heading}</h2>}
            <p>{slide.text}</p>
            <EditableLink className="home-button home-button--gold" link={{label: slide.buttonLabel, href: slide.buttonHref}} />
        </>,
    }));

    return (
        <main className="home-page">
            <HomeCarousel id="home-features" label="Discover the Council" slides={featureSlides} variant="hero" />

            <section className="home-programs" id="programs" aria-labelledby="home-programs-title">
                <div className="content-width home-programs-grid">
                    <div className="home-programs-copy">
                        <h2 id="home-programs-title">{landingPage.programsHeading.split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h2>
                        <p>{landingPage.programsText}</p>
                        <div className="home-program-links">
                            {landingPage.programLinks.map((program) => (
                                <EditableLink key={`${program.label}-${program.href}`} link={program} />
                            ))}
                        </div>
                        <EditableLink className="text-link" link={{label: landingPage.allProgramsLabel, href: landingPage.allProgramsHref}} />
                    </div>
                    <ImageGallery slides={landingPage.programGallery.map((photo) => ({image: photo.image, alt: photo.imageAlt, label: photo.label}))} />
                </div>
            </section>

            <section className="home-events" id="calendar" aria-labelledby="home-events-title">
                <div className="content-width">
                    <div className="home-section-heading">
                        <div>
                            <h2 id="home-events-title">{landingPage.eventsHeading}</h2>
                        </div>
                        <a className="text-link" href={landingPage.calendarLinkHref}><CalendarDays size={18} aria-hidden="true" /> {landingPage.calendarLinkLabel}</a>
                    </div>
                    {upcoming.length ? (
                        <div className="home-event-grid">
                            {upcoming.map((event) => (
                                <article className="home-event" key={event.slug}>
                                    <time dateTime={event.date}>{parseDate(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
                                    <h3><Link href={event.kind === "Book Club" ? "/programs/book-club" : `/get-involved/guests/${event.slug}`}>{event.title}</Link></h3>
                                    <p>{event.start} · {event.venue}</p>
                                    <Link className="text-link" href={event.kind === "Book Club" ? "/programs/book-club" : `/get-involved/guests/${event.slug}`}>{landingPage.eventDetailsLabel} <ArrowRight size={17} aria-hidden="true" /></Link>
                                </article>
                            ))}
                        </div>
                    ) : <p className="home-events-empty">{landingPage.noEventsText} <a className="text-link" href="#newsletter-signup-panel">{landingPage.noEventsLinkLabel} <ArrowRight size={17} aria-hidden="true" /></a></p>}
                </div>
            </section>

            <section className="home-about" id="about" aria-labelledby="home-about-title">
                <div className="content-width home-about-grid">
                    <div className="home-about-visual">
                        <div className="home-about-photo">
                            <Image src={landingPage.aboutImage} alt={landingPage.aboutImageAlt} fill sizes="(min-width: 901px) 420px, 100vw" />
                        </div>
                        <p className="home-about-mission">{landingPage.missionStatement}</p>
                    </div>
                    <div className="home-about-copy">
                        <h2 id="home-about-title">{landingPage.aboutHeading}</h2>
                        {landingPage.aboutParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                        <div className="home-about-links">
                            {landingPage.aboutLinks.map((link) => <EditableLink className="text-link" key={`${link.label}-${link.href}`} link={link} />)}
                        </div>
                    </div>
                </div>
            </section>

            <NewsletterSignup heading={landingPage.newsletterHeading} text={landingPage.newsletterText} openLabel={landingPage.newsletterOpenLabel} closeLabel={landingPage.newsletterCloseLabel} />

            <section className="home-sponsors" aria-labelledby="home-sponsors-title">
                <div className="content-width">
                    <h2 id="home-sponsors-title">{landingPage.sponsorsHeading}</h2>
                    <p>{landingPage.sponsorsText}</p>
                    <ul className="home-sponsor-list">
                        {landingPage.sponsors.map((sponsor) => (
                            <li key={sponsor.name}>
                                <Image className="home-sponsor-logo" src={sponsor.logo} alt={sponsor.name} width={200} height={120} sizes="200px" />
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            {/* TEMP(dev): faint shortcut to the members-only page while it's in progress. Remove before launch. */}
            <div className="flex justify-end px-4 py-2">
                <Link href="/members" className="text-xs text-primary opacity-10 hover:opacity-100 focus:opacity-100">
                    Members only
                </Link>
            </div>
        </main>
    );
}
