import BookingFormContainer from "components/Main/Booking/Container";
import { BookingTypes } from "types/booking.types";
import { services } from "utils/items";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Step1 = ({ handleBookingInfo }: Partial<BookingTypes>) => (
    <BookingFormContainer title="Seleziona un servizio">
        <ul tw="grid grid-cols-[repeat(auto-fit, minmax(18.75rem, auto))] gap-[2rem]">
            {services.map(({ id, text, price, time }) => (
                <li tw="flex-1" key={id}>
                    <button
                        onClick={() => handleBookingInfo!({ service: text })}
                        type="button"
                        tw="shadow text-xxl flex flex-col justify-center p-[1rem] hover:text-cream hover:bg-black hover:border-cream w-full border bg-cream text-black border-cream rounded-[0.5rem]"
                    >
                        <strong>{text}</strong>
                        <div tw="w-full flex justify-between">
                            <span>Durata: {time} min</span>
                            <span>Prezzo: € {price}</span>
                        </div>
                    </button>
                </li>
            ))}
        </ul>
    </BookingFormContainer>
);

export default Step1;
