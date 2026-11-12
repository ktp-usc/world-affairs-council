import {cache} from 'react'
import type {PortableTextBlock} from 'next-sanity'
import type {Event} from '@/lib/site'
import {events as fallbackEvents, isSpeakerSeries} from '@/lib/site'
import type {Program, ProgramEvent, ProgramFactIcon, ProgramSpeakerSeason} from '@/components/programs/program-types'
import {fetchProgram} from '@/components/programs/fetch-programs'
import {client} from '@/sanity/lib/client'
import {SPEAKER_EVENTS_QUERY, SPEAKER_PROGRAM_QUERY} from '@/sanity/lib/queries'

type SpeakerProgramKey = 'distinguished-speaker-series' | 'global-speakers-program'

type SpeakerProgramDocument = {
  programKey: SpeakerProgramKey
  title?: string
  activeSeason?: string
  deck?: string
  overviewHeading?: string
  overview?: string
  heroImageUrl?: string
  heroAlt?: string
  facts?: Array<{_key?: string; label: string; value: string; icon?: ProgramFactIcon}>
  sections?: Array<{_key?: string; eyebrow?: string; title: string; paragraphs?: string[]; bullets?: string[]}>
  archiveHeading?: string
  sponsors?: Array<{_key?: string; level: string; names?: string[]}>
  calloutEyebrow?: string
  calloutTitle?: string
  calloutText?: string
}

type SpeakerEventDocument = {
  _id: string
  series: 'distinguished' | 'global'
  season: string
  speaker: string
  title: string
  role?: string
  slug: string
  date: string
  startTime?: string
  endTime?: string
  venue?: string
  address?: string
  description?: string
  biography?: string
  photoUrl?: string
  registerUrl?: string
}

const defaultSeason = '2026–2027'

export function isManagedSpeakerProgram(slug: string): slug is SpeakerProgramKey {
  return slug === 'distinguished-speaker-series' || slug === 'global-speakers-program'
}

function normalizedSeason(season: string) {
  return season.replace('-', '–').replace(/\s/g, '')
}

function richText(paragraphs: Array<string | undefined>): PortableTextBlock[] {
  return paragraphs.flatMap((paragraph, index) => paragraph?.trim() ? [{
    _type: 'block',
    _key: `paragraph-${index}`,
    style: 'normal',
    markDefs: [],
    children: [{_type: 'span', _key: `span-${index}`, marks: [], text: paragraph}],
  } as PortableTextBlock] : [])
}

const fetchSpeakerDocuments = cache(async (): Promise<SpeakerEventDocument[]> => {
  try {
    return await client.fetch<SpeakerEventDocument[]>(SPEAKER_EVENTS_QUERY, {}, {next: {revalidate: 60}})
  } catch (error) {
    console.error('Unable to load speaker events from Sanity; using the static fallback.', error)
    return []
  }
})

function toWebsiteEvent(event: SpeakerEventDocument): Event {
  return {
    slug: event.slug,
    title: event.title,
    speaker: event.speaker,
    kind: event.series === 'global' ? 'Global Speaker' : 'Speaker Series',
    date: event.date,
    start: event.startTime ?? '10:00 AM',
    end: event.endTime ?? '11:30 AM',
    venue: event.venue ?? 'First Presbyterian Church',
    address: event.address ?? '540 William Hilton Pkwy, Hilton Head Island, SC',
    blurb: event.description ?? event.title,
    bio: event.biography,
    photo: event.photoUrl,
    registerUrl: event.registerUrl,
  }
}

export const getSpeakerEvents = cache(async (): Promise<Event[]> => {
  const documents = await fetchSpeakerDocuments()
  return documents.length ? documents.map(toWebsiteEvent) : fallbackEvents.filter(isSpeakerSeries)
})

export const getSpeakerEvent = cache(async (slug: string): Promise<Event | undefined> => {
  const events = await getSpeakerEvents()
  return events.find((event) => event.slug === slug)
})

function buildSchedule(events: SpeakerEventDocument[], activeSeason: string): ProgramEvent[] {
  return events
    .filter((event) => normalizedSeason(event.season) === normalizedSeason(activeSeason))
    .map((event) => ({
      _key: event._id,
      date: event.date,
      name: event.speaker,
      detail: event.title,
      note: event.series === 'global' ? 'Global Speakers Program' : undefined,
      href: event.registerUrl || `/get-involved/guests/${event.slug}#register`,
    }))
}

function buildGlobalArchive(events: SpeakerEventDocument[]): ProgramSpeakerSeason[] {
  const seasons = new Map<string, NonNullable<ProgramSpeakerSeason['speakers']>>()
  events
    .filter((event) => event.series === 'global')
    .sort((a, b) => b.date.localeCompare(a.date))
    .forEach((event) => {
      const season = normalizedSeason(event.season)
      const speakers = seasons.get(season) ?? []
      speakers.push({_key: event._id, date: event.date, name: event.speaker, role: event.role, topic: event.title, image: event.photoUrl})
      seasons.set(season, speakers)
    })
  return [...seasons.entries()].map(([season, speakers]) => ({_key: season, season, speakers}))
}

/** Overlay the focused speaker editors onto main's generic Program documents. */
export const getSpeakerProgramPage = cache(async (slug: SpeakerProgramKey): Promise<Program | null> => {
  const fallback = await fetchProgram(slug)

  try {
    const [document, speakerEvents] = await Promise.all([
      client.fetch<SpeakerProgramDocument | null>(SPEAKER_PROGRAM_QUERY, {programKey: slug}, {next: {revalidate: 60}}),
      fetchSpeakerDocuments(),
    ])
    if (!document || !fallback) return fallback

    const activeSeason = normalizedSeason(document.activeSeason ?? defaultSeason)
    const program: Program = {
      ...fallback,
      title: slug === 'distinguished-speaker-series'
        ? `${activeSeason.replace('–', '/')} Distinguished Speaker Series`
        : document.title ?? fallback.title,
      deck: document.deck ?? fallback.deck,
      overviewTitle: document.overviewHeading ?? fallback.overviewTitle,
      overview: document.overview ? richText([document.overview]) : fallback.overview,
      heroImage: document.heroImageUrl ?? fallback.heroImage,
      heroAlt: document.heroAlt ?? fallback.heroAlt,
      facts: document.facts?.length ? document.facts.map((fact, index) => ({...fact, _key: fact._key ?? `fact-${index}`})) : fallback.facts,
      sections: document.sections?.length ? document.sections.map((section, index) => ({
        _key: section._key ?? `section-${index}`,
        eyebrow: section.eyebrow,
        title: section.title,
        body: richText([...(section.paragraphs ?? []), ...(section.bullets ?? []).map((bullet) => `• ${bullet}`)]),
      })) : fallback.sections,
      callout: document.calloutTitle || document.calloutText ? {
        eyebrow: document.calloutEyebrow,
        title: document.calloutTitle,
        body: richText([document.calloutText]),
      } : fallback.callout,
    }

    if (slug === 'distinguished-speaker-series') {
      program.events = speakerEvents.length ? buildSchedule(speakerEvents, activeSeason) : fallback.events
      program.eventsTitle = `${activeSeason} speaker schedule`
      program.sponsors = document.sponsors?.length ? document.sponsors.map((group, index) => ({
        _key: group._key ?? `sponsor-${index}`,
        level: group.level,
        names: group.names,
      })) : fallback.sponsors
      program.sponsorsTitle = `${activeSeason} sponsors`
    } else {
      program.speakerArchive = speakerEvents.length ? buildGlobalArchive(speakerEvents) : fallback.speakerArchive
      program.speakerArchiveTitle = document.archiveHeading ?? fallback.speakerArchiveTitle
    }

    return program
  } catch (error) {
    console.error(`Unable to load ${slug} from the focused speaker editor; using the Program document.`, error)
    return fallback
  }
})
