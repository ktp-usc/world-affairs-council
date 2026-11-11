import {cache} from 'react'
import type {Event} from '@/lib/site'
import {events as fallbackEvents, isSpeakerSeries} from '@/lib/site'
import type {ProgramEvent, ProgramPageData, ProgramSpeakerSeason} from '@/components/programs/programs-data'
import {programPages} from '@/components/programs/programs-data'
import {client} from '@/sanity/lib/client'
import {SPEAKER_EVENTS_QUERY, SPEAKER_PROGRAM_QUERY} from '@/sanity/lib/queries'

type SpeakerProgramDocument = {
  programKey: string
  title?: string
  activeSeason?: string
  deck?: string
  overviewHeading?: string
  overview?: string
  heroImageUrl?: string
  heroAlt?: string
  detailsHeading?: string
  facts?: ProgramPageData['facts']
  sections?: ProgramPageData['sections']
  archiveHeading?: string
  sponsorsHeading?: string
  sponsors?: ProgramPageData['sponsors']
  calloutEyebrow?: string
  calloutTitle?: string
  calloutText?: string
}

type SpeakerEventDocument = {
  _id: string
  _updatedAt?: string
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

function normalizedSeason(season: string) {
  return season.replace('-', '–').replace(/\s/g, '')
}

const fetchSpeakerDocuments = cache(async (): Promise<SpeakerEventDocument[]> => {
  try {
    return await client.fetch<SpeakerEventDocument[]>(SPEAKER_EVENTS_QUERY, {}, {next: {revalidate: 60}})
  } catch (error) {
    console.error('Unable to load speaker events from Sanity; using the static fallback.', error)
    return []
  }
})

function fullDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'America/New_York',
  })
}

function tableDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    timeZone: 'America/New_York',
  }).toUpperCase()
}

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
      date: tableDate(event.date),
      name: event.speaker,
      detail: event.title,
      note: event.series === 'global' ? 'Global Speakers Program' : undefined,
    }))
}

function buildGlobalArchive(events: SpeakerEventDocument[]): ProgramSpeakerSeason[] {
  const seasons = new Map<string, ProgramSpeakerSeason['speakers']>()
  events
    .filter((event) => event.series === 'global')
    .sort((a, b) => b.date.localeCompare(a.date))
    .forEach((event) => {
      const season = normalizedSeason(event.season)
      const speakers = seasons.get(season) ?? []
      speakers.push({
        date: fullDate(event.date),
        name: event.speaker,
        role: event.role ?? '',
        topic: event.title,
        image: event.photoUrl,
      })
      seasons.set(season, speakers)
    })
  return [...seasons.entries()].map(([season, speakers]) => ({season, speakers}))
}

export const getProgramPage = cache(async (slug: string): Promise<ProgramPageData | undefined> => {
  const fallback = programPages[slug]
  if (!fallback || (slug !== 'distinguished-speaker-series' && slug !== 'global-speakers-program')) return fallback

  try {
    const [document, speakerEvents] = await Promise.all([
      client.fetch<SpeakerProgramDocument | null>(SPEAKER_PROGRAM_QUERY, {programKey: slug}, {next: {revalidate: 60}}),
      fetchSpeakerDocuments(),
    ])
    if (!document) return fallback

    const activeSeason = normalizedSeason(document.activeSeason ?? defaultSeason)
    const program: ProgramPageData = {
      ...fallback,
      title: slug === 'distinguished-speaker-series'
        ? `${activeSeason.replace('–', '/')} Distinguished Speaker Series`
        : document.title ?? fallback.title,
      deck: document.deck ?? fallback.deck,
      overviewHeading: document.overviewHeading ?? fallback.overviewHeading,
      overview: document.overview ?? fallback.overview,
      heroImage: document.heroImageUrl ?? fallback.heroImage,
      heroAlt: document.heroAlt ?? fallback.heroAlt,
      detailsHeading: document.detailsHeading ?? fallback.detailsHeading,
      facts: document.facts?.length ? document.facts : fallback.facts,
      sections: document.sections?.length ? document.sections : fallback.sections,
      callout: {
        eyebrow: document.calloutEyebrow ?? fallback.callout.eyebrow,
        title: document.calloutTitle ?? fallback.callout.title,
        text: document.calloutText ?? fallback.callout.text,
      },
    }

    if (slug === 'distinguished-speaker-series') {
      program.events = speakerEvents.length ? buildSchedule(speakerEvents, activeSeason) : fallback.events
      program.eventsHeading = `${activeSeason} speaker schedule`
      program.sponsors = document.sponsors?.length ? document.sponsors : fallback.sponsors
      program.sponsorsHeading = `${activeSeason} sponsors`
    } else {
      program.speakerArchive = speakerEvents.length ? buildGlobalArchive(speakerEvents) : fallback.speakerArchive
      program.archiveHeading = document.archiveHeading ?? fallback.archiveHeading
    }

    return program
  } catch (error) {
    console.error(`Unable to load ${slug} from Sanity; using the static fallback.`, error)
    return fallback
  }
})
