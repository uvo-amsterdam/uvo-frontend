'use client';

import { type FC, useCallback, useEffect, useState } from 'react';
import { NAVIGATION } from '@constants/navigation';
import { Button, DropdownMenu, Link } from '@radix-ui/themes';
import { IconCaretDownFilled, IconMenu2, IconX } from '@tabler/icons-react';
import clsx from 'clsx';
import Image from 'next/image';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import css from './header.module.scss';

export const Header: FC = () => {
    const pathname = usePathname();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openGroup, setOpenGroup] = useState<string | null>(null);

    const closeSidebar = useCallback(() => {
        setSidebarOpen(false);
        setOpenGroup(null);
    }, []);

    useEffect(() => {
        closeSidebar();
    }, [closeSidebar]);

    useEffect(() => {
        document.body.style.overflow = sidebarOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [sidebarOpen]);

    const toggleGroup = (title: string) => {
        setOpenGroup(prev => (prev === title ? null : title));
    };

    return (
        <header className={css.root}>
            <div className={css.imageContainer}>
                <Link asChild>
                    <NextLink href={'/'}>
                        <Image
                            src="/images/logo/uvo-logo.jpeg"
                            alt="UvO logo"
                            fill={true}
                        />
                    </NextLink>
                </Link>
            </div>

            <nav className={css.navContainer}>
                {NAVIGATION.map(navLink => {
                    if (navLink.subPages) {
                        const isSubPageActive = navLink.subPages.some(
                            subPage => pathname === subPage.link,
                        );
                        return (
                            <DropdownMenu.Root key={navLink.title}>
                                <DropdownMenu.Trigger
                                    className={clsx(
                                        css.navButton,
                                        isSubPageActive && css.activeNav,
                                    )}
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
                                                    className={clsx(
                                                        css.dropdownLink,
                                                        isActive &&
                                                            css.activeDropdown,
                                                    )}
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
                            className={clsx(
                                css.navLink,
                                isActive && css.activeNav,
                            )}
                        >
                            <NextLink href={navLink.link}>
                                {navLink.title}
                            </NextLink>
                        </Link>
                    );
                })}
            </nav>

            <Button
                className={css.burgerIcon}
                variant="ghost"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
            >
                <IconMenu2 className={css.burgerIcon} size={24} />
            </Button>

            <div
                className={clsx(css.overlay, sidebarOpen && css.overlayOpen)}
                onClick={closeSidebar}
                onKeyDown={e => e.key === 'Escape' && closeSidebar()}
                tabIndex={-1}
                aria-hidden={true}
            />

            <nav
                className={clsx(css.sidebar, sidebarOpen && css.sidebarOpen)}
                aria-label="Mobile navigation"
                aria-modal={true}
                role="dialog"
            >
                <div className={css.sidebarHeader}>
                    <Image
                        src="/images/logo/uvo-logo.jpeg"
                        alt="UvO logo"
                        width={40}
                        height={40}
                    />
                    <Button
                        type="button"
                        className={css.sidebarCloseButton}
                        onClick={closeSidebar}
                        aria-label="Close menu"
                    >
                        <IconX size={24} />
                    </Button>
                </div>

                <div className={css.sidebarNav}>
                    {NAVIGATION.map(navLink => {
                        if (navLink.subPages) {
                            const isGroupOpen = openGroup === navLink.title;
                            const isGroupActive = navLink.subPages.some(
                                subPage => pathname === subPage.link,
                            );

                            return (
                                <div
                                    className={css.sidebarGroup}
                                    key={navLink.title}
                                >
                                    <Button
                                        className={clsx(
                                            css.sidebarGroupTrigger,
                                            isGroupActive &&
                                                css.sidebarLinkActive,
                                        )}
                                        onClick={() =>
                                            toggleGroup(navLink.title)
                                        }
                                        aria-expanded={isGroupOpen}
                                    >
                                        {navLink.title}
                                        <IconCaretDownFilled
                                            className={clsx(
                                                css.sidebarGroupIcon,
                                                isGroupOpen &&
                                                    css.sidebarGroupIconOpen,
                                            )}
                                            size={16}
                                            aria-hidden
                                        />
                                    </Button>
                                    <div
                                        className={clsx(
                                            css.sidebarSubLinks,
                                            isGroupOpen &&
                                                css.sidebarSubLinksOpen,
                                        )}
                                    >
                                        <div
                                            className={css.sidebarSubLinksInner}
                                        >
                                            {navLink.subPages.map(subPage => (
                                                <NextLink
                                                    key={subPage.link}
                                                    href={subPage.link}
                                                    className={clsx(
                                                        css.sidebarSubLink,
                                                        pathname ===
                                                            subPage.link &&
                                                            css.sidebarSubLinkActive,
                                                    )}
                                                >
                                                    {subPage.title}
                                                </NextLink>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        const isActive = pathname === navLink.link;

                        return (
                            <NextLink
                                key={navLink.link}
                                href={navLink.link}
                                className={clsx(
                                    css.sidebarLink,
                                    isActive && css.sidebarLinkActive,
                                )}
                            >
                                {navLink.title}
                            </NextLink>
                        );
                    })}
                </div>
            </nav>
        </header>
    );
};
