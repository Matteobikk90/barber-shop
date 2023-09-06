import { services } from "utils/items";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const Step1 = () => {
    return (
        <article>
            <h3 tw="text-xxl">Seleziona un servizio:</h3>
            <ul tw="grid grid-cols-[repeat(3, 1fr)] gap-[2rem] mt-[2rem]">
                {services.map(({ id, text, price, time }) => (
                    <li tw="flex-1" key={id}>
                        <button
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
        </article>
    );
};

export default Step1;
