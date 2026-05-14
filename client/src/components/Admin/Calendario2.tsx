import { db } from "db/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBookings } from "services/getBookings";
import { BookingTypes } from "types/booking.types";
import { today } from "utils/utilities";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [bookedBookings, setBookedBookings] = useState<BookingTypes[]>([]);
  const [selectedDate, setSelectedDate] = useState(today);

  const reload = () =>
    getBookings().then((bookings: any) => setBookedBookings(bookings));

  useEffect(() => {
    reload();
  }, []);

  const handleDelete = (booking: BookingTypes) => {
    const label = `${booking.name} ${booking.surname} - ${
      booking.start_time.split(" ")[1]
    }`;
    const confirmation = window.confirm(
      `Cancellare la prenotazione di ${label}?`
    );
    if (!confirmation) return;
    deleteDoc(doc(db, "bookings", booking.id!))
      .then(() => {
        alert(`Prenotazione di ${label} cancellata`);
        reload();
      })
      .catch(() => alert("Qualcosa è andato storto, riprova"));
  };

  const groupedBookings = () => {
    const sorted = [...bookedBookings].sort(
      (a, b) => +new Date(a.start_time) - +new Date(b.start_time)
    );
    const groups = sorted.reduce((acc: any, booking) => {
      const date = booking.start_time.split(" ")[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(booking);
      return acc;
    }, {});
    return Object.keys(groups).map((date) => ({
      date,
      bookings: groups[date],
    }));
  };

  const groups = groupedBookings();
  const selectedBookings =
    groups.find((g) => g.date === selectedDate)?.bookings ?? [];

  return (
    <section id="calendar" tw="flex flex-col gap-[2rem] m-[2rem 1rem]">
      <div tw="flex gap-[1rem]">
        <button
          tw="border border-black p-[0.25rem 0.75rem] rounded-[0.25rem]"
          onClick={() => navigate("/calendario2")}
          type="button">
          Prenotazioni
        </button>
        <button
          tw="border border-black p-[0.25rem 0.75rem] rounded-[0.25rem]"
          onClick={() => navigate("/blocco-date")}
          type="button">
          Blocco date
        </button>
      </div>
      <div tw="flex flex-col gap-[0.5rem]">
        <label htmlFor="bookings">Scegli un giorno:</label>
        <select
          tw="max-w-[13rem] w-full p-[1rem] rounded border border-black"
          onChange={(e) => setSelectedDate(e.target.value)}
          id="bookings">
          {groups.map((item) => (
            <option key={item.date} value={item.date}>
              {item.date}
            </option>
          ))}
        </select>
      </div>
      <article tw="flex flex-row flex-wrap gap-[0.5rem]">
        {selectedBookings.map((booking: BookingTypes) => (
          <div
            key={booking.start_time + booking.phone}
            tw="w-[14rem] p-[1rem] flex flex-col gap-[0.5rem] bg-cream border border-green rounded shadow justify-between">
            <div tw="flex flex-col gap-[0.25rem]">
              <span tw="text-xl text-green font-bold">
                {booking.start_time.split(" ")[1].slice(0, 5)}
              </span>
              <p>{`${booking.name} ${booking.surname}`}</p>
              <p tw="text-sm">{booking.service}</p>
              <p tw="text-sm">{booking.phone}</p>
            </div>
            <button
              tw="mt-[0.5rem] flex items-center justify-center gap-[0.4rem] text-red text-sm border border-red rounded p-[0.3rem 0.75rem] w-full hover:bg-red hover:text-white transition-colors"
              type="button"
              onClick={() => handleDelete(booking)}>
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4h6v2" />
              </svg>
              Cancella
            </button>
          </div>
        ))}
        {selectedBookings.length === 0 && selectedDate && (
          <p>Nessuna prenotazione per questo giorno</p>
        )}
      </article>
    </section>
  );
};

export default AdminPanel;
