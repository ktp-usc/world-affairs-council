import { defineArrayMember, defineField, defineType, type FieldDefinition } from 'sanity'

// One document per Get Involved page. Layout stays in code; any field left empty shows today's wording.

const emptyNote = 'Leave empty to keep the current wording.'

const altField = defineField({
  name: 'alt', title: 'Photo description', type: 'string',
  description: 'Describe the photo for people who can’t see it.',
  validation: rule => rule.required(),
})

/** A photo with a required description. */
const photo = (name: string, title: string, description?: string, fieldset?: string) => defineField({
  name, title, type: 'image', options: { hotspot: true }, fieldset,
  description: description ?? 'Leave empty to keep the current photo.',
  fields: [altField],
})

const text = (name: string, title: string, description: string, fieldset?: string, rows = 3) =>
  defineField({ name, title, type: 'text', rows, fieldset, description: `${description} ${emptyNote}` })

const line = (name: string, title: string, description: string, fieldset?: string) =>
  defineField({ name, title, type: 'string', fieldset, description: `${description} ${emptyNote}` })

const paragraphs = (name: string, title: string, description: string, fieldset?: string) => defineField({
  name, title, type: 'array', fieldset, of: [defineArrayMember({ type: 'text', rows: 4 })],
  description: `${description} Each item is one paragraph.`,
})

/** A list of short items, each with a heading and a sentence or two. */
const titledList = (name: string, title: string, description: string, fieldset?: string) => defineField({
  name, title, type: 'array', fieldset, description: `${description} Drag to reorder.`,
  of: [defineArrayMember({
    type: 'object', name: 'titledText',
    fields: [
      defineField({ name: 'title', title: 'Heading', type: 'string', validation: rule => rule.required() }),
      defineField({ name: 'text', title: 'Text', type: 'text', rows: 3, validation: rule => rule.required() }),
    ],
    preview: { select: { title: 'title', subtitle: 'text' } },
  })],
})

/** Photos shown with a caption underneath. */
const captionedPhotoFields = [
  defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true }, fields: [altField], validation: rule => rule.required() }),
  defineField({ name: 'caption', title: 'Caption', type: 'text', rows: 2, description: 'The line shown under the photo.', validation: rule => rule.required() }),
]
const captionedPhoto = (name: string, title: string, description: string, fieldset?: string) => defineField({
  name, title, type: 'object', fieldset, fields: captionedPhotoFields,
  description: `${description} Leave empty to keep the current photo and caption.`,
  options: { collapsible: true, collapsed: true },
})
const captionedPhotos = (name: string, title: string, description: string, fieldset?: string) => defineField({
  name, title, type: 'array', fieldset, description,
  of: [defineArrayMember({ type: 'object', name: 'captionedPhoto', fields: captionedPhotoFields, preview: { select: { title: 'caption', media: 'photo' } } })],
})

/** The member quote at the bottom of the page. */
const testimonial = defineField({
  name: 'testimonial', title: 'Member quote', type: 'object', fieldset: 'quote',
  description: 'The quote at the bottom of the page. Leave empty to keep the current one.',
  fields: [
    defineField({ name: 'photo', title: 'Photo of the person', type: 'image', options: { hotspot: true }, validation: rule => rule.required() }),
    defineField({ name: 'name', title: 'Name', type: 'string', validation: rule => rule.required() }),
    defineField({ name: 'role', title: 'Role', type: 'string', description: 'Shown under the name, for example “WACHH Member”.', validation: rule => rule.required() }),
    defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 6, validation: rule => rule.required() }),
  ],
})

/** The navy banner at the top of every page. */
const banner = (heroImage = true): FieldDefinition[] => [
  line('title', 'Page title', 'The large heading in the navy banner.', 'banner'),
  text('intro', 'Banner text', 'The sentence under the page title.', 'banner'),
  ...(heroImage ? [photo('heroImage', 'Banner photo', 'The photo on the right side of the banner. Leave empty to keep the current photo.', 'banner')] : []),
]

const fieldset = (name: string, title: string) => ({ name, title, options: { collapsible: true, collapsed: name !== 'banner' } })
const quoteFieldset = fieldset('quote', 'Member quote')

/** A single page document that opens straight into the editor from Studio > Get Involved. */
const page = (name: string, title: string, fieldsets: ReturnType<typeof fieldset>[], fields: FieldDefinition[]) => defineType({
  name, title, type: 'document', fieldsets, fields,
  preview: { prepare: () => ({ title }) },
})

export const getInvolvedPage = page('getInvolvedPage', 'Get Involved', [fieldset('banner', 'Banner'), fieldset('ways', 'Ways to get involved')], [
  ...banner(),
  line('sectionTitle', 'Section heading', 'The heading above the list of ways to get involved.', 'ways'),
  photo('sectionImage', 'Section photo', 'The wide photo above the list.', 'ways'),
  defineField({
    name: 'ways', title: 'Ways to get involved', type: 'array', fieldset: 'ways',
    description: 'Each row has a heading, a sentence, and a “Learn more” link. Drag to reorder.',
    of: [defineArrayMember({
      type: 'object', name: 'way',
      fields: [
        defineField({ name: 'title', title: 'Heading', type: 'string', validation: rule => rule.required() }),
        defineField({ name: 'text', title: 'Text', type: 'text', rows: 2, validation: rule => rule.required() }),
        defineField({ name: 'link', title: 'Link', type: 'string', description: 'A page on this site, for example /get-involved/volunteer.', validation: rule => rule.required() }),
      ],
      preview: { select: { title: 'title', subtitle: 'link' } },
    })],
  }),
])

export const membershipPage = page('membershipPage', 'Become a Member', [fieldset('banner', 'Banner'), fieldset('info', 'Membership information'), fieldset('benefits', 'Member benefits'), fieldset('join', 'How to join'), quoteFieldset], [
  ...banner(),
  line('infoTitle', 'Section heading', 'The heading of the first section.', 'info'),
  text('infoText', 'Intro text', 'The paragraph under the heading.', 'info', 4),
  titledList('reasons', 'Reasons to join', 'The rows under the intro text.', 'info'),
  line('benefitsTitle', 'Section heading', 'The heading above the benefits table.', 'benefits'),
  defineField({
    name: 'benefits', title: 'Benefits table', type: 'array', fieldset: 'benefits',
    description: 'One row per benefit. Members get every benefit; tick the box if non-members can get it too. Drag to reorder.',
    of: [defineArrayMember({
      type: 'object', name: 'benefit',
      fields: [
        defineField({ name: 'benefit', title: 'Benefit', type: 'text', rows: 2, validation: rule => rule.required() }),
        defineField({ name: 'nonMember', title: 'Also available to non-members', type: 'boolean', initialValue: false }),
      ],
      preview: { select: { title: 'benefit', nonMember: 'nonMember' }, prepare: ({ title, nonMember }) => ({ title, subtitle: nonMember ? 'Members and non-members' : 'Members only' }) },
    })],
  }),
  line('joinTitle', 'Section heading', 'The heading above the two ways to join.', 'join'),
  line('joinOnlineTitle', 'Join online heading', 'The left column heading.', 'join'),
  text('joinOnlineText', 'Join online text', 'The sentence above the online form link.', 'join', 2),
  line('joinByMailTitle', 'Join by mail heading', 'The right column heading.', 'join'),
  text('joinByMailText', 'Join by mail text', 'The sentence above the printable form link.', 'join', 2),
  testimonial,
])

export const guestPage = page('guestPage', 'Be a Guest', [fieldset('banner', 'Banner'), fieldset('attending', 'Attending as a guest')], [
  ...banner(),
  line('sectionTitle', 'Section heading', 'The heading of the first section.', 'attending'),
  photo('sectionImage', 'Section photo', 'The wide photo under the heading.', 'attending'),
  paragraphs('paragraphs', 'Text', 'The paragraphs next to the guest fees. Guest fees and the events list are set elsewhere.', 'attending'),
])

export const volunteerPage = page('volunteerPage', 'Volunteer', [fieldset('banner', 'Banner'), fieldset('opportunities', 'Volunteer opportunities'), fieldset('form', 'Volunteer form'), quoteFieldset], [
  ...banner(),
  line('opportunitiesTitle', 'Section heading', 'The heading of the first section.', 'opportunities'),
  captionedPhotos('photos', 'Photos', 'The photos under the heading, shown side by side.', 'opportunities'),
  text('opportunitiesText', 'Intro text', 'The paragraph under the photos.', 'opportunities', 4),
  defineField({
    name: 'roles', title: 'Volunteer roles', type: 'array', fieldset: 'opportunities',
    description: 'The numbered list of roles. Numbers are added automatically. Drag to reorder.',
    of: [defineArrayMember({
      type: 'object', name: 'role',
      fields: [
        defineField({ name: 'title', title: 'Role', type: 'string', validation: rule => rule.required() }),
        defineField({ name: 'text', title: 'Text', type: 'text', rows: 3, validation: rule => rule.required() }),
        defineField({ name: 'photos', title: 'Photos', type: 'array', description: 'Optional photos shown under this role.', of: [defineArrayMember({ type: 'image', options: { hotspot: true }, fields: [altField] })] }),
      ],
      preview: { select: { title: 'title', subtitle: 'text', media: 'photos.0' } },
    })],
  }),
  line('formTitle', 'Section heading', 'The heading above the volunteer form.', 'form'),
  captionedPhoto('formPhoto', 'Photo', 'The photo next to the form.', 'form'),
  text('formText', 'Text', 'The sentence under the photo.', 'form', 2),
  line('contactEmail', 'Contact email', 'The email address under the text.', 'form'),
  line('contactPhone', 'Contact phone', 'The phone number under the email.', 'form'),
  testimonial,
])

export const givePage = page('givePage', 'Ways to Give', [
  fieldset('banner', 'Banner'), fieldset('check', 'Give by check box'), fieldset('donate', 'Individual donations'), fieldset('heritage', 'Heritage Classic Foundation'),
  fieldset('sponsorship', 'Speaker sponsorships'), fieldset('global', 'Global Speaker Fund'), fieldset('monthly', 'Monthly giving'), fieldset('forms', 'Online donation forms'),
  fieldset('tax', 'Tax-smart giving'), quoteFieldset,
], [
  ...banner(false),
  line('checkTitle', 'Heading', 'The heading of the white box in the banner.', 'check'),
  text('checkText', 'Text before the phone number', 'For example “Contact Tracie Martucci at WACHH at”.', 'check', 2),
  line('checkPhone', 'Phone number', 'Shown as a link people can tap to call.', 'check'),
  text('checkTextAfter', 'Text after the phone number', 'The mailing address is added after this text.', 'check', 2),
  line('donateTitle', 'Section heading', 'The heading of the first section.', 'donate'),
  text('donateIntro', 'Intro text', 'The sentence under the heading.', 'donate', 2),
  titledList('funds', 'Funds', 'The funds listed under the intro.', 'donate'),
  defineField({
    name: 'giftExamples', title: 'What a gift does', type: 'array', fieldset: 'donate',
    description: 'Lines like “$50 supports one high school student…”. The amount is shown in bold.',
    of: [defineArrayMember({
      type: 'object', name: 'giftExample',
      fields: [
        defineField({ name: 'amount', title: 'Amount', type: 'string', description: 'For example $50.', validation: rule => rule.required() }),
        defineField({ name: 'text', title: 'What it does', type: 'string', validation: rule => rule.required() }),
      ],
      preview: { select: { title: 'amount', subtitle: 'text' } },
    })],
  }),
  captionedPhotos('donatePhotos', 'Photos', 'The photos on the right side of this section.', 'donate'),
  line('heritageTitle', 'Section heading', 'The heading of this section.', 'heritage'),
  text('heritageText', 'Intro text before the bold name', 'For example “… Select”.', 'heritage', 2),
  line('heritageBeneficiary', 'Bold name', 'The name people pick from the foundation’s menu, shown in bold.', 'heritage'),
  text('heritageTextAfter', 'Intro text after the bold name', 'The rest of the intro sentence.', 'heritage', 2),
  defineField({
    name: 'heritageOptions', title: 'Giving options', type: 'array', fieldset: 'heritage',
    description: 'Each option links to the Heritage Classic Foundation donation page. Drag to reorder.',
    of: [defineArrayMember({
      type: 'object', name: 'heritageOption',
      fields: [
        defineField({ name: 'title', title: 'Heading', type: 'string', validation: rule => rule.required() }),
        defineField({ name: 'text', title: 'Text', type: 'text', rows: 3, validation: rule => rule.required() }),
        defineField({ name: 'note', title: 'Dates', type: 'string', description: 'The small line under the text, such as when it is open.' }),
        defineField({ name: 'linkLabel', title: 'Link words', type: 'string', validation: rule => rule.required() }),
      ],
      preview: { select: { title: 'title', subtitle: 'note' } },
    })],
  }),
  text('heritageNote', 'Note', 'The sentence under the options.', 'heritage', 2),
  line('sponsorshipTitle', 'Section heading', 'The heading of this section.', 'sponsorship'),
  captionedPhoto('sponsorshipPhoto', 'Photo', 'The wide photo under the heading.', 'sponsorship'),
  paragraphs('sponsorshipParagraphs', 'Text', 'The paragraphs next to the “View sponsorship options” button.', 'sponsorship'),
  line('globalFundTitle', 'Section heading', 'The heading of this section.', 'global'),
  text('globalFundText', 'Text', 'The paragraph above the contribute button.', 'global', 4),
  line('monthlyTitle', 'Section heading', 'The heading of this section.', 'monthly'),
  captionedPhoto('monthlyPhoto', 'Photo', 'The photo on the left.', 'monthly'),
  text('monthlyText', 'Text', 'The paragraph next to the photo.', 'monthly', 4),
  line('formsTitle', 'Section heading', 'The heading above the donation forms. The forms themselves come from Wild Apricot.', 'forms'),
  line('taxTitle', 'Section heading', 'The heading of this section.', 'tax'),
  text('taxIntro', 'Intro text', 'The sentence under the heading.', 'tax', 2),
  titledList('taxOptions', 'Ways to give', 'The two columns under the intro.', 'tax'),
  text('taxNote', 'Note', 'The paragraph under the columns.', 'tax', 3),
  text('taxPartnersIntro', 'Contacts intro', 'The sentence above the contacts.', 'tax', 2),
  defineField({
    name: 'taxPartners', title: 'Contacts', type: 'array', fieldset: 'tax',
    description: 'People members can call to learn more.',
    of: [defineArrayMember({
      type: 'object', name: 'taxPartner',
      fields: [
        defineField({ name: 'name', title: 'Name', type: 'string', validation: rule => rule.required() }),
        defineField({ name: 'role', title: 'Role', type: 'string', validation: rule => rule.required() }),
        defineField({ name: 'phone', title: 'Phone', type: 'string', description: 'For example (843) 476-4772.', validation: rule => rule.required() }),
      ],
      preview: { select: { title: 'name', subtitle: 'role' } },
    })],
  }),
  testimonial,
])

export const sponsorPage = page('sponsorPage', 'Sponsor a Speaker', [fieldset('banner', 'Banner'), fieldset('photo', 'Photo'), fieldset('levels', 'Sponsorship levels'), fieldset('become', 'Become a Sponsor'), quoteFieldset], [
  ...banner(),
  captionedPhoto('featurePhoto', 'Photo', 'The wide photo under the banner.', 'photo'),
  line('levelsTitle', 'Section heading', 'The heading above the levels.', 'levels'),
  defineField({
    name: 'levels', title: 'Levels', type: 'array', fieldset: 'levels',
    description: 'Drag to reorder.',
    of: [defineArrayMember({
      type: 'object', name: 'sponsorshipLevel',
      fields: [
        defineField({ name: 'name', title: 'Name', type: 'string', validation: rule => rule.required() }),
        defineField({ name: 'amount', title: 'Amount ($)', type: 'number', validation: rule => rule.required().integer().positive() }),
        defineField({ name: 'limit', title: 'Limit per speaker', type: 'number', validation: rule => rule.required().integer().positive() }),
        defineField({ name: 'perks', title: 'What sponsors get', type: 'text', rows: 3, validation: rule => rule.required() }),
      ],
      preview: { select: { title: 'name', amount: 'amount' }, prepare: ({ title, amount }) => ({ title, subtitle: amount ? `$${amount}` : '' }) },
    })],
  }),
  line('becomeTitle', 'Section heading', 'The heading above the instructions.', 'become'),
  paragraphs('becomeParagraphs', 'Instructions', 'The paragraphs above the form. The link to the speaker schedule is added after them.', 'become'),
  line('formTitle', 'Form heading', 'The heading above the Wild Apricot form.', 'become'),
  testimonial,
])

export const getInvolvedPageTypes = [getInvolvedPage, membershipPage, guestPage, volunteerPage, givePage, sponsorPage]
