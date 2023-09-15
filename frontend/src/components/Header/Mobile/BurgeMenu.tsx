import tw, { styled } from "twin.macro";
import { BurgerMenuTypes } from "types/burger-menu.types";

export const BurgerMenu = styled.button`
    ${tw`gap-[0.25rem] flex flex-col justify-between cursor-pointer`}

    div:first-of-type {
        transform: ${({ isMobileNavbarOpen }: BurgerMenuTypes) =>
            isMobileNavbarOpen ? "rotate(35deg)" : "rotate(0)"};
    }

    div:nth-of-type(2) {
        opacity: ${({ isMobileNavbarOpen }: BurgerMenuTypes) =>
            isMobileNavbarOpen ? 0 : 1};
    }

    div:last-of-type {
        transform: ${({ isMobileNavbarOpen }: BurgerMenuTypes) =>
            isMobileNavbarOpen ? "rotate(-35deg)" : "rotate(0)"};
    }
`;

export const BurgeMenuLine = tw.div`w-[1.5rem] h-[0.125rem] transition duration-500 bg-green rounded-xl origin-[0.06rem]`;
