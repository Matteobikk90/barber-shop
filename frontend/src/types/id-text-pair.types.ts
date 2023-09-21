export type IdTextPairTypes = {
    id: string;
    text: string;
    src: string;
    price: number;
    time: number;
    products: Partial<IdTextPairTypes>[];
};
