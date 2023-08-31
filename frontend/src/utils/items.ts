import { IdTextPairTypes } from "types/id-text-pair.types";
import { SocialsTypes } from "types/social.types";
import razor from "assets/images/razor.svg";
import instagram from "assets/images/socials/instagram.svg";
import facebook from "assets/images/socials/facebook.svg";
import linkedin from "assets/images/socials/linkedin.svg";
import twitter from "assets/images/socials/twitter.svg";
import whatsapp from "assets/images/socials/whatsapp.svg";

export const navLinks: IdTextPairTypes[] = [
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
        url: "luca@insta.it",
        src: instagram,
        id: "Instagram"
    },
    {
        url: "luca@insta.it",
        src: twitter,
        id: "Twitter"
    },
    {
        url: "luca@insta.it",
        src: facebook,
        id: "facebook"
    },
    {
        url: "luca@insta.it",
        src: linkedin,
        id: "Linkedin"
    },
    { url: "https://wa.me/39357848484", src: whatsapp, id: "WhatsApp" }
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
