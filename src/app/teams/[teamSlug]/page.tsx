import { ResultsTable } from '@components/results-table/results-table';
import { readItems } from '@directus/sdk';
import type { TeamComposition } from '@interfaces/team-composition.interface';
import { Heading, Text } from '@radix-ui/themes';
import { IconBallVolleyball, IconUserScan } from '@tabler/icons-react';
import { parseSlugToName } from '@utils/string-utils';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { logger } from '../../../lib/logger';
import { directus } from '../../../lib/server/directus';

import css from './page.module.scss';

interface TeamPageProps {
    params: Promise<{
        teamSlug: string;
    }>;
}

export async function generateMetadata({
    params,
}: TeamPageProps): Promise<Metadata> {
    const { teamSlug } = await params;
    const teamName = parseSlugToName(teamSlug);
    return {
        title: `${teamName} — UvO Amsterdam`,
        description: `Meet the roster and see recent match results for ${teamName}.`,
    };
}

const TeamPage = async ({ params }: TeamPageProps) => {
    const { teamSlug } = await params;
    const teamName = parseSlugToName(teamSlug);

    // Fetch team compositions and filter for the specific team
    let players: TeamComposition[] = [];
    try {
        const allCompositions = (await directus.request(
            readItems('Team_Compositions'),
        )) as TeamComposition[];

        players = allCompositions.filter(
            (item: TeamComposition) =>
                item.Team && item.Team.toLowerCase() === teamName.toLowerCase(),
        );
    } catch (error) {
        logger.error({ error }, 'Error fetching Team Compositions');
    }

    if (players.length === 0) {
        notFound();
    }

    return (
        <div className={css.root}>
            <section className={css.hero}>
                <div className={css.heroContent}>
                    <Heading as="h1" className={css.title}>
                        {teamName}
                    </Heading>
                    <Text as="p" size="5" className={css.subtitle}>
                        {players.length} players strong this season.
                    </Text>
                </div>
            </section>

            <section className={css.contentSection}>
                <div className={css.magazineLayout}>
                    <div className={css.rosterColumn}>
                        <div className={css.sectionHeader}>
                            <IconUserScan
                                size={32}
                                className={css.sectionIcon}
                            />
                            <Heading as="h2" className={css.sectionTitle}>
                                Team Roster
                            </Heading>
                        </div>

                        <div className={css.rosterList}>
                            {players.map(player => (
                                <div key={player.id} className={css.playerRow}>
                                    <Text
                                        size="4"
                                        weight="bold"
                                        className={css.playerName}
                                    >
                                        {player.Name}
                                    </Text>
                                    <Text
                                        size="2"
                                        className={css.playerPosition}
                                    >
                                        {player.Position}
                                    </Text>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className={css.teamImageWrapper}>
                            <Image
                                src="/images/homepage/team-photo.jpeg"
                                alt={`${teamName} team photo`}
                                fill
                                sizes="(max-width: 64em) 100vw, 60vw"
                                className={css.teamImage}
                                priority
                            />
                        </div>

                        <div className={css.sectionHeader}>
                            <IconBallVolleyball
                                size={32}
                                className={css.sectionIcon}
                            />
                            <Heading as="h2" className={css.sectionTitle}>
                                Recent Results
                            </Heading>
                        </div>

                        <ResultsTable
                            teamFilter={teamName}
                            hideLocation={true}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TeamPage;
