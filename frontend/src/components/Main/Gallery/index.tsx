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
            tw="p-[3rem 2rem] sm:p-[3rem 1rem] bg-green shadow"
        >
            <h2 tw="text-xxl text-cream text-center mb-[3rem]">
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
