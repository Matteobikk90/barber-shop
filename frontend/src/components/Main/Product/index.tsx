import Brands from "components/Main/Product/Brands";
import Thumbnail from "components/Main/Product/Thumbnail";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Product = () => (
    <section
        id="prodotti"
        tw="overflow-hidden grid grid-cols-[repeat(2, minmax(0, 1fr))] md:grid-cols-none relative bg-contain bg-center"
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
