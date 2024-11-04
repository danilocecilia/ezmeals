export function createSlug(name: string) {
  return name.trim().replace(/\s+/g, '-').toLowerCase();
}
