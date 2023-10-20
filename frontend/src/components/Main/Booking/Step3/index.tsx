import BookingFormContainer from "components/Main/Booking/Container";
import { BookingTypes } from "types/booking.types";
/** @jsxImportSource @emotion/react */
import "twin.macro";
import { NavLink } from "react-router-dom";

const Step3 = ({
    service,
    readable_start_time,
    handleBookingInfo,
    confirmation,
    handleInputChange
}: Partial<BookingTypes>) => (
    <BookingFormContainer title="Inserisci i tuoi dati, conferma le policy e prenota">
        <div tw="flex justify-center">
            <div tw="grid grid-cols-[repeat(auto-fit, minmax(17.75rem, auto))] gap-[1.5rem] text-xxl sm:w-full">
                <div tw="flex gap-[2rem] sm:flex-wrap">
                    <div tw="flex flex-col items-start gap-[0.5rem] w-full">
                        <label>Nome: *</label>
                        <input
                            title="Name"
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
                            title="Surname"
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
                            title="Email"
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
                            title="Phone"
                            name="phone"
                        />
                    </div>
                </div>
                <div tw="flex items-center gap-[0.5rem]">
                    <input
                        id="confirmation"
                        tw="w-[1rem] h-[1rem]"
                        type="checkbox"
                        name="confirmation"
                        checked={confirmation}
                        onChange={(e) => handleInputChange!(e.target)}
                    />
                    *
                    <label tw="text-lg text-black" htmlFor="confirmation">
                        Ho letto e accetto i{" "}
                        <NavLink
                            tw="text-cream font-bold"
                            to="/terms-and-conditions"
                        >
                            Termini e Condizioni
                        </NavLink>{" "}
                        e{" "}
                        <NavLink
                            tw="text-cream font-bold"
                            to="/privacy-and-policy"
                        >
                            l'Informativa sulla Privacy
                        </NavLink>
                        .
                    </label>
                </div>
                <p tw="text-left text-lg">* Tutti i campi sono obbligatori</p>
                <div>
                    <input
                        tw="h-0 opacity-0"
                        type="text"
                        value={service}
                        name="service"
                        title="Service"
                        readOnly
                    />
                    <input
                        tw="h-0 opacity-0"
                        type="text"
                        value={readable_start_time}
                        name="readable_start_time"
                        title="Readable_start_time"
                        readOnly
                    />
                </div>
            </div>
        </div>
    </BookingFormContainer>
);

export default Step3;
