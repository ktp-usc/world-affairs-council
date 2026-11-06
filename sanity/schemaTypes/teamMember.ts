// schemaTypes/administrator.ts
import { defineField, defineType } from 'sanity'

export const teamMember = defineType({
  name: 'Team Member',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      // the "generate" button turns "Jane Doe" into "jane-doe"
      options: { source: 'name', maxLength: 96 },
      // without a slug the page has no url, so make it required
      validation: (r) => r.required(),
    }),
    defineField({ 
        name: 'role', 
        title: 'Role', 
        type: 'string',
        options: {
            list: [
                { title: 'Executive', value: 'executive' },
                { title: 'Director', value: 'director' },
                { title: 'Administrator', value: 'administrator' },
                { title: 'Program Committee Member', value: 'committee' }
            ]
        }
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      // hotspot lets editors choose the focal point when the image gets cropped
      options: { hotspot: true },
    }),
    // rich text for the bio on the subpage
    defineField({ name: 'bio', title: 'Bio', type: 'array', of: [{ type: 'block' }] }),
    // lets editors control the order of cards on the listing page
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
  ],
})