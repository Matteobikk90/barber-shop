import Brands from "components/Main/Product/Brands";
import Thumbnail from "components/Main/Product/Thumbnail";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Product = () => (
    <section
        id="prodotti"
        tw="shadow overflow-hidden grid grid-cols-[repeat(2, minmax(0, 1fr))] lg:flex lg:flex-col relative bg-contain bg-center"
        style={{
            backgroundImage:
                "url(https://blendon-barber-shop.it/assets/images/wood.png)"
        }}
    >
        <Brands />
        <Thumbnail />
    </section>
);

export default Product;
