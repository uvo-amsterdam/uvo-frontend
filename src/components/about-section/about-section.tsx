import type { FC } from 'react';
import { Card } from '@components/card/card';
import { Heading, Link, Strong, Text } from '@radix-ui/themes';

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
                    <Heading as="h2" className={css.title}>
                        UvO in a few words
                    </Heading>
                    <Text as="p" size="3" className={css.body}>
                        Welcome to UvO, the <Strong>most international</Strong>
                        &nbsp; & the <Strong>most fun</Strong>&nbsp;student
                        volleyball association in Amsterdam! UvO has been around
                        for over 25 years. We play with eight women&apos;s teams
                        and five men&apos;s teams in the Nevobo competition and
                        also have two beginner training-only teams.
                    </Text>
                    <Text as="p" size="3" className={css.body}>
                        The training evenings are every Monday and Thursday at
                        USC Universum (Science Park). Home game evenings are
                        mostly on Tuesdays in the Wethouder Verheijhal and
                        sometimes on Saturdays at USC Universum. We close the
                        training sessions and home play evenings with a nice
                        drink.
                    </Text>
                    <Text as="p" size="3" className={css.body}>
                        UvO is a self-run association: together, members make
                        everything possible! 15 committees organize tournaments,
                        activities, trips and of course parties! With our 250
                        members, we have a great time all year round.
                    </Text>
                    <Text as="p" size="2" className={css.contact}>
                        Would you like to know more?&nbsp;
                        <Link href="mailto:bestuur@uvo-amsterdam.nl">
                            bestuur@uvo-amsterdam.nl
                        </Link>
                    </Text>
                </div>

                <div className={css.statsCol}>
                    {STATS.map(stat => (
                        <Card
                            key={stat.label}
                            variant="ghost"
                            className={css.statCard}
                        >
                            <Text className={css.statValue}>{stat.value}</Text>
                            <Text size="2" className={css.statLabel}>
                                {stat.label}
                            </Text>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
