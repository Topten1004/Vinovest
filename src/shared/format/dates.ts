import {format} from 'date-fns';
import i18n  from '#localization/i18n';
import {locales} from "#localization/constants"

export const dateFormats = {
    shortMonthDayandYear: "MMM dd, YYY"
}

export const formatDate = (date: Date, dateFormatString: string): string => {
    const currentLocale = locales[i18n.language];
    return format(date, dateFormatString, {locale: currentLocale})
}

