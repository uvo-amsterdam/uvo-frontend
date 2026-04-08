import { readItems } from '@directus/sdk';
import type {
    DirectusScheduleItem,
    ScheduleItem,
} from '@interfaces/training-schedule';
import { NextResponse } from 'next/server';
import { logger } from '../../../lib/logger';
import { directus } from '../../../lib/server/directus';

export const revalidate = 300;

export async function GET() {
    try {
        logger.info(
            '[Directus Fetch] Fetching fresh Training Schedules from Directus...',
        );
        const [mondayEven, mondayUneven, thursdayEven, thursdayUneven] =
            await Promise.all([
                directus.request(
                    readItems('monday_even_schedule', { limit: -1 }),
                ),
                directus.request(
                    readItems('monday_uneven_schedule', { limit: -1 }),
                ),
                directus.request(
                    readItems('thursday_even_schedule', { limit: -1 }),
                ),
                directus.request(
                    readItems('thursday_uneven_schedule', { limit: -1 }),
                ),
            ]);

        return NextResponse.json({
            mondayEven: normalizeScheduleItems(mondayEven),
            mondayUneven: normalizeScheduleItems(mondayUneven),
            thursdayEven: normalizeScheduleItems(thursdayEven),
            thursdayUneven: normalizeScheduleItems(thursdayUneven),
        });
    } catch (error) {
        logger.error({ err: error }, 'Error fetching Training Schedules');
        return NextResponse.json(
            { error: 'Failed to fetch Training Schedules' },
            { status: 500 },
        );
    }
}

function normalizeScheduleItems(items: DirectusScheduleItem[]): ScheduleItem[] {
    return items.map(item => ({
        id: item.id,
        time: item.Time,
        field1: item.Field_1,
        field2: item.Field_2,
        field3: item.Field_3,
        field4: item.Field_4,
    }));
}
