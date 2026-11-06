import { defineQuery } from "next-sanity";

export const EVENTS_QUERY = defineQuery(`
  *[_type == "event"] | order(date asc) {
    date,
    title,
    "text" : description
  }
`);

export const TEAM_MEMBERS_QUERY = defineQuery(`
  *[_type == "]
`);