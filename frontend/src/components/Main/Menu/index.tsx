import prism from "assets/images/prism.png";
/** @jsxImportSource @emotion/react */
import "twin.macro";
import { services } from "utils/items";

const Gallery = () => {
    return (
        <section id="services" tw="text-cream">
            <div tw="h-[calc(50dvh - 2.109rem)] text-xl bg-black text-center p-[1rem 2rem]">
                <h2>
                    <strong>Servizi</strong>
                </h2>
            </div>
            <div tw="bg-cream p-[1rem 2rem] border border-green">
                <article tw="p-[1rem] border border-green max-w-[950px] m-[-200px auto 0]">
                    <ul
                        tw="text-lg uppercase"
                        style={{ backgroundImage: `url(${prism})` }}
                    >
                        {services.map(({ id, price, text }) => (
                            <li
                                style={{
                                    backgroundImage:
                                        "radial-gradient(circle closest-side, rgba(255,255,255,0.05) 99%, transparent 1%)",
                                    backgroundSize: "5px 3px"
                                }}
                                key={id}
                                tw="font-medium p-[2rem] flex justify-between items-center bg-bottom bg-repeat-x odd:text-green"
                            >
                                <span>{text}</span>
                                <span>€ {price}</span>
                            </li>
                        ))}
                    </ul>
                </article>
            </div>
        </section>
    );
};

export default Gallery;
