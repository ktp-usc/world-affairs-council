import type { Metadata } from "next";
import Link from "next/link";
import PageHero, { Section } from "@/components/page-hero";
import { formatPostDate, sortedPosts } from "@/lib/site";

export const metadata: Metadata = { title: "News" };

export default function NewsPage() {
    const posts = sortedPosts();
    return (
        <>
            <PageHero breadcrumbs={[{ label: "Home", href: "/" }, { label: "News" }]} title="News and updates">
                Council announcements, leadership updates, and information for members and the community.
            </PageHero>
            <Section title="Latest updates">
                <div className="max-w-4xl divide-y divide-[#d9d7d1] border-y border-[#d9d7d1]">
                    { posts.map((post) => (
                        <article key={ post.slug } className="py-8">
                            <p className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">{ post.category } · { formatPostDate(post) }</p>
                            <h2 className="mt-2 font-serif text-3xl font-semibold text-primary">{ post.title }</h2>
                            <div className="mt-5 max-w-3xl space-y-4 leading-relaxed text-[#444]">{ post.body.map((paragraph) => <p key={ paragraph }>{ paragraph }</p>) }</div>
                        </article>
                    )) }
                </div>
            </Section>
            <Section title="Council newsletter" muted>
                <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">Newsletter signup is available on the home page. Members also receive event announcements and Council updates by email.</p>
                <Link href="/#news" className="mt-6 inline-block font-semibold text-primary hover:text-gold">Sign up for email updates</Link>
            </Section>
        </>
    );
}
