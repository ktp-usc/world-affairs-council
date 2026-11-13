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

// Reads both event shapes in Sanity: the original fields (kind, start, end, bio) and the
// speaker-series fields (series, startTime, endTime, biography). The registration link falls back
// to the matching date in the speaker sponsorship schedule.
export const EVENTS_QUERY = defineQuery(`
  *[_type == "event" && defined(slug.current) && defined(date) && coalesce(published, true)
    && defined(coalesce(start, startTime)) && defined(coalesce(end, endTime)) && defined(coalesce(kind, series))]
  | order(date asc, coalesce(start, startTime) asc) {
    "slug": slug.current, title, speaker,
    "kind": coalesce(kind, select(series == "distinguished" => "Speaker Series", series == "global" => "Global Speaker")),
    date, "start": coalesce(start, startTime), "end": coalesce(end, endTime), venue, address,
    "blurb": description, "bio": coalesce(bio, biography), "photo": coalesce(photo.asset->url, photoPath),
    "registerUrl": coalesce(registerUrl, *[_id == "speaker-sponsorship-schedule"][0].presentations[date == ^.date][0].eventUrl)
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

// book club archive: meetings that have already happened, newest first
export const PAST_BOOK_CLUB_MEETINGS_QUERY = defineQuery(`
  *[_type == "bookClubMeeting" && defined(slug.current) && coalesce(endsAt, startsAt) < now()] | order(startsAt desc) {
    _id, title, author, startsAt,
    "slug": slug.current
  }
`);

// programs page: one card per program marked "Show on the Programs page", in card order
export const PROGRAMS_QUERY = defineQuery(`
  *[_type == "program" && defined(slug.current) && showInListing == true] | order(listingOrder asc, title asc) {
    _id,
    "slug": slug.current,
    "title": coalesce(listingTitle, title),
    "text": coalesce(listingText, deck),
    "image": coalesce(listingImage.asset->url, heroImage.asset->url),
    "imageAlt": coalesce(listingImage.alt, heroImage.alt)
  }
`);

// sanity images become plain urls plus alt text, so the page components can keep using next/image with a src string
const PROGRAM_FIELDS = `
  _id, title, eyebrow, deck, overviewTitle, overview, heroPosition,
  "slug": slug.current,
  "overviewText": pt::text(overview),
  "heroImage": heroImage.asset->url,
  "heroAlt": heroImage.alt,
  "logoImage": logoImage.asset->url,
  "logoAlt": logoImage.alt,
  facts[]{ _key, label, value, icon },
  sections[]{ _key, eyebrow, title, body },
  featurePanel{ title, body, linkLabel, linkUrl, "image": image.asset->url, "imageAlt": image.alt, "imageWidth": image.asset->metadata.dimensions.width, "imageHeight": image.asset->metadata.dimensions.height },
  callout{ eyebrow, title, body },
  eventsTitle, events[]{ _key, date, name, detail, note, href },
  topicsTitle, topics[]{ _key, title, description },
  discussionGroupsTitle, discussionGroupsIntro, discussionGroups[]{ _key, name, time, location, dates },
  speakerArchiveTitle, speakerArchive[]{ _key, season, speakers[]{ _key, date, name, role, topic, "image": image.asset->url, "imageAlt": image.alt } },
  cardsTitle, cards[]{ _key, kicker, title, text, href, "image": image.asset->url, "imageAlt": image.alt },
  galleryTitle, gallery[]{ _key, alt, "src": asset->url },
  video{ title, embedUrl, caption },
  quote{ text, attribution },
  testimonial{ text, attribution, "image": image.asset->url, "imageAlt": image.alt },
  sponsorsTitle, sponsors[]{ _key, level, names }
`;

// program page: one program matched by the slug from the url
export const PROGRAM_QUERY = defineQuery(`
  *[_type == "program" && slug.current == $slug][0] {${PROGRAM_FIELDS}}
`);

// used at build time to pre-render every program page
export const PROGRAM_SLUGS_QUERY = defineQuery(`
  *[_type == "program" && defined(slug.current)] { "slug": slug.current }
`);
