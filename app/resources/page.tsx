import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import ResourcesDirectory from "@/components/resources-directory";

export const metadata: Metadata = {
    title: "Resources and Links",
    description: "International news sources, policy research, data, maps, and more, compiled by the World Affairs Council of Hilton Head.",
};

export default function ResourcesPage() {
    return (
        <>
            <PageHero breadcrumbs={[{ label: "Home", href: "/" }, { label: "Resources and Links" }]} title="Resources and links">
                In line with our mission to educate, engage and inspire our community on world affairs, we encourage you to keep abreast of what is happening in the world: explore new sources of international news, check out studies and policy papers issued by global organizations, experiment with interactive maps of the world, or use different data sources to support your own research.
            </PageHero>
            <ResourcesDirectory />
        </>
    );
}
