import type { FC, ReactNode } from 'react';
import { Card } from '@components/card/card';
import { Text } from '@radix-ui/themes';

import css from './info-card.module.scss';

interface InfoCardProps {
    icon: ReactNode;
    label: string;
    values: string[];
    detail?: string;
    href?: string;
}

export const InfoCard: FC<InfoCardProps> = ({
    icon,
    label,
    values,
    detail,
    href,
}) => {
    return (
        <Card
            icon={icon}
            header={label}
            href={href}
            variant="accentLeft"
            external={Boolean(href)}
        >
            {values.map(v => (
                <Text key={v} size="3" weight="bold" className={css.value}>
                    {v}
                </Text>
            ))}
            {detail && (
                <Text size="2" className={css.detail}>
                    {detail}
                </Text>
            )}
        </Card>
    );
};
