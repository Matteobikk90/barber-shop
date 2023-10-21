import { BookingFormContainerTypes } from "types/form-container.types";
/** @jsxImportSource @emotion/react */
import tw from "twin.macro";

const BookingFormContainer = ({
    title,
    message,
    children
}: BookingFormContainerTypes) => (
    <>
        <h2 css={[tw`text-xxl`, !message && tw`mb-[2rem]`]}>{title}</h2>
        {message && <p tw="text-lg">{message}</p>}
        <article>{children}</article>
    </>
);

export default BookingFormContainer;
