import { BookingTypes } from "types/booking.types";
import { db } from "db/firebase";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import { yesterday } from "utils/utilities";

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
            readable_start_time: ord.data.readable_start_time,
            start_time: ord.data.start_time,
            end_time: ord.data.end_time
        }));

        // Remove past days from db
        [...bookings].forEach((booking) => {
            const givenDate = new Date(booking.start_time!);
            const currentDate = new Date();
            if (givenDate.getTime() < currentDate.getTime() - yesterday) {
                const docToDelete = booking.id!;
                deleteDoc(doc(db, "bookings", docToDelete))
                    .then(() =>
                        console.log(
                            "Entire Document has been deleted successfully."
                        )
                    )
                    .catch((error) => console.log(error));
            }
        });

        return bookings;
    });
