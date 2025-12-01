import '../styles/globals.scss';
import { Strong, Text } from '@radix-ui/themes';
import Image from 'next/image';

import css from './page.module.scss';

export default function Home() {
    /**
     * TODO: Move text to constants file! (for translations etc.)
     */
    return (
        <div className={css.root}>
            <div className={css.slideshow}>
                <div className={css.imageContainer}>
                    <Image
                        src="/images/homepage/image.jpeg"
                        alt="Team picture"
                        fill={true}
                    />
                </div>
            </div>
            <Text>
                <Strong>UVO IN A FEW WORDS</Strong>
                <br />
                <br />
                Welcome to UvO, the most fun student volleyball association in
                Amsterdam!
                <br />
                <br />
                UvO has been around for over 25 years! We play with eight
                women's teams and five men's teams in the Nevobo competition and
                also have two beginner training-only teams. The training
                evenings are every Monday and Thursday at USC Universum (Science
                Park). Home game evenings are mostly on Tuesdays in the
                Wethouder Verheijhal and sometimes on Saturdays at USC
                Universum. We close the training sessions and home play evenings
                with a nice drink. UvO is a self-run association: together,
                members make everything possible! 15 committees organize
                tournaments, activities, trips and of course parties! With our
                250 members, we have a great time all year round. Would you like
                to know more about UvO? Send an email to
                bestuur@uvo-amsterdam.nl.
                <br />
                <br />
                Do you also want to play volleyball and party with us?
                <br />
                Sign-ups are now open for the next tryout sessions in January.
                Sign-ups are now open for the next tryout sessions from August
                25th to September 4th. Sign up at the bottom of the page and the
                Technical Committee will contact you!
            </Text>
        </div>
    );
}
