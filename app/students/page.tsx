import type { Metadata } from "next";
import PageHero, { Section } from "@/components/page-hero";
import { contact } from "@/lib/site";

export const metadata: Metadata = { title: "Student Programs" };

export default function StudentsPage() {
    return (
        <>
            <PageHero eyebrow="Student Programs" title="Building the next generation of global citizens">
                We partner with local schools to help students explore the world, sharpen their thinking and find
                their voices.
            </PageHero>

            <Section id="worldquest" title="Academic WorldQuest">
                <p className="max-w-2xl">
                    Academic WorldQuest is a team quiz competition on international affairs, geography and current events.
                    High school teams study, compete locally and the winners can advance to the national competition
                    hosted by the World Affairs Councils of America.
                </p>
            </Section>

            <Section id="model-un" title="Model UN" muted>
                <p className="max-w-2xl">
                    In Model United Nations, students represent countries, research their positions, draft resolutions
                    and negotiate with peers — learning diplomacy by practicing it. The Council supports participating
                    students and their teachers.
                </p>
            </Section>

            <Section title="For teachers and parents">
                <p className="max-w-2xl text-muted-foreground">
                    Interested in bringing a team or volunteering as a coach or judge? Email{ " " }
                    <a href={ `mailto:${ contact.email }` } className="text-primary underline">{ contact.email }</a>.
                </p>
            </Section>
        </>
    );
}
