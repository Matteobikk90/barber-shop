import { socials } from "utils/items";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Footer = () => {
    return (
        <footer tw="shadow-[0px -4px 5px 0px rgba(0,0,0,0.1)] grid grid-cols-[repeat(4, 1fr)] lg:grid-cols-[repeat(2, 1fr)] sm:grid-cols-none sm:text-center sm:justify-center p-[2rem 4rem] bg-cream text-black gap-[1.5rem] text-[1.5rem] justify-between items-center md:p-[1rem]">
            <img
                width={250}
                src="https://blendon-barber-shop.it/assets/images/logo-footer.png"
                alt="Blendon Barber Shop Footer Logo"
            />
            <div tw="flex flex-col">
                <p>Via Manzoni 21/A</p>
                <p>Rivoli (TO), 10098</p>
                <a href="mailto:blendon.barbershop@gmail.com">
                    blendon.barbershop@gmail.com
                </a>
                <a href="tel:+393428012955">+39 342 801 2955</a>
            </div>
            <div tw="flex flex-col">
                <h3 tw="text-xxl">Orari:</h3>
                <p>Lunedì - Domenica chiuso</p>
                <p>Mar-Sab: 09:00 - 13:00 / 14:00 - 19:00</p>
                <p>Mercoledì: 11:00 - 13:00 / 14:00 - 20:30</p>
            </div>
            <div tw="flex flex-col gap-[1rem] sm:m-auto">
                <h3 tw="text-xxl">Seguici su:</h3>
                <div tw="flex gap-[1rem]">
                    {socials.map(({ url, src, id }) => (
                        <a key={id} href={url}>
                            <img
                                width={35}
                                height={35}
                                alt={`Blendon Barber Shop - ${id}`}
                                src={src}
                            />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
