"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";
import { wildApricotBaseUrl } from "@/lib/site";

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

/** Shares Wild Apricot's cookie setup between membership and donation forms. */
export default function WildApricotEmbed({ src, title }: { src: string; title: string }) {
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
        <>
            <div
                className="overflow-auto border border-[#d9d7d1] bg-white"
                style={{ WebkitOverflowScrolling: "touch" }}
            >
                <iframe
                    title={title}
                    src={src}
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
        </>
    );
}
