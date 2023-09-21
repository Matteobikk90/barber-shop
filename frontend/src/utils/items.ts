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
        src: "https://blendon-barber-shop.it/assets/images/brands/framesi.png",
        products: [
            {
                id: "HAIR AND BEARD - NATURAL CLEANSER",
                text: "Shampoo per barba e capelli. Ideale per uso frequente, contiene il 98% di ingredienti di origine naturale. Deterge e profuma, ammorbidisce e idrata lasciando una sensazione di leggerezza e freschezza sulla cute e sul viso.",
                src: "https://blendon-barber-shop.it/assets/images/brands/framesi/1.svg",
                price: 20
            },
            {
                id: "HAIR AND BEARD - NATURAL BALM",
                text: "Condizionante per barba e capelli. Ideale per uso frequente, contiene il 98% di ingredienti di origine naturale. Dona  morbidezza e idratazione profonda, perfezionando la detersione quotidiana.",
                src: "https://blendon-barber-shop.it/assets/images/brands/framesi/2.svg",
                price: 20
            },
            {
                id: "ICE TONIC",
                text: "Lozione lenitiva e rinfrescante per viso e cute. Ideale dopo la rasatura, allevia istantaneamente il fastidio di rossore e irritazione, donando una persistente sensazione di freschezza",
                src: "https://blendon-barber-shop.it/assets/images/brands/framesi/3.svg",
                price: 20
            },
            {
                id: "BEARD DRY CLEANSER",
                text: "Gel per barba ad azione igienizzante. Profumato con oli essenziali di limone, menta piperita e tea tree, è pensato per l’igiene della barba fuori casa",
                src: "https://blendon-barber-shop.it/assets/images/brands/framesi/4.svg",
                price: 20
            },
            {
                id: "AFTER SHAVE CLEAN",
                text: "Crema dopobarba. Emolliente e idratante, è formulata per la pelle maschile. Si assorbe facilmente e dona al viso morbidezza ed elasticità senza ungere.",
                src: "https://blendon-barber-shop.it/assets/images/brands/framesi/5.svg",
                price: 20
            },
            {
                id: "BEARD OIL",
                text: "Olio da barba emolliente e nutritivo. Idrata e lucida, rendendo il pelo morbido e disciplinato. Adatto a tutte le barbe e come pre rasatura. ",
                src: "https://blendon-barber-shop.it/assets/images/brands/framesi/6.svg",
                price: 20
            },
            {
                id: "REBALANSING SHAMPOO",
                text: "Specifico per la cute grassa, un inestetismo comunemente maschile, ha un effetto astringente e rinfrescante grazie anche gli estratti di uva rossa e zenzero. L’utilizzo costante aiuta a normalizzare l’attività delle ghiandole sebacee.",
                src: "https://blendon-barber-shop.it/assets/images/brands/framesi/7.svg",
                price: 20
            },
            {
                id: "DETOX SHAMPOO",
                text: "Specifico per combattere la forfora, svolge una profonda azione purificante e detossinante mentre ostacola la desquamazione del cuoio capelluto. La sua formulazione, arricchita con estratti di limone e  arancia rispetta l’equilibrio idrolipidico della cute",
                src: "https://blendon-barber-shop.it/assets/images/brands/framesi/8.svg",
                price: 20
            },
            {
                id: "FORTIFYING SHAMPOO",
                text: "Realizzato per i capelli maschili più fini e fragili, ha un ottimo potere energizzante e rinforzante. Ingredienti di origine biologica, specificamente estratti di vite, incenso e zenzero, fanno di questo shampoo la soluzione ideale per dare ai capelli corpo e spessore.",
                src: "https://blendon-barber-shop.it/assets/images/brands/framesi/9.svg",
                price: 20
            },
            {
                id: "FORTIFYING SPRAY",
                text: "Lozione energizzante e fortificante per i capelli maschili fini e fragili. Con uno stelo più forte e radici più salde, i capelli acquistano una texture più densa e consistente che facilita la tenuta dello styling.",
                src: "https://blendon-barber-shop.it/assets/images/brands/framesi/10.svg",
                price: 20
            },
            {
                id: "VOLUMIZING LOTION",
                text: "Spray volumizzante, ideale anche per i capelli fini. Regala un volume naturale che dura tutto il giorno e una texture piena. Il risultato è immediato: la fibra capillare appare più spessa, vitale e leggera.",
                src: "https://blendon-barber-shop.it/assets/images/brands/framesi/11.svg",
                price: 20
            },
            {
                id: "LEAVE-IN SPRAY",
                text: "Condizionante senza risciacquo specifico per i capelli maschili. Idratante e districante, mantiene i capelli morbidi e lucidi senza appesantire. Ideale per dare compostezza in pochi secondi a ogni tipo di capello.",
                src: "https://blendon-barber-shop.it/assets/images/brands/framesi/12.svg",
                price: 20
            },
            {
                id: "PASTE",
                text: "Cera opaca a fissaggio forte. Perfetta per il controllo dello styling con un finish satinato naturale.",
                src: "https://blendon-barber-shop.it/assets/images/brands/framesi/13.svg",
                price: 20
            },
            {
                id: "GLAZING WAX",
                text: "Cera forte effetto bagnato. Per ciocche definite, composte e lucide per tutto il giorno",
                src: "https://blendon-barber-shop.it/assets/images/brands/framesi/13.svg",
                price: 20
            },
            {
                id: "OPAQUE POMADE",
                text: "Pomata opaca extra forte. Per ciocche molto strutturate e con il massimo controllo. Ideale per look definiti.",
                src: "https://blendon-barber-shop.it/assets/images/brands/framesi/13.svg",
                price: 20
            }
        ]
    },
    {
        id: "level",
        text: "L3V3L",
        src: "https://blendon-barber-shop.it/assets/images/brands/level.png",
        products: [
            {
                id: "Hair Cream Gel - 500ml",
                text: "Gel cremoso e nutriente, dona un’effetto naturale con la possibilità di rimodellare l’acconciatura durante la giornata",
                src: "https://blendon-barber-shop.it/assets/images/brands/level/1.svg",
                price: 20
            },
            {
                id: "Slime Gel, Extra strong",
                text: "Tenuta e volume per tutto il giorno.  Capelli lucenti e in salute grazie all’effetto nutriente della vitamine B5",
                src: "https://blendon-barber-shop.it/assets/images/brands/level/3.svg",
                price: 20
            },
            {
                id: "Tinted Gel Black",
                text: "Gel Colorante, copre i capelli bianchi al 100% senza colare semipermanete, di facile applicazione  si lava facilmente",
                src: "https://blendon-barber-shop.it/assets/images/brands/level/4.svg",
                price: 20
            }
        ]
    },
    {
        id: "uppercut",
        text: "UPPERCUT",
        src: "https://blendon-barber-shop.it/assets/images/brands/uppercut.png",
        products: [
            {
                id: "Deluxe Pomade 100g",
                text: "Pomata Lucida per un look pettinato dalla tenuta estrema. Codice: N.1 pz 100g  BLUPP003",
                src: "https://blendon-barber-shop.it/assets/images/brands/uppercut/1.svg",
                price: 20
            },
            {
                id: "Matte Pomade",
                text: "Pomata Opaca, dalla media tenuta, per un look ordinato e opaco. Codice: N.1 pz da 100g BLUPP002",
                src: "https://blendon-barber-shop.it/assets/images/brands/uppercut/2.svg",
                price: 20
            },
            {
                id: "Clay",
                text: "Pasta Clay dalla tenuta extra strong per look spettinati e leggermente lucidi. Codice: N.1 pz da 100g BLUPP051",
                src: "https://blendon-barber-shop.it/assets/images/brands/uppercut/3.svg",
                price: 20
            }
        ]
    },
    {
        id: "fanola",
        text: "Fanola",
        src: "https://blendon-barber-shop.it/assets/images/brands/fanola.png",
        products: [
            {
                id: "FREEPRAINT COLOR 60ML",
                text: "7Colori Diretti a lunga durata, senza ossigeno, miscelabili tra loro ( Bianco, Rosso, Giallo, Azzurro, Verde, Grigio, Blu). Codice: 1pz 60ml ONTNT005",
                src: "https://blendon-barber-shop.it/assets/images/brands/fanola/6.svg",
                price: 20
            },
            {
                id: "Permanente Curling Pro - Tutti i capelli",
                text: "Sistema ondulante (Liquido ondulante +Neutralizzante). La composizione é priva di tioglicolati. Codice: 1Conf. 1pz 250ml + 1pz 250ml  L3PCP",
                src: "https://blendon-barber-shop.it/assets/images/brands/fanola/9.svg",
                price: 20
            }
        ]
    },
    {
        id: "agiva",
        text: "Agiva",
        src: "https://blendon-barber-shop.it/assets/images/brands/agiva.png",
        products: [
            {
                id: "11 Tipi di Hair Wax Differenti da 155ml",
                text: "11 Wax differenti, una per ogni esigenza.",
                src: "https://blendon-barber-shop.it/assets/images/brands/agiva/1.svg",
                price: 20
            },
            {
                id: "Polveri Styling Dust  Agiva 01/02/03 Volume - 20g",
                text: "Polvere volumizzante ad effetto Opaco! Diverse Tenute",
                src: "https://blendon-barber-shop.it/assets/images/brands/agiva/3.svg",
                price: 20
            },
            {
                id: "Gel da rasatura Freshness 1000ml",
                text: "Shaving gel ad effetto freddo",
                src: "https://blendon-barber-shop.it/assets/images/brands/agiva/4.svg",
                price: 20
            }
        ]
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
