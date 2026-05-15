import BookingFormContainer from "components/Main/Booking/Container";
import { BookingTypes } from "types/booking.types";
import { services } from "utils/items";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Step1 = ({ handleBookingInfo }: Partial<BookingTypes>) => (
  <BookingFormContainer title="Seleziona un servizio">
    <ul tw="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-[0.75rem]">
      {services.map(({ id, text, price, time }) => (
        <li tw="flex" key={id}>
          <button
            onClick={() => handleBookingInfo!({ service: text })}
            type="button"
            tw="flex-1 flex flex-col justify-between gap-[0.75rem] p-[1rem] text-left bg-cream text-black border border-cream rounded-[0.5rem] shadow hover:bg-black hover:text-cream hover:border-black transition-all">
            <strong tw="text-xxl leading-tight">{text}</strong>
            <div tw="text-xxl flex justify-between">
              <span>{time} min</span>
              <span>€ {price}</span>
            </div>
          </button>
        </li>
      ))}
    </ul>
  </BookingFormContainer>
);

export default Step1;
