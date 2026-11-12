import { defineArrayMember, defineField, defineType } from 'sanity'

const paragraphs = (name: string, title: string) => defineField({ name, title, type: 'array', of: [{ type: 'text' }] })
const photo = (name: string, title: string) => defineField({
  name, title, type: 'image', options: { hotspot: true },
  fields: [defineField({ name: 'alt', title: 'Image description', type: 'string', validation: rule => rule.required() })],
})

export const aboutPage = defineType({
  name: 'aboutPage', title: 'About Us', type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'About Us', validation: rule => rule.required() }),
    defineField({ name: 'tagline', type: 'text' }),
    photo('heroImage', 'Hero image'),
    defineField({ name: 'mission', type: 'text' }),
    paragraphs('whoWeAre', 'Who we are'),
    paragraphs('origins', 'Our origins'),
    photo('originsImage', 'Origins image'),
    defineField({ name: 'wacaTitle', title: 'National network heading', type: 'string' }),
    paragraphs('wacaParagraphs', 'National network paragraphs'),
    defineField({ name: 'wacaHref', title: 'National network link', type: 'url', validation: rule => rule.uri({ scheme: ['https', 'http'] }) }),
    defineField({ name: 'wacaLinkLabel', title: 'National network link label', type: 'string' }),
    photo('networkImage', 'National network image'),
    defineField({ name: 'stats', title: 'Statistics', type: 'array', of: [defineArrayMember({
      type: 'object', name: 'stat', fields: [
        defineField({ name: 'value', type: 'string', validation: rule => rule.required() }),
        defineField({ name: 'label', type: 'string', validation: rule => rule.required() }),
      ],
    })] }),
    defineField({ name: 'reportsTitle', title: 'Annual reports heading', type: 'string' }),
    defineField({ name: 'reportsIntro', title: 'Annual reports introduction', type: 'text' }),
    defineField({ name: 'reports', type: 'array', of: [defineArrayMember({
      type: 'object', name: 'report', fields: [
        defineField({ name: 'year', type: 'string', validation: rule => rule.required() }),
        defineField({ name: 'label', type: 'string', initialValue: 'Annual Report', validation: rule => rule.required() }),
        defineField({ name: 'file', title: 'Upload PDF', type: 'file', options: { accept: 'application/pdf' } }),
        defineField({ name: 'href', title: 'Or link to an existing PDF', type: 'url', validation: rule => rule.uri({ scheme: ['https', 'http'] }) }),
      ], validation: rule => rule.custom(value => value?.file || value?.href ? true : 'Upload a PDF or add its link.'),
    })] }),
    defineField({ name: 'historyTitle', title: 'History heading', type: 'string' }),
    defineField({ name: 'milestones', title: 'History timeline', type: 'array', of: [defineArrayMember({
      type: 'object', name: 'milestone', fields: [
        defineField({ name: 'year', type: 'string', validation: rule => rule.required() }),
        defineField({ name: 'text', type: 'text', validation: rule => rule.required() }),
      ], preview: { select: { title: 'year', subtitle: 'text' } },
    })] }),
  ],
  preview: { prepare: () => ({ title: 'About Us' }) },
})
