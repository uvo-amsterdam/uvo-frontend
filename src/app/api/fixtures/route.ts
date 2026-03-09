import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

const NEVOBO_URL =
    'https://api.nevobo.nl/export/vereniging/CKL7K23/programma.xlsx';

export async function GET() {
    try {
        const response = await fetch(NEVOBO_URL);

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch fixtures from Nevobo' },
                { status: 502 },
            );
        }

        const buffer = await response.arrayBuffer();
        const workbook = XLSX.read(new Uint8Array(buffer), { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows: unknown[][] = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
        });

        // Skip the header row
        const fixtures = rows.slice(1, 16);

        return NextResponse.json(fixtures);
    } catch {
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 },
        );
    }
}
