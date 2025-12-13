import React, { type FC } from 'react';
import { Separator, Text } from '@radix-ui/themes';
import type { textPropDefs } from '@radix-ui/themes/components/text.props';

import css from './simple-title.module.scss';

type TextTransform = 'uppercase' | 'capitalize' | 'lowercase' | 'none';

interface SimpleTitleProps {
    title: string;
    textColor?: (typeof textPropDefs.color.values)[number];
    fontWeight?: (typeof textPropDefs.weight.values)[number];
    variant?: 'default' | 'filled';
    height?: string;
    textTransform?: TextTransform;
    fontSize?: (typeof textPropDefs.size.values)[number];
}

export const SimpleTitle: FC<SimpleTitleProps> = ({
    title,
    variant,
    textColor,
    fontWeight,
    fontSize,
    height,
    textTransform,
}) => {
    return (
        <div
            className={`${css.root} ${variant === 'filled' ? css.filled : ''}`}
            style={{ height: height }}
        >
            {variant !== 'filled' && <Separator className={css.divider} />}
            <Text
                align="center"
                size={fontSize}
                weight={fontWeight}
                className={css.title}
                color={textColor}
                style={textTransform ? { textTransform } : undefined}
            >
                {title}
            </Text>
            {variant !== 'filled' && <Separator className={css.divider} />}
        </div>
    );
};
