import { client } from "@/sanity/lib/client";
import { PROGRAM_QUERY, PROGRAM_SLUGS_QUERY, PROGRAMS_QUERY } from "@/sanity/lib/queries";
import type { Program, ProgramListing } from "./program-types";

// programs with their own page layout instead of app/programs/[slug]
export const DEDICATED_PROGRAM_ROUTES = ["book-club", "past-book-club-selections"];

/** Loads one program by its slug, checking Sanity for changes at most once a minute. */
export function fetchProgram(slug: string) {
    return client.fetch<Program | null>(PROGRAM_QUERY, { slug }, { next: { revalidate: 60 } });
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
