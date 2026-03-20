import { NEVOBO_BASE_URL, NEVOBO_CLUB_ID } from '@constants/api';
import { parseNevoboExcel } from '@utils/parse-nevobo-excel';
import { NextResponse } from 'next/server';
import pino from 'pino';

const logger = pino();

export async function GET() {
    try {
        const response = await fetch(
            `${NEVOBO_BASE_URL}vereniging/${NEVOBO_CLUB_ID}/programma.xlsx`,
            { next: { revalidate: 3600 } }, // cache for 1 hour
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch fixtures from Nevobo' },
                { status: 502 },
            );
        }

        const fixtures = await parseNevoboExcel(response);

        return NextResponse.json(fixtures);
    } catch (e) {
        logger.error({ err: e }, 'Failed to parse fixtures');
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 },
        );
    }
}
