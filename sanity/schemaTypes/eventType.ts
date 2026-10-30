import {defineField, defineType} from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'date',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: "title",
        type: "string",
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: "description",
        type: "string",
        validation: (rule) => rule.required(),
    }),
  ],
})