import { readItems } from '@directus/sdk';
import type {
    DirectusTeamComposition,
    TeamComposition,
} from '@interfaces/team-composition';
import { logger } from '@lib/logger';
import { getDirectusClient } from '@lib/server/directus';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const MAX_STALE_AGE = 1000 * 60 * 60 * 24 * 30 * 6; // ~6 months

let cache: {
    data: TeamComposition[];
    timestamp: number;
} | null = null;

export async function GET() {
    const directus = getDirectusClient();
    try {
        const teams = await directus.request<DirectusTeamComposition[]>(
            readItems('team_compositions', { limit: -1 }),
        );

        const payload = normalizeTeamCompositions(teams);
        cache = {
            data: payload,
            timestamp: Date.now(),
        };

        return NextResponse.json(payload);
    } catch (error) {
        logger.error({ err: error }, 'Error fetching Team Compositions');

        const now = Date.now();
        if (cache && now - cache.timestamp < MAX_STALE_AGE) {
            logger.warn(
                'Returning stale Team Compositions data due to fetch failure',
            );
            return NextResponse.json(cache.data, {
                status: 200,
                headers: { 'x-data-stale': 'true' },
            });
        }

        return NextResponse.json(
            { error: 'Failed to fetch Team Compositions' },
            { status: 503 },
        );
    }
}

function normalizeTeamCompositions(
    items: DirectusTeamComposition[],
): TeamComposition[] {
    return items.map(item => ({
        id: item.id,
        team: item.Team,
        name: item.Name,
        position: item.Position,
    }));
}
