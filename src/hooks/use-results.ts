import { formatDateStr } from '@utils/date-utils';
import { useApiFetch } from './use-api-fetch';

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
    timestamp: number;
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
            const dateVal = row[0] as string | Date | number;
            const home = String(row[2] ?? '');
            const away = String(row[3] ?? '');
            const score = String(row[4] ?? '');
            const venue = String(row[10] ?? '');
            const city = String(row[11] ?? '');
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
                timestamp: new Date(dateVal).getTime() || 0,
            };
        });
}

export function useResults() {
    return useApiFetch<unknown[][], MatchResult[]>(
        '/api/results',
        parseResults,
        [],
    );
}

export function useFilteredResults(teamFilter?: string) {
    const { data: rawResults, loading, error } = useResults();

    const filteredResults: MatchResult[] = [];

    if (!teamFilter) {
        filteredResults.push(...rawResults);
    } else {
        const lowerFilter = teamFilter.toLowerCase();
        const isGents =
            lowerFilter.includes('gents') || lowerFilter.includes('heren');
        const isLadies =
            lowerFilter.includes('ladies') || lowerFilter.includes('dames');

        const numberMatch = teamFilter.match(/\d+/);
        const number = numberMatch ? numberMatch[0] : '';

        let nevoboSuffix = '';
        if (isGents && number) nevoboSuffix = `HS ${number}`;
        if (isLadies && number) nevoboSuffix = `DS ${number}`;

        // Date filter logic
        const now = new Date();
        const currentYear = now.getFullYear();
        const isAfterAugust1st = now.getMonth() >= 7; // 0-indexed month, 7 = August

        const topTeams = ['gents 1', 'gents 2', 'ladies 1', 'ladies 2'];
        const isTopTeam = topTeams.includes(lowerFilter);

        let thresholdDate: Date;
        if (isTopTeam) {
            const seasonStartYear = isAfterAugust1st
                ? currentYear
                : currentYear - 1;
            thresholdDate = new Date(seasonStartYear, 7, 1); // August 1st
        } else {
            if (isAfterAugust1st) {
                thresholdDate = new Date(currentYear, 7, 1); // August 1st
            } else {
                thresholdDate = new Date(currentYear, 0, 1); // January 1st
            }
        }

        const thresholdTimestamp = thresholdDate.getTime();
        const teamRegex = nevoboSuffix
            ? new RegExp(`${nevoboSuffix}(?!\\d)`)
            : null;

        filteredResults.push(
            ...rawResults.filter(r => {
                if (r.timestamp < thresholdTimestamp) return false;

                if (!teamRegex) {
                    return (
                        r.home.toLowerCase().includes(lowerFilter) ||
                        r.away.toLowerCase().includes(lowerFilter)
                    );
                }

                const homeMatches =
                    r.home.toLowerCase().includes('uvo') &&
                    teamRegex.test(r.home);
                const awayMatches =
                    r.away.toLowerCase().includes('uvo') &&
                    teamRegex.test(r.away);
                return homeMatches || awayMatches;
            }),
        );
    }

    return { results: filteredResults, loading, error };
}
