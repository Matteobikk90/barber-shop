import { useBarberShop } from "context/barberShop";
import { brands } from "utils/items";
/** @jsxImportSource @emotion/react */
import tw from "twin.macro";

const Brands = () => {
    const { selectedBrand, setActiveFilter } = useBarberShop();

    return (
        <article tw="h-full p-[1rem]">
            <ul tw="w-full h-full bg-black text-cream flex flex-col justify-between">
                {brands.map(({ id, src }) => (
                    <li
                        key={id}
                        css={[
                            tw`cursor-pointer flex flex-1 p-[1rem] gap-[1rem] justify-between items-center hover:bg-green text-xxl`,
                            selectedBrand === id && tw`bg-green`
                        ]}
                    >
                        <button
                            onClick={() => {
                                document
                                    .querySelector("#thumbnails")!
                                    .scrollIntoView({
                                        behavior: "smooth",
                                        block: "start",
                                        inline: "start"
                                    });
                                setActiveFilter({
                                    name: "selectedBrand",
                                    value: id
                                });
                            }}
                            tw="flex items-center w-full justify-between gap-[2rem] text-xxl"
                        >
                            <img
                                loading="lazy"
                                width={80}
                                src={src}
                                alt={`Blendon Barber Shop - Brand ${id}`}
                            />
                            <div tw="flex items-center justify-between gap-[1rem]">
                                <h3>Scopri</h3>
                                <img
                                    loading="lazy"
                                    width={32}
                                    alt="Arrow"
                                    src="https://blendon-barber-shop.it/assets/images/arrow.svg"
                                />
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        </article>
    );
};

export default Brands;
