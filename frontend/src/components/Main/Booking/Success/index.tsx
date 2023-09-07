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
                    <label tw="font-bold">Nome:</label>
                    <p>{name}</p>
                </div>{" "}
                <div tw="flex flex-col items-start sm:items-center gap-[0.5rem] w-full">
                    <label tw="font-bold">Cognome:</label>
                    <p>{surname}</p>
                </div>
            </div>
            <div tw="flex gap-[4rem] sm:flex-wrap sm:gap-[2rem]">
                <div tw="flex flex-col items-start sm:items-center gap-[0.5rem] w-full">
                    <label tw="font-bold">Email:</label>
                    <p>{email}</p>
                </div>
                <div tw="flex flex-col items-start sm:items-center gap-[0.5rem] w-full">
                    <label tw="font-bold">Telefono:</label>
                    <p>{phone}</p>
                </div>
            </div>
            <div tw="flex gap-[4rem] sm:flex-wrap sm:gap-[2rem]">
                <div tw="flex flex-col items-start sm:items-center gap-[0.5rem] w-full">
                    <label tw="font-bold">Servizio:</label>
                    <p>{service}</p>
                </div>
                <div tw="flex flex-col items-start sm:items-center gap-[0.5rem] w-full">
                    <label tw="font-bold">Data:</label>
                    <p>{readable_start_time}</p>
                </div>
            </div>
        </div>
    </BookingFormContainer>
);

export default Success;
