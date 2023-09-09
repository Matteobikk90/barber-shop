import { useCallback } from "react";

const useCalendar = () => {
    const goToTimeSelection = () => {
        const goToTimeBtn = document.querySelector(
            ".calendar button.timeSelector"
        ) as HTMLButtonElement;
        goToTimeBtn.click();
    };

    const handleClosedDays = useCallback(() => {}, []);

    const handleTranslation = useCallback(() => {
        const timeSelectorBtn = (document.querySelector(
            ".calendar button.timeSelector p"
        )!.innerHTML = "Scegli un altra data");
        // timeSelectorBtn.innerHTML = "Scegli un altra data";
        // const sunday =
        // calendarDayHeader?.replaceWith("<span>Giovedì</span>");
        // console.log(calendarRef);
    }, []);

    return { handleClosedDays, handleTranslation, goToTimeSelection };
};

export default useCalendar;
