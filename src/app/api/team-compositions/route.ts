import { readItems } from '@directus/sdk';
import { NextResponse } from 'next/server';
import { directus } from '../../../lib/directus';

export const dynamic = 'force-static';

export async function GET() {
    try {
        console.log(
            '[Directus Fetch] Fetching fresh Team Compositions from Directus...',
        );
        const teams = await directus.request(readItems('Team_Compositions'));

        return NextResponse.json(teams);
    } catch (error) {
        console.error('Error fetching Team Compositions:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Team Compositions' },
            { status: 500 },
        );
    }
}
