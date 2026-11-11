import { type SchemaTypeDefinition } from 'sanity'
import { eventType } from "./eventType"
import { teamMember } from './teamMember'
import { bookClubMeeting } from './bookClubMeeting'
import { program } from './program'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventType, teamMember, bookClubMeeting, program],
}
