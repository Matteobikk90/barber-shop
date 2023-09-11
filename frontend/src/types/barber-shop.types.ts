import { ReactNode } from "react";

export interface GlobalState {
    selectedBrand: string;
    setActiveFilter: Function;
}

export interface ChildrenProps {
    children: ReactNode;
}

export interface ActiveFiltersDispatchProps {
    name: string;
    value: string;
}
