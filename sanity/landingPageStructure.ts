import type {StructureBuilder} from 'sanity/structure'
import defaults from './defaults/landing-page.json'
import {landingPageTypes} from './schemaTypes/landingPage'

export const landingPageTypeNames: string[] = landingPageTypes.map(type => type.name)
export const landingPageFolder = (S: StructureBuilder) => S.listItem().title('Landing Page').id('landingPage').child(
  S.list().title('Landing Page').items([
    ...landingPageTypes.map((type, index) => S.listItem().title(type.title!).id(type.name).child(
      S.document().schemaType(type.name).documentId(`landing-${Object.keys(defaults)[index]}`).title(type.title!),
    )),
    S.listItem().title('Events').id('landingEvents').child(S.documentTypeList('event').title('Events')),
    S.listItem().title('Header Menu (shared)').id('landingHeader').child(S.document().schemaType('headerNavigation').documentId('headerNavigation').title('Header Menu')),
  ]),
)
