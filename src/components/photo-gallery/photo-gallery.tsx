import type { FC } from 'react';
import { Heading, Text } from '@radix-ui/themes';
import Image from 'next/image';

import css from './photo-gallery.module.scss';

const PHOTOS = [
    {
        src: '/images/homepage/team-photo.jpeg',
        alt: 'Team at a tournament',
        span: 'wide',
    },
    {
        src: '/images/homepage/team-photo.jpeg',
        alt: 'UvO party night',
        span: 'normal',
    },
    {
        src: '/images/homepage/team-photo.jpeg',
        alt: 'Training session',
        span: 'normal',
    },
    {
        src: '/images/homepage/team-photo.jpeg',
        alt: 'Beach volleyball trip',
        span: 'normal',
    },
    {
        src: '/images/homepage/team-photo.jpeg',
        alt: 'Committee activity',
        span: 'normal',
    },
    {
        src: '/images/homepage/team-photo.jpeg',
        alt: 'Match day',
        span: 'wide',
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
