import { type SchemaTypeDefinition } from 'sanity'
import { eventType } from "./eventType"
import { teamMember } from './teamMember'
import { bookClubMeeting } from './bookClubMeeting'
import { speakerProgram } from './speakerProgram'
import { homePage } from './homePage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventType, speakerProgram, homePage, teamMember, bookClubMeeting],
}
