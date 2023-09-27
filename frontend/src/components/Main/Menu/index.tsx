import { services } from "utils/items";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Menu = () => (
    <section id="servizi" tw="text-cream">
        <div tw="h-[calc(50dvh - 2.109rem)] text-xxl bg-black text-center">
            <h2 tw="text-xxl text-center p-[3rem 2rem] sm:p-[3rem 1rem]">
                <strong>Servizi</strong>
            </h2>
        </div>
        <div tw="bg-cream md:p-[1rem] p-[1rem 2rem] sm:p-[2rem 0]">
            <article tw="p-[1rem] border border-green max-w-[950px] m-[-200px auto 0]">
                <ul
                    tw="text-[2.5rem] uppercase sm:text-xxl"
                    style={{
                        backgroundImage:
                            "url(https://blendon-barber-shop.it/assets/images/prism.png)"
                    }}
                >
                    {services.map(({ id, price, text }) => (
                        <li
                            style={{
                                backgroundImage:
                                    "radial-gradient(circle closest-side, rgba(255,255,255,0.05) 99%, transparent 1%)",
                                backgroundSize: "5px 3px"
                            }}
                            key={id}
                            tw="font-medium p-[1rem] flex justify-between items-center bg-bottom bg-repeat-x"
                        >
                            <span>{text}</span>
                            <span tw="font-bold">€ {price}</span>
                        </li>
                    ))}
                </ul>
            </article>
        </div>
    </section>
);

export default Menu;
