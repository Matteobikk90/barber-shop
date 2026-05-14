import { useEffect, useState } from "react";
import { addBlockedDate } from "services/addBlockedDate";
import { deleteBlockedDate } from "services/deleteBlockedDate";
import { getBlockedDates } from "services/getBlockedDates";
import { today } from "utils/utilities";
/** @jsxImportSource @emotion/react */
import "twin.macro";

const BlockDate = () => {
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");

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
    const confirmation = window.confirm(`Bloccare il giorno ${selectedDate}?`);
    if (!confirmation) return;
    addBlockedDate(selectedDate)
      .then(() => {
        alert(`${selectedDate} bloccato correttamente`);
        setSelectedDate("");
        reload();
      })
      .catch(() => alert("Qualcosa è andato storto, riprova"));
  };

  const handleDelete = (date: string) => {
    const confirmation = window.confirm(
      `Rimuovere il blocco per il giorno ${date}?`
    );
    if (!confirmation) return;
    deleteBlockedDate(date)
      .then(() => {
        alert(`${date} sbloccato correttamente`);
        reload();
      })
      .catch(() => alert("Qualcosa è andato storto, riprova"));
  };

  const formatReadable = (date: string) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <section id="calendar" tw="flex flex-col gap-[2rem] m-[2rem 1rem]">
      <form onSubmit={handleAdd} tw="flex gap-[1rem] items-center flex-wrap">
        <label htmlFor="blockDate">Blocca giorno</label>
        <input
          tw="rounded border border-black p-[0.25rem]"
          type="date"
          id="blockDate"
          min={today}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button
          tw="bg-green border border-[#D7D7D7] p-[0.25rem 0.75rem] text-cream text-center rounded-[0.25rem]"
          type="submit">
          Blocca
        </button>
      </form>

      {blockedDates.length > 0 && (
        <>
          <h3 tw="font-bold">Giorni bloccati</h3>
          <article tw="flex flex-row flex-wrap gap-[0.25rem]">
            {blockedDates.map((date) => (
              <div
                key={date}
                tw="w-[10rem] h-[4rem] p-[0.5rem] flex flex-col justify-between border border-black rounded">
                <strong>{formatReadable(date)}</strong>
                <button
                  tw="text-left text-[#e52b50] text-sm"
                  onClick={() => handleDelete(date)}
                  type="button">
                  Sblocca
                </button>
              </div>
            ))}
          </article>
        </>
      )}

      {blockedDates.length === 0 && <p>Nessun giorno bloccato</p>}
    </section>
  );
};

export default BlockDate;
