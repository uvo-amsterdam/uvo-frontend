import type { FC } from 'react';
import { Heading, Text } from '@radix-ui/themes';
import Image from 'next/image';
import Link from 'next/link';

import css from './hero-slideshow.module.scss';

const SLIDES = [
    { src: '/images/homepage/team-photo.jpeg', alt: 'UvO team photo' },
    { src: '/images/homepage/team-photo.jpeg', alt: 'UvO activities' },
    { src: '/images/homepage/team-photo.jpeg', alt: 'UvO volleyball' },
];

export const HeroSlideshow: FC = () => {
    return (
        <section className={css.root}>
            <div className={css.slidesTrack}>
                {SLIDES.map((slide, i) => (
                    <div
                        key={slide.alt}
                        className={css.slide}
                        style={{ animationDelay: `${i * 5}s` }}
                    >
                        <Image
                            src={slide.src}
                            alt={slide.alt}
                            fill
                            priority={i === 0}
                            sizes="100vw"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                ))}
            </div>

            <div className={css.overlay} />

            <div className={css.content}>
                <Heading as="h1" className={css.title}>
                    Welcome to{' '}
                    <span className={css.highlight}>UvO Amsterdam</span>
                </Heading>
                <Text as="p" className={css.subtitle}>
                    Volleyball, borrels, tournaments & lifelong friendships —
                    since 1997
                </Text>
                <div className={css.actions}>
                    <Link href="/sign-up" className={css.primaryBtn}>
                        Join UvO
                    </Link>
                    <Link href="#about" className={css.secondaryBtn}>
                        What's UvO? ↓
                    </Link>
                </div>
            </div>
        </section>
    );
};
