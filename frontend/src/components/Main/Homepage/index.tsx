import AnimatedImages from "components/Main/Homepage/AnimatedImages";
import Video from "components/Main/Homepage/Video";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Homepage = () => {
    return (
        <section
            id="home"
            tw="h-[calc(100dvh - 7.875rem)] grid grid-cols-[repeat(2, 1fr)] md:grid-cols-none relative"
        >
            <div tw="h-full w-full bg-black opacity-20 absolute top-0"></div>
            <AnimatedImages />
            {/* <Video /> */}
        </section>
    );
};

export default Homepage;
