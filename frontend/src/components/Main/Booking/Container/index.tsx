import { BookingFormContainerTypes } from "types/form-container.types";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const BookingFormContainer = ({
    title,
    children
}: BookingFormContainerTypes) => {
    return (
        <>
            <h3 tw="text-xxl mb-[2rem]">{title}</h3>
            <article>{children}</article>
        </>
    );
};

export default BookingFormContainer;
