import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddToCalendar from "@/components/add-to-calendar";
import SpeakerPhoto from "@/components/speaker-photo";
import { type Event, parseDate } from "@/lib/site";

export const eventHref = (e: Event) => `/get-involved/guests/${ e.slug }`;

export function When({ event }: { event: Event }) {
    const d = parseDate(event.date).toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    return (
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div className="flex gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-gold" />
                <div><dt className="font-semibold text-primary">When</dt><dd>{ d }<br />{ event.start } – { event.end }</dd></div>
            </div>
            <div className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                <div><dt className="font-semibold text-primary">Location</dt><dd>{ event.venue }<br />{ event.address }</dd></div>
            </div>
        </dl>
    );
}

export default function SpeakerEvent({ event }: { event: Event }) {
    return (
        <article className="grid gap-7 rounded-xl border bg-card p-6 shadow-sm md:grid-cols-[220px_1fr] md:p-7">
            <SpeakerPhoto event={ event } className="mx-auto w-full max-w-[260px]" />
            <div className="flex min-w-0 flex-col gap-4">
                <div>
                    <span className="inline-block rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">{ event.kind }</span>
                    <h3 className="mt-2 font-serif text-2xl leading-snug font-semibold text-primary">
                        <Link href={ eventHref(event) } className="hover:underline">{ event.speaker }: { event.title }</Link>
                    </h3>
                </div>
                <When event={ event } />
                <p className="line-clamp-4 text-muted-foreground">{ event.bio ?? event.blurb }</p>
                <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 border-t pt-4">
                    <Button asChild><Link href={ eventHref(event) }>Register</Link></Button>
                    <AddToCalendar event={ event } />
                </div>
            </div>
        </article>
    );
}
