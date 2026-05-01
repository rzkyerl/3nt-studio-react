import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import FinancialOverview from "../../components/ecommerce/FinancialOverview";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MiniCalendar from "../../components/ecommerce/MiniCalendar";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Overview | Admin Dashboard"
        description="Admin dashboard overview"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Metrics row */}
        <div className="col-span-12">
          <EcommerceMetrics />
        </div>

        {/* Financial + Calendar */}
        <div className="col-span-12 xl:col-span-7">
          <FinancialOverview />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MiniCalendar />
        </div>

        {/* Statistics */}
        <div className="col-span-12">
          <StatisticsChart />
        </div>

        {/* Recent Bookings */}
        <div className="col-span-12">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}
