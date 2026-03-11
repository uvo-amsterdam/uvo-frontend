import { formatDateStr } from '@utils/date-utils';
import { useApiFetch } from './useApiFetch';

export interface MatchResult {
    date: string;
    home: string;
    away: string;
    score: string;
    venue: string;
    city: string;
    uvoWin: boolean;
    uvoLoss: boolean;
    isUvo: boolean;
}

function determineWin(
    home: string,
    away: string,
    score: string,
): { uvoWin: boolean; uvoLoss: boolean } {
    const isHomeUvo = home.toLowerCase().includes('uvo');
    const isAwayUvo = away.toLowerCase().includes('uvo');

    if (!isHomeUvo && !isAwayUvo) return { uvoWin: false, uvoLoss: false };

    const parts = score.split('-').map(s => Number.parseInt(s.trim(), 10));
    if (
        parts.length !== 2 ||
        Number.isNaN(parts[0]) ||
        Number.isNaN(parts[1])
    ) {
        return { uvoWin: false, uvoLoss: false };
    }

    const [homeScore, awayScore] = parts;

    if (isHomeUvo) {
        return {
            uvoWin: homeScore > awayScore,
            uvoLoss: homeScore < awayScore,
        };
    }
    return { uvoWin: awayScore > homeScore, uvoLoss: awayScore < homeScore };
}

function parseResults(rows: unknown[][]): MatchResult[] {
    return rows
        .filter(row => row.length > 0 && row[0] != null)
        .map(row => {
            const dateVal = row[0] as string | Date;
            const home = (row[2] as string) ?? '';
            const away = (row[3] as string) ?? '';
            const score = (row[4] as string) ?? '';
            const venue = (row[10] as string) ?? '';
            const city = (row[11] as string) ?? '';
            const { uvoWin, uvoLoss } = determineWin(home, away, score);

            return {
                date: formatDateStr(dateVal),
                home,
                away,
                score,
                venue,
                city,
                uvoWin,
                uvoLoss,
                isUvo:
                    home.toLowerCase().includes('uvo') ||
                    away.toLowerCase().includes('uvo'),
            };
        });
}

export function useResults() {
    return useApiFetch<unknown[][], MatchResult[]>(
        '/api/results',
        parseResults,
    );
}
