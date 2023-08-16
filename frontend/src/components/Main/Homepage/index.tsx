import AnimatedImages from "components/Main/Homepage/AnimatedImages";
import Video from "components/Main/Homepage/Video";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Homepage = () => {
    return (
        <section
            id="home"
            tw="h-[calc(50dvh - 2.109rem)] grid grid-cols-2 relative"
        >
            <div tw="h-full w-full bg-green opacity-50 absolute top-0"></div>
            <AnimatedImages />
            <Video />
        </section>
    );
};

export default Homepage;
