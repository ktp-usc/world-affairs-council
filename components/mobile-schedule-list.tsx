import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export type MobileScheduleItem = {
    key: string;
    /** ISO date for the <time> element. */
    dateTime: string;
    /** The date as shown on screen. */
    dateLabel: string;
    presenter: ReactNode;
    /** Revealed when the speaker is pressed: the topic, notes, and any links. */
    details: ReactNode;
};

/**
 * Phone-sized speaker schedule: one row per date and speaker, which opens to show the topic.
 * Built on <details>, so it works without JavaScript and announces its open state to screen readers.
 * Shown below 768px; the full table takes over from there.
 */
export default function MobileScheduleList({ items, className = "" }: { items: MobileScheduleItem[]; className?: string }) {
    return (
        <ul className={`border-y border-[#d9d7d1] md:hidden ${className}`}>
            {items.map((item) => (
                <li key={item.key} className="border-b border-[#d9d7d1] last:border-0">
                    <details className="group">
                        <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-1 py-3 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-teal [&::-webkit-details-marker]:hidden">
                            <time dateTime={item.dateTime} className="w-[4.75rem] shrink-0 text-sm font-bold text-[var(--teal)] tabular-nums">{item.dateLabel}</time>
                            <span className="min-w-0 flex-1 font-bold text-[var(--navy)]">{item.presenter}</span>
                            <ChevronDown size={20} aria-hidden="true" className="shrink-0 text-teal transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none" />
                        </summary>
                        <div className="pb-4 pl-[calc(4.75rem+0.75rem+0.25rem)] pr-1 leading-relaxed text-[#444]">{item.details}</div>
                    </details>
                </li>
            ))}
        </ul>
    );
}
