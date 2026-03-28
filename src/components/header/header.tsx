'use client';

import React, {
    type ComponentPropsWithoutRef,
    type FC,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { NAVIGATION } from '@constants/navigation';
import { Button, Link } from '@radix-ui/themes';
import { IconCaretDownFilled, IconMenu2, IconX } from '@tabler/icons-react';
import clsx from 'clsx';
import Image from 'next/image';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationMenu } from 'radix-ui';

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

            <IconMenu2
                className={css.burgerIcon}
                size={24}
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
            />

            <div
                className={clsx(css.overlay, sidebarOpen && css.overlayOpen)}
                onClick={closeSidebar}
                onKeyDown={e => e.key === 'Escape' && closeSidebar()}
                role="dialog"
            />

            <nav
                className={clsx(css.sidebar, sidebarOpen && css.sidebarOpen)}
                aria-label="Mobile navigation"
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
