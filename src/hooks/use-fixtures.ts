import type { NevoboMatch } from '@interfaces/nevobo-match';
import { formatDateStr, formatTimeStr } from '@utils/date-utils';
import { useApiFetch } from './use-api-fetch';

export interface Fixture {
    date: string;
    time: string;
    home: string;
    away: string;
    venue: string;
    city: string;
    isHomeGame: boolean;
}

function parseFixtures(rows: NevoboMatch[]): Fixture[] {
    return rows.map(row => {
        return {
            date: formatDateStr(row.date),
            time: row.time ? formatTimeStr(row.time) : 'TBD',
            home: row.homeTeam,
            away: row.awayTeam,
            venue: row.location,
            city: row.city,
            isHomeGame: row.homeTeam.toLowerCase().includes('uvo'),
        };
    });
}

export function useFixtures() {
    return useApiFetch<NevoboMatch[], Fixture[]>(
        '/api/fixtures',
        parseFixtures,
        [],
    );
}
