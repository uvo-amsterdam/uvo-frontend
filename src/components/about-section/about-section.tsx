import type { FC } from 'react';

import css from './about-section.module.scss';

const STATS = [
    { value: '250+', label: 'Members' },
    { value: '15', label: 'Teams' },
    { value: '15', label: 'Committees' },
    { value: '25+', label: 'Years' },
];

export const AboutSection: FC = () => {
    return (
        <section id="about" className={css.root}>
            <div className={css.grid}>
                <div className={css.textCol}>
                    <h2 className={css.title}>UvO in a few words</h2>
                    <p className={css.body}>
                        Welcome to UvO, the most fun student volleyball
                        association in Amsterdam! UvO has been around for over
                        25 years. We play with eight women's teams and five
                        men's teams in the Nevobo competition and also have two
                        beginner training-only teams.
                    </p>
                    <p className={css.body}>
                        The training evenings are every Monday and Thursday at
                        USC Universum (Science Park). Home game evenings are
                        mostly on Tuesdays in the Wethouder Verheijhal and
                        sometimes on Saturdays at USC Universum. We close the
                        training sessions and home play evenings with a nice
                        drink.
                    </p>
                    <p className={css.body}>
                        UvO is a self-run association: together, members make
                        everything possible! 15 committees organize tournaments,
                        activities, trips and of course parties! With our 250
                        members, we have a great time all year round.
                    </p>
                    <p className={css.contact}>
                        Would you like to know more?{' '}
                        <a href="mailto:bestuur@uvo-amsterdam.nl">
                            bestuur@uvo-amsterdam.nl
                        </a>
                    </p>
                </div>

                <div className={css.statsCol}>
                    {STATS.map(stat => (
                        <div key={stat.label} className={css.statCard}>
                            <span className={css.statValue}>{stat.value}</span>
                            <span className={css.statLabel}>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
