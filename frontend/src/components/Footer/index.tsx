import logo from "assets/images/logo.png";
/** @jsxImportSource @emotion/react */
import "twin.macro";
import { socials } from "utils/items";

const Footer = () => {
    return (
        <footer tw="flex p-[2rem 4rem] bg-cream text-black gap-[8rem] text-lg">
            <img src={logo} width={300} alt="Logo" />
            <div tw="flex flex-col">
                <p>Via Manzoni 21</p>
                <p>Rivoli (TO), 10098</p>
                <a href="mailto:lucafrasca4@gmail.com">lucafrasca4@gmail.com</a>
                <a href="tel:+390118746583">+39 011 95 28 176</a>
            </div>
            <div tw="flex flex-col">
                <h4 tw="text-xxl font-medium">Orari:</h4>
                <p>Mar-Sab: 09AM-19PM</p>
                <p>Mercoledì: 11AM-20PM</p>
                <p>Domenica chiuso</p>
            </div>
            <div tw="flex flex-col gap-[1rem]">
                <h4 tw="text-xxl font-medium">Seguici su:</h4>
                <div tw="flex gap-[1rem]">
                    {socials.map(({ url, src, id }) => (
                        <a key={id} href={url}>
                            <img width={24} alt="id" src={src} />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
