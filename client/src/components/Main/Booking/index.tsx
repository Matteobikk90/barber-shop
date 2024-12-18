import { FormEvent, useState, useRef } from "react";
import Step1 from "components/Main/Booking/Step1";
import Step2 from "components/Main/Booking/Step2";
import Step3 from "components/Main/Booking/Step3";
import Success from "components/Main/Booking/Success";
import { handleSubmitBooking } from "services/addBooking";
import { BookingTypes } from "types/booking.types";
import useMultiStepForm from "hooks/useMultiStepForm";
/** @jsxImportSource @emotion/react */
import tw from "twin.macro";

const INITIAL_DATA: BookingTypes = {
  service: "",
  name: "",
  surname: "",
  email: "",
  phone: null,
  start_time: "",
  readable_start_time: "",
  end_time: "",
  confirmation: false,
  handleBookingInfo: () => {},
  handleInputChange: () => {},
};

const Booking = ({ handleToggleState }: any) => {
  const [booking, setBooking] = useState(INITIAL_DATA);
  const bookingFormRef = useRef<HTMLFormElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBookingInfo = (bookinfInfo: Partial<BookingTypes>) => {
    setBooking((prev) => ({ ...prev, ...bookinfInfo }));
    !isSecondLastStep && next();
  };

  const handleInputChange = ({ checked }: any) =>
    setBooking({
      ...booking,
      confirmation: checked,
    });

  const submitBooking = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    handleSubmitBooking(booking, next, setIsLoading);
  };

  const {
    back,
    currentStepIndex,
    next,
    isFirstStep,
    isSecondLastStep,
    isLastStep,
    step,
    steps,
  } = useMultiStepForm([
    <Step1 handleBookingInfo={handleBookingInfo} />,
    <Step2 {...booking} handleBookingInfo={handleBookingInfo} />,
    <Step3
      {...booking}
      handleInputChange={handleInputChange}
      handleBookingInfo={handleBookingInfo}
    />,
    <Success {...booking} />,
  ]);

  return (
    <form
      ref={bookingFormRef}
      onSubmit={submitBooking}
      css={[
        tw`relative text-center bg-green text-cream shadow min-h-[450px] p-[2rem 5rem 4rem] md:p-[2rem 1rem 4rem] sm:p-[4rem 1rem]`,
        currentStepIndex === 1 && tw`p-[2rem 5rem 5rem]`,
      ]}>
      <button
        tw="absolute top-[1rem] left-[1rem] text-xxl"
        onClick={() => handleToggleState("isBooking")}
        type="button">
        Chiudi X
      </button>
      <div tw="absolute top-[1rem] right-[1rem] text-xxl">
        {currentStepIndex + 1} / {steps.length}
      </div>
      {step}
      <div tw="text-xxl flex gap-[1rem] absolute bottom-[1rem] right-[1rem] mt-[1rem]">
        {!isFirstStep && !isLastStep && !isLoading && (
          <button type="button" onClick={back}>
            Indietro
          </button>
        )}
        {isSecondLastStep &&
        booking.name &&
        booking.surname &&
        booking.phone &&
        booking.email &&
        booking.confirmation ? (
          <button type="submit" value="Send">
            {isLoading ? "Prenotazione in corso, attendi" : "Prenota"}
          </button>
        ) : null}
      </div>
    </form>
  );
};

export default Booking;
