import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { client } from "../../../sanity/client";

// Define the TypeScript interface for the booking
interface Booking {
  _id: string;
  name: string;
  phone: string;
  date: string;
  package: string;
  packageLabel?: string;
  pdfUrl?: string;
  status?: string;
}

export default function RecentOrders() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const query = `*[_type == "booking"] | order(date desc) [0...5] {
          _id, name, phone, date, package, packageLabel, pdfUrl, status
        }`;
        const data = await client.fetch(query);
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings from Sanity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Bookings
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/booking"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800"
          >
            See all
          </Link>
        </div>
      </div>

      {/* ── Mobile card list (< md) ── */}
      <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-800 md:hidden">
        {loading ? (
          <p className="py-4 text-center text-sm text-gray-500">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="py-4 text-center text-sm text-gray-500">No bookings found.</p>
        ) : (
          bookings.map((booking) => {
            const s = (booking.status ?? "pending") as string;
            const map: Record<string, { label: string; cls: string }> = {
              pending:    { label: "Pending",    cls: "bg-yellow-100 text-yellow-700" },
              on_process: { label: "On Process", cls: "bg-blue-100 text-blue-700" },
              accept:     { label: "Accept",     cls: "bg-green-100 text-green-700" },
              cancel:     { label: "Cancel",     cls: "bg-red-100 text-red-600" },
            };
            const cfg = map[s] ?? map["pending"];

            return (
              <div key={booking._id} className="py-3 flex flex-col gap-1.5">
                {/* Row 1: name + status */}
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-sm text-gray-800 dark:text-white/90 leading-tight">
                      {booking.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{booking.phone}</p>
                  </div>
                  <span className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.cls}`}>
                    {cfg.label}
                  </span>
                </div>

                {/* Row 2: package */}
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-snug">
                  {booking.packageLabel || booking.package}
                </p>

                {/* Row 3: date + action */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {new Date(booking.date).toLocaleDateString("id-ID", {
                      day: "2-digit", month: "short", year: "numeric",
                    })}
                  </span>
                  {booking.pdfUrl ? (
                    <a
                      href={booking.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400"
                    >
                      View PDF
                    </a>
                  ) : (
                    <span className="text-xs text-gray-400 italic">No PDF</span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── Desktop table (≥ md) ── */}
      <div className="hidden md:block max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Customer
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Package
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Date
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Status
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="py-4 text-center text-gray-500">
                  Loading bookings...
                </TableCell>
              </TableRow>
            ) : bookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-4 text-center text-gray-500">
                  No bookings found.
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell className="py-3">
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {booking.name}
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {booking.phone}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {booking.packageLabel || booking.package}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {new Date(booking.date).toLocaleDateString("id-ID", {
                      day: "2-digit", month: "short", year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="py-3">
                    {(() => {
                      const s = (booking.status ?? "pending") as string;
                      const map: Record<string, { label: string; cls: string }> = {
                        pending:    { label: "Pending",    cls: "bg-yellow-100 text-yellow-700" },
                        on_process: { label: "On Process", cls: "bg-blue-100 text-blue-700" },
                        accept:     { label: "Accept",     cls: "bg-green-100 text-green-700" },
                        cancel:     { label: "Cancel",     cls: "bg-red-100 text-red-600" },
                      };
                      const cfg = map[s] ?? map["pending"];
                      return (
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.cls}`}>
                          {cfg.label}
                        </span>
                      );
                    })()}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {booking.pdfUrl ? (
                      <a
                        href={booking.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                      >
                        View PDF
                      </a>
                    ) : (
                      <span className="text-gray-400 italic text-xs">No PDF</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
