export const getWeekNumber = (date: Date): number => {
    const d = new Date(
        Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
    );
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};

/**
 * Converts a given Date into a new Date object where the UTC methods (getUTCHours, etc.)
 * return the values corresponding to the Europe/Amsterdam timezone.
 */
export const getAmsterdamDate = (date: Date): Date => {
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Europe/Amsterdam',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
    }).formatToParts(date);

    const values: Record<string, number> = {};
    for (const part of parts) {
        if (part.type !== 'literal') {
            values[part.type] = parseInt(part.value, 10);
        }
    }

    // Intl sometimes returns 24:00:00 for midnight
    const hour = values.hour;

    return new Date(
        Date.UTC(
            values.year,
            values.month - 1,
            values.day,
            hour,
            values.minute,
            values.second,
        ),
    );
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
    // Determine the equivalent time in Amsterdam
    const amsDate = getAmsterdamDate(currentDate);

    // Cutoffs and week parity are calculated using the Amsterdam-shifted UTC values.
    const isCurrentlyEvenWeek = getWeekNumber(amsDate) % 2 === 0;
    const dayOfWeek = amsDate.getUTCDay() || 7; // 1 = Mon, ..., 7 = Sun
    const hours = amsDate.getUTCHours();

    // Past Thursday training cutoff (e.g., 23:00 Amsterdam time) -> Next is Monday of NEXT week
    if (dayOfWeek > 4 || (dayOfWeek === 4 && hours >= 23)) {
        // Looking ahead to next week
        const nextWeekDate = new Date(amsDate.getTime());
        nextWeekDate.setUTCDate(amsDate.getUTCDate() + 7);
        const nextWeekIsEven = getWeekNumber(nextWeekDate) % 2 === 0;
        return nextWeekIsEven ? 'mondayEven' : 'mondayUneven';
    }

    // Between Monday training cutoff and Thursday -> Next is Thursday THIS week
    if (dayOfWeek > 1 || (dayOfWeek === 1 && hours >= 23)) {
        return isCurrentlyEvenWeek ? 'thursdayEven' : 'thursdayUneven';
    }

    // Before or during Monday training -> Next is Monday THIS week
    return isCurrentlyEvenWeek ? 'mondayEven' : 'mondayUneven';
};
