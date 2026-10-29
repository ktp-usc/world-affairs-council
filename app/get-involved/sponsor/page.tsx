import type { Metadata } from "next";
import { Award, Handshake, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero, { Section } from "@/components/page-hero";
import SponsorForm from "@/components/sponsor-form";
import Testimonial from "@/components/testimonial";
import { parseDate, sponsorship } from "@/lib/site";

export const metadata: Metadata = { title: "Sponsor a Speaker" };

const icons = { ambassador: Award, diplomat: Handshake, attache: Ticket } as const;

export default function SponsorPage() {
    return (
        <>
            <PageHero eyebrow="Get Involved" title="Sponsor a Speaker">
                Sponsoring a World Affairs Council of Hilton Head speaker program directly impacts the Council’s programming,
                allowing our Distinguished Speakers Program to host 12 national and 2 international experts annually. At the
                speaker event, sponsors are acknowledged and given preferred seating.
                <Button asChild size="lg" variant="secondary" className="mt-8 flex w-fit"><a href="#become-a-sponsor">Become a Sponsor</a></Button>
            </PageHero>

            <Section id="levels" title="Sponsorship levels">
                <div className="grid gap-6 md:grid-cols-3">
                    { sponsorship.levels.map((l, i) => {
                        const Icon = icons[l.id as keyof typeof icons];
                        return (
                            <div key={ l.id } className={ i === 0 ? "flex flex-col rounded-xl bg-primary p-7 text-primary-foreground shadow-sm" : "flex flex-col rounded-xl border bg-card p-7" }>
                                <Icon className={ i === 0 ? "mb-4 size-6 text-gold" : "mb-4 size-6 text-primary" } />
                                <h3 className="font-serif text-2xl font-semibold">{ l.name }</h3>
                                <p className={ i === 0 ? "mt-1 font-serif text-4xl font-semibold text-gold" : "mt-1 font-serif text-4xl font-semibold text-primary" }>
                                    ${ l.amount.toLocaleString() }
                                </p>
                                <p className="mt-1 text-xs font-semibold tracking-wider uppercase opacity-70">Limited to { l.limit } per speaker</p>
                                <p className="mt-4 opacity-80">{ l.perks }</p>
                            </div>
                        );
                    }) }
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

            <Section>
                <Testimonial
                    photo="/images/richard-hammes.png"
                    name="Richard Hammes"
                    role="WACHH Member"
                    quote="I cannot think of another organization that provides the wide array of speakers on such a broad range of topics as the World Affairs Council of Hilton Head. They bring to our community true experts in their fields that would be impossible to find anywhere else, especially for the cost of this membership. The nuggets of knowledge gained from these experts is why I try to never miss a presentation. Once you come to your first session you will be hooked."
                />
            </Section>

            <Section id="sponsorship-form" title="Sponsorship Donation Form" muted>
                <SponsorForm />
            </Section>

            <Section id="presentations" title={ `${ sponsorship.season } Speaker Presentations available for Sponsorship` }>
                <div className="overflow-x-auto rounded-xl border bg-card">
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
