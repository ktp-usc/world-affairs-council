import { defineQuery } from "next-sanity";

export const EVENTS_QUERY = defineQuery(`
  *[_type == "event" && defined(slug.current)] | order(date asc) {
    date,
    title,
    description
  }
`);