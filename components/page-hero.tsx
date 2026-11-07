import React from "react";
import Link from "next/link";

export type Breadcrumb = { label: string; href?: string };

/** Renders the shared navy page banner with linked ancestor breadcrumbs. */
export default function PageHero({ title, breadcrumbs, children }: { title: string; breadcrumbs: Breadcrumb[]; children?: React.ReactNode }) {
    return (
        <section className="bg-[var(--navy)] text-white">
            <div className="mx-auto w-[min(1040px,calc(100%-48px))] py-12 md:py-16">
                <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-300" aria-label="Breadcrumb">
                    {breadcrumbs.map((breadcrumb, index) => (
                        <React.Fragment key={breadcrumb.label}>
                            {index > 0 && <span aria-hidden="true">/</span>}
                            {breadcrumb.href ? (
                                <Link className="underline underline-offset-4 hover:text-white" href={breadcrumb.href}>{breadcrumb.label}</Link>
                            ) : (
                                <span aria-current="page">{breadcrumb.label}</span>
                            )}
                        </React.Fragment>
                    ))}
                </nav>
                <h1 className="max-w-[820px] font-[family-name:var(--serif)] text-[42px] leading-[1.1] font-medium text-white md:text-[58px]">{title}</h1>
                {children && <div className="mt-5 max-w-[740px] text-lg leading-relaxed text-slate-200">{children}</div>}
            </div>
        </section>
    );
}

/** Keeps page sections aligned with the banner and optionally adds a muted background. */
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
