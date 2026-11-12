import Image from "next/image";
import MemberStory from "@/components/member-story";
import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero, { Section } from "@/components/page-hero";
import VolunteerForm from "@/components/volunteer-form";
import { volunteerContact, volunteerRoles } from "@/lib/site";

export const metadata: Metadata = { title: "Volunteer" };

/** Photo shown beneath each volunteer role, keyed by role id. */
const rolePhotos: Record<string, { src: string; alt: string; width: number; height: number; caption: string }> = {
    "speaker-events": { src: "/images/volunteer/volunteer-registration.jpg", alt: "Volunteers organizing name badges and checking in guests at a Council event", width: 500, height: 333, caption: "Registration and badge table on speaker day." },
    facilitators: { src: "/images/volunteer/volunteer-discussion-lunch.jpg", alt: "Council members in conversation around a lunch table", width: 3360, height: 2240, caption: "Keeping the conversation going around the table." },
    development: { src: "/images/volunteer/volunteer-school-visit.jpg", alt: "Council volunteers and students in a classroom during a school visit", width: 5712, height: 4284, caption: "Supporting Council programs in local schools." },
    membership: { src: "/images/volunteer/volunteer-student-group.jpg", alt: "Council members and students gathered on stage in front of the World Affairs Council banner", width: 2400, height: 1594, caption: "Bringing new faces into the Council community." },
    students: { src: "/programs/academic-worldquest/gallery/l1007477.jpg", alt: "Students in green shirts working together at an Academic WorldQuest table", width: 2640, height: 2112, caption: "Mentoring Academic WorldQuest teams." },
};

export default function VolunteerPage() {
    return (
        <>
            <PageHero
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Get Involved", href: "/get-involved" }, { label: "Volunteer" }]}
                title="Volunteer with WACHH"
                image={{
                    src: "/images/ways-to-give-banner.jpg",
                    alt: "WACHH supporters and volunteers gathering at a Council event",
                    verticalPosition: "60%",
                }}
            >
                Volunteers help plan programs, welcome guests, support student activities, and keep the Council connected to the community.
                <Button asChild size="lg" variant="secondary" className="mt-8 flex w-fit"><a href="#volunteer-form">Volunteer form</a></Button>
            </PageHero>

            <Section title="Volunteer opportunities">
                <div className="mb-8 grid gap-6 sm:grid-cols-2">
                    <figure>
                        <Image src="/images/volunteer/volunteer-welcome.jpg" alt="Council volunteers welcoming a guest at the event registration table" width={500} height={333} sizes="(min-width: 640px) 500px, 100vw" className="aspect-[3/2] w-full object-cover" />
                        <figcaption className="mt-3 text-sm text-muted-foreground">Help members and guests feel welcome.</figcaption>
                    </figure>
                    <figure>
                        <Image src="/images/volunteer/volunteer-community.jpg" alt="Three Council community members smiling together at a gathering" width={500} height={333} sizes="(min-width: 640px) 500px, 100vw" className="aspect-[3/2] w-full object-cover" />
                        <figcaption className="mt-3 text-sm text-muted-foreground">Meet new people and be part of the Council community.</figcaption>
                    </figure>
                </div>
                <p className="mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">Meet new people, share your talents in a meaningful way, and be part of a community. Our programs are run by dedicated volunteer teams who help events operate smoothly. We welcome people from all backgrounds and experiences; your time commitment can be as much or as little as you can afford.</p>
                <ol className="divide-y divide-[#d9d7d1] border-y border-[#d9d7d1] md:grid md:grid-cols-2 md:divide-y-0">
                    { volunteerRoles.map((role, index) => {
                        const photo = rolePhotos[role.id];
                        return (
                        <li key={ role.id } className="grid grid-cols-[2rem_1fr] gap-4 border-b border-[#d9d7d1] py-6 last:border-b-0 md:odd:pr-8 md:even:border-l md:even:pl-8">
                            <span className="font-serif text-xl text-gold">{ String(index + 1).padStart(2, "0") }</span>
                            <div>
                                <h3 className="font-serif text-xl font-semibold text-primary">{ role.title }</h3>
                                <p className="mt-2 leading-relaxed text-muted-foreground">{ role.body }</p>
                                {photo && <figure className="mt-5"><Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(min-width: 768px) 440px, 100vw" className="aspect-[3/2] w-full object-cover" /><figcaption className="mt-2 text-sm text-muted-foreground">{photo.caption}</figcaption></figure>}
                            </div>
                        </li>
                        );
                    }) }
                </ol>
            </Section>

            <Section id="volunteer-form" title="Become a volunteer" muted>
                <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
                    <div className="space-y-5">
                        <figure>
                            <Image src="/images/volunteer/volunteer-program.jpg" alt="Two Council volunteers wearing event badges and smiling together" width={500} height={333} sizes="(min-width: 1024px) 320px, 100vw" className="aspect-[3/2] w-full object-cover" />
                            <figcaption className="mt-3 text-sm text-muted-foreground">Share your time and talents with the Council community.</figcaption>
                        </figure>
                        <p className="text-muted-foreground">Complete the form or contact the Council office to discuss current needs and your availability.</p>
                        <ul className="space-y-3 text-sm">
                            <li><a href={ `mailto:${ volunteerContact.email }` } className="flex items-center gap-2 font-medium text-primary hover:text-gold"><Mail className="size-4" />{ volunteerContact.email }</a></li>
                            <li><a href={ `tel:${ volunteerContact.phone }` } className="flex items-center gap-2 font-medium text-primary hover:text-gold"><Phone className="size-4" />{ volunteerContact.phone }</a></li>
                        </ul>
                    </div>
                    <VolunteerForm />
                </div>
            </Section>
            <Section muted><MemberStory photo="/images/kaye-black.png" name="Kaye Black" role="WACHH Marketing Committee"><p>WACHH has given me a better understanding of what is happening in the world, and I love learning about the complexity behind the news headlines. World Affairs Council speakers consistently offer unique perspectives on the world’s most pressing international challenges. I can’t think of a better way to stay informed about today’s world order and what it means to us as Americans.</p></MemberStory></Section>
        </>
    );
}
