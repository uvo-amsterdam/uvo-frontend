import type { FC, ReactNode } from 'react';
import { Heading, Text } from '@radix-ui/themes';
import clsx from 'clsx';
import NextLink from 'next/link';

import css from './card.module.scss';

export type CardVariant =
    | 'default'
    | 'accentLeft'
    | 'accentBottom'
    | 'bordered'
    | 'centered'
    | 'ghost';

interface CardProps {
    title?: string;
    header?: string;
    description?: ReactNode;
    icon?: ReactNode;
    href?: string;
    variant?: CardVariant;
    className?: string;
    external?: boolean;
    children?: ReactNode;
}

export const Card: FC<CardProps> = ({
    title,
    header,
    description,
    icon,
    href,
    variant = 'default',
    className,
    external,
    children,
}) => {
    const content = (
        <>
            {icon && <div className={css.icon}>{icon}</div>}
            <div className={css.body}>
                {header && (
                    <Text size="1" weight="bold" className={css.header}>
                        {header}
                    </Text>
                )}
                {title && (
                    <Heading as="h3" size="4" className={css.title}>
                        {title}
                    </Heading>
                )}
                {description && (
                    <Text size="2" className={css.description}>
                        {description}
                    </Text>
                )}
                {children}
            </div>
        </>
    );

    const rootClassName = clsx(css.root, css[variant], className);

    if (external && href) {
        return (
            <a
                href={href}
                className={rootClassName}
                target="_blank"
                rel="noopener noreferrer"
            >
                {content}
            </a>
        );
    }

    if (href) {
        return (
            <NextLink href={href} className={rootClassName}>
                {content}
            </NextLink>
        );
    }

    return <div className={rootClassName}>{content}</div>;
};
