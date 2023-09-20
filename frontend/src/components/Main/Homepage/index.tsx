import Video from "components/Main/Homepage/Video";
import { carouselProductConfig } from "utils/carousels";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { shop } from "utils/items";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Homepage = () => (
    <section id="home" tw="h-full relative">
        <div tw="h-full w-full bg-black opacity-40 absolute top-0 z-10"></div>
        <div tw="grid grid-cols-[repeat(2, 1fr)] md:grid-rows-[repeat(2, 1fr)] md:grid-cols-none">
            <Carousel
                responsive={carouselProductConfig}
                ssr={true}
                autoPlay={true}
                infinite={true}
                autoPlaySpeed={5000}
                customTransition="all 1s"
                transitionDuration={1000}
                arrows={false}
            >
                {shop.map(({ src, id }) => (
                    <img
                        key={id}
                        src={src}
                        alt={`Blendon Barber Shop - ${id}`}
                    />
                ))}
            </Carousel>
            <Video />
        </div>
    </section>
);

export default Homepage;
