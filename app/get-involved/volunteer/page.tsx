import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero, { Section } from "@/components/page-hero";
import VolunteerForm from "@/components/volunteer-form";
import { volunteerContact, volunteerRoles } from "@/lib/site";

export const metadata: Metadata = { title: "Volunteer" };

const volunteerPhotos = [
    { src: "/images/volunteer/volunteer-welcome.jpg", alt: "Volunteers welcoming guests at a WACHH event" },
    { src: "/images/volunteer/volunteer-registration.jpg", alt: "Volunteers preparing registration materials" },
    { src: "/images/volunteer/volunteer-program.jpg", alt: "WACHH volunteers supporting a community program" },
    { src: "/images/volunteer/volunteer-community.jpg", alt: "WACHH volunteers gathering with members" },
];

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
                    horizontalOffset: "7%",
                }}
            >
                Volunteers help plan programs, welcome guests, support student activities, and keep the Council connected to the community.
                <Button asChild size="lg" variant="secondary" className="mt-8 flex w-fit"><a href="#volunteer-form">Volunteer form</a></Button>
            </PageHero>

            <Section title="Volunteer opportunities">
                <p className="mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">Roles vary in schedule and time commitment. The Council works with volunteers to find assignments that match their interests and availability.</p>
                <ol className="divide-y divide-[#d9d7d1] border-y border-[#d9d7d1] md:grid md:grid-cols-2 md:divide-y-0">
                    { volunteerRoles.map((role, index) => (
                        <li key={ role.id } className="grid grid-cols-[2rem_1fr] gap-4 border-b border-[#d9d7d1] py-6 last:border-b-0 md:odd:pr-8 md:even:border-l md:even:pl-8">
                            <span className="font-serif text-xl text-gold">{ String(index + 1).padStart(2, "0") }</span>
                            <div><h3 className="font-serif text-xl font-semibold text-primary">{ role.title }</h3><p className="mt-2 leading-relaxed text-muted-foreground">{ role.body }</p></div>
                        </li>
                    )) }
                </ol>
                <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4" aria-label="WACHH volunteers in action">
                    {volunteerPhotos.map((photo) => (
                        <figure className="relative aspect-[3/2] overflow-hidden bg-[var(--off-white)]" key={photo.src}>
                            <Image className="object-cover" src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 25vw, 50vw" />
                        </figure>
                    ))}
                </div>
            </Section>

            <Section id="volunteer-form" title="Become a volunteer" muted>
                <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
                    <div className="space-y-5">
                        <Image className="h-auto w-40" src="/images/volunteer/kay-black.png" alt="Portrait of WACHH volunteer coordinator Kay Black" width={438} height={418} />
                        <p className="text-muted-foreground">Complete the form or contact the Council office to discuss current needs and your availability.</p>
                        <ul className="space-y-3 text-sm">
                            <li><a href={ `mailto:${ volunteerContact.email }` } className="flex items-center gap-2 font-medium text-primary hover:text-gold"><Mail className="size-4" />{ volunteerContact.email }</a></li>
                            <li><a href={ `tel:${ volunteerContact.phone }` } className="flex items-center gap-2 font-medium text-primary hover:text-gold"><Phone className="size-4" />{ volunteerContact.phone }</a></li>
                        </ul>
                    </div>
                    <VolunteerForm />
                </div>
            </Section>
        </>
    );
}
