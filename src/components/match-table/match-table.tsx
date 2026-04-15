'use client';

import { type FC, useState } from 'react';
import { ShowMoreButton } from '@components/ui-states/show-more-button';
import { TableEmptyState } from '@components/ui-states/table-empty-state';
import { TableSkeleton } from '@components/ui-states/table-skeleton';
import { type MatchType, useFilteredMatchData } from '@hooks/use-match-data';
import type { Fixture } from '@interfaces/fixture';
import type { MatchResult } from '@interfaces/match-result';
import { Heading, Table } from '@radix-ui/themes';
import { IconBallVolleyball, IconTrophy } from '@tabler/icons-react';
import clsx from 'clsx';

import css from './match-table.module.scss';

export interface MatchTableProps {
    type?: 'fixtures' | 'results';
    nevoboTeamName?: string;
    showTitle?: boolean;
    title?: string;
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
        <Table.Cell
            className={clsx(css.teamCol, result.isHomeGame && css.uvoTeam)}
        >
            {result.home}
        </Table.Cell>
        <Table.Cell
            className={clsx(css.scoreCell, {
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
        <Table.Cell>{result.venue}</Table.Cell>
        <Table.Cell>{result.city}</Table.Cell>
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
    showTitle = true,
    title,
}) => {
    const isFixtures = type === 'fixtures';
    const { data, loading, error } = useFilteredMatchData(
        type as MatchType,
        nevoboTeamName,
    );
    const columns = isFixtures ? FIXTURE_COLUMNS : RESULT_COLUMNS;

    const initialCount = nevoboTeamName ? 15 : 20;
    const [visibleCount, setVisibleCount] = useState(initialCount);

    const displayedData = data.slice(0, visibleCount);

    if (loading) return <TableSkeleton />;

    const defaultTitle = isFixtures ? 'Upcoming Matches' : 'Recent Results';

    if (error || data.length === 0) {
        return (
            <div className={css.tableContainer}>
                {showTitle && (
                    <div className={css.sectionHeader}>
                        <div className={css.sectionIcon}>
                            <IconBallVolleyball size={32} aria-hidden="true" />
                        </div>
                        <Heading as="h2" className={css.sectionTitle}>
                            {title || defaultTitle}
                        </Heading>
                    </div>
                )}
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
            </div>
        );
    }

    return (
        <div className={css.tableContainer}>
            {showTitle && (
                <div className={css.sectionHeader}>
                    <div className={css.sectionIcon}>
                        <IconBallVolleyball size={32} aria-hidden="true" />
                    </div>
                    <Heading as="h2" className={css.sectionTitle}>
                        {title || defaultTitle}
                    </Heading>
                </div>
            )}
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
                        {displayedData.map((item, index) => {
                            if (isFixtures) {
                                const f = item as Fixture;
                                const key = `fixture-${f.home}-${f.away}-${f.date}-${f.time}-${index}`;
                                return <FixtureRow key={key} fixture={f} />;
                            }
                            const r = item as MatchResult;
                            const key = `result-${r.code || `${r.home}-${r.away}-${r.date}-${r.time}`}-${index}`;
                            return <ResultRow key={key} result={r} />;
                        })}
                    </Table.Body>
                </Table.Root>
            </div>

            <div className={css.cardList}>
                {displayedData.map((item, index) => {
                    if (isFixtures) {
                        const f = item as Fixture;
                        const key = `card-fixture-${f.home}-${f.away}-${f.date}-${f.time}-${index}`;
                        return <FixtureCard key={key} fixture={f} />;
                    }
                    const r = item as MatchResult;
                    const key = `card-result-${r.code || `${r.home}-${r.away}-${r.date}-${r.time}`}-${index}`;
                    return <ResultCard key={key} result={r} />;
                })}
            </div>

            <ShowMoreButton
                visible={data.length > visibleCount}
                label={isFixtures ? 'Show More Matches' : 'Show More Results'}
                onClick={() => setVisibleCount(prev => prev + initialCount)}
            />
        </div>
    );
};
