import { readItems } from '@directus/sdk';
import { NextResponse } from 'next/server';
import { directus } from '../../../lib/directus';

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
    try {
        const [mondayEven, mondayUneven, thursdayEven, thursdayUneven] =
            await Promise.all([
                directus.request(readItems('Monday_Even_Schedule')),
                directus.request(readItems('Monday_Uneven_Schedule')),
                directus.request(readItems('Thursday_Even_Schedule')),
                directus.request(readItems('Thursday_Uneven_Schedule')),
            ]);

        return NextResponse.json({
            mondayEven,
            mondayUneven,
            thursdayEven,
            thursdayUneven,
        });
    } catch (error) {
        console.error('Error fetching Training Schedules:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Training Schedules' },
            { status: 500 },
        );
    }
}
