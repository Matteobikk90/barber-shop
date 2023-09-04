import { products } from "utils/items";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Items = () => {
    return (
        <article tw="h-full p-[1rem]">
            <ul tw="w-full h-full bg-black text-white flex flex-col justify-between">
                {products.map(({ id, text, src, price }) => (
                    <li
                        key={id}
                        tw="cursor-pointer flex flex-1 p-[1rem] gap-[1rem] justify-between items-center hover:bg-green text-xxl"
                    >
                        <span tw="flex items-center gap-[2rem] text-xxl">
                            <img
                                loading="lazy"
                                width={32}
                                src={src}
                                alt={`Product ${id}`}
                            />
                            <span tw="flex flex-col">
                                <h3 tw="font-semiBold">{text}</h3>
                                <em tw="text-lg">
                                    Il miglior rasoio per la barba
                                </em>
                            </span>
                        </span>
                        Scopri
                    </li>
                ))}
            </ul>
        </article>
    );
};

export default Items;
