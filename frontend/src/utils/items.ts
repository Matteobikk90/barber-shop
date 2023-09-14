import { IdTextPairTypes } from "types/id-text-pair.types";
import { SocialsTypes } from "types/social.types";
import frameli from "assets/images/brands/frameli.png";
import level from "assets/images/brands/level.png";
import fanola from "assets/images/brands/fanola.png";
import uppercut from "assets/images/brands/uppercut.png";
import agiva from "assets/images/brands/agiva.png";
import instagram from "assets/images/socials/instagram.svg";
import whatsapp from "assets/images/socials/whatsapp.svg";

export const navLinks: Partial<IdTextPairTypes>[] = [
    // {
    //     id: "products",
    //     text: "Prodotti"
    // },
    {
        id: "services",
        text: "Servizi"
    },
    {
        id: "home",
        text: "",
        src: "home"
    },
    // {
    //     id: "gallery",
    //     text: "Galleria"
    // },
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
        src: frameli
    },
    {
        id: "level",
        text: "L3V3L",
        src: level
    },
    {
        id: "uppercut",
        text: "UPPERCUT",
        src: uppercut
    },
    {
        id: "fanola",
        text: "Fanola",
        src: fanola
    },
    {
        id: "agiva",
        text: "Agiva",
        src: agiva
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
