import MemberStory from "@/components/member-story";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import PageHero, { Section } from "@/components/page-hero";
import SponsorForm from "@/components/sponsor-form";
import Image from "next/image";
import { getSpeakerSponsorshipSchedule } from "@/lib/speaker-sponsorship";
import SpeakerSponsorshipTable from "@/components/speaker-sponsorship-table";
import { fetchSponsorPage } from "@/sanity/lib/get-involved";

export const metadata: Metadata = { title: "Sponsor a Speaker" };

/** Sponsor a Speaker; its text, levels and quote come from Studio > Get Involved > Sponsor a Speaker. */
export default async function SponsorPage() {
    const [schedule, page] = await Promise.all([getSpeakerSponsorshipSchedule(), fetchSponsorPage()]);
    return (
        <>
            <PageHero
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Get Involved", href: "/get-involved" }, { label: "Sponsor a speaker" }]}
                title={page.title}
                image={{ src: page.heroImage.src, alt: page.heroImage.alt }}
            >
                {page.intro}
                <Button asChild size="lg" variant="secondary" className="mt-8 flex w-fit"><a href="#become-a-sponsor">Become a Sponsor</a></Button>
            </PageHero>

            <Section>
                <figure>
                    <Image src={page.featurePhoto.photo.src} alt={page.featurePhoto.photo.alt} width={1200} height={600} sizes="(max-width: 768px) 100vw, 1040px" className="max-h-96 w-full object-cover" />
                    <figcaption className="mt-3 text-muted-foreground">{page.featurePhoto.caption}</figcaption>
                </figure>
            </Section>

            <Section id="levels" title={page.levelsTitle}>
                {page.levels.length > 0 && <div className="divide-y divide-[#d9d7d1] border-y border-[#d9d7d1]">
                    { page.levels.map((level) => (
                        <article key={ level.name } className="grid gap-4 py-6 md:grid-cols-[1fr_10rem_2fr] md:items-start">
                            <h3 className="font-serif text-2xl font-semibold text-primary">{ level.name }</h3>
                            <div><p className="font-serif text-2xl font-semibold text-primary">${ level.amount.toLocaleString() }</p><p className="mt-1 text-xs text-muted-foreground">Limit { level.limit } per speaker</p></div>
                            <p className="leading-relaxed text-muted-foreground">{ level.perks }</p>
                        </article>
                    )) }
                </div>}
            </Section>

            <Section id="become-a-sponsor" title={page.becomeTitle} muted>
                <div className="max-w-3xl space-y-3 text-muted-foreground">
                    {page.becomeParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    <p>For your convenience, the <a href="#presentations" className="font-semibold text-primary underline underline-offset-4">{schedule.season} speaker presentation schedule</a> is provided below.</p>
                </div>
            </Section>

            <Section id="sponsorship-form" title={page.formTitle} muted>
                <SponsorForm />
            </Section>

            <Section muted><MemberStory photo={page.testimonial.photo} name={page.testimonial.name} role={page.testimonial.role}><p>{page.testimonial.quote}</p></MemberStory></Section>

            <SpeakerSponsorshipTable schedule={schedule} />
        </>
    );
}
