import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/page-hero";
import RichText from "@/components/rich-text";
import ProgramGallery from "./program-gallery";
import { formatLongDate, formatScheduleDate, hasItems, hasRichText, type Program, type ProgramFact } from "./program-types";

const sectionHeading = "font-[family-name:var(--serif)] text-[30px] font-medium text-[var(--navy)] md:text-[34px]";
const optionalSection = "mt-14 border-t border-[#d9d7d1] pt-10 md:mt-18";

function Fact({ fact }: { fact: ProgramFact }) {
    return (
        <div className="grid gap-1 border-b border-[#d9d7d1] py-4 last:border-0 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6">
            <dt className="font-bold text-[var(--navy)]">{fact.label}</dt>
            <dd className="m-0 text-[#4f4f4f]">{fact.value}</dd>
        </div>
    );
}

/** A program page built from the program's Sanity document; sections editors left empty are skipped. */
export default function ProgramPage({ program }: { program: Program }) {
    const { featurePanel, callout, video } = program;
    const galleryImages = (program.gallery ?? []).flatMap((image) => (image.src ? [{ src: image.src, alt: image.alt ?? "" }] : []));
    const hasFeaturePanel = Boolean(featurePanel && (featurePanel.title || hasRichText(featurePanel.body) || featurePanel.image));
    const hasCallout = Boolean(callout && (callout.title || hasRichText(callout.body)));

    return (
        <div className="min-h-screen bg-white font-[var(--sans)] text-[17px] leading-[1.6] text-[var(--charcoal)] md:text-[18px]">
            <main>
                <PageHero
                    breadcrumbs={[{ label: "Home", href: "/" }, { label: "Programs", href: "/programs" }, { label: program.title }]}
                    title={program.title}
                    image={program.heroImage ? { src: program.heroImage, alt: program.heroAlt ?? "", position: program.heroPosition ?? undefined } : undefined}
                >
                    {program.deck}
                </PageHero>

                <div className="mx-auto w-[min(1040px,calc(100%-48px))] py-12 md:py-18">
                    {hasRichText(program.overview) && (
                        <section className="max-w-[820px]">
                            <h2 className="font-[family-name:var(--serif)] text-[30px] font-medium text-[var(--navy)] md:text-[36px]">About the program</h2>
                            <RichText value={program.overview} className="mt-4 space-y-4 text-lg text-[#444] md:text-xl" />
                        </section>
                    )}

                    {hasItems(program.facts) && (
                        <section className="my-10 max-w-[820px] border-t border-[#d9d7d1] pt-8 md:my-14">
                            <h2 className="font-[family-name:var(--serif)] text-[26px] font-medium text-[var(--navy)] md:text-[30px]">Program details</h2>
                            <dl className="mt-4 border-y border-[#d9d7d1]">{program.facts.map((fact) => <Fact fact={fact} key={fact._key} />)}</dl>
                        </section>
                    )}

                    {program.logoImage && (
                        <div className="mb-12 max-w-[440px] border border-[#d9d7d1] bg-white px-7 py-6">
                            <Image className="h-auto w-full" src={program.logoImage} alt={program.logoAlt ?? `${program.title} logo`} width={960} height={360} />
                        </div>
                    )}

                    {program.sections?.map((section) => (
                        <section className="mb-12 max-w-[820px] border-t border-[#d9d7d1] pt-8" key={section._key}>
                            <h2 className="mb-4 font-[family-name:var(--serif)] text-[28px] leading-[1.2] font-medium text-[var(--navy)] md:text-[32px]">{section.title}</h2>
                            {/* lists sit a little further from the paragraphs above them */}
                            {hasRichText(section.body) && <RichText value={section.body} className="space-y-4 text-[#444] [&>ol]:mt-5 [&>ul]:mt-5" />}
                        </section>
                    ))}

                    {featurePanel && hasFeaturePanel && (
                        <section className={`mb-14 grid items-start gap-6 border border-[#d9d7d1] px-6 py-7 md:items-center md:gap-10 md:p-8 ${featurePanel.image ? "sm:grid-cols-[105px_minmax(0,1fr)] md:grid-cols-[190px_minmax(0,1fr)]" : ""}`}>
                            {featurePanel.image && (
                                <div className="flex justify-center">
                                    <Image className="max-h-[180px] w-full object-contain md:max-h-[260px]" src={featurePanel.image} alt={featurePanel.imageAlt ?? ""} width={featurePanel.imageWidth ?? 962} height={featurePanel.imageHeight ?? 1280} />
                                </div>
                            )}
                            <div>
                                {featurePanel.title && <h2 className="font-[family-name:var(--serif)] text-[27px] leading-[1.2] font-medium text-[var(--navy)] md:text-[31px]">{featurePanel.title}</h2>}
                                {hasRichText(featurePanel.body) && <RichText value={featurePanel.body} className="mt-4 space-y-4 text-[#484848]" />}
                                {featurePanel.linkUrl && <a className="mt-5 inline-flex min-h-11 items-center font-bold text-[var(--teal)] underline underline-offset-4" href={featurePanel.linkUrl}>{featurePanel.linkLabel || featurePanel.linkUrl}</a>}
                            </div>
                        </section>
                    )}

                    {hasItems(program.events) && (
                        <section className={optionalSection}>
                            <h2 className={`mb-6 ${sectionHeading}`}>{program.eventsTitle || "Speaker schedule"}</h2>
                            <div className="overflow-x-auto border-y border-[#d9d7d1]">
                                <table className="w-full min-w-[680px] border-collapse text-left">
                                    <thead className="bg-[var(--off-white)] text-sm text-[var(--navy)]"><tr><th className="w-28 px-4 py-3">Date</th><th className="w-52 px-4 py-3">Presenter</th><th className="px-4 py-3">Topic</th></tr></thead>
                                    <tbody>{program.events.map((event) => (
                                        <tr className="border-t border-[#d9d7d1] align-top" key={event._key}>
                                            <td className="px-4 py-4 font-bold text-[var(--teal)]"><time dateTime={event.date}>{formatScheduleDate(event.date)}</time></td>
                                            <td className="px-4 py-4 font-bold text-[var(--navy)]">{event.name}</td>
                                            <td className="px-4 py-4 text-[#444]">{event.detail}{event.note ? <span className="mt-1 block text-sm text-[#666]">{event.note}</span> : null}</td>
                                        </tr>
                                    ))}</tbody>
                                </table>
                            </div>
                        </section>
                    )}

                    {hasItems(program.topics) && (
                        <section className={optionalSection}>
                            <h2 className={`mb-6 ${sectionHeading}`}>{program.topicsTitle || "Discussion topics"}</h2>
                            <div className="border-y border-[#d9d7d1]">
                                {program.topics.map((topic, index) => (
                                    <article className="grid gap-2 border-b border-[#d9d7d1] px-1 py-5 last:border-0 sm:grid-cols-[44px_minmax(0,1fr)]" key={topic._key}>
                                        <span className="font-bold text-[var(--teal)]">{String(index + 1).padStart(2, "0")}</span>
                                        <div>
                                            <h3 className="font-[family-name:var(--serif)] text-[23px] leading-[1.25] font-medium text-[var(--navy)]">{topic.title}</h3>
                                            {hasRichText(topic.description) && <RichText value={topic.description} className="mt-2 space-y-2 text-base text-[#555]" />}
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    )}

                    {hasItems(program.speakerArchive) && (
                        <section className={optionalSection}>
                            <h2 className={`mb-7 ${sectionHeading}`}>{program.speakerArchiveTitle || "Past speakers"}</h2>
                            <div className="flex flex-col gap-10">
                                {program.speakerArchive.map((season) => (
                                    <section key={season._key}>
                                        <h3 className="mb-4 border-b border-[#d9d7d1] pb-2 font-[family-name:var(--serif)] text-[26px] font-medium text-[var(--navy)]">{season.season}</h3>
                                        <div className="divide-y divide-[#d9d7d1]">
                                            {season.speakers?.map((speaker) => (
                                                <article className="grid gap-5 py-5 sm:grid-cols-[90px_minmax(0,1fr)]" key={speaker._key}>
                                                    {speaker.image ? <Image className="h-[112px] w-[90px] object-cover object-top" src={speaker.image} alt={speaker.imageAlt ?? `Portrait of ${speaker.name}`} width={300} height={400} /> : <div className="hidden sm:block" />}
                                                    <div>
                                                        <p className="mb-1 text-sm font-bold text-[var(--teal)]"><time dateTime={speaker.date}>{formatLongDate(speaker.date)}</time></p>
                                                        <h4 className="font-[family-name:var(--serif)] text-[22px] leading-[1.2] font-medium text-[var(--navy)]">{speaker.name}</h4>
                                                        {speaker.role && <p className="mt-1 text-[15px] text-[#555]">{speaker.role}</p>}
                                                        {speaker.topic && <p className="mt-2 text-[15px]"><strong>Topic:</strong> {speaker.topic}</p>}
                                                    </div>
                                                </article>
                                            ))}
                                        </div>
                                    </section>
                                ))}
                            </div>
                        </section>
                    )}

                    {hasItems(program.discussionGroups) && (
                        <section className={optionalSection}>
                            <h2 className={`mb-4 ${sectionHeading}`}>{program.discussionGroupsTitle || "Discussion groups"}</h2>
                            {hasRichText(program.discussionGroupsIntro) && <RichText value={program.discussionGroupsIntro} className="mb-6 max-w-[760px] space-y-4 text-[#555]" />}
                            <div className="divide-y divide-[#d9d7d1] border-y border-[#d9d7d1]">
                                {program.discussionGroups.map((group) => (
                                    <article className="grid gap-2 py-5 md:grid-cols-[220px_minmax(0,1fr)] md:gap-8" key={group._key}>
                                        <div>
                                            <h3 className="font-[family-name:var(--serif)] text-[23px] font-medium text-[var(--navy)]">{group.name}</h3>
                                            {group.time && <strong className="text-[15px] text-[var(--teal)]">{group.time}</strong>}
                                        </div>
                                        <div>
                                            {group.location && <p className="m-0 text-base">{group.location}</p>}
                                            {group.dates && <small className="mt-1 block leading-[1.5] text-[#5d5d5d]">{group.dates}</small>}
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    )}

                    {hasItems(program.cards) && (
                        <section className={optionalSection}>
                            <h2 className={`mb-6 ${sectionHeading}`}>{program.cardsTitle || "Related programs"}</h2>
                            <div className="divide-y divide-[#d9d7d1] border-y border-[#d9d7d1]">
                                {program.cards.map((card) => (
                                    <article className={`grid gap-5 py-6 ${card.image ? "sm:grid-cols-[180px_minmax(0,1fr)]" : ""}`} key={card._key}>
                                        {card.image && <div className="min-h-36 bg-cover bg-center" style={{ backgroundImage: `url(${card.image})` }} role="img" aria-label="" />}
                                        <div>
                                            <h3 className="font-[family-name:var(--serif)] text-[24px] leading-[1.2] font-medium text-[var(--navy)]">{card.title}</h3>
                                            {card.text && <p className="mt-2 text-[#505050]">{card.text}</p>}
                                            {card.href && <Link className="mt-3 inline-block font-bold text-[var(--teal)] underline-offset-4 hover:underline" href={card.href}>View program</Link>}
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    )}

                    {galleryImages.length > 0 && <ProgramGallery images={galleryImages} title={program.galleryTitle || `${program.title} photo gallery`} />}

                    {video?.embedUrl && (
                        <section className={optionalSection}>
                            <h2 className={`mb-6 ${sectionHeading}`}>{video.title || `${program.title} video`}</h2>
                            <div className="aspect-video overflow-hidden bg-black"><iframe className="h-full w-full border-0" src={video.embedUrl} title={video.title || `${program.title} video`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>
                            {hasRichText(video.caption) && <RichText value={video.caption} className="mt-4 max-w-[780px] space-y-4 text-[#555]" />}
                        </section>
                    )}

                    {hasItems(program.sponsors) && (
                        <section className={optionalSection}>
                            <h2 className={`mb-6 ${sectionHeading}`}>{program.sponsorsTitle || "Sponsors"}</h2>
                            <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
                                {program.sponsors.map((group) => (
                                    <section key={group._key}>
                                        <h3 className="border-b border-[#d9d7d1] pb-2 font-[family-name:var(--serif)] text-[23px] font-medium text-[var(--navy)]">{group.level}</h3>
                                        {hasItems(group.names) && <ul className="mt-3 columns-1 list-none p-0 first:md:columns-2">{group.names.map((name, index) => <li className="break-inside-avoid py-1 text-base" key={`${index}-${name}`}>{name}</li>)}</ul>}
                                    </section>
                                ))}
                            </div>
                        </section>
                    )}

                    {callout && hasCallout && (
                        <aside className="mt-14 max-w-[820px] border-t border-[#d9d7d1] bg-[var(--off-white)] p-6 md:mt-18 md:p-7">
                            {callout.title && <h2 className="font-[family-name:var(--serif)] text-[26px] font-medium text-[var(--navy)]">{callout.title}</h2>}
                            {hasRichText(callout.body) && <RichText value={callout.body} className="mt-2 space-y-4" />}
                        </aside>
                    )}

                    <Link className="mt-12 inline-flex min-h-11 items-center font-bold text-[var(--teal)] underline underline-offset-4" href="/programs">Back to all programs</Link>
                </div>
            </main>
        </div>
    );
}
