export type BookingTypes = {
    id?: string;
    service: string;
    name: string;
    surname: string;
    email: string;
    phone: number | null;
    start_time: string;
    readable_start_time: string;
    confirmation: boolean;
    end_time: string;
    handleInputChange: Function;
    handleBookingInfo: (bookingInfo: Partial<BookingTypes>) => void;
};
