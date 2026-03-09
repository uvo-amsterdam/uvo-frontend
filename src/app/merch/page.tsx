import type { FC } from 'react';
import { Button, Heading, Text } from '@radix-ui/themes';
import {
    IconBan,
    IconRulerMeasure,
    IconTemperatureSnow,
} from '@tabler/icons-react';
import Image from 'next/image';

import css from './page.module.scss';

const MERCH_LINK =
    'https://clubs.deventrade.com/nl/uvo-amsterdam/clubcollectie';

const MerchPage: FC = () => {
    return (
        <div className={css.root}>
            {/* ── Hero Section ── */}
            <section className={css.hero}>
                <div className={css.heroContent}>
                    <Heading as="h1" className={css.title}>
                        UvO Merch
                    </Heading>
                    <Text as="p" size="4" className={css.subtitle}>
                        Gear up with the official UvO Amsterdam collection —
                        custom-printed apparel for every volleyball lover. Plus,
                        UvO receives 10% cashback on every purchase, so your
                        merch also helps the association!
                    </Text>
                </div>
            </section>

            {/* ── Product Showcase ── */}
            <section className={css.showcase}>
                <div className={css.imageGrid}>
                    <div className={css.imageCard}>
                        <Image
                            src="/images/merch/image1.jpeg"
                            alt="UvO member wearing a custom jersey"
                            width={560}
                            height={560}
                            className={css.productImage}
                        />
                    </div>
                    <div className={css.imageCard}>
                        <Image
                            src="/images/merch/image2.jpeg"
                            alt="UvO member wearing a track jacket"
                            width={560}
                            height={560}
                            className={css.productImage}
                        />
                    </div>
                    <div className={css.imageCard}>
                        <Image
                            src="/images/merch/image3.jpeg"
                            alt="UvO members relaxing in custom apparel"
                            width={560}
                            height={560}
                            className={css.productImage}
                        />
                    </div>
                </div>
            </section>

            {/* ── Gear & Care (Sports Magazine Layout) ── */}
            <section className={css.gearAndCare}>
                <div className={css.gcHeader}>
                    <Heading as="h2" className={css.gcTitle}>
                        Gear & Care
                    </Heading>
                </div>
                <div className={css.gcContent}>
                    <div className={css.gcBullet}>
                        <IconTemperatureSnow
                            size={28}
                            stroke={1.5}
                            className={css.gcIcon}
                        />
                        <Text size="3" weight="medium">
                            Wash cold, no softener. Keep it out of the dryer.
                        </Text>
                    </div>
                    <div className={css.gcBullet}>
                        <IconRulerMeasure
                            size={28}
                            stroke={1.5}
                            className={css.gcIcon}
                        />
                        <Text size="3" weight="medium">
                            Sizes run small — we recommend sizing up!
                        </Text>
                    </div>
                    <div className={css.gcBullet}>
                        <IconBan
                            size={28}
                            stroke={1.5}
                            className={css.gcIcon}
                        />
                        <Text size="3" weight="medium">
                            Custom gear means we can't do refunds.
                        </Text>
                    </div>
                </div>
            </section>

            {/* ── Simple CTA ── */}
            <section className={css.cta}>
                <Button size="4" className={css.ctaButton} asChild>
                    <a
                        href={MERCH_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Shop the Collection →
                    </a>
                </Button>
            </section>
        </div>
    );
};

export default MerchPage;
