import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube, type LucideIcon } from "lucide-react";
import { contact, nav, originalSitePages, social } from "@/lib/site";

// Site footer: the WACHH mark with its motto and the five top-level sections (from `nav` in lib/site.ts,
// which the header shares), then the office contact details, then the legal line.
// Secondary text is white at reduced opacity, so every colour on the navy field comes from the tokens.
// Section pages, Log in, Join, and Donate live in the header, so they are not repeated here.
// The social accounts sit beside the contact details; the legal line links to pages still on the original site.

const contactLink = "font-bold text-white transition-[color] duration-150 ease-color hover:text-header-gold";
const socialIcons: Record<string, LucideIcon> = { Facebook, LinkedIn: Linkedin, YouTube: Youtube, Instagram };

/** The site footer: WACHH mark and motto, section links, contact details, social accounts, and the legal line. */
export default function Footer() {
    return (
        <footer className="bg-primary text-white selection:bg-header-gold selection:text-primary [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-[3px] [&_a:focus-visible]:outline-header-gold">
            <div className="content-width pt-14 pb-8 md:pt-20 md:pb-10">
                <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-start md:gap-12">
                    <div>
                        <Link href="/" className="flex w-fit items-center gap-3 text-white" aria-label="WACHH home">
                            <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" className="fill-none stroke-header-gold stroke-[1.5]">
                                <circle cx="16" cy="16" r="14.5" />
                                <circle cx="16" cy="16" r="9.5" />
                                <circle cx="16" cy="16" r="5" />
                            </svg>
                            <span className="font-[family-name:var(--serif)] text-[30px] leading-none">WACHH</span>
                        </Link>
                        <p className="mt-3 text-[15px] text-header-gold">Engaging, educating, inspiring.</p>
                    </div>
                    <nav aria-label="Footer" className="md:-mt-1.5">
                        <ul className="grid grid-cols-2 gap-x-8 gap-y-1 sm:flex sm:flex-wrap sm:gap-x-8 md:justify-end">
                            {nav.map((navItem) => (
                                <li key={navItem.label}>
                                    <Link href={navItem.href} className="inline-flex min-h-11 items-center text-base font-semibold text-white transition-[color] duration-150 ease-color hover:text-header-gold">
                                        {navItem.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <address className="mt-12 grid gap-x-12 gap-y-3 text-[15px] leading-relaxed text-white/75 not-italic md:mt-16 md:grid-cols-[auto_auto_1fr]">
                    <p className="grid justify-items-start">
                        <a href={`mailto:${contact.email}`} className={contactLink}>{contact.email}</a>
                        <a href={`tel:${contact.phone.replace(/-/g, "")}`} className={contactLink}>{contact.phone}</a>
                    </p>
                    <p className="text-pretty">{contact.office}<br />Mail: {contact.mail}</p>
                    <ul className="-ml-3 flex items-center md:-mt-2.5 md:ml-0 md:-mr-3 md:justify-self-end" aria-label="WACHH on social media">
                        {social.map((socialAccount) => {
                            const SocialIcon = socialIcons[socialAccount.label];
                            return (
                                <li key={socialAccount.label}>
                                    <a
                                        href={socialAccount.href}
                                        aria-label={`WACHH on ${socialAccount.label}`}
                                        className="grid size-11 place-items-center text-white/75 transition-[color] duration-150 ease-color hover:text-header-gold"
                                    >
                                        <SocialIcon size={20} strokeWidth={1.75} aria-hidden="true" />
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </address>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] leading-relaxed text-white/60">
                    <p>© {new Date().getFullYear()} World Affairs Council of Hilton Head. A 501(c)(3) nonprofit.</p>
                    <ul className="flex flex-wrap gap-x-6">
                        {originalSitePages.map((originalPage) => (
                            <li key={originalPage.href}>
                                <a href={originalPage.href} className="underline-offset-3 transition-[color] duration-150 ease-color hover:text-white hover:underline">{originalPage.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}
