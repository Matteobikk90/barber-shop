import Brands from "components/Main/Product/Brands";
import Thumbnail from "components/Main/Product/Thumbnail";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Product = () => (
    <section id="prodotti">
        <h2 tw="text-xxl text-center bg-cream text-black py-[5rem] px-[2rem] sm:py-[3rem] sm:px-[1rem]">
            <strong>Prodotti</strong>
        </h2>
        <div tw="shadow overflow-hidden grid grid-cols-[repeat(2, minmax(0, 1fr))] lg:flex lg:flex-col relative">
            <Brands />
            <Thumbnail />
        </div>
    </section>
);

export default Product;
