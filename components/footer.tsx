import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { memberActions, contact, navSections, type NavLink } from "@/components/site-nav";
import styles from "./footer.module.css";

// Site footer: Contact Us leads, a thin accent rule, every section as a column
// of links under an uppercase heading, then the logo and legal line. Links come from components/site-nav.ts.

function FooterLink({ link, className }: { link: NavLink; className?: string }) {
    return link.external ? <a className={className} href={link.href}>{link.label}</a> : <Link className={className} href={link.href}>{link.label}</Link>;
}

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <section className={styles.contact} aria-labelledby="footer-contact">
                    <div>
                        <h2 id="footer-contact" className={styles.contactTitle}>
                            <a href={`mailto:${contact.email}`}>Contact us <ArrowRight size={36} strokeWidth={1.5} aria-hidden="true" /></a>
                        </h2>
                        <p className={styles.contactText}>Questions about membership, programs, or giving? The Council office is glad to help.</p>
                    </div>
                    <div className={styles.contactDetails}>
                        <a href={`mailto:${contact.email}`}>{contact.email}</a>
                        <a href={`tel:${contact.phone.replace(/-/g, "")}`}>{contact.phone}</a>
                        <p>{contact.office}<br />Mail: {contact.mail}</p>
                    </div>
                </section>

                <nav className={styles.columns} aria-label="Site map">
                    {navSections.map((section) => (
                        <div key={section.label}>
                            <h3 className={styles.heading}><Link href={section.href}>{section.label}</Link></h3>
                            <ul>
                                {section.links.map((link) => <li key={link.label}><FooterLink link={link} /></li>)}
                            </ul>
                        </div>
                    ))}
                </nav>

                <div className={styles.bottom}>
                    <Link href="/" className={styles.brand} aria-label="WACHH home">
                        <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
                            <circle cx="16" cy="16" r="14.5" />
                            <circle cx="16" cy="16" r="9.5" />
                            <circle cx="16" cy="16" r="5" />
                        </svg>
                        <span>WACHH</span>
                    </Link>
                    <ul className={styles.quick}>
                        <li><FooterLink link={memberActions.login} /></li>
                        <li><FooterLink link={memberActions.donate} /></li>
                        <li><FooterLink link={memberActions.join} /></li>
                    </ul>
                    <p className={styles.legal}>© 2026 World Affairs Council of Hilton Head · A 501(c)(3) nonprofit</p>
                </div>
            </div>
        </footer>
    );
}
