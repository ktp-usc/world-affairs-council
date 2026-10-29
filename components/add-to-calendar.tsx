import { CalendarPlus } from "lucide-react";
import { googleCalendarUrl, icsDataUrl } from "@/lib/calendar";
import type { Event } from "@/lib/site";

export default function AddToCalendar({ event }: { event: Event }) {
    const link = "font-medium text-primary underline-offset-4 hover:text-gold hover:underline";
    return (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <span className="flex items-center gap-1.5 text-muted-foreground"><CalendarPlus className="size-4" />Add to calendar:</span>
            <a href={ googleCalendarUrl(event) } target="_blank" rel="noreferrer" className={ link }>Google</a>
            <span aria-hidden className="text-muted-foreground">·</span>
            <a href={ icsDataUrl(event) } download={ `${ event.slug }.ics` } className={ link }>Apple / Outlook (.ics)</a>
        </div>
    );
}
