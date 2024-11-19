import React from "react";
import { DayTitleProps } from "./types";
declare type DayTitleState = {
    dateFormat: string;
};
export default class DayTitle extends React.Component<DayTitleProps, DayTitleState> {
    dayTitle: any;
    constructor(props: DayTitleProps);
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};
