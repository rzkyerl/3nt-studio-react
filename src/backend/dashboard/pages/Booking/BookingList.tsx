import { useEffect, useRef, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { client } from "../../../sanity/client";
import {
  Loader2, FileText, RefreshCw, Eye, X, Trash2,
  AlertTriangle, CheckCircle2, ChevronDown,
} from "lucide-react";

type BookingStatus = "pending" | "on_process" | "accept" | "cancel";

interface Booking {
  _id: string;
  bookingId?: string;
  name: string;
  phone: string;
  address?: string;
  date: string;
  package: string;
  packageLabel?: string;
  price?: number;
  notes?: string;
  pdfUrl?: string;
  createdAt: string;
  status?: BookingStatus;
}

// ─── Status config ────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<BookingStatus, { label: string; bg: string; text: string; dot: string }> = {
  pending:    { label: "Pending",    bg: "bg-yellow-50",  text: "text-yellow-700", dot: "bg-yellow-400" },
  on_process: { label: "On Process", bg: "bg-blue-50",    text: "text-blue-700",   dot: "bg-blue-400"   },
  accept:     { label: "Accept",     bg: "bg-green-50",   text: "text-green-700",  dot: "bg-green-500"  },
  cancel:     { label: "Cancel",     bg: "bg-red-50",     text: "text-red-600",    dot: "bg-red-400"    },
};

const ALL_STATUSES: BookingStatus[] = ["pending", "on_process", "accept", "cancel"];

function StatusBadge({ status }: { status?: BookingStatus }) {
  const s = status ?? "pending";
  const cfg = STATUS_CONFIG[s];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function StatusDropdown({
  current,
  onChange,
  loading,
}: {
  current?: BookingStatus;
  onChange: (s: BookingStatus) => void;
  loading: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const s = current ?? "pending";
  const cfg = STATUS_CONFIG[s];

  const handleOpen = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPos({ top: rect.bottom + window.scrollY + 4, left: rect.left + window.scrollX });
    }
    setOpen((v) => !v);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleOpen}
        disabled={loading}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text} disabled:opacity-50`}
      >
        {loading ? (
          <Loader2 size={11} className="animate-spin" />
        ) : (
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
        )}
        {cfg.label}
        <ChevronDown size={11} />
      </button>

      {open && typeof document !== "undefined" && (() => {
        const Portal = () => (
          <>
            <div className="fixed inset-0 z-[99990]" onClick={() => setOpen(false)} />
            <div
              className="fixed z-[99991] bg-white rounded-xl shadow-xl border border-gray-100 py-1 min-w-[140px]"
              style={{ top: menuPos.top, left: menuPos.left }}
            >
              {ALL_STATUSES.map((st) => {
                const c = STATUS_CONFIG[st];
                return (
                  <button
                    key={st}
                    onClick={() => { onChange(st); setOpen(false); }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium hover:bg-gray-50 transition-colors ${st === s ? "opacity-40 cursor-default" : ""}`}
                    disabled={st === s}
                  >
                    <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                    {c.label}
                  </button>
                );
              })}
            </div>
          </>
        );
        return <Portal />;
      })()}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-400">{label}</span>
      <span className="text-sm text-gray-800 font-medium">{value || "—"}</span>
    </div>
  );
}

export default function BookingList() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<BookingStatus | "all">("all");
  const [selected, setSelected] = useState<Booking | null>(null);
  const [confirmTarget, setConfirmTarget] = useState<Booking | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const load = async () => {
    setLoading(true);
    try {
      const query = `*[_type == "booking"] | order(createdAt desc) {
        _id, bookingId, name, phone, address, date, package, packageLabel, price, notes, pdfUrl, createdAt, status
      }`;
      const data = await client.fetch(query);
      setBookings(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleStatusChange = async (booking: Booking, newStatus: BookingStatus) => {
    setUpdatingId(booking._id);
    try {
      await client.patch(booking._id).set({ status: newStatus }).commit();
      setBookings((prev) =>
        prev.map((b) => b._id === booking._id ? { ...b, status: newStatus } : b)
      );
      // Also update selected modal if open
      if (selected?._id === booking._id) {
        setSelected((prev) => prev ? { ...prev, status: newStatus } : prev);
      }
      showToast(`Status updated to "${STATUS_CONFIG[newStatus].label}".`);
    } catch {
      showToast("Failed to update status.", "error");
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = bookings
    .filter((b) => filterStatus === "all" || (b.status ?? "pending") === filterStatus)
    .filter((b) =>
      b.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.phone?.includes(search) ||
      b.package?.toLowerCase().includes(search.toLowerCase()) ||
      b.bookingId?.toLowerCase().includes(search.toLowerCase())
    );

  const formatDate = (iso: string) =>
    iso ? new Date(iso).toLocaleDateString("id-ID", {
      day: "2-digit", month: "long", year: "numeric",
    }) : "—";

  const bookingLabel = (b: Booking) =>
    b.bookingId ?? `LEGACY-${b._id.slice(-6).toUpperCase()}`;

  const handleConfirmDelete = async () => {
    if (!confirmTarget) return;
    setDeleting(true);
    try {
      await client.delete(confirmTarget._id);
      setBookings((prev) => prev.filter((x) => x._id !== confirmTarget._id));
      showToast(`Booking ${bookingLabel(confirmTarget)} deleted.`);
    } catch {
      showToast("Failed to delete booking.", "error");
    } finally {
      setDeleting(false);
      setConfirmTarget(null);
    }
  };

  // Status counts for filter tabs
  const counts = bookings.reduce<Record<string, number>>((acc, b) => {
    const s = b.status ?? "pending";
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <PageMeta title="Booking | Admin" description="Booking data from users" />
      <PageBreadcrumb pageTitle="Booking" />

      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-[9999] flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white transition-all ${
          toast.type === "success" ? "bg-green-500" : "bg-red-500"
        }`}>
          {toast.type === "success" ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
          {toast.msg}
        </div>
      )}

      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-800">Booking Requests</h3>
            <p className="text-xs text-gray-400 mt-0.5">{bookings.length} total entries</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ID, name, phone, package..."
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500 w-64"
            />
            <button
              onClick={load}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="px-6 py-3 border-b border-gray-100 flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterStatus === "all"
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All <span className="ml-1 opacity-70">({bookings.length})</span>
          </button>
          {ALL_STATUSES.map((s) => {
            const cfg = STATUS_CONFIG[s];
            return (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  filterStatus === s
                    ? `${cfg.bg} ${cfg.text} ring-1 ring-current`
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cfg.label} <span className="ml-1 opacity-70">({counts[s] || 0})</span>
              </button>
            );
          })}
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-gray-400" size={32} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">
            {search ? "No results found." : "No bookings yet."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Booking ID</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Package</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Submitted</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((b) => (
                  <tr key={b._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-xs font-mono font-semibold tracking-wide">
                        {bookingLabel(b)}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">{b.name}</td>
                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{b.phone}</td>
                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{b.date || "—"}</td>
                    <td className="px-6 py-4 text-gray-600 capitalize whitespace-nowrap">{b.packageLabel || b.package || "—"}</td>
                    <td className="px-6 py-4">
                      <StatusDropdown
                        current={b.status ?? "pending"}
                        onChange={(s) => handleStatusChange(b, s)}
                        loading={updatingId === b._id}
                      />
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs whitespace-nowrap">{formatDate(b.createdAt)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelected(b)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-brand-50 hover:bg-brand-100 text-brand-600 rounded-lg transition-colors"
                        >
                          <Eye size={13} /> View
                        </button>
                        <button
                          onClick={() => setConfirmTarget(b)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                        >
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Detail Modal ── */}
      {selected && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Booking Detail</p>
                <h4 className="text-lg font-semibold text-gray-800">{selected.name}</h4>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-xs font-mono font-semibold tracking-wide">
                    {bookingLabel(selected)}
                  </span>
                  <StatusBadge status={selected.status} />
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="px-6 py-5 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <DetailRow label="Full Name" value={selected.name} />
                <DetailRow label="Phone" value={selected.phone} />
                <DetailRow label="Preferred Date" value={selected.date} />
                <DetailRow label="Package" value={selected.packageLabel || selected.package} />
              </div>
              {selected.address && (
                <div className="border-t border-gray-100 pt-4">
                  <DetailRow label="Event Address" value={selected.address} />
                </div>
              )}
              <div className="border-t border-gray-100 pt-4">
                <DetailRow label="Price" value={selected.price ? new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(selected.price) : "—"} />
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-400">Status</span>
                <StatusDropdown
                  current={selected.status ?? "pending"}
                  onChange={(s) => handleStatusChange(selected, s)}
                  loading={updatingId === selected._id}
                />
              </div>
              <div className="border-t border-gray-100 pt-4">
                <DetailRow label="Notes" value={selected.notes || "No notes provided."} />
              </div>
              <div className="border-t border-gray-100 pt-4">
                <DetailRow label="Submitted At" value={formatDate(selected.createdAt)} />
              </div>
              {selected.pdfUrl && (
                <div className="border-t border-gray-100 pt-4">
                  <a
                    href={selected.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    <FileText size={15} /> View Booking PDF
                  </a>
                </div>
              )}
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <button
                onClick={() => setSelected(null)}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {confirmTarget && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="px-6 pt-6 pb-4 flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="text-red-500" size={22} />
              </div>
              <h4 className="text-base font-semibold text-gray-800">Delete Booking?</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                You are about to delete booking{" "}
                <span className="font-mono font-semibold text-gray-700">{bookingLabel(confirmTarget)}</span>{" "}
                from <span className="font-semibold text-gray-700">{confirmTarget.name}</span>.
                <br />
                <span className="text-red-500 font-medium">This action cannot be undone.</span>
              </p>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={() => setConfirmTarget(null)}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 text-sm border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60"
              >
                {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
