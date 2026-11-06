import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero, { Section } from "@/components/page-hero";
import { contact, giving } from "@/lib/site";

export const metadata: Metadata = { title: "Ways to Give" };

const funds = [
    { title: "General Operating Fund", body: "Supports speaker venues, technical services, discussion groups, communications, and the day-to-day work required to deliver Council programs." },
    { title: "Student Program Support", body: "Supports Academic WorldQuest travel and student participation in Model United Nations programs." },
];

const heritage = [
    { title: "Heritage Champions Fore Charity", body: "A minimum $1,000 donation receives an additional 20% from the Heritage Classic Foundation.", window: "Donations are accepted January 1 through December 1." },
    { title: "Birdies For Charity", body: "Donors pledge a fixed amount or an amount per tournament birdie. The Heritage Classic Foundation adds 20% to the donation.", window: `Runs January 1 through ${ giving.birdiesEnd }; proceeds are generally paid in July.` },
];

export default function GivePage() {
    return (
        <>
            <PageHero eyebrow="Support WACHH" title="Ways to give">
                Donations support the Council’s public programs, distinguished speakers, and educational opportunities for local students.
                <Button asChild size="lg" variant="secondary" className="mt-8 flex w-fit"><a href={ giving.donateOnline }>Donate online</a></Button>
            </PageHero>

            <Section id="donate" title="Individual and recurring donations">
                <div className="grid gap-12 lg:grid-cols-[3fr_2fr]">
                    <div>
                        <p className="mb-5 max-w-2xl text-lg text-muted-foreground">You may direct your gift to either of the following funds.</p>
                        <dl className="divide-y divide-[#d9d7d1] border-y border-[#d9d7d1]">
                            { funds.map((fund) => <div key={ fund.title } className="py-6"><dt className="font-serif text-xl font-semibold text-primary">{ fund.title }</dt><dd className="mt-2 leading-relaxed text-muted-foreground">{ fund.body }</dd></div>) }
                        </dl>
                    </div>
                    <aside className="self-start border-t-4 border-gold bg-primary p-7 text-white">
                        <h3 className="font-serif text-2xl font-semibold">Make a donation</h3>
                        <p className="mt-3 text-white/80">The online form accepts one-time and recurring gifts and lets you select a fund.</p>
                        <Button asChild size="lg" variant="secondary" className="mt-6 w-full"><a href={ giving.donateOnline }>Open donation form</a></Button>
                        <p className="mt-6 border-t border-white/20 pt-5 text-sm text-white/75">Checks may be mailed to { contact.mail }.</p>
                    </aside>
                </div>
            </Section>

            <Section id="heritage" title="Heritage Classic Foundation programs" muted>
                <div className="divide-y divide-[#d9d7d1] border-y border-[#d9d7d1] bg-white">
                    { heritage.map((item) => <article key={ item.title } className="grid gap-3 py-6 md:grid-cols-[1fr_2fr]"><h3 className="font-serif text-xl font-semibold text-primary">{ item.title }</h3><div><p>{ item.body }</p><p className="mt-2 text-sm text-muted-foreground">{ item.window }</p></div></article>) }
                </div>
                <a href={ giving.heritage } target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 font-semibold text-primary hover:text-gold">Heritage giving information <ArrowUpRight className="size-4" /></a>
            </Section>

            <Section id="sponsorship" title="Speaker sponsorship">
                <div className="grid gap-6 md:grid-cols-[2fr_auto] md:items-center">
                    <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">Speaker sponsors help underwrite the Distinguished Speaker Series. Sponsors are acknowledged at the program, receive preferred seating, and are invited to a meal with the speaker.</p>
                    <Button asChild size="lg"><Link href="/get-involved/sponsor">View sponsorship options</Link></Button>
                </div>
            </Section>
        </>
    );
}
