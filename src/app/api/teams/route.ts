import { UNKNOWN_TEAM_IMAGE_PATH } from '@constants/images';
import { readItems } from '@directus/sdk';
import type {
    DirectusTeamMapping,
    TeamMapping,
} from '@interfaces/team-mapping';
import { logger } from '@lib/logger';
import { getDirectusClient } from '@lib/server/directus';
import { NextResponse } from 'next/server';

export const revalidate = 300;

const MAX_STALE_AGE = 1000 * 60 * 60 * 24 * 30 * 6; // ~6 months

let cache: {
    data: TeamMapping[];
    timestamp: number;
} | null = null;

export async function GET() {
    try {
        const directus = getDirectusClient();
        const teams = await directus.request<DirectusTeamMapping[]>(
            readItems('teams', { limit: -1 }),
        );

        const payload = normalizeTeams(teams);
        cache = {
            data: payload,
            timestamp: Date.now(),
        };

        return NextResponse.json(payload);
    } catch (error) {
        logger.error({ err: error }, 'Error fetching Teams');

        const now = Date.now();
        if (cache && now - cache.timestamp < MAX_STALE_AGE) {
            logger.warn('Returning stale Teams data due to fetch failure');
            return NextResponse.json(cache.data, {
                status: 200,
                headers: { 'x-data-stale': 'true' },
            });
        }

        return NextResponse.json(
            { error: 'Failed to fetch Teams' },
            { status: 503 },
        );
    }
}

function normalizeTeams(items: DirectusTeamMapping[]): TeamMapping[] {
    return items.map(item => {
        let possibleAliases: string[] = [];

        try {
            const parsed: unknown = JSON.parse(item.PossibleAliases);
            if (Array.isArray(parsed)) {
                possibleAliases = parsed
                    .filter((a): a is string => typeof a === 'string')
                    .map(a => a.trim())
                    .filter(Boolean);
            } else if (typeof parsed === 'string') {
                const trimmed = parsed.trim();
                if (trimmed) possibleAliases = [trimmed];
            }
        } catch (_e) {
            // If parsing fails, treat the raw string as a single alias if not empty
            const raw = item.PossibleAliases.trim();
            if (raw) possibleAliases = [raw];
        }

        // Final fallback: if no aliases found, use NevoboTeamName to ensure matching still works
        if (possibleAliases.length === 0 && item.NevoboTeamName) {
            possibleAliases = [item.NevoboTeamName];
        }

        return {
            id: item.id,
            siteDisplayName: item.SiteDisplayName,
            teamImageUrl: normalizeTeamImageUrl(item.TeamImageUrl),
            nevoboTeamName: item.NevoboTeamName,
            possibleAliases,
            competitionYesNo: item.Competition_Yes_No,
        };
    });
}

function normalizeTeamImageUrl(teamImageUrl: string | null | undefined) {
    const trimmed = teamImageUrl?.trim();

    if (!trimmed) {
        return UNKNOWN_TEAM_IMAGE_PATH;
    }

    return trimmed;
}
