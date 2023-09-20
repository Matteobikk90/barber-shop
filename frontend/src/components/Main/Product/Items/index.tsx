import { useBarberShop } from "context/barberShop";
import { brands } from "utils/items";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Items = () => {
    const { setActiveFilter } = useBarberShop();

    return (
        <article tw="h-full p-[1rem]">
            <ul tw="w-full h-full bg-black text-cream flex flex-col justify-between">
                {brands.map(({ id, src }) => (
                    <li
                        key={id}
                        tw="cursor-pointer flex flex-1 p-[1rem] gap-[1rem] justify-between items-center hover:bg-green text-xxl"
                    >
                        <button
                            onClick={() =>
                                setActiveFilter({
                                    name: "selectedBrand",
                                    value: id
                                })
                            }
                            tw="flex items-center gap-[2rem] text-xxl"
                        >
                            <img
                                loading="lazy"
                                width={80}
                                src={src}
                                alt={`Blendon Barber SHop - Brand ${id}`}
                            />
                        </button>
                        <div>
                            <h3>Scopri</h3>
                            <img
                                alt="Arrow"
                                src="https://blendon-barber-shop.it/assets/images/arrow.svg"
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </article>
    );
};

export default Items;
