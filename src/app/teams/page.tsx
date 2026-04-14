import { TeamCard } from '@components/team-card/team-card';
import type { TeamMapping } from '@interfaces/team-mapping';
import { logger } from '@lib/logger';
import { getTeamsData } from '@lib/server/teams';
import { Heading, Text } from '@radix-ui/themes';
import type { Metadata } from 'next';

import css from './page.module.scss';

export const revalidate = 300;

export const metadata: Metadata = {
    title: 'Teams — UvO Amsterdam',
    description: 'Explore all 15 teams representing UvO Amsterdam.',
};

const TeamsPage = async () => {
    let teams: TeamMapping[] = [];
    let error = false;

    try {
        teams = await getTeamsData();
    } catch (err) {
        logger.error({ err }, 'Unexpected error while loading teams for index');
        error = true;
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
                <div className={css.grid}>
                    {error ? (
                        <Text
                            size="5"
                            align="center"
                            style={{ gridColumn: '1 / -1' }}
                        >
                            We encountered an error loading the teams. Please
                            try again later.
                        </Text>
                    ) : (
                        teams.map(team => (
                            <TeamCard
                                key={team.id}
                                teamName={team.siteDisplayName}
                                slug={team.id}
                                imageUrl={team.teamImageUrl || undefined}
                            />
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default TeamsPage;
