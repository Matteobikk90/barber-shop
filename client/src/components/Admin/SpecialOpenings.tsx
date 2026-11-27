/** @jsxImportSource @emotion/react */
import { FormEvent, useEffect, useState } from "react";
import {
  OpeningAdminAccess,
  signInOpeningAdmin,
  signOutOpeningAdmin,
  subscribeToOpeningAdmin,
} from "services/openingAdmin";
import {
  saveSpecialOpening,
  SpecialOpeningBlockedError,
  subscribeToSpecialOpenings,
} from "services/specialOpenings";
import tw from "twin.macro";
import { getRomeDateKey } from "utils/bookingDate";
import {
  bookingSlotMinutes,
  isNormallyClosedDate,
  isValidSpecialOpening,
  SpecialOpening,
  SpecialOpenings as OpeningDates,
} from "utils/calendar";
import BlockDatePicker from "./BlockDatePicker";

const buttonStyle = tw`rounded-lg px-4 py-[0.65rem] bg-green text-cream text-[1.25rem] font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`;
const inputStyle = tw`rounded-lg border border-[#c8c3bc] bg-white px-3 py-[0.6rem] text-[1.25rem] text-black`;
const timeOptions = Array.from(
  { length: 1 + (24 * 60) / bookingSlotMinutes },
  (_, slot) => slot * bookingSlotMinutes
);
const defaultHours = { from: 9 * 60, to: 17 * 60 };

const formatTime = (minutes: number) =>
  `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(
    minutes % 60
  ).padStart(2, "0")}`;

const formatDate = (date: string) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString("it-IT", {
    timeZone: "Europe/Rome",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

type Props = { blockedDates: string[] };

const OpeningForm = ({ blockedDates }: Props) => {
  const [openings, setOpenings] = useState<OpeningDates | null>(null);
  const [date, setDate] = useState("");
  const [hours, setHours] = useState<SpecialOpening>(defaultHours);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const today = getRomeDateKey(new Date());

  useEffect(
    () =>
      subscribeToSpecialOpenings(setOpenings, () => {
        setOpenings(null);
        setError("Non riesco a caricare le aperture. Ricarica e riprova.");
      }),
    []
  );

  const selectDate = (value: string) => {
    setDate(value);
    setHours(openings?.[value] ?? defaultHours);
    setMessage("");
    setError("");
  };

  const updateOpening = async (value: string, newHours: SpecialOpening | null) => {
    if (saving || !openings) return;
    setSaving(true);
    setMessage("");
    setError("");
    try {
      await saveSpecialOpening(value, newHours);
      setMessage(newHours ? "Apertura salvata." : "Apertura annullata.");
      setDate("");
    } catch (error) {
      setError(
        error instanceof SpecialOpeningBlockedError
          ? "Il giorno è bloccato manualmente. Sbloccalo prima da «Blocco date»."
          : "Non è stato possibile salvare la modifica. Riprova."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleSave = (event: FormEvent) => {
    event.preventDefault();
    if (!isNormallyClosedDate(date) || date < today || blockedDates.includes(date)) {
      return;
    }
    if (!isValidSpecialOpening(hours)) {
      setError("Scegli un intervallo con almeno 30 minuti fuori dalla pausa pranzo.");
      return;
    }
    if (
      openings?.[date] &&
      !window.confirm(
        `Modificare gli orari di ${formatDate(date)}? Le prenotazioni già prese non verranno modificate.`
      )
    ) return;
    void updateOpening(date, hours);
  };

  const handleCancel = (value: string) => {
    if (!window.confirm(
      `Annullare l’apertura di ${formatDate(value)}? Non si potranno prendere nuove prenotazioni. Quelle già prese resteranno nel calendario.`
    )) return;
    void updateOpening(value, null);
  };

  const activeOpenings = Object.entries(openings ?? {})
    .filter(([value]) => value >= today)
    .sort(([a], [b]) => a.localeCompare(b));

  return (
    <>
      <form onSubmit={handleSave}>
        <fieldset
          disabled={saving || !openings}
          tw="flex flex-col gap-[0.75rem] p-4 border border-[#e2ded9] rounded-xl">
          <div tw="flex flex-wrap gap-[0.75rem] items-end">
            <div tw="flex-1 min-w-[11rem]">
              <BlockDatePicker
                value={date}
                min={today}
                unavailableDates={blockedDates}
                isDateSelectable={isNormallyClosedDate}
                helpText="Scegli solo tra i giorni normalmente chiusi."
                onChange={selectDate}
              />
            </div>
            <label tw="flex flex-col gap-1 text-[1.2rem] font-bold">
              Dalle
              <select
                css={inputStyle}
                value={hours.from}
                onChange={(event) => setHours({ ...hours, from: Number(event.target.value) })}>
                {timeOptions.slice(0, -1).map((time) => (
                  <option value={time} key={time}>{formatTime(time)}</option>
                ))}
              </select>
            </label>
            <label tw="flex flex-col gap-1 text-[1.2rem] font-bold">
              Alle
              <select
                css={inputStyle}
                value={hours.to}
                onChange={(event) => setHours({ ...hours, to: Number(event.target.value) })}>
                {timeOptions.slice(1).map((time) => (
                  <option value={time} key={time}>{formatTime(time)}</option>
                ))}
              </select>
            </label>
          </div>
          <p tw="text-[1.15rem]">Ora italiana. Pausa pranzo automatica dalle 13:00 alle 14:00.</p>
          <button type="submit" css={buttonStyle} disabled={!date || blockedDates.includes(date)}>
            {saving ? "Salvataggio…" : "Salva apertura"}
          </button>
          {date && blockedDates.includes(date) && (
            <p tw="text-red text-[1.15rem]">Prima sblocca il giorno da «Blocco date».</p>
          )}
        </fieldset>
      </form>

      {message && <p role="status" tw="text-green text-[1.25rem]">{message}</p>}
      {error && <p role="alert" tw="text-red text-[1.25rem]">{error}</p>}
      {!openings && !error && <p tw="text-[1.25rem]">Caricamento aperture…</p>}
      {openings && (activeOpenings.length === 0 ? (
        <p tw="text-[1.25rem]">Nessuna apertura straordinaria in programma.</p>
      ) : (
        <ul tw="flex flex-col gap-2">
          {activeOpenings.map(([value, opening]) => opening && (
            <li
              key={value}
              tw="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#e2ded9] p-3">
              <div tw="flex flex-col text-[1.2rem]">
                <strong>{formatDate(value)}</strong>
                <span>{formatTime(opening.from)}–{formatTime(opening.to)}</span>
                {blockedDates.includes(value) && <span tw="text-red">Bloccata manualmente</span>}
              </div>
              <div tw="flex gap-2">
                <button type="button" css={buttonStyle} disabled={saving} onClick={() => selectDate(value)}>
                  Modifica
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => handleCancel(value)}
                  tw="rounded-lg border border-red px-3 text-red text-[1.2rem] font-bold cursor-pointer disabled:opacity-50">
                  Annulla apertura
                </button>
              </div>
            </li>
          ))}
        </ul>
      ))}
    </>
  );
};

const SpecialOpenings = ({ blockedDates }: Props) => {
  const [access, setAccess] = useState<OpeningAdminAccess>("checking");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => subscribeToOpeningAdmin(setAccess), []);

  const handleSignIn = async (event: FormEvent) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      await signInOpeningAdmin(email.trim(), password);
    } catch {
      setError("Accesso non riuscito. Controlla email e password e riprova.");
    } finally {
      setPassword("");
      setBusy(false);
    }
  };

  const handleSignOut = async () => {
    setError("");
    try {
      await signOutOpeningAdmin();
    } catch {
      setError("Non è stato possibile uscire. Riprova.");
    }
  };

  return (
    <div tw="flex flex-col gap-4">
      <div tw="flex items-center justify-between gap-2">
        <h2 tw="text-[1.65rem] font-bold">Aperture straordinarie</h2>
        {["allowed", "denied", "unavailable"].includes(access) && (
          <button type="button" css={buttonStyle} onClick={handleSignOut}>Esci</button>
        )}
      </div>
      {access === "checking" && <p tw="text-[1.25rem]">Verifica accesso…</p>}
      {access === "denied" && <p role="alert">Questo account non è autorizzato.</p>}
      {access === "unavailable" && <p role="alert">Non riesco a verificare l’accesso. Riprova.</p>}
      {access === "signed-out" && (
        <form onSubmit={handleSignIn} tw="flex flex-col gap-3 max-w-[24rem]">
          <p tw="text-[1.25rem]">Accedi per aggiungere o modificare le aperture.</p>
          <label tw="flex flex-col gap-1 text-[1.2rem]">
            Email
            <input css={inputStyle} type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label tw="flex flex-col gap-1 text-[1.2rem]">
            Password
            <input css={inputStyle} type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          <button type="submit" css={buttonStyle} disabled={busy}>
            {busy ? "Accesso…" : "Accedi"}
          </button>
        </form>
      )}
      {error && <p role="alert" tw="text-red text-[1.2rem]">{error}</p>}
      {access === "allowed" && <OpeningForm blockedDates={blockedDates} />}
    </div>
  );
};

export default SpecialOpenings;
