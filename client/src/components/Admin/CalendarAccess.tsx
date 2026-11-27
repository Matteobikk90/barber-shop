/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  signInCalendarAdmin,
  signOutCalendarAdmin,
  subscribeToCalendarAdmin,
} from "services/calendarAdmin";
import type { CalendarAdminAccess } from "services/calendarAdmin";
import tw from "twin.macro";

const buttonStyle = tw`rounded-lg px-4 py-[0.65rem] bg-green text-cream text-[1.25rem] font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`;
const inputStyle = tw`rounded-lg border border-[#c8c3bc] bg-white px-3 py-[0.6rem] text-[1.25rem] text-black`;

const CalendarAccess = ({ children }: { children: ReactNode }) => {
  const [access, setAccess] = useState<CalendarAdminAccess>("checking");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberDevice, setRememberDevice] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => subscribeToCalendarAdmin(setAccess), []);

  const handleSignIn = async (event: FormEvent) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      await signInCalendarAdmin(email.trim(), password, rememberDevice);
    } catch {
      setError("Accesso non riuscito. Controlla email e password del titolare.");
    } finally {
      setPassword("");
      setBusy(false);
    }
  };

  const handleSignOut = async () => {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      await signOutCalendarAdmin();
    } catch {
      setError("Non è stato possibile uscire. Riprova.");
    } finally {
      setBusy(false);
    }
  };

  const canSignOut = ["allowed", "denied", "unavailable"].includes(access);

  return (
    <section
      id="calendar"
      aria-labelledby="calendar-title"
      tw="flex flex-col gap-[1.75rem] p-[2rem 1.5rem] sm:px-0 max-w-[64rem] mx-auto">
      <header tw="flex items-center justify-between gap-3">
        <h1 id="calendar-title" tw="text-[1.65rem] font-bold">
          Area riservata
        </h1>
        {canSignOut && (
          <button type="button" css={buttonStyle} onClick={handleSignOut} disabled={busy}>
            Esci
          </button>
        )}
      </header>

      {access === "checking" && <p role="status">Verifica accesso…</p>}
      {access === "denied" && (
        <p role="alert">Questo account non è autorizzato per il calendario.</p>
      )}
      {access === "unavailable" && (
        <p role="alert">Non riesco a verificare l’accesso. Esci e riprova.</p>
      )}
      {access === "signed-out" && (
        <form onSubmit={handleSignIn} tw="flex flex-col gap-3 max-w-[24rem]">
          <p tw="text-[1.25rem]">Accedi con l’account del titolare.</p>
          <label tw="flex flex-col gap-1 text-[1.2rem]">
            Email
            <input
              css={inputStyle}
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label tw="flex flex-col gap-1 text-[1.2rem]">
            Password
            <input
              css={inputStyle}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <label tw="flex items-center gap-2 text-[1.15rem]">
            <input
              type="checkbox"
              checked={rememberDevice}
              onChange={(event) => setRememberDevice(event.target.checked)}
            />
            Ricorda questo dispositivo
          </label>
          <button type="submit" css={buttonStyle} disabled={busy}>
            {busy ? "Accesso…" : "Accedi"}
          </button>
        </form>
      )}

      {error && <p role="alert" tw="text-red text-[1.2rem]">{error}</p>}
      {access === "allowed" && children}
    </section>
  );
};

export default CalendarAccess;
