"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import WildApricotEmbed from "@/components/wild-apricot-embed";
import { newsletter } from "@/lib/site";

export default function NewsletterSignup() {
    const [expanded, setExpanded] = useState(false);
    const [hasOpened, setHasOpened] = useState(false);

    useEffect(() => {
        const openFromLink = () => {
            if (window.location.hash !== "#newsletter-signup-panel") return;
            setHasOpened(true);
            setExpanded(true);
            // Scroll after revealing the panel so its new height is accounted for.
            window.requestAnimationFrame(() => {
                document.getElementById("news")?.scrollIntoView({
                    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                    block: "start",
                });
            });
        };
        const handleClick = (event: MouseEvent) => {
            if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            const link = event.target instanceof Element ? event.target.closest("a") : null;
            if (link?.getAttribute("href") !== "#newsletter-signup-panel") return;
            // Clicking the same anchor again does not emit another hashchange.
            event.preventDefault();
            if (window.location.hash !== "#newsletter-signup-panel") {
                window.history.pushState(null, "", "#newsletter-signup-panel");
            }
            openFromLink();
        };
        openFromLink();
        window.addEventListener("hashchange", openFromLink);
        document.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("hashchange", openFromLink);
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <section className="home-newsletter" id="news" aria-labelledby="newsletter-title">
            <div className="content-width">
                <div className="home-newsletter-heading">
                    <div>
                        <h2 id="newsletter-title">Sign up for our email newsletter.</h2>
                        <p>Upcoming programs, Council news, and conversations worth joining.</p>
                    </div>
                    <button
                        className="home-button home-button--gold"
                        type="button"
                        aria-expanded={expanded}
                        aria-controls="newsletter-signup-panel"
                        onClick={() => {
                            setHasOpened(true);
                            setExpanded((current) => !current);
                        }}
                    >
                        {expanded ? "Close form" : "Sign Up"}
                        <ChevronDown size={18} aria-hidden="true" className={expanded ? "is-expanded" : ""} />
                    </button>
                </div>
                <div
                    id="newsletter-signup-panel"
                    className={`home-newsletter-reveal${expanded ? " is-open" : ""}`}
                    role="region"
                    aria-label="Newsletter signup form"
                    aria-hidden={!expanded}
                    inert={!expanded}
                >
                    <div className="home-newsletter-reveal-inner">
                        {hasOpened && (
                            <div className="home-newsletter-form">
                                <WildApricotEmbed
                                    src={newsletter.widgetSignup}
                                    title="Email newsletter signup"
                                    iframeClassName="h-[650px] w-full border-0"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
