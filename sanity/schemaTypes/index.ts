import { aboutPage } from './aboutPage'
import { landingPageTypes } from './landingPage'
import { getInvolvedPageTypes } from './getInvolvedPages'
import { speakerRegistration } from "./speakerRegistration";
import { type SchemaTypeDefinition } from 'sanity'
import { eventType } from "./eventType"
import { teamMember } from './teamMember'
import { speakerSponsorshipSchedule } from './speakerSponsorshipSchedule'
import { bookClubMeeting } from './bookClubMeeting'
import { program } from './program'
import { headerNavigation } from './headerNavigation'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [aboutPage, eventType, teamMember, bookClubMeeting, program, headerNavigation, speakerRegistration, ...getInvolvedPageTypes, ...landingPageTypes],
}
