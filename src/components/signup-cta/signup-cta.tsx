import type { FC } from 'react';
import { FORMS } from '@constants/forms';
import { Heading, Text } from '@radix-ui/themes';
import { IconBallVolleyball } from '@tabler/icons-react';

import css from './signup-cta.module.scss';

export const SignupCta: FC = () => {
    return (
        <section className={css.root}>
            <div className={css.content}>
                <IconBallVolleyball
                    size={48}
                    stroke={1.5}
                    className={css.icon}
                />
                <Heading as="h2" className={css.title}>
                    Ready to join the fun?
                </Heading>
                <Text as="p" size="3" className={css.body}>
                    Do you also want to play volleyball and party with us?
                    Sign-ups are now open for the next tryout sessions. Fill out
                    the form and our Technical Committee will contact you!
                </Text>
                <a
                    href={FORMS.SIGN_UP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={css.button}
                >
                    Sign up now →
                </a>
            </div>
        </section>
    );
};
