"use client";

import Image, { type StaticImageData } from "next/image";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export type HomeSlide = {
    image: StaticImageData | string;
    alt: string;
    label: string;
    content?: ReactNode;
};

/** Shared photo and feature carousels with a crossfade that also wraps smoothly. */
export default function HomeCarousel({
    id,
    label,
    slides,
    variant = "photos",
    interval = 10000,
}: {
    id: string;
    label: string;
    slides: HomeSlide[];
    variant?: "hero" | "photos";
    interval?: number;
}) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(true);
    const [allowMotion, setAllowMotion] = useState(false);
    const [inView, setInView] = useState(true);
    const [documentVisible, setDocumentVisible] = useState(true);
    const [manualCycle, setManualCycle] = useState(0);
    const root = useRef<HTMLElement>(null);
    const progress = useRef<HTMLSpanElement>(null);
    const elapsed = useRef(0);
    const touchStart = useRef<{ x: number; y: number } | null>(null);
    const playingEnabled = !paused && (!reducedMotion || allowMotion);
    const autoPlaying = playingEnabled && inView && documentVisible && slides.length > 1;

    useEffect(() => {
        const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReducedMotion(preference.matches);
        update();
        preference.addEventListener("change", update);
        return () => preference.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        const updateVisibility = () => setDocumentVisible(!document.hidden);
        updateVisibility();
        document.addEventListener("visibilitychange", updateVisibility);
        const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
        if (root.current) observer.observe(root.current);
        return () => {
            document.removeEventListener("visibilitychange", updateVisibility);
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!autoPlaying) return;
        // One clock drives both the countdown and slide changes, preserving time on pause.
        const startedAt = performance.now();
        const elapsedAtStart = elapsed.current;
        let frame: number;
        const advance = (now: number) => {
            elapsed.current = Math.min(interval, elapsedAtStart + now - startedAt);
            if (progress.current) progress.current.style.transform = `scaleX(${1 - elapsed.current / interval})`;
            if (elapsed.current >= interval) {
                elapsed.current = 0;
                setIndex((current) => (current + 1) % slides.length);
                return;
            }
            frame = window.requestAnimationFrame(advance);
        };
        frame = window.requestAnimationFrame(advance);
        return () => window.cancelAnimationFrame(frame);
    }, [autoPlaying, index, interval, manualCycle, slides.length]);

    const goTo = (next: number) => {
        elapsed.current = 0;
        if (progress.current) progress.current.style.transform = "scaleX(1)";
        setIndex((next + slides.length) % slides.length);
        setManualCycle((current) => current + 1);
    };

    return (
        <section
            ref={root}
            id={id}
            className={`home-carousel home-carousel--${variant}`}
            role="region"
            aria-roledescription="carousel"
            aria-label={label}
            data-playback={autoPlaying ? "playing" : "paused"}
            onFocusCapture={(event) => {
                // Let keyboard users read and navigate at their own pace.
                if (event.target.matches(":focus-visible")) setPaused(true);
            }}
            onKeyDown={(event) => {
                if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                    event.preventDefault();
                    setPaused(true);
                    goTo(index + (event.key === "ArrowLeft" ? -1 : 1));
                }
            }}
            onTouchStart={(event) => {
                const touch = event.touches[0];
                touchStart.current = { x: touch.clientX, y: touch.clientY };
            }}
            onTouchCancel={() => { touchStart.current = null; }}
            onTouchEnd={(event) => {
                const start = touchStart.current;
                touchStart.current = null;
                if (!start) return;
                const touch = event.changedTouches[0];
                const dx = touch.clientX - start.x;
                const dy = touch.clientY - start.y;
                if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
                    goTo(index + (dx < 0 ? 1 : -1));
                }
            }}
        >
            <div className="home-carousel-slides" aria-live={autoPlaying ? "off" : "polite"}>
                {slides.map((slide, position) => (
                    <div
                        id={`${id}-slide-${position + 1}`}
                        key={slide.label}
                        className={`home-carousel-slide${position === index ? " is-active" : ""}`}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${position + 1} of ${slides.length}: ${slide.label}`}
                        aria-hidden={position !== index}
                        inert={position !== index}
                    >
                        {slide.content && <div className="home-feature-copy">{slide.content}</div>}
                        <div className="home-carousel-photo">
                            <Image
                                src={slide.image}
                                alt={slide.alt}
                                fill
                                sizes="(min-width: 901px) 55vw, 100vw"
                                className="home-carousel-image"
                                priority={variant === "hero" && position === 0}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="home-carousel-controls">
                <button type="button" className="home-carousel-control" aria-label="Previous slide" onClick={() => goTo(index - 1)}>
                    <ArrowLeft size={19} aria-hidden="true" />
                </button>
                <div className="home-carousel-dots" aria-label="Choose a slide">
                    {slides.map((slide, position) => (
                        <button
                            key={slide.label}
                            type="button"
                            className="home-carousel-dot"
                            aria-label={`Show slide ${position + 1}: ${slide.label}`}
                            aria-current={position === index ? "true" : undefined}
                            aria-controls={`${id}-slide-${position + 1}`}
                            onClick={() => goTo(position)}
                        ><span /></button>
                    ))}
                </div>
                <button type="button" className="home-carousel-control" aria-label="Next slide" onClick={() => goTo(index + 1)}>
                    <ArrowRight size={19} aria-hidden="true" />
                </button>
                <button
                    type="button"
                    className="home-carousel-control home-carousel-pause"
                    aria-label={playingEnabled ? "Pause slideshow" : "Play slideshow"}
                    onClick={() => {
                        if (playingEnabled) setPaused(true);
                        else {
                            setAllowMotion(true);
                            setPaused(false);
                        }
                    }}
                >
                    {playingEnabled ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
                </button>
            </div>
            <div className="home-carousel-progress" aria-hidden="true"><span ref={progress} /></div>
        </section>
    );
}
