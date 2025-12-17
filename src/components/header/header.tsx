import type { FC } from 'react';
import { NAVIGATION } from '@constants/navigation';
import { Link } from '@radix-ui/themes';
import Image from 'next/image';

import css from './header.module.scss';

export const Header: FC = () => {
    return (
        <header className={css.root}>
            <meta
                name="viewport"
                content="minimum-scale=1.0, initial-scale=1.0, width=device-width, user-scalable=no"
            />
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
                {NAVIGATION.map(navLink => (
                    <Link
                        key={navLink.link}
                        href={navLink.link}
                        underline="hover"
                        className={css.navLink}
                    >
                        {navLink.title}
                    </Link>
                ))}
            </div>
        </header>
    );
};
