import type { Fixture } from '@interfaces/fixture';
import type { MatchResult } from '@interfaces/match-result';
import type { NevoboFixture } from '@interfaces/nevobo-fixture';
import type { NevoboMatchResult } from '@interfaces/nevobo-match-result';
import { formatDateStr, formatTimeStr } from '@utils/date-utils';
import { useApiFetch } from './use-api-fetch';

type MatchType = 'fixtures' | 'results';

interface UseMatchDataReturn<R> {
    data: R;
    loading: boolean;
    error: boolean;
}

export function useMatchData(type: 'fixtures'): UseMatchDataReturn<Fixture[]>;
export function useMatchData(
    type: 'results',
): UseMatchDataReturn<MatchResult[]>;
export function useMatchData(
    type: MatchType,
): UseMatchDataReturn<Fixture[] | MatchResult[]>;
export function useMatchData(
    type: MatchType,
): UseMatchDataReturn<Fixture[] | MatchResult[]> {
    const url = type === 'fixtures' ? '/api/fixtures' : '/api/results';
    const parser = type === 'fixtures' ? parseFixtures : parseResults;

    const { data, loading, error } = useApiFetch<
        NevoboFixture[] | NevoboMatchResult[],
        Fixture[] | MatchResult[]
    >(
        url,
        parser as (
            raw: NevoboFixture[] | NevoboMatchResult[],
        ) => Fixture[] | MatchResult[],
        [],
    );

    return { data, loading, error: !!error };
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

function parseFixtures(rows: NevoboFixture[]): Fixture[] {
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

function determineWin(
    home: string,
    away: string,
    score: string,
): { uvoWin: boolean } {
    if (!score) {
        return { uvoWin: false };
    }
    const isHomeUvo = home.toLowerCase().includes('uvo');
    const isAwayUvo = away.toLowerCase().includes('uvo');

    if (!isHomeUvo && !isAwayUvo) return { uvoWin: false };

    const parts = score.split('-').map(s => Number.parseInt(s.trim(), 10));
    if (
        parts.length !== 2 ||
        Number.isNaN(parts[0]) ||
        Number.isNaN(parts[1])
    ) {
        return { uvoWin: false };
    }

    const [homeScore, awayScore] = parts;

    if (isHomeUvo) {
        return {
            uvoWin: homeScore > awayScore,
        };
    }
    return { uvoWin: awayScore > homeScore };
}

export function useFilteredResults(teamFilter?: string) {
    const { data: rawResults, loading, error } = useMatchData('results');

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
