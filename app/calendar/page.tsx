import type { Metadata } from "next";
import EventCard from "@/components/event-card";
import PageHero from "@/components/page-hero";
import { events, parseDate, upcomingEvents } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = { title: "Calendar" };

export default function CalendarPage() {
    const upcoming = upcomingEvents();
    const past = events.filter((e) => !upcoming.includes(e)).reverse();

    const byMonth = new Map<string, typeof upcoming>();
    for (const e of upcoming) {
        const key = parseDate(e.date).toLocaleDateString("en-US", { month: "long", year: "numeric" });
        byMonth.set(key, [...(byMonth.get(key) ?? []), e]);
    }

    return (
        <>
            <PageHero eyebrow="Calendar" title="Upcoming Events">
                Speaker programs are held on Friday mornings at First Presbyterian Church, 540 William Hilton Parkway.
                Book Club meets at the Island Recreation Center.
            </PageHero>

            <div className="mx-auto max-w-4xl space-y-14 px-6 py-16">
                { [...byMonth].map(([month, list]) => (
                    <section key={ month }>
                        <h2 className="mb-5 border-b pb-2 font-serif text-2xl font-semibold text-primary">{ month }</h2>
                        <div className="space-y-4">
                            { list.map((e) => <EventCard key={ e.slug } event={ e } detailed />) }
                        </div>
                    </section>
                )) }

                { past.length > 0 && (
                    <section>
                        <h2 className="mb-5 border-b pb-2 font-serif text-2xl font-semibold text-muted-foreground">Recent Programs</h2>
                        <div className="space-y-4 opacity-70">
                            { past.map((e) => <EventCard key={ e.slug } event={ e } />) }
                        </div>
                    </section>
                ) }
            </div>
        </>
    );
}
