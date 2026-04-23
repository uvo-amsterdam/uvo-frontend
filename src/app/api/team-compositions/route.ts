import type { TeamComposition } from '@interfaces/team-composition';
import { logger } from '@lib/logger';
import { getTeamCompositionsData } from '@lib/server/compositions';
import { NextResponse } from 'next/server';

export const revalidate = 300;

const MAX_STALE_AGE = 1000 * 60 * 60 * 24 * 30 * 6; // ~6 months

let cache: {
    data: TeamComposition[];
    timestamp: number;
} | null = null;

export async function GET() {
    try {
        const payload = await getTeamCompositionsData();
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
