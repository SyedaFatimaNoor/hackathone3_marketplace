import imageUrlBuilder from '@sanity/image-url';
import client from './sanityClient';

const builder = imageUrlBuilder(client);

export function urlForImage(source: { asset: { _ref: string; _type: string } }) {
  return builder.image(source);
}
