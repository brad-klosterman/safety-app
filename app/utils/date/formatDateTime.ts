enum FormatOptions {
    'date',
    'dateTime',
    'time',
}

interface DateTimeParams {
    date: string | number | Date | null | undefined;
    format?: keyof typeof FormatOptions;
    locale: string;
}

function formatDateTime({ date, format = 'date', locale }: DateTimeParams) {
    if (!date) {
        return null;
    }
    try {
        const event = new Date(date);
        const eventDate = event.toLocaleDateString(locale);
        const eventTime = event.toLocaleTimeString(locale);

        if (format === 'date') {
            return eventDate;
        }

        if (format === 'time') {
            return eventTime;
        }

        return `${eventTime}  ${eventDate}`;
    } catch (e) {
        return null;
    }
}

const dateToString = (date: Date): string => {
    const date_year = date.getFullYear();
    let date_month: string | number = date.getMonth() + 1;
    let date_day: string | number = date.getDate();

    date_month = date_month < 10 ? `0${date_month}` : date_month;
    date_day = date_day < 10 ? `0${date_day}` : date_day;

    return date_year + '-' + date_month + '-' + date_day;
};

export { formatDateTime, dateToString };
