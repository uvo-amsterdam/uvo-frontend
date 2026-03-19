import { formatDateStr, formatTimeStr } from '@utils/date-utils';
import { useApiFetch } from './use-api-fetch';

export interface Fixture {
    date: string;
    time: string;
    home: string;
    away: string;
    venue: string;
    city: string;
    isUvo: boolean;
}

function parseFixtures(rows: unknown[][]): Fixture[] {
    return rows
        .filter(row => row.length > 0 && row[0] != null)
        .map(row => {
            const dateVal = row[0] as string | Date;
            const timeVal = row[1] as string | Date;
            const home = String(row[2] ?? '');
            const away = String(row[3] ?? '');
            const venue = String(row[10] ?? '');
            const city = String(row[11] ?? '');

            return {
                date: formatDateStr(dateVal),
                time: timeVal ? formatTimeStr(timeVal) : 'TBD',
                home,
                away,
                venue,
                city,
                isUvo:
                    home.toLowerCase().includes('uvo') ||
                    away.toLowerCase().includes('uvo'),
            };
        });
}

export function useFixtures() {
    return useApiFetch<unknown[][], Fixture[]>(
        '/api/fixtures',
        parseFixtures,
        [],
    );
}
