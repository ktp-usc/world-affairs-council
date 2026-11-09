import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Speaker Sponsorship Schedule')
        .id('speaker-sponsorship-schedule')
        .child(S.document()
          .schemaType('speakerSponsorshipSchedule')
          .documentId('speaker-sponsorship-schedule')
          .title('Speaker Sponsorship Schedule')),
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'speakerSponsorshipSchedule'),
    ])
