import {createReadStream, existsSync} from 'node:fs'
import {basename, resolve} from 'node:path'
import {getCliClient} from 'sanity/cli'
import {expandedProgramPages} from '../components/programs/expanded-programs-data'
import {events as legacyWebsiteEvents} from '../lib/site'

const client = getCliClient({apiVersion: '2026-10-30'})
const root = process.cwd()

type ImageReference = {_type: 'image'; asset: {_type: 'reference'; _ref: string}}

const slugify = (value: string) => value
  .toLowerCase()
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')

const key = (value: string, index: number) => `${slugify(value).slice(0, 60) || 'item'}-${index}`

function keyedObjects<T extends Record<string, unknown>>(items: T[] | undefined, label: keyof T): Array<T & {_key: string}> {
  return (items ?? []).map((item, index) => ({...item, _key: key(String(item[label] ?? 'item'), index)}))
}

async function uploadImage(relativePath: string): Promise<ImageReference | undefined> {
  const path = resolve(root, relativePath.replace(/^\//, 'public/'))
  if (!existsSync(path)) {
    console.warn(`Skipping missing image: ${relativePath}`)
    return undefined
  }
  const asset = await client.assets.upload('image', createReadStream(path), {filename: basename(path)})
  return {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}
}

function scheduleDate(label: string) {
  const [monthName, day] = label.split(/\s+/)
  const months: Record<string, number> = {JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6, JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12}
  const month = months[monthName]
  const year = month >= 10 ? 2026 : 2027
  return `${year}-${String(month).padStart(2, '0')}-${day.padStart(2, '0')}`
}

function archiveDate(label: string) {
  const date = new Date(`${label} 12:00:00 UTC`)
  return date.toISOString().slice(0, 10)
}

async function seedProgramPages() {
  const distinguished = expandedProgramPages['distinguished-speaker-series']
  const global = expandedProgramPages['global-speakers-program']

  const pages = [
    {
      _id: 'speaker-program-distinguished-speaker-series',
      source: distinguished,
      overviewHeading: 'About the program',
      detailsHeading: 'Program details',
      activeSeason: '2026–2027',
      sponsorsHeading: '2026–2027 sponsors',
    },
    {
      _id: 'speaker-program-global-speakers-program',
      source: global,
      overviewHeading: 'About the program',
      detailsHeading: 'Program details',
      archiveHeading: 'Past global speakers',
    },
  ]

  for (const page of pages) {
    const heroImage = await uploadImage(page.source.heroImage)
    await client.createIfNotExists({
      _id: page._id,
      _type: 'speakerProgram',
      programKey: page.source.slug,
      title: page.source.title,
      activeSeason: 'activeSeason' in page ? page.activeSeason : undefined,
      deck: page.source.deck,
      overviewHeading: page.overviewHeading,
      overview: page.source.overview,
      heroImage,
      heroAlt: page.source.heroAlt,
      detailsHeading: page.detailsHeading,
      facts: keyedObjects(page.source.facts, 'label'),
      sections: keyedObjects(page.source.sections, 'title'),
      archiveHeading: 'archiveHeading' in page ? page.archiveHeading : undefined,
      sponsorsHeading: 'sponsorsHeading' in page ? page.sponsorsHeading : undefined,
      sponsors: keyedObjects(page.source.sponsors, 'level'),
      calloutEyebrow: page.source.callout.eyebrow,
      calloutTitle: page.source.callout.title,
      calloutText: page.source.callout.text,
    })
  }

  await client
    .patch('speaker-program-distinguished-speaker-series')
    .setIfMissing({activeSeason: '2026–2027'})
    .unset(['eventsHeading'])
    .commit({visibility: 'sync'})
}

async function seedCurrentSchedule() {
  const program = expandedProgramPages['distinguished-speaker-series']
  const legacyBySpeaker = new Map(legacyWebsiteEvents.map((event) => [event.speaker, event]))

  for (const scheduleEvent of program.events ?? []) {
    const date = scheduleDate(scheduleEvent.date)
    const legacy = legacyBySpeaker.get(scheduleEvent.name)
    const localPhoto = legacy?.photo ? await uploadImage(legacy.photo) : undefined
    const series = scheduleEvent.note ? 'global' : 'distinguished'
    const slug = legacy?.slug ?? slugify(scheduleEvent.name)

    await client.createIfNotExists({
      _id: `speaker-event-${date}-${slug}`,
      _type: 'event',
      series,
      season: '2026–2027',
      speaker: scheduleEvent.name,
      title: scheduleEvent.detail,
      slug: {_type: 'slug', current: slug},
      date,
      startTime: legacy?.start ?? '10:00 AM',
      endTime: legacy?.end ?? '11:30 AM',
      venue: legacy?.venue ?? 'First Presbyterian Church',
      address: legacy?.address ?? '540 William Hilton Pkwy, Hilton Head Island, SC',
      description: legacy?.blurb ?? scheduleEvent.detail,
      biography: legacy?.bio,
      photo: localPhoto,
      registerUrl: legacy?.registerUrl,
      published: true,
    })
  }
}

async function seedGlobalArchive() {
  const program = expandedProgramPages['global-speakers-program']
  for (const season of program.speakerArchive ?? []) {
    for (const speaker of season.speakers) {
      const date = archiveDate(speaker.date)
      const slug = `${slugify(speaker.name)}-${date}`
      const photo = speaker.image ? await uploadImage(speaker.image) : undefined
      await client.createIfNotExists({
        _id: `speaker-event-archive-${date}-${slugify(speaker.name)}`,
        _type: 'event',
        series: 'global',
        season: season.season,
        speaker: speaker.name,
        title: speaker.topic,
        role: speaker.role,
        slug: {_type: 'slug', current: slug},
        date,
        startTime: '10:00 AM',
        endTime: '11:30 AM',
        venue: 'First Presbyterian Church',
        address: '540 William Hilton Pkwy, Hilton Head Island, SC',
        description: speaker.topic,
        photo,
        published: true,
      })
    }
  }
}

async function main() {
  const privateCopies = await client.fetch<string[]>(
    '*[_type in ["event", "speakerProgram"]]._id',
  ).then((ids) => ids.filter((id) => id.startsWith('speakerEvent.') || id.startsWith('speakerProgram.')))
  if (privateCopies.length) {
    console.log(`Removing ${privateCopies.length} private migration copies…`)
    let transaction = client.transaction()
    privateCopies.forEach((id) => { transaction = transaction.delete(id) })
    await transaction.commit({visibility: 'sync'})
  }
  console.log('Seeding speaker program page content…')
  await seedProgramPages()
  console.log('Seeding the 2026–2027 Distinguished Speaker Series…')
  await seedCurrentSchedule()
  console.log('Seeding the Global Speakers archive…')
  await seedGlobalArchive()
  console.log('Speaker content is ready in Sanity Studio.')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
