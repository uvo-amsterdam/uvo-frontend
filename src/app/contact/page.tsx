import { CopyableEmail } from '@components/copyable-email/copyable-email';
import { Hero } from '@components/hero/hero';
import { LocationSection } from '@components/location-section/location-section';
import { BOARD } from '@constants/board';
import { GENERAL_CONTACT } from '@constants/general-contact';
import { Heading, Link, Text } from '@radix-ui/themes';

import css from './page.module.scss';

const HERO_SUBTITLE = (
    <>
        Need to reach the board or a specific committee? Find all our contact
        details below.
        <br />
        <br />
        Looking to join the association?{' '}
        <Link
            href="/sign-up"
            style={{ color: 'inherit', textDecoration: 'underline' }}
        >
            Head over to our Sign-Up page.
        </Link>
    </>
);

export default function Contact() {
    return (
        <div className={css.root}>
            <Hero title="Contact" subtitle={HERO_SUBTITLE} />

            <section className={css.info}>
                {/* Board subsection */}
                <div className={css.subsection}>
                    <Heading as="h2" className={css.sectionHeader}>
                        Board 28
                    </Heading>
                    <div className={css.contactBlock}>
                        {BOARD.map(member => (
                            <div key={member.email} className={css.contactRow}>
                                <div className={css.contactRowLeft}>
                                    <Text
                                        size="2"
                                        weight="bold"
                                        className={css.rowRole}
                                    >
                                        {member.role}
                                    </Text>
                                    {member.firstName && (
                                        <Text size="3" className={css.rowName}>
                                            {member.firstName} {member.lastName}
                                        </Text>
                                    )}
                                </div>
                                <div className={css.contactRowRight}>
                                    <CopyableEmail email={member.email} />
                                    {member.altEmail && (
                                        <CopyableEmail
                                            email={member.altEmail}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* General contact subsection */}
                <div className={css.subsection}>
                    <Heading as="h2" className={css.sectionHeader}>
                        Other Contact Channels
                    </Heading>
                    <div className={css.contactBlock}>
                        {GENERAL_CONTACT.map(entry => (
                            <div key={entry.email} className={css.contactRow}>
                                <div className={css.contactRowLeft}>
                                    <Text
                                        size="2"
                                        weight="bold"
                                        className={css.rowRole}
                                    >
                                        {entry.name}
                                    </Text>
                                </div>
                                <div className={css.contactRowRight}>
                                    <CopyableEmail email={entry.email} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <LocationSection />
        </div>
    );
}
