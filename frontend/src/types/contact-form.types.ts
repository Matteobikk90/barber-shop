export type FormDataTypes = {
    name: string;
    email: string;
    phone: number | null;
    message: string;
};

export type InputTypes = {
    name: string;
    value: string;
    type: string;
    checked?: boolean;
};

export type FormTypes = {
    onValidated: Function;
    status: string;
};
