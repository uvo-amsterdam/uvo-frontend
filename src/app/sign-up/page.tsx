import type { FC } from 'react';
import { CopyableEmail } from '@components/copyable-email/copyable-email';
import { Hero } from '@components/hero/hero';
import { FORMS } from '@constants/forms';
import { GENERAL_CONTACT } from '@constants/general-contact';
import { Callout, Heading, Link, Text } from '@radix-ui/themes';
import { IconInfoCircle } from '@tabler/icons-react';
import type { Metadata } from 'next';
import Image from 'next/image';

import css from './page.module.scss';

export const metadata: Metadata = {
    title: 'Sign Up — UvO Amsterdam',
    description:
        'Join UvO Amsterdam! Sign up for volleyball tryouts, find your team, and become part of our 250+ member student community.',
};

export const revalidate = 86400; // 1 day

/**
 * Returns the upcoming tryout period label based on the current date.
 *  - After Jan 8  -> "May"
 *  - After May 15 -> "August/September"
 *  - After Sep 15 -> "January"
 */
function getNextTryoutMonth(): string {
    const now = new Date();
    const month = now.getMonth(); // 0-indexed
    const day = now.getDate();

    // Sep 16 - Jan 8  -> January
    if (month > 8 || (month === 8 && day > 15) || (month === 0 && day <= 8)) {
        return 'January';
    }
    // Jan 9 - May 15  -> May
    if (month < 4 || (month === 4 && day <= 15)) {
        return 'May';
    }
    // May 16 - Sep 15 -> August/September
    return 'August/September';
}

const COMPETITION_ROWS = [
    {
        period: 'Whole year (Sep-Jun)',
        student: '€ 235,-',
        nonStudent: '€ 355,-',
    },
    {
        period: 'Half year (Sep-Dec)',
        student: '€ 105,-',
        nonStudent: '€ 157,50',
    },
    {
        period: 'Half year (Jan-Jun)',
        student: '€ 155,-',
        nonStudent: '€ 240,-',
    },
    {
        period: 'Third Division surcharge',
        student: '€ 30,-',
        nonStudent: '€ 30,-',
    },
];

const TRAINING_ONLY_ROWS = [
    {
        period: 'Whole year (Sep-Jun)',
        student: '€ 145,-',
        nonStudent: '€ 220,-',
    },
    { period: 'Half year (Sep-Dec)', student: '€ 62,50', nonStudent: '€ 95,-' },
    { period: 'Half year (Jan-Jun)', student: '€ 95,-', nonStudent: '€ 140,-' },
    {
        period: 'Third Division surcharge',
        student: '€ 15,-',
        nonStudent: '€ 15,-',
    },
];

const BEGINNERS_ROWS = [
    {
        period: 'Whole year (Sep-Jun)',
        student: '€ 110,-',
        nonStudent: '€ 160,-',
    },
    { period: 'Half year (Sep-Jan)', student: '€ 47,50', nonStudent: '€ 75,-' },
    { period: 'Half year (Jan-Jun)', student: '€ 70,-', nonStudent: '€ 140,-' },
];

const SignUpPage: FC = () => {
    const tryoutMonth = getNextTryoutMonth();
    const isMayTryoutPeriod = tryoutMonth === 'May';
    const isSurcharge = (period: string) =>
        period.toLowerCase().includes('surcharge');

    return (
        <div className={css.root}>
            <Hero
                title="Sign Up"
                subtitle="Are you a student and ready to hit the court? Sign up for our tryouts and find out what UvO is all about!"
                imageSrc="/images/homepage/team-photo.jpeg"
                imageAlt="UvO Amsterdam team celebrating together"
            />

            <section className={css.whySection}>
                <div className={css.whyText}>
                    <Heading as="h2" className={css.sectionTitle}>
                        Why UvO?
                    </Heading>
                    <div className={css.sellingPoints}>
                        <div className={css.point}>
                            <span className={css.pointNumber}>01</span>
                            <div className={css.pointText}>
                                <Text as="p" size="3" weight="medium">
                                    Love volleyball but haven&apos;t found your
                                    people yet? We have teams at every level -
                                    from first-timers to seasoned players
                                    who&apos;ve been spiking since they could
                                    walk.
                                </Text>
                            </div>
                        </div>
                        <div className={css.point}>
                            <span className={css.pointNumber}>02</span>
                            <div className={css.pointText}>
                                <Text as="p" size="3" weight="medium">
                                    With 250+ members across 15 teams, UvO
                                    isn&apos;t just a volleyball club -
                                    it&apos;s one of the most international
                                    student communities in Amsterdam. Think
                                    parties, tournaments, weekends away, and two
                                    hundred new friends from all over the world.
                                </Text>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={css.whyPhoto}>
                    <Image
                        src="/images/merch/top-down-shirt.jpeg"
                        alt="UvO members posing in the sports hall"
                        width={520}
                        height={640}
                        className={css.whyImage}
                    />
                </div>
            </section>

            <section className={css.tryoutBand}>
                <div className={css.tryoutInner}>
                    <Heading as="h2" className={css.tryoutHeadline}>
                        Next tryouts: {tryoutMonth}
                    </Heading>
                    {isMayTryoutPeriod ? (
                        <Text as="p" size="3" className={css.tryoutBody}>
                            We're currently mid-season! Our May tryouts are
                            reserved for <b>existing members</b>, but we are
                            always looking for top-tier talent. If you are a{' '}
                            <b>1st Class player or above</b>, we'd love to have
                            you join us!
                            <br />
                            Please reach out to the {GENERAL_CONTACT.TC.name}{' '}
                            at:
                            <CopyableEmail
                                email={GENERAL_CONTACT.TC.email}
                                className={css.emailSelector}
                            />
                            <br />
                            <br />
                            <b>Not there yet? No problem!</b> We'll be hosting
                            open tryouts for all players again in{' '}
                            <b>August and September</b>. See you then!
                        </Text>
                    ) : (
                        <Text as="p" size="3" className={css.tryoutBody}>
                            Interested? Fill in the sign-up form and our
                            Technical Committee will reach out to you with all
                            the details. Keep in mind that you need to be a
                            student to apply, and signing up doesn&apos;t
                            guarantee a spot - it depends on the total number of
                            applicants.
                        </Text>
                    )}
                    {!isMayTryoutPeriod && (
                        <Link
                            href={FORMS.SIGN_UP}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={css.ctaButton}
                        >
                            Sign up for tryouts
                        </Link>
                    )}
                </div>
            </section>

            <section className={css.pricing}>
                <div className={css.pricingHeader}>
                    <Heading as="h2" className={css.sectionTitle}>
                        Membership Fees 2025-2026
                    </Heading>
                </div>

                <div className={css.tableBlock}>
                    <Heading as="h3" className={css.tableLabel}>
                        Competition
                    </Heading>
                    <div className={css.tableWrapper}>
                        <table className={css.feeTable}>
                            <caption className={css.visuallyHidden}>
                                Membership fees for Competition teams
                            </caption>
                            <thead>
                                <tr>
                                    <th scope="col">Period</th>
                                    <th scope="col">Student</th>
                                    <th scope="col">Non-student</th>
                                </tr>
                            </thead>
                            <tbody>
                                {COMPETITION_ROWS.map(r => (
                                    <tr
                                        key={r.period}
                                        className={
                                            isSurcharge(r.period)
                                                ? css.surcharge
                                                : undefined
                                        }
                                    >
                                        <td>{r.period}</td>
                                        <td>{r.student}</td>
                                        <td>{r.nonStudent}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={css.tableBlock}>
                    <Heading as="h3" className={css.tableLabel}>
                        Training Only
                    </Heading>
                    <div className={css.tableWrapper}>
                        <table className={css.feeTable}>
                            <caption className={css.visuallyHidden}>
                                Membership fees for Training only
                            </caption>
                            <thead>
                                <tr>
                                    <th scope="col">Period</th>
                                    <th scope="col">Student</th>
                                    <th scope="col">Non-student</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TRAINING_ONLY_ROWS.map(r => (
                                    <tr
                                        key={r.period}
                                        className={
                                            isSurcharge(r.period)
                                                ? css.surcharge
                                                : undefined
                                        }
                                    >
                                        <td>{r.period}</td>
                                        <td>{r.student}</td>
                                        <td>{r.nonStudent}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={css.tableBlock}>
                    <Heading as="h3" className={css.tableLabel}>
                        Beginners
                    </Heading>
                    <div className={css.tableWrapper}>
                        <table className={css.feeTable}>
                            <caption className={css.visuallyHidden}>
                                Membership fees for Beginners course
                            </caption>
                            <thead>
                                <tr>
                                    <th scope="col">Period</th>
                                    <th scope="col">Student</th>
                                    <th scope="col">Non-student</th>
                                </tr>
                            </thead>
                            <tbody>
                                {BEGINNERS_ROWS.map(r => (
                                    <tr
                                        key={r.period}
                                        className={
                                            isSurcharge(r.period)
                                                ? css.surcharge
                                                : undefined
                                        }
                                    >
                                        <td>{r.period}</td>
                                        <td>{r.student}</td>
                                        <td>{r.nonStudent}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Callout.Root className={css.pricingNote}>
                    <Callout.Icon>
                        <IconInfoCircle
                            size={20}
                            stroke={1.5}
                            className={css.noteIcon}
                        />
                    </Callout.Icon>
                    <Callout.Text className={css.noteText}>
                        Non-student rates only apply to members who were still a
                        student at the time of their original registration.
                    </Callout.Text>
                </Callout.Root>
            </section>
        </div>
    );
};

export default SignUpPage;
