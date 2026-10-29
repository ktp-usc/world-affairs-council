import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "@/components/logo";
import { contact, nav, social } from "@/lib/site";

export default function Footer() {
    return (
        <footer className="bg-navy-deep text-white/75">
            <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
                <div className="space-y-4">
                    <Logo inverted />
                    <p className="max-w-sm text-sm">
                        A nonpartisan, nonprofit member of the World Affairs Councils of America, bringing global
                        conversations to the Lowcountry.
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                        { social.map((s) => (
                            <a key={ s.label } href={ s.href } className="hover:text-gold" target="_blank" rel="noreferrer">
                                { s.label }
                            </a>
                        )) }
                    </div>
                </div>

                <div>
                    <h2 className="mb-4 text-sm font-semibold tracking-wider text-gold uppercase">Explore</h2>
                    <ul className="space-y-2 text-sm">
                        { nav.map((item) => (
                            <li key={ item.href }><Link href={ item.href } className="hover:text-white">{ item.label }</Link></li>
                        )) }
                        <li><Link href="/news" className="hover:text-white">News &amp; Updates</Link></li>
                        <li><Link href="/news/resources" className="hover:text-white">Resources and Links</Link></li>
                    </ul>
                </div>

                <div>
                    <h2 className="mb-4 text-sm font-semibold tracking-wider text-gold uppercase">Contact</h2>
                    <ul className="space-y-3 text-sm">
                        <li className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                            <span>{ contact.office }<br /><span className="text-white/50">Mail: { contact.mail }</span></span>
                        </li>
                        <li className="flex gap-2"><Phone className="mt-0.5 size-4 shrink-0 text-gold" />
                            <a href={ `tel:${ contact.phone }` } className="hover:text-white">{ contact.phone }</a>
                        </li>
                        <li className="flex gap-2"><Mail className="mt-0.5 size-4 shrink-0 text-gold" />
                            <a href={ `mailto:${ contact.email }` } className="hover:text-white">{ contact.email }</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-xs text-white/50 sm:flex-row sm:justify-between">
                    <span>© { new Date().getFullYear() } World Affairs Council of Hilton Head</span>
                    <Link href="/privacy" className="hover:text-white">Privacy Notice</Link>
                </div>
            </div>
        </footer>
    );
}
