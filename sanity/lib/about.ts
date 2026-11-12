import { cache } from 'react';
import { defineQuery } from 'next-sanity';
import * as defaults from '@/app/about/_data/about-content';
import { client } from './client';

export const defaultAbout = {
  title: 'About Us', tagline: defaults.tagline, mission: defaults.mission,
  whoWeAre: defaults.whoWeAre, origins: defaults.origins.paragraphs,
  heroImage: defaults.photos.aboutHero, originsImage: defaults.photos.origins, networkImage: defaults.photos.network,
  wacaTitle: defaults.waca.title, wacaParagraphs: defaults.waca.paragraphs, wacaHref: defaults.waca.href,
  wacaLinkLabel: 'Visit worldaffairscouncils.org', stats: defaults.stats,
  reportsTitle: 'Annual Reports', reportsIntro: 'Each year we publish a report on our programs, membership, and finances.',
  reports: defaults.reports, historyTitle: 'Our History', milestones: defaults.milestones,
};

export type AboutContent = typeof defaultAbout;
export const ABOUT_QUERY = defineQuery(`
  *[_type == "aboutPage" && _id == "aboutPage"][0] {
    title, tagline, mission, whoWeAre, origins, wacaTitle, wacaParagraphs, wacaHref, wacaLinkLabel,
    "heroImage": heroImage { "src": asset->url, alt, "placeholder": "" },
    "originsImage": originsImage { "src": asset->url, alt, "placeholder": "" },
    "networkImage": networkImage { "src": asset->url, alt, "placeholder": "" },
    stats[]{value, label}, reportsTitle, reportsIntro,
    reports[]{year, label, "href": coalesce(file.asset->url, href)}, historyTitle, milestones[]{year, text}
  }
`);

export const fetchAbout = cache(async (): Promise<AboutContent> => {
  const content = await client.withConfig({ useCdn: false, perspective: 'published' }).fetch<Partial<AboutContent> | null>(ABOUT_QUERY, {}, { next: { revalidate: 60 } });
  // Keep the existing copy until fields are populated. Explicit empty arrays hide lists.
  return { ...defaultAbout, ...Object.fromEntries(Object.entries(content ?? {}).filter(([, value]) => value != null)) };
});
