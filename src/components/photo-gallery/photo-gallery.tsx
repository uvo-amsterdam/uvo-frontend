import type { FC } from 'react';
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
    { src: '/images/homepage/team-photo.jpeg', alt: 'Match day', span: 'wide' },
];

export const PhotoGallery: FC = () => {
    return (
        <section className={css.root}>
            <div className={css.header}>
                <h2 className={css.title}>Life at UvO</h2>
                <p className={css.subtitle}>
                    Volleyball, borrels, tournaments, trips & more
                </p>
            </div>
            <div className={css.grid}>
                {PHOTOS.map((photo, i) => (
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
                            <span>{photo.alt}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
