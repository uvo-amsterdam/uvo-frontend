import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

const NEVOBO_URL =
    'https://api.nevobo.nl/export/vereniging/CKL7K23/resultaten.xlsx';

export async function GET() {
    try {
        const response = await fetch(NEVOBO_URL);

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch results from Nevobo' },
                { status: 502 },
            );
        }

        const buffer = await response.arrayBuffer();
        const workbook = XLSX.read(new Uint8Array(buffer), { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows: unknown[][] = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
        });

        // Skip header, take first 15 (most recent results)
        const results = rows.slice(1, 16);

        return NextResponse.json(results);
    } catch {
        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 },
        );
    }
}
