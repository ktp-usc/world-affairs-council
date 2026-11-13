import {cache} from 'react';
import {defineQuery} from 'next-sanity';
import defaults from '../defaults/landing-page.json';
import {client} from './client';

export type LandingPageContent = typeof defaults;
export type NewsletterContent = LandingPageContent['newsletter'];

// Uploads take precedence over the preserved local image paths.
const photo = '"imagePath": coalesce(image.asset->url, imagePath), alt';
export const LANDING_PAGE_QUERY = defineQuery(`{
  "hero": *[_type == "landingHero" && _id == "landing-hero"][0]{label, interval, slides[]{_key, ${photo}, label, title, body, link{label, href}}},
  "programs": *[_type == "landingPrograms" && _id == "landing-programs"][0]{title, body, links[]{_key, label, href}, allLink{label, href}, galleryLabel, photos[]{_key, ${photo}, label}},
  "events": *[_type == "landingEvents" && _id == "landing-events"][0]{title, calendarLink{label, href}, limit, detailsLabel, emptyText, emptyLink{label, href}},
  "about": *[_type == "landingAbout" && _id == "landing-about"][0]{title, ${photo}, mission, paragraphs, links[]{_key, label, href, source, newTab}},
  "newsletter": *[_type == "landingNewsletter" && _id == "landing-newsletter"][0]{title, body, openLabel, closeLabel, formLabel, formTitle, embedUrl},
  "sponsors": *[_type == "landingSponsors" && _id == "landing-sponsors"][0]{title, body, sponsors[]{_key, name, ${photo}, href}},
  "memberShortcut": *[_type == "landingMemberShortcut" && _id == "landing-memberShortcut"][0]{enabled, label, href}
}`);

/** Merge partially populated documents, preserving explicit empty arrays, strings and false. */
export function mergeLandingContent<T>(fallback: T, content: unknown): T {
  if (content == null) return fallback;
  if (Array.isArray(fallback)) return content as T;
  if (typeof fallback === 'object' && fallback !== null && typeof content === 'object') {
    const result = {...fallback};
    for (const key of Object.keys(fallback) as (keyof T)[]) {
      result[key] = mergeLandingContent(fallback[key], (content as Partial<T>)[key]);
    }
    return result;
  }
  return content as T;
}

export const fetchLandingPage = cache(async (): Promise<LandingPageContent> => {
  try {
    const content = await client.withConfig({useCdn: false, perspective: 'published'}).fetch(LANDING_PAGE_QUERY, {}, {next: {revalidate: 60}});
    return mergeLandingContent(defaults, content);
  } catch (error) {
    console.error('Unable to load landing page content from Sanity.', error);
    return defaults;
  }
});
