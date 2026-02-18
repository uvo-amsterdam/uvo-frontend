import type { FC } from 'react';
import { LOCATION } from '@constants/location';

import css from './location-section.module.scss';

export const LocationSection: FC = () => {
    return (
        <section className={css.root}>
            <div className={css.container}>
                <div className={css.info}>
                    <h2 className={css.title}>Where to find us</h2>
                    <p className={css.subtitle}>
                        Come visit us at our training location
                    </p>

                    <div className={css.card}>
                        <div className={css.cardIcon}>📍</div>
                        <div className={css.cardBody}>
                            <span className={css.cardLabel}>
                                Training & Home Games
                            </span>
                            <span className={css.cardValue}>
                                {LOCATION.name}
                            </span>
                            <span className={css.cardDetail}>
                                {LOCATION.address}
                            </span>
                            <span className={css.cardDetail}>
                                {LOCATION.postalCode}
                            </span>
                        </div>
                    </div>

                    <div className={css.card}>
                        <div className={css.cardIcon}>🕐</div>
                        <div className={css.cardBody}>
                            <span className={css.cardLabel}>
                                Training Schedule
                            </span>
                            <span className={css.cardValue}>
                                Monday 18:00 – 23:20
                            </span>
                            <span className={css.cardValue}>
                                Thursday 18:00 – 22:00
                            </span>
                            <span className={css.cardDetail}>
                                Home games mostly on Tuesdays
                            </span>
                        </div>
                    </div>

                    <a
                        href="https://www.instagram.com/uvoamsterdam/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={css.card}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <div className={css.cardIcon}>📸</div>
                        <div className={css.cardBody}>
                            <span className={css.cardLabel}>Instagram</span>
                            <span className={css.cardValue}>@uvoamsterdam</span>
                            <span className={css.cardDetail}>
                                Follow us for updates & vibes
                            </span>
                        </div>
                    </a>
                </div>

                <div className={css.mapWrapper}>
                    <iframe
                        className={css.map}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.2!2d4.9545!3d52.3545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c6090cde8e0e5d%3A0x5f9b5e5e5e5e5e5e!2sUSC%20Universum!5e0!3m2!1sen!2snl!4v1"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="USC Universum location"
                    />
                </div>
            </div>
        </section>
    );
};
