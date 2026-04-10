import { readItems } from '@directus/sdk';
import type {
    DirectusTeamComposition,
    TeamComposition,
} from '@interfaces/team-composition';
import { logger } from '@lib/logger';
import { directus } from '@lib/server/directus';
import { NextResponse } from 'next/server';

export const revalidate = 300;

let cachedTeamCompositions: TeamComposition[] | null = null;

export async function GET() {
    try {
        const teams = await directus.request<DirectusTeamComposition[]>(
            readItems('team_compositions', { limit: -1 }),
        );

        const payload = normalizeTeamCompositions(teams);
        cachedTeamCompositions = payload;

        return NextResponse.json(payload);
    } catch (error) {
        logger.error({ err: error }, 'Error fetching Team Compositions');

        if (cachedTeamCompositions) {
            logger.warn(
                'Returning stale Team Compositions data due to fetch failure',
            );
            return NextResponse.json(cachedTeamCompositions, {
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
