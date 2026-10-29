import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PageHero, { Section } from "@/components/page-hero";
import PostCard from "@/components/post-card";
import { resourceTopics } from "@/lib/resources";
import { sortedPosts } from "@/lib/site";

export const metadata: Metadata = { title: "News & Updates" };

export default function NewsPage() {
    return (
        <>
            <PageHero eyebrow="News & Updates" title="Stay in the loop">
                Updates, newsletters and notes from the Council&apos;s leadership.
            </PageHero>

            <Section id="updates" title="Updates from Leadership">
                <div className="grid gap-6 md:grid-cols-2">
                    { sortedPosts().map((post) => <PostCard key={ post.slug } post={ post } />) }
                </div>
            </Section>

            <Section id="newsletter" title="Email Newsletter" muted>
                <p className="mb-6 max-w-2xl text-muted-foreground">
                    Get speaker announcements, Book Club picks and Council news delivered to your inbox.
                </p>
                <Button asChild size="lg"><a href="https://wachh.org/Newsletter-Signup">Sign up for the newsletter</a></Button>
            </Section>

            <Section id="resources" title="Resources and Links">
                <p className="mb-6 max-w-2xl text-muted-foreground">
                    News sources, research organizations, international data, maps and more — organized under ten topics.
                </p>
                <ul className="mb-8 flex flex-wrap gap-2">
                    { resourceTopics.map((t) => (
                        <li key={ t.id }>
                            <Link href={ `/news/resources#${ t.id }` } className="block rounded-full border bg-card px-4 py-1.5 text-sm font-medium text-primary hover:border-primary">
                                { t.title }
                            </Link>
                        </li>
                    )) }
                </ul>
                <Button asChild size="lg"><Link href="/news/resources">Browse all resources</Link></Button>
            </Section>
        </>
    );
}
