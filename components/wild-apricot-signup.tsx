"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { membership, wildApricotBaseUrl } from "@/lib/site";

declare global {
    interface Window {
        tryToEnableWACookies?: (siteUrl: string) => void;
    }
}

let helperLoaded = false;
const helperLoadListeners = new Set<() => void>();

/** Records actual script completion and notifies whichever form is currently mounted. */
function handleHelperLoad() {
    if (typeof window.tryToEnableWACookies !== "function") {
        return;
    }

    helperLoaded = true;
    helperLoadListeners.forEach((initialize) => initialize());
}

/** Embeds Wild Apricot signup while retaining the direct hosted-form fallback. */
export default function WildApricotSignup() {
    const iframeReady = useRef(false);
    const mounted = useRef(false);
    const initialized = useRef(false);

    /** Runs cookie setup once per mount, after both the iframe and helper are ready. */
    const initializeWildApricotCookies = useCallback(() => {
        if (
            !mounted.current ||
            initialized.current ||
            !iframeReady.current ||
            !helperLoaded ||
            typeof window.tryToEnableWACookies !== "function"
        ) {
            return;
        }

        initialized.current = true;
        window.tryToEnableWACookies(wildApricotBaseUrl);
    }, []);

    useEffect(() => {
        mounted.current = true;
        helperLoadListeners.add(initializeWildApricotCookies);
        initializeWildApricotCookies();

        return () => {
            mounted.current = false;
            helperLoadListeners.delete(initializeWildApricotCookies);
        };
    }, [initializeWildApricotCookies]);

    /** Records iframe readiness regardless of which external resource loads first. */
    function handleIframeLoad() {
        iframeReady.current = true;
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

            <Script
                id="wild-apricot-cookie-helper"
                src={`${wildApricotBaseUrl}/Common/EnableCookies.js`}
                strategy="afterInteractive"
                onLoad={handleHelperLoad}
                onReady={initializeWildApricotCookies}
            />
        </div>
    );
}
