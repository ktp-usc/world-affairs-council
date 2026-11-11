import { type SchemaTypeDefinition } from 'sanity'
import { eventType } from "./eventType"
import { teamMember } from './teamMember'
import { bookClubMeeting } from './bookClubMeeting'
import { headerNavigation } from './headerNavigation'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventType, teamMember, bookClubMeeting, headerNavigation],
}
