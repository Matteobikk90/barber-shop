import { BookingTypes } from "types/booking.types";
import { db } from "db/firebase";
import { collection, getDocs } from "firebase/firestore";

const productsRef = collection(db, "bookings");

/* function to get bookings from firestore */
export const getBookings = () =>
    getDocs(productsRef).then((res) => {
        const ords = res.docs.map((doc) => ({
            data: doc.data(),
            id: doc.id
        }));

        const bookings: Partial<BookingTypes>[] = ords.map((ord) => ({
            id: ord.id,
            service: ord.data.service,
            name: ord.data.name,
            surname: ord.data.surname,
            phone: ord.data.phone,
            email: ord.data.email,
            start_time: ord.data.start_time,
            end_time: ord.data.end_time
        }));

        return bookings;
    });
