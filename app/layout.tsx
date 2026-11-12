import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { fetchHeaderNav } from "@/sanity/lib/header-navigation";

// The site fonts, hosted with the site and loaded early instead of through a chain of Google requests.
// display: swap shows text in the size-matched fallback font right away and swaps when the font arrives.
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap", variable: "--font-dm-sans" });
const dmSerifDisplay = DM_Serif_Display({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-dm-serif" });

export const metadata: Metadata = {
    title: "World Affairs Council of Hilton Head | WACHH",
    description: "Connecting our community to the world through engaging, educating, and inspiring conversations.",
};

/** The page shell: a skip link, the header (with its tabs from Sanity), the page, and the footer. */
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const headerNavItems = await fetchHeaderNav();
    return (
        // data-scroll-behavior lets Next turn off smooth scrolling while it switches pages, so new pages open at the top instantly
        <html lang="en" data-scroll-behavior="smooth" className={`${dmSans.variable} ${dmSerifDisplay.variable}`}>
            <body>
                {/* Hidden until a keyboard user tabs to it; jumps past the header links to the page content. */}
                <a
                    href="#main-content"
                    className="fixed top-3 left-3 z-[60] -translate-y-[200%] bg-white px-4 py-3 font-bold text-[var(--navy)] shadow-lg outline-2 outline-offset-2 outline-[var(--teal)] focus:translate-y-0"
                >
                    Skip to main content
                </a>
                <Header navItems={headerNavItems} />
                <div id="main-content" tabIndex={-1} className="outline-none">
                    {children}
                </div>
                <Footer />
            </body>
        </html>
    );
}
