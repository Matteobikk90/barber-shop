import { NavLink } from "react-router-dom";
/* eslint-disable max-len */
import useContactForm from "hooks/useContactForm";
/** @jsxImportSource @emotion/react */
import tw from "twin.macro";

const Form = () => {
    const { formData, handleInputChange, handleSubmit } = useContactForm({
        name: "",
        phone: null,
        email: "",
        message: "",
        confirmation: false
    });

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div tw="flex items-center justify-between gap-[1rem] mb-[1.5rem]">
                    <div tw="w-full">
                        <label
                            htmlFor="name"
                            tw="pb-[0.5rem] text-black font-semiBold block"
                        >
                            Nome
                        </label>
                        <input
                            id="name"
                            required
                            css={[
                                tw`border border-black text-black rounded-[0.25rem] bg-[transparent] p-[0.5rem] w-full focus:border-2 outline-none`,
                                formData.name !== "" && tw`border border-black`
                            ]}
                            type="text"
                            placeholder="Nome"
                            name="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange(e.target)}
                        />
                    </div>
                    <div tw="w-full">
                        <label
                            htmlFor="phone"
                            tw="pb-[0.5rem] text-black font-semiBold block"
                        >
                            Telefono
                        </label>
                        <input
                            id="phone"
                            required
                            css={[
                                tw`border border-black text-black rounded-[0.25rem] bg-[transparent] p-[0.5rem] w-full focus:border-2 outline-none`,
                                formData.name !== "" && tw`border border-black`
                            ]}
                            type="number"
                            placeholder="Telefono"
                            name="phone"
                            value={formData.phone || ""}
                            onChange={(e) => handleInputChange(e.target)}
                        />
                    </div>
                </div>
                <label
                    htmlFor="email"
                    tw="text-black font-semiBold block mb-[0.5rem]"
                >
                    Email
                </label>
                <input
                    id="email"
                    required
                    css={[
                        tw`border border-black text-black rounded-[0.25rem] bg-[transparent] p-[0.5rem] w-full focus:border-2 outline-none`,
                        formData.phone !== null && tw`border border-black`
                    ]}
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange(e.target)}
                />
                <label
                    tw="text-black font-semiBold block m-[1.5rem 0 0.5rem]"
                    htmlFor="textarea"
                >
                    Messaggio
                </label>
                <textarea
                    id="textarea"
                    tw="border border-black text-black h-[100px] rounded-[0.25rem] bg-[transparent] p-[0.5rem] w-full focus:border-2 outline-none m-[0 0 1rem]"
                    placeholder="Messaggio"
                    name="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange(e.target)}
                ></textarea>
                <div tw="flex items-center gap-[0.5rem]">
                    <input
                        id="confirmation"
                        tw="w-[1rem] h-[1rem]"
                        type="checkbox"
                        name="confirmation"
                        checked={formData.confirmation}
                        onChange={(e) => handleInputChange(e.target)}
                    />
                    <label tw="text-lg text-black" htmlFor="confirmation">
                        Ho letto e accetto i{" "}
                        <NavLink
                            tw="text-green font-bold"
                            to="/terms-and-conditions"
                        >
                            Termini e Condizioni
                        </NavLink>{" "}
                        e{" "}
                        <NavLink
                            tw="text-green font-bold"
                            to="/privacy-and-policy"
                        >
                            l'Informativa sulla Privacy
                        </NavLink>
                        .
                    </label>
                </div>
                <button
                    type="submit"
                    disabled={
                        !formData.name ||
                        !formData.phone ||
                        !formData.email ||
                        !formData.message ||
                        !formData.confirmation
                    }
                    css={[
                        tw`opacity-30 bg-green border border-[#D7D7D7] p-[0.75rem] text-cream w-full text-center rounded-[0.25rem] mb-[0.5rem] mt-[1.5rem] cursor-not-allowed max-w-[9rem] transition-opacity duration-500`,
                        formData.name &&
                            formData.phone &&
                            formData.email &&
                            formData.message &&
                            formData.confirmation &&
                            tw`opacity-90 hover:opacity-100 cursor-pointer`
                    ]}
                    value="Send"
                >
                    Invia
                </button>
            </form>
        </>
    );
};

export default Form;
