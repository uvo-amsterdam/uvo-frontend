import type { FC } from 'react';
import type { ScheduleItem } from '@interfaces/training-schedule';
import { Heading } from '@radix-ui/themes';
import { IconCalendarEvent, IconClock } from '@tabler/icons-react';
import { createSlug } from '@utils/string-utils';
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
        <div className={css.tableContainer} id={createSlug(title)}>
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

            <div
                className={clsx(css.tableWrap, {
                    [css.tableWrapHighlighted]: highlight,
                })}
            >
                <table className={css.table}>
                    <caption className={css.visuallyHidden}>
                        {title} training schedule
                    </caption>
                    <thead
                        className={clsx({ [css.theadHighlighted]: highlight })}
                    >
                        <tr>
                            <th scope="col">Time</th>
                            <th scope="col">Field 1</th>
                            <th scope="col">Field 2</th>
                            <th scope="col">Field 3</th>
                            <th scope="col">Field 4</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            // biome-ignore lint/suspicious/noArrayIndexKey: Index is needed because backend IDs may not be unique across collections or due to data entry errors
                            <tr key={`${row.id}-${index}`}>
                                <td className={css.timeCol}>
                                    {row.time || 'Available'}
                                </td>
                                <td>{row.field1 || 'Available'}</td>
                                <td>{row.field2 || 'Available'}</td>
                                <td>{row.field3 || 'Available'}</td>
                                <td>{row.field4 || 'Available'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className={css.cardList}>
                {data.map((row, index) => (
                    <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: Index is needed because backend IDs may not be unique across collections or due to data entry errors
                        key={`${row.id}-${index}`}
                        className={clsx(css.card, {
                            [css.cardHighlighted]: highlight,
                        })}
                    >
                        <div className={css.cardHeader}>
                            <span className={css.cardTime}>
                                <IconClock
                                    size={16}
                                    aria-hidden="true"
                                    style={{
                                        display: 'inline',
                                        verticalAlign: 'text-bottom',
                                        marginRight: '4px',
                                    }}
                                />
                                {row.time || 'Available'}
                            </span>
                        </div>
                        <div className={css.cardFields}>
                            <div className={css.fieldRow}>
                                <span className={css.fieldLabel}>Field 1</span>
                                <span
                                    className={
                                        row.field1
                                            ? css.fieldValue
                                            : css.emptyField
                                    }
                                >
                                    {row.field1 || 'Available'}
                                </span>
                            </div>
                            <div className={css.fieldRow}>
                                <span className={css.fieldLabel}>Field 2</span>
                                <span
                                    className={
                                        row.field2
                                            ? css.fieldValue
                                            : css.emptyField
                                    }
                                >
                                    {row.field2 || 'Available'}
                                </span>
                            </div>
                            <div className={css.fieldRow}>
                                <span className={css.fieldLabel}>Field 3</span>
                                <span
                                    className={
                                        row.field3
                                            ? css.fieldValue
                                            : css.emptyField
                                    }
                                >
                                    {row.field3 || 'Available'}
                                </span>
                            </div>
                            <div className={css.fieldRow}>
                                <span className={css.fieldLabel}>Field 4</span>
                                <span
                                    className={
                                        row.field4
                                            ? css.fieldValue
                                            : css.emptyField
                                    }
                                >
                                    {row.field4 || 'Available'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
