// lib/queries.ts
import { groq } from "next-sanity";



export const allProducts = groq`*[_type == "product"] {
    "id": _id,
    "image": image,
    "title": name,
    price,
    category
}`;
export const four = groq`*[_type =="product"][0..3]`;
export const three = groq`*[_type =="product"][0..2]`;