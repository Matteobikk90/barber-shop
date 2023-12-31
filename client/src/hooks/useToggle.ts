import { MouseEvent, useCallback, useState } from "react";

type Booking = {
    isBooking: boolean;
};

type NavBarMobile = {
    isMobileNavbarOpen: boolean;
};

type CombinedProps = Booking & NavBarMobile;

const useToggle = () => {
    const [toggleState, setToggleState] = useState<CombinedProps>({
        isBooking: false,
        isMobileNavbarOpen: false
    });

    const handleToggleState = useCallback(
        (toggleType: string, e?: MouseEvent) => {
            if (e) e.stopPropagation();
            setToggleState((prevState) => {
                const key = toggleType as string as keyof typeof toggleState;
                return { ...toggleState, [toggleType]: !prevState[key] };
            });
        },
        [toggleState, setToggleState]
    );

    return { handleToggleState, toggleState };
};

export default useToggle;
