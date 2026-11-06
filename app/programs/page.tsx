import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PageHero, { Section } from "@/components/page-hero";

export const metadata: Metadata = { title: "Programs" };

export default function ProgramsPage() {
    return (
        <>
            <PageHero eyebrow="Programs" title="Hear it from the people who were there">
                From ambassadors to bestselling authors, our programs put the world&rsquo;s biggest stories in front of
                a Hilton Head audience.
            </PageHero>

            <Section id="speakers" title="Distinguished Speaker Series">
                <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
                    <div className="space-y-4">
                        <p>
                            Our flagship program. On the first and third Friday of each month from October through May,
                            a leading voice on international affairs speaks at First Presbyterian Church, followed by
                            questions from the audience.
                        </p>
                        <p className="text-muted-foreground">
                            Admission is a benefit of membership. Guests are welcome under our guest policy.
                        </p>
                        <Button asChild><Link href="/calendar">View this season&rsquo;s speakers</Link></Button>
                    </div>
                    <dl className="space-y-3 rounded-xl border bg-card p-6 text-sm">
                        <div><dt className="font-semibold text-primary">When</dt><dd>1st &amp; 3rd Fridays, Oct–May, 10:00–11:30 AM</dd></div>
                        <div><dt className="font-semibold text-primary">Where</dt><dd>First Presbyterian Church<br />540 William Hilton Pkwy</dd></div>
                        <div><dt className="font-semibold text-primary">Who</dt><dd>Members and their guests</dd></div>
                    </dl>
                </div>
            </Section>

            <Section id="global" title="Global Speakers Program" muted>
                <p className="max-w-2xl">
                    Twice each season, the Speaker Series features a guest from outside the United States. These programs
                    offer an international perspective on events — a chance to hear how the rest of the world sees them.
                </p>
            </Section>

            <Section id="book-club" title="Book Club">
                <p className="max-w-2xl">
                    Readers gather monthly at the Island Recreation Center to discuss books on world affairs and politics
                    — often timed to an author&rsquo;s visit to our stage. It&rsquo;s also one of the best ways to make new
                    friends in the Council. Members and non-members are welcome.
                </p>
            </Section>

            <Section id="great-decisions" title="Great Decisions" muted>
                <p className="max-w-2xl">
                    Great Decisions is a nationwide discussion program on the most pressing foreign policy challenges
                    facing America. Small groups of members read a shared briefing on each topic and meet to talk it
                    through.
                </p>
            </Section>
        </>
    );
}
