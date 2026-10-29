import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero, { Section } from "@/components/page-hero";
import PhotoCarousel from "@/components/photo-carousel";
import Testimonial from "@/components/testimonial";
import VolunteerForm from "@/components/volunteer-form";
import { volunteerContact, volunteerGallery, volunteerRoles } from "@/lib/site";

export const metadata: Metadata = { title: "Volunteer" };

const questions = [
    "Looking to meet new people and be part of a community?",
    "Want to utilize your talents in a meaningful way?",
    "Looking for a volunteer job with lots of flexibility?",
];

export default function VolunteerPage() {
    return (
        <>
            <PageHero eyebrow="Get Involved" title="Volunteer Opportunities">
                <ul className="space-y-1.5">
                    { questions.map((q) => (
                        <li key={ q } className="flex gap-3"><span className="text-gold">—</span>{ q }</li>
                    )) }
                </ul>
                <Button asChild size="lg" variant="secondary" className="mt-8"><a href="#volunteer-form">Fill out the Volunteer Form</a></Button>
            </PageHero>

            <Section title="Share your expertise">
                <p className="mb-10 max-w-3xl text-lg text-muted-foreground">
                    Our programs are run by amazing teams of dedicated volunteers who help ensure events operate smoothly. No
                    matter what your background is, we have an opportunity for you to share your expertise! Take a look at some
                    of our volunteer opportunities:
                </p>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    { volunteerRoles.map((r, i) => (
                        <div key={ r.id } className="rounded-xl border bg-card p-7">
                            <span className="mb-4 inline-flex size-11 items-center justify-center rounded-lg bg-secondary font-serif text-lg font-semibold text-primary">
                                { i + 1 }
                            </span>
                            <h3 className="font-serif text-xl font-semibold text-primary">{ r.title }</h3>
                            <p className="mt-2 text-muted-foreground">{ r.body }</p>
                        </div>
                    )) }
                </div>
            </Section>

            <Section id="gallery" title="Our volunteers in action" muted>
                <PhotoCarousel slides={ volunteerGallery } />
            </Section>

            <Section>
                <Testimonial
                    photo="/images/kaye-black.png"
                    name="Kaye Black"
                    role="WACHH Marketing Committee"
                    quote="WACHH has given me a better understanding of what is happening in the world, and I love learning about the complexity behind the news headlines. World Affairs Council speakers consistently offer unique perspectives on the world’s most pressing international challenges. I can’t think of a better way to stay informed about today’s world order and what it means to us as Americans."
                />
            </Section>

            <Section id="volunteer-form" title="Become a volunteer" muted>
                <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
                    <div className="space-y-5">
                        <p className="text-muted-foreground">
                            We are looking for people from all walks of life and experiences, and your time commitment can be as
                            much or as little as you can afford. Please fill out the Volunteer Form or contact us to become a volunteer!
                        </p>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a href={ `mailto:${ volunteerContact.email }` } className="flex items-center gap-2 font-medium text-primary hover:text-gold">
                                    <Mail className="size-4" />{ volunteerContact.email }
                                </a>
                            </li>
                            <li>
                                <a href={ `tel:${ volunteerContact.phone }` } className="flex items-center gap-2 font-medium text-primary hover:text-gold">
                                    <Phone className="size-4" />{ volunteerContact.phone }
                                </a>
                            </li>
                        </ul>
                    </div>
                    <VolunteerForm />
                </div>
            </Section>
        </>
    );
}
