import { carouselGalleryConfig } from "utils/carousels";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { gallery } from "utils/items";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Gallery = () => {
    return (
        <section
            id="galleria"
            tw="py-[5rem] px-[2rem] sm:py-[3rem] sm:px-[1rem] bg-green shadow"
        >
            <h2 tw="text-xxl text-cream text-center mb-[3rem] sm:mb-[2rem]">
                <strong>Galleria</strong>
            </h2>
            <Carousel
                showDots={true}
                responsive={carouselGalleryConfig}
                ssr={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={5000}
                customTransition="all 1s"
                transitionDuration={1000}
                removeArrowOnDeviceType={["tablet", "mobile"]}
            >
                {gallery.map(({ src, id }) => (
                    <img
                        key={id}
                        src={src}
                        alt={`Blendon Barber Shop - ${id}`}
                    />
                ))}
            </Carousel>
        </section>
    );
};

export default Gallery;
