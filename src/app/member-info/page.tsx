import type { FC } from 'react';
import { Hero } from '@components/hero/hero';
import {
    Accordion,
    AccordionContent,
    AccordionHeader,
    AccordionItem,
    AccordionTrigger,
} from '@radix-ui/react-accordion';
import { Heading, Text } from '@radix-ui/themes';
import {
    IconChevronDown,
    IconFileText,
    IconReceipt2,
    IconShieldCheck,
} from '@tabler/icons-react';
import type { Metadata } from 'next';
import NextLink from 'next/link';

import css from './page.module.scss';

export const metadata: Metadata = {
    title: 'Member Info - UvO Amsterdam',
    description:
        'Information and resources for UvO Amsterdam members including DWF guidelines, confidential persons, and important documents.',
};

const accordionData = [
    {
        value: 'captain',
        title: 'Match Duties as Captain',
        steps: [
            'Go to dwf.volleybal.nl or use Nevobo’s "Mijn Competitie" app.',
            'Log in with your Nevobo account (linked to your player code). If you need your code, ask the board or during the DWF course.',
            'Select your game and click "standaardteam ophalen" to import your team. Use "spelers beheren" to remove absent players or add substitutes by searching their name or code. Best done in advance!',
            'Verify the captain, libero, and that shirt numbers are correct. Edit via double-clicking in "spelers beheren".',
            'Immediately after the game, verify results and players with the referee and opposing captain. Check the box at the bottom to OK it. Mistakes? Notify the wedstrijdsecretariaat immediately!',
        ],
    },
    {
        value: 'referee',
        title: 'Match Duties as Referee',
        steps: [
            'Select the game on the DWF platform. Under "Officials van deze wedstrijd", add yourself as "1e scheidsrechter". Be sure to tick "Niet alle officials voor deze wedstrijd zijn aanwezig" to allow the game to start.',
            'Verify all players, coaches, and the captain with the team captain. Check IDs for all players. Tick "ID Akkoord" and ensure shirt numbers match the form.',
            'Once confident, click "Resultaat invoeren" to start. Do NOT use "Live bijhouden". You cannot alter information later, so be thorough.',
            'During the match, the home team keeps the scoreboard. You note the formation, shirt numbers of all players who play, and set scores. Immediately after the game, enter the set scores and indicate who played.',
            'Verify all data with both captains, then check your OK box. Click "verzenden" to submit immediately to avoid auto-logout timeouts. Check our DWF Demo to practice!',
        ],
    },
];

const MemberInfoPage: FC = () => {
    return (
        <div className={css.root}>
            <Hero
                title="Member Info"
                imageSrc="/images/homepage/team-photo.jpeg"
                imageAlt="UvO Amsterdam members"
            />

            <section className={css.infoSection}>
                <div className={css.infoHeading}>
                    <Heading as="h2" className={css.sectionTitle}>
                        DWF Match Duties
                    </Heading>
                </div>
                <div className={css.infoContent}>
                    <Accordion type="multiple" className={css.accordionRoot}>
                        {accordionData.map(item => (
                            <AccordionItem
                                key={item.value}
                                value={item.value}
                                className={css.accordionItem}
                            >
                                <AccordionHeader
                                    className={css.accordionHeader}
                                >
                                    <AccordionTrigger
                                        className={css.accordionTrigger}
                                    >
                                        <Heading
                                            as="h3"
                                            size="5"
                                            className={css.accordionTriggerText}
                                        >
                                            {item.title}
                                        </Heading>
                                        <IconChevronDown
                                            size={24}
                                            className={css.accordionChevron}
                                            aria-hidden
                                        />
                                    </AccordionTrigger>
                                </AccordionHeader>
                                <AccordionContent
                                    className={css.accordionContent}
                                >
                                    <div className={css.stepList}>
                                        {item.steps.map((step, index) => (
                                            <div
                                                key={step}
                                                className={css.step}
                                            >
                                                <span
                                                    className={css.stepNumber}
                                                >
                                                    {String(index + 1).padStart(
                                                        2,
                                                        '0',
                                                    )}
                                                </span>
                                                <div className={css.stepText}>
                                                    <Text
                                                        as="p"
                                                        size="3"
                                                        weight="medium"
                                                    >
                                                        {step}
                                                    </Text>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
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
                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLScDU7Rovd8xiiHdCBmLbwREpqx8S-HQpyQxTiKQjydlHBfQqA/viewform?usp=sf_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={css.docCard}
                    >
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
                    </a>
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
