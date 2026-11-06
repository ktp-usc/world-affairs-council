import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProgramPage from "@/components/programs/program-page";
import { programPages } from "@/components/programs/programs-data";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return Object.keys(programPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const program = programPages[slug];
    if (!program) return {};
    return {
        title: `${program.title} | WACHH Programs`,
        description: program.overview,
    };
}

export default async function ProgramDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const program = programPages[slug];
    if (!program) notFound();
    return <ProgramPage program={program} />;
}
