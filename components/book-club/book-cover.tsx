import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { splitBookTitle, type BookClubMeetingSummary } from "./meeting-details";

// same focus ring as the site header
export const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--teal)]";
// text links turn navy on hover
export const textLinkHover = "transition-[color] duration-150 ease-[var(--ease-color)] hover:text-[var(--navy)]";
const coverShadow = "shadow-[0_18px_30px_-16px_rgba(27,42,65,0.55)]";

/** The book cover from Sanity, or a navy placeholder with the title when no cover has been uploaded. */
export function BookCover({ meeting, sizes, className = "" }: { meeting: Pick<BookClubMeetingSummary, "title" | "author" | "coverImage">; sizes: string; className?: string }) {
    if (meeting.coverImage) {
        return (
            <Image
                className={`aspect-[2/3] h-auto w-full bg-[var(--off-white)] object-cover ${coverShadow} ${className}`}
                src={urlFor(meeting.coverImage).width(560).height(840).fit("crop").auto("format").url()}
                alt={`Cover of ${meeting.title}${meeting.author ? ` by ${meeting.author}` : ""}`}
                width={560}
                height={840}
                sizes={sizes}
            />
        );
    }
    return (
        // the text sizes follow the placeholder's own width, so it works small and large
        <div className={`@container aspect-[2/3] w-full bg-[var(--navy)] text-white ${coverShadow} ${className}`} aria-hidden="true">
            <div className="flex h-full flex-col justify-between gap-2 border-t-4 border-[var(--gold)] p-3 @[9rem]:p-4 @[13rem]:p-6">
                <span className="text-[12px] font-bold text-[var(--header-gold)] @[13rem]:text-[13px]">WACHH Book Club</span>
                <strong className="font-[family-name:var(--serif)] text-[16px] leading-[1.15] font-normal text-balance @[9rem]:text-[19px] @[13rem]:text-[26px]">{splitBookTitle(meeting.title).mainTitle}</strong>
                <small className="text-[12px] leading-[1.3] text-slate-200 @[9rem]:text-[13px]">{meeting.author}</small>
            </div>
        </div>
    );
}
