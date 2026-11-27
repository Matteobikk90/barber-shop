/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import tw from "twin.macro";

type BlockDatePickerProps = {
  value: string;
  min: string;
  unavailableDates: string[];
  isDateSelectable?: (date: string) => boolean;
  helpText?: string;
  onChange: (date: string) => void;
};

const WEEKDAYS = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

const parseDate = (value: string): Date => {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const toDateValue = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const paddedMonth = month < 10 ? `0${month}` : String(month);
  const paddedDay = day < 10 ? `0${day}` : String(day);
  return `${year}-${paddedMonth}-${paddedDay}`;
};

const formatTriggerLabel = (value: string): string => {
  if (!value) return "Scegli data 📅";
  return parseDate(value).toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const BlockDatePicker = ({
  value,
  min,
  unavailableDates,
  isDateSelectable,
  helpText = "I giorni già bloccati non sono selezionabili.",
  onChange,
}: BlockDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() =>
    parseDate(value || min)
  );
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  const openOrClose = () => {
    if (!isOpen) {
      setVisibleMonth(parseDate(value || min));
    }
    setIsOpen((open) => !open);
  };

  const changeMonth = (amount: number) => {
    setVisibleMonth(
      (current) => new Date(current.getFullYear(), current.getMonth() + amount, 1)
    );
  };

  const selectDate = (date: string) => {
    onChange(date);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calendarCells = Array.from(
    { length: firstWeekday + daysInMonth },
    (_, index) => (index < firstWeekday ? null : index - firstWeekday + 1)
  );
  const minDate = parseDate(min);
  const isPreviousMonthDisabled =
    year === minDate.getFullYear() && month === minDate.getMonth();
  const monthLabel = visibleMonth.toLocaleDateString("it-IT", {
    month: "long",
    year: "numeric",
  });

  return (
    <div tw="relative flex-1 min-w-0">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="block-date-picker"
        onClick={openOrClose}
        tw="w-full h-full py-[0.75rem] px-4 rounded-xl border-2 border-green bg-white cursor-pointer text-[1.5rem] font-bold text-green hover:bg-cream transition-all">
        {formatTriggerLabel(value)}
      </button>

      {isOpen && (
        <div
          id="block-date-picker"
          role="dialog"
          aria-label="Scegli una data"
          tw="absolute z-50 top-[calc(100%+0.5rem)] left-0 bg-white border-2 border-green rounded-xl shadow-xl p-[1rem]"
          css={{ width: "22rem", maxWidth: "calc(100vw - 3rem)" }}>
          <div tw="flex items-center justify-between gap-2 mb-[0.75rem]">
            <button
              type="button"
              aria-label="Mese precedente"
              disabled={isPreviousMonthDisabled}
              onClick={() => changeMonth(-1)}
              tw="w-10 h-10 rounded-lg border border-[#c8c3bc] bg-white text-green text-[1.5rem] font-bold cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed">
              ‹
            </button>
            <strong tw="text-[1.4rem] text-green capitalize">
              {monthLabel}
            </strong>
            <button
              type="button"
              aria-label="Mese successivo"
              onClick={() => changeMonth(1)}
              tw="w-10 h-10 rounded-lg border border-[#c8c3bc] bg-white text-green text-[1.5rem] font-bold cursor-pointer">
              ›
            </button>
          </div>

          <div tw="grid grid-cols-7 gap-[0.25rem] mb-[0.25rem]" aria-hidden="true">
            {WEEKDAYS.map((weekday) => (
              <span
                key={weekday}
                tw="text-center text-[0.9rem] font-bold text-[#777] uppercase">
                {weekday}
              </span>
            ))}
          </div>

          <div tw="grid grid-cols-7 gap-[0.25rem]">
            {calendarCells.map((day, index) => {
              if (day === null) return <span key={`empty-${index}`} />;

              const date = toDateValue(new Date(year, month, day));
              const isPast = date < min;
              const isUnavailable = unavailableDates.includes(date);
              const isIneligible = isDateSelectable
                ? !isDateSelectable(date)
                : false;
              const isSelected = value === date;

              return (
                <button
                  key={date}
                  type="button"
                  disabled={isPast || isUnavailable || isIneligible}
                  aria-label={parseDate(date).toLocaleDateString("it-IT", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                  aria-pressed={isSelected}
                  title={
                    isUnavailable
                      ? "Data già bloccata"
                      : isIneligible
                      ? "Data normalmente aperta"
                      : undefined
                  }
                  onClick={() => selectDate(date)}
                  tw="w-full h-[2.4rem] rounded-lg border border-[#00000000] bg-white text-[1.15rem] font-bold cursor-pointer hover:border-green hover:bg-cream disabled:cursor-not-allowed"
                  css={
                    isSelected
                      ? tw`bg-green text-cream hover:bg-green`
                      : isUnavailable
                      ? tw`text-red bg-[#fff1f3] opacity-60`
                      : isPast || isIneligible
                      ? tw`text-[#aaa] opacity-40`
                      : tw`text-black`
                  }>
                  {day}
                </button>
              );
            })}
          </div>

          <div tw="flex items-center justify-between gap-3 mt-[0.75rem] pt-[0.75rem] border-t border-[#e2ded9]">
            <span tw="text-[0.95rem] text-[#777]">
              {helpText}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              tw="border-none bg-white text-green text-[1.05rem] font-bold cursor-pointer">
              Chiudi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockDatePicker;
