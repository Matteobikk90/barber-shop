import BookingFormContainer from "../Container";
import { BookingTypes } from "types/booking.types";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Step3 = ({
    name,
    surname,
    phone,
    email,
    start_time,
    end_time,
    service,
    handleBookingInfo
}: BookingTypes) => {
    return (
        <BookingFormContainer title="Inserisci i tuoi dati e prenota">
            <div tw="flex justify-center">
                <div tw="grid grid-cols-[repeat(auto-fit, minmax(18.75rem, auto))] gap-[1.5rem] text-xxl">
                    <div tw="flex gap-[2rem]">
                        <div tw="flex flex-col items-start gap-[0.5rem]">
                            <label>Nome: *</label>
                            <input
                                tw="rounded-[0.5rem] text-black p-[1rem] w-full"
                                autoFocus
                                required
                                type="text"
                                onChange={(e) =>
                                    handleBookingInfo!({ name: e.target.value })
                                }
                            />
                        </div>
                        <div tw="flex flex-col items-start gap-[0.5rem]">
                            <label>Cognome: *</label>
                            <input
                                tw="rounded-[0.5rem] text-black p-[1rem] w-full"
                                required
                                type="text"
                                onChange={(e) =>
                                    handleBookingInfo!({
                                        surname: e.target.value
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div tw="flex gap-[2rem]">
                        <div tw="flex flex-col items-start gap-[0.5rem]">
                            <label>Email: *</label>
                            <input
                                tw="rounded-[0.5rem] text-black p-[1rem] w-full"
                                required
                                type="email"
                                onChange={(e) =>
                                    handleBookingInfo!({
                                        email: e.target.value
                                    })
                                }
                            />
                        </div>
                        <div tw="flex flex-col items-start gap-[0.5rem]">
                            <label>Telefono: *</label>
                            <input
                                tw="rounded-[0.5rem] text-black p-[1rem] w-full"
                                required
                                type="number"
                                onChange={(e) =>
                                    handleBookingInfo!({
                                        phone: Number(e.target.value)
                                    })
                                }
                            />
                        </div>
                    </div>
                    <p tw="text-left text-lg">
                        * Tutti i campi sono obbligatori
                    </p>
                </div>
            </div>
        </BookingFormContainer>
    );
};

export default Step3;
