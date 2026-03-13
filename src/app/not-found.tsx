import type { FC } from 'react';
import { Container, Flex, Heading, Text } from '@radix-ui/themes';
import {
    IconBallVolleyball,
    IconHome,
    IconMessage2,
    IconUserPlus,
} from '@tabler/icons-react';
import type { Metadata } from 'next';
import NextLink from 'next/link';

import css from './page.module.scss';

export const metadata: Metadata = {
    title: '404 - Out of Bounds — UvO Amsterdam',
};

const NotFoundPage: FC = () => {
    return (
        <div className={css.root}>
            <Container size="3">
                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    className={css.content}
                >
                    <div className={css.iconWrapper}>
                        <IconBallVolleyball
                            size={80}
                            stroke={1.5}
                            className={css.ballIcon}
                        />
                    </div>

                    <Heading as="h1" className={css.errorCode}>
                        404
                    </Heading>

                    <Heading as="h2" size="8" className={css.title}>
                        Out of Bounds!
                    </Heading>

                    <Text
                        size="4"
                        color="gray"
                        align="center"
                        className={css.description}
                    >
                        It looks like this page took a wrong turn at the net.
                        The resource you are looking for doesn&apos;t exist or
                        has moved.
                    </Text>

                    <div className={css.linkGrid}>
                        <NextLink href="/" className={css.navCard}>
                            <IconHome size={24} />
                            <span>Go Home</span>
                        </NextLink>

                        <NextLink href="/sign-up" className={css.navCard}>
                            <IconUserPlus size={24} />
                            <span>Sign Up</span>
                        </NextLink>

                        <NextLink href="/contact" className={css.navCard}>
                            <IconMessage2 size={24} />
                            <span>Contact Us</span>
                        </NextLink>
                    </div>

                    <NextLink href="/competition" className={css.simpleLink}>
                        Check match results instead →
                    </NextLink>
                </Flex>
            </Container>
        </div>
    );
};

export default NotFoundPage;
