import logo from "assets/images/logo.png";
/** @jsxImportSource @emotion/react */
import "twin.macro";
import { socials } from "utils/items";

const Footer = () => {
    return (
        <footer tw="grid grid-cols-[repeat(4, 1fr)] lg:grid-cols-[repeat(2, 1fr)] sm:grid-cols-none sm:text-center sm:justify-center p-[2rem 4rem] bg-cream text-black gap-[1.5rem] text-lg justify-between items-center md:p-[1rem]">
            <img width={250} src={logo} alt="Logo" />
            <div tw="flex flex-col">
                <p>Via Manzoni 21/A</p>
                <p>Rivoli (TO), 10098</p>
                <a href="mailto:blendon.barbershop@gmail.com">
                    blendon.barbershop@gmail.com
                </a>
                <a href="tel:+390110745767">+39 011 07 45 767</a>
            </div>
            <div tw="flex flex-col">
                <h4 tw="text-xxl font-medium">Orari:</h4>
                <p>Lunedì - Domenica chiuso</p>
                <p>Mar-Sab: 09:00 - 13:00 / 14:00 - 19:00</p>
                <p>Mercoledì: 11:00 - 13:00 / 14:00 - 20:30</p>
            </div>
            <div tw="flex flex-col gap-[1rem] sm:m-auto">
                <h4 tw="text-xxl font-medium">Seguici su:</h4>
                <div tw="flex gap-[1rem]">
                    {socials.map(({ url, src, id }) => (
                        <a key={id} href={url}>
                            <img width={35} height={35} alt="id" src={src} />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
