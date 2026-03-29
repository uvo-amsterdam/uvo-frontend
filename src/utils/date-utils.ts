/**
 * Shared date utilities for parsing dates and times directly.
 */

/** Format an ISO date string or Date object as e.g. "Mon 3 Feb". */
export function formatDateStr(
    dateInput: string | Date | number | null,
): string {
    if (dateInput == null) return '';
    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) {
        return String(dateInput);
    }

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
}

/** Format a time string or Date object as e.g. "19:30", or "TBD" when unavailable. */
export function formatTimeStr(timeInput: string | Date | number): string {
    // Sometimes time comes as a fraction of a day (e.g. 0.8125 for 19:30)
    if (typeof timeInput === 'number' && timeInput < 1) {
        const totalMinutes = Math.round(timeInput * 24 * 60);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}:${minutes.toString().padStart(2, '0')}`;
    }

    const date = new Date(timeInput);
    if (Number.isNaN(date.getTime())) {
        return String(timeInput);
    }

    // read-excel-file extracts times as valid Date objects with 1899-12-30 or similar dummy dates
    // but the local hour/minute is preserved
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    if (hours === 0 && Number.parseInt(minutes, 10) === 0) return 'TBD';
    return `${hours}:${minutes}`;
}
