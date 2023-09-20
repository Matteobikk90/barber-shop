import { IdTextPairTypes } from "types/id-text-pair.types";
import { SocialsTypes } from "types/social.types";

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

export const shop: Partial<IdTextPairTypes>[] = [
    {
        id: "Shop 1",
        src: "https://blendon-barber-shop.it/assets/images/shop/shop1.jpg"
    },
    {
        id: "Shop 2",
        src: "https://blendon-barber-shop.it/assets/images/shop/shop2.jpg"
    },
    {
        id: "Shop 3",
        src: "https://blendon-barber-shop.it/assets/images/shop/shop3.jpg"
    },
    {
        id: "Shop 5",
        src: "https://blendon-barber-shop.it/assets/images/shop/shop5.jpg"
    }
];

export const gallery: Partial<IdTextPairTypes>[] = [
    {
        id: "Gallery 1",
        src: "https://blendon-barber-shop.it/assets/images/gallery/gallery1.jpg"
    },
    {
        id: "Gallery 2",
        src: "https://blendon-barber-shop.it/assets/images/gallery/gallery2.jpg"
    },
    {
        id: "Gallery 3",
        src: "https://blendon-barber-shop.it/assets/images/gallery/gallery3.jpg"
    },
    {
        id: "Gallery 4",
        src: "https://blendon-barber-shop.it/assets/images/gallery/gallery4.jpg"
    },
    {
        id: "Gallery 5",
        src: "https://blendon-barber-shop.it/assets/images/gallery/gallery5.jpg"
    },
    {
        id: "Gallery 6",
        src: "https://blendon-barber-shop.it/assets/images/gallery/gallery6.jpg"
    },
    {
        id: "Gallery 7",
        src: "https://blendon-barber-shop.it/assets/images/gallery/gallery7.jpg"
    },
    {
        id: "Gallery 8",
        src: "https://blendon-barber-shop.it/assets/images/gallery/gallery8.jpg"
    }
];

export const socials: SocialsTypes[] = [
    {
        url: "blendon_barbershop",
        src: "https://blendon-barber-shop.it/assets/images/socials/instagram.svg",
        id: "Instagram"
    },
    {
        url: "https://wa.me/390110745767",
        src: "https://blendon-barber-shop.it/assets/images/socials/whatsapp.svg",
        id: "WhatsApp"
    }
];

export const brands: Partial<IdTextPairTypes>[] = [
    {
        id: "framesi",
        text: "Framesi Barber Gen",
        src: "https://blendon-barber-shop.it/assets/images/brands/framesi.png"
    },
    {
        id: "level",
        text: "L3V3L",
        src: "https://blendon-barber-shop.it/assets/images/brands/level.png"
    },
    {
        id: "uppercut",
        text: "UPPERCUT",
        src: "https://blendon-barber-shop.it/assets/images/brands/uppercut.png"
    },
    {
        id: "fanola",
        text: "Fanola",
        src: "https://blendon-barber-shop.it/assets/images/brands/fanola.png"
    },
    {
        id: "agiva",
        text: "Agiva",
        src: "https://blendon-barber-shop.it/assets/images/brands/agiva.png"
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
