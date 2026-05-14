/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBlockedDate } from "services/addBlockedDate";
import { deleteBlockedDate } from "services/deleteBlockedDate";
import { getBlockedDates } from "services/getBlockedDates";
import "twin.macro";
import { today } from "utils/utilities";

const BlockDate = () => {
  const navigate = useNavigate();
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const dateInputRef = useRef<HTMLInputElement>(null);

  const reload = () =>
    getBlockedDates().then((dates) => setBlockedDates(dates.sort()));

  useEffect(() => {
    reload();
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;
    if (blockedDates.includes(selectedDate)) {
      alert("Questa data è già bloccata");
      return;
    }
    if (!window.confirm(`Bloccare il giorno ${selectedDate}?`)) return;
    addBlockedDate(selectedDate)
      .then(() => {
        alert(`${selectedDate} bloccato correttamente`);
        setSelectedDate("");
        reload();
      })
      .catch(() => alert("Qualcosa è andato storto, riprova"));
  };

  const handleDelete = (date: string) => {
    if (!window.confirm(`Sbloccare il giorno ${date}?`)) return;
    deleteBlockedDate(date)
      .then(() => {
        alert(`${date} sbloccato correttamente`);
        reload();
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

  return (
    <section
      id="calendar"
      tw="flex flex-col gap-[1.75rem] p-[2rem 1.5rem] max-w-[64rem] mx-auto">
      {/* Tab bar */}
      <div tw="flex bg-cream rounded-lg p-[0.25rem] gap-[0.25rem] self-start border border-[#334a3b22]">
        <button
          type="button"
          tw="px-5 py-[0.4rem] rounded text-sm font-bold border-none cursor-pointer tracking-wide transition-all text-green"
          onClick={() => navigate("/calendario2")}>
          Prenotazioni
        </button>
        <button
          type="button"
          tw="px-5 py-[0.4rem] rounded text-sm font-bold border-none cursor-pointer tracking-wide transition-all bg-green text-cream"
          onClick={() => navigate("/blocco-date")}>
          Blocco date
        </button>
      </div>

      <form onSubmit={handleAdd} tw="flex gap-[0.75rem] items-center flex-wrap">
        <button
          type="button"
          onClick={() => dateInputRef.current?.showPicker()}
          tw="px-4 py-2 rounded-lg border-2 border-green bg-white cursor-pointer text-sm font-medium text-green hover:bg-cream transition-all">
          {selectedDate
            ? (() => {
                const { day, month, year } = formatDate(selectedDate);
                return `${day} ${month} ${year}`;
              })()
            : "Scegli data 📅"}
        </button>
        <input
          ref={dateInputRef}
          type="date"
          id="blockDate"
          min={today}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
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
                  onClick={() => handleDelete(date)}
                  tw="mt-2 text-sm font-bold text-red border-none cursor-pointer hover:opacity-70 transition-all">
                  Sblocca
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default BlockDate;
