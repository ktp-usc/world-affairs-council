import type { Metadata } from "next";
import PageHero, { Section } from "@/components/page-hero";
import { contact } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Notice" };

export default function PrivacyPage() {
    return (
        <>
            <PageHero eyebrow="Legal" title="Privacy Notice" />
            <Section>
                <div className="max-w-2xl space-y-4 text-muted-foreground">
                    <p>
                        We collect only the information needed to manage memberships, donations and event registrations,
                        and to send the communications you ask for. We do not sell or rent your personal information.
                    </p>
                    <p>
                        To update your information or ask a question about this notice, contact us at{ " " }
                        <a href={ `mailto:${ contact.email }` } className="text-primary underline">{ contact.email }</a>.
                    </p>
                </div>
            </Section>
        </>
    );
}
