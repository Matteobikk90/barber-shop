import Homepage from "components/Main/Homepage";
import Product from "components/Main/Product";
import Gallery from "./Gallery";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Main = () => {
    return (
        <main tw="pt-[4.18rem]">
            <Homepage />
            <Product />
            <Gallery />
        </main>
    );
};
export default Main;
