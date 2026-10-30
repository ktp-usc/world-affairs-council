import { ArrowRight, CalendarDays, CheckCircle2 } from "lucide-react";
import Footer from "@/components/footer";
import Header from "@/components/header";

import { client } from "@/sanity/lib/client";
import { EVENTS_QUERY } from "@/sanity/lib/queries";

type eventProps = {
  date: string,
  title: string,
  text: string
}

export default async function Home() {
    const events = await client.fetch(EVENTS_QUERY);
    console.log(events)
    return (
        <div className="site-shell">
            <Header />
            <main>
                <section className="hero" aria-labelledby="hero-title">
                    <div className="hero-rings" aria-hidden="true" />
                    <div className="content-width hero-content">
                        <p className="eyebrow gold">WORLD AFFAIRS COUNCIL OF HILTON HEAD</p>
                        <h1 id="hero-title">A distinguished, welcoming<br className="desktop-break" /> voice for world affairs.</h1>
                        <p className="hero-intro">We bring leading voices and thoughtful neighbors together to better understand our interconnected world.</p>
                        <div className="hero-values"><span>ENGAGING</span><i /><span>EDUCATING</span><i /><span>INSPIRING</span></div>
                    </div>
                </section>

                <section className="intro-section content-width" id="about">
                    <div className="section-label">01 / ABOUT</div>
                    <div className="intro-copy">
                        <h2>Global insight,<br />delivered.</h2>
                        <p>WACHH is a distinguished, welcoming voice for world affairs in the Lowcountry. Through conversations, programs, and community, we make the world feel closer.</p>
                        <a className="text-link" href="#programs">Discover WACHH <ArrowRight size={17} /></a>
                    </div>
                </section>

                <section className="program-section" id="programs">
                    <div className="content-width">
                        <div className="section-heading">
                            <div className="section-label">02 / PROGRAMS</div>
                            <div><h2>Ideas that shape<br />our world.</h2><p>Thoughtful programming for curious minds.</p></div>
                        </div>
                        <div className="program-grid">
                            {events.map((event : eventProps) => (
                                <article className="program-card" key={event.title}>
                                    <div className="program-date">{event.date}</div>
                                    <h3>{event.title}</h3>
                                    <p>{event.text}</p>
                                    <a className="text-link" href="#events">Learn more <ArrowRight size={17} /></a>
                                </article>
                            ))}
                        </div>
                        <a className="outline-button" href="#events"><CalendarDays size={17} /> View all events</a>
                    </div>
                </section>

                <section className="newsletter" id="news">
                    <div className="content-width newsletter-inner">
                        <div>
                            <p className="eyebrow gold">STAY CONNECTED</p>
                            <h2>Global insight, delivered.</h2>
                            <p>Receive program news and thoughtful resources in your inbox.</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
