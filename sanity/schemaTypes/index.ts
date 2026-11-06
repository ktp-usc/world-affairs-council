import { type SchemaTypeDefinition } from 'sanity'
import { eventType } from "./eventType"
import { teamMember } from './teamMember'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventType, teamMember],
}
