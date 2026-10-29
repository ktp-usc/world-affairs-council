import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import PageHero, { Section } from "@/components/page-hero";
import { formatPostDate, posts } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = posts.find((p) => p.slug === slug);
    return post ? { title: post.title, description: post.body[0] } : {};
}

export default async function PostPage({ params }: Props) {
    const { slug } = await params;
    const post = posts.find((p) => p.slug === slug);
    if (!post) notFound();

    return (
        <>
            <PageHero eyebrow={ post.category } title={ post.title }>
                <time dateTime={ post.date }>{ formatPostDate(post) } · { post.time }</time>
                { post.author && <span> · { post.author }</span> }
            </PageHero>

            <Section>
                <div className="max-w-3xl space-y-5 text-lg leading-relaxed">
                    { post.body.map((para, i) => <p key={ i }>{ para }</p>) }
                </div>
                <Link href="/news#updates" className="mt-12 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-gold">
                    <ArrowLeft className="size-4" /> All news &amp; updates
                </Link>
            </Section>
        </>
    );
}
