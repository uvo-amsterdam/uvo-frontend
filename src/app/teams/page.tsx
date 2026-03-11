import { TeamCard } from '@components/team-card/team-card';
import { readItems } from '@directus/sdk';
import type { TeamComposition } from '@interfaces/team-composition.interface';
import { Heading, Text } from '@radix-ui/themes';
import { createSlug } from '@utils/string-utils';
import type { Metadata } from 'next';
import { logger } from '../../lib/logger';
import { directus } from '../../lib/server/directus';

import css from './page.module.scss';

export const metadata: Metadata = {
    title: 'Teams — UvO Amsterdam',
    description: 'Explore all 15 teams representing UvO Amsterdam.',
};

const TeamsPage = async () => {
    let teamsList: string[] = [];

    try {
        const compositions = (await directus.request(
            readItems('Team_Compositions'),
        )) as TeamComposition[];

        // Extract unique team names, filtering out nulls
        const uniqueTeams = Array.from(
            new Set(
                compositions
                    .map((item: TeamComposition) => item.Team)
                    .filter((team: string | null): team is string =>
                        Boolean(team),
                    ),
            ),
        );

        // Sort teams roughly logically if possible, or alphabetically
        teamsList = uniqueTeams.sort((a, b) => a.localeCompare(b));
    } catch (error) {
        logger.error({ error }, 'Error fetching Teams');
    }

    return (
        <div className={css.root}>
            <section className={css.hero}>
                <div className={css.heroContent}>
                    <Heading as="h1" className={css.title}>
                        Our Teams
                    </Heading>
                    <Text as="p" size="4" className={css.subtitle}>
                        Meet the players representing UvO Amsterdam across all
                        levels.
                    </Text>
                </div>
            </section>

            <section className={css.gridSection}>
                {teamsList.length > 0 ? (
                    <div className={css.grid}>
                        {teamsList.map(teamName => (
                            <TeamCard
                                key={teamName}
                                teamName={teamName}
                                slug={createSlug(teamName)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={css.empty}>
                        <Text size="4" className={css.emptyText}>
                            No teams found at the moment. Please check back
                            later.
                        </Text>
                    </div>
                )}
            </section>
        </div>
    );
};

export default TeamsPage;
