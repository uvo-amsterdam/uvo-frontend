import { readItems } from '@directus/sdk';
import type {
    DirectusScheduleItem,
    ScheduleItem,
} from '@interfaces/training-schedule';
import { logger } from '@lib/logger';
import { directus } from '@lib/server/directus';
import { NextResponse } from 'next/server';

export const revalidate = 300;

export async function GET() {
    try {
        const [mondayEven, mondayUneven, thursdayEven, thursdayUneven] =
            await Promise.all([
                directus.request<DirectusScheduleItem[]>(
                    readItems('monday_even_schedule', { limit: -1 }),
                ),
                directus.request<DirectusScheduleItem[]>(
                    readItems('monday_uneven_schedule', { limit: -1 }),
                ),
                directus.request<DirectusScheduleItem[]>(
                    readItems('thursday_even_schedule', { limit: -1 }),
                ),
                directus.request<DirectusScheduleItem[]>(
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
