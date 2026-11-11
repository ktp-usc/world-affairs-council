import { defineQuery } from "next-sanity";

export const EVENTS_QUERY = defineQuery(`
  *[_type == "event"] | order(date asc) {
    date,
    title,
    "text" : description
  }
`);

export const SPEAKER_PROGRAM_QUERY = defineQuery(`
  *[_type == "speakerProgram" && programKey == $programKey][0] {
    programKey, title, activeSeason, deck, overviewHeading, overview,
    "heroImageUrl": heroImage.asset->url,
    heroAlt, detailsHeading, facts, sections,
    archiveHeading, sponsorsHeading, sponsors,
    calloutEyebrow, calloutTitle, calloutText
  }
`);

export const SPEAKER_EVENTS_QUERY = defineQuery(`
  *[_type == "event" && defined(series) && coalesce(published, true)] | order(date asc) {
    _id, _updatedAt, series, season, speaker, title, role,
    "slug": slug.current,
    date, startTime, endTime, venue, address,
    description, biography, "photoUrl": photo.asset->url, registerUrl
  }
`);

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage" && _id == "home-page"][0] {
    heroSlides[]{_key, label, heading, text, "imageUrl": image.asset->url, imageAlt, buttonLabel, buttonHref},
    programsHeading, programsText, programLinks, allProgramsLabel, allProgramsHref,
    programGallery[]{_key, label, "imageUrl": image.asset->url, imageAlt},
    eventsHeading, calendarLinkLabel, calendarLinkHref, eventDetailsLabel,
    noEventsText, noEventsLinkLabel,
    aboutHeading, aboutParagraphs, missionStatement,
    "aboutImageUrl": aboutImage.asset->url, aboutImageAlt, aboutLinks,
    newsletterHeading, newsletterText, newsletterOpenLabel, newsletterCloseLabel,
    sponsorsHeading, sponsorsText,
    sponsors[]{_key, name, "logoUrl": logo.asset->url}
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
