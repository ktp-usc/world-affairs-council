import { type SchemaTypeDefinition } from 'sanity'
import { eventType } from "./eventType"
import { teamMember } from './teamMember'
import { speakerSponsorshipSchedule } from './speakerSponsorshipSchedule'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventType, teamMember, speakerSponsorshipSchedule],
import { bookClubMeeting } from './bookClubMeeting'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventType, teamMember, bookClubMeeting],
}
