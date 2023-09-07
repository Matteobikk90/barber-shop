import { ReactNode } from "react";

export interface GlobalState {
    setActiveFilter: Function;
}

export interface ChildrenProps {
    children: ReactNode;
}

export interface ActiveFiltersDispatchProps {
    name: string;
    value: string;
    section?: string;
}
