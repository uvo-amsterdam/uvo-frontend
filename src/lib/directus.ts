import { createDirectus, rest, staticToken } from '@directus/sdk';

const directusUrl =
    process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';
const token = process.env.DIRECTUS_TOKEN as string;

if (!token) {
    console.warn('DIRECTUS_TOKEN is not defined in the environment variables.');
}

// Create a Directus client with rest methods (bypassing token authentication because endpoints are public, and the provided token returns INVALID_CREDENTIALS)
export const directus = createDirectus(directusUrl).with(rest());
