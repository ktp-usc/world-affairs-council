import { type Event, parseDate } from "@/lib/site";
import { eventHref } from "@/components/speaker-event";

/** The program's date written out, for example "Friday, November 13, 2026". */
export function formatProgramDate(event: Pick<Event, "date">) {
    return parseDate(event.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

/** The program's date without the weekday, for example "December 4, 2026". */
export function formatProgramShortDate(event: Pick<Event, "date">) {
    return parseDate(event.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

/** The time range, for example "10:00–11:30 AM", sharing AM/PM when both times have the same one. */
export function formatProgramTime(event: Pick<Event, "start" | "end">) {
    const [startClock, startPeriod] = event.start.split(" ");
    const [endClock, endPeriod] = event.end.split(" ");
    return startPeriod === endPeriod ? `${startClock}–${endClock} ${endPeriod}` : `${event.start}–${event.end}`;
}

/**
 * Where the Register button goes: straight to the Wild Apricot sign-up form when the event has a
 * Wild Apricot event link, otherwise the event's own link, otherwise our page for the program.
 */
export function registrationHref(event: Event) {
    const wildApricotEvent = event.registerUrl?.match(/^(https:\/\/(?:wachh\.org|wachh\.wildapricot\.org)\/event-\d+)\/?$/);
    if (wildApricotEvent) return `${wildApricotEvent[1]}/Registration`;
    return event.registerUrl ?? `${eventHref(event)}#register`;
}

/** Our page with the speaker's biography and guest options. */
export const programHref = eventHref;

