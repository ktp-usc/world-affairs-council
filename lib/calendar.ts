import type { Event } from "@/lib/site";

const TZ = "America/New_York";

// "10:00 AM" + "2026-11-13" -> "20261113T100000" (local time)
function stamp(date: string, time: string) {
    const [, h, m, ap] = time.match(/(\d+):(\d+)\s*(AM|PM)/i)!;
    const hour = (Number(h) % 12) + (ap.toUpperCase() === "PM" ? 12 : 0);
    return `${ date.replaceAll("-", "") }T${ String(hour).padStart(2, "0") }${ m }00`;
}

const label = (e: Event) => (e.speaker && !e.speaker.startsWith("by ") ? `${ e.speaker }: ${ e.title }` : e.title);
const where = (e: Event) => `${ e.venue }, ${ e.address }`;

export function googleCalendarUrl(e: Event) {
    const params = new URLSearchParams({
        action: "TEMPLATE",
        text: label(e),
        dates: `${ stamp(e.date, e.start) }/${ stamp(e.date, e.end) }`,
        ctz: TZ,
        location: where(e),
        details: `World Affairs Council of Hilton Head\n\n${ e.blurb }`,
    });
    return `https://calendar.google.com/calendar/render?${ params }`;
}

const escape = (s: string) => s.replace(/[\\;,]/g, (c) => `\\${ c }`).replace(/\n/g, "\\n");

export function icsDataUrl(e: Event) {
    const ics = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//World Affairs Council of Hilton Head//EN",
        "BEGIN:VEVENT",
        `UID:${ e.slug }@wachh.org`,
        `DTSTAMP:${ stamp(e.date, e.start) }Z`,
        `DTSTART;TZID=${ TZ }:${ stamp(e.date, e.start) }`,
        `DTEND;TZID=${ TZ }:${ stamp(e.date, e.end) }`,
        `SUMMARY:${ escape(label(e)) }`,
        `LOCATION:${ escape(where(e)) }`,
        `DESCRIPTION:${ escape(e.blurb) }`,
        "END:VEVENT",
        "END:VCALENDAR",
    ].join("\r\n");
    return `data:text/calendar;charset=utf-8,${ encodeURIComponent(ics) }`;
}
