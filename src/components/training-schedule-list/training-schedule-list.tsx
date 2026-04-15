'use client';

import { type FC, useEffect, useState } from 'react';
import { TrainingScheduleTable } from '@components/training-schedule-table/training-schedule-table';
import { useTrainingSchedules } from '@hooks/use-training-schedules';
import type { ScheduleItem } from '@interfaces/training-schedule';
import { getNextScheduleType, type ScheduleType } from '@utils/schedule-utils';

import css from './training-schedule-list.module.scss';

export const TrainingScheduleList: FC = () => {
    const { data, loading, error } = useTrainingSchedules();

    // Determine the next schedule type based on the current time, and keep it updated
    const [nextScheduleType, setNextScheduleType] =
        useState<ScheduleType>(getNextScheduleType);

    useEffect(() => {
        // Update periodically to stay accurate if the user keeps the tab open across a cutoff
        const intervalId = setInterval(() => {
            setNextScheduleType(getNextScheduleType());
        }, 1000 * 60);

        return () => clearInterval(intervalId);
    }, []);

    if (loading) {
        return (
            <div className={css.listContainer}>
                <div className={css.loadingState}>
                    <div className={css.skeletonWrap}>
                        <div className={css.skeletonTitle} />
                        <div className={css.skeletonRow} />
                        <div className={css.skeletonRow} />
                        <div className={css.skeletonRow} />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className={css.listContainer}>
                <div className={css.errorState}>
                    Failed to load training schedules. Please let a board member
                    or IT committee member know and try again later.
                </div>
            </div>
        );
    }

    const schedules: {
        type: ScheduleType;
        title: string;
        data: ScheduleItem[];
    }[] = [
        {
            type: 'mondayEven',
            title: 'Monday (Even Weeks)',
            data: data.mondayEven,
        },
        {
            type: 'thursdayEven',
            title: 'Thursday (Even Weeks)',
            data: data.thursdayEven,
        },
        {
            type: 'mondayUneven',
            title: 'Monday (Uneven Weeks)',
            data: data.mondayUneven,
        },
        {
            type: 'thursdayUneven',
            title: 'Thursday (Uneven Weeks)',
            data: data.thursdayUneven,
        },
    ];

    const isEvenWeekNow = nextScheduleType.includes('Even');

    const sortedSchedules = [...schedules].sort((a, b) => {
        // 1. Next session always first
        if (a.type === nextScheduleType) return -1;
        if (b.type === nextScheduleType) return 1;

        // 2. Then other sessions of the same week type (Even vs Uneven)
        const aMatchesWeek = a.type.includes(isEvenWeekNow ? 'Even' : 'Uneven');
        const bMatchesWeek = b.type.includes(isEvenWeekNow ? 'Even' : 'Uneven');

        if (aMatchesWeek && !bMatchesWeek) return -1;
        if (!aMatchesWeek && bMatchesWeek) return 1;

        // 3. Maintain original day order (Monday before Thursday)
        return 0;
    });

    return (
        <div className={css.listContainer}>
            {sortedSchedules.map(schedule => (
                <TrainingScheduleTable
                    key={schedule.type}
                    title={schedule.title}
                    data={schedule.data}
                    highlight={schedule.type === nextScheduleType}
                />
            ))}
        </div>
    );
};
