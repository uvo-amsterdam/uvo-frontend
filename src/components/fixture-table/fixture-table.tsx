'use client';

import type { FC } from 'react';
import { useFixtures } from '@hooks/useFixtures';
import { Heading, Text } from '@radix-ui/themes';

import css from './fixture-table.module.scss';

export const FixtureTable: FC = () => {
    const { data: fixtures, loading, error } = useFixtures();

    if (loading) {
        return (
            <div className={css.skeletonWrap}>
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={`skeleton-${i.toString()}`}
                        className={css.skeletonRow}
                    />
                ))}
            </div>
        );
    }

    if (error || fixtures.length === 0) {
        return (
            <div className={css.empty}>
                <Text size="4" className={css.emptyText}>
                    {error
                        ? "Couldn't load the fixtures right now — try again later!"
                        : 'No upcoming matches at the moment. Check back soon!'}
                </Text>
            </div>
        );
    }

    return (
        <div className={css.tableContainer}>
            <Heading as="h2" className={css.tableTitle}>
                Upcoming Matches
            </Heading>

            {/* ── Desktop table ── */}
            <div className={css.tableWrap}>
                <table className={css.table}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Home</th>
                            <th>Away</th>
                            <th>Venue</th>
                            <th>City</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fixtures.map((f, i) => (
                            <tr
                                key={`fixture-${i.toString()}`}
                                className={f.isUvo ? css.uvoRow : undefined}
                            >
                                <td>{f.date}</td>
                                <td>{f.time}</td>
                                <td
                                    className={
                                        f.isUvo &&
                                        f.home.toLowerCase().includes('uvo')
                                            ? css.uvoTeam
                                            : undefined
                                    }
                                >
                                    {f.home}
                                </td>
                                <td
                                    className={
                                        f.isUvo &&
                                        f.away.toLowerCase().includes('uvo')
                                            ? css.uvoTeam
                                            : undefined
                                    }
                                >
                                    {f.away}
                                </td>
                                <td>{f.venue}</td>
                                <td>{f.city}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ── Mobile cards ── */}
            <div className={css.cardList}>
                {fixtures.map((f, i) => (
                    <div
                        key={`card-${i.toString()}`}
                        className={`${css.card} ${f.isUvo ? css.uvoCard : ''}`}
                    >
                        <div className={css.cardHeader}>
                            <span className={css.cardDate}>{f.date}</span>
                            <span className={css.cardTime}>{f.time}</span>
                        </div>
                        <div className={css.cardMatchup}>
                            <span
                                className={
                                    f.home.toLowerCase().includes('uvo')
                                        ? css.uvoTeam
                                        : undefined
                                }
                            >
                                {f.home}
                            </span>
                            <span className={css.vs}>vs</span>
                            <span
                                className={
                                    f.away.toLowerCase().includes('uvo')
                                        ? css.uvoTeam
                                        : undefined
                                }
                            >
                                {f.away}
                            </span>
                        </div>
                        {(f.venue || f.city) && (
                            <div className={css.cardVenue}>
                                {f.venue}
                                {f.venue && f.city ? ' — ' : ''}
                                {f.city}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
