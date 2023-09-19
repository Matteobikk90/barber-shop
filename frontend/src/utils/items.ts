import { IdTextPairTypes } from "types/id-text-pair.types";
import { SocialsTypes } from "types/social.types";
import framesi from "assets/images/brands/framesi.png";
import level from "assets/images/brands/level.png";
import fanola from "assets/images/brands/fanola.png";
import uppercut from "assets/images/brands/uppercut.png";
import agiva from "assets/images/brands/agiva.png";
import instagram from "assets/images/socials/instagram.svg";
import whatsapp from "assets/images/socials/whatsapp.svg";
import gallery1 from "assets/images/gallery/gallery1.jpg";
import gallery2 from "assets/images/gallery/gallery2.jpg";
import gallery3 from "assets/images/gallery/gallery3.jpg";
import gallery4 from "assets/images/gallery/gallery4.jpg";
import gallery5 from "assets/images/gallery/gallery5.jpg";
import gallery6 from "assets/images/gallery/gallery6.jpg";
import gallery7 from "assets/images/gallery/gallery7.jpg";
import gallery8 from "assets/images/gallery/gallery8.jpg";

export const navLinks: Partial<IdTextPairTypes>[] = [
    // {
    //     id: "prodotti",
    //     text: "Prodotti"
    // },
    {
        id: "servizi",
        text: "Servizi"
    },
    {
        id: "home",
        text: "",
        src: "home"
    },
    {
        id: "galleria",
        text: "Galleria"
    },
    {
        id: "contatti",
        text: "Contatti"
    }
];

export const gallery: Partial<IdTextPairTypes>[] = [
    {
        id: "Gallery 1",
        src: gallery1
    },
    {
        id: "Gallery 2",
        src: gallery2
    },
    {
        id: "Gallery 3",
        src: gallery3
    },
    {
        id: "Gallery 4",
        src: gallery4
    },
    {
        id: "Gallery 5",
        src: gallery5
    },
    {
        id: "Gallery 6",
        src: gallery6
    },
    {
        id: "Gallery 7",
        src: gallery7
    },
    {
        id: "Gallery 8",
        src: gallery8
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
        src: framesi
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
