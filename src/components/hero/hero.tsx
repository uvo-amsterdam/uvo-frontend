import type { FC, ReactNode } from 'react';
import { Heading, Text } from '@radix-ui/themes';
import clsx from 'clsx';
import Image from 'next/image';

import css from './hero.module.scss';

export interface HeroProps {
    title: string;
    subtitle?: string;
    icon?: ReactNode;
    imageSrc?: string;
    imageAlt?: string;
    className?: string;
    priority?: boolean;
}

export const Hero: FC<HeroProps> = ({
    title,
    subtitle,
    icon,
    imageSrc,
    imageAlt,
    className,
    priority = false,
}) => {
    const isSolid = !imageSrc;

    return (
        <section
            className={clsx(
                css.hero,
                isSolid ? css.solid : css.image,
                className,
            )}
        >
            {imageSrc && (
                <>
                    <Image
                        src={imageSrc}
                        alt={imageAlt || title}
                        fill
                        priority={priority}
                        sizes="100vw"
                        className={css.heroBg}
                    />
                    <div className={css.heroScrim} />
                </>
            )}

            <div className={css.heroContent}>
                {icon && <div className={css.heroIcon}>{icon}</div>}

                <Heading as="h1" className={css.title}>
                    {title}
                </Heading>

                {subtitle && (
                    <Text as="p" size="4" className={css.subtitle}>
                        {subtitle}
                    </Text>
                )}
            </div>
        </section>
    );
};
