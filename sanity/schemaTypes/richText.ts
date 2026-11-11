import { defineArrayMember, defineField } from 'sanity'

// the rich text options editors get in program pages; components/rich-text.tsx renders each of them
export const richTextBlocks = [
  defineArrayMember({
    type: 'block',
    styles: [
      { title: 'Paragraph', value: 'normal' },
      { title: 'Heading', value: 'h3' },
      { title: 'Small heading', value: 'h4' },
      { title: 'Quote', value: 'blockquote' },
    ],
    lists: [
      { title: 'Bullets', value: 'bullet' },
      { title: 'Numbered', value: 'number' },
    ],
    marks: {
      decorators: [
        { title: 'Bold', value: 'strong' },
        { title: 'Italic', value: 'em' },
      ],
      annotations: [
        defineArrayMember({
          name: 'link',
          title: 'Link',
          type: 'object',
          fields: [
            defineField({
              name: 'href',
              title: 'Link address',
              type: 'url',
              description: 'A full address like https://www.fpa.org/, or a page on this site like /programs/model-un.',
              validation: (rule) => rule.required().uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
            }),
          ],
        }),
      ],
    },
  }),
]

/** A rich text field with paragraphs, headings, lists, bold, italic and links. */
export function richTextField(options: { name: string; title: string; description?: string; group?: string; fieldset?: string }) {
  return defineField({ ...options, type: 'array', of: richTextBlocks })
}
