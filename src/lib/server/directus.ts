import { createDirectus, rest, staticToken } from '@directus/sdk';
import type { DirectusTeamComposition } from '@interfaces/team-composition';
import type { DirectusScheduleItem } from '@interfaces/training-schedule';

interface Schema {
    team_compositions: DirectusTeamComposition[];
    monday_even_schedule: DirectusScheduleItem[];
    monday_uneven_schedule: DirectusScheduleItem[];
    thursday_even_schedule: DirectusScheduleItem[];
    thursday_uneven_schedule: DirectusScheduleItem[];
}

const directusUrl = process.env.DIRECTUS_URL;
const token = process.env.DIRECTUS_TOKEN;

if (!directusUrl)
    throw new Error(
        'DIRECTUS_URL is not defined in the environment variables. Please check your configuration.',
    );
if (!token)
    throw new Error(
        'DIRECTUS_TOKEN is not defined in the environment variables. Please check your configuration.',
    );

export const directus = createDirectus<Schema>(directusUrl)
    .with(rest())
    .with(staticToken(token));
