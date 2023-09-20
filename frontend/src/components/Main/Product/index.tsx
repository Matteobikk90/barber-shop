import Items from "components/Main/Product/Items";
import Thumbnail from "components/Main/Product/Thumbnail";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Product = () => (
    <section
        id="prodotti"
        tw="overflow-hidden grid grid-cols-[repeat(2, 1fr)] md:grid-cols-none relative bg-contain bg-center"
        style={{
            backgroundImage:
                "url(https://blendon-barber-shop.it/assets/images/wood.png)"
        }}
    >
        <Items />
        <Thumbnail />
    </section>
);

export default Product;
