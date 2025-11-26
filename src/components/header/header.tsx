import React, { type FC } from 'react';
import Image from 'next/image';

import css from './header.module.scss';

export const Header: FC = () => {
    return (
        <header className={css.root}>
            {/*<meta*/}
            {/*    name="viewport"*/}
            {/*    content="minimum-scale=1.0, initial-scale=1.0, width=device-width, user-scalable=no"*/}
            {/*/>*/}
            <Image
                src="/images/uvo-logo.jpeg"
                alt="UvO logo"
                width={50}
                height={50}
            />
            <h1>Header</h1>
        </header>
    );
};
