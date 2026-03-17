import type { FC, ReactNode } from 'react';
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
    const content = (
        <>
            <div className={css.icon}>{icon}</div>
            <div className={css.body}>
                <Text size="1" weight="bold" className={css.label}>
                    {label}
                </Text>
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
            </div>
        </>
    );

    if (href) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={css.root}
            >
                {content}
            </a>
        );
    }

    return <div className={css.root}>{content}</div>;
};
