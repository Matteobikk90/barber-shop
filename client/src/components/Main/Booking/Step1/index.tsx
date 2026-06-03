import BookingFormContainer from "components/Main/Booking/Container";
import { BookingTypes } from "types/booking.types";
import { services } from "utils/items";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Step1 = ({ handleBookingInfo }: Partial<BookingTypes>) => (
  <BookingFormContainer title="Seleziona un servizio">
    <ul tw="grid grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] sm:grid-cols-2 gap-[1rem] sm:gap-[0.6rem]">
      {services.map(({ id, text, price, time, src, src2 }) => (
        <li tw="flex" key={id}>
          <button
            onClick={() => handleBookingInfo!({ service: text })}
            type="button"
            tw="flex-1 flex flex-col items-center gap-[0.75rem] p-[1.5rem 1rem] sm:p-[0.85rem 0.6rem] text-center bg-cream text-black border-2 border-cream rounded-[0.75rem] shadow hover:bg-black hover:text-cream hover:border-black transition-all">
            <div tw="flex gap-[0.5rem] items-center">
              <img
                className="service-icon"
                tw="w-[3.5rem] h-[3.5rem] sm:w-[2rem] sm:h-[2rem]"
                src={src as string}
                alt={text as string}
              />
              {src2 && (
                <img
                  className="service-icon"
                  tw="w-[3.5rem] h-[3.5rem] sm:w-[2rem] sm:h-[2rem]"
                  src={src2}
                  alt=""
                />
              )}
            </div>
            <strong tw="text-xxl sm:text-xl leading-tight flex-1 flex items-center justify-center">{text}</strong>
            <div tw="text-xl sm:text-lg flex justify-between w-full pt-[0.5rem] border-t border-[rgba(0,0,0,0.12)]">
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
