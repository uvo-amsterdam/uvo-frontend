import { Card } from '@components/card/card';
import { Container, Flex, Heading, Text } from '@radix-ui/themes';
import {
    IconArrowRight,
    IconBallVolleyball,
    IconHome,
    IconMessage2,
    IconUserPlus,
} from '@tabler/icons-react';
import type { Metadata } from 'next';
import NextLink from 'next/link';

import css from '@styles/not-found.module.scss';

export const metadata: Metadata = {
    title: '404 - Out of Bounds — UvO Amsterdam',
};

export default function NotFound() {
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
                        <Card
                            href="/"
                            variant="centered"
                            title="Go Home"
                            icon={<IconHome size={24} />}
                        />

                        <Card
                            href="/sign-up"
                            variant="centered"
                            title="Sign Up"
                            icon={<IconUserPlus size={24} />}
                        />

                        <Card
                            href="/contact"
                            variant="centered"
                            title="Contact Us"
                            icon={<IconMessage2 size={24} />}
                        />
                    </div>

                    <NextLink href="/competition" className={css.simpleLink}>
                        Check match results instead <IconArrowRight />
                    </NextLink>
                </Flex>
            </Container>
        </div>
    );
}
