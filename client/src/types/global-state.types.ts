type PayloadProps = {
    name: string;
    value: string;
    section?: string;
};

export type Actions = {
    type: string;
    payload: PayloadProps;
};
