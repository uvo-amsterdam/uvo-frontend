import type { FC } from 'react';
import { Hero } from '@components/hero/hero';
import { Text } from '@radix-ui/themes';
import { IconTicket } from '@tabler/icons-react';

import css from './page.module.scss';

const WETICKET_URL = 'https://uvo-amsterdam.weticket.com/';

const TicketsPage: FC = () => {
    return (
        <div className={css.root}>
            <Hero
                title="Tickets"
                subtitle="Get your tickets for upcoming UvO events — tournaments, parties, and more. Browse available events and secure your spot below."
                icon={<IconTicket size={44} stroke={1.5} />}
            />

            <section className={css.embedSection}>
                <div className={css.embedContainer}>
                    <iframe
                        src={WETICKET_URL}
                        title="UvO Amsterdam — WeTicket"
                        className={css.iframe}
                        allow="payment"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
                <div className={css.fallback}>
                    <Text size="2" className={css.fallbackText}>
                        Can&apos;t see the ticket shop?
                    </Text>
                    <a
                        href={WETICKET_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={css.fallbackLink}
                    >
                        Open in a new tab
                    </a>
                </div>
            </section>
        </div>
    );
};

export default TicketsPage;
