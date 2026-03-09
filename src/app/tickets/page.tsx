import type { FC } from 'react';
import { Heading, Text } from '@radix-ui/themes';
import { IconTicket } from '@tabler/icons-react';

import css from './page.module.scss';

const WETICKET_URL = 'https://uvo-amsterdam.weticket.com/';

const TicketsPage: FC = () => {
    return (
        <div className={css.root}>
            {/* ── Hero Section ── */}
            <section className={css.hero}>
                <div className={css.heroContent}>
                    <IconTicket
                        size={44}
                        stroke={1.5}
                        className={css.heroIcon}
                    />
                    <Heading as="h1" className={css.title}>
                        Tickets
                    </Heading>
                    <Text as="p" size="4" className={css.subtitle}>
                        Get your tickets for upcoming UvO events — tournaments,
                        parties, and more. Browse available events and secure
                        your spot below.
                    </Text>
                </div>
            </section>

            {/* ── Ticket Embed ── */}
            <section className={css.embedSection}>
                <div className={css.embedContainer}>
                    <iframe
                        src={WETICKET_URL}
                        title="UvO Amsterdam — WeTicket"
                        className={css.iframe}
                        allow="payment"
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
                        Open in a new tab →
                    </a>
                </div>
            </section>
        </div>
    );
};

export default TicketsPage;
