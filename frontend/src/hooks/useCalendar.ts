import { useCallback } from "react";

const useCalendar = () => {
    const goToTimeSelection = useCallback(() => {
        const goToTimeBtn = document.querySelector(
            ".calendar button.timeSelector"
        ) as HTMLButtonElement;
        goToTimeBtn.click();
        const calendarDayHeader = document.querySelector(
            ".calendar .header .col-center span"
        )!;
        calendarDayHeader.innerHTML.replace("settembre", "ghj");
    }, []);

    return { goToTimeSelection };
};

export default useCalendar;
