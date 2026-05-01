import { useEffect, useState } from "react";
import { client } from "../../../sanity/client";
import { Link } from "react-router-dom";
import { TrendingUp, TrendingDown, DollarSign, ArrowRight } from "lucide-react";

const formatIDR = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

export default function FinancialOverview() {
  const [bookingRevenue, setBookingRevenue] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [manualIncome, setManualIncome] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [bookings, transactions] = await Promise.all([
          client.fetch(`*[_type == "booking" && status == "accept"] { price }`),
          client.fetch(`*[_type == "transaction"] { type, amount }`),
        ]);

        // Use actual price field saved at booking time
        const rev = bookings.reduce((sum: number, b: any) => sum + (b.price || 0), 0);

        const income = transactions
          .filter((t: any) => t.type === "income")
          .reduce((s: number, t: any) => s + (t.amount || 0), 0);

        const expense = transactions
          .filter((t: any) => t.type === "expense")
          .reduce((s: number, t: any) => s + (t.amount || 0), 0);

        setBookingRevenue(rev);
        setManualIncome(income);
        setTotalExpense(expense);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const totalIncome = bookingRevenue + manualIncome;
  const netProfit = totalIncome - totalExpense;

  const stats = [
    {
      label: "Total Income",
      value: formatIDR(totalIncome),
      icon: <TrendingUp size={18} className="text-green-600" />,
      bg: "bg-green-50",
      text: "text-green-700",
    },
    {
      label: "Total Expense",
      value: formatIDR(totalExpense),
      icon: <TrendingDown size={18} className="text-red-500" />,
      bg: "bg-red-50",
      text: "text-red-600",
    },
    {
      label: "Net Profit",
      value: formatIDR(netProfit),
      icon: <DollarSign size={18} className={netProfit >= 0 ? "text-brand-500" : "text-orange-500"} />,
      bg: netProfit >= 0 ? "bg-brand-50" : "bg-orange-50",
      text: netProfit >= 0 ? "text-brand-600" : "text-orange-600",
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-gray-800">Financial Summary</h3>
        <Link
          to="/admin/financial-summary"
          className="inline-flex items-center gap-1 text-xs text-brand-500 hover:text-brand-600 font-medium"
        >
          View detail <ArrowRight size={13} />
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {stats.map((s) => (
            <div key={s.label} className={`flex items-center justify-between p-4 rounded-xl ${s.bg}`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                  {s.icon}
                </div>
                <span className="text-sm font-medium text-gray-600">{s.label}</span>
              </div>
              <span className={`text-base font-bold ${s.text}`}>{s.value}</span>
            </div>
          ))}

          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Booking revenue: <span className="font-semibold text-gray-600">{formatIDR(bookingRevenue)}</span>
              {" · "}
              Manual income: <span className="font-semibold text-gray-600">{formatIDR(manualIncome)}</span>
            </p>
            <p className="text-[10px] text-gray-300 mt-0.5">Only accepted bookings are included in revenue</p>
          </div>
        </div>
      )}
    </div>
  );
}
