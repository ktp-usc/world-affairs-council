import WildApricotEmbed from "@/components/wild-apricot-embed";
import { getSpeakerRegistration } from "@/lib/speaker-registration";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddToCalendar from "@/components/add-to-calendar";
import PageHero, { Section } from "@/components/page-hero";
import { When } from "@/components/speaker-event";
import SpeakerPhoto from "@/components/speaker-photo";
import { getSpeakerEvent, getSpeakerEvents } from "@/lib/sanity-speakers";
import { guestPolicy, preRegisterDeadline } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    return (await getSpeakerEvents()).map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const event = await getSpeakerEvent((await params).slug);
    return event ? { title: `${ event.speaker }: ${ event.title }`, description: event.blurb } : {};
}

const membersNote = "WACHH Members do NOT need to register or pay for themselves. They are admitted with their name tags.";

/** Render a speaker's details with an embedded registration or the standard guest options. */
export default async function GuestEventPage({ params }: Props) {
    const event = await getSpeakerEvent((await params).slug);
    if (!event) notFound();

    const deadline = preRegisterDeadline(event).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
    const registration = await getSpeakerRegistration(event.slug);
    const registerUrl = event.registerUrl ?? guestPolicy.registerFallback;

    return (
        <>
            <PageHero breadcrumbs={[{ label: "Home", href: "/" }, { label: "Get Involved", href: "/get-involved" }, { label: "Be a guest", href: "/get-involved/guests" }, { label: `${ event.speaker }: ${ event.title }` }]} title={ `${ event.speaker }: ${ event.title }` } />

            <Section>
                <div className="grid gap-10 md:grid-cols-[260px_1fr]">
                    <SpeakerPhoto event={ event } className="mx-auto w-full max-w-[260px] self-start" />
                    <div className="space-y-6">
                        <When event={ event } />
                        <AddToCalendar event={ event } />
                        <Button asChild size="lg"><Link href="#register">Register</Link></Button>
                        <div className="border-t pt-6">
                            <h2 className="mb-3 font-serif text-2xl font-semibold text-primary">{event.bio ? "Biography" : "About the program"}</h2>
                            <p className="text-lg leading-relaxed">{ event.bio ?? event.blurb }</p>
                        </div>
                    </div>
                </div>
            </Section>

            <Section id="register" title="Register as a guest" muted>
                {registration ? (
                    <div className="space-y-5">
                        <p>{membersNote}</p>
                        <a href={registration.event} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-semibold text-primary underline">Open registration in a new tab</a>
                        <WildApricotEmbed src={registration.widget} title={`${event.speaker} guest registration`} />
                    </div>
                ) : (
                <div className="divide-y divide-[#d9d7d1] border-y border-[#d9d7d1] bg-white">
                    <div className="grid gap-5 px-6 py-7 md:grid-cols-[1fr_auto] md:items-center md:px-8">
                        <div>
                            <p className="text-sm font-semibold tracking-[0.12em] text-muted-foreground uppercase">Standard guest registration</p>
                            <h3 className="mt-1 font-serif text-2xl font-semibold text-primary">
                                ${ guestPolicy.preRegisterFee } in advance
                            </h3>
                            <div className="mt-3 max-w-2xl space-y-3 text-muted-foreground">
                                <p>Non-WACHH members who register online in advance of the event (by { deadline }).</p>
                                <p>Walk-in guests who do not pre-register pay ${ guestPolicy.walkInFee } the day of the event.</p>
                                <p className="text-sm">{ membersNote }</p>
                            </div>
                        </div>
                        <Button asChild size="lg"><a href={ registerUrl }>Register — ${ guestPolicy.preRegisterFee }</a></Button>
                    </div>

                    <div className="grid gap-5 px-6 py-7 md:grid-cols-[1fr_auto] md:items-center md:px-8">
                        <div>
                            <p className="text-sm font-semibold tracking-[0.12em] text-muted-foreground uppercase">Guest pass registration</p>
                            <h3 className="mt-1 font-serif text-2xl font-semibold text-primary">Guest Pre-registration with a Guest Pass</h3>
                            <div className="mt-3 max-w-2xl space-y-3 text-muted-foreground">
                                <p>
                                    Registration code required. Register the guest’s name and Guest Pass Code{ " " }
                                    <code className="bg-secondary px-1.5 py-0.5 font-semibold text-primary">{ guestPolicy.passCode }</code>.
                                    The Guest Pass must be presented at check-in.
                                </p>
                                <p className="text-sm">{ membersNote }</p>
                            </div>
                        </div>
                        <Button asChild size="lg" variant="outline"><a href={ registerUrl }>Use Guest Pass</a></Button>
                    </div>
                </div>
                )}
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
