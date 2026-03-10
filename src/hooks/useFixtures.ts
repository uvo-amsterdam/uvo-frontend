import { formatDateFromSerial, formatTimeFromSerial } from '@utils/date-utils';
import { useApiFetch } from './useApiFetch';

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
            const dateSerial = row[0] as number;
            const timeSerial = row[1] as number;
            const home = (row[2] as string) ?? '';
            const away = (row[3] as string) ?? '';
            const venue = (row[10] as string) ?? '';
            const city = (row[11] as string) ?? '';

            return {
                date:
                    typeof dateSerial === 'number'
                        ? formatDateFromSerial(dateSerial)
                        : String(dateSerial ?? ''),
                time:
                    typeof timeSerial === 'number'
                        ? formatTimeFromSerial(timeSerial)
                        : String(timeSerial ?? ''),
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
    return useApiFetch<unknown[][], Fixture[]>('/api/fixtures', parseFixtures);
}
