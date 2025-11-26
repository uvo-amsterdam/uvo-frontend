import type { FC } from 'react';

import css from './footer.module.scss';

export const Footer: FC = () => {
    return (
        <footer className={css.root}>
            <h1>Footer</h1>
        </footer>
    );
};
