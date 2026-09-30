"use client";

import { useState, useCallback } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface DateRange {
  checkIn: Date | null;
  checkOut: Date | null;
}

interface CalendarProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isBeforeDay(a: Date, b: Date) {
  const aNorm = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  const bNorm = new Date(b.getFullYear(), b.getMonth(), b.getDate());
  return aNorm < bNorm;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

interface MonthCalendarProps {
  year: number;
  month: number;
  value: DateRange;
  hovered: Date | null;
  onDayClick: (d: Date) => void;
  onDayHover: (d: Date | null) => void;
}

function MonthCalendar({
  year, month, value, hovered, onDayClick, onDayHover,
}: MonthCalendarProps) {
  const today = new Date();
  const firstDay = startOfMonth(new Date(year, month)).getDay();
  const daysInMonth = getDaysInMonth(year, month);

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const effectiveEnd = value.checkOut ?? hovered;

  return (
    <div className="w-full select-none">
      <div className="text-center text-[12px] font-semibold tracking-[0.12em] uppercase text-zinc-300 mb-4">
        {MONTHS[month]} {year}
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] font-medium tracking-wider text-zinc-500 uppercase py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7">
        {cells.map((date, idx) => {
          if (!date) {
            return <div key={`empty-${idx}`} className="h-11" />;
          }

          const isPast = isBeforeDay(date, today);
          const isToday = isSameDay(date, today);
          const isStart = value.checkIn && isSameDay(date, value.checkIn);
          const isEnd = effectiveEnd && isSameDay(date, effectiveEnd);
          const isInRange =
            value.checkIn &&
            effectiveEnd &&
            !isBeforeDay(effectiveEnd, value.checkIn) &&
            !isBeforeDay(date, value.checkIn) &&
            !isBeforeDay(effectiveEnd, date) &&
            !isSameDay(date, value.checkIn) &&
            !isSameDay(date, effectiveEnd);

          let cls = "calendar-day ";
          if (isPast) {
            cls += "disabled";
          } else if (isStart && isEnd) {
            cls += "selected";
          } else if (isStart) {
            cls += "range-start font-semibold";
          } else if (isEnd) {
            cls += "range-end font-semibold";
          } else if (isInRange) {
            cls += "in-range";
          } else if (isToday) {
            cls += "today";
          }

          return (
            <div key={date.toISOString()} className="flex justify-center items-center h-11">
              <button
                type="button"
                disabled={isPast}
                className={cls}
                onClick={() => onDayClick(date)}
                onMouseEnter={() => !isPast && onDayHover(date)}
                onMouseLeave={() => onDayHover(null)}
                aria-label={date.toLocaleDateString("en-US", {
                  weekday: "long", year: "numeric", month: "long", day: "numeric",
                })}
              >
                {date.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Calendar({ value, onChange }: CalendarProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [hovered, setHovered] = useState<Date | null>(null);
  const [selecting, setSelecting] = useState<"checkIn" | "checkOut">("checkIn");

  const handleDayClick = useCallback(
    (date: Date) => {
      if (selecting === "checkIn") {
        onChange({ checkIn: date, checkOut: null });
        setSelecting("checkOut");
      } else {
        // If user clicks before or same as checkIn, restart
        if (value.checkIn && (isBeforeDay(date, value.checkIn) || isSameDay(date, value.checkIn))) {
          onChange({ checkIn: date, checkOut: null });
          setSelecting("checkOut");
        } else {
          onChange({ checkIn: value.checkIn, checkOut: date });
          setSelecting("checkIn");
        }
      }
    },
    [selecting, value.checkIn, onChange]
  );

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  // Second month
  const month2 = viewMonth === 11 ? 0 : viewMonth + 1;
  const year2 = viewMonth === 11 ? viewYear + 1 : viewYear;

  // Disable prev if we're already on today's month
  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  return (
    <div className="w-full">
      {/* Status indicator */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className={`flex-1 h-0.5 rounded-full transition-colors duration-300 ${
            selecting === "checkIn" ? "bg-accent-primary" : "bg-zinc-700"
          }`}
        />
        <span className="text-[11px] uppercase tracking-widest font-medium text-zinc-400">
          {selecting === "checkIn"
            ? "Select check‑in date"
            : value.checkOut
            ? "Dates selected ✓"
            : "Select check‑out date"}
        </span>
        <div
          className={`flex-1 h-0.5 rounded-full transition-colors duration-300 ${
            selecting === "checkOut" || value.checkOut ? "bg-accent-primary" : "bg-zinc-700"
          }`}
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="grid size-11 place-items-center rounded-full hover:bg-white/10 transition-colors disabled:opacity-20 disabled:cursor-not-allowed text-zinc-300"
          aria-label="Previous month"
        >
          <ChevronLeftIcon sx={{ fontSize: 18 }} />
        </button>
        <button
          onClick={nextMonth}
          className="grid size-11 place-items-center rounded-full hover:bg-white/10 transition-colors text-zinc-300"
          aria-label="Next month"
        >
          <ChevronRightIcon sx={{ fontSize: 18 }} />
        </button>
      </div>

      {/* Calendar grid — two months on desktop, one on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <MonthCalendar
          year={viewYear}
          month={viewMonth}
          value={value}
          hovered={selecting === "checkOut" ? hovered : null}
          onDayClick={handleDayClick}
          onDayHover={setHovered}
        />
        <div className="hidden sm:block">
          <MonthCalendar
            year={year2}
            month={month2}
            value={value}
            hovered={selecting === "checkOut" ? hovered : null}
            onDayClick={handleDayClick}
            onDayHover={setHovered}
          />
        </div>
      </div>

      {/* Reset */}
      {(value.checkIn || value.checkOut) && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              onChange({ checkIn: null, checkOut: null });
              setSelecting("checkIn");
            }}
            className="text-[11px] text-stone-500 hover:text-stone-300 transition-colors tracking-wide underline underline-offset-2"
          >
            Clear dates
          </button>
        </div>
      )}
    </div>
  );
}
