import { PureComponent } from "react";
import { TimeSelectProps } from "./types";
declare type TimeSelectState = {
    selectorClass: string;
};
export default class TimeSelect extends PureComponent<TimeSelectProps, TimeSelectState> {
    constructor(props: TimeSelectProps);
    selectorClick(): void;
    generateOpenHours(): Date[];
    isTimeDisabled(time: Date, openHours: Date[]): boolean;
    render(): JSX.Element;
}
export {};
