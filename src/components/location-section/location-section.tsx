import type { FC } from 'react';
import { InfoCard } from '@components/info-card/info-card';
import { LOCATION } from '@constants/location';
import { Heading, Text } from '@radix-ui/themes';
import { IconBrandInstagram, IconClock, IconMapPin } from '@tabler/icons-react';

import css from './location-section.module.scss';

const LOCATION_CARDS = [
    {
        icon: <IconMapPin size={24} stroke={1.5} />,
        label: 'Training & Home Games',
        values: [LOCATION.name],
        detail: `${LOCATION.address}, ${LOCATION.postalCode}`,
    },
    {
        icon: <IconClock size={24} stroke={1.5} />,
        label: 'Training Schedule',
        values: ['Monday 18:00 – 23:20', 'Thursday 18:00 – 22:00'],
        detail: 'Home games mostly on Tuesdays',
    },
    {
        icon: <IconBrandInstagram size={24} stroke={1.5} />,
        label: 'Instagram',
        values: ['@uvoamsterdam'],
        detail: 'Follow us for updates & vibes',
        href: 'https://www.instagram.com/uvoamsterdam/',
    },
];

export const LocationSection: FC = () => {
    return (
        <section className={css.root}>
            <div className={css.container}>
                <div className={css.info}>
                    <Heading as="h2" className={css.title}>
                        Where to find us
                    </Heading>
                    <Text as="p" size="3" className={css.subtitle}>
                        Come visit us at our training location
                    </Text>

                    {LOCATION_CARDS.map(card => (
                        <InfoCard key={card.label} {...card} />
                    ))}
                </div>

                <div className={css.mapWrapper}>
                    <iframe
                        className={css.map}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.8066067251257!2d4.954128913190311!3d52.3557927482561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x416539ba7d6c7dc7%3A0xc11838c18d279568!2sUvO%20Amsterdam!5e0!3m2!1sen!2snl!4v1773755135419!5m2!1sen!2snl"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="USC Universum location"
                    />
                </div>
            </div>
        </section>
    );
};
