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
import NewsFormBox from "@/components/NewsFormBox";

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
                className="w-auto bg-[#b8893b] p-4 border-white border-[1px] active:border-black hover:bg-[#ea8c2f]"
                type="button"
              >
                <a className="font-bold" href="#calendar">See upcoming events</a>
              </button>
            </div>
          </div>
        </section>

        <section
          className="flex flex-col items-start gap-8 px-6 py-8 lg:flex-row lg:px-16 lg:py-16"
          id="about"
        >
          <div className="w-full lg:w-2/5">
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
              <a className="font-bold text-2xl flex flex-row items-center gap-4 text-[#2f6f7e] transition-all duration-200 hover:text-[#b8893b]" href="#calendar">
                Event Calendar <ArrowRight size={25} />
              </a>
              <a className="font-bold text-2xl flex flex-row items-center gap-4 text-[#2f6f7e] transition-all duration-200 hover:text-[#b8893b]" href="#bookclub">
                Book Club <ArrowRight size={25} />
              </a>
              <a className="font-bold text-2xl flex flex-row items-center gap-4 text-[#2f6f7e] transition-all duration-200 hover:text-[#b8893b]" href="#member">
                Membership <ArrowRight size={25} />
              </a>
            </div>
          </div>
          <ImageGallery />
        </section>

        <section className="program-section" id="programs">
          <div className="content-width">
            <div className="text-center">
              <div>
                <h2 className="font-bold text-4xl text-[#1b2a41] mb-8">
                  Upcoming events:
                </h2>
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

        <section id="news">
          <div className="flex justify-center p-8 bg-[#2f6f7e] gap-12">
            <p className="text-4xl text-[#b8893b] font-bold">
              Sign up for our <br /> email newsletter!
            </p>
            <NewsFormBox placeholder="First Name" width="10rem" />
            <NewsFormBox placeholder="Last Name" width="10rem" />
            <NewsFormBox placeholder="Email Address" width="20rem" />
            <button
              className="w-auto bg-[#b8893b] p-4 border-white border-[1px] active:border-black hover:bg-[#ea8c2f] text-white"
              type="button"
            >
              <p className="font-bold text-lg">Subscribe</p>
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
