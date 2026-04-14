import { GET as getTeamCompositions } from '@app/api/team-compositions/route';
import { GET as getTeams } from '@app/api/teams/route';
import { MatchTable } from '@components/match-table/match-table';
import { UNKNOWN_TEAM_IMAGE_PATH } from '@constants/images';
import type { TeamComposition } from '@interfaces/team-composition';
import type { TeamMapping } from '@interfaces/team-mapping';
import { logger } from '@lib/logger';
import { Box, Heading, Tabs, Text } from '@radix-ui/themes';
import { IconUserScan } from '@tabler/icons-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import css from './page.module.scss';

export const revalidate = 300;

interface TeamPageProps {
    params: Promise<{
        teamSlug: string;
    }>;
}

export async function generateStaticParams() {
    try {
        const res = await getTeams();
        if (!res.ok) {
            logger.error(
                { status: res.status },
                'Failed to fetch teams for static params',
            );
            return [];
        }

        const teams: TeamMapping[] = await res.json();
        return teams.map(team => ({
            teamSlug: team.id,
        }));
    } catch (error) {
        logger.error({ error }, 'Error generating static params for teams');
        return [];
    }
}

export async function generateMetadata({
    params,
}: TeamPageProps): Promise<Metadata> {
    const { teamSlug } = await params;

    try {
        const res = await getTeams();
        if (!res.ok) {
            return {
                title: 'Teams — UvO Amsterdam',
                robots: { index: false, follow: false },
            };
        }

        const teams: TeamMapping[] = await res.json();
        const team = teams.find(t => t.id === teamSlug);

        if (!team) {
            return {
                title: 'Team Not Found — UvO Amsterdam',
                robots: { index: false, follow: false },
            };
        }

        return {
            title: `${team.siteDisplayName} — UvO Amsterdam`,
            description: `Meet the roster and see recent match results for ${team.siteDisplayName}.`,
        };
    } catch (error) {
        logger.error({ error, teamSlug }, 'Error generating metadata for team');
        return {
            title: 'Teams — UvO Amsterdam',
            robots: { index: false, follow: false },
        };
    }
}

const TeamPage = async ({ params }: TeamPageProps) => {
    const { teamSlug } = await params;

    let team: TeamMapping | undefined;
    try {
        const resTeams = await getTeams();
        if (resTeams.ok) {
            const teams: TeamMapping[] = await resTeams.json();
            team = teams.find(t => t.id === teamSlug);
        }
    } catch (error) {
        logger.error({ error, teamSlug }, 'Error fetching team detail');
    }

    if (!team) {
        notFound();
    }

    // Fetch team compositions from our cached API layer
    let players: TeamComposition[] = [];
    try {
        const resComps = await getTeamCompositions();
        if (resComps.ok) {
            const allCompositions: TeamComposition[] = await resComps.json();

            players = allCompositions.filter((item: TeamComposition) => {
                if (!item.team) return false;
                const lowerTeam = item.team.toLowerCase();
                return team?.possibleAliases.some(alias =>
                    lowerTeam.includes(alias.toLowerCase()),
                );
            });
        }
    } catch (error) {
        logger.error({ error }, 'Error fetching Team Compositions');
    }

    // Note: We don't 404 here if players.length === 0 because the team itself is valid (exists in teams array)
    // and might just not have its roster filled out in Directus yet.

    return (
        <div className={css.root}>
            <section className={css.hero}>
                <div className={css.heroContent}>
                    <Heading as="h1" className={css.title}>
                        {team.siteDisplayName}
                    </Heading>
                    <Text as="p" size="5" className={css.subtitle}>
                        {players.length} players strong this season.
                    </Text>
                </div>
            </section>

            <section className={css.contentSection}>
                <div className={css.magazineLayout}>
                    <div className={css.photoColumn}>
                        <div className={css.teamImageWrapper}>
                            <Image
                                src={
                                    team.teamImageUrl || UNKNOWN_TEAM_IMAGE_PATH
                                }
                                alt={`${team.siteDisplayName} team photo`}
                                fill
                                sizes="(max-width: 64em) 100vw, 60vw"
                                className={css.teamImage}
                                priority
                            />
                        </div>
                    </div>

                    <div className={css.rosterColumn}>
                        <div className={css.sectionHeader}>
                            <IconUserScan
                                size={32}
                                className={css.sectionIcon}
                                aria-hidden="true"
                                focusable="false"
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

                    <div className={css.fixturesColumn}>
                        {team.competitionYesNo ? (
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
                                        <MatchTable
                                            nevoboTeamName={team.nevoboTeamName}
                                        />
                                    </Tabs.Content>
                                    <Tabs.Content value="results">
                                        <MatchTable
                                            type="results"
                                            nevoboTeamName={team.nevoboTeamName}
                                        />
                                    </Tabs.Content>
                                </Box>
                            </Tabs.Root>
                        ) : (
                            <Box
                                p="6"
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '12px',
                                    textAlign: 'center',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                }}
                            >
                                <Text size="4" weight="bold" color="orange">
                                    Training Only Team
                                </Text>
                                <Text as="p" size="3" color="gray" mt="2">
                                    This team doesn&apos;t have games in the
                                    Nevobo competition!
                                </Text>
                            </Box>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TeamPage;
