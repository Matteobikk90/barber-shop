/** @jsxImportSource @emotion/react */
import "twin.macro";
import BookingFormContainer from "../Container";
const Step3 = () => {
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
                            />
                        </div>
                        <div tw="flex flex-col items-start gap-[0.5rem]">
                            <label>Cognome: *</label>
                            <input
                                tw="rounded-[0.5rem] text-black p-[1rem] w-full"
                                required
                                type="text"
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
                            />
                        </div>
                        <div tw="flex flex-col items-start gap-[0.5rem]">
                            <label>Telefono: *</label>
                            <input
                                tw="rounded-[0.5rem] text-black p-[1rem] w-full"
                                required
                                type="number"
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
