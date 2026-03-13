import type { FC } from 'react';
import { Text } from '@radix-ui/themes';

import css from './table-empty-state.module.scss';

interface TableEmptyStateProps {
    message: string;
    marginTop?: boolean;
}

export const TableEmptyState: FC<TableEmptyStateProps> = ({
    message,
    marginTop = false,
}) => {
    return (
        <div className={`${css.empty} ${marginTop ? css.marginTop : ''}`}>
            <Text size="4" className={css.emptyText}>
                {message}
            </Text>
        </div>
    );
};
