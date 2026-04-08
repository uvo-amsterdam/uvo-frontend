import { readItems } from '@directus/sdk';
import type {
    DirectusTeamComposition,
    TeamComposition,
} from '@interfaces/team-composition';
import { logger } from '@lib/logger';
import { directus } from '@lib/server/directus';
import { NextResponse } from 'next/server';

export const revalidate = 300;

export async function GET() {
    try {
        const teams = await directus.request<DirectusTeamComposition[]>(
            readItems('team_compositions', { limit: -1 }),
        );

        return NextResponse.json(normalizeTeamCompositions(teams));
    } catch (error) {
        logger.error({ err: error }, 'Error fetching Team Compositions');
        return NextResponse.json(
            { error: 'Failed to fetch Team Compositions' },
            { status: 500 },
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
