import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Globe2, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/event-card";
import { sponsors, upcomingEvents } from "@/lib/site";

export const revalidate = 3600;

const pillars = [
    {
        icon: Mic,
        title: "Distinguished Speakers",
        body: "Ambassadors, journalists and policy experts take the stage twice a month, October through May.",
        href: "/programs#speakers",
    },
    {
        icon: Globe2,
        title: "Global Perspectives",
        body: "Speakers from abroad offer a view of world events from outside the United States.",
        href: "/programs#global",
    },
    {
        icon: BookOpen,
        title: "Discussion Groups",
        body: "Book Club and Great Decisions bring neighbors together to read, debate and learn.",
        href: "/programs#book-club",
    },
    {
        icon: GraduationCap,
        title: "Student Programs",
        body: "Academic WorldQuest and Model UN prepare the next generation of global citizens.",
        href: "/students",
    },
];

export default function Home() {
    const events = upcomingEvents().slice(0, 4);

    return (
        <>
            <section className="relative overflow-hidden bg-navy-deep text-white">
                <div aria-hidden className="absolute inset-0 bg-[radial-gradient(900px_500px_at_80%_20%,oklch(0.78_0.12_80/0.22),transparent_65%),radial-gradient(700px_500px_at_10%_90%,oklch(0.45_0.1_240/0.5),transparent_70%)]" />
                <svg aria-hidden viewBox="0 0 400 400" className="absolute -right-24 top-1/2 hidden w-[34rem] -translate-y-1/2 opacity-15 md:block">
                    <g fill="none" stroke="var(--gold)" strokeWidth="1">
                        <circle cx="200" cy="200" r="180" />
                        <ellipse cx="200" cy="200" rx="90" ry="180" />
                        <ellipse cx="200" cy="200" rx="150" ry="180" />
                        <path d="M20 200h360M40 110h320M40 290h320M200 20v360" />
                    </g>
                </svg>
                <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
                    <p className="mb-4 text-sm font-semibold tracking-[0.25em] text-gold uppercase">Hilton Head Island, South Carolina</p>
                    <h1 className="max-w-3xl font-serif text-5xl leading-[1.05] font-semibold md:text-6xl">
                        The world&rsquo;s conversations, right here at home.
                    </h1>
                    <p className="mt-6 max-w-xl text-lg text-white/80">
                        The World Affairs Council of Hilton Head engages, educates and inspires our community about
                        global affairs — through expert speakers, lively discussion and programs for students.
                    </p>
                    <div className="mt-10 flex flex-wrap gap-3">
                        <Button asChild size="lg" className="bg-gold text-navy-deep hover:bg-gold/90">
                            <Link href="/get-involved#membership">Become a Member</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
                            <Link href="/calendar">See Upcoming Events</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 py-20">
                <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="mb-2 text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">Calendar</p>
                        <h2 className="font-serif text-3xl font-semibold text-primary md:text-4xl">Upcoming Events</h2>
                    </div>
                    <Link href="/calendar" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                        See the complete calendar <ArrowRight className="size-4" />
                    </Link>
                </div>
                { events.length > 0 ? (
                    <div className="grid gap-5 md:grid-cols-2">
                        { events.map((e) => <EventCard key={ e.slug } event={ e } />) }
                    </div>
                ) : (
                    <p className="text-muted-foreground">New programs are announced soon — check back or sign up for our newsletter.</p>
                ) }
            </section>

            <section className="bg-muted">
                <div className="mx-auto max-w-6xl px-6 py-20">
                    <div className="mb-12 max-w-2xl">
                        <p className="mb-2 text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">What we do</p>
                        <h2 className="font-serif text-3xl font-semibold text-primary md:text-4xl">Programs for curious minds of every age</h2>
                        <p className="mt-4 text-muted-foreground">
                            Our programs are open to members, the general public and students. Whatever your interest, there
                            is a seat for you.
                        </p>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        { pillars.map(({ icon: Icon, title, body, href }) => (
                            <Link key={ title } href={ href } className="group rounded-xl border bg-card p-6 transition hover:-translate-y-0.5 hover:shadow-md">
                                <span className="mb-4 inline-flex size-11 items-center justify-center rounded-lg bg-primary text-gold">
                                    <Icon className="size-5" />
                                </span>
                                <h3 className="font-serif text-lg font-semibold text-primary">{ title }</h3>
                                <p className="mt-2 text-sm text-muted-foreground">{ body }</p>
                                <span className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                                    Learn more <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                                </span>
                            </Link>
                        )) }
                    </div>
                </div>
            </section>

            <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
                <div>
                    <h2 className="font-serif text-3xl font-semibold text-primary md:text-4xl">Join a community that keeps asking questions.</h2>
                    <p className="mt-4 text-muted-foreground">
                        Members enjoy admission to our Distinguished Speaker Series, invitations to special events and the
                        company of neighbors who care about the world beyond our shores. Your membership also supports
                        our programs for local students.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button asChild size="lg"><Link href="/get-involved#membership">Join Us</Link></Button>
                        <Button asChild size="lg" variant="outline"><Link href="/news#newsletter">Get the Newsletter</Link></Button>
                    </div>
                </div>
                <blockquote className="rounded-2xl border-l-4 border-gold bg-card p-8 shadow-sm">
                    <p className="font-serif text-2xl leading-snug text-primary">
                        &ldquo;An informed community is the foundation of a thoughtful foreign policy.&rdquo;
                    </p>
                    <footer className="mt-4 text-sm text-muted-foreground">— The idea behind every World Affairs Council</footer>
                </blockquote>
            </section>

            <section className="border-t">
                <div className="mx-auto max-w-6xl px-6 py-14">
                    <p className="mb-8 text-center text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                        With thanks to our sponsors
                    </p>
                    <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
                        { sponsors.map((s) => (
                            <li key={ s } className="font-serif text-lg text-foreground/50">{ s }</li>
                        )) }
                    </ul>
                </div>
            </section>
        </>
    );
}
