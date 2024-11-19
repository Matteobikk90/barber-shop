import { PureComponent } from "react";
import { TimeCalendarProps } from "./types";
import "./App.scss";
declare type TimeCalendarState = {
    selectedDate: Date;
    timeSelect: boolean;
};
export default class TimeCalendar extends PureComponent<TimeCalendarProps, TimeCalendarState> {
    constructor(props: any);
    onDateClick(day: Date): void;
    nextTime(): void;
    prevTime(): void;
    timeSelectToggle(): void;
    render(): JSX.Element;
}
export {};
