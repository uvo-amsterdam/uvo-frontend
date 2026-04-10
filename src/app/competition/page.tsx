import type { FC } from 'react';
import { Hero } from '@components/hero/hero';
import { MatchTable } from '@components/match-table/match-table';
import { Box, Heading, Tabs } from '@radix-ui/themes';
import { IconTrophy } from '@tabler/icons-react';
import type { Metadata } from 'next';

import css from './page.module.scss';

export const metadata: Metadata = {
    title: 'Competition - UvO Amsterdam',
    description:
        'Upcoming match fixtures and recent results for all UvO Amsterdam volleyball teams, updated live from Nevobo.',
};

const CompetitionPage: FC = () => {
    return (
        <div className={css.root}>
            <Hero
                title="Competition"
                subtitle="Check out the upcoming matches and recent results for all UvO teams!"
                icon={<IconTrophy size={44} stroke={1.5} />}
            />

            <Tabs.Root defaultValue="fixtures">
                <Tabs.List className={css.selector} color={'orange'}>
                    <Tabs.Trigger value="fixtures">
                        Upcoming Matches
                    </Tabs.Trigger>
                    <Tabs.Trigger value="results">Recent results</Tabs.Trigger>
                </Tabs.List>

                <Box className={css.fixtureSection}>
                    <Tabs.Content value="fixtures">
                        <Heading as="h2" className={css.tableTitle}>
                            Upcoming Matches
                        </Heading>
                        <MatchTable />
                    </Tabs.Content>
                    <Tabs.Content value="results">
                        <Heading as="h2" className={css.tableTitle}>
                            Recent Results
                        </Heading>
                        <MatchTable type={'results'} />
                    </Tabs.Content>
                </Box>
            </Tabs.Root>
        </div>
    );
};

export default CompetitionPage;
