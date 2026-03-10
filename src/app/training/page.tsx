import { TrainingScheduleList } from '@components/training-schedule-list/training-schedule-list';
import { Heading, Text } from '@radix-ui/themes';
import type { Metadata } from 'next';

import css from './page.module.scss';

export const metadata: Metadata = {
    title: 'Training Schedule | UvO Amsterdam',
    description: 'Check the upcoming training schedule for all UvO teams!',
};

export default function Training() {
    return (
        <main className={css.root}>
            {/* simple hero section utilizing global SCSS mixins */}
            <section className={css.hero}>
                <div className={css.heroInner}>
                    <Heading as="h1" className={css.title}>
                        Training Schedule
                    </Heading>
                    <Text as="p" size="5" className={css.subtitle}>
                        Check the upcoming training schedule for all UvO teams!
                    </Text>
                </div>
            </section>

            {/* Content area containing the schedule list */}
            <section className={css.content}>
                <div className={css.contentInner}>
                    <TrainingScheduleList />
                </div>
            </section>
        </main>
    );
}
