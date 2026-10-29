"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { memberLogin, nav } from "@/lib/site";

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
            <div className="hidden bg-navy-deep text-xs text-white/80 md:block">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-1.5">
                    <span>Engaging, educating and inspiring our community</span>
                    <div className="flex gap-5">
                        <a href={ memberLogin } className="hover:text-gold">Member log in</a>
                        <Link href="/news" className="hover:text-gold">News &amp; Updates</Link>
                    </div>
                </div>
            </div>

            <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3">
                <Logo />

                <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
                    { nav.map((item) => (
                        <div key={ item.href } className="group relative">
                            <Link
                                href={ item.href }
                                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary"
                            >
                                { item.label }
                                { item.children && <ChevronDown className="size-3.5 opacity-60" /> }
                            </Link>
                            { item.children && (
                                <div className="invisible absolute left-0 top-full w-64 translate-y-1 rounded-lg border bg-card p-2 opacity-0 shadow-lg transition group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                                    { item.children.map((c) => (
                                        <Link key={ c.href } href={ c.href } className="block rounded-md px-3 py-2 text-sm hover:bg-muted">
                                            { c.label }
                                        </Link>
                                    )) }
                                </div>
                            ) }
                        </div>
                    )) }
                </nav>

                <div className="hidden items-center gap-2 lg:flex">
                    <Button asChild variant="outline" size="sm">
                        <Link href="/get-involved#give">Donate</Link>
                    </Button>
                    <Button asChild size="sm">
                        <Link href="/get-involved/membership">Become a Member</Link>
                    </Button>
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    aria-label={ open ? "Close menu" : "Open menu" }
                    aria-expanded={ open }
                    onClick={ () => setOpen(!open) }
                >
                    { open ? <X /> : <Menu /> }
                </Button>
            </div>

            { open && (
                <nav className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t px-6 py-4 lg:hidden" aria-label="Mobile">
                    { nav.map((item) => (
                        <div key={ item.href } className="border-b py-3 last:border-0">
                            <Link href={ item.href } onClick={ () => setOpen(false) } className="font-medium text-primary">
                                { item.label }
                            </Link>
                            { item.children && (
                                <div className="mt-2 grid gap-1 pl-3">
                                    { item.children.map((c) => (
                                        <Link key={ c.href } href={ c.href } onClick={ () => setOpen(false) } className="text-sm text-muted-foreground">
                                            { c.label }
                                        </Link>
                                    )) }
                                </div>
                            ) }
                        </div>
                    )) }
                    <div className="mt-4 grid grid-cols-2 gap-2">
                        <Button asChild variant="outline"><Link href="/get-involved#give" onClick={ () => setOpen(false) }>Donate</Link></Button>
                        <Button asChild><Link href="/get-involved/membership" onClick={ () => setOpen(false) }>Join</Link></Button>
                    </div>
                    <a href={ memberLogin } className="mt-4 block text-center text-sm text-muted-foreground">Member log in</a>
                </nav>
            ) }
        </header>
    );
}
