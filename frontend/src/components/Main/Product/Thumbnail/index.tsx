import { carouselProductConfig } from "utils/carousels";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
/** @jsxImportSource @emotion/react */
import "twin.macro";
import { useBarberShop } from "context/barberShop";

const Thumbnail = () => {
    const { selectedBrand } = useBarberShop();
    const activeBrandSlides = "";

    return (
        <article tw="h-full p-[1rem] bg-cream text-black">
            <div tw="w-full h-full bg-white flex items-center justify-between p-[1rem]">
                <div tw="flex flex-col gap-[1rem]">
                    <h3 tw="font-semiBold">Shampoo Bain Divalent</h3>
                    <em tw="text-sm leading-5">
                        Shampoo equilibrante per radici grasse e lunghezze
                        sensibilizzate. I prodotti essenziali per completare una
                        perfetta routine per detergere, trattare, texturizzare e
                        preparare i capelli per la notte.
                    </em>
                </div>
            </div>
            <Carousel
                responsive={carouselProductConfig}
                swipeable={false}
                draggable={false}
                infinite={true}
                autoPlay={false}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
            >
                <div>Item 1</div>
                <div>Item 2</div>
                <div>Item 3</div>
                <div>Item 4</div>
            </Carousel>
        </article>
    );
};

export default Thumbnail;
