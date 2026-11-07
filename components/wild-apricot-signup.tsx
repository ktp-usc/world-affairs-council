"use client";

import Script from "next/script";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { membership, wildApricotBaseUrl } from "@/lib/site";

declare global {
    interface Window {
        tryToEnableWACookies?: (siteUrl: string) => void;
    }
}

/** Embeds Wild Apricot signup while retaining direct application and renewal links. */
export default function WildApricotSignup() {
    const iframeReady = useRef(false);
    const helperReady = useRef(false);
    const initialized = useRef(false);

    /** Runs cookie setup once per mount, after both the iframe and helper are ready. */
    function initializeWildApricotCookies() {
        if (
            initialized.current ||
            !iframeReady.current ||
            !helperReady.current ||
            typeof window.tryToEnableWACookies !== "function"
        ) {
            return;
        }

        initialized.current = true;
        window.tryToEnableWACookies(wildApricotBaseUrl);
    }

    /** Records iframe readiness regardless of which external resource loads first. */
    function handleIframeLoad() {
        iframeReady.current = true;
        initializeWildApricotCookies();
    }

    /** Handles initial script loading and remounts after client-side navigation. */
    function handleHelperReady() {
        helperReady.current = true;
        initializeWildApricotCookies();
    }

    return (
        <div className="space-y-6">
            <div className="border-y border-[#d9d7d1] bg-white py-6">
                <h2 className="font-[family-name:var(--serif)] text-[28px] font-medium text-[var(--navy)]">
                    Membership application
                </h2>

                <p className="mt-2 text-[#505050]">
                    Complete your application below. Wild Apricot handles
                    your membership details and payment.
                </p>

                <p className="mt-3 text-sm text-[#505050]">
                    If the embedded form does not work in your browser,
                    open the membership form directly on Wild Apricot.
                </p>

                <Button asChild className="mt-4 h-auto min-h-12 w-full whitespace-normal px-5 py-3 text-center sm:w-auto">
                    <a
                        href={membership.hostedJoin}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Open membership form in a new tab
                    </a>
                </Button>
            </div>

            <div
                className="overflow-auto border border-[#d9d7d1] bg-white"
                style={{ WebkitOverflowScrolling: "touch" }}
            >
                <iframe
                    title="World Affairs Council Hilton Head membership application"
                    src={membership.widgetJoin}
                    className="h-[1100px] w-full border-0"
                    onLoad={handleIframeLoad}
                />
            </div>

            <p className="text-sm text-[#505050]">
                Already a member?{" "}
                <a
                    href={membership.renew}
                    className="font-semibold text-[var(--teal)] underline underline-offset-4"
                >
                    Log in to renew your membership
                </a>
                .
            </p>

            <Script
                id="wild-apricot-cookie-helper"
                src={`${wildApricotBaseUrl}/Common/EnableCookies.js`}
                strategy="afterInteractive"
                onReady={handleHelperReady}
            />
        </div>
    );
}
