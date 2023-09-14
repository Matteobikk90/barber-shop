import BookingFormContainer from "components/Main/Booking/Container";
import { BookingTypes } from "types/booking.types";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Step3 = ({
    service,
    readable_start_time,
    handleBookingInfo
}: Partial<BookingTypes>) => (
    <BookingFormContainer title="Inserisci i tuoi dati e prenota">
        <div tw="flex justify-center">
            <div tw="grid grid-cols-[repeat(auto-fit, minmax(17.75rem, auto))] gap-[1.5rem] text-xxl sm:w-full">
                <div tw="flex gap-[2rem] sm:flex-wrap">
                    <div tw="flex flex-col items-start gap-[0.5rem] w-full">
                        <label>Nome: *</label>
                        <input
                            tw="rounded-[0.5rem] text-black p-[1rem] w-full"
                            autoFocus
                            required
                            type="text"
                            onChange={(e) =>
                                handleBookingInfo!({ name: e.target.value })
                            }
                            name="name"
                        />
                    </div>
                    <div tw="flex flex-col items-start gap-[0.5rem] w-full">
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
                            name="surname"
                        />
                    </div>
                </div>
                <div tw="flex gap-[2rem] sm:flex-wrap">
                    <div tw="flex flex-col items-start gap-[0.5rem] w-full">
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
                            name="email"
                        />
                    </div>
                    <div tw="flex flex-col items-start gap-[0.5rem] w-full">
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
                            name="phone"
                        />
                    </div>
                    <input
                        type="hidden"
                        value={service}
                        name="service"
                        readOnly
                    />
                    <input
                        type="hidden"
                        value={readable_start_time}
                        name="readable_start_time"
                        readOnly
                    />
                </div>
                <p tw="text-left text-lg">* Tutti i campi sono obbligatori</p>
            </div>
        </div>
    </BookingFormContainer>
);

export default Step3;
