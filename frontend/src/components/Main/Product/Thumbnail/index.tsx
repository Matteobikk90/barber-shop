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
            <div tw="w-full h-full bg-white flex items-center justify-between">
                <div tw="flex flex-col gap-[1rem]">
                    <h3 tw="font-semiBold">{id}</h3>
                    <em tw="text-sm leading-5">{text}</em>
                </div>
                <img
                    src={src}
                    alt={`Blendon Barber Shop Product - ${selectedBrand} ${id}`}
                />
            </div>
        ));
    };

    return (
        <article tw="h-full p-[1rem] bg-cream text-black">
            <Carousel
                showDots={true}
                responsive={carouselProductConfig}
                ssr={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={5000}
                customTransition="all 1s"
                transitionDuration={1000}
                removeArrowOnDeviceType={["tablet", "mobile"]}
            >
                {handleActiveBrandSlide()}
            </Carousel>
        </article>
    );
};
export default Thumbnail;
