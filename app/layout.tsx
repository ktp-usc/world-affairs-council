import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { fetchHeaderNav } from "@/sanity/lib/header-navigation";

export const metadata: Metadata = {
    title: "World Affairs Council of Hilton Head | WACHH",
    description: "Connecting our community to the world through engaging, educating, and inspiring conversations.",
};

/** The page shell: the header (with its tabs from Sanity), the page, and the footer. */
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const headerNavItems = await fetchHeaderNav();
    return (
        <html lang="en">
            <body>
                <Header navItems={headerNavItems} />
                {children}
                <Footer />
            </body>
        </html>
    );
}
