export type BookingTypes = {
    service: string;
    name: string;
    surname: string;
    email: string;
    phone: number | null;
    start_time: string;
    readable_start_time: string;
    end_time: string;
    handleBookingInfo: (bookingInfo: Partial<BookingTypes>) => void;
};
