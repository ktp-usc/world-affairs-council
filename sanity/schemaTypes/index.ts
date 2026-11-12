import {type SchemaTypeDefinition} from 'sanity'
import {eventType} from './eventType'
import {teamMember} from './teamMember'
import {bookClubMeeting} from './bookClubMeeting'
import {program} from './program'
import {headerNavigation} from './headerNavigation'
import {speakerRegistration} from './speakerRegistration'
import {speakerProgram} from './speakerProgram'
import {homePage} from './homePage'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    eventType,
    teamMember,
    bookClubMeeting,
    program,
    headerNavigation,
    speakerRegistration,
    speakerProgram,
    homePage,
  ],
}
