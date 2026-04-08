import 'server-only';
import { createDirectus, rest, staticToken } from '@directus/sdk';
import type { TeamComposition } from '@interfaces/team-composition.interface';
import type { ScheduleItem } from '@interfaces/training-schedule.interface';

interface Schema {
    team_compositions: TeamComposition[];
    monday_even_schedule: ScheduleItem[];
    monday_uneven_schedule: ScheduleItem[];
    thursday_even_schedule: ScheduleItem[];
    thursday_uneven_schedule: ScheduleItem[];
}

const directusUrl = process.env.DIRECTUS_URL;
const token = process.env.DIRECTUS_TOKEN;

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
export const directus = createDirectus<Schema>(directusUrl)
    .with(rest())
    .with(staticToken(token));
