import type {StructureResolver} from 'sanity/structure'

const eventList = (S: Parameters<StructureResolver>[0], title: string, series: 'distinguished' | 'global', templateId: string) =>
  S.documentTypeList('event')
    .title(title)
    .filter('_type == "event" && series == $series')
    .params({series})
    .defaultOrdering([{field: 'date', direction: 'asc'}])
    .initialValueTemplates([S.initialValueTemplateItem(templateId)])

export const structure: StructureResolver = (S) =>
  S.list().title('WACHH Content').items([
    S.listItem().title('Distinguished Speaker Series').child(
      S.list().title('Distinguished Speaker Series').items([
        S.listItem()
          .title('Page content')
          .child(S.document().schemaType('speakerProgram').documentId('speaker-program-distinguished-speaker-series')),
        S.listItem()
          .title('Speaker schedule')
          .child(eventList(S, 'Speaker schedule', 'distinguished', 'distinguished-speaker-event')),
      ]),
    ),
    S.listItem().title('Global Speakers Program').child(
      S.list().title('Robert & Lynn Burt Global Speakers Program').items([
        S.listItem()
          .title('Page content')
          .child(S.document().schemaType('speakerProgram').documentId('speaker-program-global-speakers-program')),
        S.listItem()
          .title('Global speakers table')
          .child(eventList(S, 'Global speakers table', 'global', 'global-speaker-event')),
      ]),
    ),
    S.documentTypeListItem('bookClubMeeting'),
    S.documentTypeListItem('teamMember'),
  ])
