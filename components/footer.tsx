import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube, type LucideIcon } from "lucide-react";
import { contact, memberLogin, legalLinks, social } from "@/lib/site";

// Site footer: the WACHH mark with its motto and the five top-level sections (from `nav` in lib/site.ts,
// which the header shares), then the office contact details, then the legal line.
// Secondary text is white at reduced opacity, so every colour on the navy field comes from the tokens.
// Section pages, Become a Member, and Donate live in the header, so they are not repeated here.
// Member log in is only here, in the legal line, beside Privacy Notice and Resources and Links.
// The social accounts sit beside the contact details; the legal line links to pages still on the original site.

const contactLink = "font-bold text-white transition-[color] duration-150 ease-color hover:text-header-gold";
const legalLinkStyle = "underline-offset-3 transition-[color] duration-150 ease-color hover:text-white hover:underline";
const socialIcons: Record<string, LucideIcon> = { Facebook, LinkedIn: Linkedin, YouTube: Youtube, Instagram };

/** The site footer: WACHH mark and motto, section links, contact details, social accounts, and the legal line. */
export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-inner">
                <div className="footer-grid">
                    <div>
                        <a
                            className="footer-brand"
                            href="https://worldaffairscouncils.org/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Visit the World Affairs Councils of America website"
                        >
                            <Image
                                className="footer-waca-logo"
                                src="/images/world-affairs-councils-of-america.png"
                                alt="World Affairs Councils of America"
                                width={480}
                                height={181}
                            />
                        </a>
                        <p className="footer-tagline">Connecting our community<br />to the world.</p>
                    </div>
                    <div>
                        <h3>Quick Links</h3>
                        <Link href="/about">About WACHH</Link>
                        <Link href="/get-involved/membership">Membership</Link>
                        <Link href="/get-involved/guests">Events</Link>
                    </div>
                    <div>
                        <h3>Explore</h3>
                        <Link href="/programs">Programs</Link>
                        <Link href="/get-involved/give">Support Us</Link>
                    </div>
                </div>

                <address className="footer-contact">
                    <div className="footer-contact-details">
                        <a href={`mailto:${contact.email}`} className={contactLink}>{contact.email}</a>
                        <a href={`tel:${contact.phone.replace(/-/g, "")}`} className={contactLink}>{contact.phone}</a>
                    </div>
                    <div className="footer-address">
                        <span>{contact.office}</span>
                        <span>Mail: {contact.mail}</span>
                    </div>
                    <ul className="footer-socials" aria-label="WACHH on social media">
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

                <div className="footer-legal">
                    <p>© {new Date().getFullYear()} World Affairs Council of Hilton Head. A 501(c)(3) nonprofit.</p>
                    <ul className="flex flex-wrap gap-x-6">
                        {[{ label: "Member log in", href: memberLogin }, ...legalLinks].map((legalLink) => (
                            <li key={legalLink.href}>
                                {legalLink.href.startsWith("/") ? (
                                    <Link href={legalLink.href} className={legalLinkStyle}>{legalLink.label}</Link>
                                ) : (
                                    <a href={legalLink.href} className={legalLinkStyle}>{legalLink.label}</a>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}
