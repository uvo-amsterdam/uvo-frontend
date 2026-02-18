import type { FC } from 'react';

import css from './signup-cta.module.scss';

export const SignupCta: FC = () => {
    return (
        <section className={css.root}>
            <div className={css.content}>
                <span className={css.emoji}>🏐</span>
                <h2 className={css.title}>Ready to join the fun?</h2>
                <p className={css.body}>
                    Do you also want to play volleyball and party with us?
                    Sign-ups are now open for the next tryout sessions. Fill out
                    the form and our Technical Committee will contact you!
                </p>
                <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSeWLaAr0S6cBgUI3lWOJ9vA24qMP_DlUwF0DseY4vlHkaLl3A/closedform?embedded=true"
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
