import {defineArrayMember, defineField, defineType} from 'sanity'

const fact = defineArrayMember({
  name: 'programFact',
  title: 'Program detail',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'value', title: 'Information', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'icon', title: 'Icon', type: 'string', options: {list: ['calendar', 'location', 'users', 'book', 'globe', 'award']}, initialValue: 'calendar', validation: (rule) => rule.required()}),
  ],
  preview: {select: {title: 'label', subtitle: 'value'}},
})

const contentSection = defineArrayMember({
  name: 'programContentSection',
  title: 'Text section',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Small label', type: 'string'}),
    defineField({name: 'title', title: 'Heading', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'paragraphs', title: 'Paragraphs', type: 'array', of: [defineArrayMember({type: 'text', rows: 4})], validation: (rule) => rule.min(1)}),
    defineField({name: 'bullets', title: 'Optional bullet points', type: 'array', of: [defineArrayMember({type: 'string'})]}),
  ],
  preview: {select: {title: 'title', subtitle: 'eyebrow'}},
})

const sponsorGroup = defineArrayMember({
  name: 'sponsorGroup',
  title: 'Sponsor level',
  type: 'object',
  fields: [
    defineField({name: 'level', title: 'Level heading', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'names', title: 'Sponsor names', type: 'array', of: [defineArrayMember({type: 'string'})]}),
  ],
  preview: {select: {title: 'level'}},
})

// Exactly two singleton documents hold page copy for the requested speaker programs.
export const speakerProgram = defineType({
  name: 'speakerProgram',
  title: 'Speaker Program Page',
  type: 'document',
  groups: [
    {name: 'header', title: 'Header & overview', default: true},
    {name: 'details', title: 'Program details'},
    {name: 'sections', title: 'Page sections'},
    {name: 'closing', title: 'Sponsors & closing'},
  ],
  fields: [
    defineField({
      name: 'programKey',
      title: 'Program',
      type: 'string',
      group: 'header',
      readOnly: true,
      options: {list: [
        {title: '2026/2027 Distinguished Speaker Series', value: 'distinguished-speaker-series'},
        {title: 'Robert & Lynn Burt Global Speakers Program', value: 'global-speakers-program'},
      ]},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Page title',
      type: 'string',
      group: 'header',
      description: 'For the Distinguished Speaker Series, this is generated automatically from the active season.',
      readOnly: ({document}) => document?.programKey === 'distinguished-speaker-series',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'activeSeason',
      title: 'Active season',
      type: 'string',
      group: 'header',
      description: 'Controls the page title and which events appear in the schedule. Example: 2027–2028.',
      hidden: ({document}) => document?.programKey !== 'distinguished-speaker-series',
      validation: (rule) => rule.custom((value, context) => {
        if (context.document?.programKey !== 'distinguished-speaker-series') return true
        if (!value) return 'Enter the season that should appear on the page.'
        return /^\d{4}[–-]\d{4}$/.test(value) ? true : 'Use a season such as 2027–2028.'
      }),
    }),
    defineField({name: 'deck', title: 'Header description', type: 'text', rows: 3, group: 'header', validation: (rule) => rule.required()}),
    defineField({name: 'overviewHeading', title: 'Overview heading', type: 'string', group: 'header', initialValue: 'About the program'}),
    defineField({name: 'overview', title: 'Overview text', type: 'text', rows: 5, group: 'header', validation: (rule) => rule.required()}),
    defineField({name: 'heroImage', title: 'Banner image', type: 'image', group: 'header', options: {hotspot: true}}),
    defineField({name: 'heroAlt', title: 'Banner image description', type: 'string', group: 'header'}),
    defineField({name: 'detailsHeading', title: 'Program details heading', type: 'string', group: 'details', initialValue: 'Program details'}),
    defineField({name: 'facts', title: 'Program details rows', type: 'array', group: 'details', of: [fact], validation: (rule) => rule.min(1)}),
    defineField({name: 'sections', title: 'Editable text sections', type: 'array', group: 'sections', of: [contentSection]}),
    defineField({name: 'archiveHeading', title: 'Global speaker archive heading', type: 'string', group: 'sections'}),
    defineField({name: 'sponsorsHeading', title: 'Sponsors heading', type: 'string', group: 'closing'}),
    defineField({name: 'sponsors', title: 'Sponsor groups', type: 'array', group: 'closing', of: [sponsorGroup]}),
    defineField({name: 'calloutEyebrow', title: 'Closing label', type: 'string', group: 'closing'}),
    defineField({name: 'calloutTitle', title: 'Closing heading', type: 'string', group: 'closing', validation: (rule) => rule.required()}),
    defineField({name: 'calloutText', title: 'Closing text', type: 'text', rows: 3, group: 'closing', validation: (rule) => rule.required()}),
  ],
  preview: {
    select: {title: 'title', programKey: 'programKey', activeSeason: 'activeSeason', media: 'heroImage'},
    prepare({title, programKey, activeSeason, media}) {
      const displayTitle = programKey === 'distinguished-speaker-series' && activeSeason
        ? `${String(activeSeason).replace('–', '/')} Distinguished Speaker Series`
        : title
      return {title: displayTitle || 'Speaker program page', subtitle: programKey, media}
    },
  },
})
