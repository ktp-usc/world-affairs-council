import type { Metadata } from "next";
import PageHero, { Section } from "@/components/page-hero";
import { contact } from "@/lib/site";

export const metadata: Metadata = { title: "About Us" };

const groups = [
    { title: "Board of Directors", body: "Volunteer directors who set the Council's strategy, oversee its finances and guide its growth." },
    { title: "Administration", body: "Our executive director and staff run day-to-day operations, membership and events." },
    { title: "Program Committee", body: "Members who scout, invite and host the speakers who appear on our stage each season." },
];

export default function AboutPage() {
    return (
        <>
            <PageHero eyebrow="About Us" title="A nonpartisan forum for global understanding">
                We believe that understanding the world makes us better neighbors, voters and citizens.
            </PageHero>

            <Section id="mission" title="Our Mission">
                <div className="grid gap-10 md:grid-cols-2">
                    <p className="text-lg">
                        The World Affairs Council of Hilton Head engages, educates and inspires our community about world
                        affairs. We bring diplomats, scholars, journalists and military leaders to the Lowcountry so that
                        residents can hear directly from the people shaping — and reporting on — events abroad.
                    </p>
                    <p className="text-muted-foreground">
                        Our programs are open to members, the general public and students. We take no political positions;
                        instead we offer a range of perspectives and trust our audience to weigh them. Questions from the
                        floor are a highlight of every program.
                    </p>
                </div>
            </Section>

            <Section id="leadership" title="Leadership" muted>
                <div className="grid gap-5 md:grid-cols-3">
                    { groups.map((g) => (
                        <div key={ g.title } className="rounded-xl border bg-card p-6">
                            <h3 className="font-serif text-xl font-semibold text-primary">{ g.title }</h3>
                            <p className="mt-2 text-sm text-muted-foreground">{ g.body }</p>
                        </div>
                    )) }
                </div>
                <p className="mt-6 text-sm text-muted-foreground">
                    To reach Council leadership, email <a href={ `mailto:${ contact.email }` } className="text-primary underline">{ contact.email }</a>.
                </p>
            </Section>

            <Section id="annual-report" title="Annual Report">
                <p className="max-w-2xl text-muted-foreground">
                    Each year we publish a report on our programs, membership and finances. Members can request the
                    current report from the Council office.
                </p>
            </Section>

            <Section id="waca" title="World Affairs Councils of America" muted>
                <p className="max-w-2xl text-muted-foreground">
                    We are a proud member of the World Affairs Councils of America, a national network of councils that
                    share a commitment to global education and civic engagement. Membership connects our community to
                    speakers, resources and partner councils across the country.
                </p>
                <a href="https://www.worldaffairscouncils.org/" target="_blank" rel="noreferrer" className="mt-4 inline-block font-medium text-primary underline">
                    Visit worldaffairscouncils.org
                </a>
            </Section>
        </>
    );
}
