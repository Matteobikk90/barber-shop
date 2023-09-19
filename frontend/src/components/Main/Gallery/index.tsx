import { carouselGalleryConfig } from "utils/carousels";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
/** @jsxImportSource @emotion/react */
import "twin.macro";
import { gallery } from "utils/items";

const Gallery = () => {
    return (
        <section
            id="galleria"
            tw="p-[2rem] md:p-[1rem] sm:p-[2rem 1rem] bg-green shadow"
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
                keyBoardControl={true}
                customTransition="all 1s"
                transitionDuration={1000}
                removeArrowOnDeviceType={["tablet", "mobile"]}
            >
                {gallery.map(({ src, id }) => (
                    <img key={id} src={src} alt={id} />
                ))}
            </Carousel>
        </section>
    );
};

export default Gallery;
