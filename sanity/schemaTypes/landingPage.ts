import {defineArrayMember, defineField, defineType, type FieldDefinition} from 'sanity'
import defaults from '../defaults/landing-page.json'

const line = (name: string, title: string) => defineField({name, title, type: 'string', validation: rule => rule.required()})
const text = (name: string, title: string) => defineField({name, title, type: 'text', rows: 3, validation: rule => rule.required()})
const href = (name = 'href', title = 'Destination', required = true) => defineField({
  name, title, type: 'string', description: 'Use /about, #calendar, or a full https:// address.',
  validation: rule => (required ? rule.required() : rule).custom(value =>
    !value || /^(\/(?!\/)\S*|#[^\s]+|https?:\/\/[^\s]+|mailto:[^\s]+|tel:[^\s]+)$/.test(value)
      ? true : 'Enter a site path, section anchor, or full web, email, or phone address.'),
})
const linkFields = [line('label', 'Link text'), href()]
const link = (name: string, title: string) => defineField({name, title, type: 'object', fields: linkFields, validation: rule => rule.required()})
const imageFields = [
  defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}, description: 'Upload a replacement for the current image.'}),
  defineField({name: 'imagePath', title: 'Existing image path', type: 'string', description: 'Preserves the current site image until you upload a replacement.', validation: rule => rule.custom(value => !value || /^\/(?!\/)\S+$/.test(value) ? true : 'Use a local image path beginning with /.')}),
  line('alt', 'Image description'),
]
const photoFields = [...imageFields, line('label', 'Slide name')]
const list = (name: string, title: string, fields: FieldDefinition[], minimum = 0) => defineField({
  name, title, type: 'array', description: 'Drag to reorder. Remove items to remove them from the page.',
  of: [defineArrayMember({name: `${name}Item`, type: 'object', fields,
    validation: rule => rule.custom(value => {
      const item = value as {image?: {asset?: unknown}; imagePath?: string} | undefined
      return fields === photoFields || fields.some(field => field.name === 'image')
        ? item?.image?.asset || item?.imagePath ? true : 'Upload an image or keep an existing image path.'
        : true
    }),
    preview: {select: {title: fields.some(field => field.name === 'name') ? 'name' : 'label', media: 'image'}},
  })],
  validation: rule => minimum ? rule.required().min(minimum) : rule,
})

const section = (key: keyof typeof defaults, title: string, fields: FieldDefinition[]) => defineType({
  name: `landing${key[0].toUpperCase()}${key.slice(1)}`, title, type: 'document',
  initialValue: defaults[key], fields, preview: {prepare: () => ({title})},
})

/** Each landing section opens a single prefilled document inside the Landing Page folder. */
export const landingPageTypes = [
  section('hero', 'Hero slideshow', [line('label', 'Slideshow name'),
    defineField({name: 'interval', title: 'Seconds per slide', type: 'number', validation: rule => rule.required().integer().min(3).max(60)}),
    list('slides', 'Slides', [...photoFields, line('title', 'Heading'), text('body', 'Description'), link('link', 'Button')], 1),
  ]),
  section('programs', 'Programs & photos', [text('title', 'Heading (one line per row)'), text('body', 'Introduction'),
    list('links', 'Program links', linkFields), link('allLink', 'All programs link'), line('galleryLabel', 'Photo slideshow name'), list('photos', 'Photos', photoFields, 1),
  ]),
  section('events', 'Upcoming events', [line('title', 'Heading'), link('calendarLink', 'Calendar link'),
    defineField({name: 'limit', title: 'Number of upcoming events', type: 'number', description: 'Event titles, dates, times, venues, and registration links are edited under Events in this folder.', validation: rule => rule.required().integer().min(1).max(12)}),
    line('detailsLabel', 'Event details link text'), text('emptyText', 'Message when there are no upcoming events'), link('emptyLink', 'Updates link'),
  ]),
  section('about', 'About the Council', [line('title', 'Heading'), ...imageFields, text('mission', 'Mission'),
    defineField({name: 'paragraphs', title: 'Paragraphs', type: 'array', of: [defineArrayMember({type: 'text', rows: 5})]}),
    list('links', 'Links', [...linkFields,
      defineField({name: 'source', title: 'Destination source', type: 'string', options: {list: [{title: 'Use destination above', value: 'custom'}, {title: 'Latest About Us annual report', value: 'annualReport'}, {title: 'About Us national network', value: 'nationalNetwork'}]}, initialValue: 'custom', description: 'Report and network links can follow the shared About Us content automatically.'}),
      defineField({name: 'newTab', title: 'Open in a new tab', type: 'boolean', initialValue: false}),
    ]),
  ]),
  section('newsletter', 'Newsletter signup', [line('title', 'Heading'), text('body', 'Description'), line('openLabel', 'Open button text'), line('closeLabel', 'Close button text'), line('formLabel', 'Form region label'), line('formTitle', 'Embedded form title'),
    defineField({name: 'embedUrl', title: 'Signup form URL', type: 'url', validation: rule => rule.required().uri({scheme: ['https']})}),
  ]),
  section('sponsors', 'Sponsors & supporters', [line('title', 'Heading'), text('body', 'Introduction'),
    list('sponsors', 'Sponsors', [line('name', 'Sponsor name'), ...imageFields, href('href', 'Sponsor website (optional)', false)]),
  ]),
  section('memberShortcut', 'Member shortcut', [defineField({name: 'enabled', title: 'Show member shortcut', type: 'boolean'}), ...linkFields]),
]
