import { defineField, defineType } from 'sanity'

// one book club discussion; it is listed on /programs/book-club and gets its own page at /programs/book-club/<slug>
export const bookClubMeeting = defineType({
  name: 'bookClubMeeting',
  title: 'Book Club Meeting',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Book title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The end of the page address. Click "Generate" to make it from the book title.',
      // the "generate" button turns "The Jackal" into "the-jackal"
      options: { source: 'title', maxLength: 96 },
      // without a slug the meeting has no page, so make it required
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Book cover',
      type: 'image',
      // hotspot lets editors choose the focal point when the image gets cropped
      options: { hotspot: true },
    }),
    defineField({
      name: 'startsAt',
      title: 'When: starts',
      type: 'datetime',
      description: 'Pick the date and start time in Eastern time.',
      options: { timeStep: 15 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endsAt',
      title: 'When: ends',
      type: 'datetime',
      description: 'The meeting drops off the Book Club page after this time.',
      options: { timeStep: 15 },
      validation: (rule) =>
        rule.custom((endsAt, context) => {
          const startsAt = (context.document as { startsAt?: string } | undefined)?.startsAt
          if (!endsAt || !startsAt) return true
          return endsAt > startsAt ? true : 'The end time has to be after the start time.'
        }),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Island Recreation Center Board Room, 20 Wilborn Rd., Hilton Head Island',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'spacesLeft',
      title: 'Spaces left',
      type: 'number',
      description: 'Update this as people register. 0 shows the meeting as full.',
      // registration is limited to 30 people
      initialValue: 30,
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: 'registerUrl',
      title: 'Register link',
      type: 'url',
      description:
        'Paste the link to the registration form so visitors land on it in one click: open the event on wachh.org, click Register, and copy that address, for example https://wachh.org/event-6753988/Registration. Leave it empty until registration opens.',
      validation: (rule) => [
        rule.uri({ scheme: ['http', 'https'] }),
        // warn when the link is the event page instead of its registration form
        rule
          .custom((registerUrl?: string) =>
            registerUrl && /wachh\.org\/event-\d+\/?$/i.test(registerUrl) ? 'This is the event page. Add /Registration to the end so visitors go straight to the form.' : true,
          )
          .warning(),
      ],
    }),
    // rich text so editors can use paragraphs, italics, and links
    defineField({ name: 'abstract', title: 'Abstract', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'aboutTheAuthor', title: 'About the Author', type: 'array', of: [{ type: 'block' }] }),
  ],
  // lets editors sort the list in the studio by meeting date
  orderings: [
    { title: 'Meeting date, soonest first', name: 'startsAtAsc', by: [{ field: 'startsAt', direction: 'asc' }] },
    { title: 'Meeting date, latest first', name: 'startsAtDesc', by: [{ field: 'startsAt', direction: 'desc' }] },
  ],
  // what each meeting looks like in the studio's list: cover, title, then date and author
  preview: {
    select: { title: 'title', author: 'author', startsAt: 'startsAt', media: 'coverImage' },
    prepare({ title, author, startsAt, media }) {
      const meetingDate = startsAt
        ? new Date(startsAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'America/New_York' })
        : 'No date yet'
      return { title, subtitle: [meetingDate, author].filter(Boolean).join(' · '), media }
    },
  },
})
