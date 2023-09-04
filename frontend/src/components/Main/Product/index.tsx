import Items from "components/Main/Product/Items";
import Thumbnail from "components/Main/Product/Thumbnail";
import wood from "assets/images/wood.png";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Product = () => {
    return (
        <section
            id="products"
            tw="overflow-hidden grid grid-cols-2 relative bg-contain bg-center"
            style={{ backgroundImage: `url(${wood})` }}
        >
            <Items />
            <Thumbnail />
        </section>
    );
};

export default Product;
