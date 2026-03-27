'use client';

import React, { type ComponentPropsWithoutRef, type FC } from 'react';
import { NAVIGATION } from '@constants/navigation';
import { Link } from '@radix-ui/themes';
import { IconCaretDownFilled } from '@tabler/icons-react';
import clsx from 'clsx';
import Image from 'next/image';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationMenu } from 'radix-ui';

import css from './header.module.scss';

export const Header: FC = () => {
    const pathname = usePathname();

    return (
        <header className={css.root}>
            <div className={css.imageContainer}>
                <Link asChild>
                    <NextLink href="/">
                        <Image
                            src="/images/logo/uvo-logo.jpeg"
                            alt="UvO logo"
                            fill={true}
                        />
                    </NextLink>
                </Link>
            </div>
            <NavigationMenu.Root className={css.base}>
                <NavigationMenu.List className={css.menuList}>
                    {NAVIGATION.map(navLink => {
                        if (navLink.subPages) {
                            return (
                                <NavigationMenu.Item key={navLink.title}>
                                    <NavigationMenu.Trigger
                                        className={css.trigger}
                                    >
                                        {navLink.title}{' '}
                                        <IconCaretDownFilled
                                            className={css.caretDown}
                                            aria-hidden
                                            size="16"
                                        />
                                    </NavigationMenu.Trigger>
                                    <NavigationMenu.Content
                                        className={css.content}
                                    >
                                        <ul className={css.list}>
                                            {navLink.subPages.map(subPage => (
                                                <ListItem
                                                    key={subPage.link}
                                                    href={subPage.link}
                                                    title={subPage.title}
                                                    active={
                                                        pathname ===
                                                        subPage.link
                                                    }
                                                >
                                                    {subPage.subtitle}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </NavigationMenu.Content>
                                </NavigationMenu.Item>
                            );
                        }

                        const isActive = pathname === navLink.link;

                        return (
                            <NavigationMenu.Item key={navLink.link}>
                                <NavigationMenu.Link
                                    asChild
                                    className={clsx(
                                        css.link,
                                        isActive && css.activeNav,
                                    )}
                                >
                                    <NextLink href={navLink.link}>
                                        {navLink.title}
                                    </NextLink>
                                </NavigationMenu.Link>
                            </NavigationMenu.Item>
                        );
                    })}

                    <NavigationMenu.Indicator className={css.indicator}>
                        <div className={css.arrow} />
                    </NavigationMenu.Indicator>
                </NavigationMenu.List>

                <div className={css.viewportPosition}>
                    <NavigationMenu.Viewport className={css.viewport} />
                </div>
            </NavigationMenu.Root>
        </header>
    );
};

interface ListItemProps extends ComponentPropsWithoutRef<'a'> {
    title: string;
    active?: boolean;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
    ({ className, children, title, active, ...props }, forwardedRef) => (
        <li>
            <NavigationMenu.Link asChild active={active}>
                <a
                    className={clsx(css.listItemLink, className)}
                    {...props}
                    ref={forwardedRef}
                >
                    <div className={css.listItemHeading}>{title}</div>
                    <p className={css.listItemText}>{children}</p>
                </a>
            </NavigationMenu.Link>
        </li>
    ),
);

ListItem.displayName = 'ListItem';
