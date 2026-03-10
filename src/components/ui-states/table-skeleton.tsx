import type { FC } from 'react';

import css from './table-skeleton.module.scss';

interface TableSkeletonProps {
    rows?: number;
    marginTop?: boolean;
}

export const TableSkeleton: FC<TableSkeletonProps> = ({
    rows = 8,
    marginTop = false,
}) => {
    return (
        <div
            className={`${css.skeletonWrap} ${marginTop ? css.marginTop : ''}`}
        >
            {Array.from({ length: rows }).map((_, i) => (
                <div
                    key={`skeleton-${i.toString()}`}
                    className={css.skeletonRow}
                />
            ))}
        </div>
    );
};
