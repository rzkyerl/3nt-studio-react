import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './frontend/components/layout/Navbar';
import { Footer } from './frontend/components/layout/Footer';
import Home from './frontend/pages/Home';
import Portfolio from './frontend/pages/Portfolio';
import Pricing from './frontend/pages/Pricing';
import Location from './frontend/pages/Location';
import Booking from './frontend/pages/Booking';
import Photobooth from './frontend/pages/Photobooth';
import PhotoboothServicePage from './frontend/pages/Pricing/sections/services/Photobooth';
import MulticamServicePage from './frontend/pages/Pricing/sections/services/Multicam';
import DocumentationServicePage from './frontend/pages/Pricing/sections/services/Documentation';
import BroadcastServicePage from './frontend/pages/Pricing/sections/services/Broadcast';
import DroneServicePage from './frontend/pages/Pricing/sections/services/Drone';
import TeleprompterServicePage from './frontend/pages/Pricing/sections/services/Teleprompter';
import AdminDashboard from './backend/admin/pages/Admin/Dashboard';
import './App.css';

function AppContent() {
  const hostname = window.location.hostname;
  const isAdminDomain = hostname === '3nt-studio-admin.vercel.app';
  const location = useLocation();
  const hideFooterOnServiceDetail = location.pathname.startsWith('/services/');

  return (
    <main className="min-h-screen bg-pure-white selection:bg-primary-black selection:text-pure-white overflow-x-hidden flex flex-col">
      {/* Only show Navbar & Footer on the main frontend domain */}
      {!isAdminDomain && <Navbar />}

      <div className="flex-grow">
        <Routes>
          {isAdminDomain ? (
            // ── ADMIN DOMAIN LOGIC ───────────────────────────────────────
            <>
              <Route path="/" element={<Navigate to="/admin" replace />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
              {/* Fallback for any other path on the admin domain */}
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </>
          ) : (
            // ── MAIN FRONTEND DOMAIN LOGIC ──────────────────────────────
            <>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/location" element={<Location />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/photobooth" element={<Photobooth />} />
              <Route path="/services/photobooth" element={<PhotoboothServicePage />} />
              <Route path="/services/multicam" element={<MulticamServicePage />} />
              <Route path="/services/documentation" element={<DocumentationServicePage />} />
              <Route path="/services/streaming" element={<BroadcastServicePage />} />
              <Route path="/services/drone" element={<DroneServicePage />} />
              <Route path="/services/teleprompter" element={<TeleprompterServicePage />} />

              {/* If someone tries to access /admin on the main domain, redirect to the correct admin domain */}
              <Route path="/admin/*" element={<AdminDashboard />} />
            </>
          )}
        </Routes>
      </div>

      {!isAdminDomain && !hideFooterOnServiceDetail && <Footer />}
    </main>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
