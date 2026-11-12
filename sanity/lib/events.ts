import { cache } from 'react';
import type { Event } from '@/lib/site';
import { client } from './client';
import { EVENTS_QUERY } from './queries';

// All event surfaces share the published records; an empty list stays empty.
export const fetchEvents = cache(async (): Promise<Event[]> =>
  client.withConfig({ useCdn: false, perspective: 'published' }).fetch<Event[]>(EVENTS_QUERY, {}, { next: { revalidate: 60 } })
);

export async function fetchUpcomingEvents() {
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' });
  return (await fetchEvents()).filter(event => event.date >= today);
}
