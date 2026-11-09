import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="site-footer">
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
                    <Link href="/news">News &amp; Insights</Link>
                    <Link href="/get-involved/give">Support Us</Link>
                </div>
                <div>
                    <h3>Contact</h3>
                    <p>World Affairs Council<br />of Hilton Head</p>
                    <a href="mailto:hello@wachh.org">hello@wachh.org</a>
                </div>
            </div>
            <div className="footer-bottom">
                <span>© 2026 World Affairs Council of Hilton Head</span>
                <span>Engaging · Educating · Inspiring</span>
            </div>
        </footer>
    );
}
