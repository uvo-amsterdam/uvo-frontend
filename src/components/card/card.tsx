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
    description?: string | ReactNode;
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
    const isLink = Boolean(href);
    const Tag = isLink ? (external ? 'a' : NextLink) : 'div';

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
                    <Text as="p" size="2" className={css.description}>
                        {description}
                    </Text>
                )}
                {children}
            </div>
        </>
    );

    const props = isLink
        ? {
              href: href as string,
              className: clsx(css.root, css[variant], className),
              ...(external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {}),
          }
        : {
              className: clsx(css.root, css[variant], className),
          };

    // @ts-expect-error - Tag can be a string or a component
    return <Tag {...props}>{content}</Tag>;
};
