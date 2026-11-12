import type {StructureBuilder} from 'sanity/structure'
import {getInvolvedPageTypes} from './schemaTypes/getInvolvedPages'

// Each Get Involved page is a single document, so each item opens straight into its editor.
export const getInvolvedTypeNames = getInvolvedPageTypes.map((type) => type.name)

/** The Get Involved folder in the Studio sidebar, one item per page in the order of the header menu. */
export const getInvolvedFolder = (S: StructureBuilder) =>
  S.listItem()
    .title('Get Involved')
    .id('getInvolved')
    .child(
      S.list()
        .title('Get Involved')
        .items(getInvolvedPageTypes.map((type) =>
          S.listItem()
            .title(type.title ?? type.name)
            .id(type.name)
            .child(S.document().schemaType(type.name).documentId(type.name).title(type.title ?? type.name)),
        )),
    )
