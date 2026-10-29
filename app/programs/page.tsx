import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { programCards } from "@/components/programs/programs-data";

export const metadata: Metadata = {
    title: "Programs | World Affairs Council of Hilton Head",
    description: "Explore WACHH speaker, discussion, book, and student programs.",
};

export default function ProgramsPage() {
    return (
        <div className="programs-mockup">
            <Header />
            <main>
                <section className="programs-index-hero">
                    <div className="programs-width">
                        <nav aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Programs</span></nav>
                        <p className="programs-eyebrow programs-gold">Learn with us</p>
                        <h1>Programs</h1>
                        <p>From distinguished speakers to student diplomacy, WACHH makes global affairs engaging, accessible, and relevant to the Lowcountry.</p>
                    </div>
                </section>

                <section className="programs-index-intro programs-width">
                    <p className="programs-eyebrow">Explore the world</p>
                    <div>
                        <h2>Many ways to understand a complicated world.</h2>
                        <p>WACHH is a nonprofit, nonpartisan organization that engages, educates, and inspires the community through speaker programs, discussion groups, books, and student learning.</p>
                    </div>
                </section>

                <section className="programs-card-section">
                    <div className="programs-width">
                        <div className="programs-section-heading"><p className="programs-eyebrow">Our programs</p><h2>Find your way into the conversation.</h2></div>
                        <div className="programs-index-grid">
                            {programCards.map((program) => (
                                <article key={program.title}>
                                    <div className="programs-card-image" style={{ backgroundImage: `url(${program.image})` }} role="img" aria-label="" />
                                    <div><h3>{program.title}</h3><p>{program.text}</p><Link href={program.href}>Learn more <ArrowRight size={18} /></Link></div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="programs-student-band">
                    <div className="programs-width">
                        <div><p className="programs-eyebrow programs-gold">Future global leaders</p><h2>Programs built for students, now under one Programs menu.</h2><p>Academic WorldQuest and Model United Nations help Beaufort County students build global knowledge, confidence, and respect for different points of view.</p></div>
                        <Link className="programs-button programs-button-gold" href="/programs/student-programs">Explore Student Programs</Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
