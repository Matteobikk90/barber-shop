import { navLinks } from "utils/items";
import logo from "assets/images/logo.png";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Header = () => {
    return (
        <header tw="fixed top-0 shadow w-full text-black z-10 text-xxl">
            <div tw="h-full w-full bg-cream absolute top-0"></div>
            <nav tw="flex justify-center items-center gap-[3rem] p-[1rem] relative">
                {navLinks.map(({ id, text, src }) => (
                    <a key={id} href={`#${id}`}>
                        {src ? (
                            <img
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
        </header>
    );
};
export default Header;
