import { IdTextPairTypes } from "types/id-text-pair.types";
import razor from "assets/images/razor.svg";

export const navLinks: IdTextPairTypes[] = [
    {
        id: "products",
        text: "Prodotti"
    },
    {
        id: "gallery",
        text: "Galleria"
    },
    {
        id: "home",
        text: "",
        src: "home"
    },
    {
        id: "contact",
        text: "Contatti"
    },
    {
        id: "book",
        text: "Prenota"
    }
];

export const products: IdTextPairTypes[] = [
    {
        id: "rasors",
        text: "Rasoi",
        src: razor,
        price: 20
    },
    {
        id: "shampoo",
        text: "Shampi",
        src: razor,
        price: 15
    },
    {
        id: "gel",
        text: "Cere",
        src: razor,
        price: 31
    },
    {
        id: "afterShave",
        text: "Dopo barba",
        src: razor,
        price: 18
    }
];
