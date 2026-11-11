'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema: {
    ...schema,
    templates: (templates) => [
      ...templates.filter((template) => template.schemaType !== 'event' && template.schemaType !== 'speakerProgram' && template.schemaType !== 'homePage'),
      {
        id: 'distinguished-speaker-event',
        title: 'Distinguished Speaker Series event',
        schemaType: 'event',
        value: {series: 'distinguished', season: '2026–2027', startTime: '10:00 AM', endTime: '11:30 AM', venue: 'First Presbyterian Church', address: '540 William Hilton Pkwy, Hilton Head Island, SC', published: true},
      },
      {
        id: 'global-speaker-event',
        title: 'Global Speakers Program event',
        schemaType: 'event',
        value: {series: 'global', season: '2026–2027', startTime: '10:00 AM', endTime: '11:30 AM', venue: 'First Presbyterian Church', address: '540 William Hilton Pkwy, Hilton Head Island, SC', published: true},
      },
    ],
  },
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
