import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Pricing from './pages/Pricing';
import Location from './pages/Location';
import Booking from './pages/Booking';
import Photobooth from './pages/Photobooth';
import AdminDashboard from './pages/Admin/Dashboard';
import './App.css';

function App() {
  const hostname = window.location.hostname;
  const isAdminDomain = hostname === '3nt-studio-admin.vercel.app';

  return (
    <Router>
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
                
                {/* If someone tries to access /admin on the main domain, redirect to the correct admin domain */}
                <Route path="/admin/*" element={<AdminDashboard />} />
              </>
            )}
          </Routes>
        </div>
        
        {!isAdminDomain && <Footer />}
      </main>
    </Router>
  );
}

export default App;
