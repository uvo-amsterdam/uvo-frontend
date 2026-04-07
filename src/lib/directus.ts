import { createDirectus, rest, staticToken } from '@directus/sdk';

const directusUrl =
    process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';
const token = process.env.DIRECTUS_TOKEN as string;

if (!token) {
    console.warn('DIRECTUS_TOKEN is not defined in the environment variables.');
}

// Create a Directus client with rest methods.
// Authenticate using the static token if available to bypass public read restrictions.
export const directus = token
    ? createDirectus(directusUrl).with(staticToken(token)).with(rest())
    : createDirectus(directusUrl).with(rest());
