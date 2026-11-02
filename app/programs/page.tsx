import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { programCards } from "@/components/programs/programs-data";

export const metadata: Metadata = {
    title: "Programs | World Affairs Council of Hilton Head",
    description: "Explore WACHH speaker, discussion, book, and student programs.",
};

export default function ProgramsPage() {
    return (
        <div className="min-h-screen bg-white font-[var(--sans)] text-[18px] leading-[1.6] text-[var(--charcoal)]">
            <Header />
            <main>
                <section className="relative overflow-hidden bg-[linear-gradient(90deg,rgba(27,42,65,.97)_0%,rgba(27,42,65,.88)_52%,rgba(27,42,65,.62)_100%),url('/programs/main/programs-speaker-crowd.png')] bg-cover bg-[center_42%] pt-16 pb-14 text-white md:pt-22 md:pb-18">
                    <div className="relative z-10 mx-auto w-[min(1200px,calc(100%-48px))]">
                        <nav className="mb-8 flex flex-wrap gap-2 text-sm text-slate-300" aria-label="Breadcrumb"><Link className="underline underline-offset-4" href="/">Home</Link><span>/</span><span>Programs</span></nav>
                        <p className="mb-3 text-[13px] font-bold tracking-[.14em] text-[#d9b87d] uppercase">Learn with us</p>
                        <h1 className="font-[family-name:var(--serif)] text-[42px] leading-[1.08] font-medium tracking-[-.02em] text-white md:text-[68px]">Programs</h1>
                        <p className="mt-6 max-w-[730px] text-lg text-slate-200 md:text-[21px]">Engaging, educating, and inspiring our community through programs that make world affairs relevant to the Lowcountry.</p>
                    </div>
                </section>

                <section className="mx-auto grid w-[min(1200px,calc(100%-48px))] gap-6 py-16 md:grid-cols-[1fr_2fr] md:gap-12 md:py-22">
                    <p className="text-[13px] font-bold tracking-[.14em] text-[var(--teal)] uppercase">Explore the world</p>
                    <div>
                        <h2 className="max-w-[690px] font-[family-name:var(--serif)] text-[34px] leading-[1.15] font-medium tracking-[-.02em] text-[var(--navy)] md:text-[43px]">Many ways to understand a complicated world.</h2>
                        <p className="mt-5 max-w-[710px] text-lg text-[#4d4d4d] md:text-xl">WACHH is a nonprofit, nonpartisan organization that strives to engage, educate, and inspire the community regarding world affairs. We use a variety of programs to accomplish this, each with a different approach. We invite you to explore them all. Each is unique, informative, and entertaining.</p>
                    </div>
                </section>

                <section className="border-y border-[#d9d7d1] bg-[var(--off-white)] py-16 md:py-24">
                    <div className="mx-auto w-[min(1200px,calc(100%-48px))]">
                        <div className="mb-11 grid gap-6 md:grid-cols-[1fr_2fr] md:gap-12"><p className="text-[13px] font-bold tracking-[.14em] text-[var(--teal)] uppercase">Our programs</p><h2 className="max-w-[700px] font-[family-name:var(--serif)] text-[34px] leading-[1.15] font-medium tracking-[-.02em] text-[var(--navy)] md:text-[42px]">Find your way into the conversation.</h2></div>
                        <div className="grid gap-6 md:grid-cols-2">
                            {programCards.map((program) => (
                                <article className="group overflow-hidden border border-[#d9d7d1] bg-white last:md:col-span-2 last:md:grid last:md:grid-cols-2" key={program.title}>
                                    <div className="min-h-60 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02] last:md:min-h-[330px]" style={{ backgroundImage: `url(${program.image})` }} role="img" aria-label="" />
                                    <div className="p-6 md:p-8"><h3 className="font-[family-name:var(--serif)] text-[28px] leading-[1.2] font-medium tracking-[-.02em] text-[var(--navy)]">{program.title}</h3><p className="my-3 text-[#4f4f4f] md:min-h-[58px]">{program.text}</p><Link className="inline-flex min-h-12 items-center gap-2 font-bold text-[var(--teal)] underline-offset-4 hover:underline" href={program.href}>Learn more <ArrowRight size={18} /></Link></div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-[var(--navy)] py-14 text-white md:py-[70px]">
                    <div className="mx-auto grid w-[min(1200px,calc(100%-48px))] items-end gap-10 md:grid-cols-[1fr_auto] md:gap-12">
                        <div><p className="mb-3 text-[13px] font-bold tracking-[.14em] text-[#d9b87d] uppercase">Future global leaders</p><h2 className="max-w-[760px] font-[family-name:var(--serif)] text-[35px] leading-[1.15] font-medium tracking-[-.02em] text-white md:text-[42px]">Programs built for students, now under one Programs menu.</h2><p className="mt-5 max-w-[760px] text-slate-200">Academic WorldQuest and Model United Nations help Beaufort County students build global knowledge, confidence, and respect for different points of view.</p></div>
                        <Link className="inline-flex min-h-12 items-center justify-center bg-[var(--gold)] px-5 py-3 font-bold text-[var(--navy)]" href="/programs/student-programs">Explore Student Programs</Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
