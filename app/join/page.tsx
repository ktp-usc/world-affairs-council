import type { Metadata } from "next";
import PageHero, { Section } from "@/components/page-hero";
import WildApricotSignup from "@/components/wild-apricot-signup";

export const metadata: Metadata = {
    title: "Membership Application",
    description:
        "Apply for membership in the World Affairs Council of Hilton Head.",
};

export default function JoinPage() {
    return (
        <main>
            <PageHero eyebrow="Membership" title="Join the Council">
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