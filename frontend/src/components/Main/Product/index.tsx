import Items from "components/Main/Product/Items";
import Thumbnail from "components/Main/Product/Thumbnail";
import wood from "assets/images/wood.png";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Product = () => (
    <section
        id="products"
        tw="overflow-hidden grid grid-cols-[repeat(2, 1fr)] md:grid-cols-none relative bg-contain bg-center"
        style={{ backgroundImage: `url(${wood})` }}
    >
        <Items />
        <Thumbnail />
    </section>
);

export default Product;
