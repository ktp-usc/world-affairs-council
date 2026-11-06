import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero, { Section } from "@/components/page-hero";

export const metadata: Metadata = { title: "Get Involved" };

const ways = [
    { title: "Become a Member", body: "Attend the Distinguished Speaker Series, receive member communications, and take part in member programs.", href: "/get-involved/membership" },
    { title: "Attend as a Guest", body: "Non-members may register for individual Distinguished Speaker Series programs, subject to seating availability.", href: "/get-involved/guests" },
    { title: "Volunteer", body: "Help with speaker events, discussion groups, membership, fundraising, or student outreach.", href: "/get-involved/volunteer" },
    { title: "Make a Gift", body: "Support Council operations, speaker programs, and Academic WorldQuest and Model United Nations activities.", href: "/get-involved/give" },
    { title: "Sponsor a Speaker", body: "Individuals and organizations may support a specific presentation through a seasonal sponsorship.", href: "/get-involved/sponsor" },
];

export default function GetInvolvedPage() {
    return (
        <>
            <PageHero eyebrow="Get Involved" title="Ways to participate">
                Membership, guest attendance, volunteering, donations, and speaker sponsorships each support the Council&apos;s work.
            </PageHero>

            <Section title="Get involved with WACHH">
                <div className="divide-y divide-[#d9d7d1] border-y border-[#d9d7d1]">
                    {ways.map((way) => (
                        <article className="grid gap-3 py-6 md:grid-cols-[240px_minmax(0,1fr)_auto] md:items-center md:gap-8" key={way.title}>
                            <h3 className="font-[family-name:var(--serif)] text-[24px] font-medium text-[var(--navy)]">{way.title}</h3>
                            <p className="m-0 text-[#505050]">{way.body}</p>
                            <Link className="inline-flex min-h-11 items-center gap-2 font-bold text-[var(--teal)] underline-offset-4 hover:underline" href={way.href}>
                                Learn more <ArrowRight size={18} aria-hidden="true" />
                            </Link>
                        </article>
                    ))}
                </div>
            </Section>
        </>
    );
}
