import type { NevoboMatchResult } from '@interfaces/nevobo-match-result';
import { formatDateStr, formatTimeStr } from '@utils/date-utils';
import { useApiFetch } from './use-api-fetch';

export interface MatchResult {
    date: string;
    time: string;
    home: string;
    away: string;
    result: string;
    setScores: string;
    region: string;
    poule: string;
    code: string;
    roomCode: string;
    venue: string;
    city: string;
    uvoWin: boolean;
    isHomeGame: boolean;
    timestamp: number;
    matchStatus: string;
}

function determineWin(
    home: string,
    away: string,
    score: string,
): { uvoWin: boolean; uvoLoss: boolean } {
    if (!score) {
        return { uvoWin: false, uvoLoss: false };
    }
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

function parseResults(rows: NevoboMatchResult[]): MatchResult[] {
    return rows.map(row => {
        return {
            date: formatDateStr(row.date),
            time: row.time ? formatTimeStr(row.time) : 'TBD',
            home: row.homeTeam,
            away: row.awayTeam,
            result: row.result,
            setScores: row.setScores,
            region: row.region,
            poule: row.poule,
            code: row.code,
            roomCode: row.roomCode,
            matchStatus: row.matchStatus,
            timestamp: new Date(row.date).getTime() || 0,
            ...determineWin(row.homeTeam, row.awayTeam, row.result),
            venue: row.location,
            city: row.city,
            isHomeGame: row.homeTeam.toLowerCase().includes('uvo'),
        };
    });
}

export function useResults() {
    return useApiFetch<NevoboMatchResult[], MatchResult[]>(
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
