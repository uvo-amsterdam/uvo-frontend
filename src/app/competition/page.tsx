import type { FC } from 'react';
import { FixtureTable } from '@components/fixture-table/fixture-table';
import { Hero } from '@components/hero/hero';
import { ResultsTable } from '@components/results-table/results-table';
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

            <section className={css.fixtureSection}>
                <FixtureTable />
                <ResultsTable />
            </section>
        </div>
    );
};

export default CompetitionPage;
