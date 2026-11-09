import React from "react";
import Link from "next/link";
import PageHeroImage from "@/components/page-hero-image";

export type Breadcrumb = { label: string; href?: string };

export default function PageHero({
    title,
    breadcrumbs,
    children,
    image,
    size = "default",
    contentWidth = "default",
}: {
    title: string;
    breadcrumbs: Breadcrumb[];
    children?: React.ReactNode;
    image?: {
        src: string;
        alt: string;
        position?: "left" | "center" | "right";
        verticalPosition?: string;
        horizontalOffset?: string;
        parallax?: boolean;
    };
    size?: "default" | "tall";
    contentWidth?: "default" | "narrow";
}) {
    return (
        <section className="relative overflow-hidden bg-[var(--navy)] text-white">
            {image && (
                <>
                    <div
                        className="absolute inset-y-0 right-0 w-[62%]"
                        style={{ transform: `translateX(${image.horizontalOffset ?? "0"})` }}
                    >
                        <PageHeroImage
                            src={image.src}
                            alt={image.alt}
                            position={image.position}
                            verticalPosition={image.verticalPosition}
                            parallax={image.parallax ?? true}
                        />
                    </div>
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--navy)_0%,var(--navy)_42%,rgba(27,42,65,.94)_52%,rgba(27,42,65,.42)_72%,transparent_100%)]" aria-hidden="true" />
                </>
            )}
            <div className={`relative mx-auto w-[min(1040px,calc(100%-48px))] ${size === "tall" ? "py-16 md:py-24" : "py-12 md:py-16"}`}>
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
                {children && (
                    <div className={`mt-5 text-lg leading-relaxed text-slate-200 ${contentWidth === "narrow" ? "max-w-[450px]" : "max-w-[740px]"}`}>
                        {children}
                    </div>
                )}
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
