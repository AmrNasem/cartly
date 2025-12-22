import crypto from "crypto"
import slugify from "slugify"

export function generateSlug(title: string) {
  return slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  })
}

export function createUniqueSlug(title: string) {
  const baseSlug = generateSlug(title);
  return `${baseSlug}-${crypto.randomUUID().slice(0, 6)}`;
}