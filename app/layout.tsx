import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif-display" });

export const metadata: Metadata = {
    title: {
        default: "World Affairs Council of Hilton Head",
        template: "%s · World Affairs Council of Hilton Head",
    },
    description: "Engaging, educating and inspiring our community about world affairs through speakers, discussion groups and student programs.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${inter.variable} ${serif.variable}`}>
        <body className="flex min-h-screen flex-col font-sans antialiased">
        <Header />
        <main className="flex-1">{ children }</main>
        <Footer />
        </body>
        </html>
    );
}
