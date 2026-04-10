import { MatchTable } from '@components/match-table/match-table';
import { TEAMS } from '@constants/teams';
import { readItems } from '@directus/sdk';
import type {
    DirectusTeamComposition,
    TeamComposition,
} from '@interfaces/team-composition';
import { Box, Heading, Tabs, Text } from '@radix-ui/themes';
import { IconBallVolleyball, IconUserScan } from '@tabler/icons-react';
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
    const team = TEAMS.find(t => t.id === teamSlug);

    if (!team) {
        return {
            title: 'Team Not Found — UvO Amsterdam',
        };
    }

    return {
        title: `${team.site_display_name} — UvO Amsterdam`,
        description: `Meet the roster and see recent match results for ${team.site_display_name}.`,
    };
}

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

const TeamPage = async ({ params }: TeamPageProps) => {
    const { teamSlug } = await params;
    const team = TEAMS.find(t => t.id === teamSlug);

    if (!team) {
        notFound();
    }

    // Fetch team compositions and filter for the specific team using its aliases
    let players: TeamComposition[] = [];
    try {
        const rawTeams = await directus.request<DirectusTeamComposition[]>(
            readItems('team_compositions', { limit: -1 }),
        );

        const allCompositions = normalizeTeamCompositions(rawTeams);

        players = allCompositions.filter((item: TeamComposition) => {
            if (!item.team) return false;
            const lowerTeam = item.team.toLowerCase();
            return team.possible_aliases.some(alias =>
                lowerTeam.includes(alias.toLowerCase()),
            );
        });
    } catch (error) {
        logger.error({ error }, 'Error fetching Team Compositions');
    }

    // Note: We don't 404 here if players.length === 0 because the team itself is valid (exists in TEAMS)
    // and might just not have its roster filled out in Directus yet.

    return (
        <div className={css.root}>
            <section className={css.hero}>
                <div className={css.heroContent}>
                    <Heading as="h1" className={css.title}>
                        {team.site_display_name}
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

                        {players.length > 0 ? (
                            <div className={css.rosterList}>
                                {players.map(player => (
                                    <div
                                        key={player.id}
                                        className={css.playerRow}
                                    >
                                        <Text
                                            size="4"
                                            weight="bold"
                                            className={css.playerName}
                                        >
                                            {player.name}
                                        </Text>
                                        <Text
                                            size="2"
                                            className={css.playerPosition}
                                        >
                                            {player.position}
                                        </Text>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Text color="gray">
                                <i>
                                    Roster information not available for this
                                    team yet.
                                </i>
                            </Text>
                        )}
                    </div>

                    <div>
                        <div className={css.teamImageWrapper}>
                            <Image
                                src={team.team_image_url}
                                alt={`${team.site_display_name} team photo`}
                                fill
                                sizes="(max-width: 64em) 100vw, 60vw"
                                className={css.teamImage}
                                priority
                            />
                        </div>

                        <Tabs.Root defaultValue="results">
                            <Tabs.List
                                color={'orange'}
                                style={{ marginBottom: '1.5rem' }}
                            >
                                <Tabs.Trigger value="fixtures">
                                    Upcoming Matches
                                </Tabs.Trigger>
                                <Tabs.Trigger value="results">
                                    Recent results
                                </Tabs.Trigger>
                            </Tabs.List>

                            <Box>
                                <Tabs.Content value="fixtures">
                                    <div className={css.sectionHeader}>
                                        <IconBallVolleyball
                                            size={32}
                                            className={css.sectionIcon}
                                        />
                                        <Heading
                                            as="h2"
                                            className={css.sectionTitle}
                                        >
                                            Upcoming Matches
                                        </Heading>
                                    </div>
                                    <MatchTable
                                        nevoboTeamName={team.nevobo_team_name}
                                    />
                                </Tabs.Content>
                                <Tabs.Content value="results">
                                    <div className={css.sectionHeader}>
                                        <IconBallVolleyball
                                            size={32}
                                            className={css.sectionIcon}
                                        />
                                        <Heading
                                            as="h2"
                                            className={css.sectionTitle}
                                        >
                                            Recent Results
                                        </Heading>
                                    </div>
                                    <MatchTable
                                        type="results"
                                        nevoboTeamName={team.nevobo_team_name}
                                    />
                                </Tabs.Content>
                            </Box>
                        </Tabs.Root>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TeamPage;
