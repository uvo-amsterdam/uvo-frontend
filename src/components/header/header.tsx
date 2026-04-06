'use client';

import type { FC } from 'react';
import { NAVIGATION } from '@constants/navigation';
import { DropdownMenu, Link } from '@radix-ui/themes';
import Image from 'next/image';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import css from './header.module.scss';

export const Header: FC = () => {
    const pathname = usePathname();

    return (
        <header className={css.root}>
            <div className={css.imageContainer}>
                <Link asChild>
                    <NextLink href={'/'}>
                        <Image
                            src="/images/logo/uvo-logo.jpeg"
                            alt="UvO logo"
                            fill={true}
                            sizes="auto"
                        />
                    </NextLink>
                </Link>
            </div>
            <div className={css.navContainer}>
                {NAVIGATION.map(navLink => {
                    if (navLink.subPages) {
                        const isSubPageActive = navLink.subPages.some(
                            subPage => pathname === subPage.link,
                        );
                        return (
                            <DropdownMenu.Root key={navLink.title}>
                                <DropdownMenu.Trigger
                                    className={`${css.navButton} ${isSubPageActive ? css.activeNav : ''}`}
                                >
                                    <span>{navLink.title} ▾</span>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content
                                    variant="solid"
                                    color="gray"
                                >
                                    {navLink.subPages.map(subPage => {
                                        const isActive =
                                            pathname === subPage.link;
                                        return (
                                            <DropdownMenu.Item
                                                key={subPage.link}
                                                asChild
                                            >
                                                <NextLink
                                                    href={subPage.link}
                                                    className={`${css.dropdownLink} ${isActive ? css.activeDropdown : ''}`}
                                                >
                                                    {subPage.title}
                                                </NextLink>
                                            </DropdownMenu.Item>
                                        );
                                    })}
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        );
                    }
                    const isActive = pathname === navLink.link;
                    return (
                        <Link
                            key={navLink.link}
                            asChild
                            underline="hover"
                            className={`${css.navLink} ${isActive ? css.activeNav : ''}`}
                        >
                            <NextLink href={navLink.link}>
                                {navLink.title}
                            </NextLink>
                        </Link>
                    );
                })}
            </div>
        </header>
    );
};
