"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

type GalleryImage = { src: string; alt: string };

export default function ProgramGallery({ images, title }: { images: GalleryImage[]; title: string }) {
    const [active, setActive] = useState(0);
    const [playing, setPlaying] = useState(true);

    useEffect(() => {
        if (!playing || images.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const timer = window.setInterval(() => setActive((current) => (current + 1) % images.length), 3000);
        return () => window.clearInterval(timer);
    }, [images.length, playing]);

    const goTo = (index: number) => setActive((index + images.length) % images.length);

    return (
        <section className="mt-16 md:mt-24" aria-roledescription="carousel" aria-label={title}>
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--navy)] md:aspect-video">
                {images.map((image, index) => (
                    <div className={`absolute inset-0 transition-opacity duration-500 ${index === active ? "opacity-100" : "opacity-0"}`} key={image.src} aria-hidden={index !== active}>
                        <Image className="object-cover" src={image.src} alt={index === active ? image.alt : ""} fill sizes="(max-width: 1200px) 100vw, 1200px" priority={index === 0} />
                    </div>
                ))}
                <div className="absolute right-0 bottom-0 left-0 z-10 flex justify-between gap-5 bg-gradient-to-b from-transparent to-[rgba(12,22,37,.88)] px-5 pt-8 pb-4 text-[15px] font-bold text-white md:px-8 md:pt-12 md:pb-5"><span>{title}</span><strong>{active + 1} / {images.length}</strong></div>
            </div>
            <div className="flex min-h-16 items-center justify-center gap-3 border border-t-0 border-[#d9d7d1] bg-[var(--off-white)] p-2.5">
                <button className="grid h-11 w-11 cursor-pointer place-items-center text-[var(--navy)] hover:bg-white" type="button" onClick={() => goTo(active - 1)} aria-label="Previous photo"><ChevronLeft aria-hidden="true" /></button>
                <div className="flex gap-2">{images.map((image, index) => <button type="button" className={`h-2.5 w-2.5 cursor-pointer rounded-full border-0 p-0 ${index === active ? "bg-[var(--teal)] shadow-[0_0_0_3px_rgba(47,111,126,.18)]" : "bg-[#aeb3b5]"}`} onClick={() => goTo(index)} aria-label={`Show photo ${index + 1}`} aria-current={index === active ? "true" : undefined} key={image.src} />)}</div>
                <button className="grid h-11 w-11 cursor-pointer place-items-center text-[var(--navy)] hover:bg-white" type="button" onClick={() => setPlaying((value) => !value)} aria-label={playing ? "Pause slideshow" : "Play slideshow"}>{playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}</button>
                <button className="grid h-11 w-11 cursor-pointer place-items-center text-[var(--navy)] hover:bg-white" type="button" onClick={() => goTo(active + 1)} aria-label="Next photo"><ChevronRight aria-hidden="true" /></button>
            </div>
        </section>
    );
}
