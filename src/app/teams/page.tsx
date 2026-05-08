import { Hero } from '@components/hero/hero';
import { TeamCard } from '@components/team-card/team-card';
import type { TeamMapping } from '@interfaces/team-mapping';
import { logger } from '@lib/logger';
import { getTeamsData } from '@lib/server/teams';
import { Text } from '@radix-ui/themes';
import type { Metadata } from 'next';
import Image from 'next/image';

import css from './page.module.scss';

export const revalidate = 300;

export const metadata: Metadata = {
    title: 'Teams - UvO Amsterdam',
    description: 'Explore the teams representing UvO Amsterdam.',
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
            <Hero
                title={'Our Teams'}
                subtitle={
                    'Meet the players representing UvO Amsterdam across all levels.'
                }
            />
            <Image
                src={
                    'https://directus.uvo-amsterdam.cloud/assets/e6e6eb36-f7ce-4e3a-8e9f-74ade52b5234'
                }
                alt={'image'}
                width={50}
                height={50}
            />
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
