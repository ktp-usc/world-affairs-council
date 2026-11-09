import { client } from "@/sanity/lib/client";
import { SPEAKER_SPONSORSHIP_SCHEDULE_QUERY } from "@/sanity/lib/queries";
import initialSchedule from "@/sanity/initial-content/speaker-sponsorship.json";

export type SpeakerPresentation = {
    _key: string;
    date: string;
    presenter: string;
    topic: string;
    eventUrl?: string | null;
    isGlobalSpeaker?: boolean | null;
};

export type SpeakerSponsorshipSchedule = {
    season: string;
    presentations: SpeakerPresentation[] | null;
    previousSeasonLabel?: string | null;
    previousSeasonUrl?: string | null;
};

/** Use published Sanity content; preserve the migrated schedule during an outage. */
export async function getSpeakerSponsorshipSchedule(): Promise<SpeakerSponsorshipSchedule> {
    try {
        const schedule = await client.withConfig({ useCdn: false, perspective: "published" })
            .fetch<SpeakerSponsorshipSchedule | null>(
                SPEAKER_SPONSORSHIP_SCHEDULE_QUERY,
                {},
                { next: { revalidate: 60 } },
            );

        if (schedule) return schedule;
    } catch (error) {
        console.error("Unable to load the speaker sponsorship schedule from Sanity.", error);
    }

    return initialSchedule;
}
