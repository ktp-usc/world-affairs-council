import type { Metadata } from "next";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import PageHero from "@/components/page-hero";
import { type Resource, resourceTopics } from "@/lib/resources";

export const metadata: Metadata = {
    title: "Resources and Links",
    description: "News sources, research organizations, data, maps and more for keeping up with world affairs.",
};

function ResourceList({ items }: { items: Resource[] }) {
    return (
        <ul className="grid gap-x-10 gap-y-5 md:grid-cols-2">
            { items.map((r) => (
                <li key={ r.name }>
                    { r.href ? (
                        <a href={ r.href } target="_blank" rel="noreferrer" className="group inline-flex items-start gap-1 font-serif text-lg leading-snug font-semibold text-primary hover:text-gold">
                            { r.name }
                            <ArrowUpRight className="mt-1 size-4 shrink-0 opacity-50 group-hover:opacity-100" />
                        </a>
                    ) : (
                        <span className="font-serif text-lg leading-snug font-semibold text-primary">{ r.name }</span>
                    ) }
                    { r.desc && <p className="mt-1 text-sm text-muted-foreground">{ r.desc }</p> }
                </li>
            )) }
        </ul>
    );
}

export default function ResourcesPage() {
    return (
        <>
            <PageHero eyebrow="News & Updates" title="Resources and Links">
                In line with our mission to educate, engage and inspire our community on world affairs, we encourage you to keep
                abreast of what is happening in the world by exploring new sources of international news, checking out studies and
                policy papers issued by global organizations, experimenting with interactive maps of the world, or using different
                data sources to support your own research.
            </PageHero>

            <section id="topics" className="scroll-mt-24 border-b bg-muted">
                <div className="mx-auto max-w-6xl px-6 py-12">
                    <p className="mb-6 max-w-3xl text-muted-foreground">
                        The extensive compilation of information resources and links is organized under ten general topics. Click
                        on the topic names below to go directly to those resources, or scroll down through the page to see the
                        entire list.
                    </p>
                    <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        { resourceTopics.map((t, i) => (
                            <li key={ t.id }>
                                <a href={ `#${ t.id }` } className="flex h-full items-center gap-3 rounded-lg border bg-card px-4 py-3 text-sm font-medium text-primary transition hover:border-primary hover:shadow-sm">
                                    <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary font-serif text-xs font-semibold">{ i + 1 }</span>
                                    { t.title }
                                </a>
                            </li>
                        )) }
                    </ol>
                </div>
            </section>

            <div className="mx-auto max-w-6xl divide-y px-6">
                { resourceTopics.map((t) => (
                    <section key={ t.id } id={ t.id } className="scroll-mt-24 py-14">
                        <h2 className="mb-6 font-serif text-3xl font-semibold text-primary">{ t.title }</h2>
                        { t.intro && <p className="mb-8 max-w-3xl border-l-4 border-gold pl-4 text-lg italic">{ t.intro }</p> }
                        <ResourceList items={ t.items } />
                        { t.groups?.map((g) => (
                            <div key={ g.title } className="mt-10">
                                <h3 className="mb-5 border-b pb-2 text-sm font-semibold tracking-[0.15em] text-muted-foreground uppercase">{ g.title }</h3>
                                <ResourceList items={ g.items } />
                            </div>
                        )) }
                        <a href="#topics" className="mt-10 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-gold">
                            <ArrowUp className="size-4" /> Back to top
                        </a>
                    </section>
                )) }
            </div>
        </>
    );
}
