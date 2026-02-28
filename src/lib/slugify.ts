export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function generateEventId(artistEvent: string, date: string): string {
  return slugify(`${artistEvent}-${date}`)
}
