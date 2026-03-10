import { NEVOBO_BASE_URL } from '@constants/api';
import { parseNevoboExcel } from '@utils/nevobo-utils';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch(
            `${NEVOBO_BASE_URL}vereniging/CKL7K23/programma.xlsx`,
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch fixtures from Nevobo' },
                { status: 502 },
            );
        }

        const fixtures = await parseNevoboExcel(response);

        return NextResponse.json(fixtures);
    } catch {
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 },
        );
    }
}
