import {createReadStream, existsSync} from 'node:fs'
import {basename, resolve} from 'node:path'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-10-30'})
const root = process.cwd()
const imageCache = new Map<string, {_type: 'image'; asset: {_type: 'reference'; _ref: string}}>()

const key = (label: string, index: number) => `${label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50) || 'item'}-${index}`

async function uploadImage(relativePath: string) {
  const cached = imageCache.get(relativePath)
  if (cached) return cached
  const path = resolve(root, relativePath)
  if (!existsSync(path)) throw new Error(`Missing homepage image: ${relativePath}`)
  const asset = await client.assets.upload('image', createReadStream(path), {filename: basename(path)})
  const image = {_type: 'image' as const, asset: {_type: 'reference' as const, _ref: asset._id}}
  imageCache.set(relativePath, image)
  return image
}

const heroSlides = [
  {imagePath: 'components/ui/images/council.jpg', imageAlt: 'Students and Council members gathered beneath the World Affairs Council banner', label: 'Welcome to the Council', heading: 'Engaging, educating, and inspiring our community.', text: 'Leading voices. Thoughtful neighbors. A better understanding of our interconnected world.', buttonLabel: 'See upcoming events', buttonHref: '#calendar'},
  {imagePath: 'components/ui/images/bk_wac_mem.jpg', imageAlt: 'Council members sharing questions and ideas at a community gathering', label: 'Join the Book Club', heading: 'Join the Book Club. Read beyond the headlines.', text: 'Explore world affairs one book at a time. Bring your curiosity and join a welcoming monthly conversation.', buttonLabel: 'Explore the Book Club', buttonHref: '/programs/book-club'},
  {imagePath: 'components/ui/images/speaker2.jpg', imageAlt: 'A guest speaker sharing perspectives at a Council program', label: 'Become a member', heading: 'Become a member. Bring your curiosity.', text: 'Become a member and connect with people who share your interest in the world, through speakers, discussions, and more.', buttonLabel: 'Become a member', buttonHref: '/get-involved/membership'},
  {imagePath: 'components/ui/images/workshop.jpg', imageAlt: 'Local students learning together at an Academic WorldQuest event', label: 'Support the Council', heading: 'Give today. Keep our community learning.', text: 'Your gift supports inspiring speakers, community conversations, and opportunities for local students to engage with the world.', buttonLabel: 'Donate', buttonHref: '/get-involved/give#donation-form'},
  {imagePath: 'components/ui/images/speaker1.jpg', imageAlt: 'A Council speaker presenting in front of the World Affairs Council banner', label: 'Get the newsletter', heading: 'Get the newsletter. Keep the world in view.', text: 'Get Council news and upcoming programs delivered to your inbox, so you never miss a conversation.', buttonLabel: 'Sign up for our newsletter', buttonHref: '#newsletter-signup-panel'},
]

const gallery = [
  {imagePath: 'components/ui/images/speaker1.jpg', imageAlt: 'A guest speaker at the Council podium', label: 'At the podium'},
  {imagePath: 'components/ui/images/bk_wac_mem.jpg', imageAlt: 'Council audience members taking part in a question-and-answer session', label: 'Community conversation'},
  {imagePath: 'components/ui/images/speaker2.jpg', imageAlt: 'A speaker presenting to the Council', label: 'Speaker program'},
  {imagePath: 'components/ui/images/workshop.jpg', imageAlt: 'Students working in teams at Academic WorldQuest', label: 'Academic WorldQuest'},
]

const sponsorLogos = [
  {name: 'Sea Pines Real Estate', path: 'public/sponsors/sea-pines-real-estate.jpg'},
  {name: 'Brighton Ruckno & Associates', path: 'public/sponsors/ruckno.png'},
  {name: 'Seabrook', path: 'public/sponsors/seabrook.png'},
  {name: 'Community Foundation of the Lowcountry', path: 'public/sponsors/community-foundation.jpg'},
  {name: 'The Westin Hilton Head Island Resort & Spa', path: 'public/sponsors/westin.png'},
  {name: 'TidePointe', path: 'public/sponsors/tidepoint.png'},
  {name: 'Jolley Law Group', path: 'public/sponsors/jolley-law-group.jpg'},
]

async function main() {
  const existing = await client.getDocument('home-page')
  if (existing) {
    console.log('The landing page already exists in Sanity. Nothing was overwritten.')
    return
  }

  console.log('Uploading the current landing-page images…')
  const seededSlides = await Promise.all(heroSlides.map(async ({imagePath, ...slide}, index) => ({...slide, _key: key(slide.label, index), _type: 'homeHeroSlide', image: await uploadImage(imagePath)})))
  const seededGallery = await Promise.all(gallery.map(async ({imagePath, ...photo}, index) => ({...photo, _key: key(photo.label, index), _type: 'homeGalleryPhoto', image: await uploadImage(imagePath)})))
  const seededSponsors = await Promise.all(sponsorLogos.map(async (sponsor, index) => ({_key: key(sponsor.name, index), _type: 'homeSponsor', name: sponsor.name, logo: await uploadImage(sponsor.path)})))
  const links = (items: Array<{label: string; href: string}>) => items.map((item, index) => ({...item, _key: key(item.label, index), _type: 'homeLink'}))

  await client.create({
    _id: 'home-page',
    _type: 'homePage',
    heroSlides: seededSlides,
    programsHeading: 'Global ideas.\nLocal conversations.',
    programsText: 'From leading speakers to small-group discussions, there’s a place for members, guests, and students to learn together.',
    programLinks: links([
      {label: 'Speaker programs', href: '/programs/distinguished-speaker-series'},
      {label: 'Book Club', href: '/programs/book-club'},
      {label: 'Great Decisions', href: '/programs/great-decisions'},
      {label: 'Student programs', href: '/programs/student-programs'},
    ]),
    allProgramsLabel: 'View all programs',
    allProgramsHref: '/programs',
    programGallery: seededGallery,
    eventsHeading: 'Upcoming events',
    calendarLinkLabel: 'View event calendar',
    calendarLinkHref: 'https://wachh.wildapricot.org/Calendar',
    eventDetailsLabel: 'Event details',
    noEventsText: 'New programs will be announced soon.',
    noEventsLinkLabel: 'Sign up for updates',
    aboutHeading: 'Bringing the world to Hilton Head.',
    aboutParagraphs: [
      'The World Affairs Council of Hilton Head is a nonpartisan, 501(c)(3) educational nonprofit connecting the Lowcountry with the world. We bring diplomats, scholars, journalists, and leaders in business and public service to our community to explore the issues shaping international affairs.',
      'Founded in 1981 as the Foreign Affairs Seminar at the Hilton Head Public Library, the Council adopted its current name and joined the World Affairs Councils of America in 2005. Today, more than 1,100 members from Hilton Head Island and Beaufort County bring a wide range of backgrounds and experiences to the conversation.',
      'Our Distinguished Speaker Series and Global Speakers Program offer expert perspectives, while the Book Club and Great Decisions make room for thoughtful discussion. Academic WorldQuest and Model United Nations help local students build their knowledge of global issues. Members, guests, and students all have opportunities to participate.',
      'We take no political positions. Our role is to present informed voices and encourage open inquiry, so you can weigh the ideas for yourself. Through our national network, we also connect members with programs and resources from councils across the country.',
    ],
    missionStatement: 'Our mission is to educate, engage, and inspire our community regarding world affairs.',
    aboutImage: await uploadImage('components/ui/images/bk_wac_mem.jpg'),
    aboutImageAlt: 'Council members joining a lively question-and-answer session',
    aboutLinks: links([
      {label: 'More about the Council', href: '/about'},
      {label: 'Annual report (PDF)', href: 'https://wachh.org/resources/Annual%20Reports/24-25%20WACHH%20Annual%20Report.pdf'},
      {label: 'Our national network', href: 'https://worldaffairscouncils.org/'},
    ]),
    newsletterHeading: 'Sign up for our email newsletter.',
    newsletterText: 'Upcoming programs, Council news, and conversations worth joining.',
    newsletterOpenLabel: 'Sign Up',
    newsletterCloseLabel: 'Close form',
    sponsorsHeading: 'Our sponsors & supporters',
    sponsorsText: 'Thank you to the organizations that support the World Affairs Council of Hilton Head.',
    sponsors: seededSponsors,
  })
  console.log('The landing page is ready to edit in Sanity Studio.')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
