import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // the header menu is a single document, so it opens straight into the editor
      S.listItem()
        .title('Header Menu')
        .id('headerNavigation')
        .child(S.document().schemaType('headerNavigation').documentId('headerNavigation').title('Header Menu')),
      S.divider(),
      ...S.documentTypeListItems().filter((listItem) => listItem.getId() !== 'headerNavigation'),
    ])
