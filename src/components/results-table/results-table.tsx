'use client';

import { type FC, useEffect, useState } from 'react';
import { Heading, Text } from '@radix-ui/themes';
import { IconTrophy } from '@tabler/icons-react';
import { formatDateFromSerial } from '@utils/date-utils';

import css from './results-table.module.scss';

interface MatchResult {
    date: string;
    home: string;
    away: string;
    score: string;
    venue: string;
    city: string;
    uvoWin: boolean;
    uvoLoss: boolean;
    isUvo: boolean;
}

function determineWin(
    home: string,
    away: string,
    score: string,
): { uvoWin: boolean; uvoLoss: boolean } {
    const isHomeUvo = home.toLowerCase().includes('uvo');
    const isAwayUvo = away.toLowerCase().includes('uvo');

    if (!isHomeUvo && !isAwayUvo) return { uvoWin: false, uvoLoss: false };

    const parts = score.split('-').map(s => Number.parseInt(s.trim(), 10));
    if (
        parts.length !== 2 ||
        Number.isNaN(parts[0]) ||
        Number.isNaN(parts[1])
    ) {
        return { uvoWin: false, uvoLoss: false };
    }

    const [homeScore, awayScore] = parts;

    if (isHomeUvo) {
        return {
            uvoWin: homeScore > awayScore,
            uvoLoss: homeScore < awayScore,
        };
    }
    return { uvoWin: awayScore > homeScore, uvoLoss: awayScore < homeScore };
}

function parseResults(rows: unknown[][]): MatchResult[] {
    return rows
        .filter(row => row.length > 0 && row[0] != null)
        .map(row => {
            const dateSerial = row[0] as number;
            const home = (row[2] as string) ?? '';
            const away = (row[3] as string) ?? '';
            const score = (row[4] as string) ?? '';
            const venue = (row[10] as string) ?? '';
            const city = (row[11] as string) ?? '';
            const { uvoWin, uvoLoss } = determineWin(home, away, score);

            return {
                date:
                    typeof dateSerial === 'number'
                        ? formatDateFromSerial(dateSerial)
                        : String(dateSerial ?? ''),
                home,
                away,
                score,
                venue,
                city,
                uvoWin,
                uvoLoss,
                isUvo:
                    home.toLowerCase().includes('uvo') ||
                    away.toLowerCase().includes('uvo'),
            };
        });
}

export const ResultsTable: FC = () => {
    const [results, setResults] = useState<MatchResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('/api/results')
            .then(res => {
                if (!res.ok) throw new Error('API error');
                return res.json();
            })
            .then((rows: unknown[][]) => {
                setResults(parseResults(rows));
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, []);

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
                            <th>Home</th>
                            <th>Score</th>
                            <th>Away</th>
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
