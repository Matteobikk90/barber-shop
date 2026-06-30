export type IdTextPairTypes = {
    id: string;
    text: string;
    src: string;
    src2?: string;
    price: number;
    time: number;
    products: Partial<IdTextPairTypes>[];
};
