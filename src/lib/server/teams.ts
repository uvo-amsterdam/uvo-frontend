import { cache } from 'react';
import { UNKNOWN_TEAM_IMAGE_PATH } from '@constants/images';
import { readItems } from '@directus/sdk';
import type {
    DirectusTeamMapping,
    TeamMapping,
} from '@interfaces/team-mapping';
import { logger } from '@lib/logger';
import { getDirectusClient } from '@lib/server/directus';

export const getTeamsData = cache(async (): Promise<TeamMapping[]> => {
    try {
        const client = getDirectusClient();
        const items = await client.request<DirectusTeamMapping[]>(
            readItems('teams', { limit: -1 }),
        );
        return normalizeTeams(items);
    } catch (error) {
        logger.error({ err: error }, 'Error fetching Teams from Directus');
        throw error;
    }
});

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
            const raw = item.PossibleAliases.trim();
            if (raw) possibleAliases = [raw];
        }

        if (possibleAliases.length === 0 && item.NevoboTeamName) {
            possibleAliases = [item.NevoboTeamName];
        }

        return {
            id: item.id,
            siteDisplayName: item.SiteDisplayName,
            teamImageUrl: item.TeamImageUrl?.trim() || UNKNOWN_TEAM_IMAGE_PATH,
            nevoboTeamName: item.NevoboTeamName,
            possibleAliases,
            competitionYesNo: item.Competition_Yes_No,
        };
    });
}
