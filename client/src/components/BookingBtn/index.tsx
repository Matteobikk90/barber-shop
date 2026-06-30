/** @jsxImportSource @emotion/react */
import "twin.macro";

const BookingBtn = ({ handleToggleState }: any) => (
  <button
    onClick={() => handleToggleState("isBooking")}
    tw="bg-green text-xxl text-cream right-[-1px] fixed md:top-[6rem] top-[10rem] z-[1001] sm:max-w-[150px] max-w-[220px] w-full p-[0.75rem 1rem] xxs:max-w-[120px] border border-cream rounded-l-md hover:animate-blink shadow">
    <strong tw="animate-typing flex flex-row overflow-hidden justify-center">
      PRENOTA
    </strong>
  </button>
);

export default BookingBtn;
