import type { Metadata } from "next";
import { Check, CreditCard, FileText, GraduationCap, KeyRound, Sprout, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero, { Section } from "@/components/page-hero";
import PhotoCarousel from "@/components/photo-carousel";
import Testimonial from "@/components/testimonial";
import { gallery, memberBenefits, membership } from "@/lib/site";

export const metadata: Metadata = { title: "Become a Member" };

const reasons = [
    {
        icon: GraduationCap,
        title: "An education.",
        body: "Membership gives you unparalleled access to influential figures in the global arena. Our speakers will inform you of the most up to date information on today’s toughest international issues.",
    },
    {
        icon: KeyRound,
        title: "Access.",
        body: "Membership offers access to other member only programs such as Great Decisions, Fall Forum, newsletters and WACA programs.",
    },
    {
        icon: Users,
        title: "A community.",
        body: "Membership provides opportunities to network socially and professionally within a dynamic, internationally minded group that includes civic, academic, military and business leaders in our region.",
    },
    {
        icon: Sprout,
        title: "An opportunity to influence our future leaders.",
        body: "Volunteer or financially support our two student outreach programs, Model UN and Academic WorldQuest. We are empowering our youth with the same global sensibilities to ensure a more secure world future for us all.",
    },
];

function Mark({ yes }: { yes: boolean }) {
    return yes
        ? <Check className="mx-auto size-5 text-primary" aria-label="Included" />
        : <X className="mx-auto size-5 text-muted-foreground/60" aria-label="Not included" />;
}

export default function MembershipPage() {
    return (
        <>
            <PageHero eyebrow="Get Involved" title="Become a Member">
                <p>Join a community of neighbors who care about the world beyond our shores.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                    <Button asChild size="lg" variant="secondary"><a href={ membership.joinOnline }>Join now</a></Button>
                    <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white">
                        <a href={ membership.renew }>Renew membership</a>
                    </Button>
                </div>
            </PageHero>

            <div className="border-b bg-secondary">
                <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
                    <p className="text-secondary-foreground">
                        <span className="font-serif font-semibold">World Affairs Members</span> — It’s time to renew your membership
                        for { membership.renewalYear }.{ " " }
                        <a href={ membership.renew } className="font-semibold underline underline-offset-4 hover:text-primary/80">Click here</a>{ " " }
                        and log in to renew today!
                    </p>
                    <Button asChild><a href={ membership.renew }>Renew for { membership.renewalYear }</a></Button>
                </div>
            </div>

            <Section title="Membership with the World Affairs Council Hilton Head is…">
                <div className="grid gap-6 md:grid-cols-2">
                    { reasons.map(({ icon: Icon, title, body }) => (
                        <div key={ title } className="rounded-xl border bg-card p-7">
                            <span className="mb-4 inline-flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
                                <Icon className="size-5" />
                            </span>
                            <h3 className="font-serif text-xl font-semibold text-primary">{ title }</h3>
                            <p className="mt-2 text-muted-foreground">{ body }</p>
                        </div>
                    )) }
                </div>
            </Section>

            <Section id="benefits" title="Member Benefits" muted>
                <div className="overflow-x-auto rounded-xl border bg-card">
                    <table className="w-full text-left">
                        <thead className="bg-primary text-primary-foreground">
                            <tr>
                                <th scope="col" className="px-5 py-4 font-serif text-lg font-semibold">Benefits</th>
                                <th scope="col" className="w-28 px-3 py-4 text-center text-sm font-semibold tracking-wider text-gold uppercase">Member</th>
                                <th scope="col" className="w-28 px-3 py-4 text-center text-sm font-semibold tracking-wider uppercase">Non-member</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            { memberBenefits.map(({ benefit, nonMember }) => (
                                <tr key={ benefit } className="even:bg-muted/40">
                                    <th scope="row" className="px-5 py-4 font-normal">{ benefit }</th>
                                    <td className="px-3 py-4"><Mark yes /></td>
                                    <td className="px-3 py-4"><Mark yes={ nonMember } /></td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section>
                <Testimonial
                    photo="/images/jan-cooper.png"
                    name="Jan Cooper"
                    role="WACHH Member"
                    quote="Hilton Head is a vibrant community with a very engaged population. The World Affairs Council of Hilton Head offers the opportunity for individuals to remain educated and up-to-date on world affairs and their impact on the US. It is a small investment of time and dollars that offers an extraordinary return. We are incredibly fortunate to have this jewel in our midst!"
                />
            </Section>

            <Section id="gallery" title="Life at the Council" muted>
                <PhotoCarousel slides={ gallery } />
            </Section>

            <Section id="join" title="There are two ways to join">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex flex-col rounded-xl border bg-primary p-7 text-primary-foreground">
                        <CreditCard className="mb-4 size-6 text-gold" />
                        <h3 className="font-serif text-2xl font-semibold">By credit card</h3>
                        <p className="mt-2 mb-6 flex-1 opacity-80">Use the Online Membership Form.</p>
                        <Button asChild variant="secondary" className="self-start"><a href={ membership.joinOnline }>Online Membership Form</a></Button>
                    </div>
                    <div className="flex flex-col rounded-xl border bg-card p-7">
                        <FileText className="mb-4 size-6 text-primary" />
                        <h3 className="font-serif text-2xl font-semibold text-primary">By check</h3>
                        <p className="mt-2 mb-6 flex-1 text-muted-foreground">Print the Membership Form, fill it out and mail it in to the office.</p>
                        <Button asChild className="self-start"><a href={ membership.printForm } target="_blank" rel="noreferrer">Membership Form (PDF)</a></Button>
                    </div>
                </div>
            </Section>
        </>
    );
}
