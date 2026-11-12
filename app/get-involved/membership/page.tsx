import MemberStory from "@/components/member-story";
import type { Metadata } from "next";
import { Check, X } from "lucide-react";
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
                        <article className="grid items-start gap-2 py-5 md:grid-cols-[220px_minmax(0,1fr)] md:gap-8" key={reason.title}>
                            <h3 className="font-[family-name:var(--serif)] text-[23px] font-medium text-[var(--navy)]">{reason.title}</h3>
                            <p className="m-0 leading-relaxed text-[#505050]">{reason.body}</p>
                        </article>
                    ))}
                </div>
            </Section>

            <Section id="benefits" title="Member benefits" muted>
                <div className="overflow-x-auto border-y border-[#d9d7d1] bg-white">
                    {/* Phones: narrow columns with checks and X's so the table fits without sideways scrolling. */}
                    <table className="w-full border-collapse text-left md:min-w-[680px]">
                        <thead className="bg-[var(--navy)] text-white"><tr><th scope="col" className="px-3 py-3 text-sm md:px-5 md:py-4 md:text-base">Benefit</th><th scope="col" className="w-16 px-1 py-3 text-center text-sm md:w-32 md:px-4 md:py-4 md:text-base">Member</th><th scope="col" className="w-16 px-1 py-3 text-center text-sm md:w-36 md:px-4 md:py-4 md:text-base">Non-<br className="md:hidden" />member</th></tr></thead>
                        <tbody>{memberBenefits.map(({ benefit, nonMember }) => (
                            <tr className="border-t border-[#d9d7d1]" key={benefit}>
                                <th scope="row" className="px-3 py-3 text-[15px] leading-snug font-normal md:px-5 md:py-4 md:text-base">{benefit}</th>
                                <td className="px-1 py-3 text-center font-bold text-[var(--teal)] md:px-4 md:py-4">
                                    <Check size={22} strokeWidth={3} aria-hidden="true" className="mx-auto md:hidden" /><span className="sr-only md:not-sr-only">Included</span>
                                </td>
                                <td className="px-1 py-3 text-center md:px-4 md:py-4">
                                    {nonMember
                                        ? <><Check size={22} strokeWidth={3} aria-hidden="true" className="mx-auto text-[var(--teal)] md:hidden" /><span className="sr-only md:not-sr-only">Available</span></>
                                        : <><X size={22} strokeWidth={2.5} aria-hidden="true" className="mx-auto text-[#9a9a9a] md:hidden" /><span className="sr-only">Not included</span><span aria-hidden="true" className="hidden md:inline">—</span></>}
                                </td>
                            </tr>
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
