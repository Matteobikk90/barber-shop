/* eslint-disable max-len */
import { useRef } from "react";
import useToggle from "hooks/useToggle";
import useContactForm from "hooks/useContactForm";
/** @jsxImportSource @emotion/react */
import tw from "twin.macro";

const Form = () => {
    const contactFormRef = useRef<HTMLFormElement | null>(null);
    const { formData, handleInputChange, handleReset, handleSubmit } =
        useContactForm(
            {
                name: "",
                phone: null,
                email: "",
                message: ""
            },
            contactFormRef
        );
    const { handleToggleState, toggleState } = useToggle();

    return (
        <>
            <form
                onSubmit={(e) => {
                    handleToggleState("isMessageSent");
                    handleSubmit(e);
                }}
                ref={contactFormRef}
            >
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
                {/* <div tw="flex">
                    <input
                        id="joinList"
                        tw="mr-[0.5rem] w-[1.5rem] h-[1.5rem]"
                        type="checkbox"
                        name="joinMailingList"
                        checked={formData.joinMailingList}
                        onChange={(e) => handleInputChange(e.target)}
                    />
                    <label
                        tw="font-light text-xs text-black"
                        htmlFor="joinList"
                    >
                        {t("form_agreements")}
                    </label>
                </div> */}
                <button
                    type="submit"
                    disabled={
                        !formData.name ||
                        !formData.phone ||
                        !formData.email ||
                        !formData.message
                    }
                    css={[
                        tw`opacity-30 bg-green border border-[#D7D7D7] p-[0.75rem] text-cream w-full text-center rounded-[0.25rem] mb-[0.5rem] mt-[1.5rem] cursor-not-allowed max-w-[9rem] transition-opacity duration-500`,
                        formData.name &&
                            formData.phone &&
                            formData.email &&
                            formData.message &&
                            tw`opacity-90 hover:opacity-100 cursor-pointer`
                    ]}
                    value="Send"
                >
                    Invia
                </button>
            </form>
            {/* {(status === "success" || status === "error") &&
                toggleState.isMessageSent && (
                    <div tw="fixed left-0 top-0 bottom-0 right-0 flex items-center justify-center bg-white rounded-[0.5rem] text-center p-[2rem 2.5rem 1.5rem 2.5rem]">
                        <div tw="bg-blue-100 p-[2rem 4rem] rounded-[1rem] shadow-[0.18rem 0.5rem 1.5rem rgba(0, 0, 0, 0.07)]">
                            <img
                                alt="Thumbs up"
                                src={thumbs}
                                tw="m-[2rem auto]"
                            />
                            <h2 tw="text-blue-600 font-semiBold text-[2.25rem] mb-[1.5rem]">
                                {t("form_received")}
                            </h2>
                            <p tw="max-w-[33.188rem] text-[1.125rem] w-full font-light text-black mb-[3rem]">
                                {t("form_received_message")}
                            </p>
                            <button
                                onClick={() => {
                                    handleToggleState("isMessageSent");
                                    handleReset();
                                }}
                                tw="max-w-[11.625rem] w-full rounded-[3.813rem] mb-[3rem] p-[0.5rem 0.75rem] text-cream bg-blue-800 hover:bg-blue-600"
                            >
                                {t("form_close")}
                            </button>
                        </div>
                    </div>
                )} */}
        </>
    );
};

export default Form;
