import { useEffect, useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import { client } from "../../sanity/client";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Loader2,
  Plus,
  Trash2,
  X,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

// ─── No hardcoded price map — prices come directly from Sanity ───────────────

interface Booking {
  _id: string;
  name: string;
  package: string;
  packageLabel?: string;
  price: number;
  date: string;
}

interface Transaction {
  _id: string;
  label: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  note?: string;
}

const formatIDR = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

const emptyForm = { label: "", amount: "", type: "income" as "income" | "expense", date: "", note: "" };

export default function FinancialSummary() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<Transaction | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const [bData, tData] = await Promise.all([
          client.fetch(`*[_type == "booking" && status == "accept"] { _id, name, package, packageLabel, price, date }`),
          client.fetch(`*[_type == "transaction"] | order(date desc) { _id, label, amount, type, date, note }`),
        ]);
        setBookings(bData);
        setTransactions(tData);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ─── Derived stats ──────────────────────────────────────────────────────────
  const bookingRevenue = bookings.reduce((sum, b) => sum + (b.price || 0), 0);

  const manualIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);

  const totalIncome = bookingRevenue + manualIncome;
  const netProfit = totalIncome - totalExpense;

  // Group by packageLabel (or package value as fallback)
  const packageBreakdown = Object.entries(
    bookings.reduce<Record<string, { count: number; revenue: number }>>((acc, b) => {
      const key = b.packageLabel || b.package || "unknown";
      if (!acc[key]) acc[key] = { count: 0, revenue: 0 };
      acc[key].count += 1;
      acc[key].revenue += b.price || 0;
      return acc;
    }, {})
  ).sort((a, b) => b[1].revenue - a[1].revenue);

  // ─── Handlers ───────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!form.label.trim() || !form.amount || !form.date) {
      showToast("Label, amount, and date are required.", "error");
      return;
    }
    setSaving(true);
    try {
      const doc = await client.create({
        _type: "transaction",
        label: form.label,
        amount: Number(form.amount),
        type: form.type,
        date: form.date,
        note: form.note,
      });
      setTransactions((prev) => [{ ...doc, _id: doc._id, label: form.label, amount: Number(form.amount), type: form.type, date: form.date, note: form.note }, ...prev]);
      showToast("Transaction added!");
      setShowModal(false);
      setForm(emptyForm);
    } catch {
      showToast("Failed to save.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    setDeleting(true);
    try {
      await client.delete(confirmDelete._id);
      setTransactions((prev) => prev.filter((t) => t._id !== confirmDelete._id));
      showToast("Transaction deleted.");
    } catch {
      showToast("Failed to delete.", "error");
    } finally {
      setDeleting(false);
      setConfirmDelete(null);
    }
  };

  return (
    <>
      <PageMeta title="Financial Summary | Admin" description="Financial overview" />
      <PageBreadcrumb pageTitle="Financial Summary" />

      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-[99999] flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {toast.type === "success" ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
          {toast.msg}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-gray-400" size={36} /></div>
      ) : (
        <div className="space-y-6">

          {/* ── KPI Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              label="Accepted Bookings"
              value={String(bookings.length)}
              sub="status: accept"
              icon={<Package size={20} className="text-brand-500" />}
              color="bg-brand-50"
            />
            <KpiCard
              label="Booking Revenue"
              value={formatIDR(bookingRevenue)}
              sub="accepted only"
              icon={<DollarSign size={20} className="text-green-600" />}
              color="bg-green-50"
            />
            <KpiCard
              label="Total Expenses"
              value={formatIDR(totalExpense)}
              sub="manual entries"
              icon={<TrendingDown size={20} className="text-red-500" />}
              color="bg-red-50"
            />
            <KpiCard
              label="Net Profit"
              value={formatIDR(netProfit)}
              sub={netProfit >= 0 ? "surplus" : "deficit"}
              icon={<TrendingUp size={20} className={netProfit >= 0 ? "text-green-600" : "text-red-500"} />}
              color={netProfit >= 0 ? "bg-green-50" : "bg-red-50"}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ── Package Breakdown ── */}
            <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <h3 className="text-base font-medium text-gray-800">Booking by Package</h3>
                <p className="text-xs text-gray-400 mt-0.5">Only accepted bookings are counted</p>
              </div>
              <div className="p-6 space-y-3">
                {packageBreakdown.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-6">No bookings yet.</p>
                ) : packageBreakdown.map(([pkg, { count, revenue }]) => {
                  const pct = Math.round((revenue / (bookingRevenue || 1)) * 100);
                  return (
                    <div key={pkg}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 truncate max-w-[60%]">{pkg}</span>
                        <span className="text-xs text-gray-500 shrink-0">{count}x · {formatIDR(revenue)}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-brand-500 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Income vs Expense ── */}
            <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <h3 className="text-base font-medium text-gray-800">Income vs Expense</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Total Income</p>
                    <p className="text-xl font-bold text-green-700 mt-0.5">{formatIDR(totalIncome)}</p>
                  </div>
                  <TrendingUp className="text-green-500" size={28} />
                </div>
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Total Expense</p>
                    <p className="text-xl font-bold text-red-600 mt-0.5">{formatIDR(totalExpense)}</p>
                  </div>
                  <TrendingDown className="text-red-400" size={28} />
                </div>
                <div className={`flex items-center justify-between p-4 rounded-xl ${netProfit >= 0 ? "bg-brand-50" : "bg-orange-50"}`}>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Net Profit</p>
                    <p className={`text-xl font-bold mt-0.5 ${netProfit >= 0 ? "text-brand-600" : "text-orange-600"}`}>{formatIDR(netProfit)}</p>
                  </div>
                  <DollarSign className={netProfit >= 0 ? "text-brand-400" : "text-orange-400"} size={28} />
                </div>
              </div>
            </div>
          </div>

          {/* ── Transactions ── */}
          <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-base font-medium text-gray-800">Manual Transactions</h3>
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg"
              >
                <Plus size={14} /> Add Transaction
              </button>
            </div>
            {transactions.length === 0 ? (
              <div className="py-12 text-center text-gray-400 text-sm">No transactions yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Label</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Note</th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {transactions.map((t) => (
                      <tr key={t._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-gray-500 text-xs whitespace-nowrap">{t.date}</td>
                        <td className="px-6 py-4 font-medium text-gray-800">{t.label}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${t.type === "income" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                            {t.type}
                          </span>
                        </td>
                        <td className={`px-6 py-4 font-semibold whitespace-nowrap ${t.type === "income" ? "text-green-600" : "text-red-500"}`}>
                          {t.type === "expense" ? "−" : "+"}{formatIDR(t.amount)}
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-xs max-w-[160px] truncate">{t.note || "—"}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setConfirmDelete(t)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-red-50 hover:bg-red-100 text-red-600 rounded-lg"
                          >
                            <Trash2 size={12} /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Add Transaction Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h4 className="font-semibold text-gray-800">Add Transaction</h4>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                <input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="e.g. Equipment rental" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as "income" | "expense" })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (IDR)</label>
                <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="e.g. 2500000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Note (optional)</label>
                <input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="Additional info..." />
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg disabled:opacity-60">
                {saving && <Loader2 size={14} className="animate-spin" />} Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="px-6 pt-6 pb-4 flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="text-red-500" size={22} />
              </div>
              <h4 className="text-base font-semibold text-gray-800">Delete Transaction?</h4>
              <p className="text-sm text-gray-500">
                "<span className="font-semibold text-gray-700">{confirmDelete.label}</span>" will be permanently deleted.
              </p>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button onClick={() => setConfirmDelete(null)} disabled={deleting} className="flex-1 px-4 py-2.5 text-sm border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 disabled:opacity-50">Cancel</button>
              <button onClick={handleDelete} disabled={deleting} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg disabled:opacity-60">
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

// ─── KPI Card component ───────────────────────────────────────────────────────
function KpiCard({ label, value, sub, icon, color }: {
  label: string; value: string; sub: string; icon: React.ReactNode; color: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
        <div className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center`}>{icon}</div>
      </div>
      <p className="text-2xl font-bold text-gray-800 leading-tight">{value}</p>
      <p className="text-xs text-gray-400 mt-1 capitalize">{sub}</p>
    </div>
  );
}
