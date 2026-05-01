import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import Calendar from "./pages/Calendar";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Dashboard/Home";
import AuthGuard from "./components/auth/AuthGuard";
import HeroSection from "./pages/Home/HeroSection";
import AboutSection from "./pages/Home/AboutSection";
import MembersSection from "./pages/Home/MembersSection";
import ServicesSection from "./pages/Home/ServicesSection";
import ClientsSection from "./pages/Home/ClientsSection";
import TestimonialsSection from "./pages/Home/TestimonialsSection";
import BookingList from "./pages/Booking/BookingList";
import FinancialSummary from "./pages/FinancialSummary";
import PortfolioList from "./pages/Portfolio/PortfolioList";
import PortfolioForm from "./pages/Portfolio/PortfolioForm";
import PricingList from "./pages/Pricing/PricingList";
import PricingForm from "./pages/Pricing/PricingForm";

// Import Dashboard Styles
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";

export default function App() {
  return (
    <Routes>
      {/* Dashboard Layout */}
      <Route
        element={
          <AuthGuard>
            <AppLayout />
          </AuthGuard>
        }
      >
        <Route index element={<Home />} />

        {/* Core */}
        <Route path="calendar" element={<Calendar />} />
        <Route path="blank" element={<Blank />} />
        <Route path="financial-summary" element={<FinancialSummary />} />

        {/* Booking */}
        <Route path="booking" element={<BookingList />} />

        {/* Pages > Home */}
        <Route path="pages/home/hero" element={<HeroSection />} />
        <Route path="pages/home/about" element={<AboutSection />} />
        <Route path="pages/home/members" element={<MembersSection />} />
        <Route path="pages/home/services" element={<ServicesSection />} />
        <Route path="pages/home/clients" element={<ClientsSection />} />
        <Route path="pages/home/testimonials" element={<TestimonialsSection />} />

        {/* Pages > Portfolio */}
        <Route path="pages/portfolio" element={<PortfolioList />} />
        <Route path="pages/portfolio/create" element={<PortfolioForm />} />
        <Route path="pages/portfolio/edit/:id" element={<PortfolioForm />} />

        {/* Pages > Pricing */}
        <Route path="pages/pricing" element={<PricingList />} />
        <Route path="pages/pricing/create" element={<PricingForm />} />
        <Route path="pages/pricing/edit/:id" element={<PricingForm />} />
      </Route>

      {/* Auth Layout */}
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />

      {/* Fallback Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
