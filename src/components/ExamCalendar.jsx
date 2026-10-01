"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { ChevronDownIcon } from "@/components/icons";

const firstOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);

const addMonths = (date, amount) =>
  new Date(date.getFullYear(), date.getMonth() + amount, 1);

const arrow =
  "grid size-8 place-items-center rounded-full text-brand-orange transition-colors hover:bg-brand-orange/10 disabled:opacity-30 disabled:hover:bg-transparent";

// One day in the grid. Exam days get a circle in the section's accent colour.
function Day({ day, modifiers, children, ...cellProps }) {
  let look = "";
  if (modifiers.outside) look = "text-black/25";
  else if (modifiers.exam) look = "bg-(--accent) font-bold text-white";

  return (
    <td {...cellProps}>
      <span
        className={`mx-auto grid aspect-square w-full max-w-12 place-items-center rounded-full ${look}`}
      >
        {children}
      </span>
    </td>
  );
}

/*
  Month calendar that marks the exam days.
  `weekdays` lists the days of the week with an exam, e.g. [4, 5] = every
  Thursday and Friday (0 = Sunday … 6 = Saturday).
  It opens on the current month; the arrows move one month at a time.
*/
export default function ExamCalendar({ weekdays }) {
  const [thisMonth] = useState(() => firstOfMonth(new Date()));
  const [month, setMonth] = useState(thisMonth);

  // No going back to months that have already passed.
  const atStart = month <= thisMonth;

  return (
    <div>
      <div className="flex items-center gap-1">
        <h4 className="mr-auto text-[1.375rem] font-semibold">Exam Dates</h4>
        <span aria-live="polite" className="mr-1 text-[1.0625rem]">
          {month.toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
        </span>
        <button
          type="button"
          aria-label="Previous month"
          disabled={atStart}
          onClick={() => setMonth(addMonths(month, -1))}
          className={arrow}
        >
          <ChevronDownIcon className="size-5 rotate-90" />
        </button>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => setMonth(addMonths(month, 1))}
          className={arrow}
        >
          <ChevronDownIcon className="size-5 -rotate-90" />
        </button>
      </div>

      <DayPicker
        month={month}
        onMonthChange={setMonth}
        hideNavigation // the arrows above are used instead
        showOutsideDays
        fixedWeeks // always 6 rows, so the card height never jumps
        modifiers={{ exam: { dayOfWeek: weekdays } }}
        components={{ Day }}
        formatters={{
          formatWeekdayName: (date) =>
            date.toLocaleDateString("en-GB", { weekday: "narrow" }),
        }}
        classNames={{
          month_caption: "hidden",
          month_grid: "mt-3 w-full table-fixed border-collapse",
          weekday: "pb-2 text-[0.8125rem] font-bold",
          day: "p-0.5 text-center text-sm",
        }}
      />
    </div>
  );
}
