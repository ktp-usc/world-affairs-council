import { defineArrayMember, defineField, defineType } from 'sanity'

/** Accepts a page on this site ("/about", "/get-involved/guests#events") or a full web, email, or phone link. */
function checkLink(link?: string) {
  if (!link) return true
  if (/^\/(?!\/)\S*$/.test(link)) return true
  if (/^(https?:\/\/\S+|mailto:\S+|tel:\S+)$/i.test(link)) return true
  return 'Use a page on this site like /about, or a full web address starting with https://'
}

const linkDescription = 'Where it goes. A page on this site: /about. Another website: https://...'

// one link inside a tab's dropdown
const dropdownLink = defineArrayMember({
  name: 'dropdownLink',
  title: 'Dropdown link',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Name', type: 'string', description: 'The words shown in the dropdown.', validation: (rule) => rule.required() }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string',
      description: linkDescription,
      validation: (rule) => rule.required().custom(checkLink),
    }),
  ],
  preview: { select: { title: 'label', subtitle: 'link' } },
})

// one tab in the header bar, after the fixed Home tab
const headerTab = defineArrayMember({
  name: 'headerTab',
  title: 'Tab',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Tab name', type: 'string', description: 'The words shown in the header.', validation: (rule) => rule.required() }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string',
      description: `${linkDescription} Optional if the tab has a dropdown.`,
      validation: (rule) =>
        rule.custom((link: string | undefined, context) => {
          const dropdownLinks = (context.parent as { dropdownLinks?: unknown[] } | undefined)?.dropdownLinks
          if (!link && !dropdownLinks?.length) return 'Add a link or some dropdown links.'
          return checkLink(link)
        }),
    }),
    defineField({
      name: 'dropdownLinks',
      title: 'Dropdown links',
      type: 'array',
      description: 'Add links here to make this tab a dropdown. Leave empty for a plain link.',
      of: [dropdownLink],
    }),
  ],
  preview: {
    select: { title: 'label', link: 'link', dropdownLinks: 'dropdownLinks' },
    prepare({ title, link, dropdownLinks }) {
      const dropdownCount = dropdownLinks?.length ?? 0
      return { title, subtitle: dropdownCount ? `Dropdown with ${dropdownCount} link${dropdownCount === 1 ? '' : 's'}` : link }
    },
  },
})

// the site header's menu; there is only one of these documents
export const headerNavigation = defineType({
  name: 'headerNavigation',
  title: 'Header Menu',
  type: 'document',
  fields: [
    defineField({
      name: 'tabs',
      title: 'Tabs',
      type: 'array',
      description:
        'The tabs after Home, in order. Drag to reorder. Home, Donate, and Become a Member always show.',
      of: [headerTab],
      validation: (rule) => [rule.max(7).error('The header fits 7 tabs at most.'), rule.max(5).warning('More than 5 tabs makes the header text a bit smaller on laptops.')],
    }),
  ],
  preview: { prepare: () => ({ title: 'Header Menu' }) },
})
