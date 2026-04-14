import 'server-only';
import { cache } from 'react';
import { readItems } from '@directus/sdk';
import type {
    DirectusTeamComposition,
    TeamComposition,
} from '@interfaces/team-composition';
import { logger } from '@lib/logger';
import { getDirectusClient } from '@lib/server/directus';
import { unstable_cache } from 'next/cache';

export const getTeamCompositionsData = cache(
    unstable_cache(
        async (): Promise<TeamComposition[]> => {
            try {
                const directus = getDirectusClient();
                const items = await directus.request<DirectusTeamComposition[]>(
                    readItems('team_compositions', { limit: -1 }),
                );
                return normalizeTeamCompositions(items);
            } catch (error) {
                logger.error(
                    { err: error },
                    'Error fetching Team Compositions from Directus',
                );
                throw error;
            }
        },
        ['team-compositions-data'],
        { revalidate: 300, tags: ['compositions'] },
    ),
);

function normalizeTeamCompositions(
    items: DirectusTeamComposition[],
): TeamComposition[] {
    return items.map(item => ({
        id: item.id,
        team: item.Team,
        name: item.Name,
        position: item.Position,
    }));
}
