import Items from "components/Product/Items";
import Thumbnail from "components/Product/Thumbnail";
import wood from "assets/images/wood.png";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Product = () => {
    return (
        <section
            id="product"
            tw="overflow-hidden h-[calc(50dvh - 2.09rem)] grid grid-cols-2 relative bg-contain bg-center"
            style={{ backgroundImage: `url(${wood})` }}
        >
            <Items />
            <Thumbnail />
        </section>
    );
};

export default Product;
