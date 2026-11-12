import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Fetch published edits directly; these pages use Next.js ISR for caching.
  useCdn: false,
})
