import 'server-only';
import {
    createDirectus,
    type DirectusClient,
    type RestClient,
    rest,
    type StaticTokenClient,
    staticToken,
} from '@directus/sdk';
import type { DirectusTeamComposition } from '@interfaces/team-composition';
import type { DirectusTeamMapping } from '@interfaces/team-mapping';
import type { DirectusScheduleItem } from '@interfaces/training-schedule';

interface Schema {
    teams: DirectusTeamMapping[];
    team_compositions: DirectusTeamComposition[];
    monday_even_schedule: DirectusScheduleItem[];
    monday_uneven_schedule: DirectusScheduleItem[];
    thursday_even_schedule: DirectusScheduleItem[];
    thursday_uneven_schedule: DirectusScheduleItem[];
}

type Client = DirectusClient<Schema> &
    RestClient<Schema> &
    StaticTokenClient<Schema>;

let _directus: Client | null = null;

export function getDirectusClient(): Client {
    if (_directus) return _directus;

    const directusUrl = process.env.DIRECTUS_URL;
    const token = process.env.DIRECTUS_TOKEN;

    if (!directusUrl)
        throw new Error(
            'DIRECTUS_URL is not defined in the environment variables.',
        );
    if (!token)
        throw new Error(
            'DIRECTUS_TOKEN is not defined in the environment variables.',
        );

    _directus = createDirectus<Schema>(directusUrl)
        .with(rest())
        .with(staticToken(token));
    return _directus;
}
