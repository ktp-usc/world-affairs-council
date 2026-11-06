import React from "react";

export default function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
    return (
        <section className="bg-[var(--navy)] text-white">
            <div className="mx-auto w-[min(1040px,calc(100%-48px))] py-12 md:py-16">
                <p className="mb-3 text-sm font-bold tracking-[.12em] text-[var(--header-gold)] uppercase">{eyebrow}</p>
                <h1 className="max-w-[820px] font-[family-name:var(--serif)] text-[42px] leading-[1.1] font-medium text-white md:text-[58px]">{title}</h1>
                {children && <div className="mt-5 max-w-[740px] text-lg leading-relaxed text-slate-200">{children}</div>}
            </div>
        </section>
    );
}

export function Section({ id, title, children, muted = false }: { id?: string; title?: string; children: React.ReactNode; muted?: boolean }) {
    return (
        <section id={id} className={muted ? "border-y border-[#d9d7d1] bg-[var(--off-white)]" : "bg-white"}>
            <div className="mx-auto w-[min(1040px,calc(100%-48px))] py-12 md:py-16">
                {title && <h2 className="mb-6 font-[family-name:var(--serif)] text-[30px] font-medium text-[var(--navy)] md:text-[35px]">{title}</h2>}
                {children}
            </div>
        </section>
    );
}
