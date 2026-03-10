/**
 * Shared date utilities for parsing Nevobo Excel serial dates.
 */

/** Convert an Excel serial number to a JS Date (UTC). */
export function excelSerialToDate(serial: number): Date {
    return new Date((serial - 25569) * 86400000);
}

/** Format an Excel serial date as e.g. "Mon 3 Feb". */
export function formatDateFromSerial(serial: number): string {
    const date = excelSerialToDate(serial);
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
    return `${days[date.getUTCDay()]} ${date.getUTCDate()} ${months[date.getUTCMonth()]}`;
}

/** Format an Excel serial time as e.g. "19:30", or "TBD" when unavailable. */
export function formatTimeFromSerial(serial: number): string {
    const date = excelSerialToDate(serial);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    if (hours < 0) return 'TBD';
    return `${hours}:${minutes}`;
}
