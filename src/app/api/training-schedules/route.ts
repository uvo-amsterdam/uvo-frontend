import { readItems } from '@directus/sdk';
import { NextResponse } from 'next/server';
import { logger } from '../../../lib/logger';
import { directus } from '../../../lib/server/directus';

export const dynamic = 'force-static';

export async function GET() {
    try {
        logger.info(
            '[Directus Fetch] Fetching fresh Training Schedules from Directus...',
        );
        const [mondayEven, mondayUneven, thursdayEven, thursdayUneven] =
            await Promise.all([
                directus.request(
                    readItems('Monday_Even_Schedule', { limit: -1 }),
                ),
                directus.request(
                    readItems('Monday_Uneven_Schedule', { limit: -1 }),
                ),
                directus.request(
                    readItems('Thursday_Even_Schedule', { limit: -1 }),
                ),
                directus.request(
                    readItems('Thursday_Uneven_Schedule', { limit: -1 }),
                ),
            ]);

        return NextResponse.json({
            mondayEven,
            mondayUneven,
            thursdayEven,
            thursdayUneven,
        });
    } catch (error) {
        logger.error({ error }, 'Error fetching Training Schedules');
        return NextResponse.json(
            { error: 'Failed to fetch Training Schedules' },
            { status: 500 },
        );
    }
}
