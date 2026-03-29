import '@styles/globals.scss';
import { Hero } from '@components/hero/hero';
import { LocationSection } from '@components/location-section/location-section';
import { BOARD } from '@constants/board';
import { FORMS } from '@constants/forms';
import { GENERAL_CONTACT } from '@constants/general-contact';
import { Heading, Link, Strong, Text } from '@radix-ui/themes';

import css from './page.module.scss';

const HERO_SUBTITLE = (
    <>
        Are you a student, do you love playing volleyball, but are you still in
        search of people to play with? Join UvO!
        <br />
        At the end of August / beginning of September there will be try-out
        training sessions again. Do you want to join one or multiple training
        sessions with UvO?
        <br />
        You can register now by filling in{' '}
        <Link href={FORMS.SIGN_UP} className={css.heroLink}>
            this form
        </Link>
        .
    </>
);

export default function Contact() {
    return (
        <div className={css.root}>
            <Hero title="Contact" subtitle={HERO_SUBTITLE} />
            <section className={css.info}>
                <div className={css.sectionHeader}>
                    <Heading as="h2" size="7">
                        Board 28 + General Contact Info
                    </Heading>
                </div>
                <div className={css.sectionContent}>
                    <Text size="3" weight="medium">
                        <Strong>Board 28:</Strong>
                        <br />
                        {BOARD.map(member => (
                            <Text key={member.email}>
                                {member.role}: {member.firstName}{' '}
                                {member.lastName} (
                                <Link href={`mailto:${member.email}`}>
                                    {member.email}
                                </Link>
                                {member.altEmail && (
                                    <>
                                        {' '}
                                        or{' '}
                                        <Link
                                            href={`mailto:${member.altEmail}`}
                                        >
                                            {member.altEmail}
                                        </Link>
                                    </>
                                )}
                                )
                                <br />
                            </Text>
                        ))}
                    </Text>
                    <Text as="p" size="3" weight="medium">
                        <Strong>Other important contact channels:</Strong>
                        <br />
                        {GENERAL_CONTACT.map(entry => (
                            <div key={entry.email}>
                                {entry.name}:{' '}
                                <Link href={`mailto:${entry.email}`}>
                                    {entry.email}
                                </Link>
                            </div>
                        ))}
                    </Text>
                </div>
            </section>
            <LocationSection />
        </div>
    );
}
