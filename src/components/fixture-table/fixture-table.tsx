'use client';

import { type FC, useState } from 'react';
import { TableEmptyState } from '@components/ui-states/table-empty-state';
import { TableSkeleton } from '@components/ui-states/table-skeleton';
import { useFixtures } from '@hooks/useFixtures';
import { Button, Heading } from '@radix-ui/themes';

import css from './fixture-table.module.scss';

export const FixtureTable: FC = () => {
    const { data: fixtures, loading, error } = useFixtures();
    const [showAll, setShowAll] = useState(false);

    const maxResults = 15;
    const displayedFixtures = showAll
        ? fixtures
        : fixtures.slice(0, maxResults);

    if (loading) return <TableSkeleton />;

    if (error || fixtures.length === 0) {
        return (
            <TableEmptyState
                message={
                    error
                        ? "Couldn't load the fixtures right now — try again later!"
                        : 'No upcoming matches at the moment. Check back soon!'
                }
            />
        );
    }

    return (
        <div className={css.tableContainer}>
            <Heading as="h2" className={css.tableTitle}>
                Upcoming Matches
            </Heading>

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
                        {displayedFixtures.map((f, i) => (
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

            <div className={css.cardList}>
                {displayedFixtures.map((f, i) => (
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

            {fixtures.length > maxResults && !showAll && (
                <div className={css.showMoreWrap}>
                    <Button
                        variant="soft"
                        size="3"
                        onClick={() => setShowAll(true)}
                        className={css.showMoreBtn}
                    >
                        Show More Matches
                    </Button>
                </div>
            )}
        </div>
    );
};
