import { defineArrayMember, defineField, defineType } from 'sanity'
import { richTextField } from './richText'

/** An image with the alt text screen readers announce. */
function imageWithAlt(options: { name: string; title: string; description?: string; group?: string }) {
  return defineField({
    ...options,
    type: 'image',
    options: { hotspot: true },
    fields: [
      defineField({
        name: 'alt',
        title: 'Alt text',
        type: 'string',
        description: 'Describe the image for people who can’t see it.',
        validation: (rule) => rule.warning().required(),
      }),
    ],
  })
}

const factIcons = [
  { title: 'Calendar', value: 'calendar' },
  { title: 'Location', value: 'location' },
  { title: 'People', value: 'users' },
  { title: 'Book', value: 'book' },
  { title: 'Globe', value: 'globe' },
  { title: 'Award', value: 'award' },
]

/** A short heading for one of the optional sections; the page falls back to a generic heading when empty. */
function sectionHeading(name: string, example: string, group: string, fieldset: string) {
  return defineField({ name, title: 'Section heading', type: 'string', description: `For example “${example}”.`, group, fieldset })
}

// one program page at /programs/<slug>; Book Club and Past Book Club Selections have their own page layouts
export const program = defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
  groups: [
    { name: 'header', title: 'Page header', default: true },
    { name: 'content', title: 'Main content' },
    { name: 'schedule', title: 'Schedules & lists' },
    { name: 'media', title: 'Photos & video' },
    { name: 'extras', title: 'Quotes & sponsors' },
    { name: 'listing', title: 'Programs page card' },
  ],
  fieldsets: [
    { name: 'events', title: 'Speaker schedule', options: { collapsible: true, collapsed: false } },
    { name: 'topics', title: 'Discussion topics', options: { collapsible: true, collapsed: false } },
    { name: 'groups', title: 'Discussion groups', options: { collapsible: true, collapsed: false } },
    { name: 'archive', title: 'Past speakers', options: { collapsible: true, collapsed: false } },
    { name: 'cards', title: 'Related program cards', options: { collapsible: true, collapsed: false } },
    { name: 'gallery', title: 'Photo gallery', options: { collapsible: true, collapsed: false } },
    { name: 'sponsors', title: 'Sponsors', options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    // page header
    defineField({
      name: 'title',
      title: 'Program name',
      type: 'string',
      description: 'The large heading at the top of the page.',
      group: 'header',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      description: 'wachh.org/programs/... Changing this breaks existing links to the page.',
      group: 'header',
      // the "generate" button turns "Model United Nations" into "model-united-nations"
      options: { source: 'title', maxLength: 96 },
      // the default check already rejects a slug another program uses
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Category label',
      type: 'string',
      description: 'A short label for the program’s category, like “Discussion programs”.',
      group: 'header',
    }),
    defineField({
      name: 'deck',
      title: 'Summary',
      type: 'text',
      rows: 2,
      description: 'One sentence under the heading. Search engines show it too.',
      group: 'header',
    }),
    imageWithAlt({ name: 'heroImage', title: 'Header photo', group: 'header' }),
    defineField({
      name: 'heroPosition',
      title: 'Header photo focus',
      type: 'string',
      description: 'Which part of the photo to keep in view when it gets cropped.',
      group: 'header',
      options: { list: ['left', 'center', 'right'], layout: 'radio', direction: 'horizontal' },
    }),

    // main content
    defineField({
      name: 'overviewTitle',
      title: 'Overview heading',
      type: 'string',
      description: 'A short tagline for the overview.',
      group: 'content',
    }),
    richTextField({ name: 'overview', title: 'About the program', description: 'The opening paragraph under “About the program”.', group: 'content' }),
    defineField({
      name: 'facts',
      title: 'Program details',
      type: 'array',
      description: 'The When / Where / Format list.',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'programFact',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', description: 'For example “Venue”.', validation: (rule) => rule.required() }),
            defineField({ name: 'value', title: 'Value', type: 'string', description: 'For example “First Presbyterian Church”.', validation: (rule) => rule.required() }),
            defineField({ name: 'icon', title: 'Icon', type: 'string', options: { list: factIcons } }),
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        }),
      ],
    }),
    imageWithAlt({ name: 'logoImage', title: 'Program logo', description: 'Shown above the main sections.', group: 'content' }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'programSection',
          fields: [
            defineField({ name: 'eyebrow', title: 'Label', type: 'string', description: 'A short label like “History”.' }),
            defineField({ name: 'title', title: 'Heading', type: 'string', validation: (rule) => rule.required() }),
            richTextField({ name: 'body', title: 'Text' }),
          ],
          preview: { select: { title: 'title', subtitle: 'eyebrow' } },
        }),
      ],
    }),
    defineField({
      name: 'featurePanel',
      title: 'Feature panel',
      type: 'object',
      description: 'An optional boxed panel with an image and a link, shown after the sections. Great Decisions uses it for the Briefing Book.',
      group: 'content',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'title', title: 'Heading', type: 'string' }),
        richTextField({ name: 'body', title: 'Text' }),
        imageWithAlt({ name: 'image', title: 'Image' }),
        defineField({ name: 'linkLabel', title: 'Link text', type: 'string' }),
        defineField({ name: 'linkUrl', title: 'Link address', type: 'url', validation: (rule) => rule.uri({ allowRelative: true, scheme: ['http', 'https'] }) }),
      ],
    }),
    defineField({
      name: 'callout',
      title: 'Closing callout',
      type: 'object',
      description: 'The shaded box near the end of the page.',
      group: 'content',
      fields: [
        defineField({ name: 'eyebrow', title: 'Label', type: 'string' }),
        defineField({ name: 'title', title: 'Heading', type: 'string' }),
        richTextField({ name: 'body', title: 'Text' }),
      ],
    }),

    // schedules and lists
    sectionHeading('eventsTitle', '2026–2027 speaker schedule', 'schedule', 'events'),
    defineField({
      name: 'events',
      title: 'Speakers',
      type: 'array',
      group: 'schedule',
      fieldset: 'events',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'programEvent',
          fields: [
            defineField({ name: 'date', title: 'Date', type: 'date', validation: (rule) => rule.required() }),
            defineField({ name: 'name', title: 'Speaker', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'detail', title: 'Topic', type: 'string' }),
            defineField({ name: 'note', title: 'Note', type: 'string', description: 'Small text under the topic, like “Global Speakers Program”.' }),
          ],
          preview: { select: { title: 'name', subtitle: 'date' } },
        }),
      ],
    }),
    sectionHeading('topicsTitle', '2027 discussion topics', 'schedule', 'topics'),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      group: 'schedule',
      fieldset: 'topics',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'programTopic',
          fields: [
            defineField({ name: 'title', title: 'Topic', type: 'string', validation: (rule) => rule.required() }),
            richTextField({ name: 'description', title: 'Description' }),
          ],
          preview: { select: { title: 'title' } },
        }),
      ],
    }),
    sectionHeading('discussionGroupsTitle', 'Discussion groups', 'schedule', 'groups'),
    richTextField({ name: 'discussionGroupsIntro', title: 'Introduction', group: 'schedule', fieldset: 'groups' }),
    defineField({
      name: 'discussionGroups',
      title: 'Groups',
      type: 'array',
      group: 'schedule',
      fieldset: 'groups',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'programGroup',
          fields: [
            defineField({ name: 'name', title: 'Group name', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'time', title: 'Day and time', type: 'string', description: 'For example “Tuesdays, 10:00–11:30 AM”.' }),
            defineField({ name: 'location', title: 'Location', type: 'string' }),
            defineField({ name: 'dates', title: 'Meeting dates', type: 'string', description: 'For example “February 3, 10, 17, 24 · March 3, 10”.' }),
          ],
          preview: { select: { title: 'name', subtitle: 'time' } },
        }),
      ],
    }),
    sectionHeading('speakerArchiveTitle', 'Past global speakers', 'schedule', 'archive'),
    defineField({
      name: 'speakerArchive',
      title: 'Seasons',
      type: 'array',
      group: 'schedule',
      fieldset: 'archive',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'programSpeakerSeason',
          fields: [
            defineField({ name: 'season', title: 'Season', type: 'string', description: 'For example “2025–2026”.', validation: (rule) => rule.required() }),
            defineField({
              name: 'speakers',
              title: 'Speakers',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'programSpeaker',
                  fields: [
                    defineField({ name: 'date', title: 'Date', type: 'date', validation: (rule) => rule.required() }),
                    defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
                    defineField({ name: 'role', title: 'Role', type: 'text', rows: 2 }),
                    defineField({ name: 'topic', title: 'Topic', type: 'string' }),
                    imageWithAlt({ name: 'image', title: 'Portrait' }),
                  ],
                  preview: { select: { title: 'name', subtitle: 'date', media: 'image' } },
                }),
              ],
            }),
          ],
          preview: {
            select: { title: 'season', speakers: 'speakers' },
            prepare: ({ title, speakers }) => ({ title, subtitle: `${speakers?.length ?? 0} speakers` }),
          },
        }),
      ],
    }),
    sectionHeading('cardsTitle', 'Student programs', 'schedule', 'cards'),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      group: 'schedule',
      fieldset: 'cards',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'programCard',
          fields: [
            defineField({ name: 'kicker', title: 'Label', type: 'string' }),
            defineField({ name: 'title', title: 'Heading', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'text', title: 'Text', type: 'text', rows: 2 }),
            defineField({
              name: 'href',
              title: 'Link',
              type: 'url',
              description: 'A page on this site like /programs/model-un, or a full address.',
              validation: (rule) => rule.uri({ allowRelative: true, scheme: ['http', 'https'] }),
            }),
            imageWithAlt({ name: 'image', title: 'Image' }),
          ],
          preview: { select: { title: 'title', subtitle: 'kicker', media: 'image' } },
        }),
      ],
    }),

    // photos and video
    sectionHeading('galleryTitle', '2025 Academic WorldQuest photo gallery', 'media', 'gallery'),
    defineField({
      name: 'gallery',
      title: 'Photos',
      type: 'array',
      group: 'media',
      fieldset: 'gallery',
      options: { layout: 'grid' },
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string', validation: (rule) => rule.warning().required() })],
        }),
      ],
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'object',
      group: 'media',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'title', title: 'Heading', type: 'string' }),
        defineField({
          name: 'embedUrl',
          title: 'Embed address',
          type: 'url',
          description: 'On YouTube, click Share, then Embed, and copy the address inside src="…", like https://www.youtube-nocookie.com/embed/sCmFRlyLXog.',
        }),
        richTextField({ name: 'caption', title: 'Caption' }),
      ],
    }),

    // quotes and sponsors
    defineField({
      name: 'quote',
      title: 'Participant quote',
      type: 'object',
      group: 'extras',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'text', title: 'Quote', type: 'text', rows: 3 }),
        defineField({ name: 'attribution', title: 'Who said it', type: 'string' }),
      ],
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      group: 'extras',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'text', title: 'Quote', type: 'text', rows: 3 }),
        defineField({ name: 'attribution', title: 'Who said it', type: 'string' }),
        imageWithAlt({ name: 'image', title: 'Photo' }),
      ],
    }),
    sectionHeading('sponsorsTitle', '2026–2027 sponsors', 'extras', 'sponsors'),
    defineField({
      name: 'sponsors',
      title: 'Sponsor levels',
      type: 'array',
      group: 'extras',
      fieldset: 'sponsors',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'programSponsorLevel',
          fields: [
            defineField({ name: 'level', title: 'Level', type: 'string', description: 'For example “Ambassador Level 2026–2027”.', validation: (rule) => rule.required() }),
            defineField({ name: 'names', title: 'Sponsors', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
          ],
          preview: {
            select: { title: 'level', names: 'names' },
            prepare: ({ title, names }) => ({ title, subtitle: `${names?.length ?? 0} sponsors` }),
          },
        }),
      ],
    }),

    // card on the /programs page
    defineField({
      name: 'showInListing',
      title: 'Show on the Programs page',
      type: 'boolean',
      description: 'Adds a card for this program to wachh.org/programs.',
      group: 'listing',
      initialValue: false,
    }),
    defineField({
      name: 'listingOrder',
      title: 'Card order',
      type: 'number',
      description: 'Lower numbers come first.',
      group: 'listing',
      hidden: ({ document }) => !document?.showInListing,
    }),
    defineField({
      name: 'listingTitle',
      title: 'Card heading',
      type: 'string',
      description: 'Leave empty to use the program name.',
      group: 'listing',
      hidden: ({ document }) => !document?.showInListing,
    }),
    defineField({
      name: 'listingText',
      title: 'Card text',
      type: 'text',
      rows: 2,
      group: 'listing',
      hidden: ({ document }) => !document?.showInListing,
    }),
    imageWithAlt({ name: 'listingImage', title: 'Card image', description: 'Leave empty to use the header photo.', group: 'listing' }),
  ],
  orderings: [{ title: 'Programs page order', name: 'listingOrderAsc', by: [{ field: 'listingOrder', direction: 'asc' }, { field: 'title', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', slug: 'slug.current', media: 'heroImage' },
    prepare: ({ title, slug, media }) => ({ title, subtitle: slug ? `/programs/${slug}` : 'No URL yet', media }),
  },
})
