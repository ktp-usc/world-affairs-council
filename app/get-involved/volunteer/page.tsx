import Image from "next/image";
import MemberStory from "@/components/member-story";
import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero, { Section } from "@/components/page-hero";
import VolunteerForm from "@/components/volunteer-form";
import { fetchVolunteerPage } from "@/sanity/lib/get-involved";

export const metadata: Metadata = { title: "Volunteer" };

/** Every photo on this page is cropped to the same 3:2 frame so they line up regardless of the upload's shape. */
const photoFit = "aspect-[3/2] w-full object-cover";

/** The Volunteer page; its text, photos, roles and quote come from Studio > Get Involved > Volunteer. */
export default async function VolunteerPage() {
    const page = await fetchVolunteerPage();
    return (
        <>
            <PageHero
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Get Involved", href: "/get-involved" }, { label: "Volunteer" }]}
                title={page.title}
                image={{
                    src: page.heroImage.src,
                    alt: page.heroImage.alt,
                    verticalPosition: "60%",
                }}
            >
                {page.intro}
                <Button asChild size="lg" variant="secondary" className="mt-8 flex w-fit"><a href="#volunteer-form">Volunteer form</a></Button>
            </PageHero>

            <Section title={page.opportunitiesTitle}>
                {page.photos.length > 0 && <div className="mb-8 grid gap-6 sm:grid-cols-2">
                    {page.photos.map(({ photo, caption }) => (
                        <figure key={photo.src}>
                            <Image src={photo.src} alt={photo.alt} width={photo.width ?? 500} height={photo.height ?? 333} sizes="(min-width: 640px) 500px, 100vw" className={photoFit} />
                            <figcaption className="mt-3 text-sm text-muted-foreground">{caption}</figcaption>
                        </figure>
                    ))}
                </div>}
                <p className="mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">{page.opportunitiesText}</p>
                {page.roles.length > 0 && <ol className="divide-y divide-[#d9d7d1] border-y border-[#d9d7d1] md:grid md:grid-cols-2 md:divide-y-0">
                    { page.roles.map((role, index) => (
                        <li key={ role.title } className="grid grid-cols-[2rem_1fr] gap-4 border-b border-[#d9d7d1] py-6 last:border-b-0 md:odd:pr-8 md:even:border-l md:even:pl-8">
                            <span className="font-serif text-xl text-gold">{ String(index + 1).padStart(2, "0") }</span>
                            <div>
                                <h3 className="font-serif text-xl font-semibold text-primary">{ role.title }</h3>
                                <p className="mt-2 leading-relaxed text-muted-foreground">{ role.text }</p>
                                {role.photos.length > 0 && <div className="mt-5 space-y-4">
                                    {role.photos.map((rolePhoto) => <Image key={rolePhoto.src} src={rolePhoto.src} alt={rolePhoto.alt} width={rolePhoto.width ?? 500} height={rolePhoto.height ?? 333} sizes="(min-width: 768px) 440px, 100vw" className={photoFit} />)}
                                </div>}
                            </div>
                        </li>
                    )) }
                </ol>}
            </Section>

            <Section id="volunteer-form" title={page.formTitle} muted>
                <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
                    <div className="space-y-5">
                        <figure>
                            <Image src={page.formPhoto.photo.src} alt={page.formPhoto.photo.alt} width={page.formPhoto.photo.width ?? 500} height={page.formPhoto.photo.height ?? 333} sizes="(min-width: 1024px) 320px, 100vw" className={photoFit} />
                            <figcaption className="mt-3 text-sm text-muted-foreground">{page.formPhoto.caption}</figcaption>
                        </figure>
                        <p className="text-muted-foreground">{page.formText}</p>
                        <ul className="space-y-3 text-sm">
                            <li><a href={ `mailto:${ page.contactEmail }` } className="flex items-center gap-2 font-medium text-primary hover:text-gold"><Mail className="size-4" />{ page.contactEmail }</a></li>
                            <li><a href={ `tel:${ page.contactPhone }` } className="flex items-center gap-2 font-medium text-primary hover:text-gold"><Phone className="size-4" />{ page.contactPhone }</a></li>
                        </ul>
                    </div>
                    <VolunteerForm />
                </div>
            </Section>
            <Section muted><MemberStory photo={page.testimonial.photo} name={page.testimonial.name} role={page.testimonial.role}><p>{page.testimonial.quote}</p></MemberStory></Section>
        </>
    );
}
