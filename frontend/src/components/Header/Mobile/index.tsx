import useToggle from "hooks/useToggle";
import BurgerMenu from "components/Header/Mobile/BurgeMenu";
import { navLinks } from "utils/items";
import logo from "assets/images/logo.png";
/** @jsxImportSource @emotion/react */
import tw from "twin.macro";

const MobileNavbar = () => {
    const { handleToggleState, toggleState } = useToggle();

    return (
        <nav tw="md:flex hidden items-center justify-between w-full">
            <img width={150} alt="Logo" src={logo} />
            <button
                tw="items-center hidden md:flex justify-between gap-[0.5rem]"
                onClick={() => handleToggleState("isMobileNavbarOpen")}
            >
                MENU
                <BurgerMenu></BurgerMenu>
            </button>
            <ul
                css={[
                    tw`w-full flex top-0 justify-evenly absolute flex-col text-center mt-[4rem] ml-[-1rem] translate-x-[-100%] transition duration-500 bg-cream h-[calc(100vh - 4rem)] text-black`,
                    toggleState.isMobileNavbarOpen && tw`translate-x-0`
                ]}
            >
                {navLinks.map(
                    ({ text, id }) =>
                        text && (
                            <li tw="relative" key={id}>
                                <a
                                    tw="hover:text-green"
                                    onClick={() =>
                                        handleToggleState("isMobileNavbarOpen")
                                    }
                                    href={`#${id}`}
                                >
                                    {text}
                                </a>
                            </li>
                        )
                )}
            </ul>
        </nav>
    );
};

export default MobileNavbar;
