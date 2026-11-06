import type { Metadata } from "next";
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
            <PageHero eyebrow="Events" title="Attend as a guest">
                Non-members may register for individual Distinguished Speaker Series programs. WACHH members do not need to register or pay an additional event fee.
            </PageHero>

            <Section title="Attending as a guest">
                <div className="grid gap-10 lg:grid-cols-[3fr_2fr]">
                    <div className="space-y-4 text-lg leading-relaxed text-[#444]">
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

            <Section id="events" title="Upcoming Distinguished Speaker Series programs" muted>
                <p className="mb-8 max-w-2xl text-[#555]">
                    Select an event for program details and guest registration.
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
