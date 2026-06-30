import Header from "components/Header";
import Main from "components/Main";
import Footer from "components/Footer";
import useToggle from "hooks/useToggle";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const BarberShop = () => {
    const { toggleState, handleToggleState } = useToggle();

    return (
        <div tw="flex flex-col min-h-screen">
            <Header
                toggleState={toggleState}
                handleToggleState={handleToggleState}
            />
            <Main
                handleToggleState={handleToggleState}
                toggleState={toggleState}
            />
            <Footer />
        </div>
    );
};

export default BarberShop;
