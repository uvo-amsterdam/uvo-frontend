'use client';

import { type FC, useState } from 'react';
import { ShowMoreButton } from '@components/ui-states/show-more-button';
import { TableEmptyState } from '@components/ui-states/table-empty-state';
import { TableSkeleton } from '@components/ui-states/table-skeleton';
import { useMatchData } from '@hooks/use-match-data';
import type { Fixture } from '@interfaces/fixture';
import type { MatchResult } from '@interfaces/match-result';
import { Heading, Table } from '@radix-ui/themes';
import { IconTrophy } from '@tabler/icons-react';

import css from './match-table.module.scss';

export interface MatchTableProps {
    type?: 'fixtures' | 'results';
}

const FIXTURE_COLUMNS = [
    'Date',
    'Time',
    'Home',
    'Away',
    'Venue',
    'City',
] as const;
const RESULT_COLUMNS = [
    '',
    'Date',
    'Time',
    'Home',
    'Result',
    'Away',
    'Venue',
    'City',
] as const;

const FixtureRow: FC<{ fixture: Fixture }> = ({ fixture }) => (
    <Table.Row className={fixture.isHomeGame ? css.uvoRow : undefined}>
        <Table.Cell>{fixture.date}</Table.Cell>
        <Table.Cell>{fixture.time}</Table.Cell>
        <Table.Cell className={fixture.isHomeGame ? css.uvoTeam : undefined}>
            {fixture.home}
        </Table.Cell>
        <Table.Cell className={!fixture.isHomeGame ? css.uvoTeam : undefined}>
            {fixture.away}
        </Table.Cell>
        <Table.Cell>{fixture.venue}</Table.Cell>
        <Table.Cell>{fixture.city}</Table.Cell>
    </Table.Row>
);

const ResultRow: FC<{ result: MatchResult }> = ({ result }) => (
    <Table.Row className={result.isHomeGame ? css.uvoRow : undefined}>
        <Table.Cell>
            {result.uvoWin && (
                <IconTrophy size={20} stroke={1.8} className={css.trophyIcon} />
            )}
        </Table.Cell>
        <Table.Cell>{result.date}</Table.Cell>
        <Table.Cell>{result.time}</Table.Cell>
        <Table.Cell className={result.isHomeGame ? css.uvoTeam : undefined}>
            {result.home}
        </Table.Cell>
        <Table.Cell
            className={`${css.scoreCell} ${result.uvoWin ? css.scoreWin : ''}`}
        >
            {result.result}
        </Table.Cell>
        <Table.Cell className={!result.isHomeGame ? css.uvoTeam : undefined}>
            {result.away}
        </Table.Cell>
        {/*//TODO Handle set scores*/}
        {/*<Table.Cell>{result.setScores}</Table.Cell>*/}
        <Table.Cell>{result.venue}</Table.Cell>
        <Table.Cell>{result.city}</Table.Cell>
    </Table.Row>
);

const FixtureCard: FC<{ fixture: Fixture }> = ({ fixture }) => (
    <div className={`${css.card} ${fixture.isHomeGame ? css.uvoCard : ''}`}>
        <div className={css.cardHeader}>
            <span className={css.cardDate}>{fixture.date}</span>
            <span className={css.cardTime}>{fixture.time}</span>
        </div>
        <div className={css.cardMatchup}>
            <span className={fixture.isHomeGame ? css.uvoTeam : undefined}>
                {fixture.home}
            </span>
            <span className={css.vs}>vs</span>
            <span className={!fixture.isHomeGame ? css.uvoTeam : undefined}>
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
);

const ResultCard: FC<{ result: MatchResult }> = ({ result }) => (
    <div className={`${css.card} ${result.isHomeGame ? css.uvoCard : ''}`}>
        <div className={css.cardHeader}>
            <span className={css.cardDate}>{result.date}</span>
            <span className={css.cardTime}>{result.time}</span>
        </div>
        <div className={css.cardMatchup}>
            <span className={result.isHomeGame ? css.uvoTeam : undefined}>
                {result.home}
            </span>
            <span className={css.vs}>{result.result || 'vs'}</span>
            <span className={!result.isHomeGame ? css.uvoTeam : undefined}>
                {result.away}
            </span>
        </div>
        {result.setScores && (
            <div className={css.cardSets}>{result.setScores}</div>
        )}
        {(result.venue || result.city) && (
            <div className={css.cardVenue}>
                {result.venue}
                {result.venue && result.city ? ' - ' : ''}
                {result.city}
            </div>
        )}
    </div>
);

export const MatchTable: FC<MatchTableProps> = ({ type = 'fixtures' }) => {
    const isFixtures = type === 'fixtures';
    const { data, loading, error } = useMatchData(type);
    const columns = isFixtures ? FIXTURE_COLUMNS : RESULT_COLUMNS;
    const [showAll, setShowAll] = useState(false);

    const maxResults = 15;
    const displayedData = showAll ? data : data.slice(0, maxResults);

    if (loading) return <TableSkeleton />;

    if (error || data.length === 0) {
        return (
            <TableEmptyState
                message={
                    error
                        ? isFixtures
                            ? "Couldn't load the fixtures right now - try again later!"
                            : "Couldn't load the results right now - try again later!"
                        : isFixtures
                          ? 'No upcoming matches at the moment. Check back soon!'
                          : 'No recent results available at the moment. Check back soon!'
                }
            />
        );
    }

    return (
        <div className={css.tableContainer}>
            <Heading as="h2" className={css.tableTitle}>
                {isFixtures ? 'Upcoming Matches' : 'Recent Results'}
            </Heading>
            <div className={css.tableWrap}>
                <Table.Root className={css.table}>
                    <Table.Header>
                        <Table.Row>
                            {columns.map(col => (
                                <Table.ColumnHeaderCell
                                    key={col}
                                    className={
                                        col === 'Home' || col === 'Away'
                                            ? css.teamCol
                                            : undefined
                                    }
                                >
                                    {col}
                                </Table.ColumnHeaderCell>
                            ))}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {displayedData.map((item, i) =>
                            isFixtures ? (
                                <FixtureRow
                                    key={`fixture-${i.toString()}`}
                                    fixture={item as Fixture}
                                />
                            ) : (
                                <ResultRow
                                    key={`result-${i.toString()}`}
                                    result={item as MatchResult}
                                />
                            ),
                        )}
                    </Table.Body>
                </Table.Root>
            </div>

            <div className={css.cardList}>
                {displayedData.map((item, i) =>
                    isFixtures ? (
                        <FixtureCard
                            key={`card-${i.toString()}`}
                            fixture={item as Fixture}
                        />
                    ) : (
                        <ResultCard
                            key={`card-${i.toString()}`}
                            result={item as MatchResult}
                        />
                    ),
                )}
            </div>

            <ShowMoreButton
                visible={data.length > maxResults && !showAll}
                label="Show More Matches"
                onClick={() => setShowAll(true)}
            />
        </div>
    );
};
