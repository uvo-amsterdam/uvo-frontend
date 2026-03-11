'use client';

import type { FC } from 'react';
import { useResults } from '@hooks/useResults';
import { Heading, Text } from '@radix-ui/themes';
import { IconTrophy } from '@tabler/icons-react';

import css from './results-table.module.scss';

export const ResultsTable: FC = () => {
    const { data: results, loading, error } = useResults();

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

    if (error || results.length === 0) {
        return (
            <div className={css.empty}>
                <Text size="4" className={css.emptyText}>
                    {error
                        ? "Couldn't load the results right now — try again later!"
                        : 'No recent results to show. Check back after the next match!'}
                </Text>
            </div>
        );
    }

    return (
        <div className={css.tableContainer}>
            <Heading as="h2" className={css.tableTitle}>
                Recent Results
            </Heading>

            {/* ── Desktop table ── */}
            <div className={css.tableWrap}>
                <table className={css.table}>
                    <thead>
                        <tr>
                            <th className={css.thIcon} />
                            <th>Date</th>
                            <th className={css.teamCol}>Home</th>
                            <th>Score</th>
                            <th className={css.teamCol}>Away</th>
                            <th>Venue</th>
                            <th>City</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((r, i) => (
                            <tr
                                key={`result-${i.toString()}`}
                                className={
                                    r.uvoWin
                                        ? css.winRow
                                        : r.isUvo
                                          ? css.uvoRow
                                          : undefined
                                }
                            >
                                <td className={css.iconCell}>
                                    {r.uvoWin && (
                                        <IconTrophy
                                            size={20}
                                            stroke={1.8}
                                            className={css.trophyIcon}
                                        />
                                    )}
                                </td>
                                <td>{r.date}</td>
                                <td
                                    className={
                                        r.home.toLowerCase().includes('uvo')
                                            ? css.uvoTeam
                                            : undefined
                                    }
                                >
                                    {r.home}
                                </td>
                                <td className={css.scoreCell}>{r.score}</td>
                                <td
                                    className={
                                        r.away.toLowerCase().includes('uvo')
                                            ? css.uvoTeam
                                            : undefined
                                    }
                                >
                                    {r.away}
                                </td>
                                <td>{r.venue}</td>
                                <td>{r.city}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ── Mobile cards ── */}
            <div className={css.cardList}>
                {results.map((r, i) => (
                    <div
                        key={`card-${i.toString()}`}
                        className={`${css.card} ${r.uvoWin ? css.winCard : r.isUvo ? css.uvoCard : ''}`}
                    >
                        <div className={css.cardHeader}>
                            <span className={css.cardDate}>
                                {r.uvoWin && (
                                    <IconTrophy
                                        size={16}
                                        stroke={1.8}
                                        className={css.trophyIconSmall}
                                    />
                                )}
                                {r.date}
                            </span>
                        </div>
                        <div className={css.cardMatchup}>
                            <span
                                className={
                                    r.home.toLowerCase().includes('uvo')
                                        ? css.uvoTeam
                                        : undefined
                                }
                            >
                                {r.home}
                            </span>
                            <span className={css.cardScore}>{r.score}</span>
                            <span
                                className={
                                    r.away.toLowerCase().includes('uvo')
                                        ? css.uvoTeam
                                        : undefined
                                }
                            >
                                {r.away}
                            </span>
                        </div>
                        {(r.venue || r.city) && (
                            <div className={css.cardVenue}>
                                {r.venue}
                                {r.venue && r.city ? ' — ' : ''}
                                {r.city}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
