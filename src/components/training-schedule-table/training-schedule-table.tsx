import type { FC } from 'react';
import type { ScheduleItem } from '@interfaces/training-schedule.interface';
import { Heading } from '@radix-ui/themes';
import { IconCalendarEvent, IconClock } from '@tabler/icons-react';
import clsx from 'clsx';

import css from './training-schedule-table.module.scss';

interface TrainingScheduleTableProps {
    title: string;
    data: ScheduleItem[];
    highlight?: boolean;
}

export const TrainingScheduleTable: FC<TrainingScheduleTableProps> = ({
    title,
    data,
    highlight = false,
}) => {
    if (!data || data.length === 0) return null;

    return (
        <div
            className={css.tableContainer}
            id={title.replace(/\s+/g, '-').toLowerCase()}
        >
            <Heading
                as="h2"
                className={clsx(css.tableTitle, {
                    [css.highlightedTitle]: highlight,
                })}
            >
                {highlight && (
                    <IconCalendarEvent
                        size={28}
                        stroke={2}
                        aria-hidden="true"
                    />
                )}
                {title} {highlight && '(Next Training)'}
            </Heading>

            {/* ── Desktop table ── */}
            <div
                className={clsx(css.tableWrap, {
                    [css.tableWrapHighlighted]: highlight,
                })}
            >
                <table className={css.table}>
                    <thead
                        className={clsx({ [css.theadHighlighted]: highlight })}
                    >
                        <tr>
                            <th>Time</th>
                            <th>Field 1</th>
                            <th>Field 2</th>
                            <th>Field 3</th>
                            <th>Field 4</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(row => (
                            <tr key={row.id}>
                                <td className={css.timeCol}>{row.Time}</td>
                                <td>{row.Field_1 || '-'}</td>
                                <td>{row.Field_2 || '-'}</td>
                                <td>{row.Field_3 || '-'}</td>
                                <td>{row.Field_4 || '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ── Mobile cards ── */}
            <div className={css.cardList}>
                {data.map(row => (
                    <div
                        key={row.id}
                        className={clsx(css.card, {
                            [css.cardHighlighted]: highlight,
                        })}
                    >
                        <div className={css.cardHeader}>
                            <span className={css.cardTime}>
                                <IconClock
                                    size={16}
                                    style={{
                                        display: 'inline',
                                        verticalAlign: 'text-bottom',
                                        marginRight: '4px',
                                    }}
                                />
                                {row.Time}
                            </span>
                        </div>
                        <div className={css.cardFields}>
                            <div className={css.fieldRow}>
                                <span className={css.fieldLabel}>Field 1</span>
                                <span
                                    className={
                                        row.Field_1
                                            ? css.fieldValue
                                            : css.emptyField
                                    }
                                >
                                    {row.Field_1 || 'Available'}
                                </span>
                            </div>
                            <div className={css.fieldRow}>
                                <span className={css.fieldLabel}>Field 2</span>
                                <span
                                    className={
                                        row.Field_2
                                            ? css.fieldValue
                                            : css.emptyField
                                    }
                                >
                                    {row.Field_2 || 'Available'}
                                </span>
                            </div>
                            <div className={css.fieldRow}>
                                <span className={css.fieldLabel}>Field 3</span>
                                <span
                                    className={
                                        row.Field_3
                                            ? css.fieldValue
                                            : css.emptyField
                                    }
                                >
                                    {row.Field_3 || 'Available'}
                                </span>
                            </div>
                            <div className={css.fieldRow}>
                                <span className={css.fieldLabel}>Field 4</span>
                                <span
                                    className={
                                        row.Field_4
                                            ? css.fieldValue
                                            : css.emptyField
                                    }
                                >
                                    {row.Field_4 || 'Available'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
