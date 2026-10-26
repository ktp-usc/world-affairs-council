import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({ inverted = false }: { inverted?: boolean }) {
    return (
        <Link href="/" className="flex items-center gap-3" aria-label="World Affairs Council of Hilton Head — home">
            <svg viewBox="0 0 40 40" className="size-10 shrink-0" aria-hidden>
                <circle cx="20" cy="20" r="18" className={inverted ? "fill-white/10" : "fill-primary"} />
                <g fill="none" stroke="var(--gold)" strokeWidth="1.4">
                    <circle cx="20" cy="20" r="12" />
                    <ellipse cx="20" cy="20" rx="5.5" ry="12" />
                    <path d="M8 20h24M10 14h20M10 26h20" />
                </g>
            </svg>
            <span className="leading-tight">
                <span className={cn("block font-serif text-lg font-semibold", inverted ? "text-white" : "text-primary")}>
                    World Affairs Council
                </span>
                <span className={cn("block text-xs tracking-[0.2em] uppercase", inverted ? "text-gold" : "text-muted-foreground")}>
                    of Hilton Head
                </span>
            </span>
        </Link>
    );
}
