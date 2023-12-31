import Mobile from "components/Header/Mobile";
import { navLinks } from "utils/items";
/** @jsxImportSource @emotion/react */
import tw from "twin.macro";

const Header = ({ toggleState, handleToggleState }: any) => (
    <header
        css={[
            tw`bg-white fixed top-0 shadow w-full text-black z-[1001] text-xxl sm:text-[1.5rem] p-[0.5rem 1rem]`,
            toggleState.isBooking && tw`relative`
        ]}
    >
        <nav tw="flex justify-center items-center gap-[3rem] p-[1rem] relative md:hidden">
            {navLinks.map(({ id, text, src }) => (
                <a
                    tw="hover:text-green"
                    onClick={() =>
                        toggleState.isBooking && handleToggleState("isBooking")
                    }
                    key={id}
                    href={`#${id}`}
                >
                    {src ? (
                        <img
                            tw="sm:w-[150px]"
                            loading="lazy"
                            width={300}
                            src="https://blendon-barber-shop.it/assets/images/logo.png"
                            alt="Blendon Barber Shop Logo"
                        />
                    ) : null}
                    {text}
                </a>
            ))}
        </nav>
        <Mobile />
    </header>
);

export default Header;
