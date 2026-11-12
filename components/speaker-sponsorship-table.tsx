import Link from "next/link";
import { Section } from "@/components/page-hero";
import { parseDate } from "@/lib/site";
import type { SpeakerSponsorshipSchedule } from "@/lib/speaker-sponsorship";

/**
 * Render a season's presentations, presenter links, and Global Speaker footnotes.
 * Show an announcement for an empty schedule and include the previous-season
 * calendar only when both its label and URL are provided.
 */
export default function SpeakerSponsorshipTable({ schedule }: { schedule: SpeakerSponsorshipSchedule }) {
    const presentations = schedule.presentations ?? [];

    return (
        <Section id="presentations" title={`${schedule.season} Speaker Presentations available for Sponsorship`}>
            <p id="presentation-table-help" className="mb-6 text-muted-foreground">Select a presenter for presentation details. Use the sponsorship form above to submit your speaker preferences.<span className="mt-2 block text-sm sm:hidden">Swipe or scroll sideways to see all three columns.</span></p>
            <div className="overflow-x-auto border border-[#d9d7d1]" role="region" aria-label={`${schedule.season} speaker presentation schedule`} tabIndex={0}>
                <table className="w-full min-w-[620px] border-collapse text-left" aria-describedby="presentation-table-help">
                    <caption className="sr-only">{schedule.season} speaker sponsorship presentations, sorted by date</caption>
                    <thead className="bg-[var(--navy)] text-white">
                        <tr>
                            <th scope="col" className="w-32 border-r border-white/20 px-5 py-4">Date</th>
                            <th scope="col" className="w-64 border-r border-white/20 px-5 py-4">Presenter</th>
                            <th scope="col" className="px-5 py-4">Topic</th>
                        </tr>
                    </thead>
                    <tbody>
                        {presentations.map((presentation) => (
                            <tr key={presentation._key} className="border-t border-[#d9d7d1] even:bg-[var(--off-white)]">
                                <td className="border-r border-[#d9d7d1] px-5 py-4 align-top whitespace-nowrap tabular-nums">
                                    <time dateTime={presentation.date}>{parseDate(presentation.date).toLocaleDateString("en-US", {month: "numeric", day: "numeric", year: "numeric"})}</time>
                                </td>
                                <th scope="row" className="border-r border-[#d9d7d1] px-5 py-4 align-top font-semibold text-primary">
                                    {presentation.eventUrl ? (
                                        <a href={presentation.eventUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-primary/40 underline-offset-4 hover:decoration-primary">{presentation.presenter}<span className="sr-only"> (opens in a new tab)</span></a>
                                    ) : presentation.presenter}
                                    {presentation.isGlobalSpeaker && <><span aria-hidden="true">**</span><span className="sr-only">, Global Speakers Program</span></>}
                                </th>
                                <td className="px-5 py-4 align-top leading-relaxed text-muted-foreground">{presentation.topic}</td>
                            </tr>
                        ))}
                        {!presentations.length && <tr><td colSpan={3} className="px-5 py-6 text-muted-foreground">Speaker presentations will be announced soon.</td></tr>}
                    </tbody>
                </table>
            </div>
            {presentations.some((presentation) => presentation.isGlobalSpeaker) && (
                <p className="mt-5 text-sm text-muted-foreground">** Made possible by the <Link href="/programs/global-speakers-program" className="font-semibold text-primary underline underline-offset-4">Global Speakers Program</Link>.</p>
            )}
            {schedule.previousSeasonUrl && schedule.previousSeasonLabel && (
                <p className="mt-5 text-muted-foreground">See who came last season: <a href={schedule.previousSeasonUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">{schedule.previousSeasonLabel}<span className="sr-only"> (opens in a new tab)</span></a></p>
            )}
        </Section>
    );
}
