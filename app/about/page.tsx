import type { Metadata } from "next";
import { ArrowRight, FileText } from "lucide-react";
import Hero from "./_components/hero";
import PhotoSlot from "./_components/photo-slot";
import Timeline from "./_components/timeline";
import { fetchAbout } from "@/sanity/lib/about";
import styles from "./about.module.css";

export const metadata: Metadata = {
    title: "About Us | World Affairs Council of Hilton Head",
    description: "Our mission, our history since 1981, our annual reports, and our place in the World Affairs Councils of America.",
};

// Section order:
// hero → tagline → two side-by-side blocks → stats → centered block (reports) → history slider.
export default async function AboutPage() {
    const { title, tagline, mission, whoWeAre, origins, heroImage, originsImage, networkImage, wacaTitle, wacaParagraphs, wacaHref, wacaLinkLabel, stats, reportsTitle, reportsIntro, reports, historyTitle, milestones } = await fetchAbout();
    return (
        <>
            <Hero
                title={title}
                photo={heroImage}
                nextId="introduction"
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
                subtitle={tagline}
            />

            <section id="introduction" className={styles.block} aria-label="Who we are">
                <div className={styles.blockText}>
                    <div className={styles.blockTextInner}>
                        <p className={styles.blockLead}>&ldquo;{mission}&rdquo;</p>
                        {whoWeAre.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                        {origins.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                </div>
                <PhotoSlot photo={originsImage} className={styles.blockPhoto} />
            </section>

            <section className={`${styles.block} ${styles.blockReverse}`} aria-labelledby="waca-title">
                <div className={styles.blockText}>
                    <div className={styles.blockTextInner}>
                        <h2 id="waca-title" className={styles.blockTitle}>{wacaTitle}</h2>
                        {wacaParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                        <a className="text-link" href={wacaHref} target="_blank" rel="noreferrer">
                            {wacaLinkLabel} <ArrowRight size={17} aria-hidden="true" />
                        </a>
                    </div>
                </div>
                <PhotoSlot photo={networkImage} className={styles.blockPhoto} />
            </section>

            <section className={styles.stats} aria-label="WACHH by the numbers">
                <dl className={`content-width ${styles.statGrid}`}>
                    {stats.map((stat) => (
                        <div key={stat.label} className={styles.stat}>
                            <dd>{stat.value}</dd>
                            <dt>{stat.label}</dt>
                        </div>
                    ))}
                </dl>
            </section>

            <section id="annual-reports" className={styles.centerBlock} aria-labelledby="reports-title">
                <div className="content-width">
                    <h2 id="reports-title" className={styles.centerTitle}>{reportsTitle}</h2>
                    <p className={styles.centerText}>{reportsIntro}</p>
                    <ul className={styles.reportGrid}>
                        {reports.map((report) => (
                            <li key={report.href}>
                                <a className={styles.report} href={report.href} target="_blank" rel="noreferrer">
                                    <FileText size={22} aria-hidden="true" />
                                    <span className={styles.reportYear}>{report.year}</span>
                                    <span className={styles.reportLabel}>{report.label} (PDF)</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section id="history" className={styles.history} aria-labelledby="history-title">
                <div className="content-width">
                    <h2 id="history-title" className={styles.centerTitle}>{historyTitle}</h2>
                    <Timeline milestones={milestones} />
                </div>
            </section>
        </>
    );
}
