'use client';

import { type FC, useState } from 'react';
import { ShowMoreButton } from '@components/ui-states/show-more-button';
import { TableEmptyState } from '@components/ui-states/table-empty-state';
import { TableSkeleton } from '@components/ui-states/table-skeleton';
import { useFilteredResults } from '@hooks/use-results';
import { Heading } from '@radix-ui/themes';
import { IconTrophy } from '@tabler/icons-react';

import css from './results-table.module.scss';

export const ResultsTable: FC<{
    teamFilter?: string;
    hideLocation?: boolean;
}> = ({ teamFilter, hideLocation }) => {
    const {
        results: rawResults,
        loading,
        error,
    } = useFilteredResults(teamFilter);
    const [showAll, setShowAll] = useState(false);

    const maxResults = teamFilter ? 10 : 15;
    const displayedResults = showAll
        ? rawResults
        : rawResults.slice(0, maxResults);

    if (loading) return <TableSkeleton marginTop />;

    if (error || rawResults.length === 0) {
        return (
            <TableEmptyState
                marginTop
                message={
                    error
                        ? "Couldn't load the results right now — try again later!"
                        : 'No recent results to show. Check back after the next match!'
                }
            />
        );
    }

    return (
        <div className={css.tableContainer}>
            <Heading as="h2" className={css.tableTitle}>
                Recent Results
            </Heading>

            <div className={css.tableWrap}>
                <table className={css.table}>
                    <thead>
                        <tr>
                            <th className={css.thIcon} />
                            <th>Date</th>
                            <th className={css.teamCol}>Home</th>
                            <th>Score</th>
                            <th className={css.teamCol}>Away</th>
                            {!hideLocation && <th>Venue</th>}
                            {!hideLocation && <th>City</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {displayedResults.map((r, i) => (
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
                                {!hideLocation && <td>{r.venue}</td>}
                                {!hideLocation && <td>{r.city}</td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className={css.cardList}>
                {displayedResults.map((r, i) => (
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
                        {!hideLocation && (r.venue || r.city) && (
                            <div className={css.cardVenue}>
                                {r.venue}
                                {r.venue && r.city ? ' — ' : ''}
                                {r.city}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <ShowMoreButton
                visible={rawResults.length > maxResults && !showAll}
                label="Show More Results"
                onClick={() => setShowAll(true)}
            />
        </div>
    );
};
