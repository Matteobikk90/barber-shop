import { IdTextPairTypes } from "types/id-text-pair.types";
import { SocialsTypes } from "types/social.types";
import razor from "assets/images/razor.svg";
import instagram from "assets/images/socials/instagram.svg";
import whatsapp from "assets/images/socials/whatsapp.svg";

export const navLinks: Partial<IdTextPairTypes>[] = [
    {
        id: "products",
        text: "Prodotti"
    },
    {
        id: "services",
        text: "Servizi"
    },
    {
        id: "home",
        text: "",
        src: "home"
    },
    {
        id: "gallery",
        text: "Galleria"
    },
    {
        id: "contact",
        text: "Contatti"
    }
];

export const socials: SocialsTypes[] = [
    {
        url: "blendon_barbershop",
        src: instagram,
        id: "Instagram"
    },
    { url: "https://wa.me/390110745767", src: whatsapp, id: "WhatsApp" }
];

export const brands: Partial<IdTextPairTypes>[] = [
    {
        id: "framesi",
        text: "Framesi Barber Gen",
        src: razor,
        price: 20
    },
    {
        id: "level",
        text: "L3V3L",
        src: razor,
        price: 15
    },
    {
        id: "uppercut",
        text: "UPPERCUT",
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
export const services: Partial<IdTextPairTypes>[] = [
    {
        id: "cut",
        text: "Taglio",
        price: 17,
        time: 30
    },
    {
        id: "cut&shave",
        text: "Taglio + rifinitura barba",
        price: 25,
        time: 45
    },
    {
        id: "barba",
        text: "Barba definita",
        price: 10,
        time: 30
    },
    {
        id: "barbaModellata",
        text: "Barba modellata",
        price: 12,
        time: 30
    },
    {
        id: "barbaCompleta",
        text: "Barba completa",
        price: 15,
        time: 30
    },
    {
        id: "bimbo",
        text: "Taglio bimbo (max 12 anni)",
        price: 12,
        time: 30
    },
    {
        id: "shampoo",
        text: "Shampoo + asciugatura",
        price: 5,
        time: 30
    }
];
