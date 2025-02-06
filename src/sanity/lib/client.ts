import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,  
})

const builder = imageUrlBuilder(client)

export function urlFor(source: { asset: { _ref: string; _type: string } }) {
  return builder.image(source)
}
