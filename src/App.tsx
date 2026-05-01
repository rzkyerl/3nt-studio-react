import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import { LanguageProvider } from './frontend/lib/LanguageContext';
import { Navbar } from './frontend/components/layout/Navbar';
import { Footer } from './frontend/components/layout/Footer';
import Home from './frontend/pages/Home';
import Portfolio from './frontend/pages/Portfolio';
import Pricing from './frontend/pages/Pricing';
import Location from './frontend/pages/Location';
import Booking from './frontend/pages/Booking';
import Photobooth from './frontend/pages/Photobooth';
import Quotation from './frontend/pages/Pricing/sections/Quotation/Quotation';
import Contact from './frontend/pages/Pricing/sections/Contact/Contact';
import PhotoboothServicePage from './frontend/pages/Pricing/sections/services/Photobooth';
import MulticamServicePage from './frontend/pages/Pricing/sections/services/EventProduction';
import DocumentationServicePage from './frontend/pages/Pricing/sections/services/Documentation';
import BroadcastServicePage from './frontend/pages/Pricing/sections/services/Broadcast';
import DroneServicePage from './frontend/pages/Pricing/sections/services/Drone';
import TeleprompterServicePage from './frontend/pages/Pricing/sections/services/Teleprompter';
const AdminDashboard = lazy(() => import('./backend/dashboard/App'));
import { AppWrapper as DashboardWrapper } from './backend/dashboard/components/common/PageMeta';
import { ThemeProvider as DashboardThemeProvider } from './backend/dashboard/context/ThemeContext';
import { SidebarProvider } from './backend/dashboard/context/SidebarContext';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const hostname = window.location.hostname;
  const isVercelAdmin = hostname === '3nt-studio-project.vercel.app';
  const location = useLocation();
  const isDashboardPath = location.pathname.startsWith('/admin');
  const hideFooterOnServiceDetail = location.pathname.startsWith('/services/');

  return (
    <main className="min-h-screen bg-pure-white selection:bg-primary-black selection:text-pure-white overflow-x-hidden flex flex-col">
      {/* Only show Navbar & Footer on the main frontend domain and not on dashboard paths */}
      {!isVercelAdmin && !isDashboardPath && <Navbar />}

      <div className="flex-grow">
        <Routes>
          {isVercelAdmin ? (
            // ── VERCEL ADMIN DOMAIN ──────────────────────────────────────
            <Route
              path="/*"
              element={
                <DashboardThemeProvider>
                  <DashboardWrapper>
                    <SidebarProvider>
                      <Suspense fallback={<div>Loading Dashboard...</div>}>
                        <AdminDashboard />
                      </Suspense>
                    </SidebarProvider>
                  </DashboardWrapper>
                </DashboardThemeProvider>
              }
            />
          ) : (
            // ── MAIN DOMAIN (LOCALHOST OR PRODUCTION) ───────────────────
            <>
              <Route path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
              <Route path="/portfolio" element={<ErrorBoundary><Portfolio /></ErrorBoundary>} />
              <Route path="/pricing" element={<ErrorBoundary><Pricing /></ErrorBoundary>} />
              <Route path="/location" element={<ErrorBoundary><Location /></ErrorBoundary>} />
              <Route path="/booking" element={<ErrorBoundary><Booking /></ErrorBoundary>} />
              <Route path="/quotation" element={<ErrorBoundary><Quotation /></ErrorBoundary>} />
              <Route path="/contact" element={<ErrorBoundary><Contact /></ErrorBoundary>} />
              <Route path="/photobooth" element={<ErrorBoundary><Photobooth /></ErrorBoundary>} />
              <Route path="/services/photobooth" element={<ErrorBoundary><PhotoboothServicePage /></ErrorBoundary>} />
              <Route path="/services/multicam" element={<ErrorBoundary><MulticamServicePage /></ErrorBoundary>} />
              <Route path="/services/documentation" element={<ErrorBoundary><DocumentationServicePage /></ErrorBoundary>} />
              <Route path="/services/streaming" element={<ErrorBoundary><BroadcastServicePage /></ErrorBoundary>} />
              <Route path="/services/drone" element={<ErrorBoundary><DroneServicePage /></ErrorBoundary>} />
              <Route path="/services/teleprompter" element={<ErrorBoundary><TeleprompterServicePage /></ErrorBoundary>} />

              {/* Dashboard Route on Main Domain - NO Error Boundary here */}
              <Route
                path="/admin/*"
                element={
                  <DashboardThemeProvider>
                    <DashboardWrapper>
                      <SidebarProvider>
                        <Suspense fallback={
                          <div className="flex items-center justify-center min-h-screen bg-gray-50">
                            <div className="flex flex-col items-center gap-4">
                              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                              <p className="text-gray-500 animate-pulse">Loading Dashboard...</p>
                            </div>
                          </div>
                        }>
                          <AdminDashboard />
                        </Suspense>
                      </SidebarProvider>
                    </DashboardWrapper>
                  </DashboardThemeProvider>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </div>

      {!isVercelAdmin && !isDashboardPath && !hideFooterOnServiceDetail && <Footer />}
    </main>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <AppContent />
    </LanguageProvider>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
