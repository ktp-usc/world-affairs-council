import { cache } from 'react';
import { defineQuery } from 'next-sanity';
import { getInvolvedDefaults, giveDefaults, guestDefaults, membershipDefaults, sponsorDefaults, volunteerDefaults } from '@/app/get-involved/_data/get-involved-content';
import { client } from './client';

// Photos only count once an image is uploaded, so a description on its own never hides the current photo.
const photo = (field: string) => `"${field}": select(defined(${field}.asset) => ${field}{ "src": asset->url, alt, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height })`;
const captioned = `{ caption, "photo": photo{ "src": asset->url, alt, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height } }`;
const testimonial = `"testimonial": select(defined(testimonial.name) => testimonial{ name, role, quote, "photo": photo.asset->url })`;

const pageQuery = (id: string, fields: string) => defineQuery(`*[_type == "${id}" && _id == "${id}"][0]{ ${fields} }`);

export const GET_INVOLVED_PAGE_QUERY = pageQuery('getInvolvedPage', `title, intro, ${photo('heroImage')}, sectionTitle, ${photo('sectionImage')}, ways[]{ title, text, link }`);
export const MEMBERSHIP_PAGE_QUERY = pageQuery('membershipPage', `title, intro, ${photo('heroImage')}, infoTitle, infoText, reasons[]{ title, text }, benefitsTitle, "benefits": benefits[]{ benefit, "nonMember": coalesce(nonMember, false) }, joinTitle, joinOnlineTitle, joinOnlineText, joinByMailTitle, joinByMailText, ${testimonial}`);
export const GUEST_PAGE_QUERY = pageQuery('guestPage', `title, intro, ${photo('heroImage')}, sectionTitle, ${photo('sectionImage')}, paragraphs`);
export const VOLUNTEER_PAGE_QUERY = pageQuery('volunteerPage', `title, intro, ${photo('heroImage')}, opportunitiesTitle, photos[]${captioned}, opportunitiesText, roles[]{ title, text, "photos": coalesce(photos[defined(asset)]{ "src": asset->url, alt, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height }, []) }, formTitle, "formPhoto": select(defined(formPhoto.photo.asset) => formPhoto${captioned}), formText, contactEmail, contactPhone, ${testimonial}`);
export const GIVE_PAGE_QUERY = pageQuery('givePage', `title, intro, checkTitle, checkText, checkPhone, checkTextAfter, donateTitle, donateIntro, funds[]{ title, text }, giftExamples[]{ amount, text }, donatePhotos[]${captioned}, heritageTitle, heritageText, heritageBeneficiary, heritageTextAfter, heritageOptions[]{ title, text, note, linkLabel }, heritageNote, sponsorshipTitle, "sponsorshipPhoto": select(defined(sponsorshipPhoto.photo.asset) => sponsorshipPhoto${captioned}), sponsorshipParagraphs, globalFundTitle, globalFundText, monthlyTitle, "monthlyPhoto": select(defined(monthlyPhoto.photo.asset) => monthlyPhoto${captioned}), monthlyText, formsTitle, taxTitle, taxIntro, taxOptions[]{ title, text }, taxNote, taxPartnersIntro, taxPartners[]{ name, role, phone }, ${testimonial}`);
export const SPONSOR_PAGE_QUERY = pageQuery('sponsorPage', `title, intro, ${photo('heroImage')}, "featurePhoto": select(defined(featurePhoto.photo.asset) => featurePhoto${captioned}), levelsTitle, levels[]{ name, amount, limit, perks }, becomeTitle, becomeParagraphs, formTitle, ${testimonial}`);

/**
 * Fetches one Get Involved page and fills every empty field with today's copy.
 * An empty list in Sanity hides that list; if Sanity can't be reached, the page shows today's copy.
 */
function pageFetcher<T extends object>(query: string, defaults: T) {
  return cache(async (): Promise<T> => {
    try {
      const content = await client.withConfig({ useCdn: false, perspective: 'published' })
        .fetch<Partial<T> | null>(query, {}, { next: { revalidate: 60 } });
      return { ...defaults, ...Object.fromEntries(Object.entries(content ?? {}).filter(([, value]) => value != null && value !== '')) };
    } catch (error) {
      console.error('Unable to load Get Involved content from Sanity.', error);
      return defaults;
    }
  });
}

export const fetchGetInvolvedPage = pageFetcher(GET_INVOLVED_PAGE_QUERY, getInvolvedDefaults);
export const fetchMembershipPage = pageFetcher(MEMBERSHIP_PAGE_QUERY, membershipDefaults);
export const fetchGuestPage = pageFetcher(GUEST_PAGE_QUERY, guestDefaults);
export const fetchVolunteerPage = pageFetcher(VOLUNTEER_PAGE_QUERY, volunteerDefaults);
export const fetchGivePage = pageFetcher(GIVE_PAGE_QUERY, giveDefaults);
export const fetchSponsorPage = pageFetcher(SPONSOR_PAGE_QUERY, sponsorDefaults);
