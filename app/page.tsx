import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import HomeCarousel, { type HomeSlide } from "@/components/home-carousel";
import ImageGallery from "@/components/ImageGallery";
import NewsletterSignup from "@/components/newsletter-signup";
import { events, parseDate, sponsors, wildApricotBaseUrl } from "@/lib/site";
import { reports, waca } from "@/app/about/_data/about-content";
import council from "@/components/ui/images/council.jpg";
import audience from "@/components/ui/images/bk_wac_mem.jpg";
import workshop from "@/components/ui/images/workshop.jpg";
import speaker from "@/components/ui/images/speaker2.jpg";
import podium from "@/components/ui/images/speaker1.jpg";
import "./home.css";

// Refresh the upcoming list hourly, using the Council's time zone.
export const revalidate = 3600;

const featureSlides: HomeSlide[] = [
    {
        image: council,
        alt: "Students and Council members gathered beneath the World Affairs Council banner",
        label: "Welcome to the Council",
        content: <>
            <h1>Engaging, educating, and inspiring our community.</h1>
            <p>Leading voices. Thoughtful neighbors. A better understanding of our interconnected world.</p>
            <a className="home-button home-button--gold" href="#calendar">See upcoming events <ArrowRight size={18} aria-hidden="true" /></a>
        </>,
    },
    {
        image: audience,
        alt: "Council members sharing questions and ideas at a community gathering",
        label: "Join the Book Club",
        content: <>
            <h2>Join the Book Club. Read beyond the headlines.</h2>
            <p>Explore world affairs one book at a time. Bring your curiosity and join a welcoming monthly conversation.</p>
            <Link className="home-button home-button--gold" href="/programs/book-club">Explore the Book Club <ArrowRight size={18} aria-hidden="true" /></Link>
        </>,
    },
    {
        image: speaker,
        alt: "A guest speaker sharing perspectives at a Council program",
        label: "Become a member",
        content: <>
            <h2>Become a member. Bring your curiosity.</h2>
            <p>Become a member and connect with people who share your interest in the world, through speakers, discussions, and more.</p>
            <Link className="home-button home-button--gold" href="/get-involved/membership">Become a member <ArrowRight size={18} aria-hidden="true" /></Link>
        </>,
    },
    {
        image: workshop,
        alt: "Local students learning together at an Academic WorldQuest event",
        label: "Support the Council",
        content: <>
            <h2>Give today. Keep our community learning.</h2>
            <p>Your gift supports inspiring speakers, community conversations, and opportunities for local students to engage with the world.</p>
            <Link className="home-button home-button--gold" href="/get-involved/give#donation-form">Donate <ArrowRight size={18} aria-hidden="true" /></Link>
        </>,
    },
    {
        image: podium,
        alt: "A Council speaker presenting in front of the World Affairs Council banner",
        label: "Get the newsletter",
        content: <>
            <h2>Get the newsletter. Keep the world in view.</h2>
            <p>Get Council news and upcoming programs delivered to your inbox, so you never miss a conversation.</p>
            <a className="home-button home-button--gold" href="#newsletter-signup-panel">Sign up for our newsletter <ArrowRight size={18} aria-hidden="true" /></a>
        </>,
    },
];

const programLinks = [
    { title: "Speaker programs", href: "/programs/distinguished-speaker-series" },
    { title: "Book Club", href: "/programs/book-club" },
    { title: "Great Decisions", href: "/programs/great-decisions" },
    { title: "Student programs", href: "/programs/student-programs" },
];

export default function Home() {
    const today = new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });
    const upcoming = events.filter((event) => event.date >= today).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);

    return (
        <main className="home-page">
            <HomeCarousel id="home-features" label="Discover the Council" slides={featureSlides} variant="hero" />

            <section className="home-programs" id="programs" aria-labelledby="home-programs-title">
                <div className="content-width home-programs-grid">
                    <div className="home-programs-copy">
                        <h2 id="home-programs-title">Global ideas.<br />Local conversations.</h2>
                        <p>From leading speakers to small-group discussions, there’s a place for members, guests, and students to learn together.</p>
                        <div className="home-program-links">
                            {programLinks.map((program) => (
                                <Link key={program.title} href={program.href}>{program.title}<ArrowRight size={18} aria-hidden="true" /></Link>
                            ))}
                        </div>
                        <Link className="text-link" href="/programs">View all programs <ArrowRight size={17} aria-hidden="true" /></Link>
                    </div>
                    <ImageGallery />
                </div>
            </section>

            <section className="home-events" id="calendar" aria-labelledby="home-events-title">
                <div className="content-width">
                    <div className="home-section-heading">
                        <div>
                            <h2 id="home-events-title">Upcoming events</h2>
                        </div>
                        <a className="text-link" href={`${wildApricotBaseUrl}/Calendar`}><CalendarDays size={18} aria-hidden="true" /> View event calendar</a>
                    </div>
                    {upcoming.length ? (
                        <div className="home-event-grid">
                            {upcoming.map((event) => (
                                <article className="home-event" key={event.slug}>
                                    <time dateTime={event.date}>{parseDate(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
                                    <h3><Link href={event.kind === "Book Club" ? "/programs/book-club" : `/get-involved/guests/${event.slug}`}>{event.title}</Link></h3>
                                    <p>{event.start} · {event.venue}</p>
                                    <Link className="text-link" href={event.kind === "Book Club" ? "/programs/book-club" : `/get-involved/guests/${event.slug}`}>Event details <ArrowRight size={17} aria-hidden="true" /></Link>
                                </article>
                            ))}
                        </div>
                    ) : <p className="home-events-empty">New programs will be announced soon. <a className="text-link" href="#newsletter-signup-panel">Sign up for updates <ArrowRight size={17} aria-hidden="true" /></a></p>}
                </div>
            </section>

            <section className="home-about" id="about" aria-labelledby="home-about-title">
                <div className="content-width home-about-grid">
                    <div className="home-about-visual">
                        <div className="home-about-photo">
                            <Image src={audience} alt="Council members joining a lively question-and-answer session" fill sizes="(min-width: 901px) 420px, 100vw" />
                        </div>
                        <p className="home-about-mission">Our mission is to educate, engage, and inspire our community regarding world affairs.</p>
                    </div>
                    <div className="home-about-copy">
                        <h2 id="home-about-title">Bringing the world to Hilton Head.</h2>
                        <p>The World Affairs Council of Hilton Head is a nonpartisan, 501(c)(3) educational nonprofit connecting the Lowcountry with the world. We bring diplomats, scholars, journalists, and leaders in business and public service to our community to explore the issues shaping international affairs.</p>
                        <p>Founded in 1981 as the Foreign Affairs Seminar at the Hilton Head Public Library, the Council adopted its current name and joined the World Affairs Councils of America in 2005. Today, more than 1,100 members from Hilton Head Island and Beaufort County bring a wide range of backgrounds and experiences to the conversation.</p>
                        <p>Our Distinguished Speaker Series and Global Speakers Program offer expert perspectives, while the Book Club and Great Decisions make room for thoughtful discussion. Academic WorldQuest and Model United Nations help local students build their knowledge of global issues. Members, guests, and students all have opportunities to participate.</p>
                        <p>We take no political positions. Our role is to present informed voices and encourage open inquiry, so you can weigh the ideas for yourself. Through our national network, we also connect members with programs and resources from councils across the country.</p>
                        <div className="home-about-links">
                            <Link className="text-link" href="/about">More about the Council <ArrowRight size={17} aria-hidden="true" /></Link>
                            <a className="text-link" href={reports[0].href} target="_blank" rel="noreferrer">Annual report (PDF) <ArrowRight size={17} aria-hidden="true" /></a>
                            <a className="text-link" href={waca.href} target="_blank" rel="noreferrer">Our national network <ArrowRight size={17} aria-hidden="true" /></a>
                        </div>
                    </div>
                </div>
            </section>

            <NewsletterSignup />

            <section className="home-sponsors" aria-labelledby="home-sponsors-title">
                <div className="content-width">
                    <h2 id="home-sponsors-title">Our sponsors &amp; supporters</h2>
                    <p>Thank you to the organizations that support the World Affairs Council of Hilton Head.</p>
                    <ul className="home-sponsor-list">
                        {sponsors.map((sponsor) => (
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
