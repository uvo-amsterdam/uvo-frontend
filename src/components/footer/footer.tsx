import React, { type FC } from 'react';
import { Link, Separator, Text } from '@radix-ui/themes';

import css from './footer.module.scss';

export const Footer: FC = () => {
    /**
     * TODO: Move info to constants file! (for translations etc.)
     * Change Algemene voorwaarden link to actual page
     */
    const footerInfo = [
        {
            title: 'Over UvO Amsterdam',
            contents: ['Een volleybal vereniging vol gezelligheid!'],
        },
        {
            title: 'Adres',
            contents: [
                'Uvo Amsterdam',
                'Science Park 306',
                '1098 XH Amsterdam',
            ],
        },
        {
            title: 'Contact',
            contents: [
                'Bestuur: bestuur@uvo-amsterdam.nl',
                'Technische Commissie (TC): tc@uvo-amsterdam.nl',
            ],
        },
    ];
    return (
        <footer className={css.root}>
            <div className={css.infoSection}>
                {footerInfo.map(info => (
                    <div key={info.title} className={css.bottomSection}>
                        <Text>{info.title}</Text>
                        {info.contents.map(content => (
                            <Text key={content}>{content}</Text>
                        ))}
                    </div>
                ))}
            </div>
            <Separator my="3" size="4" />
            <div className={css.bottom}>
                <div className={css.bottomSection}>
                    <Text size="1">
                        © COPYRIGHT {new Date().getFullYear()} UvO Amsterdam.
                    </Text>
                    <Text size="1">
                        <Link href="/" highContrast>
                            Algemene voorwaarden
                        </Link>{' '}
                        | Website made by itcommittee@uvo-amsterdam.nl
                    </Text>
                </div>
            </div>
        </footer>
    );
};
