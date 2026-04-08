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
                directus.request(readItems('monday_even_schedule')),
                directus.request(readItems('monday_uneven_schedule')),
                directus.request(readItems('thursday_even_schedule')),
                directus.request(readItems('thursday_uneven_schedule')),
            ]);

        return NextResponse.json({
            mondayEven,
            mondayUneven,
            thursdayEven,
            thursdayUneven,
        });
    } catch (error) {
        logger.error({ err: error }, 'Error fetching Training Schedules');
        return NextResponse.json(
            { error: 'Failed to fetch Training Schedules' },
            { status: 500 },
        );
    }
}
