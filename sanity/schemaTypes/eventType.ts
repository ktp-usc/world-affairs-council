import {defineField, defineType} from 'sanity'

const easternTime = /^((0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM))$/i

// A speaker appearance used by the program schedule, guest pages, and homepage.
// The type name remains `event` so existing Studio documents are not orphaned.
export const eventType = defineType({
  name: 'event',
  title: 'Speaker Event',
  type: 'document',
  groups: [
    {name: 'essential', title: 'Event details', default: true},
    {name: 'schedule', title: 'Date & location'},
    {name: 'website', title: 'Website content'},
  ],
  fields: [
    defineField({
      name: 'series',
      title: 'Program',
      type: 'string',
      group: 'essential',
      description: 'Choose where this speaker should appear in Studio and on the website.',
      options: {
        layout: 'radio',
        list: [
          {title: '2026/2027 Distinguished Speaker Series', value: 'distinguished'},
          {title: 'Robert & Lynn Burt Global Speakers Program', value: 'global'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'season',
      title: 'Season',
      type: 'string',
      group: 'essential',
      description: 'For example: 2027–2028. Use the same season shown in the program Page content editor.',
      initialValue: '2026–2027',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'speaker', title: 'Speaker name', type: 'string', group: 'essential', validation: (rule) => rule.required()}),
    defineField({name: 'title', title: 'Presentation topic', type: 'string', group: 'essential', validation: (rule) => rule.required()}),
    defineField({
      name: 'role',
      title: 'Speaker title or role',
      type: 'text',
      rows: 2,
      group: 'essential',
      description: 'Used in the Global Speakers archive and on detailed event pages.',
    }),
    defineField({
      name: 'slug',
      title: 'Event page URL',
      type: 'slug',
      group: 'essential',
      description: 'Click Generate to create the page address from the speaker name.',
      options: {source: 'speaker', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Event date',
      type: 'date',
      group: 'schedule',
      options: {dateFormat: 'MMMM D, YYYY'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startTime',
      title: 'Start time',
      type: 'string',
      group: 'schedule',
      initialValue: '10:00 AM',
      description: 'Use a time such as 10:00 AM.',
      validation: (rule) => rule.required().regex(easternTime, {name: 'time', invert: false}),
    }),
    defineField({
      name: 'endTime',
      title: 'End time',
      type: 'string',
      group: 'schedule',
      initialValue: '11:30 AM',
      description: 'Use a time such as 11:30 AM.',
      validation: (rule) => rule.required().regex(easternTime, {name: 'time', invert: false}),
    }),
    defineField({name: 'venue', title: 'Venue', type: 'string', group: 'schedule', initialValue: 'First Presbyterian Church', validation: (rule) => rule.required()}),
    defineField({name: 'address', title: 'Street address', type: 'string', group: 'schedule', initialValue: '540 William Hilton Pkwy, Hilton Head Island, SC', validation: (rule) => rule.required()}),
    defineField({
      name: 'description',
      title: 'Short event summary',
      type: 'text',
      rows: 3,
      group: 'website',
      description: 'Shown in event lists, search descriptions, and calendar downloads.',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'biography', title: 'Speaker biography', type: 'text', rows: 8, group: 'website', description: 'Leave blank to show the short event summary on the detail page.'}),
    defineField({
      name: 'photo',
      title: 'Speaker photo',
      type: 'image',
      group: 'website',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alternative text', type: 'string'})],
    }),
    defineField({name: 'registerUrl', title: 'Guest registration link', type: 'url', group: 'website', description: 'Leave blank to use the Council’s general events page.', validation: (rule) => rule.uri({scheme: ['http', 'https']})}),
    defineField({name: 'published', title: 'Show on the website', type: 'boolean', group: 'website', initialValue: true, description: 'Turn this off to keep a draft out of website schedules and archives.'}),
  ],
  orderings: [
    {title: 'Event date, soonest first', name: 'dateAsc', by: [{field: 'date', direction: 'asc'}]},
    {title: 'Event date, latest first', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]},
    {title: 'Speaker name', name: 'speakerAsc', by: [{field: 'speaker', direction: 'asc'}]},
  ],
  preview: {
    select: {speaker: 'speaker', topic: 'title', date: 'date', series: 'series', media: 'photo'},
    prepare({speaker, topic, date, series, media}) {
      const eventDate = date ? new Date(`${date}T12:00:00`).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'}) : 'Date not set'
      const program = series === 'global' ? 'Global Speakers' : 'Speaker Series'
      return {title: speaker || topic || 'Untitled speaker', subtitle: `${eventDate} · ${program}${topic ? ` · ${topic}` : ''}`, media}
    },
  },
})
