import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import EventsView from "@/components/events-view";
import PageHero, { Section } from "@/components/page-hero";
import SpeakerEvent from "@/components/speaker-event";
import { guestPolicy, isSpeakerSeries, upcomingEvents } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = { title: "Be a Guest" };

export default function GuestsPage() {
    const events = upcomingEvents().filter(isSpeakerSeries);

    return (
        <>
            <PageHero eyebrow="Be a Guest of WACHH" title="Guests are always welcome at our programs!">
                The Distinguished Speaker Series is our flagship program, specifically created for our members. Members do
                not need to register in advance or pay any additional fees to attend these events.
                <Button asChild size="lg" variant="secondary" className="mt-8 flex w-fit"><a href="#events">See upcoming speakers</a></Button>
            </PageHero>

            <Section title="Attending as a guest">
                <div className="grid gap-10 lg:grid-cols-[3fr_2fr]">
                    <div className="space-y-4 text-lg leading-relaxed">
                        <p>
                            Guests must be registered and wear name tags for admission. Pre-registration and advance online payment
                            saves time at the event but we do accept walk-ins. Please visit the Guest Table in the Gathering Space
                            to register.
                        </p>
                        <p>
                            We ask that guests arrive at { guestPolicy.arrival.toLowerCase() } in order to allow sufficient time to
                            check in and enjoy a cup of coffee. Please check in at the Welcome Table at the event for a name badge.
                        </p>
                    </div>
                    <div className="self-start overflow-hidden rounded-xl border bg-card">
                        <p className="bg-primary px-6 py-3 text-sm font-semibold tracking-[0.15em] text-gold uppercase">Guest fees, per event</p>
                        <dl className="divide-y">
                            <div className="flex items-baseline justify-between gap-4 px-6 py-4">
                                <dt>Pre-register online <span className="block text-sm text-muted-foreground">by the Wednesday before</span></dt>
                                <dd className="font-serif text-3xl font-semibold text-primary">${ guestPolicy.preRegisterFee }</dd>
                            </div>
                            <div className="flex items-baseline justify-between gap-4 px-6 py-4">
                                <dt>Walk-in <span className="block text-sm text-muted-foreground">day of the event</span></dt>
                                <dd className="font-serif text-3xl font-semibold text-primary">${ guestPolicy.walkInFee }</dd>
                            </div>
                            <div className="flex items-baseline justify-between gap-4 bg-secondary px-6 py-4">
                                <dt>WACHH members</dt>
                                <dd className="font-serif text-xl font-semibold text-primary">Free</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </Section>

            <Section id="events" title="Upcoming Distinguished Speakers" muted>
                <p className="mb-8 max-w-2xl text-muted-foreground">
                    To sign up for an upcoming Distinguished Speaker Series session, click on one of the events below!
                </p>
                { events.length ? (
                    <EventsView
                        events={ events }
                        list={ <div className="space-y-6">{ events.map((e) => <SpeakerEvent key={ e.slug } event={ e } />) }</div> }
                    />
                ) : (
                    <p className="text-muted-foreground">New programs are announced soon — check back or sign up for our newsletter.</p>
                ) }
            </Section>
        </>
    );
}
