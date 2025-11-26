import type { FC } from 'react';
import Image from 'next/image';

import css from './header.module.scss';

export const Header: FC = () => {
    return (
        <header className={css.root}>
            <meta
                name="viewport"
                content="minimum-scale=1.0, initial-scale=1.0, width=device-width, user-scalable=no"
            />
            <Image
                src="/images/uvo-logo.jpeg"
                alt="UvO logo"
                width={100}
                height={100}
            />
        </header>
    );
};
