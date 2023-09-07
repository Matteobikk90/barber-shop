import Homepage from "components/Main/Homepage";
import Product from "components/Main/Product";
import Menu from "components/Main/Menu";
import Gallery from "components/Main/Gallery";
import Contact from "components/Main/Contact";
import Booking from "components/Main/Booking";
import BookingBtn from "components/BookingBtn";
/** @jsxImportSource @emotion/react */
import tw from "twin.macro";

const Main = ({ toggleState, handleToggleState }: any) => {
    return (
        <>
            {!toggleState.isBooking && (
                <BookingBtn handleToggleState={handleToggleState} />
            )}
            <main css={[tw`pt-[7.875rem]`, toggleState.isBooking && tw`pt-0`]}>
                {toggleState.isBooking ? (
                    <Booking handleToggleState={handleToggleState} />
                ) : (
                    <>
                        {/* <Homepage />
                        <Product />
                        <Menu />
                        <Gallery /> */}
                        <Contact />
                    </>
                )}
            </main>
        </>
    );
};
export default Main;
