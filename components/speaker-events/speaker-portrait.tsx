import Image from "next/image";
import type { Event } from "@/lib/site";

// same soft shadow as the Book Club covers
const portraitShadow = "shadow-[0_18px_30px_-16px_rgba(27,42,65,0.55)]";

/** The speaker's photo in a headshot shape, or a navy card with their name until a photo is added. */
export function SpeakerPortrait({ event, sizes }: { event: Event; sizes: string }) {
    const name = event.speaker ?? event.title;
    const photo = event.photo;
    if (photo) {
        return (
            <div className={`relative aspect-[5/6] w-full overflow-hidden bg-[var(--off-white)] ${portraitShadow}`}>
                <Image src={photo} alt={name} fill sizes={sizes} className="object-cover object-top" />
            </div>
        );
    }
    return (
        // the text sizes follow the card's own width, so it works small and large
        <div className={`@container aspect-[5/6] w-full bg-[var(--navy)] text-white ${portraitShadow}`} aria-hidden="true">
            <div className="flex h-full flex-col justify-between gap-2 border-t-4 border-[var(--gold)] p-3 @[9rem]:p-4 @[13rem]:p-6">
                <span className="text-[12px] font-bold text-[var(--header-gold)] @[13rem]:text-[13px]">{event.kind === "Global Speaker" ? "Global Speakers Program" : "Distinguished Speaker Series"}</span>
                <strong className="font-[family-name:var(--serif)] text-[16px] leading-[1.15] font-normal text-balance @[9rem]:text-[19px] @[13rem]:text-[26px]">{name}</strong>
                <small className="text-[12px] leading-[1.3] text-slate-200 @[9rem]:text-[13px]">{event.title.split(": ")[0]}</small>
            </div>
        </div>
    );
}
