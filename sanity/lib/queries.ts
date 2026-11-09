import { defineQuery } from "next-sanity";

export const SPEAKER_SPONSORSHIP_SCHEDULE_QUERY = defineQuery(`
  *[_type == "speakerSponsorshipSchedule" && _id == "speaker-sponsorship-schedule"][0] {
    season,
    "presentations": presentations[] | order(date asc) {
      _key, date, presenter, topic, eventUrl, isGlobalSpeaker
    },
    previousSeasonLabel,
    previousSeasonUrl
  }
`);

export const EVENTS_QUERY = defineQuery(`
  *[_type == "event"] | order(date asc) {
    date,
    title,
    "text" : description
  }
`);

// listing page: every admin that has a slug, sorted by the order field
export const TEAM_MEMBERS_QUERY = defineQuery(`
  *[_type == "teamMember" && defined(slug.current)] | order(order asc, name asc) {
    _id, name, role, photo, category,
    "slug": slug.current
  }
`);

// subpage: one admin matched by the slug from the url
export const TEAM_MEMBER_QUERY = defineQuery(`
  *[_type == "teamMember" && slug.current == $slug][0] {
    name, role, category, photo, bio
  }
`);

// used at build time to pre-render every admin page
export const TEAM_MEMBER_SLUGS_QUERY = defineQuery(`
  *[_type == "teamMember" && defined(slug.current)] { "slug": slug.current }
`);
