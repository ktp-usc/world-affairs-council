import MemberStory from "@/components/member-story";
import type { Metadata } from "next";
import PageHero, { Section } from "@/components/page-hero";
import { membership } from "@/lib/site";
import { fetchMembershipPage } from "@/sanity/lib/get-involved";

export const metadata: Metadata = { title: "Become a Member" };

/** Become a Member; its text, lists and quote come from Studio > Get Involved > Become a Member. */
export default async function MembershipPage() {
    const page = await fetchMembershipPage();
    return (
        <>
            <PageHero
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Get Involved", href: "/get-involved" }, { label: "Become a Member" }]}
                title={page.title}
                image={{ src: page.heroImage.src, alt: page.heroImage.alt }}
            >
                {page.intro}
                <div className="mt-7 flex flex-wrap gap-3">
                    <a className="inline-flex min-h-12 items-center bg-[var(--gold)] px-5 py-3 font-bold text-[var(--navy)]" href={membership.joinOnline}>Join online</a>
                    <a className="inline-flex min-h-12 items-center border border-white px-5 py-3 font-bold text-white" href={membership.renew}>Renew membership</a>
                </div>
            </PageHero>

            <Section title={page.infoTitle}>
                <p className="max-w-[780px] text-lg text-[#444]">{page.infoText}</p>
                {page.reasons.length > 0 && <div className="mt-8 divide-y divide-[#d9d7d1] border-y border-[#d9d7d1]">
                    {page.reasons.map((reason) => (
                        <article className="grid items-start gap-2 py-5 md:grid-cols-[220px_minmax(0,1fr)] md:gap-8" key={reason.title}>
                            <h3 className="font-[family-name:var(--serif)] text-[23px] font-medium text-[var(--navy)]">{reason.title}</h3>
                            <p className="m-0 leading-relaxed text-[#505050]">{reason.text}</p>
                        </article>
                    ))}
                </div>}
            </Section>

            <Section id="benefits" title={page.benefitsTitle} muted>
                {page.benefits.length > 0 && <div className="overflow-x-auto border-y border-[#d9d7d1] bg-white">
                    <table className="w-full min-w-[680px] border-collapse text-left">
                        <thead className="bg-[var(--navy)] text-white"><tr><th className="px-5 py-4">Benefit</th><th className="w-32 px-4 py-4 text-center">Member</th><th className="w-36 px-4 py-4 text-center">Non-member</th></tr></thead>
                        <tbody>{page.benefits.map(({ benefit, nonMember }) => (
                            <tr className="border-t border-[#d9d7d1]" key={benefit}><th className="px-5 py-4 font-normal">{benefit}</th><td className="px-4 py-4 text-center font-bold text-[var(--teal)]">Included</td><td className="px-4 py-4 text-center">{nonMember ? "Available" : "—"}</td></tr>
                        ))}</tbody>
                    </table>
                </div>}
            </Section>

            <Section id="join" title={page.joinTitle}>
                <div className="grid gap-8 md:grid-cols-2">
                    <section className="border-t-2 border-[var(--navy)] pt-5"><h3 className="font-[family-name:var(--serif)] text-[24px] font-medium text-[var(--navy)]">{page.joinOnlineTitle}</h3><p className="mt-2 text-[#555]">{page.joinOnlineText}</p><a className="mt-4 inline-flex min-h-11 items-center font-bold text-[var(--teal)] underline underline-offset-4" href={membership.joinOnline}>Online membership form</a></section>
                    <section className="border-t-2 border-[var(--navy)] pt-5"><h3 className="font-[family-name:var(--serif)] text-[24px] font-medium text-[var(--navy)]">{page.joinByMailTitle}</h3><p className="mt-2 text-[#555]">{page.joinByMailText}</p><a className="mt-4 inline-flex min-h-11 items-center font-bold text-[var(--teal)] underline underline-offset-4" href={membership.printForm} target="_blank" rel="noopener noreferrer">Print the membership form (PDF)</a></section>
                </div>
            </Section>
            <Section muted><MemberStory photo={page.testimonial.photo} name={page.testimonial.name} role={page.testimonial.role}><p>{page.testimonial.quote}</p></MemberStory></Section>
        </>
    );
}
