import { readItems } from '@directus/sdk';
import type {
    DirectusTeamComposition,
    TeamComposition,
} from '@interfaces/team-composition';
import { NextResponse } from 'next/server';
import { logger } from '../../../lib/logger';
import { directus } from '../../../lib/server/directus';

export const revalidate = 300;

export async function GET() {
    try {
        logger.info(
            '[Directus Fetch] Fetching fresh Team Compositions from Directus...',
        );
        const teams = await directus.request(
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
