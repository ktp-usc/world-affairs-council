import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/page-hero";
import { programCards } from "@/components/programs/programs-data";

export const metadata: Metadata = {
    title: "Programs | World Affairs Council of Hilton Head",
    description: "Explore WACHH speaker, discussion, book, and student programs.",
};

export default function ProgramsPage() {
    return (
        <main className="min-h-screen bg-white font-[var(--sans)] text-[18px] leading-[1.65] text-[var(--charcoal)]">
            <PageHero
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Programs" }]}
                title="Programs"
                image={{ src: "/images/programs-overview.png", alt: "A World Affairs Council program in progress" }}
            >
                WACHH offers speaker programs, discussion groups, a book club, and student programs focused on international affairs.
            </PageHero>

            <section className="mx-auto w-[min(1040px,calc(100%-48px))] py-14 md:py-18">
                <h2 className="font-[family-name:var(--serif)] text-[32px] font-medium text-[var(--navy)] md:text-[38px]">About WACHH programs</h2>
                <div className="mt-5 space-y-4 text-[#444]">
                    <p>WACHH is a nonprofit, nonpartisan organization that engages, educates, and inspires the community regarding world affairs. Each program uses a different approach to help members and guests understand important global issues.</p>
                    <p>The Distinguished Speaker Series and Global Speakers Program bring experienced speakers to Hilton Head. Great Decisions and the Book Club provide opportunities for discussion, while Academic WorldQuest and Model United Nations serve students in the community.</p>
                </div>
            </section>

            <section className="border-t border-[#d9d7d1] bg-[var(--off-white)] py-14 md:py-18" aria-labelledby="program-list-title">
                <div className="mx-auto w-[min(1040px,calc(100%-48px))]">
                    <h2 id="program-list-title" className="font-[family-name:var(--serif)] text-[32px] font-medium text-[var(--navy)] md:text-[38px]">Program directory</h2>
                    <div className="mt-8 divide-y divide-[#d9d7d1] border-y border-[#d9d7d1] bg-white">
                        {programCards.map((program) => (
                            <article className="grid gap-0 md:grid-cols-[240px_minmax(0,1fr)]" key={program.title}>
                                <div className="min-h-44 bg-cover bg-center md:min-h-52" style={{ backgroundImage: `url(${program.image})` }} role="img" aria-label="" />
                                <div className="flex flex-col items-start justify-center px-6 py-7 md:px-9">
                                    <h3 className="font-[family-name:var(--serif)] text-[26px] leading-tight font-medium text-[var(--navy)] md:text-[30px]">{program.title}</h3>
                                    <p className="mt-3 max-w-[680px] text-[#4f4f4f]">{program.text}</p>
                                    <Link className="mt-4 inline-flex min-h-11 items-center gap-2 font-bold text-[var(--teal)] underline-offset-4 hover:underline" href={program.href}>
                                        View program <ArrowRight size={18} aria-hidden="true" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
