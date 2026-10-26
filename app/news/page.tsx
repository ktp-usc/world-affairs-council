import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import PageHero, { Section } from "@/components/page-hero";

export const metadata: Metadata = { title: "News & Updates" };

const resources = [
    { label: "World Affairs Councils of America", href: "https://www.worldaffairscouncils.org/" },
    { label: "Foreign Policy Association — Great Decisions", href: "https://www.fpa.org/great_decisions/" },
    { label: "U.S. Department of State", href: "https://www.state.gov/" },
    { label: "United Nations", href: "https://www.un.org/" },
];

export default function NewsPage() {
    return (
        <>
            <PageHero eyebrow="News & Updates" title="Stay in the loop" />

            <Section id="newsletter" title="Email Newsletter">
                <p className="mb-6 max-w-2xl text-muted-foreground">
                    Get speaker announcements, Book Club picks and Council news delivered to your inbox.
                </p>
                <Button asChild size="lg"><a href="https://wachh.org/Newsletter-Signup">Sign up for the newsletter</a></Button>
            </Section>

            <Section title="Resources and Links" muted>
                <ul className="grid gap-3 sm:grid-cols-2">
                    { resources.map((r) => (
                        <li key={ r.href }>
                            <a href={ r.href } target="_blank" rel="noreferrer" className="block rounded-lg border bg-card px-5 py-4 font-medium text-primary hover:shadow-sm">
                                { r.label } ↗
                            </a>
                        </li>
                    )) }
                </ul>
            </Section>
        </>
    );
}
