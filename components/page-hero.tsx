import React from "react";

export default function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
    return (
        <section className="relative overflow-hidden bg-primary text-primary-foreground">
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(800px_400px_at_85%_0%,oklch(0.78_0.12_80/0.18),transparent_70%)]" />
            <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
                <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-gold uppercase">{ eyebrow }</p>
                <h1 className="max-w-3xl font-serif text-4xl font-semibold md:text-5xl">{ title }</h1>
                { children && <div className="mt-5 max-w-2xl text-lg text-white/80">{ children }</div> }
            </div>
        </section>
    );
}

export function Section({ id, title, children, muted = false }: { id?: string; title?: string; children: React.ReactNode; muted?: boolean }) {
    return (
        <section id={ id } className={ muted ? "bg-muted" : undefined }>
            <div className="mx-auto max-w-6xl px-6 py-16">
                { title && <h2 className="mb-6 font-serif text-3xl font-semibold text-primary">{ title }</h2> }
                { children }
            </div>
        </section>
    );
}
