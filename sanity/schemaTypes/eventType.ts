import { defineField, defineType } from 'sanity'

const timeField = (name: string, title: string) => defineField({
  name, title, type: 'string', description: 'Eastern time, for example 10:00 AM.',
  validation: rule => rule.required().regex(/^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/, { name: 'time such as 10:00 AM' }),
})

export const eventType = defineType({
  name: 'event', title: 'Event', type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: rule => rule.required() }),
    defineField({ name: 'slug', title: 'URL', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: rule => rule.required() }),
    defineField({ name: 'speaker', type: 'string' }),
    defineField({ name: 'kind', title: 'Program type', type: 'string', options: { list: ['Speaker Series', 'Global Speaker', 'Book Club', 'Student'] }, validation: rule => rule.required() }),
    defineField({ name: 'date', type: 'date', validation: rule => rule.required() }),
    timeField('start', 'Start time'),
    timeField('end', 'End time'),
    defineField({ name: 'venue', type: 'string', validation: rule => rule.required() }),
    defineField({ name: 'address', type: 'string', validation: rule => rule.required() }),
    defineField({ name: 'description', title: 'Summary', type: 'text', validation: rule => rule.required() }),
    defineField({ name: 'bio', title: 'Speaker biography', type: 'text' }),
    defineField({ name: 'photo', title: 'Speaker photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'photoPath', title: 'Existing speaker image', type: 'string', readOnly: true, hidden: ({ document }) => !document?.photoPath, description: 'Preserved from the original site. Upload a speaker photo above to replace it.' }),
    defineField({ name: 'registerUrl', title: 'Registration link', type: 'url', validation: rule => rule.uri({ scheme: ['https', 'http'] }) }),
  ],
  orderings: [{ title: 'Date, soonest first', name: 'dateAsc', by: [{ field: 'date', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'date', media: 'photo' } },
})
