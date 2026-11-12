import {cache} from 'react'
import type {StaticImageData} from 'next/image'
import {reports, waca} from '@/app/about/_data/about-content'
import council from '@/components/ui/images/council.jpg'
import audience from '@/components/ui/images/bk_wac_mem.jpg'
import workshop from '@/components/ui/images/workshop.jpg'
import speaker from '@/components/ui/images/speaker2.jpg'
import podium from '@/components/ui/images/speaker1.jpg'
import {sponsors, wildApricotBaseUrl} from '@/lib/site'
import {client} from '@/sanity/lib/client'
import {HOME_PAGE_QUERY} from '@/sanity/lib/queries'

type HomeImage = StaticImageData | string
export type HomeLink = {label: string; href: string}
export type HomeSlideContent = {label: string; heading: string; text: string; image: HomeImage; imageAlt: string; buttonLabel: string; buttonHref: string}
export type HomeGalleryPhoto = {label: string; image: HomeImage; imageAlt: string}
export type HomeSponsor = {name: string; logo: HomeImage}

export type HomePageContent = {
  heroSlides: HomeSlideContent[]
  programsHeading: string
  programsText: string
  programLinks: HomeLink[]
  allProgramsLabel: string
  allProgramsHref: string
  programGallery: HomeGalleryPhoto[]
  eventsHeading: string
  calendarLinkLabel: string
  calendarLinkHref: string
  eventDetailsLabel: string
  noEventsText: string
  noEventsLinkLabel: string
  aboutHeading: string
  aboutParagraphs: string[]
  missionStatement: string
  aboutImage: HomeImage
  aboutImageAlt: string
  aboutLinks: HomeLink[]
  newsletterHeading: string
  newsletterText: string
  newsletterOpenLabel: string
  newsletterCloseLabel: string
  sponsorsHeading: string
  sponsorsText: string
  sponsors: HomeSponsor[]
}

type HomePageDocument = Omit<HomePageContent, 'heroSlides' | 'programGallery' | 'aboutImage' | 'sponsors'> & {
  heroSlides?: Array<Omit<HomeSlideContent, 'image'> & {imageUrl?: string}>
  programGallery?: Array<Omit<HomeGalleryPhoto, 'image'> & {imageUrl?: string}>
  aboutImageUrl?: string
  sponsors?: Array<Omit<HomeSponsor, 'logo'> & {logoUrl?: string}>
}

export const fallbackHomePage: HomePageContent = {
  heroSlides: [
    {image: council, imageAlt: 'Students and Council members gathered beneath the World Affairs Council banner', label: 'Welcome to the Council', heading: 'Engaging, educating, and inspiring our community.', text: 'Leading voices. Thoughtful neighbors. A better understanding of our interconnected world.', buttonLabel: 'See upcoming events', buttonHref: '#calendar'},
    {image: audience, imageAlt: 'Council members sharing questions and ideas at a community gathering', label: 'Join the Book Club', heading: 'Join the Book Club. Read beyond the headlines.', text: 'Explore world affairs one book at a time. Bring your curiosity and join a welcoming monthly conversation.', buttonLabel: 'Explore the Book Club', buttonHref: '/programs/book-club'},
    {image: speaker, imageAlt: 'A guest speaker sharing perspectives at a Council program', label: 'Become a member', heading: 'Become a member. Bring your curiosity.', text: 'Become a member and connect with people who share your interest in the world, through speakers, discussions, and more.', buttonLabel: 'Become a member', buttonHref: '/get-involved/membership'},
    {image: workshop, imageAlt: 'Local students learning together at an Academic WorldQuest event', label: 'Support the Council', heading: 'Give today. Keep our community learning.', text: 'Your gift supports inspiring speakers, community conversations, and opportunities for local students to engage with the world.', buttonLabel: 'Donate', buttonHref: '/get-involved/give#donation-form'},
    {image: podium, imageAlt: 'A Council speaker presenting in front of the World Affairs Council banner', label: 'Get the newsletter', heading: 'Get the newsletter. Keep the world in view.', text: 'Get Council news and upcoming programs delivered to your inbox, so you never miss a conversation.', buttonLabel: 'Sign up for our newsletter', buttonHref: '#newsletter-signup-panel'},
  ],
  programsHeading: 'Global ideas.\nLocal conversations.',
  programsText: 'From leading speakers to small-group discussions, there’s a place for members, guests, and students to learn together.',
  programLinks: [
    {label: 'Speaker programs', href: '/programs/distinguished-speaker-series'},
    {label: 'Book Club', href: '/programs/book-club'},
    {label: 'Great Decisions', href: '/programs/great-decisions'},
    {label: 'Student programs', href: '/programs/student-programs'},
  ],
  allProgramsLabel: 'View all programs',
  allProgramsHref: '/programs',
  programGallery: [
    {image: podium, imageAlt: 'A guest speaker at the Council podium', label: 'At the podium'},
    {image: audience, imageAlt: 'Council audience members taking part in a question-and-answer session', label: 'Community conversation'},
    {image: speaker, imageAlt: 'A speaker presenting to the Council', label: 'Speaker program'},
    {image: workshop, imageAlt: 'Students working in teams at Academic WorldQuest', label: 'Academic WorldQuest'},
  ],
  eventsHeading: 'Upcoming events',
  calendarLinkLabel: 'View event calendar',
  calendarLinkHref: `${wildApricotBaseUrl}/Calendar`,
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
  aboutImage: audience,
  aboutImageAlt: 'Council members joining a lively question-and-answer session',
  aboutLinks: [
    {label: 'More about the Council', href: '/about'},
    {label: 'Annual report (PDF)', href: reports[0].href},
    {label: 'Our national network', href: waca.href},
  ],
  newsletterHeading: 'Sign up for our email newsletter.',
  newsletterText: 'Upcoming programs, Council news, and conversations worth joining.',
  newsletterOpenLabel: 'Sign Up',
  newsletterCloseLabel: 'Close form',
  sponsorsHeading: 'Our sponsors & supporters',
  sponsorsText: 'Thank you to the organizations that support the World Affairs Council of Hilton Head.',
  sponsors: sponsors.map(({name, logo}) => ({name, logo})),
}

function value<T>(candidate: T | undefined, fallback: T): T {
  return candidate === undefined || candidate === null || candidate === '' ? fallback : candidate
}

export const getHomePage = cache(async (): Promise<HomePageContent> => {
  try {
    const document = await client.fetch<HomePageDocument | null>(HOME_PAGE_QUERY, {}, {next: {revalidate: 60}})
    if (!document) return fallbackHomePage
    return {
      ...fallbackHomePage,
      ...document,
      heroSlides: document.heroSlides?.length ? document.heroSlides.map((slide, index) => ({...slide, image: slide.imageUrl ?? fallbackHomePage.heroSlides[index]?.image ?? council})) : fallbackHomePage.heroSlides,
      programGallery: document.programGallery?.length ? document.programGallery.map((photo, index) => ({...photo, image: photo.imageUrl ?? fallbackHomePage.programGallery[index]?.image ?? podium})) : fallbackHomePage.programGallery,
      aboutImage: value(document.aboutImageUrl, fallbackHomePage.aboutImage),
      sponsors: document.sponsors?.length ? document.sponsors.map((item, index) => ({name: item.name, logo: item.logoUrl ?? fallbackHomePage.sponsors[index]?.logo ?? '/sponsors/sea-pines-real-estate.jpg'})) : fallbackHomePage.sponsors,
    }
  } catch (error) {
    console.error('Unable to load the landing page from Sanity; using the static fallback.', error)
    return fallbackHomePage
  }
})
