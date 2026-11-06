import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Event } from "@/lib/site";

// Speaker headshot, or their initials on navy when no photo has been added yet.
export default function SpeakerPhoto({ event, className }: { event: Event; className?: string }) {
    const name = event.speaker ?? event.title;
    return (
        <div className={ cn("relative aspect-[5/6] overflow-hidden rounded-lg bg-primary", className) }>
            { event.photo ? (
                <Image src={ event.photo } alt={ name } fill sizes="(min-width: 768px) 260px, 100vw" className="object-cover object-top" />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(300px_200px_at_80%_0%,oklch(0.78_0.12_80/0.25),transparent_70%)] font-serif text-5xl font-semibold text-white/70">
                    { name.replace(/^Ambassador /, "").split(" ").map((w) => w[0]).slice(0, 2).join("") }
                </div>
            ) }
        </div>
    );
}
