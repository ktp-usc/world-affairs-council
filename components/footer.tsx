export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-grid">
                <div>
                    <a className="footer-brand" href="#" aria-label="WACHH home">
                        <span className="footer-mark" aria-hidden="true"><span /></span>
                        <strong>WACHH</strong>
                    </a>
                    <p className="footer-tagline">Connecting our community<br />to the world.</p>
                </div>
                <div>
                    <h3>Quick Links</h3>
                    <a href="#about">About WACHH</a>
                    <a href="#membership">Membership</a>
                    <a href="#events">Events</a>
                </div>
                <div>
                    <h3>Explore</h3>
                    <a href="#programs">Programs</a>
                    <a href="#news">News &amp; Insights</a>
                    <a href="#support">Support Us</a>
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
