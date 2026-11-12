import {defineArrayMember, defineField, defineType} from 'sanity'

const link = defineArrayMember({
  name: 'homeLink',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Link text', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'href', title: 'Destination', type: 'string', description: 'Use a site path such as /programs, a section such as #calendar, or a full https:// address.', validation: (rule) => rule.required()}),
  ],
  preview: {select: {title: 'label', subtitle: 'href'}},
})

const heroSlide = defineArrayMember({
  name: 'homeHeroSlide',
  title: 'Hero slide',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Short slide label', type: 'string', description: 'Used by the carousel controls and screen readers.', validation: (rule) => rule.required()}),
    defineField({name: 'heading', title: 'Heading', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'text', title: 'Description', type: 'text', rows: 3, validation: (rule) => rule.required()}),
    defineField({name: 'image', title: 'Photo', type: 'image', options: {hotspot: true}, validation: (rule) => rule.required()}),
    defineField({name: 'imageAlt', title: 'Photo description', type: 'string', description: 'Describe the image for visitors who use screen readers.', validation: (rule) => rule.required()}),
    defineField({name: 'buttonLabel', title: 'Button text', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'buttonHref', title: 'Button destination', type: 'string', validation: (rule) => rule.required()}),
  ],
  preview: {select: {title: 'heading', subtitle: 'label', media: 'image'}},
})

const galleryPhoto = defineArrayMember({
  name: 'homeGalleryPhoto',
  title: 'Program photo',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Short label', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'image', title: 'Photo', type: 'image', options: {hotspot: true}, validation: (rule) => rule.required()}),
    defineField({name: 'imageAlt', title: 'Photo description', type: 'string', validation: (rule) => rule.required()}),
  ],
  preview: {select: {title: 'label', media: 'image'}},
})

const sponsor = defineArrayMember({
  name: 'homeSponsor',
  title: 'Sponsor',
  type: 'object',
  fields: [
    defineField({name: 'name', title: 'Organization name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'logo', title: 'Logo', type: 'image', validation: (rule) => rule.required()}),
  ],
  preview: {select: {title: 'name', media: 'logo'}},
})

export const homePage = defineType({
  name: 'homePage',
  title: 'Landing Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero slides', default: true},
    {name: 'programs', title: 'Programs section'},
    {name: 'events', title: 'Events section'},
    {name: 'about', title: 'About section'},
    {name: 'newsletter', title: 'Newsletter'},
    {name: 'sponsors', title: 'Sponsors'},
  ],
  fields: [
    defineField({name: 'heroSlides', title: 'Hero slides', type: 'array', group: 'hero', description: 'Drag slides to change their order. The first slide uses the main page heading.', of: [heroSlide], validation: (rule) => rule.required().min(1).max(8)}),

    defineField({name: 'programsHeading', title: 'Heading', type: 'text', rows: 2, group: 'programs', description: 'Start a new line where you want the heading to break.', validation: (rule) => rule.required()}),
    defineField({name: 'programsText', title: 'Introduction', type: 'text', rows: 3, group: 'programs', validation: (rule) => rule.required()}),
    defineField({name: 'programLinks', title: 'Featured program links', type: 'array', group: 'programs', of: [link], validation: (rule) => rule.required().min(1)}),
    defineField({name: 'allProgramsLabel', title: 'All programs link text', type: 'string', group: 'programs', validation: (rule) => rule.required()}),
    defineField({name: 'allProgramsHref', title: 'All programs destination', type: 'string', group: 'programs', initialValue: '/programs', validation: (rule) => rule.required()}),
    defineField({name: 'programGallery', title: 'Program photo carousel', type: 'array', group: 'programs', description: 'Drag photos to change their order.', of: [galleryPhoto], validation: (rule) => rule.required().min(1).max(10)}),

    defineField({name: 'eventsHeading', title: 'Heading', type: 'string', group: 'events', validation: (rule) => rule.required()}),
    defineField({name: 'calendarLinkLabel', title: 'Calendar link text', type: 'string', group: 'events', validation: (rule) => rule.required()}),
    defineField({name: 'calendarLinkHref', title: 'Calendar destination', type: 'url', group: 'events', validation: (rule) => rule.required()}),
    defineField({name: 'eventDetailsLabel', title: 'Event card link text', type: 'string', group: 'events', validation: (rule) => rule.required()}),
    defineField({name: 'noEventsText', title: 'Message when no events are scheduled', type: 'string', group: 'events', validation: (rule) => rule.required()}),
    defineField({name: 'noEventsLinkLabel', title: 'No-events link text', type: 'string', group: 'events', validation: (rule) => rule.required()}),

    defineField({name: 'aboutHeading', title: 'Heading', type: 'string', group: 'about', validation: (rule) => rule.required()}),
    defineField({name: 'aboutParagraphs', title: 'Paragraphs', type: 'array', group: 'about', of: [defineArrayMember({type: 'text', rows: 5})], validation: (rule) => rule.required().min(1)}),
    defineField({name: 'missionStatement', title: 'Mission statement beside the photo', type: 'text', rows: 3, group: 'about', validation: (rule) => rule.required()}),
    defineField({name: 'aboutImage', title: 'Photo', type: 'image', group: 'about', options: {hotspot: true}, validation: (rule) => rule.required()}),
    defineField({name: 'aboutImageAlt', title: 'Photo description', type: 'string', group: 'about', validation: (rule) => rule.required()}),
    defineField({name: 'aboutLinks', title: 'About links', type: 'array', group: 'about', of: [link], validation: (rule) => rule.required().min(1)}),

    defineField({name: 'newsletterHeading', title: 'Heading', type: 'string', group: 'newsletter', validation: (rule) => rule.required()}),
    defineField({name: 'newsletterText', title: 'Description', type: 'string', group: 'newsletter', validation: (rule) => rule.required()}),
    defineField({name: 'newsletterOpenLabel', title: 'Open button text', type: 'string', group: 'newsletter', initialValue: 'Sign Up', validation: (rule) => rule.required()}),
    defineField({name: 'newsletterCloseLabel', title: 'Close button text', type: 'string', group: 'newsletter', initialValue: 'Close form', validation: (rule) => rule.required()}),

    defineField({name: 'sponsorsHeading', title: 'Heading', type: 'string', group: 'sponsors', validation: (rule) => rule.required()}),
    defineField({name: 'sponsorsText', title: 'Introduction', type: 'string', group: 'sponsors', validation: (rule) => rule.required()}),
    defineField({name: 'sponsors', title: 'Sponsor logos', type: 'array', group: 'sponsors', description: 'Drag sponsors to change their display order.', of: [sponsor]}),
  ],
  preview: {prepare: () => ({title: 'Landing page', subtitle: 'Homepage content and images'})},
})
