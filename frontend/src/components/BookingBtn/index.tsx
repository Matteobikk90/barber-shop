/** @jsxImportSource @emotion/react */
import "twin.macro";

const BookingBtn = () => {
    return (
        <button tw="bg-green text-xxl text-cream right-0 fixed top-[10rem] z-10 max-w-[200px] w-full p-[0.5rem 1rem] rounded-l-md hover:animate-blink shadow">
            <strong tw="animate-typing flex flex-row overflow-hidden justify-center">
                PRENOTA
            </strong>
        </button>
    );
};

export default BookingBtn;
