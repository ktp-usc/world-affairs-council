"use client";

import Link from "next/link";
import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Event, parseDate } from "@/lib/site";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Toggles between the server-rendered list and a month grid of the same events.
export default function EventsView({ events, list }: { events: Event[]; list: React.ReactNode }) {
    const [view, setView] = useState<"list" | "calendar">("list");
    const first = events.length ? parseDate(events[0].date) : new Date();
    const [month, setMonth] = useState(new Date(first.getFullYear(), first.getMonth(), 1));

    const tab = (v: typeof view) => cn(
        "inline-flex items-center gap-2 border-b-2 px-1 py-2 text-sm font-medium transition",
        view === v ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-primary",
    );

    return (
        <div>
            <div role="tablist" aria-label="Event view" className="mb-8 inline-flex gap-7 border-b border-[#d9d7d1]">
                <button role="tab" aria-selected={ view === "list" } className={ tab("list") } onClick={ () => setView("list") }>
                    <List className="size-4" />List
                </button>
                <button role="tab" aria-selected={ view === "calendar" } className={ tab("calendar") } onClick={ () => setView("calendar") }>
                    <CalendarDays className="size-4" />Calendar
                </button>
            </div>

            { view === "list" ? list : <MonthGrid events={ events } month={ month } setMonth={ setMonth } /> }
        </div>
    );
}

function MonthGrid({ events, month, setMonth }: { events: Event[]; month: Date; setMonth: (d: Date) => void }) {
    const y = month.getFullYear();
    const m = month.getMonth();
    const lead = new Date(y, m, 1).getDay();
    const days = new Date(y, m + 1, 0).getDate();
    const cells = [...Array(lead).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
    while (cells.length % 7) cells.push(null);

    const today = new Date();
    const inMonth = events.filter((e) => {
        const d = parseDate(e.date);
        return d.getFullYear() === y && d.getMonth() === m;
    });
    const on = (day: number) => inMonth.filter((e) => parseDate(e.date).getDate() === day);
    const navBtn = "inline-flex size-9 items-center justify-center border border-white/40 text-white hover:bg-white/10";

    return (
        <div className="overflow-hidden border border-[#d9d7d1] bg-card">
            <div className="flex items-center justify-between bg-primary px-5 py-4 text-primary-foreground">
                <h3 className="font-serif text-xl font-semibold">{ month.toLocaleDateString("en-US", { month: "long", year: "numeric" }) }</h3>
                <div className="flex gap-2">
                    <button className={ navBtn } onClick={ () => setMonth(new Date(y, m - 1, 1)) } aria-label="Previous month"><ChevronLeft className="size-4" /></button>
                    <button className={ navBtn } onClick={ () => setMonth(new Date(y, m + 1, 1)) } aria-label="Next month"><ChevronRight className="size-4" /></button>
                </div>
            </div>

            <div className="grid grid-cols-7 border-b bg-muted text-center text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                { weekdays.map((d) => <div key={ d } className="py-2">{ d }</div>) }
            </div>
            <div className="grid grid-cols-7">
                { cells.map((day, i) => {
                    const isToday = day && today.getFullYear() === y && today.getMonth() === m && today.getDate() === day;
                    return (
                        <div key={ i } className={ cn("min-h-16 border-r border-b p-1.5 md:min-h-28 md:p-2", i % 7 === 6 && "border-r-0", !day && "bg-muted/40") }>
                            { day && (
                                <>
                                    <span className={ cn("inline-flex size-6 items-center justify-center text-xs", isToday && "bg-gold font-semibold text-primary") }>{ day }</span>
                                    { on(day).map((e) => (
                                        <Link
                                            key={ e.slug }
                                            href={ `/get-involved/guests/${ e.slug }` }
                                            title={ `${ e.speaker }: ${ e.title }` }
                                            className="mt-1 block border-l-2 border-gold bg-primary px-1.5 py-1 text-[11px] leading-tight text-primary-foreground hover:bg-primary/90"
                                        >
                                            <span className="hidden md:inline">{ e.start } · </span>
                                            <span className="line-clamp-2">{ e.speaker }</span>
                                        </Link>
                                    )) }
                                </>
                            ) }
                        </div>
                    );
                }) }
            </div>

            <div className="p-5">
                { inMonth.length ? (
                    <ul className="space-y-2 text-sm">
                        { inMonth.map((e) => (
                            <li key={ e.slug }>
                                <Link href={ `/get-involved/guests/${ e.slug }` } className="font-medium text-primary hover:text-gold">
                                    { parseDate(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }) } — { e.speaker }: { e.title }
                                </Link>
                            </li>
                        )) }
                    </ul>
                ) : (
                    <p className="text-sm text-muted-foreground">No Distinguished Speaker Series programs this month.</p>
                ) }
            </div>
        </div>
    );
}
