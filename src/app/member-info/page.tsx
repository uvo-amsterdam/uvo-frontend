import type { FC } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { Heading, Text } from '@radix-ui/themes';
import {
    IconChevronDown,
    IconFileText,
    IconReceipt2,
    IconShieldCheck,
} from '@tabler/icons-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import NextLink from 'next/link';

import css from './page.module.scss';

export const metadata: Metadata = {
    title: 'Member Info — UvO Amsterdam',
    description:
        'Information and resources for UvO Amsterdam members including DWF guidelines, confidential persons, and important documents.',
};

const MemberInfoPage: FC = () => {
    return (
        <div className={css.root}>
            {/* ── Hero Section ── */}
            <section className={css.hero}>
                <Image
                    src="/images/homepage/team-photo.jpeg"
                    alt="UvO Amsterdam members"
                    fill
                    priority
                    className={css.heroBg}
                />
                <div className={css.heroScrim} />
                <div className={css.heroContent}>
                    <Heading as="h1" className={css.title}>
                        Member Info
                    </Heading>
                </div>
            </section>

            {/* ── DWF Duties Accordion ── */}
            <section className={css.infoSection}>
                <div className={css.infoHeading}>
                    <Heading as="h2" className={css.sectionTitle}>
                        DWF Match Duties
                    </Heading>
                </div>
                <div className={css.infoContent}>
                    <Accordion.Root
                        type="multiple"
                        className={css.accordionRoot}
                    >
                        {/* ── Captains ── */}
                        <Accordion.Item
                            value="captain"
                            className={css.accordionItem}
                        >
                            <Accordion.Header className={css.accordionHeader}>
                                <Accordion.Trigger
                                    className={css.accordionTrigger}
                                >
                                    <Heading
                                        as="h3"
                                        size="5"
                                        className={css.accordionTriggerText}
                                    >
                                        Match Duties as Captain
                                    </Heading>
                                    <IconChevronDown
                                        size={24}
                                        className={css.accordionChevron}
                                        aria-hidden
                                    />
                                </Accordion.Trigger>
                            </Accordion.Header>
                            <Accordion.Content className={css.accordionContent}>
                                <div className={css.stepList}>
                                    <div className={css.step}>
                                        <span className={css.stepNumber}>
                                            01
                                        </span>
                                        <div className={css.stepText}>
                                            <Text
                                                as="p"
                                                size="3"
                                                weight="medium"
                                            >
                                                Go to{' '}
                                                <a
                                                    href="https://dwf.volleybal.nl"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    dwf.volleybal.nl
                                                </a>{' '}
                                                or use Nevobo&apos;s &quot;Mijn
                                                Competitie&quot; app.
                                            </Text>
                                        </div>
                                    </div>
                                    <div className={css.step}>
                                        <span className={css.stepNumber}>
                                            02
                                        </span>
                                        <div className={css.stepText}>
                                            <Text
                                                as="p"
                                                size="3"
                                                weight="medium"
                                            >
                                                Log in with your Nevobo account
                                                (linked to your player code). If
                                                you need your code, ask the
                                                board or during the DWF course.
                                            </Text>
                                        </div>
                                    </div>
                                    <div className={css.step}>
                                        <span className={css.stepNumber}>
                                            03
                                        </span>
                                        <div className={css.stepText}>
                                            <Text
                                                as="p"
                                                size="3"
                                                weight="medium"
                                            >
                                                Select your game and click
                                                &quot;standaardteam
                                                ophalen&quot; to import your
                                                team. Use &quot;spelers
                                                beheren&quot; to remove absent
                                                players or add substitutes by
                                                searching their name or code.
                                                Best done in advance!
                                            </Text>
                                        </div>
                                    </div>
                                    <div className={css.step}>
                                        <span className={css.stepNumber}>
                                            04
                                        </span>
                                        <div className={css.stepText}>
                                            <Text
                                                as="p"
                                                size="3"
                                                weight="medium"
                                            >
                                                Verify the captain, libero, and
                                                that shirt numbers are correct.
                                                Edit via double-clicking in
                                                &quot;spelers beheren&quot;.
                                            </Text>
                                        </div>
                                    </div>
                                    <div className={css.step}>
                                        <span className={css.stepNumber}>
                                            05
                                        </span>
                                        <div className={css.stepText}>
                                            <Text
                                                as="p"
                                                size="3"
                                                weight="medium"
                                            >
                                                Immediately after the game,
                                                verify results and players with
                                                the referee and opposing
                                                captain. Check the box at the
                                                bottom to OK it. Mistakes?
                                                Notify the wedstrijdsecretariaat
                                                immediately!
                                            </Text>
                                        </div>
                                    </div>
                                </div>
                            </Accordion.Content>
                        </Accordion.Item>

                        {/* ── Referees ── */}
                        <Accordion.Item
                            value="referee"
                            className={css.accordionItem}
                        >
                            <Accordion.Header className={css.accordionHeader}>
                                <Accordion.Trigger
                                    className={css.accordionTrigger}
                                >
                                    <Heading
                                        as="h3"
                                        size="5"
                                        className={css.accordionTriggerText}
                                    >
                                        Match Duties as Referee
                                    </Heading>
                                    <IconChevronDown
                                        size={24}
                                        className={css.accordionChevron}
                                        aria-hidden
                                    />
                                </Accordion.Trigger>
                            </Accordion.Header>
                            <Accordion.Content className={css.accordionContent}>
                                <div className={css.stepList}>
                                    <div className={css.step}>
                                        <span className={css.stepNumber}>
                                            01
                                        </span>
                                        <div className={css.stepText}>
                                            <Text
                                                as="p"
                                                size="3"
                                                weight="medium"
                                            >
                                                Select the game on the DWF
                                                platform. Under &quot;Officials
                                                van deze wedstrijd&quot;, add
                                                yourself as &quot;1e
                                                scheidsrechter&quot;. Be sure to
                                                tick &quot;Niet alle officials
                                                voor deze wedstrijd zijn
                                                aanwezig&quot; to allow the game
                                                to start.
                                            </Text>
                                        </div>
                                    </div>
                                    <div className={css.step}>
                                        <span className={css.stepNumber}>
                                            02
                                        </span>
                                        <div className={css.stepText}>
                                            <Text
                                                as="p"
                                                size="3"
                                                weight="medium"
                                            >
                                                Verify all players, coaches, and
                                                the captain with the team
                                                captain. Check IDs for all
                                                players. Tick &quot;ID
                                                Akkoord&quot; and ensure shirt
                                                numbers match the form.
                                            </Text>
                                        </div>
                                    </div>
                                    <div className={css.step}>
                                        <span className={css.stepNumber}>
                                            03
                                        </span>
                                        <div className={css.stepText}>
                                            <Text
                                                as="p"
                                                size="3"
                                                weight="medium"
                                            >
                                                Once confident, click
                                                &quot;Resultaat invoeren&quot;
                                                to start.{' '}
                                                <strong>
                                                    Do NOT use &quot;Live
                                                    bijhouden&quot;.
                                                </strong>{' '}
                                                You cannot alter information
                                                later, so be thorough.
                                            </Text>
                                        </div>
                                    </div>
                                    <div className={css.step}>
                                        <span className={css.stepNumber}>
                                            04
                                        </span>
                                        <div className={css.stepText}>
                                            <Text
                                                as="p"
                                                size="3"
                                                weight="medium"
                                            >
                                                During the match, the home team
                                                keeps the scoreboard. You note
                                                the formation, shirt numbers of
                                                all players who play, and set
                                                scores. Immediately after the
                                                game, enter the set scores and
                                                indicate who played.
                                            </Text>
                                        </div>
                                    </div>
                                    <div className={css.step}>
                                        <span className={css.stepNumber}>
                                            05
                                        </span>
                                        <div className={css.stepText}>
                                            <Text
                                                as="p"
                                                size="3"
                                                weight="medium"
                                            >
                                                Verify all data with both
                                                captains, then check your OK
                                                box. Click &quot;verzenden&quot;
                                                to submit immediately to avoid
                                                auto-logout timeouts. Check our{' '}
                                                <a
                                                    href="https://dwf-demo.volleybal.nl"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    DWF Demo
                                                </a>{' '}
                                                to practice!
                                            </Text>
                                        </div>
                                    </div>
                                </div>
                            </Accordion.Content>
                        </Accordion.Item>
                    </Accordion.Root>
                </div>
            </section>

            {/* ── Confidential Person ── */}
            <section className={`${css.infoSection} ${css.altBackground}`}>
                <div className={css.infoHeading}>
                    <Heading as="h2" className={css.sectionTitle}>
                        Confidential Person
                    </Heading>
                </div>
                <div className={css.infoContent}>
                    <div className={css.textContent}>
                        <Text
                            as="p"
                            size="3"
                            weight="medium"
                            className={css.paragraph}
                        >
                            If you witness, experience, or suspect inappropriate
                            behavior, don&apos;t keep it to yourself. Reach out
                            to our confidential contact persons,{' '}
                            <strong>Donovan and Anoushka</strong>.
                        </Text>
                        <Text
                            as="p"
                            size="3"
                            weight="medium"
                            className={css.paragraph}
                        >
                            They are available for reports, questions, and
                            advice regarding behavior that does not align with
                            the spirit of sports (e.g., discrimination,
                            harassment, aggression, or abuse of power).
                        </Text>
                        <Text
                            as="p"
                            size="3"
                            weight="medium"
                            className={css.paragraph}
                        >
                            You determine when a boundary is crossed. Every
                            conversation is strictly confidential.
                        </Text>

                        <div className={css.contactCard}>
                            <Text as="p" size="4" weight="bold">
                                Email Donovan & Anoushka at:
                            </Text>
                            <a
                                href="mailto:vertrouwenspersoon@uvo-amsterdam.nl"
                                className={css.emailLink}
                            >
                                vertrouwenspersoon@uvo-amsterdam.nl
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Documents & Links ── */}
            <section className={`${css.documentsSection}`}>
                <div className={css.headerCenter}>
                    <Heading as="h2" className={css.sectionTitle}>
                        Important Documents
                    </Heading>
                </div>
                <div className={css.docGrid}>
                    <NextLink
                        href="/articles-of-association"
                        className={css.docCard}
                    >
                        <IconFileText
                            stroke={2.5}
                            size={44}
                            className={css.docIcon}
                        />
                        <Heading as="h3" size="4" className={css.docTitle}>
                            Articles of Association
                        </Heading>
                        <Text size="2" className={css.docDesc}>
                            Read the foundational rules and statutes of our
                            association.
                        </Text>
                    </NextLink>

                    <NextLink href="/member-info" className={css.docCard}>
                        <IconReceipt2
                            stroke={2.5}
                            size={44}
                            className={css.docIcon}
                        />
                        <Heading as="h3" size="4" className={css.docTitle}>
                            Declaration Form
                        </Heading>
                        <Text size="2" className={css.docDesc}>
                            Reimbursement form for expenses made on behalf of a
                            committee.
                        </Text>
                    </NextLink>

                    <NextLink href="/member-info" className={css.docCard}>
                        <IconShieldCheck
                            stroke={2.5}
                            size={44}
                            className={css.docIcon}
                        />
                        <Heading as="h3" size="4" className={css.docTitle}>
                            House Rules (HR)
                        </Heading>
                        <Text size="2" className={css.docDesc}>
                            Our Huishoudelijk Reglement covering club
                            guidelines.
                        </Text>
                    </NextLink>
                </div>
            </section>
        </div>
    );
};

export default MemberInfoPage;
