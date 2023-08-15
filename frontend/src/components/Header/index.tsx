import { navLinks } from "utils/items";
import logo from "assets/images/logo.svg";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Header = () => {
    return (
        <header tw="fixed top-0 shadow w-full text-white z-10">
            <div tw="h-full w-full bg-black opacity-80 absolute top-0"></div>
            <nav tw="flex justify-center items-center gap-[1rem] p-[1rem] relative">
                {navLinks.map(({ id, text, src }) => (
                    <a key={id} href={`#${id}`}>
                        {src ? <img width={50} src={logo} alt="Logo" /> : null}
                        {text}
                    </a>
                ))}
            </nav>
        </header>
    );
};
export default Header;
