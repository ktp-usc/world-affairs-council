import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProgramPage from "@/components/programs/program-page";
import { DEDICATED_PROGRAM_ROUTES, fetchProgram, fetchProgramSlugs } from "@/components/programs/fetch-programs";

type PageProps = { params: Promise<{ slug: string }> };

// pre-renders a page for every program that exists at build time
// programs added later still work since next renders unknown slugs on demand
export async function generateStaticParams() {
    const slugs = await fetchProgramSlugs();
    // book club and past selections have their own folders under app/programs
    return slugs.filter((slug) => !DEDICATED_PROGRAM_ROUTES.includes(slug)).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const program = await fetchProgram(slug);
    if (!program) return {};
    return {
        title: `${program.title} | WACHH Programs`,
        description: program.overviewText || program.deck || undefined,
    };
}

export default async function ProgramDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const program = await fetchProgram(slug);
    // a typo'd or deleted slug gets a real 404 instead of a crash
    if (!program) notFound();
    return <ProgramPage program={program} />;
}
