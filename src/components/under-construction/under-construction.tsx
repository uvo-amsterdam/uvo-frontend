import React, { type FC } from 'react';
import { Text } from '@radix-ui/themes';
import { IconBarrierBlockOff } from '@tabler/icons-react';

import css from './under-construction.module.scss';

export const UnderConstruction: FC = () => {
    return (
        <div className={css.root}>
            <IconBarrierBlockOff size={128} className={css.icon} />
            <Text>This page is under construction.</Text>
        </div>
    );
};
