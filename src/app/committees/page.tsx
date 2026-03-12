import type { FC } from 'react';
import { Heading, Text } from '@radix-ui/themes';
import { IconMail } from '@tabler/icons-react';
import type { Metadata } from 'next';
import Image from 'next/image';

import css from './page.module.scss';

export const metadata: Metadata = {
    title: 'Committees — UvO Amsterdam',
    description:
        'Meet the volunteers behind UvO Amsterdam. From parties to technical oversight, our committees make the club happen.',
};

const ORGANISING_COMMITTEES = [
    {
        title: 'IntrUvO Committee',
        description:
            'The creative brains behind our introductory weekend in September. Challenging games and drinks to get everyone talking!',
    },
    {
        title: 'Activities Committee',
        description:
            'Complete freedom to plan vibrant events like New Year’s dinner, UvOlympics, pool nights, or ice skating.',
    },
    {
        title: 'Party Committee',
        description:
            'The essential student committee! Responsible for our legendary theme parties throughout the year.',
    },
    {
        title: 'Gala Committee',
        description:
            'Organizes our chic annual evening—think dinners at fancy restaurants or parties on boats.',
    },
    {
        title: 'UvO Band Committee',
        description:
            'For the musically talented players. They perform at special events throughout the season.',
    },
    {
        title: 'Internal Tournament Committee (InToCo)',
        description:
            'The Internal Tournament Committee manages our home-grown events like the Blacklight Tournament.',
    },
    {
        title: 'External Tradition Committee (EXTC)',
        description:
            'Handles registration and travel for external traditions like Texel and HAJRAA.',
    },
    {
        title: 'WintrUvO Committee',
        description:
            'Takes UvO to the mountains! Organizes our annual ski and snowboard trip in January.',
    },
    {
        title: 'The Lift Committee',
        description:
            'Organizes the secret-destination hitchhiking competition, complete with rescue vehicles.',
    },
    {
        title: 'Bata Committee',
        description:
            'Coordinates our participation in the Batavierenrace—the world’s largest relay race.',
    },
    {
        title: 'Promotions Committee (PromoCie)',
        description:
            'Focuses on the UvA intro markets, finding sponsors, and launching fresh UvO merchandise.',
    },
    {
        title: 'Social Media Committee (SMC)',
        description:
            'Our influencers! Capturing home games, creating reels, and managing the Instagram vibe.',
    },
    {
        title: 'IT Committee',
        description:
            'The tech-savvy group responsible for building and maintaining this website.',
    },
];

const SUPPORTING_COMMITTEES = [
    {
        title: 'Technical Committee (TC)',
        description:
            'The bridge between players and the board. They select teams twice a year and support coaches.',
    },
    {
        title: 'Audit Committee (KasCo)',
        description:
            'The financial watchdogs who monitor every transaction to ensure club transparency.',
    },
    {
        title: 'Dispute Committee (SchilCo)',
        description:
            'Ready to assist and mediate should any unresolved conflicts arise within the club.',
    },
];

const CommitteesPage: FC = () => {
    return (
        <div className={css.root}>
            {/* ── Hero Section ── */}
            <section className={css.hero}>
                <Image
                    src="/images/homepage/team-photo.jpeg"
                    alt="UvO members working together"
                    fill
                    priority
                    className={css.heroBg}
                />
                <div className={css.heroScrim} />
                <div className={css.heroContent}>
                    <Heading as="h1" className={css.title}>
                        Committees
                    </Heading>
                </div>
            </section>

            {/* ── Intro Section ── */}
            <section className={css.introSection}>
                <div className={css.introContent}>
                    <Text as="p" size="4" className={css.introText}>
                        Without volunteers, it&apos;s impossible to make all
                        activities a great success. Various committees work
                        throughout the season to organize fantastic events. Want
                        to get involved?
                    </Text>
                    <a
                        href="mailto:bestuur@uvo-amsterdam.nl"
                        className={css.contactLink}
                    >
                        <IconMail
                            size={20}
                            aria-hidden="true"
                            focusable="false"
                        />
                        Email the board to join a committee
                    </a>
                </div>
            </section>

            {/* ── Organising Committees ── */}
            <section className={css.gridSection}>
                <div className={css.sectionHeader}>
                    <Heading as="h2" size="7">
                        Organising Committees
                    </Heading>
                </div>

                <div className={css.committeeGrid}>
                    {ORGANISING_COMMITTEES.map(com => (
                        <div key={com.title} className={css.comCard}>
                            <Heading
                                as="h3"
                                size="5"
                                mb="2"
                                className={css.comTitle}
                            >
                                {com.title}
                            </Heading>
                            <Text as="p" size="2" color="gray">
                                {com.description}
                            </Text>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Supporting Committees ── */}
            <section className={css.altBgWrapper}>
                <div className={css.gridSection}>
                    <div className={css.sectionHeader}>
                        <Heading as="h2" size="7">
                            Supporting Committees
                        </Heading>
                    </div>

                    <div className={css.supportList}>
                        {SUPPORTING_COMMITTEES.map(com => (
                            <div key={com.title} className={css.supportItem}>
                                <Heading
                                    as="h3"
                                    size="5"
                                    className={css.comTitle}
                                >
                                    {com.title}
                                </Heading>
                                <Text as="p" size="3">
                                    {com.description}
                                </Text>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CommitteesPage;
