import { FormEvent, useState } from "react";
import Step1 from "components/Main/Booking/Step1";
import Step2 from "components/Main/Booking/Step2";
import Step3 from "components/Main/Booking/Step3";
import { BookingTypes } from "types/booking.types";
import useMultiStepForm from "hooks/useMultiStepForm";
/** @jsxImportSource @emotion/react */
import tw from "twin.macro";
import { handleSubmitBooking } from "services/addBooking";

const INITIAL_DATA: BookingTypes = {
    service: "",
    name: "",
    surname: "",
    email: "",
    phone: null,
    start_time: "",
    end_time: "",
    handleBookingInfo: () => {}
};

const Booking = ({ handleToggleState }: any) => {
    const [booking, setBooking] = useState(INITIAL_DATA);

    const handleBookingInfo = (bookinfInfo: Partial<BookingTypes>) => {
        setBooking((prev) => ({ ...prev, ...bookinfInfo }));
        next();
    };

    const submitBooking = (e: FormEvent) => {
        e.preventDefault();
        handleSubmitBooking(e, booking);
        next();
    };

    const {
        back,
        currentStepIndex,
        next,
        isFirstStep,
        isLastStep,
        step,
        steps
    } = useMultiStepForm([
        <Step1 handleBookingInfo={handleBookingInfo} />,
        <Step2 {...booking} handleBookingInfo={handleBookingInfo} />,
        <Step3 {...booking} handleBookingInfo={handleBookingInfo} />
    ]);

    return (
        <form
            onSubmit={submitBooking}
            css={[
                tw`relative text-center bg-green text-cream shadow min-h-[450px] p-[2rem 5rem 4rem]`,
                currentStepIndex === 1 && tw`p-[2rem 5rem 5rem]`
            ]}
        >
            <button
                tw="absolute top-[1rem] left-[1rem] text-xxl"
                onClick={() => handleToggleState("isBooking")}
                type="button"
            >
                Chiudi X
            </button>
            <div tw="absolute top-[1rem] right-[1rem] text-xxl">
                {currentStepIndex + 1} / {steps.length}
            </div>
            {step}
            <div tw="text-xxl flex gap-[1rem] absolute bottom-[1rem] right-[1rem] mt-[1rem]">
                {!isFirstStep && (
                    <button type="button" onClick={back}>
                        Indietro
                    </button>
                )}
                {isLastStep &&
                booking.name &&
                booking.surname &&
                booking.phone &&
                booking.email ? (
                    <button type="submit">Prenota</button>
                ) : null}
            </div>
        </form>
    );
};

export default Booking;
