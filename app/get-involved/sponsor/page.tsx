import MemberStory from "@/components/member-story";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import PageHero, { Section } from "@/components/page-hero";
import SponsorForm from "@/components/sponsor-form";
import Image from "next/image";
import { sponsorship } from "@/lib/site";
import { getSpeakerSponsorshipSchedule } from "@/lib/speaker-sponsorship";
import SpeakerSponsorshipTable from "@/components/speaker-sponsorship-table";

export const metadata: Metadata = { title: "Sponsor a Speaker" };

export default async function SponsorPage() {
    const schedule = await getSpeakerSponsorshipSchedule();
    return (
        <>
            <PageHero
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Get Involved", href: "/get-involved" }, { label: "Sponsor a speaker" }]}
                title="Sponsor a speaker"
                image={{ src: "/images/sponsor-a-speaker.jpg", alt: "A WACHH speaker addressing the audience" }}
            >
                Speaker sponsorship helps fund the Distinguished Speaker Series. Sponsors are acknowledged at the program, receive preferred seating, and are invited to a meal with the speaker.
                <Button asChild size="lg" variant="secondary" className="mt-8 flex w-fit"><a href="#become-a-sponsor">Become a Sponsor</a></Button>
            </PageHero>

            <Section>
                <figure>
                    <Image src="/programs/main/programs-speaker-crowd.png" alt="Council audience gathered for a speaker presentation" width={1200} height={600} sizes="(max-width: 768px) 100vw, 1040px" className="max-h-96 w-full object-cover" />
                    <figcaption className="mt-3 text-muted-foreground">Sponsorships help bring 12 national and two international experts to Hilton Head each year. Sponsors receive recognition from the podium, on the WACHH website, and in the Annual Report.</figcaption>
                </figure>
            </Section>

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
                    <p>For your convenience, the <a href="#presentations" className="font-semibold text-primary underline underline-offset-4">{schedule.season} speaker presentation schedule</a> is provided below.</p>
                </div>
            </Section>

            <Section id="sponsorship-form" title="Sponsorship Donation Form" muted>
                <SponsorForm presentations={schedule.presentations ?? []} />
            </Section>

            <Section muted><MemberStory photo="/images/richard-hammes.png" name="Richard Hammes" role="WACHH Member"><p>I cannot think of another organization that provides the wide array of speakers on such a broad range of topics as the World Affairs Council of Hilton Head. They bring to our community true experts in their fields that would be impossible to find anywhere else, especially for the cost of this membership. The nuggets of knowledge gained from these experts is why I try to never miss a presentation. Once you come to your first session you will be hooked.</p></MemberStory></Section>

            <SpeakerSponsorshipTable schedule={schedule} />
        </>
    );
}
