import { carouselProductConfig } from "utils/carousels";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import shop1 from "assets/images/shop/shop1.jpg";
import shop2 from "assets/images/shop/shop2.jpg";
import shop3 from "assets/images/shop/shop3.jpg";
import shop4 from "assets/images/shop/shop4.jpg";
import shop5 from "assets/images/shop/shop5.jpg";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const AnimatedImages = () => {
    return (
        <article tw="h-full">
            <Carousel
                swipeable={false}
                draggable={false}
                responsive={carouselProductConfig}
                infinite={true}
                // autoPlay={true}
                // autoPlaySpeed={5000}
                transitionDuration={10000}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
            >
                <img tw="w-full h-full relative" src={shop1} alt="Shop 1" />
                <img tw="w-full h-full relative" src={shop2} alt="Shop 2" />
                <img tw="w-full h-full relative" src={shop3} alt="Shop 3" />
                <img tw="w-full h-full relative" src={shop4} alt="Shop 4" />
                <img tw="w-full h-full relative" src={shop5} alt="Shop 5" />
            </Carousel>
        </article>
    );
};

export default AnimatedImages;
