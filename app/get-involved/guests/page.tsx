import Image from "next/image";
import type { Metadata } from "next";
import { fetchUpcomingEvents } from "@/sanity/lib/events";
import PageHero, { Section } from "@/components/page-hero";
import UpcomingPrograms from "@/components/speaker-events/upcoming-programs";
import { guestPolicy, isSpeakerSeries } from "@/lib/site";
import { fetchGuestPage } from "@/sanity/lib/get-involved";

export const revalidate = 60;

export const metadata: Metadata = { title: "Be a Guest" };

export default async function GuestsPage() {
    const events = (await fetchUpcomingEvents()).filter(isSpeakerSeries);
    const page = await fetchGuestPage();

    return (
        <>
            <PageHero
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Get Involved", href: "/get-involved" }, { label: "Be a guest" }]}
                title={page.title}
                image={{ src: page.heroImage.src, alt: page.heroImage.alt }}
            >
                {page.intro}
            </PageHero>

            <Section title={page.sectionTitle}>
                <Image src={page.sectionImage.src} alt={page.sectionImage.alt} width={1200} height={600} sizes="(max-width: 768px) 100vw, 1040px" className="mb-8 max-h-80 w-full object-cover" />
                <div className="grid gap-10 lg:grid-cols-[3fr_2fr]">
                    <div className="space-y-4 text-lg leading-relaxed text-[#444]">
                        {page.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                    <div className="self-start border-y border-[#d9d7d1] bg-white">
                        <h3 className="border-b border-[#d9d7d1] bg-[var(--off-white)] px-6 py-3 font-bold text-[var(--navy)]">Guest fees per event</h3>
                        <dl className="divide-y divide-[#d9d7d1]">
                            <div className="flex items-baseline justify-between gap-4 px-6 py-4">
                                <dt>Pre-register online <span className="block text-sm text-muted-foreground">by the Wednesday before</span></dt>
                                <dd className="font-[family-name:var(--serif)] text-2xl font-medium text-[var(--navy)]">${ guestPolicy.preRegisterFee }</dd>
                            </div>
                            <div className="flex items-baseline justify-between gap-4 px-6 py-4">
                                <dt>Walk-in <span className="block text-sm text-muted-foreground">day of the event</span></dt>
                                <dd className="font-[family-name:var(--serif)] text-2xl font-medium text-[var(--navy)]">${ guestPolicy.walkInFee }</dd>
                            </div>
                            <div className="flex items-baseline justify-between gap-4 px-6 py-4">
                                <dt>WACHH members</dt>
                                <dd className="font-bold text-[var(--navy)]">Included</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </Section>

            <UpcomingPrograms events={events} />
        </>
    );
}
