import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import PageHero, { Section } from "@/components/page-hero";
import SponsorForm from "@/components/sponsor-form";
import { parseDate, sponsorship } from "@/lib/site";

export const metadata: Metadata = { title: "Sponsor a Speaker" };

export default function SponsorPage() {
    return (
        <>
            <PageHero eyebrow="Support WACHH" title="Sponsor a speaker">
                Speaker sponsorship helps fund the Distinguished Speaker Series. Sponsors are acknowledged at the program, receive preferred seating, and are invited to a meal with the speaker.
                <Button asChild size="lg" variant="secondary" className="mt-8 flex w-fit"><a href="#become-a-sponsor">Become a Sponsor</a></Button>
            </PageHero>

            <Section id="levels" title="Sponsorship levels">
                <div className="divide-y divide-[#d9d7d1] border-y border-[#d9d7d1]">
                    { sponsorship.levels.map((level) => (
                        <article key={ level.id } className="grid gap-4 py-6 md:grid-cols-[1fr_10rem_2fr] md:items-start">
                            <h3 className="font-serif text-2xl font-semibold text-primary">{ level.name }</h3>
                            <div><p className="font-serif text-2xl font-semibold text-primary">${ level.amount.toLocaleString() }</p><p className="mt-1 text-xs text-muted-foreground">Limit { level.limit } per speaker</p></div>
                            <p className="leading-relaxed text-muted-foreground">{ level.perks }</p>
                        </article>
                    )) }
                </div>
            </Section>

            <Section id="become-a-sponsor" title="Become a Sponsor" muted>
                <div className="max-w-3xl space-y-3 text-muted-foreground">
                    <p>
                        Please use the Sponsorship Donation form below to select your sponsorship level. Specify which speaker you
                        would like to sponsor (rank order preferences in case sponsorship slots are already taken).
                    </p>
                    <p>
                        If you’d like to sponsor more than one speaker presentation, write in the total amount of your payment and
                        make a note in the Sponsorship Comment field.
                    </p>
                    <p>For your convenience a list of { sponsorship.season } events is provided below.</p>
                </div>
            </Section>

            <Section id="sponsorship-form" title="Sponsorship Donation Form" muted>
                <SponsorForm />
            </Section>

            <Section id="presentations" title={ `${ sponsorship.season } Speaker Presentations available for Sponsorship` }>
                <div className="overflow-x-auto border border-[#d9d7d1] bg-card">
                    <table className="w-full text-left">
                        <thead className="bg-primary text-primary-foreground">
                            <tr>
                                <th scope="col" className="px-5 py-4 text-sm font-semibold tracking-wider text-gold uppercase">Date</th>
                                <th scope="col" className="px-5 py-4 text-sm font-semibold tracking-wider uppercase">Presenter</th>
                                <th scope="col" className="px-5 py-4 text-sm font-semibold tracking-wider uppercase">Topic</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            { sponsorship.presentations.map((p) => (
                                <tr key={ p.date } className="even:bg-muted/40">
                                    <td className="px-5 py-4 whitespace-nowrap tabular-nums">
                                        { parseDate(p.date).toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" }) }
                                    </td>
                                    <th scope="row" className="px-5 py-4 font-serif font-semibold whitespace-nowrap text-primary">{ p.presenter }</th>
                                    <td className="px-5 py-4">{ p.topic }</td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                </div>
            </Section>
        </>
    );
}
