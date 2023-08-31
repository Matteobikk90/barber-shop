import Homepage from "components/Main/Homepage";
import Product from "components/Main/Product";
import Menu from "components/Main/Menu";
import Gallery from "./Gallery";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Main = () => {
    return (
        <main tw="pt-[4.18rem]">
            <Homepage />
            <Product />
            <Menu />
            <Gallery />
        </main>
    );
};
export default Main;
