import { products } from "utils/items";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Items = () => {
    return (
        <article tw="h-full p-[2rem 4rem]">
            <ul tw="w-full h-full bg-black text-white flex flex-col justify-between">
                {products.map(({ id, text, src, price }) => (
                    <li
                        key={id}
                        tw="cursor-pointer flex flex-1 p-[1rem] gap-[1rem] justify-between items-center hover:bg-green"
                    >
                        <span tw="flex items-center gap-[2rem]">
                            <img
                                loading="lazy"
                                width={32}
                                src={src}
                                alt={`Product ${id}`}
                            />
                            <span tw="flex flex-col">
                                <h3 tw="font-semiBold">{text}</h3>
                                <em tw="text-xs">
                                    Il miglior rasoio per la barba
                                </em>
                            </span>
                        </span>
                        € {price}
                    </li>
                ))}
            </ul>
        </article>
    );
};

export default Items;
