import MemberStory from "@/components/member-story";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero, { Section } from "@/components/page-hero";
import DonationForm from "@/components/donation-form";
import { contact, giving } from "@/lib/site";

export const metadata: Metadata = { title: "Opportunities to Give" };

export default function GivePage() {
    return (
        <>
            <PageHero breadcrumbs={[{ label: "Home", href: "/" }, { label: "Get Involved", href: "/get-involved" }, { label: "Opportunities to give" }]} title="Opportunities to give">
                <p>Your support brings outstanding speakers to our community, provides meaningful educational programs for students, and helps members engage with the international issues shaping our world. Give by credit card using the forms below, or arrange a gift by check.</p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                    <Button asChild size="lg" variant="secondary" className="h-auto min-h-12 whitespace-normal px-7 py-3 text-lg"><a href="#donation-form">Donate online</a></Button>
                    <Button asChild size="lg" variant="outline" className="h-auto min-h-12 border-white/70 bg-transparent px-7 py-3 text-lg text-white hover:bg-white/10"><a href="#give-by-check">Give by check</a></Button>
                </div>
                <div id="give-by-check" className="mt-8 scroll-mt-6 border-l-4 border-[var(--header-gold)] bg-white p-6 text-primary sm:p-7">
                    <h2 className="font-[family-name:var(--serif)] text-2xl font-medium">Give by check</h2>
                    <p className="mt-2 text-base text-muted-foreground">Contact Tracie Martucci at WACHH at <a className="font-semibold underline" href="tel:18433846758">(843) 384-6758</a> to make arrangements. The Council’s mailing address is:</p>
                    <address className="mt-3 text-xl leading-relaxed not-italic"><span className="block font-semibold">World Affairs Council of Hilton Head</span><span className="block">{contact.mail}</span></address>
                </div>
            </PageHero>

            <Section id="donate" title="Individual donations and student support">
                <div className="grid gap-12 lg:grid-cols-[3fr_2fr]">
                    <div>
                        <p className="mb-5 max-w-2xl text-lg text-muted-foreground">Every gift matters. Donations of any amount are welcome throughout the year.</p>
                        <dl className="divide-y divide-[#d9d7d1] border-y border-[#d9d7d1]">
                            <div className="py-6"><dt className="font-serif text-xl font-semibold text-primary">General Operating Fund</dt><dd className="mt-2 leading-relaxed text-muted-foreground">Supports meeting space for discussion groups, staff, technology, our website, and the other essential costs of delivering WACHH programs.</dd></div>
                            <div className="py-6"><dt className="font-serif text-xl font-semibold text-primary">Student Program Support</dt><dd className="mt-2 leading-relaxed text-muted-foreground">Covers travel for our local winning high school team to attend the National Academic WorldQuest competition in Washington, D.C., and student participation in Model United Nations programs.</dd></div>
                        </dl>
                        <div className="mt-6 space-y-4 text-lg text-muted-foreground">
                            <p><strong className="text-primary">$50</strong> supports one high school student participating in Model UN.</p>
                            <p><strong className="text-primary">$500</strong> helps cover travel expenses for a student attending the National Academic WorldQuest competition.</p>
                            <a href="#student-donation-form" className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">Support the Student Program Fund</a>
                        </div>
                    </div>
                    <div className="space-y-6 self-start">
                    <figure className="border-b-4 border-gold bg-[var(--off-white)]">
                        <Image src="/programs/academic-worldquest/gallery/l1007477.jpg" alt="A smiling student team gathered around a table at Academic WorldQuest" width={2640} height={2112} sizes="(min-width: 1024px) 400px, (min-width: 768px) 720px, 100vw" className="h-auto w-full" />
                        <figcaption className="p-5 text-lg leading-relaxed text-primary">Your gift helps local students explore the world through Academic WorldQuest and Model United Nations.</figcaption>
                    </figure>
                    <figure className="border-b-4 border-gold bg-[var(--off-white)]">
                        <Image src="/programs/model-un/gallery/mun-2018-2.jpg" alt="High school students representing Singapore at a Model United Nations conference" width={960} height={640} sizes="(min-width: 1024px) 400px, 100vw" className="h-auto w-full" />
                        <figcaption className="p-5 leading-relaxed text-primary">Student Program Fund gifts support participation in Model UN.</figcaption>
                    </figure>
                    </div>
                </div>
            </Section>

            <Section id="heritage" title="Heritage Classic Foundation giving opportunities" muted>
                <p className="mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">Gifts through the Heritage Classic Foundation receive an additional 20% match. Select <strong className="font-semibold text-primary">World Affairs Council Hilton Head</strong> from the foundation’s beneficiary drop-down menu.</p>
                <div className="divide-y divide-[#d9d7d1] border-y border-[#d9d7d1]">
                    <article className="grid gap-3 py-6 md:grid-cols-[1fr_2fr]"><h3 className="font-serif text-xl font-semibold text-primary">Heritage Champions Fore Charity</h3><div><p>Gifts from $1,000 to $10,000 receive an additional 20% from the Heritage Classic Foundation. A $1,000 gift provides $1,200 for WACHH.</p><p className="mt-2 text-sm text-muted-foreground">Open for donations January 1 through December 1 each year.</p><a className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline" href={giving.heritage} target="_blank" rel="noopener noreferrer">Donate through Heritage Champions <ArrowUpRight className="size-4" /></a></div></article>
                    <article className="grid gap-3 py-6 md:grid-cols-[1fr_2fr]"><h3 className="font-serif text-xl font-semibold text-primary">Birdies for Charity</h3><div><p>Support WACHH during the RBC Heritage by making a fixed contribution or pledging an amount tied to tournament birdies. The Heritage Classic Foundation adds 20% to eligible donations.</p><p className="mt-2 text-sm text-muted-foreground">2027 campaign: January 1 through {giving.birdiesEnd}, the final day of the RBC Heritage.</p><a className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline" href={giving.heritage} target="_blank" rel="noopener noreferrer">Donate through Birdies for Charity <ArrowUpRight className="size-4" /></a></div></article>
                </div>
                <p className="mt-6 text-muted-foreground">Heritage Classic Foundation guidelines stipulate that donors receive no tangible benefits in exchange for these contributions.</p>
            </Section>

            <Section id="sponsorship" title="Distinguished Speaker sponsorships">
                <figure className="mb-8">
                    <Image src="/programs/main/programs-speaker-crowd.png" alt="A speaker addressing Council members and guests in a full auditorium" width={1798} height={792} sizes="(min-width: 1100px) 1040px, 100vw" className="h-auto w-full" />
                    <figcaption className="mt-3 text-sm text-muted-foreground">Your support brings world affairs conversations to our community.</figcaption>
                </figure>
                <div className="grid gap-6 md:grid-cols-[2fr_auto] md:items-center">
                    <div className="space-y-4 text-lg leading-relaxed text-muted-foreground"><p>The average cost of presenting each of our 12 Distinguished Speakers is approximately $5,000, including facilities, travel, and honorarium. Members can help through an Ambassador sponsorship ($1,000) or Diplomat sponsorship ($500).</p><p>Sponsors receive recognition from the podium, on the WACHH website, and in our Annual Report. Sponsors of Distinguished and Global Speakers are invited to lunch or dinner with their speaker and receive recognition and preferred seating at the event.</p></div>
                    <Button asChild size="lg"><Link href="/get-involved/sponsor">View sponsorship options</Link></Button>
                </div>
            </Section>

            <Section id="global-speaker-fund" title="Global Speaker Fund" muted>
                <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">Each year, WACHH presents two Global Speakers who travel internationally to Hilton Head, at a cost of approximately $10,000 per speaker. Contributions to the Global Speaker Fund may be made through the Community Foundation of the Lowcountry.</p>
                <Button asChild size="lg" className="mt-6 h-auto whitespace-normal py-3"><a href={giving.globalSpeakerFund} target="_blank" rel="noopener noreferrer">Contribute to the Global Speaker Fund <ArrowUpRight className="size-4 shrink-0" /></a></Button>
            </Section>

            <Section id="monthly-giving" title="Monthly giving">
                <div className="grid gap-8 lg:grid-cols-[2fr_3fr] lg:items-center">
                <figure>
                    <Image src="/programs/academic-worldquest/gallery/dscf8670.jpg" alt="Student teams and adult organizers gathered for Academic WorldQuest" width={2640} height={1760} sizes="(min-width: 1024px) 400px, 100vw" className="h-auto w-full" />
                    <figcaption className="mt-3 text-sm text-muted-foreground">Reliable support helps sustain Council programs, including educational opportunities for students.</figcaption>
                </figure>
                <div>
                <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">Recurring gifts provide a reliable, predictable source of support, helping WACHH plan confidently and sustain high-quality programs throughout the year. Even a modest monthly gift adds up. Select Monthly giving in the donation forms below, then choose Monthly under Payment Frequency.</p>
                <a href="#monthly-donation-form" className="mt-5 inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">Set up a monthly donation</a>
                </div>
                </div>
            </Section>

            <Section id="donation-form" title="Online donation forms" muted><DonationForm /></Section>

            <Section id="tax-smart-giving" title="Tax-smart ways to give">
                <p className="mb-6 max-w-3xl text-lg text-muted-foreground">There may be opportunities to support WACHH while also achieving your personal financial and charitable-giving objectives.</p>
                <div className="grid gap-8 md:grid-cols-2">
                    <article><h3 className="font-serif text-2xl text-primary">Qualified Charitable Distributions (QCDs)</h3><p className="mt-3 leading-relaxed text-muted-foreground">If you are age 70½ or older, you may be able to make a Qualified Charitable Distribution directly from an eligible IRA to a qualified charitable organization. A properly structured QCD is generally excluded from taxable income and may also count toward an applicable Required Minimum Distribution.</p></article>
                    <article><h3 className="font-serif text-2xl text-primary">Required Minimum Distributions (RMDs)</h3><p className="mt-3 leading-relaxed text-muted-foreground">For many current retirees, RMDs begin at age 73, although the applicable starting age can vary based on date of birth. If you are required to take an RMD, an eligible QCD may satisfy all or part of that requirement while supporting a charitable organization.</p></article>
                </div>
                <p className="mt-8 leading-relaxed text-muted-foreground">Because individual tax and financial circumstances vary, we encourage you to consult your financial advisor, tax professional, or IRA administrator before making a QCD or other tax-planned charitable gift.</p>
                <p className="mt-6 text-muted-foreground">Two WACHH partners have offered to serve as resources for members interested in learning more:</p>
                <div className="mt-5 grid gap-6 border-y border-[#d9d7d1] py-6 md:grid-cols-2">
                    <p><strong className="block text-primary">Ron Latin</strong><span className="block text-muted-foreground">WACHH Member</span><a className="inline-flex min-h-11 items-center font-semibold text-primary underline" href="tel:18434764772">(843) 476-4772</a></p>
                    <p><strong className="block text-primary">David Ruckno</strong><span className="block text-muted-foreground">Merrill Lynch Corporate Sponsor</span><a className="inline-flex min-h-11 items-center font-semibold text-primary underline" href="tel:18433419528">(843) 341-9528</a></p>
                </div>
            </Section>
            <Section muted><MemberStory photo="/images/john-strother.png" name="John Strother" role="WACHH Marketing Committee"><p>I love the World Affairs Council of Hilton Head speakers. Every speaker has incredible expertise in international affairs or government. The speakers and topics are engaging. Their Great Decisions program is a fun way to discuss current events and ideas. Their Book Club makes for great conversations about timely subjects. Several weeks ago, we were fortunate to have the former ambassador to Russia come and join us in discussing his book. Pretty nice to have such an intimate environment with such knowledgeable people.</p></MemberStory></Section>
        </>
    );
}
