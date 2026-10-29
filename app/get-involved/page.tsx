import type { Metadata } from "next";
import { Gift, HandHeart, Mic, UserPlus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero, { Section } from "@/components/page-hero";

export const metadata: Metadata = { title: "Get Involved" };

const ways = [
    {
        id: "membership",
        icon: UserPlus,
        title: "Become a Member",
        body: "Membership includes admission to the Distinguished Speaker Series, member-only events and our newsletter — and it sustains everything we do.",
        cta: "Join or renew",
        href: "/get-involved/membership",
    },
    {
        id: "guests",
        icon: Users,
        title: "Be a Guest",
        body: "Curious before you commit? Non-members may attend speaker programs as guests, subject to our guest policy and seating availability.",
        cta: "See upcoming speakers",
        href: "/get-involved/guests",
    },
    {
        id: "volunteer",
        icon: HandHeart,
        title: "Volunteer",
        body: "Greet attendees, help with student competitions, host speakers or serve on a committee. Volunteers keep the Council running.",
        cta: "Volunteer with us",
        href: "/get-involved/volunteer",
    },
    {
        id: "give",
        icon: Gift,
        title: "Ways to Give",
        body: "As a nonprofit, we rely on donations to bring top speakers to the island and to fund student programs. Gifts of any size make a difference.",
        cta: "See ways to give",
        href: "/get-involved/give",
    },
    {
        id: "sponsor",
        icon: Mic,
        title: "Sponsor a Speaker",
        body: "Businesses and individuals can underwrite a program and be recognized before our audience and on our website.",
        cta: "Become a sponsor",
        href: "/get-involved/sponsor",
    },
];

export default function GetInvolvedPage() {
    return (
        <>
            <PageHero eyebrow="Get Involved" title="There’s a place for you at the Council">
                Join, attend, volunteer or give — every form of involvement helps our community stay connected to the world.
            </PageHero>

            <Section>
                <div className="grid gap-6 md:grid-cols-2">
                    { ways.map(({ id, icon: Icon, title, body, cta, href }) => (
                        <div key={ id } id={ id } className="flex flex-col rounded-xl border bg-card p-7 first:md:col-span-2 first:md:bg-primary first:md:text-primary-foreground">
                            <span className="mb-4 inline-flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
                                <Icon className="size-5" />
                            </span>
                            <h2 className="font-serif text-2xl font-semibold">{ title }</h2>
                            <p className="mt-2 mb-6 flex-1 opacity-80">{ body }</p>
                            <Button asChild className="self-start" variant={ id === "membership" ? "secondary" : "default" }>
                                <a href={ href }>{ cta }</a>
                            </Button>
                        </div>
                    )) }
                </div>
            </Section>
        </>
    );
}
