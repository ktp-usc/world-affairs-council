import { type SchemaTypeDefinition } from 'sanity'
import { eventType } from "./eventType"
import { teamMember } from './teamMember'
import { speakerSponsorshipSchedule } from './speakerSponsorshipSchedule'
import { bookClubMeeting } from './bookClubMeeting'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventType, teamMember, speakerSponsorshipSchedule, bookClubMeeting],
}
