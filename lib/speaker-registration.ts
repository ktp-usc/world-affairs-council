import { client } from "@/sanity/lib/client";
import { wildApricotBaseUrl } from "@/lib/site";

import { fetchEvents } from "@/sanity/lib/events";

/** Normalize a WACHH event URL into event and widget links, or reject an invalid URL. */
export function registrationUrls(value: string | null | undefined) {
    const match = value?.match(/^https:\/\/(?:wachh\.org|wachh\.wildapricot\.org)\/event-(\d+)\/?$/);
    if (!match) return null;
    return {
        event: `${wildApricotBaseUrl}/event-${match[1]}`,
        widget: `${wildApricotBaseUrl}/widget/event-${match[1]}`,
    };
}

/** Published overrides take effect within a minute; retain the verified event during outages. */
export async function getSpeakerRegistration(slug: string) {
    const fallback = (await fetchEvents()).find(event => event.slug === slug)?.registerUrl;
    try {
        const value = await client.withConfig({ useCdn: false, perspective: "published" }).fetch<string | null>(
            `*[_type == "speakerRegistration" && eventSlug == $slug] | order(_updatedAt desc)[0].eventUrl`,
            { slug }, { next: { revalidate: 60 } },
        );
        return registrationUrls(value) ?? registrationUrls(fallback);
    } catch {
        return registrationUrls(fallback);
    }
}
