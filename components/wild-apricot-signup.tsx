"use client";

import Script from "next/script";
import { Button } from "@/components/ui/button";
import { membership, wildApricotBaseUrl } from "@/lib/site";

declare global {
    interface Window {
        tryToEnableWACookies?: (siteUrl: string) => void;
    }
}

function initializeWildApricotCookies() {
    window.tryToEnableWACookies?.(wildApricotBaseUrl);
}

export default function WildApricotSignup() {
    return (
        <div className="space-y-6">
            <div className="rounded-xl border bg-card p-6">
                <h2 className="font-serif text-2xl font-semibold text-primary">
                    Membership application
                </h2>

                <p className="mt-2 text-muted-foreground">
                    Complete your application below. Wild Apricot handles
                    your membership details and payment.
                </p>

                <p className="mt-3 text-sm text-muted-foreground">
                    If the embedded form does not work in your browser,
                    open the application directly.
                </p>

                <Button asChild className="mt-4">
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
                className="overflow-auto rounded-xl border bg-white"
                style={{ WebkitOverflowScrolling: "touch" }}
            >
                <iframe
                    title="World Affairs Council Hilton Head membership application"
                    src={membership.widgetJoin}
                    className="h-[1100px] w-full border-0"
                    onLoad={initializeWildApricotCookies}
                />
            </div>

            <p className="text-sm text-muted-foreground">
                Already a member?{" "}
                <a
                    href={membership.renew}
                    className="font-semibold text-primary underline underline-offset-4"
                >
                    Log in to renew your membership
                </a>
                .
            </p>

            <Script
                id="wild-apricot-cookie-helper"
                src={`${wildApricotBaseUrl}/Common/EnableCookies.js`}
                strategy="afterInteractive"
                onReady={initializeWildApricotCookies}
            />
        </div>
    );
}