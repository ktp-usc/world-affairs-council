import MemberStory from "@/components/member-story";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero, { Section } from "@/components/page-hero";
import DonationForm from "@/components/donation-form";
import { contact, giving } from "@/lib/site";
import { fetchGivePage } from "@/sanity/lib/get-involved";

/** Turns a phone number like (843) 384-6758 into a tap-to-call link. */
const telHref = (phone: string) => `tel:1${phone.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "")}`;

export const metadata: Metadata = { title: "Opportunities to Give" };

/** Opportunities to give; its text, photos and lists come from Studio > Get Involved > Ways to Give. */
export default async function GivePage() {
    const page = await fetchGivePage();
    return (
        <>
            <PageHero breadcrumbs={[{ label: "Home", href: "/" }, { label: "Get Involved", href: "/get-involved" }, { label: "Opportunities to give" }]} title={page.title}>
                <p>{page.intro}</p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                    <Button asChild size="lg" variant="secondary" className="h-auto min-h-12 whitespace-normal px-7 py-3 text-lg"><a href="#donation-form">Donate online</a></Button>
                    <Button asChild size="lg" variant="outline" className="h-auto min-h-12 border-white/70 bg-transparent px-7 py-3 text-lg text-white hover:bg-white/10"><a href="#give-by-check">Give by check</a></Button>
                </div>
                <div id="give-by-check" className="mt-8 scroll-mt-6 border-l-4 border-[var(--header-gold)] bg-white p-6 text-primary sm:p-7">
                    <h2 className="font-[family-name:var(--serif)] text-2xl font-medium">{page.checkTitle}</h2>
                    <p className="mt-2 text-base text-muted-foreground">{`${page.checkText} `}<a className="font-semibold underline" href={telHref(page.checkPhone)}>{page.checkPhone}</a>{` ${page.checkTextAfter}`}</p>
                    <address className="mt-3 text-xl leading-relaxed not-italic"><span className="block font-semibold">World Affairs Council of Hilton Head</span><span className="block">{contact.mail}</span></address>
                </div>
            </PageHero>

            <Section id="donate" title={page.donateTitle}>
                <div className="grid gap-12 lg:grid-cols-[3fr_2fr]">
                    <div>
                        <p className="mb-5 max-w-2xl text-lg text-muted-foreground">{page.donateIntro}</p>
                        {page.funds.length > 0 && <dl className="divide-y divide-[#d9d7d1] border-y border-[#d9d7d1]">
                            {page.funds.map((fund) => <div className="py-6" key={fund.title}><dt className="font-serif text-xl font-semibold text-primary">{fund.title}</dt><dd className="mt-2 leading-relaxed text-muted-foreground">{fund.text}</dd></div>)}
                        </dl>}
                        <div className="mt-6 space-y-4 text-lg text-muted-foreground">
                            {page.giftExamples.map((example) => <p key={example.amount}><strong className="text-primary">{example.amount}</strong>{` ${example.text}`}</p>)}
                            <a href="#student-donation-form" className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">Support the Student Program Fund</a>
                        </div>
                    </div>
                    <div className="space-y-6 self-start">
                    {page.donatePhotos.map(({ photo, caption }, index) => (
                        // the first photo is the lead, so it gets a larger caption and a wider tablet size
                        <figure className="border-b-4 border-gold bg-[var(--off-white)]" key={photo.src}>
                            <Image src={photo.src} alt={photo.alt} width={photo.width ?? 960} height={photo.height ?? 640} sizes={index === 0 ? "(min-width: 1024px) 400px, (min-width: 768px) 720px, 100vw" : "(min-width: 1024px) 400px, 100vw"} className="h-auto w-full" />
                            <figcaption className={index === 0 ? "p-5 text-lg leading-relaxed text-primary" : "p-5 leading-relaxed text-primary"}>{caption}</figcaption>
                        </figure>
                    ))}
                    </div>
                </div>
            </Section>

            <Section id="heritage" title={page.heritageTitle} muted>
                <p className="mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">{`${page.heritageText} `}<strong className="font-semibold text-primary">{page.heritageBeneficiary}</strong>{` ${page.heritageTextAfter}`}</p>
                {page.heritageOptions.length > 0 && <div className="divide-y divide-[#d9d7d1] border-y border-[#d9d7d1]">
                    {page.heritageOptions.map((option) => <article className="grid gap-3 py-6 md:grid-cols-[1fr_2fr]" key={option.title}><h3 className="font-serif text-xl font-semibold text-primary">{option.title}</h3><div><p>{option.text}</p>{option.note && <p className="mt-2 text-sm text-muted-foreground">{option.note}</p>}<a className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline" href={giving.heritage} target="_blank" rel="noopener noreferrer">{option.linkLabel} <ArrowUpRight className="size-4" /></a></div></article>)}
                </div>}
                <p className="mt-6 text-muted-foreground">{page.heritageNote}</p>
            </Section>

            <Section id="sponsorship" title={page.sponsorshipTitle}>
                <figure className="mb-8">
                    <Image src={page.sponsorshipPhoto.photo.src} alt={page.sponsorshipPhoto.photo.alt} width={page.sponsorshipPhoto.photo.width ?? 1798} height={page.sponsorshipPhoto.photo.height ?? 792} sizes="(min-width: 1100px) 1040px, 100vw" className="h-auto w-full" />
                    <figcaption className="mt-3 text-sm text-muted-foreground">{page.sponsorshipPhoto.caption}</figcaption>
                </figure>
                <div className="grid gap-6 md:grid-cols-[2fr_auto] md:items-center">
                    <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">{page.sponsorshipParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
                    <Button asChild size="lg"><Link href="/get-involved/sponsor">View sponsorship options</Link></Button>
                </div>
            </Section>

            <Section id="global-speaker-fund" title={page.globalFundTitle} muted>
                <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">{page.globalFundText}</p>
                <Button asChild size="lg" className="mt-6 h-auto whitespace-normal py-3"><a href={giving.globalSpeakerFund} target="_blank" rel="noopener noreferrer">Contribute to the Global Speaker Fund <ArrowUpRight className="size-4 shrink-0" /></a></Button>
            </Section>

            <Section id="monthly-giving" title={page.monthlyTitle}>
                <div className="grid gap-8 lg:grid-cols-[2fr_3fr] lg:items-center">
                <figure>
                    <Image src={page.monthlyPhoto.photo.src} alt={page.monthlyPhoto.photo.alt} width={page.monthlyPhoto.photo.width ?? 2640} height={page.monthlyPhoto.photo.height ?? 1760} sizes="(min-width: 1024px) 400px, 100vw" className="h-auto w-full" />
                    <figcaption className="mt-3 text-sm text-muted-foreground">{page.monthlyPhoto.caption}</figcaption>
                </figure>
                <div>
                <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">{page.monthlyText}</p>
                <a href="#monthly-donation-form" className="mt-5 inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">Set up a monthly donation</a>
                </div>
                </div>
            </Section>

            <Section id="donation-form" title={page.formsTitle} muted><DonationForm /></Section>

            <Section id="tax-smart-giving" title={page.taxTitle}>
                <p className="mb-6 max-w-3xl text-lg text-muted-foreground">{page.taxIntro}</p>
                {page.taxOptions.length > 0 && <div className="grid gap-8 md:grid-cols-2">
                    {page.taxOptions.map((option) => <article key={option.title}><h3 className="font-serif text-2xl text-primary">{option.title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{option.text}</p></article>)}
                </div>}
                <p className="mt-8 leading-relaxed text-muted-foreground">{page.taxNote}</p>
                {page.taxPartners.length > 0 && <>
                <p className="mt-6 text-muted-foreground">{page.taxPartnersIntro}</p>
                <div className="mt-5 grid gap-6 border-y border-[#d9d7d1] py-6 md:grid-cols-2">
                    {page.taxPartners.map((partner) => <p key={partner.name}><strong className="block text-primary">{partner.name}</strong><span className="block text-muted-foreground">{partner.role}</span><a className="inline-flex min-h-11 items-center font-semibold text-primary underline" href={telHref(partner.phone)}>{partner.phone}</a></p>)}
                </div>
                </>}
            </Section>
            <Section muted><MemberStory photo={page.testimonial.photo} name={page.testimonial.name} role={page.testimonial.role}><p>{page.testimonial.quote}</p></MemberStory></Section>
        </>
    );
}
