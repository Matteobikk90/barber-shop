import Mobile from "components/Header/Mobile";
import { navLinks } from "utils/items";
import logo from "assets/images/logo.png";
/** @jsxImportSource @emotion/react */
import tw from "twin.macro";

const Header = ({ toggleState, handleToggleState }: any) => {
    return (
        <header
            css={[
                tw`fixed top-0 shadow w-full text-black z-[401] text-xxl sm:text-[1.5rem]`,
                toggleState.isBooking && tw`relative`
            ]}
        >
            <div tw="h-full w-full bg-cream absolute top-0"></div>
            <nav tw="flex justify-center items-center gap-[3rem] p-[1rem] relative md:hidden">
                {navLinks.map(({ id, text, src }) => (
                    <a
                        tw="hover:text-green"
                        onClick={() =>
                            toggleState.isBooking &&
                            handleToggleState("isBooking")
                        }
                        key={id}
                        href={`#${id}`}
                    >
                        {src ? (
                            <img
                                tw="sm:w-[150px]"
                                loading="lazy"
                                width={300}
                                src={logo}
                                alt="Logo"
                            />
                        ) : null}
                        {text}
                    </a>
                ))}
            </nav>
            <Mobile />
        </header>
    );
};
export default Header;
