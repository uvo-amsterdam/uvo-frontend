export const getWeekNumber = (date: Date): number => {
    const d = new Date(
        Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
    );
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};

export type ScheduleType =
    | 'mondayEven'
    | 'mondayUneven'
    | 'thursdayEven'
    | 'thursdayUneven';

/**
 * Determines which of the 4 schedules is the 'next' upcoming session relative to the given date-time.
 */
export const getNextScheduleType = (
    currentDate: Date = new Date(),
): ScheduleType => {
    // Note: Assuming trainings end by ~23:00.
    // Cutoffs and week parity are calculated using UTC to ensure consistency across environments.

    const isCurrentlyEvenWeek = getWeekNumber(currentDate) % 2 === 0;
    const dayOfWeek = currentDate.getUTCDay() || 7; // 1 = Mon, ..., 7 = Sun
    const hours = currentDate.getUTCHours();

    // Past Thursday training cutoff (e.g., 23:00 UTC) -> Next is Monday of NEXT week
    if (dayOfWeek > 4 || (dayOfWeek === 4 && hours >= 23)) {
        // Looking ahead to next week
        const nextWeekIsEven = !isCurrentlyEvenWeek;
        return nextWeekIsEven ? 'mondayEven' : 'mondayUneven';
    }

    // Between Monday training cutoff and Thursday -> Next is Thursday THIS week
    if (dayOfWeek > 1 || (dayOfWeek === 1 && hours >= 23)) {
        return isCurrentlyEvenWeek ? 'thursdayEven' : 'thursdayUneven';
    }

    // Before or during Monday training -> Next is Monday THIS week
    return isCurrentlyEvenWeek ? 'mondayEven' : 'mondayUneven';
};
