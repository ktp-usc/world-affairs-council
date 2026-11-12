"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function PageHeroImage({
    src,
    alt,
    position = "center",
    verticalPosition = "center",
    parallax = false,
}: {
    src: string;
    alt: string;
    position?: "left" | "center" | "right";
    verticalPosition?: string;
    parallax?: boolean;
}) {
    const layerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!parallax || !layerRef.current) return;

        const layer = layerRef.current;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (reduceMotion.matches) {
            layer.style.transform = "none";
            return;
        }

        let frame = 0;
        const update = () => {
            const container = layer.parentElement;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const distanceFromCenter = window.innerHeight / 2 - (rect.top + rect.height / 2);
            const offset = Math.max(-28, Math.min(28, distanceFromCenter * 0.08));
            layer.style.transform = `translate3d(0, ${offset}px, 0) scale(1.1)`;
        };
        const scheduleUpdate = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", scheduleUpdate, { passive: true });
        window.addEventListener("resize", scheduleUpdate);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", scheduleUpdate);
            window.removeEventListener("resize", scheduleUpdate);
        };
    }, [parallax]);

    return (
        <div
            ref={layerRef}
            className={`absolute inset-0 ${parallax ? "will-change-transform" : ""}`}
            style={{ transform: parallax ? "scale(1.1)" : undefined }}
        >
            <Image
                src={src}
                alt={alt}
                fill
                // the banner is the largest thing on screen, so fetch it first instead of lazy-loading it
                preload
                fetchPriority="high"
                sizes="62vw"
                className="object-cover"
                style={{ objectPosition: `${position} ${verticalPosition}` }}
            />
        </div>
    );
}
