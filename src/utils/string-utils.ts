export function createSlug(text: string): string {
    return text
        .trim()
        .toLowerCase()
        .normalize('NFD') // Remove accents
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
}

export function parseSlugToName(slug?: string): string {
    if (!slug) return '';
    // Basic title case parsing: e.g. "gents-1" -> "Gents 1", "ladies-2" -> "Ladies 2"
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
