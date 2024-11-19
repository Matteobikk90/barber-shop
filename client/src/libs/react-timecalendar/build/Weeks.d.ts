import { PureComponent } from "react";
import { WeeksProps } from "./types";
export default class Weeks extends PureComponent<WeeksProps> {
    generateClasses(day: Date): string;
    isDaySelected(day: Date): boolean;
    isdayDisabled(day: Date): boolean;
    isBetweenBookings(day: Date): boolean;
    render(): JSX.Element;
}
