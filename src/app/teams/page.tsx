import { TeamCard } from '@components/team-card/team-card';
import { TEAMS } from '@constants/teams';
import { Heading, Text } from '@radix-ui/themes';
import type { Metadata } from 'next';

import css from './page.module.scss';

export const metadata: Metadata = {
    title: 'Teams — UvO Amsterdam',
    description: 'Explore all 15 teams representing UvO Amsterdam.',
};

const TeamsPage = () => {
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
                    {TEAMS.map(team => (
                        <TeamCard
                            key={team.id}
                            teamName={team.site_display_name}
                            slug={team.id}
                            imageUrl={team.team_image_url}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default TeamsPage;
