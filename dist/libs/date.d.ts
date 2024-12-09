import dayjs from 'dayjs';
import { DateType, WeekDaysIndexType, WeekStringType } from '../types';
export declare function loadLanguageModule(language?: string): void;
export declare function dateIsValid(date: DateType): boolean;
export declare function isCurrentDay(date: Date): boolean;
export declare function dateIsSame(a: Date, b: Date, unit: dayjs.OpUnitType): boolean;
export declare function dateIsBefore(a: Date, b: Date, unit: dayjs.OpUnitType): boolean;
export declare function dateIsAfter(a: Date, b: Date, unit: dayjs.OpUnitType): boolean;
export declare function dateIsSameOrBefore(a: DateType, b: DateType, unit: dayjs.OpUnitType): boolean;
export declare function dateIsSameOrAfter(a: DateType, b: DateType, unit: dayjs.OpUnitType): boolean;
export declare function dateIsBetween(whoIsBetween: Date, start: Date, end: Date, unit: dayjs.OpUnitType, include?: {
    start?: boolean;
    end?: boolean;
}): boolean;
export declare function dateFormat(date: DateType, format: string, local?: string): string | null;
export declare function dateStringToDate(dateString: string): Date | null;
export declare function previousMonthBy(date: DateType): Date;
export declare function nextMonthBy(date: DateType): Date;
export declare function dateUpdateMonth(date: DateType, value: number): Date;
export declare function dateUpdateYear(date: DateType, value: number): Date;
export declare function firstDayOfMonth(date?: Date): Date;
export declare function endDayOfMonth(date?: Date): Date;
export declare function dayIndexInWeek(date?: Date): 0 | 1 | 2 | 3 | 4 | 5 | 6;
export declare function previousDaysInWeek(date: Date, weekStartDayIndex?: WeekDaysIndexType): Date[];
export declare function nextDaysInWeek(date: Date, weekStartDayIndex?: WeekDaysIndexType): Date[];
export declare function daysInMonth(date?: dayjs.ConfigType): number;
export declare function allDaysInMonth(date?: Date): Date[];
export declare function weekDayStringToIndex(dayString?: WeekStringType): WeekDaysIndexType;
export declare function dateAdd(date: Date, value: number, unit: dayjs.ManipulateType): Date;
export declare function getNextDates(date: Date, limit: number): Date[];
