import { useBarberShop } from "context/barberShop";
import { brands } from "utils/items";
import { carouselProductConfig } from "utils/carousels";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Thumbnail = () => {
    const { selectedBrand } = useBarberShop();
    const handleActiveBrandSlide = () => {
        const activeBrand = brands.find(
            ({ id }) => id === selectedBrand
        )?.products;

        return activeBrand?.map(({ id, text, price, src }) => (
            <div
                key={id}
                tw="w-full h-full bg-white flex gap-[2rem] flex-col items-center p-[3rem] justify-between"
            >
                <div tw="flex flex-col gap-[1rem]">
                    <h3 tw="text-xl font-semiBold">{id}</h3>
                    <em tw="text-lg leading-5">{text}</em>
                </div>
                <img
                    loading="lazy"
                    src={src}
                    alt={`Blendon Barber Shop Product - ${selectedBrand} ${id}`}
                />
            </div>
        ));
    };

    return (
        <article tw="h-full p-[1rem] bg-cream text-black" id="thumbnails">
            <Carousel
                showDots={true}
                responsive={carouselProductConfig}
                ssr={true}
                // infinite={true}
                // autoPlay={true}
                autoPlaySpeed={5000}
                customTransition="all 1s"
                transitionDuration={1000}
            >
                {handleActiveBrandSlide()}
            </Carousel>
        </article>
    );
};
export default Thumbnail;
