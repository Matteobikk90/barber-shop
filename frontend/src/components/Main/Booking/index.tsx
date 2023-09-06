import { useState } from "react";
import Step1 from "components/Main/Booking/Step1";
import Step2 from "components/Main/Booking/Step2";
import Step3 from "components/Main/Booking/Step3";
import { BookingTypes } from "types/booking.types";
import useMultiStepForm from "hooks/useMultiStepForm";
/** @jsxImportSource @emotion/react */
import tw from "twin.macro";

const Booking = ({ handleToggleState }: any) => {
    const {
        back,
        currentStepIndex,
        next,
        isFirstStep,
        isLastStep,
        step,
        steps
    } = useMultiStepForm([<Step1 />, <Step2 />, <Step3 />]);
    const [booking, setBooking] = useState<BookingTypes>({
        service: "",
        name: "",
        surname: "",
        email: "",
        phone: "",
        message: "",
        start_time: "",
        end_time: ""
    });

    return (
        <form
            css={[
                tw`relative text-center bg-green text-cream shadow min-h-[450px] m-[12rem 4rem 4rem] p-[2rem] rounded-[0.5rem] border border-black`,
                currentStepIndex === 1 && tw`p-[5rem]`
            ]}
        >
            <button
                tw="absolute top-[1rem] left-[1rem]"
                onClick={() => handleToggleState("isBooking")}
                type="button"
            >
                Chiudi X
            </button>
            <div tw="absolute top-[1rem] right-[1rem]">
                {currentStepIndex + 1} / {steps.length}
            </div>
            {step}
            <div tw="flex gap-[1rem] absolute bottom-[1rem] right-[1rem] mt-[1rem]">
                {!isFirstStep && (
                    <button type="button" onClick={back}>
                        Indietro
                    </button>
                )}
                <button type="button" onClick={next}>
                    {isLastStep ? "Prenota" : "Avanti"}
                </button>
            </div>
        </form>
    );
};

export default Booking;
