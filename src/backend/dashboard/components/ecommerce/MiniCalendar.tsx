import { useEffect, useState } from "react";
import { client } from "../../../sanity/client";
import { ChevronLeftIcon, ChevronUpIcon } from "../../icons";

interface BookingDate {
  date: string;
  name: string;
  package: string;
}

export default function MiniCalendar() {
  const [bookings, setBookings] = useState<BookingDate[]>([]);
  const [current, setCurrent] = useState(new Date());
  const [selected, setSelected] = useState<BookingDate[] | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "booking" && defined(date)] { date, name, package }`)
      .then(setBookings)
      .catch(console.error);
  }, []);

  const year = current.getFullYear();
  const month = current.getMonth();

  const monthName = current.toLocaleString("default", { month: "long", year: "numeric" });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  // Map booking dates to day numbers for this month
  const bookingMap: Record<number, BookingDate[]> = {};
  bookings.forEach((b) => {
    if (!b.date) return;
    const d = new Date(b.date);
    if (d.getFullYear() === year && d.getMonth() === month) {
      const day = d.getDate();
      if (!bookingMap[day]) bookingMap[day] = [];
      bookingMap[day].push(b);
    }
  });

  const prevMonth = () => setCurrent(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrent(new Date(year, month + 1, 1));

  const handleDayClick = (day: number) => {
    if (bookingMap[day]) {
      setSelected(bookingMap[day]);
      setSelectedDay(day);
    } else {
      setSelected(null);
      setSelectedDay(null);
    }
  };

  const cells = [];
  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`e-${i}`} />);
  }
  // Day cells
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = today.getDate() === d && today.getMonth() === month && today.getFullYear() === year;
    const hasBooking = !!bookingMap[d];
    const isSelected = selectedDay === d;

    cells.push(
      <button
        key={d}
        onClick={() => handleDayClick(d)}
        className={`relative flex flex-col items-center justify-center h-9 w-9 rounded-full text-sm font-medium transition-colors mx-auto
          ${isSelected ? "bg-brand-500 text-white" : isToday ? "bg-brand-100 text-brand-600" : "text-gray-700 hover:bg-gray-100"}
        `}
      >
        {d}
        {hasBooking && (
          <span className={`absolute bottom-1 w-1 h-1 rounded-full ${isSelected ? "bg-white" : "bg-brand-500"}`} />
        )}
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-800">Calendar</h3>
        <div className="flex items-center gap-1">
          <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium text-gray-700 min-w-[130px] text-center">{monthName}</span>
          <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 rotate-180">
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-1">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells}
      </div>

      {/* Booking list for selected day */}
      {selected && selectedDay && (
        <div className="mt-4 border-t border-gray-100 pt-4 space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Bookings on {selectedDay} {current.toLocaleString("default", { month: "long" })}
          </p>
          {selected.map((b, i) => (
            <div key={i} className="flex items-center gap-2 p-2 bg-brand-50 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate">{b.name}</p>
                <p className="text-xs text-gray-500 capitalize">{b.package}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex items-center gap-3 text-xs text-gray-400">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-500 inline-block" /> Has booking</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-100 inline-block" /> Today</span>
      </div>
    </div>
  );
}
