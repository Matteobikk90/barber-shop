import useToggle from "hooks/useToggle";
import { BurgerMenu, BurgeMenuLine } from "components/Header/Mobile/BurgeMenu";
import { navLinks } from "utils/items";
import logo from "assets/images/logo.png";
/** @jsxImportSource @emotion/react */
import tw from "twin.macro";

const MobileNavbar = () => {
    const { handleToggleState, toggleState } = useToggle();

    return (
        <nav tw="md:flex items-center justify-between w-full">
            <img width={75} alt="Logo" src={logo} />
            <BurgerMenu
                tw="hidden md:flex"
                isMobileNavbarOpen={toggleState.isMobileNavbarOpen}
                onClick={() => handleToggleState("isMobileNavbarOpen")}
                aria-label="Mobile button"
            >
                <BurgeMenuLine />
                <BurgeMenuLine />
                <BurgeMenuLine />
            </BurgerMenu>
            <ul
                css={[
                    tw`flex justify-between absolute flex-col text-center mt-[4.18rem] translate-x-[-100%] transition duration-500 bg-cream h-[calc(100vh - 4.18rem)] text-black`,
                    toggleState.isMobileNavbarOpen && tw`translate-x-[0]`
                ]}
            >
                {navLinks.map(({ text, id }) => (
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
                ))}
            </ul>
        </nav>
    );
};

export default MobileNavbar;
