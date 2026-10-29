"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Slide = { src?: string; caption: string };

export default function PhotoCarousel({ slides, interval = 5000 }: { slides: Slide[]; interval?: number }) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const go = (i: number) => setIndex((i + slides.length) % slides.length);

    useEffect(() => {
        if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), interval);
        return () => clearInterval(t);
    }, [paused, interval, slides.length]);

    return (
        <div
            className="relative overflow-hidden rounded-xl border bg-primary shadow-sm"
            onMouseEnter={ () => setPaused(true) }
            onMouseLeave={ () => setPaused(false) }
            onFocus={ () => setPaused(true) }
            onBlur={ () => setPaused(false) }
            aria-roledescription="carousel"
        >
            <div className="flex transition-transform duration-700 ease-out motion-reduce:transition-none" style={ { transform: `translateX(-${ index * 100 }%)` } }>
                { slides.map((s, i) => (
                    <figure key={ i } className="relative aspect-[16/9] w-full shrink-0" aria-hidden={ i !== index }>
                        { s.src ? (
                            <Image src={ s.src } alt={ s.caption } fill sizes="(min-width: 1152px) 1104px, 100vw" className="object-cover" />
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[radial-gradient(600px_300px_at_80%_0%,oklch(0.78_0.12_80/0.25),transparent_70%)] text-white/50">
                                <ImageIcon className="size-10" />
                                <span className="text-sm">Photo coming soon</span>
                            </div>
                        ) }
                        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-6 pt-12 pb-5 font-serif text-lg font-semibold text-white">
                            { s.caption }
                        </figcaption>
                    </figure>
                )) }
            </div>

            <button onClick={ () => go(index - 1) } aria-label="Previous photo" className="absolute top-1/2 left-3 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-primary shadow hover:bg-white">
                <ChevronLeft className="size-5" />
            </button>
            <button onClick={ () => go(index + 1) } aria-label="Next photo" className="absolute top-1/2 right-3 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-primary shadow hover:bg-white">
                <ChevronRight className="size-5" />
            </button>

            <div className="absolute right-6 bottom-5 flex gap-2">
                { slides.map((_, i) => (
                    <button
                        key={ i }
                        onClick={ () => go(i) }
                        aria-label={ `Show photo ${ i + 1 }` }
                        aria-current={ i === index }
                        className={ cn("h-2 rounded-full transition-all", i === index ? "w-6 bg-gold" : "w-2 bg-white/60 hover:bg-white") }
                    />
                )) }
            </div>
        </div>
    );
}
