import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const Gallery = () => {
    return (
        <section id="gallery" tw=" p-[2rem] bg-green">
            <h2 tw="text-xxl text-cream text-center">
                <strong>Galleria</strong>
            </h2>
            <Carousel
                swipeable={false}
                draggable={false}
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={5000}
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
        </section>
    );
};

export default Gallery;
