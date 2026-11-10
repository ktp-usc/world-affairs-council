import Image from "next/image";
import MemberStory from "@/components/member-story";
import type { Metadata } from "next";
import PageHero, { Section } from "@/components/page-hero";
import { memberBenefits, membership } from "@/lib/site";

export const metadata: Metadata = { title: "Become a Member" };

const reasons = [
    { title: "Speaker programs", body: "Attend 14 Distinguished Speaker Series programs each season, including two international speakers." },
    { title: "Member resources", body: "Access program livestreams, video archives, newsletters, and selected programs from other World Affairs Councils." },
    { title: "Discussion and community", body: "Participate in Great Decisions and other discussion programs with people interested in international affairs." },
    { title: "Student outreach", body: "Support Academic WorldQuest and Model United Nations through membership, volunteering, or additional gifts." },
];

export default function MembershipPage() {
    return (
        <>
            <PageHero
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Get Involved", href: "/get-involved" }, { label: "Become a Member" }]}
                title="Become a Member"
                image={{ src: "/images/get-involved.png", alt: "WACHH members participating in a community discussion" }}
            >
                Membership supports the Council and provides access to speaker programs, member resources, and discussion groups.
                <div className="mt-7 flex flex-wrap gap-3">
                    <a className="inline-flex min-h-12 items-center bg-[var(--gold)] px-5 py-3 font-bold text-[var(--navy)]" href={membership.joinOnline}>Join online</a>
                    <a className="inline-flex min-h-12 items-center border border-white px-5 py-3 font-bold text-white" href={membership.renew}>Renew membership</a>
                </div>
            </PageHero>

            <Section title="Membership information">
                <p className="max-w-[780px] text-lg text-[#444]">Membership offers education, access, and community: learn from influential figures in world affairs and connect with civic, academic, military, and business leaders across our region. Current members can renew their 2026–2027 membership by logging into their account.</p>
                <div className="mt-8 divide-y divide-[#d9d7d1] border-y border-[#d9d7d1]">
                    {reasons.map((reason) => (
                        <article
                            className={reason.title === "Student outreach"
                                ? "grid items-start gap-4 py-5 sm:grid-cols-[minmax(0,1fr)_220px] sm:gap-6 lg:grid-cols-[220px_minmax(0,1fr)_300px] lg:gap-8"
                                : "grid items-start gap-2 py-5 md:grid-cols-[220px_minmax(0,1fr)] md:gap-8"}
                            key={reason.title}
                        >
                            <h3 className={`font-[family-name:var(--serif)] text-[23px] font-medium text-[var(--navy)] ${reason.title === "Student outreach" ? "sm:col-span-2 lg:col-span-1" : ""}`}>{reason.title}</h3>
                            <p className="m-0 leading-relaxed text-[#505050]">{reason.body}</p>
                            {reason.title === "Student outreach" && (
                                <Image
                                    src="/programs/academic-worldquest/gallery/l1007477.jpg"
                                    alt="Students working together at Academic WorldQuest"
                                    width={800}
                                    height={640}
                                    sizes="(min-width: 1024px) 300px, (min-width: 640px) 220px, 100vw"
                                    className="h-auto w-full sm:col-start-2 sm:row-start-2 lg:col-start-3 lg:row-start-1"
                                />
                            )}
                        </article>
                    ))}
                </div>
            </Section>

            <Section id="benefits" title="Member benefits" muted>
                <div className="overflow-x-auto border-y border-[#d9d7d1] bg-white">
                    <table className="w-full min-w-[680px] border-collapse text-left">
                        <thead className="bg-[var(--navy)] text-white"><tr><th className="px-5 py-4">Benefit</th><th className="w-32 px-4 py-4 text-center">Member</th><th className="w-36 px-4 py-4 text-center">Non-member</th></tr></thead>
                        <tbody>{memberBenefits.map(({ benefit, nonMember }) => (
                            <tr className="border-t border-[#d9d7d1]" key={benefit}><th className="px-5 py-4 font-normal">{benefit}</th><td className="px-4 py-4 text-center font-bold text-[var(--teal)]">Included</td><td className="px-4 py-4 text-center">{nonMember ? "Available" : "—"}</td></tr>
                        ))}</tbody>
                    </table>
                </div>
            </Section>

            <Section id="join" title="How to join">
                <div className="grid gap-8 md:grid-cols-2">
                    <section className="border-t-2 border-[var(--navy)] pt-5"><h3 className="font-[family-name:var(--serif)] text-[24px] font-medium text-[var(--navy)]">Join online</h3><p className="mt-2 text-[#555]">Complete the online membership form and pay by credit card.</p><a className="mt-4 inline-flex min-h-11 items-center font-bold text-[var(--teal)] underline underline-offset-4" href={membership.joinOnline}>Online membership form</a></section>
                    <section className="border-t-2 border-[var(--navy)] pt-5"><h3 className="font-[family-name:var(--serif)] text-[24px] font-medium text-[var(--navy)]">Join by mail</h3><p className="mt-2 text-[#555]">Print the membership form, complete it, and mail it with your check to the Council office.</p><a className="mt-4 inline-flex min-h-11 items-center font-bold text-[var(--teal)] underline underline-offset-4" href={membership.printForm} target="_blank" rel="noopener noreferrer">Print the membership form (PDF)</a></section>
                </div>
            </Section>
            <Section muted><MemberStory photo="/images/jan-cooper.png" name="Jan Cooper" role="WACHH Member"><p>Hilton Head is a vibrant community with a very engaged population. The World Affairs Council of Hilton Head offers the opportunity for individuals to remain educated and up-to-date on world affairs and their impact on the US. It is a small investment of time and dollars that offers an extraordinary return. We are incredibly fortunate to have this jewel in our midst!</p></MemberStory></Section>
        </>
    );
}
