import type { FC } from 'react';
import { NAVIGATION } from '@constants/navigation';
import { DropdownMenu, Link } from '@radix-ui/themes';
import Image from 'next/image';
import NextLink from 'next/link';

import css from './header.module.scss';

export const Header: FC = () => {
    return (
        <header className={css.root}>
            <div className={css.imageContainer}>
                <Link href={'/'}>
                    <Image
                        src="/images/logo/uvo-logo.jpeg"
                        alt="UvO logo"
                        fill={true}
                    />
                </Link>
            </div>
            <div className={css.navContainer}>
                {NAVIGATION.map(navLink => {
                    if (navLink.subPages) {
                        return (
                            <DropdownMenu.Root key={navLink.title}>
                                <DropdownMenu.Trigger>
                                    <button
                                        type="button"
                                        className={css.navButton}
                                    >
                                        {navLink.title} ▾
                                    </button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content
                                    variant="solid"
                                    color="gray"
                                >
                                    {navLink.subPages.map(subPage => (
                                        <DropdownMenu.Item
                                            key={subPage.link}
                                            asChild
                                        >
                                            <NextLink
                                                href={subPage.link}
                                                className={css.dropdownLink}
                                            >
                                                {subPage.title}
                                            </NextLink>
                                        </DropdownMenu.Item>
                                    ))}
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        );
                    }
                    return (
                        <Link
                            key={navLink.link}
                            href={navLink.link}
                            underline="hover"
                            className={css.navLink}
                        >
                            {navLink.title}
                        </Link>
                    );
                })}
            </div>
        </header>
    );
};
