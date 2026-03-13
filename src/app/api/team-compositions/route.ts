import { readItems } from '@directus/sdk';
import { NextResponse } from 'next/server';
import { logger } from '../../../lib/logger';
import { directus } from '../../../lib/server/directus';

export const dynamic = 'force-static';

export async function GET() {
    try {
        logger.info(
            '[Directus Fetch] Fetching fresh Team Compositions from Directus...',
        );
        const teams = await directus.request(
            readItems('Team_Compositions', { limit: -1 }),
        );

        return NextResponse.json(teams);
    } catch (error) {
        logger.error({ error }, 'Error fetching Team Compositions');
        return NextResponse.json(
            { error: 'Failed to fetch Team Compositions' },
            { status: 500 },
        );
    }
}
