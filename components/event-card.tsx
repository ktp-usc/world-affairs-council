import { Clock, MapPin } from "lucide-react";
import { type Event, parseDate } from "@/lib/site";

export default function EventCard({ event, detailed = false }: { event: Event; detailed?: boolean }) {
    const d = parseDate(event.date);
    return (
        <article className="flex gap-5 rounded-xl border bg-card p-5 shadow-sm transition hover:shadow-md">
            <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-primary py-3 text-primary-foreground">
                <span className="text-xs font-semibold tracking-wider text-gold uppercase">
                    { d.toLocaleDateString("en-US", { month: "short" }) }
                </span>
                <span className="font-serif text-3xl leading-none font-semibold">{ d.getDate() }</span>
                <span className="mt-1 text-[10px] text-white/70 uppercase">
                    { d.toLocaleDateString("en-US", { weekday: "short" }) }
                </span>
            </div>
            <div className="min-w-0 space-y-1.5">
                <span className="inline-block rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                    { event.kind }
                </span>
                <h3 className="font-serif text-lg leading-snug font-semibold text-primary">{ event.title }</h3>
                { event.speaker && <p className="text-sm font-medium">{ event.speaker }</p> }
                { detailed && <p className="text-sm text-muted-foreground">{ event.blurb }</p> }
                <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="size-3.5" />{ event.start } – { event.end }</span>
                    <span className="flex items-center gap-1"><MapPin className="size-3.5" />{ event.venue }</span>
                </div>
            </div>
        </article>
    );
}
