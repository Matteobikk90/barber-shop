import Header from "components/Header";
import Main from "components/Main";
import Footer from "components/Footer";
import useToggle from "hooks/useToggle";

const BarberShop = () => {
    const { toggleState, handleToggleState } = useToggle();

    return (
        <>
            <Header toggleState={toggleState} />
            <Main
                handleToggleState={handleToggleState}
                toggleState={toggleState}
            />
            <Footer />
        </>
    );
};

export default BarberShop;
