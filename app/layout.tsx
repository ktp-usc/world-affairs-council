import type { Metadata } from "next";
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
    title: "World Affairs Council of Hilton Head | WACHH",
    description: "Connecting our community to the world through engaging, educating, and inspiring conversations.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <html lang="en"><body>{children}</body></html>;
}
