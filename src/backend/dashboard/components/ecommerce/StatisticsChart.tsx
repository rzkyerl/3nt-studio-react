import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { client } from "../../../sanity/client";
import { Loader2 } from "lucide-react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const formatIDR = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
    notation: "compact",
    compactDisplay: "short",
  }).format(n);

export default function StatisticsChart() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const [incomeData, setIncomeData] = useState<number[]>(Array(12).fill(0));
  const [expenseData, setExpenseData] = useState<number[]>(Array(12).fill(0));

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // Accepted bookings as income — filter by year
        const [bookings, transactions] = await Promise.all([
          client.fetch(
            `*[_type == "booking" && status == "accept" && date >= $start && date <= $end] { date, price }`,
            { start: `${year}-01-01`, end: `${year}-12-31` }
          ),
          client.fetch(
            `*[_type == "transaction" && date >= $start && date <= $end] { date, amount, type }`,
            { start: `${year}-01-01`, end: `${year}-12-31` }
          ),
        ]);

        const inc = Array(12).fill(0);
        const exp = Array(12).fill(0);

        // Booking revenue per month
        bookings.forEach((b: { date: string; price?: number }) => {
          const m = new Date(b.date).getMonth();
          if (!isNaN(m)) inc[m] += b.price || 0;
        });

        // Manual transactions per month
        transactions.forEach((t: { date: string; amount: number; type: string }) => {
          const m = new Date(t.date).getMonth();
          if (!isNaN(m)) {
            if (t.type === "income") inc[m] += t.amount || 0;
            else exp[m] += t.amount || 0;
          }
        });

        setIncomeData(inc);
        setExpenseData(exp);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [year]);

  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit, sans-serif",
      fontSize: "13px",
      labels: { colors: "#6B7280" },
      markers: { size: 6 },
    },
    colors: ["#22c55e", "#ef4444"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: {
      curve: "smooth",
      width: [2.5, 2.5],
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.3,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 6 },
    },
    grid: {
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      borderColor: "#f0f0f0",
    },
    dataLabels: { enabled: false },
    tooltip: {
      enabled: true,
      shared: true,
      y: {
        formatter: (val: number) => formatIDR(val),
      },
    },
    xaxis: {
      type: "category",
      categories: MONTHS,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { fontSize: "12px", colors: "#9CA3AF" },
      },
    },
    yaxis: {
      labels: {
        style: { fontSize: "11px", colors: ["#9CA3AF"] },
        formatter: (val: number) => formatIDR(val),
      },
    },
  };

  const series = [
    { name: "Income", data: incomeData },
    { name: "Expense", data: expenseData },
  ];

  const availableYears = Array.from({ length: 4 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between sm:items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Financial Statistics
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Monthly income vs expense — accepted bookings only
          </p>
        </div>

        {/* Year selector */}
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
        >
          {availableYears.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-[310px]">
          <Loader2 className="animate-spin text-gray-300" size={32} />
        </div>
      ) : (
        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <div className="min-w-[600px] xl:min-w-full">
            <Chart options={options} series={series} type="area" height={310} />
          </div>
        </div>
      )}
    </div>
  );
}
