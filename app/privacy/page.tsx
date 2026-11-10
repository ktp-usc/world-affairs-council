import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import PageHero from "@/components/page-hero";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
    title: "Privacy Notice",
    description: "How the World Affairs Council of Hilton Head collects, uses, shares, and protects your personal information.",
};

// The privacy contact email as published in the Council's privacy notice.
const privacyEmail = "wachhi@gmail.com";


const h2 = "font-[family-name:var(--serif)] text-[28px] leading-tight font-medium text-[var(--navy)] md:text-[32px]";
const prose = "mt-4 space-y-4 text-lg leading-relaxed text-[#444]";
const list = "space-y-2 border-l-2 border-[var(--gold)] pl-5";

export default function PrivacyPage() {
    return (
        <>
            <PageHero breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Notice" }]} title="Privacy notice">
                The WACHH Board and staff take the issue of privacy very seriously and are committed to being transparent about our privacy practices and how we handle your personal information.
            </PageHero>

            <div className="bg-white">
                <div className="mx-auto w-[min(1040px,calc(100%-48px))] py-12 md:py-16">
                    <div className="max-w-[760px] space-y-12">
                        <section aria-labelledby="notice">
                            <h2 id="notice" className={h2}>WACHH Privacy Notice</h2>
                            <div className={prose}>
                                <p>
                                    This privacy notice discloses the privacy practices for www.wachh.org, World Affairs Council of Hilton Head, P.O. Box 22523, Hilton Head, SC 29925. This privacy notice applies solely to information collected by this website. It will notify you of the following:
                                </p>
                                <ul className={list}>
                                    <li>What personally identifiable information is collected from you through the website, how it is used and with whom it may be shared.</li>
                                    <li>What choices are available to you regarding the use of your data.</li>
                                    <li>The security procedures in place to protect the misuse of your information.</li>
                                    <li>How you can correct any inaccuracies in the information.</li>
                                </ul>
                                <p>
                                    In order to use the WACHH website, a user must first complete the registration form. During registration a user is required to give certain information (such as name and email address). This information is used to contact you about the products/services on our site in which you have expressed interest.
                                </p>
                                <p>
                                    We request information from you on our order forms. To purchase anything from us, you must provide contact information (like name, email and address) and financial information (like credit card number, expiration date). This information is used for billing purposes and to fill your orders. If we have trouble processing an order, we’ll use this information to contact you.
                                </p>
                                <p>
                                    This website contains links to other sites. Please be aware that we are not responsible for the content or privacy practices of such other sites. We encourage our users to be aware when they leave our site and to read the privacy statements of any other site that collects personally identifiable information.
                                </p>
                            </div>
                        </section>

                        <section aria-labelledby="collection">
                            <h2 id="collection" className={h2}>Information collection, use, and sharing</h2>
                            <div className={prose}>
                                <p>
                                    We are the sole owners of the information collected on this site. We only have access to/collect information that you voluntarily give us via email or other direct contact from you. We will not sell or rent this information to anyone.
                                </p>
                                <p>
                                    We will use your information to respond to you, regarding the reason you contacted us. We will not share your information with any third party outside of our organization, other than as necessary to fulfill your request, e.g. to ship an order.
                                </p>
                                <p>
                                    Unless you ask us not to, we may contact you via email in the future to tell you about upcoming meetings, member benefits, programs, or changes to this privacy policy.
                                </p>
                            </div>
                        </section>

                        <section aria-labelledby="access">
                            <h2 id="access" className={h2}>Your access to and control over information</h2>
                            <div className={prose}>
                                <p>
                                    You may opt out of any future contacts from us at any time. You can do the following at any time by contacting us via the email address or phone number given on our website or by going to our website and logging on to your account using your password:
                                </p>
                                <ul className={list}>
                                    <li>See what data we have about you, if any.</li>
                                    <li>Change/correct any data we have about you.</li>
                                    <li>Have us delete any data we have about you.</li>
                                    <li>Express any concern you have about our use of your data.</li>
                                </ul>
                            </div>
                        </section>

                        <section aria-labelledby="security">
                            <h2 id="security" className={h2}>Security</h2>
                            <div className={prose}>
                                <p>
                                    We take precautions to protect your information. When you submit sensitive information via the website, your information is protected both online and offline (you can verify this by looking for the “https” at the beginning of the address of the web page).
                                </p>
                                <p>
                                    Wherever we collect sensitive information (such as credit card data), that information is encrypted and transmitted to us in a secure way. We do not store any credit card information. Once it is used it is deleted.
                                </p>
                                <p>
                                    While we use encryption to protect sensitive information transmitted online, we also protect your information offline. Only employees who need the information to perform a specific job (for example, billing or customer service) are granted access to personally identifiable information. The computers/servers in which we store personally identifiable information are kept in a secure environment.
                                </p>
                            </div>
                        </section>

                        <section aria-labelledby="surveys">
                            <h2 id="surveys" className={h2}>Surveys</h2>
                            <div className={prose}>
                                <p>
                                    From time-to-time our site requests information via surveys. Participation in these surveys is completely voluntary and you may choose whether to participate and therefore disclose this information. Information requested may include contact information (such as name and shipping address), and demographic information (such as zip code, age level). Survey information will be used for purposes of monitoring or improving the use and satisfaction of the WACHH organization and its programs.
                                </p>
                            </div>
                        </section>

                        <section aria-labelledby="contact" className="bg-[var(--off-white)] p-6 md:p-8">
                            <h2 id="contact" className={h2}>Contact us</h2>
                            <p className="mt-4 text-lg leading-relaxed text-[#444]">
                                If you feel that we are not abiding by this privacy policy, you should contact us immediately.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <a className="inline-flex min-h-12 items-center gap-2 bg-[var(--navy)] px-5 py-3 font-bold text-white" href={`tel:${contact.phone.replace(/-/g, "")}`}>
                                    <Phone className="size-4" aria-hidden="true" /> {contact.phone}
                                </a>
                                <a className="inline-flex min-h-12 items-center gap-2 border border-[var(--navy)] bg-white px-5 py-3 font-bold text-[var(--navy)]" href={`mailto:${privacyEmail}`}>
                                    <Mail className="size-4" aria-hidden="true" /> {privacyEmail}
                                </a>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
