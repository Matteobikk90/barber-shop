import logo from "assets/images/logo2.png";
/** @jsxImportSource @emotion/react */
import "twin.macro";
import { socials } from "utils/items";

const Footer = () => {
    return (
        <footer tw="flex p-[2rem 4rem] bg-black text-cream gap-[10rem] flex-wrap">
            <img src={logo} width={300} alt="Logo" />
            <div tw="flex flex-col">
                <p>Via Rivoli 143</p>
                <p>Rivoli (TO), 10098</p>
                <a href="mailto:luca@gmail.com">luca@gmail.com</a>
                <a href="tel:+390118746583">+39 011 95 28 176</a>
            </div>
            <div tw="flex flex-col">
                <h4 tw="text-xl font-medium">ORARI:</h4>
                <p>Lun-Ven: 08AM-18PM</p>
                <p>Sabato: 09AM-14PM</p>
                <p>Domenica chiuso</p>
            </div>
            <div tw="flex flex-col gap-[1rem]">
                <h4 tw="text-xl font-medium">Seguici su:</h4>
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
