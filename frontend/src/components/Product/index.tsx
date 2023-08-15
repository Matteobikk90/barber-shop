import AnimatedImages from "components//Homepage/AnimatedImages";
import Video from "components/Homepage/Video";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Product = () => {
    return (
        <section
            id="product"
            tw="h-[calc(50dvh - 2.09rem)] grid grid-cols-2 relative"
        >
            <div tw="h-full w-full bg-green opacity-50 absolute top-0"></div>
            <AnimatedImages />
            <Video />
        </section>
    );
};

export default Product;
