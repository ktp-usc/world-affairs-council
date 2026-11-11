import type { PortableTextBlock } from "next-sanity";

// the program fields returned by the queries in sanity/lib/queries.ts
// sanity sends null for fields editors left empty, so every optional field allows null too
type Maybe<T> = T | null | undefined;
type RichText = Maybe<PortableTextBlock[]>;

export type ProgramFactIcon = "calendar" | "location" | "users" | "book" | "globe" | "award";

export type ProgramFact = { _key: string; label: string; value: string; icon?: Maybe<ProgramFactIcon> };
export type ProgramSection = { _key: string; eyebrow?: Maybe<string>; title: string; body?: RichText };
export type ProgramEvent = { _key: string; date: string; name: string; detail?: Maybe<string>; note?: Maybe<string> };
export type ProgramTopic = { _key: string; title: string; description?: RichText };
export type ProgramGroup = { _key: string; name: string; time?: Maybe<string>; location?: Maybe<string>; dates?: Maybe<string> };
export type ProgramSpeaker = { _key: string; date: string; name: string; role?: Maybe<string>; topic?: Maybe<string>; image?: Maybe<string>; imageAlt?: Maybe<string> };
export type ProgramSpeakerSeason = { _key: string; season: string; speakers?: Maybe<ProgramSpeaker[]> };
export type ProgramCard = { _key: string; kicker?: Maybe<string>; title: string; text?: Maybe<string>; href?: Maybe<string>; image?: Maybe<string>; imageAlt?: Maybe<string> };
export type ProgramGalleryImage = { _key: string; src?: Maybe<string>; alt?: Maybe<string> };
export type ProgramSponsorLevel = { _key: string; level: string; names?: Maybe<string[]> };

export type ProgramFeaturePanel = {
    title?: Maybe<string>;
    body?: RichText;
    linkLabel?: Maybe<string>;
    linkUrl?: Maybe<string>;
    image?: Maybe<string>;
    imageAlt?: Maybe<string>;
    imageWidth?: Maybe<number>;
    imageHeight?: Maybe<number>;
};

export type Program = {
    _id: string;
    slug: string;
    title: string;
    eyebrow?: Maybe<string>;
    deck?: Maybe<string>;
    overviewTitle?: Maybe<string>;
    overview?: RichText;
    // the overview as plain text, for search descriptions
    overviewText?: Maybe<string>;
    heroImage?: Maybe<string>;
    heroAlt?: Maybe<string>;
    heroPosition?: Maybe<"left" | "center" | "right">;
    logoImage?: Maybe<string>;
    logoAlt?: Maybe<string>;
    facts?: Maybe<ProgramFact[]>;
    sections?: Maybe<ProgramSection[]>;
    featurePanel?: Maybe<ProgramFeaturePanel>;
    callout?: Maybe<{ eyebrow?: Maybe<string>; title?: Maybe<string>; body?: RichText }>;
    eventsTitle?: Maybe<string>;
    events?: Maybe<ProgramEvent[]>;
    topicsTitle?: Maybe<string>;
    topics?: Maybe<ProgramTopic[]>;
    discussionGroupsTitle?: Maybe<string>;
    discussionGroupsIntro?: RichText;
    discussionGroups?: Maybe<ProgramGroup[]>;
    speakerArchiveTitle?: Maybe<string>;
    speakerArchive?: Maybe<ProgramSpeakerSeason[]>;
    cardsTitle?: Maybe<string>;
    cards?: Maybe<ProgramCard[]>;
    galleryTitle?: Maybe<string>;
    gallery?: Maybe<ProgramGalleryImage[]>;
    video?: Maybe<{ title?: Maybe<string>; embedUrl?: Maybe<string>; caption?: RichText }>;
    // stored for editors; not shown on the page yet
    quote?: Maybe<{ text?: Maybe<string>; attribution?: Maybe<string> }>;
    testimonial?: Maybe<{ text?: Maybe<string>; attribution?: Maybe<string>; image?: Maybe<string>; imageAlt?: Maybe<string> }>;
    sponsorsTitle?: Maybe<string>;
    sponsors?: Maybe<ProgramSponsorLevel[]>;
};

// one card on the /programs page
export type ProgramListing = {
    _id: string;
    slug: string;
    title: string;
    text?: Maybe<string>;
    image?: Maybe<string>;
    imageAlt?: Maybe<string>;
};

/** Whether Portable Text has any words in it, so empty fields don't leave blank sections behind. */
export function hasRichText(value: RichText): value is PortableTextBlock[] {
    return Boolean(value?.some((block) => Array.isArray(block.children) && block.children.some((child) => typeof child.text === "string" && child.text.trim() !== "")));
}

/** Whether a list from Sanity has at least one item. */
export function hasItems<T>(list: Maybe<T[]>): list is T[] {
    return Array.isArray(list) && list.length > 0;
}

// sanity "date" fields look like "2026-10-02"; read them as calendar dates so no time zone can shift the day
const calendarDate = (date: string) => new Date(`${date}T12:00:00Z`);

/** A schedule date like "OCT 02". */
export function formatScheduleDate(date: string) {
    const parts = new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", timeZone: "UTC" }).formatToParts(calendarDate(date));
    const month = parts.find((part) => part.type === "month")?.value ?? "";
    const day = parts.find((part) => part.type === "day")?.value ?? "";
    return `${month} ${day}`.toUpperCase();
}

/** A long date like "October 24, 2025". */
export function formatLongDate(date: string) {
    return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(calendarDate(date));
}
