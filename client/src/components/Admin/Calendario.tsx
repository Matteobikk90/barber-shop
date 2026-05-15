/** @jsxImportSource @emotion/react */
import { db } from "db/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { addBlockedDate } from "services/addBlockedDate";
import { deleteBlockedDate } from "services/deleteBlockedDate";
import { getBlockedDates } from "services/getBlockedDates";
import { getBookings } from "services/getBookings";
import tw from "twin.macro";
import { BookingTypes } from "types/booking.types";
import { today } from "utils/utilities";

type Tab = "prenotazioni" | "blocco-date";

const TZ = "Europe/Rome";

// Works for both old format ("2026-10-25 10:00:00") and new ISO ("2026-10-25T09:00:00.000Z")
// "fr-CA" locale produces YYYY-MM-DD format, used as grouping key
const getDateKey = (start_time: string): string =>
  new Intl.DateTimeFormat("fr-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(start_time));

const getTimeDisplay = (start_time: string): string =>
  new Intl.DateTimeFormat("it-IT", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(start_time));

const TrashIcon = () => (
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
);

const AdminPanel = () => {
  const [tab, setTab] = useState<Tab>("prenotazioni");

  // — Prenotazioni —
  const [bookedBookings, setBookedBookings] = useState<BookingTypes[]>([]);
  const [selectedDate, setSelectedDate] = useState(today);

  const reloadBookings = () =>
    getBookings().then((b: any) => setBookedBookings(b));

  const handleDelete = (booking: BookingTypes) => {
    const label = `${booking.name} ${booking.surname} - ${getTimeDisplay(
      booking.start_time
    )}`;
    if (!window.confirm(`Cancellare la prenotazione di ${label}?`)) return;
    deleteDoc(doc(db, "bookings", booking.id!))
      .then(() => {
        alert(`${label} cancellata`);
        reloadBookings();
      })
      .catch(() => alert("Qualcosa è andato storto, riprova"));
  };

  const groupedBookings = () => {
    const sorted = [...bookedBookings].sort(
      (a, b) => +new Date(a.start_time) - +new Date(b.start_time)
    );
    const groups = sorted.reduce((acc: any, booking) => {
      const date = getDateKey(booking.start_time);
      if (!acc[date]) acc[date] = [];
      acc[date].push(booking);
      return acc;
    }, {});
    return Object.keys(groups).map((date) => ({
      date,
      bookings: groups[date],
    }));
  };

  // — Blocco date —
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [newDate, setNewDate] = useState("");
  const dateInputRef = useRef<HTMLInputElement>(null);

  const reloadBlocked = () =>
    getBlockedDates().then((d) => setBlockedDates(d.sort()));

  const handleAddBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate) return;
    if (blockedDates.includes(newDate)) {
      alert("Data già bloccata");
      return;
    }
    if (!window.confirm(`Bloccare il giorno ${newDate}?`)) return;
    addBlockedDate(newDate)
      .then(() => {
        alert(`${newDate} bloccato`);
        setNewDate("");
        reloadBlocked();
      })
      .catch(() => alert("Qualcosa è andato storto, riprova"));
  };

  const handleRemoveBlock = (date: string) => {
    if (!window.confirm(`Sbloccare il giorno ${date}?`)) return;
    deleteBlockedDate(date)
      .then(() => {
        alert(`${date} sbloccato`);
        reloadBlocked();
      })
      .catch(() => alert("Qualcosa è andato storto, riprova"));
  };

  const formatDate = (date: string) => {
    const [y, m, d] = date.split("-");
    const obj = new Date(`${y}-${m}-${d}T00:00:00`);
    return {
      day: d,
      month: obj.toLocaleDateString("it-IT", { month: "short" }),
      year: y,
      weekday: obj.toLocaleDateString("it-IT", { weekday: "short" }),
    };
  };

  useEffect(() => {
    reloadBookings();
    reloadBlocked();
  }, []);

  const groups = groupedBookings();
  const selectedBookings =
    groups.find((g) => g.date === selectedDate)?.bookings ?? [];

  return (
    <section
      id="calendar"
      tw="flex flex-col gap-[1.75rem] p-[2rem 1.5rem] max-w-[64rem] mx-auto">
      {/* Tab bar */}
      <div tw="flex bg-cream rounded-lg p-[0.25rem] gap-[0.25rem] self-start border border-[#334a3b22]">
        <button
          type="button"
          tw="px-5 py-[0.4rem] rounded text-sm font-bold border-none cursor-pointer tracking-wide transition-all"
          css={
            tab === "prenotazioni" ? tw`bg-green text-cream` : tw` text-green`
          }
          onClick={() => setTab("prenotazioni")}>
          Prenotazioni
        </button>
        <button
          type="button"
          tw="px-5 py-[0.4rem] rounded text-sm font-bold border-none cursor-pointer tracking-wide transition-all"
          css={
            tab === "blocco-date" ? tw`bg-green text-cream` : tw` text-green`
          }
          onClick={() => setTab("blocco-date")}>
          Blocco date
        </button>
      </div>

      {/* ── PRENOTAZIONI ── */}
      {tab === "prenotazioni" && (
        <>
          <div tw="flex gap-[0.5rem] overflow-x-auto pb-[0.5rem]">
            {groups.map((item) => {
              const { day, month, year, weekday } = formatDate(item.date);
              const active = selectedDate === item.date;
              return (
                <button
                  key={item.date}
                  type="button"
                  onClick={() => setSelectedDate(item.date)}
                  tw="flex flex-col items-center px-[0.85rem] py-[0.6rem] rounded-xl min-w-[4.5rem] border-2 cursor-pointer transition-all"
                  css={
                    active
                      ? tw`border-green bg-green text-cream shadow-[0_2px_8px_rgba(51,74,59,0.25)]`
                      : tw`border-[#c8c3bc] bg-white text-black shadow-sm`
                  }>
                  <span tw="text-[0.6rem] font-bold tracking-widest uppercase opacity-70">
                    {weekday}
                  </span>
                  <span tw="text-[1.6rem] font-bold leading-none">{day}</span>
                  <span tw="text-[0.6rem] font-bold tracking-wider uppercase">
                    {month} {year}
                  </span>
                  <span
                    tw="mt-[0.35rem] text-[0.65rem] font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    css={
                      active
                        ? tw`bg-[rgba(239,236,232,0.3)] text-cream`
                        : tw`bg-green text-cream`
                    }>
                    {item.bookings.length}
                  </span>
                </button>
              );
            })}
          </div>

          {selectedBookings.length === 0 ? (
            <p tw="text-sm text-[#999]">
              Nessuna prenotazione per questo giorno.
            </p>
          ) : (
            <div tw="overflow-x-auto rounded-xl border border-[#e2ded9] shadow-sm">
              <table tw="w-full border-collapse text-sm">
                <thead>
                  <tr tw="bg-green text-cream">
                    {["Ora", "Cliente", "Servizio", "Telefono", ""].map((h) => (
                      <th
                        key={h}
                        tw="p-[0.75rem 1.1rem] text-left font-bold tracking-wider text-[0.7rem] uppercase">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedBookings.map((booking: BookingTypes, i: number) => (
                    <tr
                      key={booking.start_time + booking.phone}
                      tw="border-t border-[#ede9e3]"
                      css={i % 2 === 0 ? tw`bg-[#faf9f7]` : tw`bg-white`}>
                      <td tw="p-[0.85rem 1.1rem] font-bold text-green text-regular">
                        {getTimeDisplay(booking.start_time)}
                      </td>
                      <td tw="p-[0.85rem 1.1rem] font-medium">{`${booking.name} ${booking.surname}`}</td>
                      <td tw="p-[0.85rem 1.1rem] font-medium">
                        {booking.service}
                      </td>
                      <td tw="p-[0.85rem 1.1rem] font-medium">
                        {booking.phone}
                      </td>
                      <td tw="p-[0.85rem 1.1rem]">
                        <button
                          type="button"
                          onClick={() => handleDelete(booking)}
                          tw="flex items-center gap-[0.3rem] text-red border-2 border-red rounded-lg p-[0.75rem]  cursor-pointer text-sm font-bold whitespace-nowrap hover:bg-red hover:text-white transition-all">
                          <TrashIcon /> Cancella
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* ── BLOCCO DATE ── */}
      {tab === "blocco-date" && (
        <>
          <form
            onSubmit={handleAddBlock}
            tw="flex gap-[0.75rem] items-center flex-wrap">
            <button
              type="button"
              onClick={() => dateInputRef.current?.showPicker()}
              tw="px-4 py-2 rounded-lg border-2 border-green bg-white cursor-pointer text-sm font-medium text-green hover:bg-cream transition-all">
              {newDate
                ? (() => {
                    const { day, month, year } = formatDate(newDate);
                    return `${day} ${month} ${year}`;
                  })()
                : "Scegli data 📅"}
            </button>
            <input
              ref={dateInputRef}
              type="date"
              min={today}
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              tw="sr-only"
            />
            <button
              type="submit"
              tw="px-5 py-2 rounded-lg bg-green text-cream border-none cursor-pointer text-sm font-bold hover:opacity-90 transition-all">
              Blocca
            </button>
          </form>

          {blockedDates.length === 0 ? (
            <p tw="text-sm text-[#999]">Nessun giorno bloccato.</p>
          ) : (
            <div tw="flex flex-wrap gap-[0.5rem]">
              {blockedDates.map((date) => {
                const { day, month, year, weekday } = formatDate(date);
                return (
                  <div
                    key={date}
                    tw="flex flex-col items-center justify-between p-3 rounded-xl min-w-[7rem] border border-[#e2ded9] bg-white shadow-sm gap-[0.15rem]">
                    <span tw="text-[0.6rem] font-bold uppercase opacity-60">
                      {weekday}
                    </span>
                    <span tw="text-[1.4rem] font-bold leading-none">{day}</span>
                    <span tw="text-[0.6rem] font-bold uppercase">
                      {month} {year}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveBlock(date)}
                      tw="mt-2 text-sm font-bold text-red  border-none cursor-pointer hover:opacity-70 transition-all">
                      Sblocca
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default AdminPanel;
