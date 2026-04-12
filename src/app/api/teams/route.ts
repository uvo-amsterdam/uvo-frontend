import { readItems } from '@directus/sdk';
import type {
    DirectusTeamMapping,
    TeamMapping,
} from '@interfaces/team-mapping';
import { logger } from '@lib/logger';
import { directus } from '@lib/server/directus';
import { NextResponse } from 'next/server';

export const revalidate = 300;

const MAX_STALE_AGE = 1000 * 60 * 60 * 24 * 30 * 6; // ~6 months

let cache: {
    data: TeamMapping[];
    timestamp: number;
} | null = null;

export async function GET() {
    try {
        const teams = await directus.request<DirectusTeamMapping[]>(
            readItems('teams', { limit: -1 }),
        );

        const payload = normalizeTeams(teams);
        cache = {
            data: payload,
            timestamp: Date.now(),
        };

        return NextResponse.json(payload);
    } catch (error) {
        logger.error({ err: error }, 'Error fetching Teams');

        const now = Date.now();
        if (cache && now - cache.timestamp < MAX_STALE_AGE) {
            logger.warn('Returning stale Teams data due to fetch failure');
            return NextResponse.json(cache.data, {
                status: 200,
                headers: { 'x-data-stale': 'true' },
            });
        }

        return NextResponse.json(
            { error: 'Failed to fetch Teams' },
            { status: 503 },
        );
    }
}

function normalizeTeams(items: DirectusTeamMapping[]): TeamMapping[] {
    return items.map(item => ({
        id: item.id,
        siteDisplayName: item.SiteDisplayName,
        teamImageUrl: item.TeamImageUrl,
        nevoboTeamName: item.NevoboTeamName,
        possibleAliases: item.PossibleAliases,
    }));
}
