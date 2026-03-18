import { Hero } from '@components/hero/hero';
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
const IMAGES = [
    {
        src: '/images/merch/three-people-outfits.jpeg',
        alt: 'UvO member wearing a custom jersey',
    },
    {
        src: '/images/merch/top-down-shirt.jpeg',
        alt: 'UvO member wearing a track jacket',
    },
    {
        src: '/images/merch/two-people-field.jpeg',
        alt: 'UvO members relaxing in custom apparel',
    },
];

export default function MerchPage() {
    return (
        <div className={css.root}>
            <Hero
                title="UvO Merch"
                subtitle="Gear up with the official UvO Amsterdam collection — custom-printed apparel for every volleyball lover. Plus, UvO receives 10% cashback on every purchase, so your merch also helps the association!"
            />
            <section className={css.showcase}>
                <div className={css.imageGrid}>
                    {IMAGES.map(({ src, alt }) => (
                        <div key={src} className={css.imageCard}>
                            <Image
                                src={src}
                                alt={alt}
                                width={560}
                                height={560}
                                className={css.productImage}
                            />
                        </div>
                    ))}
                </div>
            </section>
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
            <section className={css.cta}>
                <Button size="4" className={css.ctaButton} asChild>
                    <a
                        href={MERCH_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Shop the Collection
                    </a>
                </Button>
            </section>
        </div>
    );
}
