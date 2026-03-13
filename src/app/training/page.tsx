import { Hero } from '@components/hero/hero';
import { TrainingScheduleList } from '@components/training-schedule-list/training-schedule-list';
import type { Metadata } from 'next';

import css from './page.module.scss';

export const metadata: Metadata = {
    title: 'Training Schedule | UvO Amsterdam',
    description: 'Check the upcoming training schedule for all UvO teams!',
};

export default function Training() {
    return (
        <main className={css.root}>
            <Hero
                title="Training Schedule"
                subtitle="Check the upcoming training schedule for all UvO teams!"
            />

            <section className={css.content}>
                <div className={css.contentInner}>
                    <TrainingScheduleList />
                </div>
            </section>
        </main>
    );
}
