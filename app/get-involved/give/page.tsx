import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Building2, GraduationCap, Mail, Mic, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero, { Section } from "@/components/page-hero";
import Testimonial from "@/components/testimonial";
import { contact, giving } from "@/lib/site";

export const metadata: Metadata = { title: "Ways to Give" };

const funds = [
    {
        icon: Building2,
        title: "General Operating Fund",
        body: "Covers venue and technical support for 14 distinguished speakers each year, meeting space for discussion groups, our marketing and development efforts, our website, and other programs important to our success.",
    },
    {
        icon: GraduationCap,
        title: "Student Program Support",
        body: "Covers travel costs for students on our local winning High School team to participate in the National Academic WorldQuest competition and/or toward student attendance at Model UN Programs.",
    },
];

const heritage = [
    {
        title: "Heritage Champions Fore Charity",
        body: "Requires a minimum donation of $1,000 and the Heritage Classic Foundation adds 20% to the donation.",
        window: "Open for donations from January 1 – December 1 of each year.",
    },
    {
        title: "Birdies For Charity",
        body: "Tied to the RBC Heritage golf tournament. Donors can pledge a fixed amount or an amount per tournament birdie. The Heritage Classic Foundation adds 20% to the donation. Aggregate donations and the Heritage Classic Foundation match are paid to WACHH after the tournament, typically in July.",
        window: `Runs January 1 to the last day of the RBC Heritage (${ giving.birdiesEnd }).`,
    },
];

export default function GivePage() {
    return (
        <>
            <PageHero eyebrow="Get Involved" title="Opportunities to Give">
                As a nonprofit, we rely on donations to bring top speakers to the island and to fund student programs. Gifts of
                any size make a difference.
                <Button asChild size="lg" variant="secondary" className="mt-8 flex w-fit"><a href={ giving.donateOnline }>Donate online</a></Button>
            </PageHero>

            <Section id="donate" title="Individual and Recurring Donations">
                <div className="grid gap-10 lg:grid-cols-[3fr_2fr]">
                    <div>
                        <p className="mb-6 text-lg text-muted-foreground">How your contributions will be used:</p>
                        <div className="space-y-5">
                            { funds.map(({ icon: Icon, title, body }) => (
                                <div key={ title } className="flex gap-5 rounded-xl border bg-card p-6">
                                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                                        <Icon className="size-5" />
                                    </span>
                                    <div>
                                        <h3 className="font-serif text-xl font-semibold text-primary">{ title }</h3>
                                        <p className="mt-1.5 text-muted-foreground">{ body }</p>
                                    </div>
                                </div>
                            )) }
                        </div>
                    </div>

                    <div className="self-start rounded-xl bg-primary p-7 text-primary-foreground shadow-sm">
                        <p className="text-sm font-semibold tracking-[0.15em] text-gold uppercase">Online Donation Form</p>
                        <h3 className="mt-2 font-serif text-2xl font-semibold">Give today</h3>
                        <p className="mt-2 text-white/80">
                            Choose the General Operating Fund or Student Program Support, and give once or set up a recurring gift.
                        </p>
                        <ul className="mt-5 space-y-2 text-sm text-white/80">
                            <li className="flex items-center gap-2"><Repeat className="size-4 text-gold" />One-time or recurring</li>
                            <li className="flex items-center gap-2"><GraduationCap className="size-4 text-gold" />Direct your gift to a fund</li>
                        </ul>
                        <Button asChild size="lg" variant="secondary" className="mt-6 w-full"><a href={ giving.donateOnline }>Open the donation form</a></Button>
                        <p className="mt-5 flex gap-2 border-t border-white/15 pt-5 text-sm text-white/70">
                            <Mail className="mt-0.5 size-4 shrink-0" />
                            <span>Prefer to give by check? Mail it to { contact.mail }.</span>
                        </p>
                    </div>
                </div>
            </Section>

            <Section id="heritage" title="Heritage Classic Foundation" muted>
                <div className="grid gap-6 md:grid-cols-2">
                    { heritage.map((h) => (
                        <div key={ h.title } className="flex flex-col rounded-xl border bg-card p-7">
                            <span className="mb-3 inline-block self-start rounded-full bg-gold/25 px-2.5 py-0.5 text-xs font-semibold text-primary">+20% match</span>
                            <h3 className="font-serif text-2xl font-semibold text-primary">{ h.title }</h3>
                            <p className="mt-2 flex-1 text-muted-foreground">{ h.body }</p>
                            <p className="mt-5 border-t pt-4 text-sm font-medium">{ h.window }</p>
                        </div>
                    )) }
                </div>
                <Button asChild size="lg" className="mt-8">
                    <a href={ giving.heritage } target="_blank" rel="noreferrer">Learn more <ArrowUpRight className="size-4" /></a>
                </Button>
            </Section>

            <Section id="sponsorship" title="Speaker Sponsorship">
                <div className="grid items-center gap-8 rounded-xl border bg-card p-7 md:grid-cols-[auto_1fr_auto] md:p-9">
                    <span className="inline-flex size-14 items-center justify-center rounded-xl bg-primary text-gold">
                        <Mic className="size-6" />
                    </span>
                    <div className="space-y-3 text-muted-foreground">
                        <p>
                            Sponsoring a World Affairs Council of Hilton Head speaker program directly impacts the Council’s
                            programming, allowing our Distinguished Speakers Program to host 12 national and 2 international
                            experts annually.
                        </p>
                        <p>
                            Sponsors are invited to a lunch or dinner with the speaker. At the speaker event, they are acknowledged
                            and given preferred seating.
                        </p>
                    </div>
                    <Button asChild size="lg" className="md:self-center"><Link href="/get-involved/sponsor">Sponsor a Speaker</Link></Button>
                </div>
            </Section>

            <Section muted>
                <Testimonial
                    photo="/images/john-strother.png"
                    name="John Strother"
                    role="WACHH Marketing Committee"
                    quote="I love the World Affairs Council of Hilton Head speakers. Every speaker has incredible expertise in international affairs or government. The speakers and topics are engaging. Their Great Decisions program is a fun way to discuss current events and ideas. Their Book Club makes for great conversations about timely subjects. Several weeks ago, we were fortunate to have the former ambassador to Russia come and join us in discussing his book. Pretty nice to have such an intimate environment with such knowledgeable people."
                />
            </Section>
        </>
    );
}
