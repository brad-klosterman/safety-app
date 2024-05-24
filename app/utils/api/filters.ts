import { dateToString } from '../date/formatDateTime';

function formatStartDateFilter(days_ago: number | null | undefined) {
    if (!days_ago) return undefined;

    const start_date = new Date();
    start_date.setDate(start_date.getDate() - days_ago);

    return dateToString(start_date);
}

const getActiveFiltersCount = (object: Record<string, unknown> | null | undefined) => {
    let count = 0;

    if (!object) return count;

    for (const value of Object.values(object)) {
        if (value === null || value === undefined || value === '') {
            continue;
        }
        count++;
    }
    return count;
};

export { formatStartDateFilter, getActiveFiltersCount };
