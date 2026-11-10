import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lock, PlayCircle, Radio } from "lucide-react";
import PageHero, { Section } from "@/components/page-hero";
import { currentSeries, getCurrentMember, livestream, nextProgram, videoArchives, type SeriesProgram } from "@/lib/members";
import { memberLogin, parseDate } from "@/lib/site";

export const metadata: Metadata = { title: "Members Only", robots: { index: false, follow: false } };

// Rendered per request: access depends on who is signed in.
export const dynamic = "force-dynamic";

const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Members Only" }];

const shortDate = (iso: string) => parseDate(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const longDate = (iso: string) => parseDate(iso).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

export default async function MembersPage() {
    const member = await getCurrentMember();
    return member ? <MemberContent /> : <LockedView />;
}

function LockedView() {
    return (
        <>
            <PageHero breadcrumbs={breadcrumbs} title="Members only">
                Livestreams and recordings of the Distinguished Speaker Series are a benefit of WACHH membership.
            </PageHero>
            <Section>
                <div className="max-w-[640px] border-t-2 border-[var(--navy)] pt-6">
                    <Lock className="size-7 text-[var(--gold)]" aria-hidden="true" />
                    <h2 className="mt-4 font-[family-name:var(--serif)] text-[30px] font-medium text-[var(--navy)]">Sign in to continue</h2>
                    <p className="mt-3 text-lg text-[#444]">
                        This page is available to current members. Sign in with your WACHH member account, or join to watch live programs and the full video archive.
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3">
                        <a className="inline-flex min-h-12 items-center bg-[var(--navy)] px-5 py-3 font-bold text-white" href={memberLogin}>Member sign in</a>
                        <Link className="inline-flex min-h-12 items-center border border-[var(--navy)] px-5 py-3 font-bold text-[var(--navy)]" href="/get-involved/membership">Become a member</Link>
                    </div>
                </div>
            </Section>
        </>
    );
}

function MemberContent() {
    const next = nextProgram();
    const today = new Date();
    const hasGlobal = currentSeries.programs.some((p) => p.globalSpeaker);

    return (
        <>
            <PageHero breadcrumbs={breadcrumbs} title="Speaker Livestreams and Videos">
                Watch Distinguished Speaker Series programs live or catch up on recordings. These videos and livestreams are available to WACHH members only.
            </PageHero>

            <Section id="livestream" title="Livestream">
                {livestream.embedUrl ? (
                    <div className="aspect-video w-full bg-[var(--navy)]">
                        <iframe className="size-full" src={livestream.embedUrl} title="WACHH livestream" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
                    </div>
                ) : (
                    <div className="grid gap-8 bg-[var(--navy)] p-8 text-white md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:p-10">
                        <div>
                            <p className="flex items-center gap-2 text-sm font-bold tracking-[0.14em] text-[var(--header-gold)] uppercase">
                                <Radio className="size-4" aria-hidden="true" /> Stream offline
                            </p>
                            <p className="mt-3 font-[family-name:var(--serif)] text-[26px] leading-snug md:text-[30px]">
                                The livestream begins {livestream.opensMinutesBefore} minutes before each scheduled program.
                            </p>
                        </div>
                        {next && (
                            <div className="border-white/20 md:max-w-[300px] md:border-l md:pl-8">
                                <p className="text-sm font-bold tracking-[0.14em] text-slate-300 uppercase">Next program</p>
                                <p className="mt-2 text-lg font-bold">{longDate(next.date)}</p>
                                <p className="mt-1 text-slate-200">{next.presenter}: {next.topic}</p>
                            </div>
                        )}
                    </div>
                )}
            </Section>

            <Section id="series" title={`${currentSeries.season} Speaker Series videos`} muted>
                <ol className="divide-y divide-[#d9d7d1] border-y border-[#d9d7d1] bg-white">
                    {currentSeries.programs.map((program) => (
                        <ProgramRow key={program.date} program={program} past={parseDate(program.date) < new Date(today.getFullYear(), today.getMonth(), today.getDate())} />
                    ))}
                </ol>
                {hasGlobal && (
                    <p className="mt-4 text-sm text-[#555]">
                        <span className="font-bold text-[var(--gold)]">*</span> Made possible by the{" "}
                        <Link className="font-bold text-[var(--teal)] underline underline-offset-4" href="/programs/global-speakers-program">Global Speakers Program</Link>.
                    </p>
                )}
            </Section>

            <Section id="archives" title="Video archives">
                <ul className="divide-y divide-[#d9d7d1] border-y border-[#d9d7d1]">
                    {videoArchives.map((archive) => (
                        <li key={archive.label}>
                            {archive.href ? (
                                <a className="flex min-h-14 items-center justify-between gap-4 py-4 font-bold text-[var(--navy)] hover:text-[var(--teal)]" href={archive.href}>
                                    {archive.label} <ArrowRight className="size-5 shrink-0 text-[var(--teal)]" aria-hidden="true" />
                                </a>
                            ) : (
                                <span className="flex min-h-14 items-center justify-between gap-4 py-4 font-bold text-[var(--navy)]">
                                    {archive.label} <span className="text-sm font-normal text-[#777]">Coming soon</span>
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </Section>
        </>
    );
}

function ProgramRow({ program, past }: { program: SeriesProgram; past: boolean }) {
    return (
        <li className="grid gap-x-8 gap-y-2 px-5 py-5 md:grid-cols-[130px_minmax(0,1fr)_150px] md:items-center md:px-6">
            <p className="text-sm font-bold tracking-wide text-[#666] uppercase">{shortDate(program.date)}</p>
            <div className="min-w-0">
                <p className="font-bold text-[var(--navy)]">
                    {program.presenter}
                    {program.globalSpeaker && <span className="text-[var(--gold)]" title="Global Speakers Program">*</span>}
                </p>
                <p className="mt-1 text-[#505050]">{program.topic}</p>
            </div>
            <div className="md:text-right">
                {past && program.videoUrl ? (
                    <a className="inline-flex min-h-11 items-center gap-2 font-bold text-[var(--teal)] underline-offset-4 hover:underline" href={program.videoUrl}>
                        <PlayCircle className="size-5" aria-hidden="true" /> Watch
                    </a>
                ) : (
                    <span className="text-sm text-[#777]">{past ? "Video coming soon" : "Upcoming"}</span>
                )}
            </div>
        </li>
    );
}
