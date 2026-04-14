import 'server-only';
import { cache } from 'react';
import { UNKNOWN_TEAM_IMAGE_PATH } from '@constants/images';
import { readItems } from '@directus/sdk';
import type {
    DirectusTeamMapping,
    TeamMapping,
} from '@interfaces/team-mapping';
import { logger } from '@lib/logger';
import { getDirectusClient } from '@lib/server/directus';
import { unstable_cache } from 'next/cache';

export const getTeamsData = cache(
    unstable_cache(
        async (): Promise<TeamMapping[]> => {
            try {
                const client = getDirectusClient();
                const items = await client.request<DirectusTeamMapping[]>(
                    readItems('teams', { limit: -1 }),
                );
                return normalizeTeams(items);
            } catch (error) {
                logger.error(
                    { err: error },
                    'Error fetching Teams from Directus',
                );
                throw error;
            }
        },
        ['teams-data'],
        { revalidate: 300, tags: ['teams'] },
    ),
);

function normalizeTeams(items: DirectusTeamMapping[]): TeamMapping[] {
    return items.map(item => {
        let possibleAliases: string[] = [];

        // Handle possibleAliases defensively. Directus can return string (JSON), string[] (already parsed), or null.
        const raw = item.PossibleAliases;
        if (raw) {
            if (Array.isArray(raw)) {
                possibleAliases = raw
                    .filter((a): a is string => typeof a === 'string')
                    .map(a => a.trim())
                    .filter(Boolean);
            } else if (typeof raw === 'string') {
                try {
                    const parsed: unknown = JSON.parse(raw);
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
                    // If not JSON, treat it as a single alias if not empty
                    const trimmed = raw.trim();
                    if (trimmed) possibleAliases = [trimmed];
                }
            }
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
