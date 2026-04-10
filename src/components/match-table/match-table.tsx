'use client';

import { type FC, useState } from 'react';
import { ShowMoreButton } from '@components/ui-states/show-more-button';
import { TableEmptyState } from '@components/ui-states/table-empty-state';
import { TableSkeleton } from '@components/ui-states/table-skeleton';
import { type MatchType, useFilteredMatchData } from '@hooks/use-match-data';
import type { Fixture } from '@interfaces/fixture';
import type { MatchResult } from '@interfaces/match-result';
import { Table } from '@radix-ui/themes';
import { IconTrophy } from '@tabler/icons-react';
import clsx from 'clsx';

import css from './match-table.module.scss';

export interface MatchTableProps {
    type?: 'fixtures' | 'results';
    nevoboTeamName?: string;
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

const getColClass = (col: string) => {
    switch (col) {
        case 'Date':
            return css.dateCol;
        case 'Time':
            return css.timeCol;
        case 'Home':
        case 'Away':
            return css.teamCol;
        case 'Result':
            return css.scoreCol;
        case 'Venue':
            return css.venueCol;
        case 'City':
            return css.cityCol;
        case '':
            return css.iconCol;
        default:
            return undefined;
    }
};

const FixtureRow: FC<{ fixture: Fixture }> = ({ fixture }) => (
    <Table.Row className={fixture.isHomeGame ? css.uvoRow : undefined}>
        <Table.Cell className={css.dateCol}>{fixture.date}</Table.Cell>
        <Table.Cell className={css.timeCol}>{fixture.time}</Table.Cell>
        <Table.Cell
            className={clsx(css.teamCol, fixture.isHomeGame && css.uvoTeam)}
        >
            {fixture.home}
        </Table.Cell>
        <Table.Cell
            className={clsx(css.teamCol, !fixture.isHomeGame && css.uvoTeam)}
        >
            {fixture.away}
        </Table.Cell>
        <Table.Cell className={css.venueCol}>{fixture.venue}</Table.Cell>
        <Table.Cell className={css.cityCol}>{fixture.city}</Table.Cell>
    </Table.Row>
);

const ResultRow: FC<{ result: MatchResult }> = ({ result }) => (
    <Table.Row className={result.isHomeGame ? css.uvoRow : undefined}>
        <Table.Cell className={css.iconCol}>
            {result.uvoWin && (
                <IconTrophy size={20} stroke={1.8} className={css.trophyIcon} />
            )}
        </Table.Cell>
        <Table.Cell className={css.dateCol}>{result.date}</Table.Cell>
        <Table.Cell className={css.timeCol}>{result.time}</Table.Cell>
        <Table.Cell
            className={clsx(css.teamCol, result.isHomeGame && css.uvoTeam)}
        >
            {result.home}
        </Table.Cell>
        <Table.Cell
            className={clsx(css.scoreCol, css.scoreCell, {
                [css.scoreWin]: result.uvoWin,
            })}
        >
            {result.result}
        </Table.Cell>
        <Table.Cell
            className={clsx(css.teamCol, !result.isHomeGame && css.uvoTeam)}
        >
            {result.away}
        </Table.Cell>
        <Table.Cell className={css.venueCol}>{result.venue}</Table.Cell>
        <Table.Cell className={css.cityCol}>{result.city}</Table.Cell>
    </Table.Row>
);

const FixtureCard: FC<{ fixture: Fixture }> = ({ fixture }) => (
    <div className={clsx(css.card, fixture.isHomeGame && css.uvoCard)}>
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
    <div className={clsx(css.card, result.isHomeGame && css.uvoCard)}>
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

export const MatchTable: FC<MatchTableProps> = ({
    type = 'fixtures',
    nevoboTeamName,
}) => {
    const isFixtures = type === 'fixtures';
    const { data, loading, error } = useFilteredMatchData(
        type as MatchType,
        nevoboTeamName,
    );
    const columns = isFixtures ? FIXTURE_COLUMNS : RESULT_COLUMNS;
    const [showAll, setShowAll] = useState(false);

    const maxResults = nevoboTeamName ? 10 : 15;
    const displayedData = showAll ? data : data.slice(0, maxResults);

    if (loading) return <TableSkeleton />;

    if (error || data.length === 0) {
        return (
            <TableEmptyState
                message={
                    error
                        ? `Couldn't load the ${type} right now - try again later!`
                        : `No upcoming ${type} available at the moment. Check back soon!`
                }
            />
        );
    }

    return (
        <div className={css.tableContainer}>
            <div className={css.tableWrap}>
                <Table.Root className={css.table}>
                    <Table.Header>
                        <Table.Row>
                            {columns.map(col => (
                                <Table.ColumnHeaderCell
                                    key={col}
                                    className={getColClass(col)}
                                >
                                    {col}
                                </Table.ColumnHeaderCell>
                            ))}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {displayedData.map(item => {
                            if (isFixtures) {
                                const f = item as Fixture;
                                const key = `fixture-${f.home}-${f.away}-${f.date}`;
                                return <FixtureRow key={key} fixture={f} />;
                            }
                            const r = item as MatchResult;
                            const key = `result-${r.code || `${r.home}-${r.away}-${r.date}`}`;
                            return <ResultRow key={key} result={r} />;
                        })}
                    </Table.Body>
                </Table.Root>
            </div>

            <div className={css.cardList}>
                {displayedData.map(item => {
                    if (isFixtures) {
                        const f = item as Fixture;
                        const key = `card-fixture-${f.home}-${f.away}-${f.date}`;
                        return <FixtureCard key={key} fixture={f} />;
                    }
                    const r = item as MatchResult;
                    const key = `card-result-${r.code || `${r.home}-${r.away}-${r.date}`}`;
                    return <ResultCard key={key} result={r} />;
                })}
            </div>

            <ShowMoreButton
                visible={data.length > maxResults && !showAll}
                label={isFixtures ? 'Show More Matches' : 'Show More Results'}
                onClick={() => setShowAll(true)}
            />
        </div>
    );
};
