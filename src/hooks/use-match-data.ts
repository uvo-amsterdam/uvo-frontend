import type { Fixture } from '@interfaces/fixture';
import type { MatchResult } from '@interfaces/match-result';
import type { NevoboFixture } from '@interfaces/nevobo-fixture';
import type { NevoboMatchResult } from '@interfaces/nevobo-match-result';
import { formatDateStr, formatTimeStr } from '@utils/date-utils';
import { useApiFetch } from './use-api-fetch';

export type MatchType = 'fixtures' | 'results';

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

/**
 * Hook to filter match data (fixtures or results) by a specific team's Nevobo identifier (e.g., 'HS 1').
 * @param type The type of match data to fetch ('fixtures' or 'results').
 * @param nevoboTeamName The Nevobo identifier to filter by (e.g., 'HS 1' or 'DS 5').
 */
export function useFilteredMatchData(
    type: 'fixtures',
    nevoboTeamName?: string,
): UseMatchDataReturn<Fixture[]>;
export function useFilteredMatchData(
    type: 'results',
    nevoboTeamName?: string,
): UseMatchDataReturn<MatchResult[]>;
export function useFilteredMatchData(
    type: MatchType,
    nevoboTeamName?: string,
): UseMatchDataReturn<Fixture[] | MatchResult[]>;
export function useFilteredMatchData(
    type: MatchType,
    nevoboTeamName?: string,
): UseMatchDataReturn<Fixture[] | MatchResult[]> {
    const { data: rawData, loading, error } = useMatchData(type);

    const filteredData = (rawData as (Fixture | MatchResult)[]).filter(item => {
        if (!nevoboTeamName) return true;

        // Date filter logic for results only
        if (type === 'results') {
            const resultItem = item as MatchResult;
            const now = new Date();
            const currentYear = now.getFullYear();
            const isAfterAugust1st = now.getMonth() >= 7;
            const thresholdDate = isAfterAugust1st
                ? new Date(currentYear, 7, 1)
                : new Date(currentYear - 1, 7, 1);
            if (resultItem.timestamp < thresholdDate.getTime()) return false;
        }

        const searchStr = nevoboTeamName.toLowerCase();
        const home = item.home.toLowerCase();
        const away = item.away.toLowerCase();

        // Use a boundary-aware regex to prevent 'HS 1' matching 'HS 10'
        // We escape searchStr to be safe, though Nevobo names are usually simple (e.g. 'HS 1')
        const escapedSearchStr = searchStr.replace(
            /[.*+?^${}()|[\]\\]/g,
            '\\$&',
        );
        const boundaryRegex = new RegExp(`\\b${escapedSearchStr}\\b`, 'i');

        return (
            (home.includes('uvo') && boundaryRegex.test(home)) ||
            (away.includes('uvo') && boundaryRegex.test(away))
        );
    });

    return { data: filteredData, loading, error: !!error };
}

/**
 * Hook to filter match results by a specific team's Nevobo identifier (e.g., 'HS 1').
 * @param nevoboTeamName The Nevobo identifier to filter by (e.g., 'HS 1' or 'DS 5').
 * @deprecated Use useFilteredMatchData('results', nevoboTeamName) instead.
 */
export function useFilteredResults(nevoboTeamName?: string) {
    const { data, loading, error } = useFilteredMatchData(
        'results',
        nevoboTeamName,
    );
    return { results: data, loading, error };
}
