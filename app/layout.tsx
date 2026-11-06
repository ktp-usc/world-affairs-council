import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif-display" });

export const metadata: Metadata = {
    title: "World Affairs Council of Hilton Head | WACHH",
    description: "Connecting our community to the world through engaging, educating, and inspiring conversations.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <html lang="en"><body>{children}</body></html>;
}
