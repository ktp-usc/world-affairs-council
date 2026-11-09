import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero, { Section } from "@/components/page-hero";
import DonationForm from "@/components/donation-form";
import { contact, giving } from "@/lib/site";

export const metadata: Metadata = { title: "Ways to Give" };

const funds = [
    { title: "General Operating Fund", body: "Supports speaker venues, technical services, discussion groups, communications, and the day-to-day work required to deliver Council programs." },
    { title: "Student Program Support", body: "Supports Academic WorldQuest travel and student participation in Model United Nations programs." },
];

const heritage = [
    { title: "Heritage Champions Fore Charity", body: "Contributions of $1,000 to $10,000 made through this program receive an additional 20% from the Heritage Classic Foundation.", window: "2026 campaign: January 1 through December 1, 2026." },
    { title: "Birdies For Charity", body: "Donors pledge $0.01 to $1 per tournament birdie or make a flat donation of $25 to $1,000. The Heritage Classic Foundation adds 20% to eligible gifts made through the program.", window: `2026 campaign closed. Ran January 1 through ${ giving.birdiesEnd }. WACHH typically receives proceeds in July; timing may vary.` },
];

export default function GivePage() {
    return (
        <>
            <PageHero breadcrumbs={[{ label: "Home", href: "/" }, { label: "Get Involved", href: "/get-involved" }, { label: "Ways to give" }]} title="Ways to give">
                <p>Donations support the Council’s public programs, distinguished speakers, and educational opportunities for local students. You can give online or by check.</p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                    <Button asChild size="lg" variant="secondary" className="h-auto min-h-12 whitespace-normal px-7 py-3 text-lg"><a href="#donation-form">Donate online</a></Button>
                    <Button asChild size="lg" variant="outline" className="h-auto min-h-12 border-white/70 bg-transparent px-7 py-3 text-lg text-white hover:bg-white/10"><a href="#give-by-check">Give by check</a></Button>
                </div>
                <div id="give-by-check" className="mt-8 scroll-mt-6 border-l-4 border-[var(--header-gold)] bg-white p-6 text-primary sm:p-7">
                    <h2 className="font-[family-name:var(--serif)] text-2xl font-medium">Give by check</h2>
                    <p className="mt-2 text-base text-muted-foreground">Please mail your check to:</p>
                    <address className="mt-3 text-xl leading-relaxed not-italic">
                        <span className="block font-semibold">World Affairs Council of Hilton Head</span>
                        <span className="block">{contact.mail}</span>
                    </address>
                </div>
            </PageHero>

            <Section id="donate" title="Individual and recurring donations">
                <div className="grid gap-12 lg:grid-cols-[3fr_2fr]">
                    <div>
                        <p className="mb-5 max-w-2xl text-lg text-muted-foreground">You may direct your gift to either of the following funds.</p>
                        <dl className="divide-y divide-[#d9d7d1] border-y border-[#d9d7d1]">
                            { funds.map((fund) => <div key={ fund.title } className="py-6"><dt className="font-serif text-xl font-semibold text-primary">{ fund.title }</dt><dd className="mt-2 leading-relaxed text-muted-foreground">{ fund.body }</dd></div>) }
                        </dl>
                    </div>
                    <figure className="self-start border-b-4 border-gold bg-[var(--off-white)]">
                        <Image
                            src="/programs/academic-worldquest/gallery/l1007477.jpg"
                            alt="A smiling student team gathered around a table at Academic WorldQuest"
                            width={2640}
                            height={2112}
                            sizes="(min-width: 1024px) 400px, (min-width: 768px) 720px, 100vw"
                            className="h-auto w-full"
                        />
                        <figcaption className="p-5 text-lg leading-relaxed text-primary">Your gift helps local students explore the world through Academic WorldQuest and Model United Nations.</figcaption>
                    </figure>
                </div>
            </Section>

            <Section id="donation-form" muted>
                <DonationForm />
            </Section>

            <Section id="heritage" title="Heritage Classic Foundation programs">
                <p className="mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">To qualify for the 20% match, make your gift through the Heritage Classic Foundation and select <strong className="font-semibold text-primary">World Affairs Council of Hilton Head</strong> as the beneficiary.</p>
                <div className="divide-y divide-[#d9d7d1] border-y border-[#d9d7d1] bg-white">
                    { heritage.map((item) => <article key={ item.title } className="grid gap-3 py-6 md:grid-cols-[1fr_2fr]"><h3 className="font-serif text-xl font-semibold text-primary">{ item.title }</h3><div><p>{ item.body }</p><p className="mt-2 text-sm text-muted-foreground">{ item.window }</p></div></article>) }
                </div>
                <a href={ giving.heritage } target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 font-semibold text-primary hover:text-gold">Heritage giving information <ArrowUpRight className="size-4" /></a>
            </Section>

            <Section id="sponsorship" title="Speaker Sponsorship">
                <div className="grid gap-6 md:grid-cols-[2fr_auto] md:items-center">
                    <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">Speaker sponsors help underwrite the Distinguished Speaker Series. Sponsors are acknowledged at the program, receive preferred seating, and are invited to a meal with the speaker.</p>
                    <Button asChild size="lg"><Link href="/get-involved/sponsor">View sponsorship options</Link></Button>
                </div>
            </Section>
        </>
    );
}
