import Homepage from "components/Homepage";
import Product from "components/Product";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Main = () => {
    return (
        <main tw="pt-[4.18rem]">
            <Homepage />
            <Product />
        </main>
    );
};
export default Main;
