import {defineArrayMember, defineField, defineType} from 'sanity'

export const speakerSponsorshipSchedule = defineType({
  name: 'speakerSponsorshipSchedule',
  title: 'Speaker Sponsorship Schedule',
  type: 'document',
  fields: [
    defineField({
      name: 'season',
      title: 'Season',
      type: 'string',
      description: 'The season shown above the sponsorship table, for example 2026-2027.',
      validation: (rule) => rule.required().regex(/^\d{4}-\d{4}$/, {name: 'YYYY-YYYY season'}),
    }),
    defineField({
      name: 'presentations',
      title: 'Speaker Presentations',
      type: 'array',
      description: 'The website sorts presentations by date. Edit these entries to update the existing Sponsor a Speaker page.',
      validation: (rule) => rule.required().min(1),
      of: [defineArrayMember({
        name: 'speakerPresentation',
        title: 'Speaker Presentation',
        type: 'object',
        fields: [
          defineField({name: 'date', title: 'Date', type: 'date', validation: (rule) => rule.required()}),
          defineField({name: 'presenter', title: 'Presenter', type: 'string', validation: (rule) => rule.required()}),
          defineField({name: 'topic', title: 'Topic', type: 'text', rows: 2, validation: (rule) => rule.required()}),
          defineField({
            name: 'eventUrl',
            title: 'Presentation Details Link',
            type: 'url',
            description: 'Use the permanent Wild Apricot event URL so links continue working when the new website launches.',
            validation: (rule) => rule.uri({scheme: ['https']}),
          }),
          defineField({
            name: 'isGlobalSpeaker',
            title: 'Part of the Global Speakers Program',
            type: 'boolean',
            initialValue: false,
            description: 'Adds the ** marker and Global Speakers Program footnote to this presentation.',
          }),
        ],
        preview: {
          select: {title: 'presenter', date: 'date', topic: 'topic'},
          prepare({title, date, topic}) {
            return {title, subtitle: [date, topic].filter(Boolean).join(' · ')}
          },
        },
      })],
    }),
    defineField({name: 'previousSeasonLabel', title: 'Previous Season Link Text', type: 'string'}),
    defineField({
      name: 'previousSeasonUrl',
      title: 'Previous Season Calendar Link',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['https']}),
    }),
  ],
  preview: {
    select: {season: 'season'},
    prepare({season}) {
      return {title: `${season || 'New season'} Speaker Sponsorship Schedule`}
    },
  },
})
