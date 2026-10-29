"use client";

import { ArrowRight, CalendarDays, CheckCircle2 } from "lucide-react";
import { FormEvent, useState } from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";

const programs = [
    { date: "NOV 14", title: "Distinguished Speaker Series", text: "Ideas, perspectives, and conversations that connect Hilton Head to the wider world." },
    { date: "DEC 05", title: "Global Speakers Program", text: "Meet the thinkers shaping the future of international affairs." },
    { date: "JAN 18", title: "Great Decisions 2027", text: "Join an informed community conversation on the issues that matter most." },
];

export default function Home() {
    const [submitted, setSubmitted] = useState(false);
    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="site-shell">
            <Header />
            <main>
                <section className="hero" aria-labelledby="hero-title">
                    <div className="hero-rings" aria-hidden="true" />
                    <div className="content-width hero-content">
                        <h1 id="hero-title">Engaging, educating, and<br/> inspiring our community.</h1>
                        <p className="hero-intro">We bring leading voices and thoughtful neighbors together to better understand our interconnected world.</p>
                        <div className="hero-actions">
                            <button className="w-30 bg-[#b8893b] p-4" type="button">Book Club</button>
                            <button className="w-30 bg-[#b8893b] p-4" type="button">See events</button>
                        </div>
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
                            {programs.map((program) => (
                                <article className="program-card" key={program.title}>
                                    <div className="program-date">{program.date}</div>
                                    <h3>{program.title}</h3>
                                    <p>{program.text}</p>
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
                        {submitted ? (
                            <div className="form-success"><CheckCircle2 size={22} /> You&apos;re on the list. Thank you!</div>
                        ) : (
                            <form onSubmit={submit}>
                                <label><span>First name</span><input required name="firstName" placeholder="First name" /></label>
                                <label><span>Email address</span><input required type="email" name="email" placeholder="you@example.com" /></label>
                                <button type="submit">Subscribe</button>
                            </form>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
