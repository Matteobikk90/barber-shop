/** @jsxImportSource @emotion/react */
import "twin.macro";
const Step3 = () => {
    return (
        <article tw="flex flex-col gap-[2rem] justify-center items-center text-xxl mt-[4rem]">
            <div tw="flex gap-[2rem]">
                <div tw="flex flex-col items-start gap-[0.5rem]">
                    <label>Nome: *</label>
                    <input
                        tw="rounded-[0.5rem] text-black p-[1rem]"
                        autoFocus
                        required
                        type="text"
                    />
                </div>
                <div tw="flex flex-col items-start gap-[0.5rem]">
                    <label>Cognome: *</label>
                    <input
                        tw="rounded-[0.5rem] text-black p-[1rem]"
                        required
                        type="text"
                    />
                </div>
            </div>
            <div tw="flex gap-[2rem]">
                <div tw="flex flex-col items-start gap-[0.5rem]">
                    <label>Email: *</label>
                    <input
                        tw="rounded-[0.5rem] text-black p-[1rem]"
                        required
                        type="email"
                    />
                </div>
                <div tw="flex flex-col items-start gap-[0.5rem]">
                    <label>Telefono: *</label>
                    <input
                        tw="rounded-[0.5rem] text-black p-[1rem]"
                        required
                        type="number"
                    />
                </div>
            </div>
            <p>* Tutti i campi sono obbligatori</p>
        </article>
    );
};

export default Step3;
