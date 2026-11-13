import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero, { Section } from "@/components/page-hero";
import { fetchGetInvolvedPage } from "@/sanity/lib/get-involved";

export const metadata: Metadata = { title: "Get Involved" };

/** The Get Involved overview; its text, photos and list come from Studio > Get Involved. */
export default async function GetInvolvedPage() {
    const { title, intro, heroImage, sectionTitle, sectionImage, ways } = await fetchGetInvolvedPage();
    return (
        <>
            <PageHero
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Get Involved" }]}
                title={title}
                image={{ src: heroImage.src, alt: heroImage.alt }}
            >
                {intro}
            </PageHero>

            <Section title={sectionTitle}>
                <Image src={sectionImage.src} alt={sectionImage.alt} width={1200} height={500} sizes="(max-width: 768px) 100vw, 1040px" className="mb-8 max-h-80 w-full object-cover" />
                {ways.length > 0 && <div className="divide-y divide-[#d9d7d1] border-y border-[#d9d7d1]">
                    {ways.map((way) => (
                        <article className="grid gap-3 py-6 md:grid-cols-[240px_minmax(0,1fr)_auto] md:items-center md:gap-8" key={way.title}>
                            <h3 className="font-[family-name:var(--serif)] text-[24px] font-medium text-[var(--navy)]">{way.title}</h3>
                            <p className="m-0 text-[#505050]">{way.text}</p>
                            <Link className="inline-flex min-h-11 items-center gap-2 font-bold text-[var(--teal)] underline-offset-4 hover:underline" href={way.link}>
                                Learn more <ArrowRight size={18} aria-hidden="true" />
                            </Link>
                        </article>
                    ))}
                </div>}
            </Section>
        </>
    );
}
