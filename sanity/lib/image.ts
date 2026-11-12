import {createImageUrlBuilder} from '@sanity/image-url'
import { client } from './client'

const builder = createImageUrlBuilder(client)

// reuse the builder's own input type so we don't depend on internal package paths
export type SanityImage = Parameters<typeof builder.image>[0]

// turns a sanity image object into a cdn url you can resize and crop
export const urlFor = (source: SanityImage) => builder.image(source)
