import type { FC } from 'react';
import { Heading, Text } from '@radix-ui/themes';
import Image from 'next/image';

import css from './photo-gallery.module.scss';

const PHOTOS = [
    {
        src: '/images/homepage/uvo-beer-impression.jpeg',
        alt: 'Beers with the team',
        span: 'wide',
    },
    {
        src: '/images/homepage/uvo-party-impression.jpeg',
        alt: 'UvO party night',
        span: 'normal',
    },
    {
        src: '/images/homepage/uvo-ski-outing.jpeg',
        alt: 'Ski trip with UvO',
        span: 'normal',
    },
    {
        src: '/images/gallery/super-saturday-set-2026.jpeg',
        alt: 'Super saturday - Setting skills',
        span: 'normal',
    },
    {
        src: '/images/gallery/champions.jpeg',
        alt: 'Champions',
        span: 'normal',
    },
    {
        src: '/images/gallery/super-saturday-2026.jpeg',
        alt: 'Super saturday - Team cheer',
        span: 'normal',
    },
    {
        src: '/images/merch/top-down-shirt.jpeg',
        alt: 'Cool merch',
        span: 'normal',
    },
];

export const PhotoGallery: FC = () => {
    return (
        <section className={css.root}>
            <div className={css.header}>
                <Heading as="h2" className={css.title}>
                    Life at UvO
                </Heading>
                <Text as="p" size="3" className={css.subtitle}>
                    Volleyball, borrels, tournaments, trips & more
                </Text>
            </div>
            <div className={css.grid}>
                {PHOTOS.map(photo => (
                    <div
                        key={photo.alt}
                        className={`${css.cell} ${photo.span === 'wide' ? css.wide : ''}`}
                    >
                        <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            style={{ objectFit: 'cover' }}
                            loading={'eager'}
                        />
                        <div className={css.caption}>
                            <Text size="2">{photo.alt}</Text>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
