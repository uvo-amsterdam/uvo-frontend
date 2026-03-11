import 'server-only';
import { createDirectus, rest, staticToken } from '@directus/sdk';

const directusUrl = process.env.DIRECTUS_URL;
const token = process.env.DIRECTUS_TOKEN as string;

if (!directusUrl) {
    throw new Error(
        'DIRECTUS_URL is not defined in the environment variables. Please check your configuration.',
    );
}

if (!token) {
    throw new Error(
        'DIRECTUS_TOKEN is not defined in the environment variables. Please check your configuration.',
    );
}

// Create a Directus client with rest methods and token authentication
export const directus = createDirectus(directusUrl)
    .with(rest())
    .with(staticToken(token));
