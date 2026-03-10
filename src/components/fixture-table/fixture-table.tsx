'use client';

import { type FC, useEffect, useState } from 'react';
import { Heading, Text } from '@radix-ui/themes';
import { formatDateFromSerial, formatTimeFromSerial } from '@utils/date-utils';

import css from './fixture-table.module.scss';

interface Fixture {
    date: string;
    time: string;
    home: string;
    away: string;
    venue: string;
    city: string;
    isUvo: boolean;
}

function parseFixtures(rows: unknown[][]): Fixture[] {
    return rows
        .filter(row => row.length > 0 && row[0] != null)
        .map(row => {
            const dateSerial = row[0] as number;
            const timeSerial = row[1] as number;
            const home = (row[2] as string) ?? '';
            const away = (row[3] as string) ?? '';
            const venue = (row[10] as string) ?? '';
            const city = (row[11] as string) ?? '';

            return {
                date:
                    typeof dateSerial === 'number'
                        ? formatDateFromSerial(dateSerial)
                        : String(dateSerial ?? ''),
                time:
                    typeof timeSerial === 'number'
                        ? formatTimeFromSerial(timeSerial)
                        : String(timeSerial ?? ''),
                home,
                away,
                venue,
                city,
                isUvo:
                    home.toLowerCase().includes('uvo') ||
                    away.toLowerCase().includes('uvo'),
            };
        });
}

export const FixtureTable: FC = () => {
    const [fixtures, setFixtures] = useState<Fixture[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('/api/fixtures')
            .then(res => {
                if (!res.ok) throw new Error('API error');
                return res.json();
            })
            .then((rows: unknown[][]) => {
                setFixtures(parseFixtures(rows));
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
