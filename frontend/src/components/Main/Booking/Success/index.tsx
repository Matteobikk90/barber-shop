import BookingFormContainer from "components/Main/Booking/Container";
import { BookingTypes } from "types/booking.types";
/** @jsxImportSource @emotion/react */
import "twin.macro";
import { read } from "fs";

const Success = ({
    name,
    surname,
    phone,
    email,
    readable_start_time,
    service
}: Partial<BookingTypes>) => (
    <BookingFormContainer
        title="Ci vediamo presto"
        message="Riceverai a breve una email di conferma"
    >
        <div tw="flex flex-col gap-[1.5rem] text-xxl sm:w-full max-w-[28.125rem] sm:max-w-none m-[4rem auto] sm:m-[3rem 0 0]">
            <div tw="flex gap-[4rem] sm:flex-wrap sm:gap-[2rem]">
                <div tw="flex flex-col items-start sm:items-center gap-[0.5rem] w-full">
                    <label>Nome:</label>
                    <p tw="font-bold">{name}</p>
                </div>{" "}
                <div tw="flex flex-col items-start sm:items-center gap-[0.5rem] w-full">
                    <label>Cognome:</label>
                    <p tw="font-bold">{surname}</p>
                </div>
            </div>
            <div tw="flex gap-[4rem] sm:flex-wrap sm:gap-[2rem]">
                <div tw="flex flex-col items-start sm:items-center gap-[0.5rem] w-full">
                    <label>Email:</label>
                    <p tw="font-bold">{email}</p>
                </div>
                <div tw="flex flex-col items-start sm:items-center gap-[0.5rem] w-full">
                    <label>Telefono:</label>
                    <p tw="font-bold">{phone}</p>
                </div>
            </div>
            <div tw="flex gap-[4rem] sm:flex-wrap sm:gap-[2rem]">
                <div tw="flex flex-col items-start sm:items-center gap-[0.5rem] w-full">
                    <label>Servizio:</label>
                    <p tw="font-bold">{service}</p>
                </div>
                <div tw="flex flex-col items-start sm:items-center gap-[0.5rem] w-full">
                    <label>Data:</label>
                    <p tw="font-bold">{readable_start_time}</p>
                </div>
            </div>
        </div>
    </BookingFormContainer>
);

export default Success;
