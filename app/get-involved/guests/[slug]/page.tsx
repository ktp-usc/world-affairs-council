import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Ticket, TicketCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddToCalendar from "@/components/add-to-calendar";
import PageHero, { Section } from "@/components/page-hero";
import { When } from "@/components/speaker-event";
import SpeakerPhoto from "@/components/speaker-photo";
import { events, guestPolicy, isSpeakerSeries, preRegisterDeadline } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

const find = (slug: string) => events.find((e) => e.slug === slug && isSpeakerSeries(e));

export function generateStaticParams() {
    return events.filter(isSpeakerSeries).map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const event = find((await params).slug);
    return event ? { title: `${ event.speaker }: ${ event.title }`, description: event.blurb } : {};
}

const membersNote = "WACHH Members do NOT need to register or pay for themselves. They are admitted with their name tags.";

export default async function GuestEventPage({ params }: Props) {
    const event = find((await params).slug);
    if (!event) notFound();

    const deadline = preRegisterDeadline(event).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
    const registerUrl = event.registerUrl ?? guestPolicy.registerFallback;

    return (
        <>
            <PageHero eyebrow={ event.kind === "Global Speaker" ? "Global Speaker" : "Distinguished Speaker Series" } title={ `${ event.speaker }: ${ event.title }` } />

            <Section>
                <div className="grid gap-10 md:grid-cols-[260px_1fr]">
                    <SpeakerPhoto event={ event } className="mx-auto w-full max-w-[260px] self-start" />
                    <div className="space-y-6">
                        <When event={ event } />
                        <AddToCalendar event={ event } />
                        <div className="border-t pt-6">
                            <h2 className="mb-3 font-serif text-2xl font-semibold text-primary">Biography</h2>
                            <p className="text-lg leading-relaxed">{ event.bio ?? event.blurb }</p>
                        </div>
                    </div>
                </div>
            </Section>

            <Section id="register" title="Register as a guest" muted>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex flex-col rounded-xl border bg-card p-7">
                        <Ticket className="mb-4 size-6 text-gold" />
                        <p className="text-sm font-semibold tracking-[0.15em] text-muted-foreground uppercase">Option 1</p>
                        <h3 className="mt-1 font-serif text-2xl font-semibold text-primary">
                            Guest Pre-registration — ${ guestPolicy.preRegisterFee }.00
                        </h3>
                        <div className="mt-3 mb-6 flex-1 space-y-3 text-muted-foreground">
                            <p>Non-WACHH members who register online in advance of the event (by { deadline }).</p>
                            <p>Walk-in guests who do not pre-register pay ${ guestPolicy.walkInFee } the day of the event.</p>
                            <p className="text-sm">{ membersNote }</p>
                        </div>
                        <Button asChild size="lg" className="self-start"><a href={ registerUrl }>Register — ${ guestPolicy.preRegisterFee }</a></Button>
                    </div>

                    <div className="flex flex-col rounded-xl border bg-card p-7">
                        <TicketCheck className="mb-4 size-6 text-gold" />
                        <p className="text-sm font-semibold tracking-[0.15em] text-muted-foreground uppercase">Option 2</p>
                        <h3 className="mt-1 font-serif text-2xl font-semibold text-primary">Guest Pre-registration with a Guest Pass</h3>
                        <div className="mt-3 mb-6 flex-1 space-y-3 text-muted-foreground">
                            <p>
                                Registration code required. Register the guest’s name and Guest Pass Code{ " " }
                                <code className="rounded bg-secondary px-1.5 py-0.5 font-semibold text-primary">{ guestPolicy.passCode }</code>.
                                The Guest Pass must be presented at check-in.
                            </p>
                            <p className="text-sm">{ membersNote }</p>
                        </div>
                        <Button asChild size="lg" variant="outline" className="self-start"><a href={ registerUrl }>Register with Guest Pass</a></Button>
                    </div>
                </div>
                <p className="mt-8 text-sm text-muted-foreground">
                    Please arrive at { guestPolicy.arrival.toLowerCase() } to check in at the Welcome Table and enjoy a cup of coffee.
                </p>
                <Link href="/get-involved/guests#events" className="mt-10 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-gold">
                    <ArrowLeft className="size-4" /> All upcoming speakers
                </Link>
            </Section>
        </>
    );
}
