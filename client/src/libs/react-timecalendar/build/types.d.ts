export declare type Booking = {
    id: string;
    start_time: Date;
    end_time: Date;
};
export declare type SelectedTime = {
    start: string;
    end: string;
};
type OpeningWindow = readonly [opening: number, closing: number];
export declare type OpeningHoursByDate = Readonly<
    Partial<Record<string, readonly [OpeningWindow, ...OpeningWindow[]]>>
>;
export interface DayProps {
    classSet: string;
    date: string;
    day: string;
    onDateClick: Function;
}
export interface DayTitleProps {
    currentMonth: Date;
}
export interface HeaderProps {
    selectedDate: string;
    prevTime: Function;
    nextTime: Function;
}
export interface TimeCalendarProps {
    openHours: number[][];
    openingHoursByDate?: OpeningHoursByDate;
    isDateUnavailable?: (date: Date) => boolean;
    isTimeUnavailable?: (time: Date) => boolean;
    bookings: Booking[];
    disableHistory: boolean;
    clickable: boolean;
    timeSlot: number;
    onDateFunction: Function;
    onTimeClick: Function;
    selectedTime: SelectedTime;
    initialDate?: Date;
    currentDate?: Date;
}
export interface TimeSelectProps {
    disableHistory: boolean;
    day: any;
    selectedDate: Date;
    timeSlot: number;
    openHours: number[][];
    openingHoursByDate?: OpeningHoursByDate;
    isTimeUnavailable?: (time: Date) => boolean;
    onTimeClick: Function;
    bookings: Booking[];
    selectedTime: SelectedTime;
    currentDate?: Date;
}
export interface TimeSlotProps {
    classSet: string;
    time: string;
    onTimeClick: Function;
}
export interface WeeksProps {
    selectedDate: Date;
    bookings: Booking[];
    timeSlot: number;
    onDateClick: Function;
    clickable: boolean;
    disableHistory: boolean;
    selectedTime: SelectedTime;
    openingHoursByDate?: OpeningHoursByDate;
    isDateUnavailable?: (date: Date) => boolean;
    currentDate?: Date;
}
