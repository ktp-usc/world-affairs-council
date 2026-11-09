import type { Metadata } from "next";
import PageHero, { Section } from "@/components/page-hero";
import WildApricotSignup from "@/components/wild-apricot-signup";
import { membership } from "@/lib/site";

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
                    Already a member?{" "}
                    <a
                        href={membership.renew}
                        className="font-bold text-white underline underline-offset-4 hover:text-header-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    >
                        Log in to renew your membership
                    </a>
                    .
                </p>
            </PageHero>

            <Section>
                <WildApricotSignup />
            </Section>
        </main>
    );
}
