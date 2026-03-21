import { NEVOBO_BASE_URL, NEVOBO_CLUB_ID } from '@constants/api';
import { parseNevoboExcel } from '@utils/parse-nevobo-excel';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch(
            `${NEVOBO_BASE_URL}vereniging/${NEVOBO_CLUB_ID}/resultaten.xlsx`,
            { next: { revalidate: 3600 } },
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch results from Nevobo' },
                { status: 502 },
            );
        }

        const results = await parseNevoboExcel(response, 'results');

        return NextResponse.json(results);
    } catch (e) {
        console.error('Failed to parse results:', e);
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 },
        );
    }
}
