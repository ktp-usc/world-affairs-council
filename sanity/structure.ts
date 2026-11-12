import type {StructureResolver} from 'sanity/structure'
import {getInvolvedFolder, getInvolvedTypeNames} from './getInvolvedStructure'

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
      S.listItem().title('About Us').id('aboutPage')
        .child(S.document().schemaType('aboutPage').documentId('aboutPage').title('About Us')),
      getInvolvedFolder(S),
      S.divider(),
      ...S.documentTypeListItems().filter((listItem) => !['headerNavigation', 'aboutPage', ...getInvolvedTypeNames].includes(listItem.getId() ?? '')),
    ])
