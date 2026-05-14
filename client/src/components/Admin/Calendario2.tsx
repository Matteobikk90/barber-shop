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
      <div tw="flex gap-[0.5rem] overflow-x-auto pb-[0.25rem]">
        {groups.map((item) => {
          const [year, month, day] = item.date.split("-");
          const dateObj = new Date(`${year}-${month}-${day}T00:00:00`);
          const dayName = dateObj.toLocaleDateString("it-IT", {
            weekday: "short",
          });
          const monthName = dateObj.toLocaleDateString("it-IT", {
            month: "short",
          });
          const isSelected = selectedDate === item.date;
          return (
            <button
              key={item.date}
              type="button"
              onClick={() => setSelectedDate(item.date)}
              tw="flex flex-col items-center p-[0.5rem 0.75rem] rounded border min-w-[5rem] transition-colors"
              style={{
                backgroundColor: isSelected ? "#334a3b" : "#efece8",
                borderColor: "#334a3b",
                color: isSelected ? "#efece8" : "#160f0f",
              }}>
              <span tw="text-xs uppercase">{dayName}</span>
              <span tw="text-xxl font-bold leading-none">{day}</span>
              <span tw="text-xs uppercase">{monthName}</span>
              <span tw="text-xs">{year}</span>
              <span
                tw="mt-[0.25rem] text-xs rounded-full w-[1.2rem] h-[1.2rem] flex items-center justify-center font-bold"
                style={{
                  backgroundColor: isSelected ? "#efece8" : "#334a3b",
                  color: isSelected ? "#334a3b" : "#efece8",
                }}>
                {item.bookings.length}
              </span>
            </button>
          );
        })}
      </div>
      {selectedBookings.length === 0 ? (
        <p tw="text-sm">Nessuna prenotazione per questo giorno</p>
      ) : (
        <div tw="overflow-x-auto rounded border border-green">
          <table tw="w-full border-collapse text-sm">
            <thead>
              <tr tw="bg-green text-cream text-left">
                <th tw="p-[0.6rem 1rem]">Ora</th>
                <th tw="p-[0.6rem 1rem]">Cliente</th>
                <th tw="p-[0.6rem 1rem]">Servizio</th>
                <th tw="p-[0.6rem 1rem]">Telefono</th>
                <th tw="p-[0.6rem 1rem]"></th>
              </tr>
            </thead>
            <tbody>
              {selectedBookings.map((booking: BookingTypes, i: number) => (
                <tr
                  key={booking.start_time + booking.phone}
                  tw="border-t border-green"
                  style={{ backgroundColor: i % 2 === 0 ? "#efece8" : "#fff" }}>
                  <td tw="p-[0.6rem 1rem] font-bold text-green">
                    {booking.start_time.split(" ")[1].slice(0, 5)}
                  </td>
                  <td tw="p-[0.6rem 1rem]">{`${booking.name} ${booking.surname}`}</td>
                  <td tw="p-[0.6rem 1rem]">{booking.service}</td>
                  <td tw="p-[0.6rem 1rem]">{booking.phone}</td>
                  <td tw="p-[0.6rem 1rem]">
                    <button
                      tw="flex items-center gap-[0.3rem] text-red border border-red rounded p-[0.2rem 0.6rem] hover:bg-red hover:text-white transition-colors whitespace-nowrap"
                      type="button"
                      onClick={() => handleDelete(booking)}>
                      <svg
                        width="12"
                        height="12"
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default AdminPanel;
