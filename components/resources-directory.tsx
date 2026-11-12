"use client";

import { useId, useMemo, useState } from "react";
import { ArrowUp, ArrowUpRight, Check, ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { resourceTopics, tagGroups, tagLabels, type Resource, type TagId } from "@/lib/resources";

// The Resources page body. A sticky sidebar holds the search box, the ten topics as jump links,
// and the Subject / Region / Format filters with live counts; results are grouped under their topic.
// Filters combine as OR within a tag group and AND across groups.

type Entry = { resource: Resource; topicId: string; groupTitle?: string; text: string };
type GroupLabel = (typeof tagGroups)[number]["label"];

const normalize = (text: string) => text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

const entries: Entry[] = resourceTopics.flatMap((topic): Omit<Entry, "text">[] => [
    ...topic.items.map((resource) => ({ resource, topicId: topic.id })),
    ...(topic.groups ?? []).flatMap((group) => group.items.map((resource) => ({ resource, topicId: topic.id, groupTitle: group.title }))),
]).map((entry) => {
    const topicTitle = resourceTopics.find((topic) => topic.id === entry.topicId)!.title;
    const { name, desc, tags = [] } = entry.resource;
    return { ...entry, text: normalize([name, desc, topicTitle, entry.groupTitle, ...tags.map((tag) => tagLabels[tag])].join(" ")) };
});

const groupOfTag = Object.fromEntries(tagGroups.flatMap((group) => group.tags.map((tag) => [tag.id, group.label]))) as Record<TagId, GroupLabel>;

function matchesFilters(entry: Entry, terms: string[], selected: TagId[], ignoreGroup?: GroupLabel) {
    if (!terms.every((term) => entry.text.includes(term))) return false;
    for (const group of tagGroups) {
        if (group.label === ignoreGroup) continue;
        const chosen = selected.filter((tag) => groupOfTag[tag] === group.label);
        if (chosen.length && !chosen.some((tag) => entry.resource.tags?.includes(tag))) return false;
    }
    return true;
}

const sidebarHeading = "text-xs font-bold tracking-[0.16em] text-[var(--teal)] uppercase";

export default function ResourcesDirectory() {
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState<TagId[]>([]);
    const [filtersOpen, setFiltersOpen] = useState(false); // filters collapse on small screens
    const searchId = useId();
    const filtersId = useId();
    const jumpId = useId();

    const toggleTag = (tag: TagId) => setSelected((current) => (current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag]));
    const clearAll = () => { setQuery(""); setSelected([]); };
    const filtering = query.trim() !== "" || selected.length > 0;

    const { results, tagCounts } = useMemo(() => {
        const terms = normalize(query).split(/\s+/).filter(Boolean);
        const results = entries.filter((entry) => matchesFilters(entry, terms, selected));
        // Each option's count is what its group would show if it were ticked, given the other groups' choices.
        const tagCounts = {} as Record<TagId, number>;
        for (const group of tagGroups) {
            const pool = entries.filter((entry) => matchesFilters(entry, terms, selected, group.label));
            for (const tag of group.tags) tagCounts[tag.id] = pool.filter((entry) => entry.resource.tags?.includes(tag.id)).length;
        }
        return { results, tagCounts };
    }, [query, selected]);

    const topics = resourceTopics.map((topic) => {
        const inTopic = results.filter((entry) => entry.topicId === topic.id);
        return {
            ...topic,
            count: inTopic.length,
            items: inTopic.filter((entry) => !entry.groupTitle).map((entry) => entry.resource),
            groups: (topic.groups ?? [])
                .map((group) => ({ title: group.title, items: inTopic.filter((entry) => entry.groupTitle === group.title).map((entry) => entry.resource) }))
                .filter((group) => group.items.length > 0),
        };
    });
    const visibleTopics = topics.filter((topic) => topic.count > 0);

    return (
        <div className="bg-white">
            <div id="directory" className="mx-auto grid w-[min(1040px,calc(100%-48px))] scroll-mt-6 gap-10 py-12 md:grid-cols-[250px_minmax(0,1fr)] md:gap-12 md:py-16">
                <aside aria-label="Find resources" className="md:sticky md:top-6 md:max-h-[calc(100svh-48px)] md:self-start md:overflow-y-auto md:overscroll-contain md:pr-1 md:pb-4">
                    <label htmlFor={searchId} className={sidebarHeading}>Search</label>
                    <div className="relative mt-2">
                        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#777]" aria-hidden="true" />
                        <input
                            id={searchId}
                            type="search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Name or keyword"
                            className="min-h-12 w-full border border-[#c9c6bf] bg-white py-2 pr-3 pl-9 text-base text-[var(--charcoal)] placeholder:text-[#888] focus:border-[var(--navy)] focus:outline-2 focus:outline-offset-0 focus:outline-[var(--navy)]"
                        />
                    </div>

                    {/* Small screens: jump menu and a collapsible filter panel. */}
                    <div className="mt-4 grid gap-3 md:hidden">
                        <label htmlFor={jumpId} className="sr-only">Jump to topic</label>
                        <div className="relative">
                            <select
                                id={jumpId}
                                value=""
                                onChange={(event) => { if (event.target.value) document.getElementById(event.target.value)?.scrollIntoView({ behavior: "smooth" }); }}
                                className="min-h-12 w-full appearance-none border border-[#c9c6bf] bg-white px-4 pr-10 font-bold text-[var(--navy)]"
                            >
                                <option value="">Jump to topic…</option>
                                {visibleTopics.map((topic) => <option key={topic.id} value={topic.id}>{topic.title} ({topic.count})</option>)}
                            </select>
                            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2 text-[var(--navy)]" aria-hidden="true" />
                        </div>
                        <button
                            type="button"
                            aria-expanded={filtersOpen}
                            aria-controls={filtersId}
                            onClick={() => setFiltersOpen((open) => !open)}
                            className="flex min-h-12 items-center justify-between border border-[var(--navy)] px-4 font-bold text-[var(--navy)]"
                        >
                            <span className="flex items-center gap-2">
                                <SlidersHorizontal className="size-4" aria-hidden="true" /> Filters
                                {selected.length > 0 && <span className="grid size-6 place-items-center rounded-full bg-[var(--navy)] text-xs text-white">{selected.length}</span>}
                            </span>
                            <ChevronDown className={`size-5 transition-[rotate] duration-200 ${filtersOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                        </button>
                    </div>

                    {/* Large screens: topic jump links. */}
                    <nav aria-label="Topics" className="mt-8 hidden md:block">
                        <p className={sidebarHeading}>Topics</p>
                        <ul className="mt-2">
                            {topics.map((topic) => (
                                <li key={topic.id}>
                                    {topic.count > 0 ? (
                                        <a href={`#${topic.id}`} className="flex items-baseline justify-between gap-3 py-1.5 text-[15px] leading-snug font-semibold text-[var(--navy)] transition-[color] duration-150 ease-color hover:text-[var(--teal)]">
                                            <span>{topic.title}</span>
                                            <span className="shrink-0 text-xs font-normal text-[#777] tabular-nums">{topic.count}</span>
                                        </a>
                                    ) : (
                                        <span className="flex items-baseline justify-between gap-3 py-1.5 text-[15px] leading-snug font-semibold text-[#aaa]">
                                            <span>{topic.title}</span>
                                            <span className="shrink-0 text-xs font-normal tabular-nums">0</span>
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div id={filtersId} className={`${filtersOpen ? "block" : "hidden"} md:block`}>
                        {tagGroups.map((group) => (
                            <details key={group.label} open className="group/filter mt-6 border-t border-[#d9d7d1] pt-4 md:mt-8">
                                <summary className="flex cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden">
                                    <span className={sidebarHeading}>{group.label}</span>
                                    <ChevronDown className="size-4 text-[var(--teal)] transition-[rotate] duration-200 group-open/filter:rotate-180" aria-hidden="true" />
                                </summary>
                                <ul className="mt-2">
                                    {group.tags.map((tag) => (
                                        <li key={tag.id}>
                                            <FilterOption label={tag.label} count={tagCounts[tag.id]} checked={selected.includes(tag.id)} onChange={() => toggleTag(tag.id)} />
                                        </li>
                                    ))}
                                </ul>
                            </details>
                        ))}
                    </div>
                </aside>

                <div className="min-w-0">
                    <div className="border-b-2 border-[var(--navy)] pb-4">
                        <div className="flex min-h-11 flex-wrap items-center justify-between gap-x-4 gap-y-2">
                            <p className="font-bold text-[var(--navy)]" aria-live="polite">
                                {filtering ? <>Showing {results.length} of {entries.length} resources</> : <>{entries.length} resources</>}
                            </p>
                            {filtering && (
                                <button type="button" onClick={clearAll} className="inline-flex min-h-11 items-center text-sm font-bold text-[var(--teal)] underline underline-offset-4 hover:text-[var(--navy)]">
                                    Clear all
                                </button>
                            )}
                        </div>
                        {filtering && (
                            <ul className="mt-2 flex flex-wrap gap-2" aria-label="Active filters">
                                {query.trim() && (
                                    <li><ActivePill label={`“${query.trim()}”`} onRemove={() => setQuery("")} /></li>
                                )}
                                {selected.map((tag) => (
                                    <li key={tag}><ActivePill label={tagLabels[tag]} onRemove={() => toggleTag(tag)} /></li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {visibleTopics.length === 0 && (
                        <div className="py-10">
                            <p className="text-lg text-[#444]">No resources match these filters.</p>
                            <button type="button" onClick={clearAll} className="mt-4 inline-flex min-h-12 items-center bg-[var(--navy)] px-5 py-3 font-bold text-white">Show all resources</button>
                        </div>
                    )}

                    {visibleTopics.map((topic) => (
                        <section key={topic.id} id={topic.id} aria-labelledby={`${topic.id}-heading`} className="scroll-mt-6 pt-10 first-of-type:pt-8">
                            <div className="flex items-baseline justify-between gap-4">
                                <h2 id={`${topic.id}-heading`} className="font-[family-name:var(--serif)] text-[26px] leading-tight font-medium text-[var(--navy)] md:text-[30px]">{topic.title}</h2>
                                <span className="shrink-0 text-sm text-[#777] tabular-nums">{topic.count}</span>
                            </div>
                            {topic.intro && <p className="mt-3 max-w-[680px] text-[#444] italic">{topic.intro}</p>}
                            {topic.items.length > 0 && <ResourceList items={topic.items} />}
                            {topic.groups.map((group) => (
                                <div key={group.title} className="mt-8">
                                    <h3 className="text-sm font-bold tracking-[0.14em] text-[#666] uppercase">{group.title}</h3>
                                    <ResourceList items={group.items} />
                                </div>
                            ))}
                            <a href="#directory" className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-[var(--teal)] underline-offset-4 hover:underline">
                                <ArrowUp className="size-4" aria-hidden="true" /> Back to top
                            </a>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}

function FilterOption({ label, count, checked, onChange }: { label: string; count: number; checked: boolean; onChange: () => void }) {
    const empty = count === 0 && !checked;
    return (
        <label className={`group flex min-h-10 cursor-pointer items-center gap-3 py-1 text-[15px] leading-snug ${empty ? "cursor-default text-[#aaa]" : "text-[#333] hover:text-[var(--navy)]"}`}>
            <input type="checkbox" className="peer sr-only" checked={checked} onChange={onChange} disabled={empty} />
            <span
                aria-hidden="true"
                className={`grid size-5 shrink-0 place-items-center border transition-[background-color,border-color] duration-150 ease-color peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--navy)] ${
                    checked ? "border-[var(--navy)] bg-[var(--navy)] text-white" : empty ? "border-[#ddd]" : "border-[#b5b2aa] bg-white group-hover:border-[var(--navy)]"
                }`}
            >
                {checked && <Check className="size-3.5" strokeWidth={3} />}
            </span>
            <span className={`flex-1 ${checked ? "font-semibold text-[var(--navy)]" : ""}`}>{label}</span>
            <span className="text-xs text-[#888] tabular-nums">{count}</span>
        </label>
    );
}

function ActivePill({ label, onRemove }: { label: string; onRemove: () => void }) {
    return (
        <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove filter: ${label}`}
            className="inline-flex min-h-9 items-center gap-1.5 bg-[var(--off-white)] py-1 pr-2 pl-3 text-sm font-semibold text-[var(--navy)] ring-1 ring-[#d9d7d1] transition-[background-color] duration-150 ease-color hover:bg-[#ece8de]"
        >
            {label}
            <X className="size-3.5" aria-hidden="true" />
        </button>
    );
}

function ResourceList({ items }: { items: Resource[] }) {
    return (
        <ul className="mt-4 divide-y divide-[#d9d7d1] border-y border-[#d9d7d1]">
            {items.map((resource) => (
                <li key={resource.name} className="py-5">
                    {resource.href ? (
                        <a
                            href={resource.href}
                            target="_blank"
                            rel="noreferrer"
                            className="group inline-flex items-start gap-1.5 text-lg leading-snug font-bold text-[var(--navy)] transition-[color] duration-150 ease-color hover:text-[var(--teal)]"
                        >
                            <span className="underline decoration-[var(--gold)] decoration-1 underline-offset-4 group-hover:decoration-[var(--teal)]">{resource.name}</span>
                            <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-[var(--teal)]" aria-hidden="true" />
                            <span className="sr-only">(opens in a new tab)</span>
                        </a>
                    ) : (
                        <p className="text-lg leading-snug font-bold text-[var(--navy)]">{resource.name}</p>
                    )}
                    {resource.desc && <p className="mt-1.5 leading-relaxed text-[#505050]">{resource.desc}</p>}
                </li>
            ))}
        </ul>
    );
}
