import { client } from "@/sanity/lib/client";
import { PROGRAM_QUERY, PROGRAM_SLUGS_QUERY, PROGRAMS_QUERY } from "@/sanity/lib/queries";
import type { Program, ProgramListing } from "./program-types";
import { events, isSpeakerSeries } from "@/lib/site";

// programs with their own page layout instead of app/programs/[slug]
export const DEDICATED_PROGRAM_ROUTES = ["book-club", "past-book-club-selections"];

/** Load a Sanity program and preserve configured speaker registration links when no editor link exists. */
export async function fetchProgram(slug: string) {
    const program = await client.fetch<Program | null>(PROGRAM_QUERY, { slug }, { next: { revalidate: 60 } });
    if (!program || slug !== "distinguished-speaker-series") return program;

    return {
        ...program,
        events: program.events?.map(event => {
            const speaker = events.find(candidate => isSpeakerSeries(candidate)
                && candidate.date === event.date
                && candidate.speaker?.replace(/^Ambassador /, "") === event.name);
            return { ...event, href: event.href || (speaker ? `/get-involved/guests/${speaker.slug}#register` : undefined) };
        }),
    };
}

/** Every program slug, for pre-rendering the program pages at build time. */
export async function fetchProgramSlugs() {
    const slugs = await client.fetch<{ slug: string }[]>(PROGRAM_SLUGS_QUERY);
    return slugs.map(({ slug }) => slug);
}

/** The program cards for the /programs page, in card order. */
export function fetchProgramListing() {
    return client.fetch<ProgramListing[]>(PROGRAMS_QUERY, {}, { next: { revalidate: 60 } });
}
