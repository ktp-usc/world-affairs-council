import { speakerRegistration } from "./speakerRegistration";
import { type SchemaTypeDefinition } from 'sanity'
import { eventType } from "./eventType"
import { teamMember } from './teamMember'
import { bookClubMeeting } from './bookClubMeeting'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventType, teamMember, bookClubMeeting, speakerRegistration],
}
