import { useEffect, useRef, useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { Link } from "react-router-dom";
import { client } from "../../../sanity/client";
import { CalendarDays, Package, Loader2 } from "lucide-react";

const STORAGE_KEY = "3nt_notif_last_seen";
const POLL_INTERVAL = 30_000; // 30 seconds

interface BookingNotif {
  _id: string;
  bookingId?: string;
  name: string;
  packageLabel?: string;
  package: string;
  date: string;
  createdAt: string;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  return `${Math.floor(hrs / 24)} day ago`;
}

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [bookings, setBookings] = useState<BookingNotif[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastSeenAt, setLastSeenAt] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY) ?? new Date(0).toISOString();
  });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const fetchBookings = async () => {
    try {
      const data = await client.fetch<BookingNotif[]>(
        `*[_type == "booking"] | order(createdAt desc) [0...20] {
          _id, bookingId, name, packageLabel, package, date, createdAt
        }`
      );
      setBookings(data);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    intervalRef.current = setInterval(fetchBookings, POLL_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const unreadCount = bookings.filter(
    (b) => new Date(b.createdAt) > new Date(lastSeenAt)
  ).length;

  const handleOpen = () => {
    const opening = !isOpen;
    setIsOpen(opening);
    if (opening) {
      window.dispatchEvent(new CustomEvent("dashboard:dropdown-open", { detail: "notif" }));
      // Mark all as read when opening
      const now = new Date().toISOString();
      setLastSeenAt(now);
      localStorage.setItem(STORAGE_KEY, now);
    }
  };

  // Close when another dropdown opens
  useEffect(() => {
    const handler = (e: Event) => {
      if ((e as CustomEvent).detail !== "notif") setIsOpen(false);
    };
    window.addEventListener("dashboard:dropdown-open", handler);
    return () => window.removeEventListener("dashboard:dropdown-open", handler);
  }, []);

  const closeDropdown = () => setIsOpen(false);

  const bookingLabel = (b: BookingNotif) =>
    b.bookingId ?? `LEGACY-${b._id.slice(-6).toUpperCase()}`;

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full dropdown-toggle hover:text-gray-700 h-11 w-11 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        onClick={handleOpen}
      >
        {/* Unread badge */}
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
            <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75 animate-ping" />
            <span className="relative">{unreadCount > 9 ? "9+" : unreadCount}</span>
          </span>
        )}

        {/* Bell icon */}
        <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M10.75 2.29248C10.75 1.87827 10.4143 1.54248 10 1.54248C9.58583 1.54248 9.25004 1.87827 9.25004 2.29248V2.83613C6.08266 3.20733 3.62504 5.9004 3.62504 9.16748V14.4591H3.33337C2.91916 14.4591 2.58337 14.7949 2.58337 15.2091C2.58337 15.6234 2.91916 15.9591 3.33337 15.9591H4.37504H15.625H16.6667C17.0809 15.9591 17.4167 15.6234 17.4167 15.2091C17.4167 14.7949 17.0809 14.4591 16.6667 14.4591H16.375V9.16748C16.375 5.9004 13.9174 3.20733 10.75 2.83613V2.29248ZM14.875 14.4591V9.16748C14.875 6.47509 12.6924 4.29248 10 4.29248C7.30765 4.29248 5.12504 6.47509 5.12504 9.16748V14.4591H14.875ZM8.00004 17.7085C8.00004 18.1228 8.33583 18.4585 8.75004 18.4585H11.25C11.6643 18.4585 12 18.1228 12 17.7085C12 17.2943 11.6643 16.9585 11.25 16.9585H8.75004C8.33583 16.9585 8.00004 17.2943 8.00004 17.7085Z" fill="currentColor" />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        triggerRef={triggerRef as React.RefObject<HTMLElement | null>}
        className="flex h-[480px] w-[calc(100vw-24px)] max-w-[361px] flex-col p-3"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Notifications</h5>
            {unreadCount > 0 && (
              <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-orange-100 text-orange-600 text-[10px] font-bold">
                {unreadCount} new
              </span>
            )}
          </div>
          <button
            onClick={closeDropdown}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="fill-current" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z" fill="currentColor" />
            </svg>
          </button>
        </div>

        {/* List */}
        <ul className="flex flex-col flex-1 overflow-y-auto custom-scrollbar gap-0.5">
          {loading ? (
            <li className="flex items-center justify-center py-16">
              <Loader2 className="animate-spin text-gray-300" size={28} />
            </li>
          ) : bookings.length === 0 ? (
            <li className="flex flex-col items-center justify-center py-16 gap-2 text-gray-400">
              <svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.75 2.29248C10.75 1.87827 10.4143 1.54248 10 1.54248C9.58583 1.54248 9.25004 1.87827 9.25004 2.29248V2.83613C6.08266 3.20733 3.62504 5.9004 3.62504 9.16748V14.4591H3.33337C2.91916 14.4591 2.58337 14.7949 2.58337 15.2091C2.58337 15.6234 2.91916 15.9591 3.33337 15.9591H4.37504H15.625H16.6667C17.0809 15.9591 17.4167 15.6234 17.4167 15.2091C17.4167 14.7949 17.0809 14.4591 16.6667 14.4591H16.375V9.16748C16.375 5.9004 13.9174 3.20733 10.75 2.83613V2.29248ZM14.875 14.4591V9.16748C14.875 6.47509 12.6924 4.29248 10 4.29248C7.30765 4.29248 5.12504 6.47509 5.12504 9.16748V14.4591H14.875Z" fill="currentColor" />
              </svg>
              <span className="text-sm">No bookings yet</span>
            </li>
          ) : (
            bookings.map((b) => {
              const isNew = new Date(b.createdAt) > new Date(lastSeenAt);
              return (
                <li key={b._id}>
                  <Link
                    to="/admin/booking"
                    onClick={closeDropdown}
                    className={`flex gap-3 rounded-xl px-3 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${
                      isNew ? "bg-orange-50 dark:bg-orange-500/5" : ""
                    }`}
                  >
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      isNew ? "bg-orange-100" : "bg-gray-100 dark:bg-gray-800"
                    }`}>
                      <CalendarDays size={18} className={isNew ? "text-orange-500" : "text-gray-500"} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 dark:text-white/90 leading-snug">
                        <span className="font-semibold">{b.name}</span>
                        <span className="text-gray-500"> submitted a booking</span>
                      </p>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-400 flex-wrap">
                        <Package size={11} />
                        <span className="truncate max-w-[140px]">{b.packageLabel || b.package}</span>
                        <span>·</span>
                        <span>{timeAgo(b.createdAt)}</span>
                      </div>
                      <span className="inline-block mt-1 text-[10px] font-mono text-gray-400">
                        {bookingLabel(b)}
                      </span>
                    </div>

                    {/* New dot */}
                    {isNew && (
                      <div className="flex-shrink-0 mt-1.5">
                        <span className="w-2 h-2 rounded-full bg-orange-400 block" />
                      </div>
                    )}
                  </Link>
                </li>
              );
            })
          )}
        </ul>

        {/* Footer */}
        <div className="pt-3 mt-1 border-t border-gray-100 dark:border-gray-700">
          <Link
            to="/admin/booking"
            onClick={closeDropdown}
            className="block w-full px-4 py-2.5 text-sm font-medium text-center text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
          >
            View All Bookings
          </Link>
        </div>
      </Dropdown>
    </div>
  );
}
