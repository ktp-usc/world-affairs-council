import type { Metadata } from "next";
import PageHero, { Section } from "@/components/page-hero";
import WildApricotSignup from "@/components/wild-apricot-signup";

export const metadata: Metadata = {
    title: "Membership Application",
    description:
        "Apply for membership in the World Affairs Council of Hilton Head.",
};

/** Renders the membership form within the site's shared breadcrumb layout. */
export default function JoinPage() {
    return (
        <main>
            <PageHero
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Membership", href: "/get-involved/membership" },
                    { label: "Join the Council" },
                ]}
                title="Join the Council"
            >
                <p>
                    Become part of a community that engages with the world.
                    Complete your membership application below.
                </p>
            </PageHero>

            <Section>
                <WildApricotSignup />
            </Section>
        </main>
    );
}
