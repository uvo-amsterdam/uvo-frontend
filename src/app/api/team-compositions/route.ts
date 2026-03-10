import { readItems } from '@directus/sdk';
import { NextResponse } from 'next/server';
import { directus } from '../../../lib/directus';

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
    try {
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
