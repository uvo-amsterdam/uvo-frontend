import type { FC } from 'react';
import { FORMS } from '@constants/forms';
import { LOCATION } from '@constants/location';
import { Flex, Link, Separator, Text } from '@radix-ui/themes';
import Image from 'next/image';
import NextLink from 'next/link';

import css from './footer.module.scss';

const FOOTER_SECTIONS = [
    {
        title: 'Over UvO Amsterdam',
        contents: ['Een volleybal vereniging vol gezelligheid!'],
    },
    {
        title: 'Address',
        contents: Object.values(LOCATION),
    },
    {
        title: 'Contact',
        contents: [
            { label: 'Bestuur', email: 'bestuur@uvo-amsterdam.nl' },
            {
                label: 'Technische Commissie (TC)',
                email: 'tc@uvo-amsterdam.nl',
            },
        ],
    },
];

const SPONSORS = [
    {
        name: 'Studentensport Amsterdam',
        href: 'https://www.studentensport.amsterdam/',
        logo: '/images/sponsors/ssa.png',
    },
    {
        name: 'Sportcentrum VU',
        href: 'https://sportcentrumvu.nl/',
        logo: '/images/sponsors/vu.png',
    },
    {
        name: 'USC Sport',
        href: 'https://www.uscsport.nl/',
        logo: '/images/sponsors/usc.png',
    },
];

export const Footer: FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={css.root}>
            <div className={css.infoSection}>
                {FOOTER_SECTIONS.map(section => (
                    <Flex
                        key={section.title}
                        direction="column"
                        gap="2"
                        className={css.bottomSection}
                    >
                        <Text className={css.sectionTitle}>
                            {section.title}
                        </Text>
                        {section.contents.map(content => {
                            const uniqueKey =
                                typeof content === 'string'
                                    ? content
                                    : content.label;

                            return (
                                <Text key={uniqueKey} size="2">
                                    {typeof content === 'string' ? (
                                        content
                                    ) : (
                                        <>
                                            {content.label}:{' '}
                                            <a
                                                href={`mailto:${content.email}`}
                                                className={css.itLink}
                                            >
                                                {content.email}
                                            </a>
                                        </>
                                    )}
                                </Text>
                            );
                        })}
                    </Flex>
                ))}

                <Flex direction="column" gap="2" className={css.bottomSection}>
                    <Text className={css.sectionTitle}>Join UvO</Text>
                    <Text size="2">Want to play volleyball with us?</Text>
                    <Link
                        href={FORMS.SIGN_UP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={css.signUpLink}
                    >
                        Sign up here →
                    </Link>
                </Flex>
            </div>

            <Separator my="4" size="4" className={css.separator} />

            <Flex
                direction="column"
                align="center"
                gap="4"
                className={css.sponsorsWrapper}
            >
                <Text size="1" className={css.sponsorsTitle}>
                    Our Partners
                </Text>
                <Flex
                    wrap="wrap"
                    justify="center"
                    align="center"
                    gap="6"
                    className={css.sponsorsGrid}
                >
                    {SPONSORS.map(sponsor => (
                        <a
                            key={sponsor.name}
                            href={sponsor.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={css.sponsorLink}
                        >
                            <Image
                                src={sponsor.logo}
                                alt={sponsor.name}
                                width={140}
                                height={60}
                                className={css.sponsorLogo}
                            />
                        </a>
                    ))}
                </Flex>
            </Flex>

            <Separator my="4" size="4" className={css.separator} />

            <Flex
                direction="column"
                align="center"
                gap="2"
                className={css.bottom}
            >
                <Text size="1" className={css.copyright}>
                    © COPYRIGHT {currentYear} UvO Amsterdam.
                </Text>
                <Text size="1" className={css.credits}>
                    <Link asChild highContrast>
                        <NextLink href="/terms">Algemene voorwaarden</NextLink>
                    </Link>
                    {' | '}
                    Website made by{' '}
                    <a
                        href="mailto:itcommittee@uvo-amsterdam.nl"
                        className={css.itLink}
                    >
                        itcommittee@uvo-amsterdam.nl
                    </a>
                </Text>
            </Flex>
        </footer>
    );
};
