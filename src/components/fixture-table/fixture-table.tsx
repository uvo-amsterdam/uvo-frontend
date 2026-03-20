'use client';

import { type FC, useState } from 'react';
import { ShowMoreButton } from '@components/ui-states/show-more-button';
import { TableEmptyState } from '@components/ui-states/table-empty-state';
import { TableSkeleton } from '@components/ui-states/table-skeleton';
import { useFixtures } from '@hooks/use-fixtures';
import { Heading, Table } from '@radix-ui/themes';

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
                        ? "Couldn't load the fixtures right now - try again later!"
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
                <Table.Root className={css.table}>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>
                                Date
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>
                                Time
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className={css.teamCol}>
                                Home
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell className={css.teamCol}>
                                Away
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>
                                Venue
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>
                                City
                            </Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {displayedFixtures.map((fixture, i) => (
                            <Table.Row
                                key={`fixture-${i.toString()}`}
                                className={
                                    fixture.isHomeGame ? css.uvoRow : undefined
                                }
                            >
                                <Table.Cell>{fixture.date}</Table.Cell>
                                <Table.Cell>{fixture.time}</Table.Cell>
                                <Table.Cell
                                    className={
                                        fixture.isHomeGame
                                            ? css.uvoTeam
                                            : undefined
                                    }
                                >
                                    {fixture.home}
                                </Table.Cell>
                                <Table.Cell
                                    className={
                                        !fixture.isHomeGame
                                            ? css.uvoTeam
                                            : undefined
                                    }
                                >
                                    {fixture.away}
                                </Table.Cell>
                                <Table.Cell>{fixture.venue}</Table.Cell>
                                <Table.Cell>{fixture.city}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </div>

            <div className={css.cardList}>
                {displayedFixtures.map((fixture, i) => (
                    <div
                        key={`card-${i.toString()}`}
                        className={`${css.card} ${fixture.isHomeGame ? css.uvoCard : ''}`}
                    >
                        <div className={css.cardHeader}>
                            <span className={css.cardDate}>{fixture.date}</span>
                            <span className={css.cardTime}>{fixture.time}</span>
                        </div>
                        <div className={css.cardMatchup}>
                            <span
                                className={
                                    fixture.isHomeGame ? css.uvoTeam : undefined
                                }
                            >
                                {fixture.home}
                            </span>
                            <span className={css.vs}>vs</span>
                            <span
                                className={
                                    !fixture.isHomeGame
                                        ? css.uvoTeam
                                        : undefined
                                }
                            >
                                {fixture.away}
                            </span>
                        </div>
                        {(fixture.venue || fixture.city) && (
                            <div className={css.cardVenue}>
                                {fixture.venue}
                                {fixture.venue && fixture.city ? ' - ' : ''}
                                {fixture.city}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <ShowMoreButton
                visible={fixtures.length > maxResults && !showAll}
                label="Show More Matches"
                onClick={() => setShowAll(true)}
            />
        </div>
    );
};
