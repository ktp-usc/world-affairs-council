"use client";

import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";

import ImageGallery from "@/components/ImageGallery";

const programs = [
  {
    date: "NOV 14",
    title: "Distinguished Speaker Series",
    text: "Ideas, perspectives, and conversations that connect Hilton Head to the wider world.",
  },
  {
    date: "DEC 05",
    title: "Global Speakers Program",
    text: "Meet the thinkers shaping the future of international affairs.",
  },
  {
    date: "JAN 18",
    title: "Great Decisions 2027",
    text: "Join an informed community conversation on the issues that matter most.",
  },
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
            <h1 id="hero-title">
              Engaging, educating, and
              <br /> inspiring our community.
            </h1>
            <p className="hero-intro">
              We bring leading voices and thoughtful neighbors together to
              better understand our interconnected world.
            </p>
            <div className="hero-actions">
              <button
                className="w-auto bg-[#b8893b] p-4 border-white border-[1px] active:border-black"
                type="button"
              >
                <a className="font-bold" href="#calendar">See upcoming events</a>
              </button>
            </div>
          </div>
        </section>

        <section
          className="flex flex-col items-start gap-8 px-6 py-16 md:flex-row md:px-16 md:py-32"
          id="about"
        >
          <div className="w-full md:w-2/5">
            <h2 className="text-5xl text-[#1b2a41] font-bold">Check out our various programs!</h2>
            <p className="text-2xl mt-4 mb-8">
              The world is a complicated place and the World Affairs Council of 
              Hilton Head will help you make sense of what is happening. The
              Council engages, educates and inspires our community about world
              affairs. Our programs are for everyone — members, the general
              public, and students. We invite you to come to a speaker event and
              become a global thinker too!
            </p>
            <div className="flex gap-8">
              <a className="font-bold text-2xl flex flex-row items-center gap-4 text-[#2f6f7e]" href="#calendar">
                Event Calendar <ArrowRight size={25} />
              </a>
              <a className="font-bold text-2xl flex flex-row items-center gap-4 text-[#2f6f7e]" href="#bookclub">
                Book Club <ArrowRight size={25} />
              </a>
              <a className="font-bold text-2xl flex flex-row items-center gap-4 text-[#2f6f7e]" href="#member">
                Membership <ArrowRight size={25} />
              </a>
            </div>
          </div>
          <ImageGallery />
                 </section>

        <section className="program-section" id="programs">
          <div className="content-width">
            <div className="section-heading">
              <div className="section-label">02 / PROGRAMS</div>
              <div>
                <h2>
                  Ideas that shape
                  <br />
                  our world.
                </h2>
                <p>Thoughtful programming for curious minds.</p>
              </div>
            </div>
            <div className="program-grid">
              {programs.map((program) => (
                <article className="program-card" key={program.title}>
                  <div className="program-date">{program.date}</div>
                  <h3>{program.title}</h3>
                  <p>{program.text}</p>
                  <a className="text-link" href="#events">
                    Learn more <ArrowRight size={17} />
                  </a>
                </article>
              ))}
            </div>
            <a className="outline-button" href="#events">
              <CalendarDays size={17} /> View all events
            </a>
          </div>
        </section>

        <section className="newsletter" id="news">
          <div className="content-width newsletter-inner">
            <div>
              <p className="eyebrow gold">STAY CONNECTED</p>
              <h2>Global insight, delivered.</h2>
              <p>
                Receive program news and thoughtful resources in your inbox.
              </p>
            </div>
            {submitted ? (
              <div className="form-success">
                <CheckCircle2 size={22} /> You&apos;re on the list. Thank you!
              </div>
            ) : (
              <form onSubmit={submit}>
                <label>
                  <span>First name</span>
                  <input required name="firstName" placeholder="First name" />
                </label>
                <label>
                  <span>Email address</span>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                  />
                </label>
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
