import { type SchemaTypeDefinition } from 'sanity'
import { eventType } from "./eventType"
import { teamMember } from './teamMember'
import { bookClubMeeting } from './bookClubMeeting'
import { speakerProgram } from './speakerProgram'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventType, speakerProgram, teamMember, bookClubMeeting],
}
