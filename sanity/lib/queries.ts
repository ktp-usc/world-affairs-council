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

// book club page: meetings that haven't ended yet, soonest first
export const UPCOMING_BOOK_CLUB_MEETINGS_QUERY = defineQuery(`
  *[_type == "bookClubMeeting" && defined(slug.current) && coalesce(endsAt, startsAt) >= now()] | order(startsAt asc) {
    _id, title, author, coverImage, startsAt, endsAt, location, spacesLeft, registerUrl,
    "slug": slug.current
  }
`);

// meeting page: one meeting matched by the slug from the url
export const BOOK_CLUB_MEETING_QUERY = defineQuery(`
  *[_type == "bookClubMeeting" && slug.current == $slug][0] {
    title, author, coverImage, startsAt, endsAt, location, spacesLeft, registerUrl, abstract, aboutTheAuthor
  }
`);

// used at build time to pre-render every meeting page
export const BOOK_CLUB_MEETING_SLUGS_QUERY = defineQuery(`
  *[_type == "bookClubMeeting" && defined(slug.current)] { "slug": slug.current }
`);
