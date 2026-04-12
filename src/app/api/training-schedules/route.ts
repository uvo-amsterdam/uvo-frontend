import { readItems } from '@directus/sdk';
import type {
    DirectusScheduleItem,
    ScheduleItem,
    TrainingSchedules,
} from '@interfaces/training-schedule';
import { logger } from '@lib/logger';
import { directus } from '@lib/server/directus';
import { NextResponse } from 'next/server';

export const revalidate = 300;

const MAX_STALE_AGE = 1000 * 60 * 60 * 24 * 30 * 6; // ~6 months

let cache: {
    data: TrainingSchedules;
    timestamp: number;
} | null = null;

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

        const payload: TrainingSchedules = {
            mondayEven: normalizeScheduleItems(mondayEven),
            mondayUneven: normalizeScheduleItems(mondayUneven),
            thursdayEven: normalizeScheduleItems(thursdayEven),
            thursdayUneven: normalizeScheduleItems(thursdayUneven),
        };

        cache = {
            data: payload,
            timestamp: Date.now(),
        };

        return NextResponse.json(payload);
    } catch (error) {
        logger.error({ err: error }, 'Error fetching Training Schedules');

        const now = Date.now();
        if (cache && now - cache.timestamp < MAX_STALE_AGE) {
            logger.warn(
                'Returning stale Training Schedules data due to fetch failure',
            );
            return NextResponse.json(cache.data, {
                status: 200,
                headers: { 'x-data-stale': 'true' },
            });
        }

        return NextResponse.json(
            { error: 'Failed to fetch Training Schedules' },
            { status: 503 },
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
