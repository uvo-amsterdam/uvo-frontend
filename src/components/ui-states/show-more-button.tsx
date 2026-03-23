'use client';

import type { FC } from 'react';
import { Button } from '@radix-ui/themes';

import css from './show-more-button.module.scss';

interface ShowMoreButtonProps {
    onClick: () => void;
    label: string;
    visible: boolean;
}

export const ShowMoreButton: FC<ShowMoreButtonProps> = ({
    onClick,
    label,
    visible,
}) => {
    if (!visible) return null;

    return (
        <div className={css.showMoreWrap}>
            <Button
                variant="soft"
                size="3"
                onClick={onClick}
                className={css.showMoreBtn}
            >
                {label}
            </Button>
        </div>
    );
};
