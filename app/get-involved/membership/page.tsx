import type { Metadata } from "next";
import PageHero, { Section } from "@/components/page-hero";
import { contact, memberBenefits, membership } from "@/lib/site";

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
            <PageHero eyebrow="Get Involved" title="Become a Member">
                Membership supports the Council and provides access to speaker programs, member resources, and discussion groups.
                <div className="mt-7 flex flex-wrap gap-3">
                    <a className="inline-flex min-h-12 items-center bg-[var(--gold)] px-5 py-3 font-bold text-[var(--navy)]" href={membership.joinOnline}>Join online</a>
                    <a className="inline-flex min-h-12 items-center border border-white px-5 py-3 font-bold text-white" href={membership.renew}>Renew membership</a>
                </div>
            </PageHero>

            <Section title="Membership information">
                <p className="max-w-[780px] text-lg text-[#444]">Membership is intended for people who want regular access to WACHH programs and reliable information about international affairs. Current members can renew by logging into their account.</p>
                <div className="mt-8 divide-y divide-[#d9d7d1] border-y border-[#d9d7d1]">
                    {reasons.map((reason) => (
                        <article className="grid gap-2 py-5 md:grid-cols-[220px_minmax(0,1fr)] md:gap-8" key={reason.title}>
                            <h3 className="font-[family-name:var(--serif)] text-[23px] font-medium text-[var(--navy)]">{reason.title}</h3>
                            <p className="m-0 text-[#505050]">{reason.body}</p>
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
                    <section className="border-t-2 border-[var(--navy)] pt-5"><h3 className="font-[family-name:var(--serif)] text-[24px] font-medium text-[var(--navy)]">Join by mail</h3><p className="mt-2 text-[#555]">Contact the WACHH office to request a membership form and mailing instructions.</p><a className="mt-4 inline-flex min-h-11 items-center font-bold text-[var(--teal)] underline underline-offset-4" href={ `mailto:${ contact.email }` }>Request a membership form</a></section>
                </div>
            </Section>
        </>
    );
}
