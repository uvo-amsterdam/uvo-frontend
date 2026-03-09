import type { FC } from 'react';
import { FixtureTable } from '@components/fixture-table/fixture-table';
import { ResultsTable } from '@components/results-table/results-table';
import { Heading, Text } from '@radix-ui/themes';
import { IconTrophy } from '@tabler/icons-react';
import type { Metadata } from 'next';

import css from './page.module.scss';

export const metadata: Metadata = {
    title: 'Competition — UvO Amsterdam',
    description:
        'Upcoming match fixtures and recent results for all UvO Amsterdam volleyball teams, updated live from Nevobo.',
};

const CompetitionPage: FC = () => {
    return (
        <div className={css.root}>
            {/* ── Hero Section ── */}
            <section className={css.hero}>
                <div className={css.heroContent}>
                    <IconTrophy
                        size={44}
                        stroke={1.5}
                        className={css.heroIcon}
                    />
                    <Heading as="h1" className={css.title}>
                        Competition
                    </Heading>
                    <Text as="p" size="4" className={css.subtitle}>
                        Check out the upcoming matches and recent results for
                        all UvO teams!
                    </Text>
                </div>
            </section>

            {/* ── Fixtures & Results Section ── */}
            <section className={css.fixtureSection}>
                <FixtureTable />
                <ResultsTable />
            </section>
        </div>
    );
};

export default CompetitionPage;
